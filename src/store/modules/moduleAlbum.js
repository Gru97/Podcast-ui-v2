import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const mainurl = 'http://86.106.142.11:40000/api';

let state = {
    Albums: [],
    album:{}
}
const mutations = {
  
    albumInfo(state,payload){
        state.album.push(payload);
    },
    nothing() { }

}
const actions = {
    ADD_ALBUM({ commit }, info) {
        return new Promise((resolve, reject) => {
            console.log('info:')
            console.log(info)
            commit('nothing')
            axios({ url: `${mainurl}/album`, data: info, method: 'POST' })
            .then(res => {               
                resolve(res)
                console.log(res.data)
            })
            .catch(err => {
                reject(err)
            })
        })
    },

    DELETE_ALBUM({commit},id){
        return new Promise((resolve, reject) => {
            console.log('in axios/album id is:'+id)
            commit('nothing')
            axios({ url: `${mainurl}/album/${id}`, method: 'DELETE' })
            .then(res => {
                resolve(res)
               
            })
            .catch(err => {
                reject(err)
            })
        })
    },


    GET_ALBUM_DETAIL({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios({ url: `${mainurl}/album/${payload}`, method: 'Get' })
                .then(res => {
                    resolve(res)
                    commit('albumInfo', res.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    /*
    LIKE({ commit }) {
        return new Promise((resolve, reject) => {
            axios({ url: `${mainurl}/album`, method: 'PUT' })
                .then(res => {
                    resolve(res)
                    commit('albumInfo', res.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
   */

}
const modules = {

}
const getters = {
  
}
export default({
    state,
    mutations,
    actions,
    getters,
    modules,
    axios
})
