<template>
  <section id="main">
    <div class="wrapper">
      <PageHeader />
      <!--<Shows/>-->
    </div>
    <PageFooter />
  </section>
</template>

<script>
  import PageHeader from '../components/sections/PageHeader'
  import PageFooter from '../components/sections/PageFooter'

  export default {
    name: 'Main',
    components: {
      PageHeader,
      PageFooter
    }
  }
</script>
