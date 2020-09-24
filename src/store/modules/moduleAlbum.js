import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const mainurl = 'http://86.106.142.11:40000/api';

let state = {
    Albums: []
}
const mutations = {
    Album_List(state , payload){
        state.album.push(payload)
    },
    nothing(){}
}
const actions = {
    ADD_ALBUM({ commit }, info) {
        return new Promise((resolve, reject) => {
            commit('nothing')
            axios({ url: `${mainurl}/album`, data: info, method: 'POST' })
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
export default({
    state,
    mutations,
    actions,
    getters,
    modules,
    axios
})
