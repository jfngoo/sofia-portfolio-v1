// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'lib/polyfills/classList'
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css'
import i18n from './i18n.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  template: '<App/>',
  components: { App }
})
