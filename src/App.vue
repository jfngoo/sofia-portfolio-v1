<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import axios from 'axios'
  import DataManager from 'lib/dataManager'
  import StateManager from 'lib/stateManager'
  import EventBus from 'lib/eventBus'

  export default {
    name: 'app',

    data () {
      return {
        defaultLang: 'en'
      }
    },

    created () {
      const navLang = navigator.language.toLowerCase()

      if (navLang === 'fr' || navLang.includes('fr-'))
        this.defaultLang = 'fr'
      else
        this.defaultLang = 'en'

      StateManager.setLang(this.defaultLang)

      axios.get(`/static/data_${this.defaultLang}.json`)
        .then((response) => {
          DataManager.setData(response.data.about, response.data.projects)
        })
        .catch((err) => {
          console.log('error', err)
        })
    },

    mounted () {
      EventBus.$on('CHANGE_LANG', this.reloadData)
    },

    methods: {
      reloadData () {
        axios.get(`/static/data_${StateManager.getLang()}.json`)
          .then((response) => {
            DataManager.setData(response.data.about, response.data.projects)
            console.log('reloaded')
          })
          .catch((err) => {
            console.log('error', err)
          })
      }
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
