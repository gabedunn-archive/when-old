<template>
  <div class="header">
    <div class="container">
      <h1 v-text="title" />
      <button
        v-if="updateExists"
        class="button is-info update-button"
        @click="refreshApp"
      >
        Update available
        <span class="icon-parent">
          <fa icon="sync-alt" />
        </span>
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data () {
      return {
        title: this.$store.state.title,
        refreshing: false,
        registration: null,
        updateExists: false
      }
    },
    created () {
      document.addEventListener(
        'swUpdated', this.showRefreshUI, { once: true }
      )
      navigator.serviceWorker.addEventListener(
        'controllerchange', () => {
          if (this.refreshing) return
          this.refreshing = true
          window.location.reload()
        }
      )
    },
    methods: {
      showRefreshUI (e) {
        this.registration = e.detail
        this.updateExists = true
      },
      refreshApp () {
        this.updateExists = false
        if (!this.registration || !this.registration.waiting) { return }
        this.registration.waiting.postMessage('skipWaiting')
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~bulma/sass/utilities/_all";
  @import "~bulma/sass/elements/button";

  // header styles
  $grey: rgb(54, 54, 54);
  .wrapper .header {
    .container {
      padding: 2.5rem 1.5rem;
    }

    h1 {
      color: $grey;
      font-family: 'Source Sans Pro', sans-serif;
      font-size: 2.5rem;
      font-weight: 300 !important;
      line-height: 1.125;

      margin: 0;
    }
  }

  // update button styles
  .update-button {
    margin-top: 2rem;
  }

  .icon-parent {
    padding-left: 0.3rem;
  }
</style>
