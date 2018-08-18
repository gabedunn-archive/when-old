<template>
  <div class="shows">
    <show v-for="(slug, i) in slugs" :slug="slug" :key="key + i"></show>
    <message
      v-if="!loggedIn"
      title="sign in for your own list."
      message="click to login."
      :link="loginURL"
      order="150000002"
    />
  </div>
</template>

<script>
  import Show from '../Show.vue'
  import Message from '../Message'
  import {
    checkOAuthToken,
    getLists,
    checkForWhenList,
    getWhenListItems,
    getDefaultListItems,
    getOAuthURL
  } from '../../assets/js/trakt'

  export default {
    name: 'Shows',
    data () {
      return {
        loginURL: getOAuthURL()
      }
    },
    async mounted () {
      await this.init()
    },
    computed: {
      slugs () {
        return this.$store.state.slugs
      },
      key () {
        return this.$store.state.custom ? 'custom-' : 'default-'
      },
      token () {
        return this.$store.state.token
      },
      loggedIn () {
        return this.$store.getters.loggedIn
      }
    },
    components: {
      Show,
      Message
    },
    methods: {
      async init () {
        if (this.$store.state.token !== undefined) {
          try {
            await checkOAuthToken(this.$store.state.token)
            try {
              const userLists = await getLists(this.$store.state.token)
              const whenListIsPresent = checkForWhenList(userLists)
              if (whenListIsPresent) {
                try {
                  const whenListItems = (await getWhenListItems(this.$store.state.token)).map(
                    item => item.show.ids.slug)
                  if (whenListItems.length === 0) {
                    this.useDefaultList()
                  } else {
                    this.$store.dispatch('changeCustom', true)
                    this.$store.dispatch('changeSlugs', whenListItems)
                  }
                } catch (e) {
                  console.log('Failed to get when list items:', e)
                  this.useDefaultList()
                }
              } else {
                // create when list
                this.useDefaultList()
              }
            } catch (e) {
              console.log('Failed to get lists:', e)
              this.useDefaultList()
            }
          } catch (e) {
            console.log('Unable to check OAuth token:', e)
            this.useDefaultList()
          }
        } else {
          this.useDefaultList()
        }
      },
      async useDefaultList () {
        if (this.$store.state.slugs.length === 0) {
          try {
            const defaultWhenList = (await getDefaultListItems()).map(item => item.show.ids.slug)
            this.$store.dispatch('changeCustom', false)
            this.$store.dispatch('changeSlugs', defaultWhenList)
          } catch (e) {
            console.log('Error setting default list:', e)
            this.$store.dispatch('changeCustom', false)
            this.$store.dispatch('changeSlugs', ['game-of-thrones', 'shameless-2011'])
          }
        }
      }
    },
    watch: {
      async token () {
        if (!this.token) {
          this.$store.dispatch('unsetSlugs')
        }
        await this.init()
      }
    }
  }
</script>
