<template>
  <div
    class="show message"
    :style="`order: ${orderStyle};`"
  >
    <div>
      <div class="poster">
        <a
          :href="link"
          :target="targetText"
          :rel="targetRel"
          aria-label="OAuth Link"
        >
          <img
            src="../assets/img/trakt-icon-red.svg"
            alt="trakt poster"
          >
        </a>
      </div>
      <div class="details">
        <h2>
          <a
            v-if="isLink"
            :href="link"
            :target="targetText"
            :rel="targetRel"
          >
            {{ title }}
          </a>
          <template v-else>
            {{ title }}
          </template>
        </h2>
        <h3>
          <a
            v-if="isLink"
            :href="link"
            :rel="targetRel"
          >
            {{ message }}
          </a>
          <template v-else>
            {{ message }}
          </template>
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Message',
    props: {
      title: {
        type: String,
        required: true
      },
      message: {
        type: String,
        required: true
      },
      link: {
        type: String,
        required: false,
        default: '#'
      },
      target: {
        type: String,
        required: false,
        default: '',
        validator: value => ['', '_blank', '_self', '_parent', '_top'].includes(value)
      },
      order: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        modal: false
      }
    },
    computed: {
      isLink () { return this.link !== '#' },
      targetText () { return this.target ? '_blank' : '' },
      targetRel () { return this.target ? 'noopener' : '' },
      orderStyle () { return this.order ? this.order : 150000000 }
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
