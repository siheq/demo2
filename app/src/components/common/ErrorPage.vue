<template>
  <div class='error-section'>
    <div class='error-message'>
      <img src='../../assets/images/icon-sorry.svg'/><span>Sorry! Something went wrong.</span>
    </div>
    <div class='error-action'>
      <span>Please try again later.</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ErrorPage',
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/sizes";
  @import "../../assets/styles/colors";

  .error-section{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .error-message {
    display: flex;
    align-items: center;
    font-size: $h1-font-size;
    color: $rm-dark-grey;
    margin-top: 8rem;
    margin-bottom: 2.5rem;
    img {
      margin-right: 0.6875rem;
    };
  }

  .error-action{
    font-size: $h3-font-size;
    color: $rm-medium-grey;
  }

</style>
