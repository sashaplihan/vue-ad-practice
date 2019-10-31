import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import ByModalComponent from '@/components/shared/BuyModal'
import * as fb from 'firebase'
import '@babel/polyfill'

Vue.component('app-buy-modal', ByModalComponent)
Vue.config.productionTip = false

// noinspection JSAnnotator
new Vue({
  router,
  store,
  vuetify,
  created () {
    fb.initializeApp({
      apiKey: 'AIzaSyC2ujthLX48yMdxLz4AW94U64eWHPG0WU0',
      authDomain: 'ads-sasha.firebaseapp.com',
      databaseURL: 'https://ads-sasha.firebaseio.com',
      projectId: 'ads-sasha',
      storageBucket: 'ads-sasha.appspot.com',
      messagingSenderId: '1082721857065',
      appId: '1:1082721857065:web:387e753218b7776807b638',
      measurementId: 'G-60G6JVBJFD'
    })

    fb.auth().onAuthStateChanged(user => {
      if(user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  },
  render: h => h(App)
}).$mount('#app')
