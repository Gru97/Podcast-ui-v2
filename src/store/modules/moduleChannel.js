import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const mainurl = 'http://86.106.142.11:40000/api';

let state = {
    channels: []
}
const mutations = {
    Channels_List(state , payload){
        state.channels.push(payload)
    },
    nothing(){}
}
const actions = {
    addChannel({ commit }, info) {
        return new Promise((resolve, reject) => {
            commit('nothing')
            axios({ url: `${mainurl}/channel`, data: info, method: 'POST' })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
    },

    getChannls({ commit }, page){
        return new Promise((resolve, reject) => {
            axios({ url: `${mainurl}/channel/all?page=${page++}&pageSize=10`, method: 'Get' })
            .then(res => {
                resolve(res)
                commit('Channels_List' , res.data)
            })
            .catch(err => {
                reject(err)
            })
        })
    }

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
