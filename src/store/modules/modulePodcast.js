import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const mainurl = 'http://86.106.142.11:40000/api';


let state = {
    
}
const mutations = {
     nothing() { }
}
const actions = {

    ADD_PODCAST({ commit }, info) {
        return new Promise((resolve, reject) => {
                console.log(info)
            axios({ url: `${mainurl}/podcast`, data: info, method: 'POST' })
                .then(res => { 
                    resolve(res)
                    console.log('res.Data:'+res.Data)

                   commit('nothing')
                })
                .catch(err => {
                    reject(err)
                })
        })
    },





   /* ADD_PODCAST({ commit }, podInfo,filestreem) {
        console.log('podInfo:'+podInfo)
        return new Promise((resolve, reject) => {
           

        
            axios({ url: `${mainurl}/podcast`, data: podInfo, method: 'POST' })
            .then(res => {
                var fileDet={
                    id:res.data,
                    audioFile:filestreem,
                    category:0
                }
                console.log('res.data:'+fileDet)
                return new Promise((resolve, reject) => {
                    commit('nothing')
                    axios({ url: `${mainurl}/podcast/upload`, data: fileDet, method: 'POST' })
                    .then(res => {                                      
                        resolve(res)  
                        commit('nothing')             
                    })
                    .catch(err => {
                        reject(err)
                    })
               })
                      
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
