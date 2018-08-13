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
    // token: undefined,
    token: process.env.VUE_APP_TEMP_TOKEN,
    slugs: [],
    showData: {},
    custom: false
  },
  getters: {
    showTitle: (state) => (slug) => state.showData[slug]?.show?.title ||
      'Loading...',
    showPoster: (state) => (slug) => state.showData[slug]?.poster,
    showStatus: (state) => (slug) => state.showData[slug]?.show?.status,
    showDate: (state) => (slug) => state.showData[slug]?.date
  },
  mutations: {
    changeToken (state, token) {
      state.token = token
    },
    undefToken (state) {
      state.token = undefined
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
    undefToken (context) {
      context.commit('undefToken')
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
