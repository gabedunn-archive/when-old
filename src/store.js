import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'when',
  storage: localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'when.',
    token: ''
  },
  mutations: {
    changeToken (state, token) {
      state.token = token
    }
  },
  actions: {},
  plugins: [vuexPersist.plugin]
})
