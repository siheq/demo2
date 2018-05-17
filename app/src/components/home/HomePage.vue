<template>
  <div id='search-page'>
    <div class='splash-container'>
      <div class='splash'>
        <h1 class='splash-head'>Big Bold Text</h1>
        <p class='splash-subhead'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p>
        <p>
          <a href='http://purecss.io' class='pure-button pure-button-primary'>Get Started</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HomePage',

    components: {},
    methods: {},
    computed: {},
  };
</script>

<style lang='scss' scoped>
  @import '../../assets/styles/colors';
  @import '../../assets/styles/sizes';

  #title {
    color: $rm-dark-grey;
    margin: 1rem 0 0.8rem 0;
    font-size: $h1-font-size;
  }

  .splash-container {
    background: #1f8dd6;
    z-index: 1;
    overflow: hidden;
    /* The following styles are required for the "scroll-over" effect */
    width: 100%;
    height: 91%;
    top: 0;
    left: 0;
    position: fixed !important;
  }

  .splash {
    /* absolute center .splash within .splash-container */
    width: 80%;
    height: 50%;
    margin: auto;
    position: absolute;
    top: 100px; left: 0; bottom: 0; right: 0;
    text-align: center;
    text-transform: uppercase;
  }

  /* This is the main heading that appears on the blue section */
  .splash-head {
    font-size: 20px;
    font-weight: bold;
    color: white;
    border: 3px solid white;
    padding: 1em 1.6em;
    font-weight: 100;
    border-radius: 5px;
    line-height: 1em;
  }

  /* This is the subheading that appears on the blue section */
  .splash-subhead {
    color: white;
    letter-spacing: 0.05em;
    opacity: 0.8;
  }

</style>
