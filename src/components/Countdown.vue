<template>
  <h3 v-text="calculateDate" />
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
      }
    },
    mounted () {
      this.interval = setInterval(() => {
        this.currentDate = new Date()
        if (this.currentDate > new Date(Date.parse(this.date))) {
          this.$emit('zeroed')
        }
      }, 1000)
    },
    beforeDestroy () {
      clearInterval(this.interval)
    }
  }
</script>
