import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'fr',
  fallbackLocale: 'en',
  messages: {
    'en': require('@/locales/en.json'),
    'fr': require('@/locales/fr.json')
  }
})

export default i18n
