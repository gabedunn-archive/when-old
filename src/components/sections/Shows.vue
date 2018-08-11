<template>
  <div class="shows">
    <show v-for="(slug, i) in slugs" :slug="slug" :key="key + i"></show>
  </div>
</template>

<script>
  import Show from '../Show.vue'

  export default {
    name: 'Shows',
    data () {
      return {
        slugs: []
      }
    },
    async mounted () {
      this.slugs = await this.computedSlugs
    },
    computed: {
      computedSlugs () {
        return this.$store.getters.slugs
      },
      key () {
        return this.custom ? 'custom-' : 'default-'
      }
    },
    components: {
      Show
    },
    methods: {}
  }
</script>
