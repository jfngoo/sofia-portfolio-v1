<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="scss">

  @import './utils/global';

  * {
    box-sizing: border-box;
  }

  #app {
    width: 100%;
    height: 100%;
    font-family: 'Poppins', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $dark_purple;
    background: $background_color;
  }
</style>
