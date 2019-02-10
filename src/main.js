// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import store from './store'
import * as fb from 'firebase'
import 'vuetify/dist/vuetify.min.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueRellax from 'vue-rellax'

Vue.use(VueRellax)
Vue.use(VueAwesomeSwiper)
Vue.use(Vuetify, { theme: {
  primary: '#FF5252',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}},
  {
    iconfont: ['mdi', 'fa']
  })

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    fb.initializeApp({
      apiKey: 'AIzaSyCXP3YaKCRw6xwe6uMN16Bpjkc203WwlFA',
      authDomain: 'my-receipt-book.firebaseapp.com',
      databaseURL: 'https://my-receipt-book.firebaseio.com',
      projectId: 'my-receipt-book',
      storageBucket: 'my-receipt-book.appspot.com',
      messagingSenderId: '97969530002'
    })

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchReceipts')
    this.$store.dispatch('fetchImages')
  }
})
