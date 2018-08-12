<template>
  <div class="shows">
    <show v-for="(slug, i) in slugs" :slug="slug" :key="key + i"></show>
  </div>
</template>

<script>
  import Show from '../Show.vue'
  import { checkOAuthToken, getLists, checkForWhenList, getWhenListItems } from '../../assets/js/trakt'

  export default {
    name: 'Shows',
    data () {
      return {}
    },
    async mounted () {
      if (this.$store.state.token !== null) {
        try {
          await checkOAuthToken(this.$store.state.token)
          try {
            const userLists = await getLists(this.$store.state.token)
            const whenListIsPresent = checkForWhenList(userLists)
            if (whenListIsPresent) {
              try {
                const whenListItems = (await getWhenListItems(this.$store.state.token)).map(item => item.show.ids.slug)
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
    computed: {
      slugs () {
        return this.$store.state.slugs
      },
      key () {
        return this.$store.state.custom ? 'custom-' : 'default-'
      }
    },
    components: {
      Show
    },
    methods: {
      useDefaultList () {
        if (this.$store.state.slugs.length === 0) {
          this.$store.dispatch('changeCustom', false)
          this.$store.dispatch('changeSlugs', ['game-of-thrones', 'shameless-2011'])
          // TODO: set default list to actual list from trakt.
        }
      }
    }
  }
</script>
