<template>
  <section id="main">
    <div class="wrapper">
      <PageHeader/>
      <Shows/>
    </div>
    <PageFooter/>
  </section>
</template>

<script>
  import PageHeader from '../components/sections/PageHeader'
  import Shows from '../components/sections/Shows'
  import PageFooter from '../components/sections/PageFooter'

  import { getOAuthToken, checkOAuthToken } from '../assets/js/trakt'

  export default {
    name: 'Main',
    components: {
      PageHeader,
      Shows,
      PageFooter
    },
    async mounted () {
      const codeFromUrl = new URL(window.location).searchParams.get('code')
      if (codeFromUrl) {
        console.log('Got code from url.')
        try {
          const token = await getOAuthToken(codeFromUrl)
          console.log('Acquired OAUth token:', token)
          this.$store.dispatch('changeToken', token)
        } catch (err) {
          console.log('Failed to acquire OAuth token:', err)
          this.$store.dispatch('undefToken')
        }
        history.replaceState({}, this.$store.state.title, '/')
      } else if (this.$store.state.token !== undefined) {
        console.log('Got token from persistent store.')
        console.log('Checking OAuth token...')
        try {
          await checkOAuthToken(this.$store.state.token)
          console.log('OAuth token valid.')
        } catch (err) {
          console.log('OAuth token expired or not valid.')
          this.$store.dispatch('undefToken')
        }
      } else {
        console.log('No OAuth token found.')
      }
    }
  }
</script>
