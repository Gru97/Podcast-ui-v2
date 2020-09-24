import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import moduleAuth from './modules/moduleAuth.js'
import moduleChannel from './modules/moduleChannel.js'
import moduleAlbum from './modules/moduleAlbum.js'
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: moduleAuth,
    channel: moduleChannel,
    album:moduleAlbum
  }
})