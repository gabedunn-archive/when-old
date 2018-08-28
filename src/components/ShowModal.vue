<template>
  <div class="modal">
    <!--<img v-if="this.backdrop" :src="this.backdrop" class="modal-background" @click="$emit('close')" />-->
    <!--<div v-else="this.backdrop" class="modal-background" @click="$emit('close')"></div>-->
    <div class="modal-background" @click="$emit('close')"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <a :href="homepage" :target="linkTarget" v-text="title"></a>
          <template v-if="loggedIn && !defaultList"> - <a class="remove" @click="remove">Remove</a></template>
        </p>
        <i class="material-icons close" @click="$emit('close')">close</i>
      </header>
      <section class="modal-card-body">
        <div class="show-info modal-body-content">
          <p v-text="description"></p>
          <div class="links">
            <h3><a :href="homepage" :target="linkTarget">Homepage</a></h3>
            <h3 v-if="hasImdb"><a :href="imdbLink" :target="linkTarget">IMDb</a></h3>
            <h3 v-if="hasTmdb"><a :href="tmdbLink" :target="linkTarget">TMDb</a></h3>
            <h3 v-if="hasTrakt"><a :href="traktLink" :target="linkTarget">Trakt.tv</a></h3>
          </div>
        </div>
        <div v-if="poster" class="poster modal-body-content">
          <a :href="homepage" :target="linkTarget">
            <img v-if="poster" :src="poster"/>
          </a>
        </div>
        <div v-if="this.nextEpisode" class="next-episode modal-body-content">
          <h2>Next Episode - {{ nextEpisodeTitle }}</h2>
          <Countdown v-if="this.date" :date="this.date"></Countdown>
          <p v-text="this.nextEpisodeDescription"></p>
        </div>
        <div v-else class="no-next-episode modal-body-content">
          <h3 v-if="returning">next episode to be announced</h3>
          <h3 v-else>no future episodes - {{ status }}</h3>
        </div>
      </section>
      <footer class="modal-card-foot">
        <a class="button is-success" @click="$emit('close')">close</a>
      </footer>
    </div>
  </div>
</template>

