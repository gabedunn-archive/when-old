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
    token: undefined,
    slugs: [],
    showData: {},
    defaultList: true,
    defaultOrder: 150000000
  },
  getters: {
    loggedIn: state => !!state.token,
    shiftedOrder: state => shift => state.defaultOrder + shift,
    showTitle: state => slug => state.showData[slug]?.show?.title ||
      'Loading...',
    showPoster: state => slug => state.showData[slug]?.poster,
    showStatus: state => slug => state.showData[slug]?.show?.status,
    showDate: state => slug => state.showData[slug]?.date,
    showDescription: state => slug => state.showData[slug]?.show?.overview ||
      'Loading',
    showHomepage: state => slug => state.showData[slug]?.show?.homepage || '#',
    showIDS: state => slug => state.showData[slug]?.show?.ids,
    showNextEpisode: state => slug => !!state.showData[slug].nextEpisode,
    showNextEpisodeTitle: state => slug => state.showData[slug]?.nextEpisode
      ? state.showData[slug]?.nextEpisode?.title || 'title to be announced'
      : 'Loading...',
    showNextEpisodeDescription: state =>
      slug => state.showData[slug]?.nextEpisode
        ? state.showData[slug]?.nextEpisode?.overview || 'description to be' +
        ' announced' : 'Loading...'
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
    addSlug (state, slug) {
      state.slugs = state.slugs.concat(slug)
    },
    removeSlug (state, slug) {
      state.slugs = state.slugs.filter(newSlug => newSlug !== slug)
    },
    setShowData (state, payload) {
      Vue.set(state.showData, payload.slug, payload.data)
    },
    unsetSlugs (state) {
      state.slugs = []
    },
    changeDefaultList (state, status) {
      state.defaultList = status
    }
  },
  actions: {
    changeToken (context, token) {
      context.commit('changeToken', token)
    },
    undefToken (context) {
      context.commit('undefToken')
    },
    addSlug (context, slug) {
      context.commit('addSlug', slug)
    },
    removeSlug (context, slug) {
      context.commit('removeSlug', slug)
    },
    changeSlugs (context, slugs) {
      context.commit('changeSlugs', slugs)
    },
    setShowData (context, payload) {
      context.commit('setShowData', payload)
    },
    unsetSlugs (context) {
      context.commit('unsetSlugs')
    },
    changeDefaultList (context, status) {
      context.commit('changeDefaultList', status)
    }
  },
  plugins: [vuexPersist.plugin]
})
