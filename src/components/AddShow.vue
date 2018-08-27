<template>
  <div class="show message" :style="`order: ${this.orderStyle};`">
    <div @click="showModal">
      <div class="poster">
        <img src="../assets/img/plus.svg">
      </div>
      <div class="details">
        <h2 v-text="title"></h2>
        <h3 v-text="message"></h3>
      </div>
    </div>
    <add-show-modal v-if="modal" :title="title" @close="hideModal"/>
  </div>
</template>

<script>
  import AddShowModal from './AddShowModal'

  export default {
    name: 'AddShow',
    props: {
      order: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        title: 'add show',
        message: 'click to add a new show.',
        modal: false
      }
    },
    computed: {
      orderStyle () { return this.order ? this.order : 150000000 }
    },
    components: {
      AddShowModal
    },
    methods: {
      showModal () {
        this.modal = true
      },
      hideModal () {
        this.modal = false
      }
    }
  }
</script>

<style scoped lang="scss">
  // message styles
  $text: rgb(74, 74, 74);
  .show > div:first-child {
    user-select: none;
    display: flex;
    cursor: pointer;
    padding: 1rem;
    border-radius: 5px;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 3px rgba(10, 10, 10, .1),
    0 0 0 1px rgba(10, 10, 10, .1);

    &:hover {
      box-shadow: 0 4px 6px rgba(10, 10, 10, .1),
      0 0 0 2px rgba(10, 10, 10, .1);
    }

    animation: fadein 0.5s;
    @keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    a {
      color: $text;

      &:hover {
        text-decoration: underline;
      }
    }

    .poster {
      width: 65px;
      min-width: 65px;
      height: 97.5px;
      margin-right: 1rem;
      display: flex;
      align-items: center;

      img {
        border-radius: 4px;
        width: 100%;
        height: auto;
        fill: #363636;
      }
    }

    .details {
      h2 {
        font-size: 1.6rem;
        font-weight: 300;
        margin: 0.5rem 0;
      }
      h3 {
        font-weight: 300;
        margin-bottom: 0;
      }
    }
  }
</style>
