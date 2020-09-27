import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const mainurl = 'http://86.106.142.11:40000/api';

let state = {
    channels: [],
    channel: {},
},
    mutations = {
        Channels_List(state, payload) {
            state.channels.push(payload)
            // console.log(state.channels)
        },
        ChannelInfo(state, payload) {
            state.channel.push(payload)
        },
       
        nothing() { }
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

    getChannls({ commit }, page) {
        return new Promise((resolve, reject) => {
            axios({ url: `${mainurl}/channel/all?page=${page++}&pageSize=10`, method: 'Get' })
                .then(res => {
                    resolve(res)
                    commit('Channels_List', res.data.items)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    getChannelDetail({ commit }, payload) {
        return new Promise((resolve, reject) => {
            axios({ url: `${mainurl}/channel/${payload}`, method: 'Get' })
                .then(res => {
                    resolve(res)
                    commit('ChannelInfo', res.data)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

    deleteChannel({ commit }, id) {
        commit('nothing')
        return new Promise((resolve, reject) => {
            axios({ url: `${mainurl}/channel/${id}`, method: 'DELETE' })
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    },


}
const modules = {

}
const getters = {

}
export default ({
    state,
    mutations,
    actions,
    getters,
    modules,
    axios
})
