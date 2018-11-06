<template>
  <div id="app">
    <nav-bar v-if="!isOnIntro"></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { LANG } from './store/config.state'
import { SET_CURRENT_PROJECT_ID } from './store/config.mutations'
import { GET_PROJECTS } from './store/config.getters'
import { FETCH_DATA } from './store/config.actions'

export default {
  name: 'app',

  components: {
    NavBar
  },

  data () {
    return {
      browserLang: 'en'
    }
  },

  watch: {
    lang (locale) {
      this.$i18n.locale = locale
    },

    '$route.params.id' (val) {
      val ? this.setCurrentProjectId(val) : this.setCurrentProjectId(null)
    }
  },

  computed: {
    ...mapState({
      lang: LANG
    }),

    ...mapGetters({
      projects: GET_PROJECTS
    }),

    isOnIntro () {
      return this.$route.name === 'intro'
    }
  },

  created () {
    this.fetchData()
  },

  methods: {
    ...mapMutations({
      setCurrentProjectId: SET_CURRENT_PROJECT_ID
    }),

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
