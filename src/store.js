import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
state:sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')): ''
})
export default store
