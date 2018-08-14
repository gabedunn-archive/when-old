<template>
  <h3 v-text="this.calculateDate"></h3>
</template>

<script>
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
        interval: undefined
      }
    },
    computed: {
      calculateDate () {
        const dif = new Date(Date.parse(this.date) - this.currentDate)
        const days = Math.floor(dif / (1000 * 60 * 60 * 24))
        const hours = Math.floor((dif / (1000 * 60 * 60)) % 24)
        return `${days}d ${hours}h ${dif.getMinutes()}m ${dif.getSeconds()}s`
      },
      calculateDate2 () {
        const total = new Date(Date.parse(this.date) - this.currentDate)
        // const total = Date.parse(this.date) - Date.parse(this.currentDate)
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
