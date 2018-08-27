<template>
  <div class="shows">
    <show v-for="slug in slugs" :slug="slug" :key="slug"></show>
    <message
      v-if="!loggedIn"
      title="sign in for your own list."
      message="click to login."
      :link="loginURL"
      :order="$store.getters.shiftedOrder(3)"
    />
    <add-show v-if="loggedIn" :order="$store.getters.shiftedOrder(4)"/>
  </div>
</template>

<script>
  import Show from '../Show.vue'
  import Message from '../Message'
  import AddShow from '../AddShow'
  import {
    checkOAuthToken,
    getLists,
    checkForWhenList,
    getWhenListItems,
    getDefaultListItems,
    getOAuthURL,
    createWhenList
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
      token () {
        return this.$store.state.token
      },
      loggedIn () {
        return this.$store.getters.loggedIn
      }
    },
    components: {
      Show,
      Message,
      AddShow
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
                    this.$store.dispatch('changeSlugs', whenListItems)
                  }
                } catch (e) {
                  console.error('Failed to get when list items:', e)
                  this.useDefaultList()
                }
              } else {
                try {
                  createWhenList(this.$store.state.token)
                } catch (e) {
                  console.error('Failed to create when list:', e)
                }
                this.useDefaultList()
              }
            } catch (e) {
              console.error('Failed to get lists:', e)
              this.useDefaultList()
            }
          } catch (e) {
            console.error('Unable to check OAuth token:', e)
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
            this.$store.dispatch('changeSlugs', defaultWhenList)
          } catch (e) {
            console.error('Error setting default list:', e)
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
