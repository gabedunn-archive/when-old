<template>
  <div class="show" :style="`order: ${this.order};`">
    <div>
      <div class="poster">
        <img v-if="this.poster" :src="this.poster"/>
        <img v-else src="../assets/img/trakt.png"/>
      </div>
      <div class="details">
        <h2>{{ title }}</h2>
        <Countdown v-if="this.date" :date="this.date"></Countdown>
        <h3 v-else-if="this.status !== 'returning series'">{{ status }}.</h3>
        <h3 v-else>next to be announced.</h3>
      </div>
    </div>
  </div>
</template>

<script>
  import Countdown from './Countdown.vue'
  import { getShow, getNextEpisode } from '../assets/js/trakt'
  import { getPoster } from '../assets/js/tmdb'

  export default {
    name: 'Show',
    props: {
      slug: {
        type: String,
        required: true
      }
    },
    data () {
      return {}
    },
    async mounted () {
      const data = {}
      try {
        data.show = await getShow(this.slug)
        try {
          const path = await getPoster(data.show.ids.imdb)
          data.poster = `https://image.tmdb.org/t/p/w500/${path}`
        } catch (e) {
          console.log('Failed to get show poster:', e)
        }
      } catch (e) {
        console.log('Failed to get show data:', e)
      }
      try {
        data.date = await getNextEpisode(this.slug)
      } catch (e) { /* do nothing */ }
      this.$store.dispatch('setShowData', {slug: this.slug, data})
    },
    computed: {
      title () { return this.$store.getters.showTitle(this.slug) },
      poster () { return this.$store.getters.showPoster(this.slug) },
      status () { return this.$store.getters.showStatus(this.slug) },
      date () { return this.$store.getters.showDate(this.slug) },
      order () {
        return this.date
          ? parseInt(Date.parse(this.date)) / 100000
          : this.status === 'returning series'
            ? 150000000
            : this.status === 'canceled' ? 150000001 : 150000002
      }
    },
    components: {
      Countdown
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  // show styles
  $text: rgb(74, 74, 74);
  .show > div:first-child {
    user-select: none;
    display: flex;
    cursor: pointer;
    padding: 1rem;
    border-radius: 5px;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 3px rgba(10, 10, 10, .1),
    0 0 0 1px rgba(10, 10, 10, .1);

    &:hover {
      box-shadow: 0 4px 6px rgba(10, 10, 10, .1),
      0 0 0 2px rgba(10, 10, 10, .1);
    }

    animation: fadein 0.5s;
    @keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    a {
      color: $text;

      &:hover {
        text-decoration: underline;
      }
    }

    .poster {
      width: 65px;
      min-width: 65px;
      height: 97.5px;
      margin-right: 1rem;

      img {
        border-radius: 4px;
        max-width: 100%;
      }
    }

    .details {
      h2 {
        font-size: 1.6rem;
        font-weight: 300;
        margin: 0.5rem 0;
      }
      h3 {
        font-weight: 300;
        margin-bottom: 0;
      }
    }
  }
</style>
