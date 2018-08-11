import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersist from 'vuex-persist'
import {
  checkForWhenList,
  checkOAuthToken,
  getLists,
  getWhenListItems
} from './assets/js/trakt'

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
    computedSlugs: ['game-of-thrones', 'shameless'],
    showData: {},
    custom: false
  },
  getters: {
    slugs: async state => {
      const slugs = state.computedSlugs
      if (state.token !== null) {
        try {
          const valid = await checkOAuthToken(this.$store.state.token)
          if (valid !== null) {
            try {
              const userLists = await getLists(state.token)
              const whenListIsPresent = checkForWhenList(userLists)
              if (whenListIsPresent) {
                try {
                  return await getWhenListItems(state.token)
                } catch (e) {
                  console.log('Failed to get when list items:', e)
                }
              } else {
                // create when list
                return []
              }
            } catch (e) {
              console.log('Failed to get lists:', e)
            }
          }
        } catch (err) {
          return slugs
        }
      }
      return slugs
    }
  },
  mutations: {
    changeToken (state, token) {
      state.token = token
    },
    nullToken (state) {
      state.token = null
    }
  },
  actions: {
    changeToken (context, token) {
      context.commit('changeToken', token)
    },
    nullToken (context) {
      context.commit('nullToken')
    }
  }
  // plugins: [vuexPersist.plugin]
})
