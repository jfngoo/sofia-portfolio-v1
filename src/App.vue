<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { LANG } from './store/config.state'
import { FETCH_DATA } from './store/config.actions'

export default {
  name: 'app',

  data () {
    return {
      browserLang: 'en'
    }
  },

  watch: {
    lang (locale) {
      this.$i18n.locale = locale
    }
  },

  computed: {
    ...mapState({
      lang: LANG
    })
  },

  created () {
    this.fetchData()
  },

  methods: {
    ...mapActions({
      fetchData: FETCH_DATA
    })
  }
}
</script>

<style lang="scss">

  @import './assets/style/global';

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
