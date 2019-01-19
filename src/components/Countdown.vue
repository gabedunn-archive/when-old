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
        const sign = dif > 0 ? '' : '-'
        const diff = dif > 0 ? dif : new Date(-dif)
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
        const mins = diff.getMinutes()
        const secs = diff.getSeconds()
        return `${sign}${days}d ${hours}h ${mins}m ${secs}s`
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
