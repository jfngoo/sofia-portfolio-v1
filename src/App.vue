<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import axios from 'axios'
  import DataManager from 'lib/dataManager'

  export default {
    name: 'app',

    created () {
      axios.get('/static/data.json')
        .then((response) => {
          DataManager.setData(response.data.about, response.data.projects)
        })
        .catch((err) => {
          console.log('error', err)
        })
    }
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
