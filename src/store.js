import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersist from 'vuex-persist'

// const vuexPersist = new VuexPersist({
//   key: 'when',
//   storage: localStorage
// })

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'when.',
    token: '',
    slugs: ['game-of-thrones'],
    showData: {}
  },
  mutations: {
    changeToken (state, token) {
      state.token = token
    }
  },
  actions: {
    changeToken (context, token) {
      context.commit('changeToken', token)
    }
  }
  // plugins: [vuexPersist.plugin]
})