<script>
  import Countdown from './Countdown.vue'
  import { removeShowFromWhenList } from '../assets/js/trakt'

  export default {
    name: 'ShowModal',
    props: ['slug'],
    data () {
      return {}
    },
    components: {
      Countdown
    },
    computed: {
      loggedIn () { return this.$store.getters.loggedIn },
      defaultList () { return this.$store.state.defaultList },
      title () { return this.$store.getters.showTitle(this.slug) },
      poster () { return this.$store.getters.showPoster(this.slug) },
      status () { return this.$store.getters.showStatus(this.slug) },
      date () { return this.$store.getters.showDate(this.slug) },
      description () { return this.$store.getters.showDescription(this.slug) },
      homepage () { return this.$store.getters.showHomepage(this.slug) },
      ids () { return this.$store.getters.showIDS(this.slug) },
      nextEpisode () { return this.$store.getters.showNextEpisode(this.slug) },
      nextEpisodeTitle () { return this.$store.getters.showNextEpisodeTitle(this.slug) },
      nextEpisodeDescription () { return this.$store.getters.showNextEpisodeDescription(this.slug) },
      returning () { return this.status === 'returning series' },
      imdbLink () { return this.ids ? `http://www.imdb.com/title/${this.ids.imdb}` : '#' },
      tmdbLink () { return this.ids ? `https://www.themoviedb.org/tv/${this.ids.tmdb}` : '#' },
      traktLink () { return this.ids ? `https://trakt.tv/shows/${this.ids.trakt}` : '#' },
      hasImdb () { return this.ids ? this.ids.hasOwnProperty('imdb') ? this.ids.imdb : false : false },
      hasTmdb () { return this.ids ? this.ids.hasOwnProperty('tmdb') ? this.ids.tmdb : false : false },
      hasTrakt () { return this.ids ? this.ids.hasOwnProperty('trakt') ? this.ids.trakt : false : false },
      linkTarget () { return this.homepage ? '_blank' : '' }
    },
    async mounted () {},
    methods: {
      async remove () {
        try {
          const remove = await removeShowFromWhenList(this.$store.state.token, this.slug)
          if (remove.deleted.shows === 1) {
            this.$store.dispatch('removeSlug', this.slug)
          } else {
            console.error('Failed to remove show from list.')
          }
        } catch (e) {
          console.error('Failed to remove show from list:', e)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  $modal-z: 2;
  $tablet: 768px;

  .modal {
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: fixed;
    z-index: $modal-z;
    display: flex;
  }

  .modal-background {
    $opacity: 0.86;
    /*width: 100%;*/
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    opacity: $opacity;
    filter: alpha($opacity);
    background-color: rgba(10, 10, 10, 1);
  }

  .modal-content, .modal-card {
    margin: 0 20px;
    max-height: calc(100vh - 160px);
    overflow: auto;
    position: relative;
    width: 100%;

    font-weight: 300;

    p, h2, h3 {
      font-weight: 300;
    }

    h2:first-child {
      margin-top: 0;
    }

    .show-info {
      display: flex;
      flex-flow: wrap;
      p {
        flex: 1 0 95%;
        margin-top: 0;
      }
      .links {
        display: flex;
        justify-content: space-around;
        align-content: space-around;
        flex-flow: wrap;
        flex: 1 0 25%;

        h3 {
          display: inline;
          margin: 0;
        }
      }
    }

    .poster {
      display: none;
    }

    @media (min-width: $tablet) {
      margin: 0 auto;
      max-height: calc(100vh - 40px);
      width: 640px;

      .poster {
        display: block;
        $width: 100px;
        width: $width;
        min-width: $width;
        max-width: $width;
        /*height: 97.5px;*/
        margin-right: 1rem;
        padding-left: 2rem;

        order: 0;

        img {
          border-radius: 4px;
          max-width: 100%;
        }
      }
    }
  }

  .modal-body-content {
    flex: 1 0 90%;
    margin-bottom: 1.5rem;

    @media (min-width: $tablet) {
      flex: 1 0 45%;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  .modal-card-body {
    -webkit-overflow-scrolling: touch;
    background-color: white;
    flex-grow: 1;
    flex-shrink: 1;
    overflow: auto;
    padding: 0 20px;
    display: flex;
    flex-flow: wrap;
    h2 a {
      color: #4a4a4a;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .close {
    cursor: pointer;
  }

  .modal-card {
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 40px);
    overflow: hidden;
  }

  .modal-card-head, .modal-card-foot {
    align-items: center;
    background-color: white;
    display: flex;
    flex-shrink: 0;
    justify-content: flex-start;
    padding: 20px;
    position: relative;
  }

  .modal-card-head {
    /*border-bottom: 1px solid #dbdbdb;*/
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .modal-card-title {
    color: #363636;
    flex-grow: 1;
    flex-shrink: 0;
    font-size: 1.5rem;
    line-height: 1;
    margin: 0;

    a {
      color: #4a4a4a;
      &:hover {
        text-decoration: underline;
      }
    }

    .remove {
      color: red;
    }
  }

  .modal-card-foot {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    /*border-top: 1px solid #dbdbdb;*/
    .button {
      &:not(:last-child) {
        margin-right: 10px;
      }
    }
  }

  a.button {
    padding-top: 0;
    padding-bottom: 0;
  }

  .button {
    -moz-appearance: none;
    -webkit-appearance: none;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: 3px;
    -webkit-box-shadow: none;
    box-shadow: none;
    display: inline-flex;
    font-size: 1rem;
    height: 2.25em;
    line-height: 1.5;
    padding-bottom: calc(0.375em - 1px);
    padding-top: calc(0.375em - 1px);
    position: relative;
    vertical-align: top;
    -webkit-touch-callout: none;
    user-select: none;
    background-color: white;
    color: #363636;
    cursor: pointer;
    justify-content: center;
    padding-left: 0.75em;
    padding-right: 0.75em;
    text-align: center;
    white-space: nowrap;
    &:hover {
      border-color: #b5b5b5;
      color: #363636;
    }
    &:active {
      border-color: #4a4a4a;
      -webkit-box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);
      color: #363636;
    }
    &:focus {
      border-color: #00d1b2;
      color: #363636;
    }
  }
</style>
