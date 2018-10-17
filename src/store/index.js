import Vue from 'vue'
import Vuex from 'vuex'
import {
  LANG
} from './config.state'
import {
  GET_PROJECTS,
  GET_ABOUT
} from './config.getters'
import {
  SET_LANG,
  SET_DATA
} from './config.mutations'
import {
  FETCH_DATA
} from './config.actions'

import axios from 'axios'
import DataManager from 'lib/dataManager'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    locales: ['fr', 'en'],
    [LANG]: '',
    data: {
      fr: {},
      en: {}
    }
  },
  getters: {
    [GET_PROJECTS]: state => state.data[state[LANG]].projects,
    [GET_ABOUT]: state => state.data[state[LANG]].about
  },
  mutations: {
    [SET_LANG] (state, lang) {
      if (state.locales.indexOf(lang) !== -1) {
        state[LANG] = lang
      }
    },
    [SET_DATA] (state, payload) {
      if (state.locales.indexOf(payload.lang) !== -1) {
        state.data[payload.lang] = payload.data
      }
    }
  },
  actions: {
    [FETCH_DATA] ({ commit, state }) {
      const navLang = navigator.language.toLowerCase()
      let browserLang = ''

      if (navLang === 'fr' || navLang.includes('fr-')) {
        browserLang = 'fr'
      } else {
        browserLang = 'en'
      }

      commit(SET_LANG, browserLang)

      // WORKS ONLY OF TWO LOCALES. REWORK WHEN MORE LOCALES THAN 2
      const otherLang = state.locales.filter(locale => locale !== browserLang)[0]

      // Try to fetch browser lang data
      axios.get(`/data_${browserLang}.json`)
        .then((response) => {
          DataManager.setData(response.data.about, response.data.projects)
          commit(SET_DATA, { data: response.data, lang: browserLang })

          // Try to fetch the other lang
          axios.get(`/data_${otherLang}.json`)
            .then((response) => {
              commit(SET_DATA, { data: response.data, lang: otherLang })
            })
            .catch((err) => {
              console.error(`error loading ${otherLang} data`, err)
            })
        })
        .catch((err) => {
          console.error(`error loading ${browserLang} data`, err)

          // Try to fetch other lang if browser lang can't load
          axios.get(`/data_${otherLang}.json`)
            .then((response) => {
              commit(SET_DATA, { data: response.data, lang: otherLang })
              commit(SET_LANG, otherLang)
            })
            .catch((err) => {
              console.error(`error loading ${otherLang} data`, err)
            })
        })

      // IF I WANT TO LOAD EVERYTHING AT ONCE OR HAVE MORE THAN 2 LANGS

      // let urls = []
      // urls.push(axios.get('data_fr.json'))
      // urls.push(axios.get('data_en.json'))
      //
      // axios.all(urls)
      //   .then(axios.spread((data_fr, data_en) => {
      //      commit something
      //   }))
      //   .catch(function (error) {
      //     GoogleAnalytics.sendEvent('Load', 'auto - failed to load data')
      //     console.error(error)
      //   })
    }
  }
})
