import "babel-polyfill"

import Vue from 'vue'
import Vuex from 'vuex'

import VueRouter from 'vue-router'
import Meta from 'vue-meta'

import InstantSearch from 'vue-instantsearch'
import VueObserveVisibility from 'vue-observe-visibility'
import App from './App.vue'
import Search from './Search.vue'

import dayjs from 'dayjs'

Vue.use(Vuex)
Vue.use(VueObserveVisibility)
Vue.use(Meta)
Vue.use(InstantSearch)
Vue.use(VueRouter)

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
    { name: 'books', path: '/books/:query*', component: Search, 
      props: route => ({ queryParameters: route.params.query })
    },    
    { path: '/', redirect: '/books' }
  ]
})

const store = new Vuex.Store({
  strict: true,
  state: {
    newBooks: {
      isbn: [],
      month: ''
    }
  },
  mutations: {
    gotStats(state, stats) {
      const thisMonth = dayjs().format("MMMM")
      const newVideosThisMonth = stats[thisMonth]
      if (newVideosThisMonth) {
        state.newBooks.month = thisMonth
        state.newBooks.isbn = newVideosThisMonth
      }
    }
  },
  actions: {
    fetchStats({ commit }) {
      return fetch('https://static.mustread.tech/stats.json')
        .then(response => response.json())
        .then(json => commit('gotStats', json))
    }
  }
})

new Vue({
  el: '#vue',
  store,
  render: h => h(App),
  router, 
  created() {
    store.dispatch('fetchStats')
  }
})