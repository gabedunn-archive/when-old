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
    // token: null,
    token: process.env.VUE_APP_TEMP_TOKEN,
    slugs: [],
    showData: {},
    custom: false
  },
  getters: {
    showTitle: (state) => (slug) => state.showData[slug]?.show?.title ||
      'Loading...',
    showPoster: (state) => (slug) => state.showData[slug]?.poster || null,
    showStatus: (state) => (slug) => state.showData[slug]?.show?.status || null,
    showDate: (state) => (slug) => state.showData[slug]?.date || null
  },
  mutations: {
    changeToken (state, token) {
      state.token = token
    },
    nullToken (state) {
      state.token = null
    },
    changeSlugs (state, slugs) {
      state.slugs = slugs
    },
    changeCustom (state, status) {
      state.custom = status
    },
    setShowData (state, payload) {
      Vue.set(state.showData, payload.slug, payload.data)
    }
  },
  actions: {
    changeToken (context, token) {
      context.commit('changeToken', token)
    },
    nullToken (context) {
      context.commit('nullToken')
    },
    changeSlugs (context, slugs) {
      context.commit('changeSlugs', slugs)
    },
    changeCustom (context, status) {
      context.commit('changeCustom', status)
    },
    setShowData (context, payload) {
      context.commit('setShowData', payload)
    }
  }
  // plugins: [vuexPersist.plugin]
})
