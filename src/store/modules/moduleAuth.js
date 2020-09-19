import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const mainurl = 'http://86.106.142.11:40005';

let state = {
    token: localStorage.getItem('token') || '',
}
const mutations = {
    auth_success(state, token) {
        state.token = token
    },
    nothing(){}
}
const actions = {
    registerUser( {commit} ,info) {
        commit('nothing')
        return new Promise((resolve, reject) => {
            axios({ url: `${mainurl}/Account/register`, data: info, method: 'POST'  , headers: {Authorization: ''}})
            .then(resp => {
                localStorage.clear();
                delete axios.defaults.headers.common['Authorization']
                resolve(resp)
            })
            .catch(err => {
                localStorage.clear();
                delete axios.defaults.headers.common['Authorization']
                reject(err)
            })
        })
    },

    loginUser( { commit } ,info) {
        return new Promise((resolve, reject) => {
            axios({ url: `${mainurl}/Account/login`, data: info, method: 'POST'  , headers: {Authorization: ''}})
            .then(resp => {
                const token = resp.data.data
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                commit('auth_success', token)
                resolve(resp)
            })
            .catch(err => {
                localStorage.clear();
                delete axios.defaults.headers.common['Authorization']
                reject(err)
            })
        })
    },

}
const modules = {

}
const getters = {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
}
export default({
    state,
    mutations,
    actions,
    getters,
    modules,
    axios
})
