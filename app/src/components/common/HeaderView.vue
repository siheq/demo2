<template>
  <div class='header'>
    <div class='home-menu pure-menu pure-menu-horizontal pure-menu-horizontal'>
      <a class='pure-menu-heading' @click='goHome'><img class='img' src='../../assets/images/cosu_logo.png'/></a>
    </div>
    <div class='pure-menu pure-menu-horizontal coscon-menu'>
      <div class='personal-info'>
        <ul class='pure-menu-list mean-item personal-info'>
          <li class='pure-menu-item'>
            <el-dropdown>
              <a class='pure-menu-link name sign-in'>
                <i class='fa fa-user-o'></i>
                <span v-if='!user.userId'>{{$t('menu.sign_in')}}</span>
                <span v-else>
                  {{user.userId}}
                </span>
              </a>
              <el-dropdown-menu slot='dropdown' class='customer-list-dropdown'>
                <el-dropdown-item v-for='(item, index) in customerList' :key='index'>
                  <a class='pure-menu-link name'
                     :href='generateLoginURL(item)'>{{item.logInId}}</a>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>
      </div>
      <ul class='pure-menu-list mean-item party-menu'>
        <li class='pure-menu-item'>|</li>
        <li class='pure-menu-item pure-menu-selected'><a href='' class='pure-menu-link'>{{$t('menu.home')}}</a></li>
        <li class='pure-menu-item'>|</li>
        <li class='pure-menu-item'><a class='pure-menu-link'>{{$t('menu.service')}}</a></li>
        <li class='pure-menu-item'>|</li>
        <li class='pure-menu-item'><a class='pure-menu-link'>{{$t('menu.help')}}</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavigationBar',
    data () {
      return {
        user: {},
        customerList: [
          {logInId: 'user1'},
          {logInId: 'user2'},
          {logInId: 'user3'},
        ],
      };
    },
    async mounted () {
    },
    methods: {
      goHome () {
        this.$router.push({name: 'home'});
      },
      generateLoginURL (item) {
        return `/api/smartReefer?COSCON_USERID=${item.logInId}&COSCON_TOKEN=1234567890&t=${new Date().getTime()}`;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/sizes";
  @import "../../assets/styles/colors";

  .home-menu .pure-menu-heading {
    color: white;
    font-weight: 400;
    font-size: 150%;
    .img {
      cursor: pointer;
    }
  }

  .pure-menu.pure-menu-fixed {
    border-bottom: none;
    z-index: 4;
    white-space: normal !important;
  }

  .mean-item {
    font-size: 120%;
  }

  .home-menu {
    padding-top: 4px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.10);
    background: $ciot_light_grey;
  }

  .home-menu {
    text-align: left;
  }

  .home-menu ul {
    position: absolute;
    right: 0px;
  }

  .coscon-menu {
    padding: 5px 0px 5px 20px;
    background-color: #ffffff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.10);
    font-size: 90%;
    z-index: 999;
  }

  .personal-info {
    float: right;
    .name {
      i {
        padding-right: 3px;
      }
      span {
        color: $ciot_light_blue;
      }

    }
  }

  .pure-menu-link:hover {
    background-color: #ecf5ff;
  }

  .sign-in {
    margin-right: 20px;
    cursor: pointer;
  }

  .customer-list-dropdown {
    /*overflow-y: scroll;*/
  }

  .lang {
    position: absolute;
    right: 35px;
    top: 24px;
    cursor: pointer;
  }
</style>
