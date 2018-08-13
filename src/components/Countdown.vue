<template>
  <h3 v-text="this.calculateDate"></h3>
</template>

<script>
  // TODO: optimize countdown algorithm without so many date objects
  export default {
    name: 'Countdown',
    props: {
      date: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        currentDate: new Date(),
        interval: null
      }
    },
    computed: {
      calculateDate () {
        const total = Date.parse(this.date) - Date.parse(this.currentDate)
        const seconds = Math.floor((total / 1000) % 60)
        const minutes = Math.floor((total / 1000 / 60) % 60)
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
        const days = Math.floor(total / (1000 * 60 * 60 * 24))
        return `${parseInt(days, 10)}d ${parseInt(hours, 10)}h ${parseInt(minutes, 10)}m ${parseInt(seconds, 10)}s`
      }
    },
    mounted () {
      this.interval = setInterval(() => {
        this.currentDate = new Date()
      }, 1000)
    },
    beforeDestroy () {
      clearInterval(this.interval)
    }
  }
</script>
