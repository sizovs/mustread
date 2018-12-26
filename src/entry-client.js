import "babel-polyfill"

import Vue from 'vue'
import Vuex from 'vuex'

import VueRouter from 'vue-router'
import InstantSearch from 'vue-instantsearch'
import VueProgressBar from 'vue-progressbar'
import Notifications from 'vue-notification'
import App from './App.vue'
import Search from './Search.vue'
import qs from 'qs'

import { sync } from 'vuex-router-sync'

Vue.use(Vuex)
Vue.use(InstantSearch)
Vue.use(Notifications)
Vue.use(VueRouter)
Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})

const makeKilo = it => it < 100000
  ? Math.round(it / 1000) + '.' + (it % 1000).toString().padStart(3, "0").charAt(0)
  : Math.round(it / 1000)

const kilo = it => it && it >= 1000
? `${makeKilo(it)}K`
: it

Vue.filter('kilo', kilo)

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'is-active',
  routes: [
    { name: 'books', path: '/:query*', component: Search, 
      props: route => ({ queryParameters: route.params.query })
    }
  ]
})

const store = new Vuex.Store({
  strict: true
})

// sync(store, router)

new Vue({
  el: '#vue',
  store,
  render: h => h(App),
  router
})