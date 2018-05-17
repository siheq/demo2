import 'babel-polyfill';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

import {Tooltip, Dropdown, DropdownMenu, DropdownItem, Loading} from 'element-ui';

Vue.use(Tooltip);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(VueI18n);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;

import local from './locales/index';

const i18n = local(VueI18n);
window.i18n = i18n;
/* eslint-disable no-new */
new Vue({
  el: '#root',
  template: '<App/>',
  components: {App},
  router,
  store,
  i18n,
});

import 'purecss/build/pure-min.css';
import 'purecss/build/grids-responsive-min.css';
import 'leaflet/dist/leaflet.css';
import 'c3/c3.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './assets/styles/home.css';
import './assets/styles/common.scss';
import './assets/styles/fonts.scss';
