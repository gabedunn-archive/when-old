<template>
  <section id="main">
    <div class="wrapper">
      <PageHeader />
      <Shows/>
    </div>
    <PageFooter />
  </section>
</template>

<script>
  import PageHeader from '../components/sections/PageHeader'
  import Shows from '../components/sections/Shows'
  import PageFooter from '../components/sections/PageFooter'

  export default {
    name: 'Main',
    components: {
      PageHeader,
      Shows,
      PageFooter
    }
  }
</script>
