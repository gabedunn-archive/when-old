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
        slugs: this.$store.state.slugs,
        custom: false
      }
    },
    computed: {
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
