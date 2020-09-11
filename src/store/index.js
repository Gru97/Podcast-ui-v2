import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Promise from 'core-js/features/promise';

Vue.use(Vuex)

const mainurl="http://86.106.142.11:40000/api";
const secondurl="http://86.106.142.11:40005";
const queryString = require('query-string');

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    //status: ''
  },

  mutations: {
    set(state, [variable, value]) {
      state[variable] = value
    },
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token) {
      state.status = 'success'
      state.token = token
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = ''
      state.token = ''
    },
  },

  actions: {
    register({ commit }, info) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: `${secondurl}/Account/register`, data: info, method: 'POST'  , headers: {Authorization: ''}})
          .then(resp => {
            localStorage.clear();
            delete axios.defaults.headers.common['Authorization']
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.clear();
            delete axios.defaults.headers.common['Authorization']
            reject(err)
          })
      })
    },

    login({ commit }, info) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: `${secondurl}/Account/login`, data: info, method: 'POST'  , headers: {Authorization: ''}})
          .then(resp => {
            const token = resp.data.data
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            commit('auth_success', token)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.clear();
            delete axios.defaults.headers.common['Authorization']
            reject(err)
          })
      })
    },

    addChannel({ commit }, info) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: `${mainurl}/channel`, data: info, method: 'POST' })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    getContents(filter , category , page) {
      let content = queryString.stringify({filter: filter, category: category, page: page})
      return new Promise((resolve) => {
        axios({ url: `${mainurl}/Slider/content?${content}`, method: 'GET' ,
          headers: { 
              'Content-Type': 'application/json',
          }
      })
          .then(resp => {
            resolve(resp)
          })
      })
    },
  },
  modules: {
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})
