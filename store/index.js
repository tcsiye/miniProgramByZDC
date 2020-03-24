import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import home from './modules/home'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
		home,
		user,
  },
  getters
})
export default store
