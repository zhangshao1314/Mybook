import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/css/index.css'
import './assets/css/origin.css'
import './assets/font/iconfont.css'
import './assets/font2/iconfont.css'
import axios from 'axios'
import store from './store'
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3001/api/'
axios.interceptors.request.use(function (config) {
  config.headers.token = window.sessionStorage.getItem('token')
  return config
}, function (err) {
  console.log(err)
})
Vue.prototype.$http = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
