<template>
  <div>
    <div id='map'></div>
    <div class='pure-g customer-site-panel' v-if='!isEmptyCustomerSite'>
      <div class='customer-site-search'>
        <input clas='pure-u-1-2' v-model='customerSiteInput' v-if='isShowAll' type='text' :placeholder='$t("search_destinations")'/>
        <div v-if='!isShowAll' class='pure-u-1-2'>{{$t('possible_destinations')}}</div>
        <div class='pure-u-1-2' v-if='!isShowAll'>{{$t('eta')}}</div>
        <i v-show='isShowAll' class='fa fa-mail-reply' @click='turnBack'></i>
      </div>
      <div class='customer-site-item'>
        <div v-for='(customerSite, index) in displayCustomerSites' :key='index' class='customer-list' @click='chooseCustomerSite(customerSite)'>
          <div :class='isShowAll ? "pure-u-1-1" : "pure-u-1-2"' class='location'>
            <img src='../../../static/pin.svg' class='fa fa-circle'/>
            <span>{{customerSite.location || '2 San Po Street, Sheung Shui, NT, Hong Kong'}}</span>
          </div>
          <div v-if='!isShowAll' class='pure-u-1-2 select-eta'>
            <span>{{$t('select_eta')}}</span>
            <img src='../../../static/route.svg' class='fa fa-circle'/>
          </div>
        </div>
      </div>
      <div v-show='!isShowAll' class='pure-u-1-1 all-locations' @click='showAllLocations'>{{$t('all_locations')}}</div>
    </div>
    <div class='legend pure-g'>
      <div class='pure-u-1-2 on'><i class='fa fa-circle'></i>{{$t('power_on')}}</div>
      <div class='pure-u-1-2 off'><i class='fa fa-circle'></i>{{$t('power_off')}}</div>
    </div>
    <div ref='tooltipTemplate' class='hide'>
      <table class='tooltip'>
        <tr>
          <th class='title'>{{$t('event_time')}}: </th>
          <td>{time}</td>
        </tr>
        <tr>
          <th class='title'>{{$t('supp_air')}}: &nbsp; </th>
          <td> {supplyAir}</td>
        </tr>
        <tr>
          <th class='title'>{{$t('return_air')}}: &nbsp; </th>
          <td>{returnAir}</td>
        </tr>
        <tr>
          <th class='title'>{{$t('amb_air')}}: &nbsp;</th>
          <td>{ambientAir}</td>
        </tr>
        <tr>
          <th class='title'>{{$t('reefer_power')}}: &nbsp;</th>
          <td>{power}</td>
        </tr>
        <tr>
          <th class='title'>{{$t('speed')}}: &nbsp;</th>
          <td>{speed}</td>
        </tr>
        <tr>
          <th class='title'>{{$t('direction')}}: &nbsp;</th>
          <td>{direction}</td>
        </tr>
        <tr>
          <th class='title'>{{$t('location')}}: &nbsp;</th>
          <td>{location}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import leaflet from 'leaflet';
  import {mapGetters} from 'vuex';
  import {RESULT_PAGE} from '../../store/namespaces';
  import {GET_CUSTOMER_SITES} from '../../store/modules/resultPage/types';
  import popUpContentGenerator from '../../service/popUpContentGenerator';
  import leafletPolylineDecorator from '../../utilities/leaflet-polyline-decorator';
  import {queryCustomerSiteRoutes} from '../../repositories/containerMap';
  import _ from 'lodash';

  export default {
    name: 'ContainerMap',
    data () {
      return {
        map: {},
        currentPosition: '',
        lastMarker: null,
        layer: leaflet.layerGroup(),
        cLayer: leaflet.layerGroup(),
        customerSiteInput: '',
        isShowAll: false,
        allLatlngs: [],
        currentSite: {},
      };
    },
    mounted () {
      leafletPolylineDecorator();
      this.initMap();
      this.draw();
      this.drawCustomerSites();
    },
    methods: {
      draw () {
        if (this.layer) {
          this.layer.remove();
          this.layer = leaflet.layerGroup();
        }
        this.drawRoute(this.positionHistory);
      },
      initMap () {
        this.map = leaflet.map('map', {
          zoomControl: false,
        });
        this.initTileLayer();
        this.addZoomControl();
        // this.addScaleControl();
      },
      initTileLayer () {
        return leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          minZoom: 1,
          maxZoom: 18,
        }).addTo(this.map);
      },
      addZoomControl () {
        leaflet.control.zoom({
          position: 'bottomright',
        }).addTo(this.map);
      },
      addScaleControl () {
        leaflet.control.scale({
          metric: true,
          imperial: true,
          updateWhenIdle: true,
          position: 'bottomleft',
        }).addTo(this.map);
      },
      drawRoute (data) {
        if (!data || !data.length) {
          return;
        }
        let latlngs = data.map(item => {
          return [item.lat, item.lng];
        });
        this.allLatlngs = latlngs;
        let results = [];
        for (let i = 0; i < latlngs.length - 1; i++) {
          let temp = [];
          temp.push(latlngs[i], latlngs[i + 1]);
          results.push(temp);
        }
        for (let i = 0; i < results.length; i++) {
          let pointPair = results[i];
          let options = {};
          if (data[i].eleState === '0') {
            options.className = 'path-gray';
          }
          let polyline = leaflet.polyline(pointPair, options);
          this.layer.addLayer(polyline);
          let decorator = leaflet.polylineDecorator(polyline, {
            patterns: [
              {
                offset: '50%',
                repeat: 0,
                symbol: leaflet.Symbol.arrowHead({
                  pixelSize: 6,
                  polygon: false,
                  pathOptions: {stroke: true, className: options.className},
                }),
              },
            ],
          });
          this.layer.addLayer(decorator);
        }
        this.layer.addTo(this.map);
        this.map.fitBounds(latlngs);
        this.drawPoints(data);
      },
      drawPoints (data) {
        let self = this;
        let markers = [];
        data.forEach((item, index) => {
          let latng = [];
          latng.push(item.lat);
          latng.push(item.lng);
          let option = {
            radius: 5,
            stroke: false,
            fillOpacity: 1,
          };
          if (item.eleState === '0') {
            option.className = 'fill-gray';
          }
          let marker = leaflet.circleMarker(latng, option);
          markers.push(marker);
          this.layer.addLayer(marker);
          let popupOption = {
            maxWidth: 500,
            className: 'map-popup',
          };
          if (index === data.length - 1) {
            let currentPositionMarkerIcon = leaflet.icon({
              iconUrl: '../../static/map-pin.svg',
              iconSize: [32, 32],
              iconAnchor: [15, 30],
              popupAnchor: [0, -30],
              className: 'ease',
            });
            let lastMarker = this.lastMarker = window.lastMarker = leaflet.marker(latng, {
              icon: currentPositionMarkerIcon,
            });
            markers.push(lastMarker);
            this.layer.addLayer(lastMarker);
            lastMarker.on('click', e => {
            }).bindPopup(`<p class='title'>${self.$t('last_location')}:</p><p>${item.displayName || 'unknown'}</p>`, popupOption);
            lastMarker.openPopup();
          }
          marker.on('click', e => {
          })
            .bindPopup(popUpContentGenerator(self.$refs.tooltipTemplate.innerHTML, item), popupOption);
        });
      },
      drawCustomerSitePoints () {
        let customerSites = this.displayCustomerSites || [];
        if (_.isEmpty(customerSites)) return;

        customerSites.forEach(site => {
          let latng = [];
          latng.push(site.lat);
          latng.push(site.lon);
          // let popupOption = {
          //   maxWidth: 500,
          //   className: 'map-popup',
          // };
          let options = {};
          options.icon = leaflet.icon({
            iconUrl: '../../static/pin.svg',
            iconSize: [32, 32],
            iconAnchor: [15, 30],
            popupAnchor: [0, -30],
            className: 'ease',
          });
          let marker = leaflet.marker(latng, options);
          // marker.on('click', e => {}).bindPopup(popUpContentGenerator(this.$refs.tooltipCustomerSite.innerHTML, site), popupOption);
          marker.addTo(this.map);
        });
      },
      drawCustomerSiteRoutes (latlngs) {
        let results = [];
        for (let i = 0; i < latlngs.length - 1; i++) {
          let temp = [];
          temp.push(latlngs[i], latlngs[i + 1]);
          results.push(temp);
        }
        for (let i = 0; i < results.length; i++) {
          let pointPair = results[i];
          let options = {};
          options.dashArray = '10, 10, 10';
          let polyline = leaflet.polyline(pointPair, options);
          this.cLayer.addLayer(polyline);
          let decorator = leaflet.polylineDecorator(polyline, {
            patterns: [
              {
                offset: '50%',
                repeat: 0,
                symbol: leaflet.Symbol.arrowHead({
                  pixelSize: 6,
                  polygon: false,
                  pathOptions: {stroke: true, className: options.className},
                }),
              },
            ],
          });
          this.cLayer.addLayer(decorator);
        }
        this.cLayer.addTo(this.map);
        this.map.fitBounds(latlngs);
        // this.drawPoints(data);
      },
      showAllLocations () {
        this.isShowAll = true;
      },
      turnBack () {
        this.isShowAll = false;
      },
      drawCustomerSites () {
        this.currentSite = _.last(this.filterTemperatures);
        if (!_.isEmpty(this.displayCustomerSites)) this.chooseCustomerSite(this.displayCustomerSites[0]);
      },
      async drawoCustomerSiteRoute (currentSite, customerSite) {
        const start = {lat: currentSite.lat, lng: currentSite.lng};
        let end = {lat: customerSite.lat, lng: customerSite.lon};
        let data = {
          originLatlng: start,
          destinationLatlng: end,
        };
        this.drawCustomerSitePoints();
        let results = await queryCustomerSiteRoutes(data);
        let latlngs = results || [];
        if (_.isEmpty(latlngs)) return;
        this.drawCustomerSiteRoutes(latlngs);
      },
      chooseCustomerSite (customerSite) {
        if (this.cLayer) {
          this.cLayer.remove();
          this.cLayer = leaflet.layerGroup();
        }
        this.drawoCustomerSiteRoute(this.currentSite, customerSite);
      },
    },
    computed: {
      positionHistory () {
        return this.$store.state[RESULT_PAGE].temperatures;
      },
      ...mapGetters({
        customerSites: `${RESULT_PAGE}/${GET_CUSTOMER_SITES}`,
      }),
      displayCustomerSites () {
        if (_.isEmpty(this.customerSites)) return [];
        let customerSites = this.customerSites;
        if (this.isShowAll) return customerSites;
        return (customerSites.length > 2) ? customerSites.slice(0, 2) : customerSites;
      },
      isEmptyCustomerSite () {
        return _.isEmpty(this.displayCustomerSites);
      },
      filterTemperatures () {
        return this.$store.getters['resultPage/GET_FILTER_TEMPERATURES'];
      },
    },
    watch: {
      positionHistory (gpsEvents) {
        this.draw();
      },
      filterTemperatures (temperatures) {
        let points = temperatures.map(item => {
          return [item.lat, item.lng];
        });
        if (points && points.length) {
          return this.map.fitBounds(points);
        }
        this.map.fitBounds(this.allLatlngs);
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/colors';

  #map {
    height: 500px;
    width: 100%;
    position: relative;
    z-index: 0;
  }

  .hide {
    display: none;
  }

  .current-location {
    text-align: right;
    .inline {
      display: inline-block;
      .icon {
      }
      p {
        text-align: left;
        margin: 0;
      }
      .current-position {
        font-weight: bold;
      }
    }
  }

  .legend {
    width: 32%;
    position: relative;
    bottom: 30px;
    background-color: white;
    padding: 2px 5px;
    font-size: 14px;
    text-align: center;
    float: right;

    .on {
      .fa-circle {
        padding-right: 10px;
        font-size: 12px;
        color: $ciot_light_blue;
      }
    }

    .off {
      .fa-circle {
        padding-right: 10px;
        font-size: 12px;
        color: $ciot_grey;
      }
    }
  }
  .customer-site-panel {
    position: relative;
    top: -490px;
    left: 10px;
    float: left;
    padding: 10px;
    width: 365px;
    background: #ffffff;
    font-size: 12px;
    color: #000000;
    opacity: 0.9;
    .customer-site-search {
      margin: 0 20px 0 25px;
      background: none;
      border-bottom: 1px solid #D3D3D3;
      width: 100%;
      color: #696969;
      input {
        border: none;
        display: inline-block;
      }
      :focus {
        border: 0;
        outline: none;
      }
      i {
        cursor: pointer;
        float: right;
      }
    }
    .customer-site-item {
      font-size: 12px;
      width: 100%;
      .customer-list {
        display: inline-flex;
      }
      :hover {
        cursor: pointer;
      }
      img {
        width: 20px;
        min-width: 20px;
        height: 20px;
      }
      .location {
        display: inline-flex;
        align-items: center;
        span {
          margin-left: 5px;
        }
      }
      .select-eta {
        display: inline-flex;
        padding-left: 10px;
        align-items: center;
        img {
          margin-left: 10px;
        }
      }
    }

    .all-locations {
      border-top: 1px solid #D3D3D3;
      color: #2C78B4;
      font-size: 12px;
      text-align: center;
      cursor: pointer;
    }
  }
</style>

