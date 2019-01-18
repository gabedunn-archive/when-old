<template>
  <div class="header">
    <div class="container">
      <h1 v-text="title" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data () {
      return {
        title: this.$store.state.title
      }
    }
  }
</script>

<style scoped lang="scss">
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
</style>
