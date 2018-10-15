import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import _ from 'lodash'
import {
  SET_LANG,
  SET_READING_DIRECTION,
  SET_STADIUMS,
  SET_MATCHES,
  SET_TEAMS,
  SET_FLAG_CODES,
  SET_SELECTED_STADIUM,
  SET_DATA_FETCHED
} from './config.mutations.json'
import { FETCH_DATA } from './config.actions.json'
import config from '../../afp.config.js'
import GoogleAnalytics from '../utils/googleAnalytics'

Vue.use(Vuex)

const dataUrl = config[process.env.NODE_ENV].apiUrl

export default new Vuex.Store({
  state: {
    locales: ['fr', 'en', 'es', 'de', 'pt', 'ar'],
    lang: '',
    readingDirection: 'ltr',
    stadiums: [],
    selectedStadiumId: '',
    flagsCode: [],
    matches: [],
    teams: [],
    dataFetched: false
  },
  getters: {
    lang: state => state.lang,
    dataFetched: state => state.dataFetched,
    flagCodes: state => state.flagsCode,
    stadiums: state => state.stadiums,
    selectedStadiumId: state => state.selectedStadiumId,
    selectedStadium: state => state.stadiums.find(stadium => stadium.title === state.selectedStadiumId),
    matchesByStadium: state => {
      const matchesByStadium = _.groupBy(state.matches, data => data.idStadium)

      for (let stadium in matchesByStadium) {
        if (matchesByStadium.hasOwnProperty(stadium)) {
          matchesByStadium[stadium].sort((a, b) => {
            return new Date(a.date) - new Date(b.date)
          })

          matchesByStadium[stadium].forEach(match => {
            const home = state.teams.find(el => el.id === match.home.idTeam)
            match.home = { ...home, ...match.home }
            const away = state.teams.find(el => el.id === match.away.idTeam)
            match.away = { ...away, ...match.away }
          })
        }
      }

      return matchesByStadium
    }
  },
  mutations: {
    [SET_LANG] (state, lang) {
      if (state.locales.indexOf(lang) !== -1) {
        state.lang = lang
      }
    },

    [SET_READING_DIRECTION] (state) {
      state.lang === 'ar' ? state.readingDirection = 'rtl' : state.readingDirection = 'ltr'
    },

    [SET_STADIUMS] (state, payload) {
      state.stadiums = payload
    },

    [SET_FLAG_CODES] (state, payload) {
      state.flagsCode = payload
    },

    [SET_SELECTED_STADIUM] (state, payload) {
      state.selectedStadiumId = payload
    },

    [SET_MATCHES] (state, payload) {
      state.matches = payload
    },

    [SET_TEAMS] (state, payload) {
      state.teams = payload
    },

    [SET_DATA_FETCHED] (state, payload) {
      state.dataFetched = payload
    }
  },
  actions: {
    [FETCH_DATA] ({ commit, getters }) {
      let urls = []
      urls.push(axios.get(dataUrl + 'data.json'))
      urls.push(axios.get(dataUrl + 'stadiums_export.json'))
      urls.push(axios.get(dataUrl + 'cities.json'))
      urls.push(axios.get(dataUrl + 'flags_export.json'))
      urls.push(axios.get('https://graphics.afpforum.com/data/worldcup_2018/matches.json'))
      urls.push(axios.get('https://graphics.afpforum.com/data/worldcup_2018/teams.json'))

      axios.all(urls)
        .then(axios.spread((data, stadiums, cities, flags, matches, teams) => {
          const array = data.data.map(x => {
            stadiums.data.forEach(stadium => {
              if (x.title === stadium.key) {
                x.stadium = stadium[getters.lang]
              }
            })
            cities.data.forEach(city => {
              if (x.title === city.key) {
                x.city = city[getters.lang]
              }
            })
            return x
          })
          commit(SET_STADIUMS, array)
          commit(SET_FLAG_CODES, flags.data)
          commit(SET_MATCHES, matches.data)
          commit(SET_TEAMS, teams.data)
          commit(SET_DATA_FETCHED, true)
        }))
        .catch(function (error) {
          GoogleAnalytics.sendEvent('Load', 'auto - failed to load data')
          console.error(error)
        })
    }
  }
})
