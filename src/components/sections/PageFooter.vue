<template>
  <div class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <div v-if="loggedIn">
          Public Beta v3.0 by Gabe Dunn | <a @click="logout">
            Log Out
          </a>
        </div>
        <div v-else>
          Public Beta v3.0 by Gabe Dunn | <a :href="loginURL">
            Log In
          </a>
        </div>
        <ul class="social">
          <li
            v-for="(item, i) in socialItems"
            :key="i"
          >
            <a
              :href="item.href"
              target="_blank"
              rel="noopener"
            >
              <i :class="'socicon-' + item.icon" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { getOAuthURL, revokeOAuthToken } from '../../assets/js/trakt'

  export default {
    name: 'Footer',
    data () {
      return {
        socialItems: [
          { type: 'Twitter', href: 'https://twitter.com/redxtechx', icon: 'twitter' },
          { type: 'Email', href: 'mailto:gabe@redxtech.ca', icon: 'mail' },
          { type: 'YouTube', href: 'https://www.youtube.com/c/redxtech', icon: 'youtube' }
        ],
        loginURL: getOAuthURL()
      }
    },
    computed: {
      loggedIn () { return this.$store.getters.loggedIn }
    },
    methods: {
      logout () {
        revokeOAuthToken(this.$store.state.token)
        this.$store.dispatch('undefToken')
      }
    }
  }
</script>

<style scoped lang="scss">
  // footer styles
  .footer {
    padding: 1.5rem;
    background-color: #f5f5f5;

    .content {
      font-size: 0.9rem;

      .beta {
        display: inline;
      }

      .social {
        margin-top: 0;
        margin-left: 0;
        padding-top: 0.5rem;
        padding-left: 0;

        li {
          display: inline;
          font-size: 1.3rem;
          padding: 0 1.2rem;
        }
      }
    }
  }
</style>
