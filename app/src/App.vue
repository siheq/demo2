<template>
  <div id='app'>
    <Header-view></Header-view>
    <div class='main'>
      <div class='load-font'>
        <span class='roboto-light'></span>
        <span class='roboto-regular'></span>
        <span class='roboto-medium'></span>
      </div>
      <router-view class='router-view'></router-view>
    </div>
    <footer-view></footer-view>
  </div>
</template>

<script>
  import HeaderView from './components/common/HeaderView.vue';
  import FooterView from './components/common/FooterView.vue';

  export default {
    components: {
      HeaderView,
      FooterView,
    },
  };
</script>

<style lang="scss" scoped>
  @import "assets/styles/sizes";
  @import "assets/styles/animations";
  @import "assets/styles/colors";

  .main {
    padding-top: 20px;
  }

  .router-view {
    padding-top: 15px;
    margin: auto;
    padding: 10px 36px;
    padding-bottom: 100px;
  }
</style>
