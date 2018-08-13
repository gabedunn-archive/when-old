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
        return `${dif.getDate()}d ${dif.getHours()}h ${dif.getMinutes()}m ${dif.getSeconds()}s`
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
