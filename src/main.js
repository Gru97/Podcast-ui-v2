import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueSimpleAlert from "vue-simple-alert";
//import VuePersianDatetimePicker from 'vue-persian-datetime-picker';
import Axios from 'axios'

Vue.use(VueSimpleAlert, { reverseButtons: true });

Vue.config.productionTip = false

Vue.prototype.$http = Axios;
const token = `Bearer ${localStorage.token}`
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
  // Vue.prototype.$http.defaults.headers.common['Content-Type'] = application/json;
}

new Vue({
  router,
  store,
  Axios,
  vuetify,
  render: h => h(App)
}).$mount('#app')
