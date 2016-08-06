import Vue from 'vue'
import Vuex from 'vuex'
import * as login from './login/index'
import * as event from './event/index'
// Make vue aware of Vuex
Vue.use(Vuex)

const state = {
  authen: false,
  token: '',
  count: 0,
  Event: [],
  eventtype: 0,
  OpenPopEvent: [],
  ClosePopEvent: [],
  Topic: {},
  ofset: 0,
  join_number: 0
}

const mutations = {
  INCREMENT (state) {
    state.count++
  },
  DECREMENT (state) {
    state.count--
  },
  LOGIN (state) {
    state.authen = true
  },
  LOGOUT (state) {
    state.authen = false
  }
}

export default new Vuex.Store({
  state: state,
  mutations: Object.assign({}, mutations, login, event)
})
