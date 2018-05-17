<template>
  <div id='footer' class='footer l-box is-center'>
    {{$t('footer.copy_right')}}
    <div class='links'>
      <a href='http://www.cargosmart.com/en/company/tou.htm' target='_routemaster'>{{$t('footer.terms_of_use')}}</a>
      <a href='http://www.cargosmart.com/en/company/pss.htm' target='_routemaster'>{{$t('footer.security')}}</a>
      <a href='http://www.cargosmart.com/en/company/tou.htm#cip' target='_routemaster'>{{$t('footer.policy')}}</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FooterView',
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/sizes";
  @import "../../assets/styles/colors";

  .footer {
    background-color: $ciot-footer-blue;
    color: #e3ffff;
    width: 100%;
    position: absolute;
    bottom: 0px;
    left:0px;
  }

  #footer {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    padding: 0.5rem 0px;
    font-size: $label-small-font-size;
    .copyright {
      display: flex;
      margin-bottom: 0.5rem;
    }
    .links {
      a {
        color: #e3ffff;
        padding: 0 0.5rem;
        border-right: 0.1em solid $rm-medium-grey;
        &:nth-of-type(1) {
          padding-left: 0;
        }
        &:nth-last-of-type(1) {
          border-right: none;
          padding-right: 0;
        }
      }
    }
  }
</style>
