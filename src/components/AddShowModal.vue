<template>
  <div class="modal">
    <div
      class="modal-background"
      @click="$emit('close')"
    />
    <div class="modal-card">
      <header class="modal-card-head">
        <p
          class="modal-card-title"
          v-text="title"
        />
        <i
          class="material-icons close"
          @click="$emit('close')"
        >
          close
        </i>
      </header>
      <section class="modal-card-body">
        <div class="show-info modal-body-content">
          <div class="input-container">
            <label for="slug-input">
              show slug:
            </label>
            <input
              id="slug-input"
              v-model="slug"
              class="has-padding-md"
              type="text"
            >
            <a
              class="button"
              @click="addShow(slug)"
            >
              Add Show
            </a>
          </div>
          <br v-if="notFound">
          <div
            v-if="notFound"
            class="notification"
          >
            <h2>show not found.</h2>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <a
          class="button is-success"
          @click="$emit('close')"
        >
          close
        </a>
      </footer>
    </div>
  </div>
</template>

<script>
  import { addShowToWhenList } from '../assets/js/trakt'

  export default {
    name: 'AddShowModal',
    props: {
      title: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        slug: undefined,
        notFound: false
      }
    },
    methods: {
      async addShow (slug) {
        try {
          const addShow = await addShowToWhenList(this.$store.state.token, slug)
          if (addShow.added.shows === 1) {
            this.$store.dispatch('addSlug', slug)
          } else if (addShow.not_found.shows.length === 1) {
            this.notFound = true
            setTimeout(() => {
              this.notFound = false
            }, 5000)
            console.error('Show Not Found')
          } else {
            console.error('Failed to add show to list.')
          }
        } catch (e) {
          console.error('Failed to add show to list:', e)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  $modal-z: 2;
  $tablet: 768px;

  .notification {
    animation: fadein 0.5s;
    @keyframes fadein {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    h2 {
      text-align: center;
      margin: 0 auto;
    }
  }

  .modal {
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: fixed;
    z-index: $modal-z;
    display: flex;
  }

  .modal-background {
    $opacity: 0.86;
    /*width: 100%;*/
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    opacity: $opacity;
    filter: alpha($opacity);
    background-color: rgba(10, 10, 10, 1);
  }

  .modal-content, .modal-card {
    margin: 0 20px;
    max-height: calc(100vh - 160px);
    overflow: auto;
    position: relative;
    width: 100%;

    font-weight: 300;

    p, h2, h3 {
      font-weight: 300;
    }

    h2:first-child {
      margin-top: 0;
    }

    .show-info {
      display: flex;
      flex-flow: wrap;
      p {
        flex: 1 0 95%;
        margin-top: 0;
      }
      .links {
        display: flex;
        justify-content: space-around;
        align-content: space-around;
        flex-flow: wrap;
        flex: 1 0 25%;

        h3 {
          display: inline;
          margin: 0;
        }
      }
    }

    .poster {
      display: none;
    }

    @media (min-width: $tablet) {
      margin: 0 auto;
      max-height: calc(100vh - 40px);
      width: 640px;

      .poster {
        display: block;
        $width: 100px;
        width: $width;
        min-width: $width;
        max-width: $width;
        /*height: 97.5px;*/
        margin-right: 1rem;
        padding-left: 2rem;

        order: 0;

        img {
          border-radius: 4px;
          max-width: 100%;
        }
      }
    }
  }

  .modal-body-content {
    flex: 1 0 90%;
    margin-bottom: 1.5rem;

    @media (min-width: $tablet) {
      flex: 1 0 45%;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  .modal-card-body {
    -webkit-overflow-scrolling: touch;
    background-color: white;
    flex-grow: 1;
    flex-shrink: 1;
    overflow: auto;
    padding: 0 20px;
    display: flex;
    flex-flow: wrap;
    h2 a {
      color: #4a4a4a;
      &:hover {
        text-decoration: underline;
      }
    }

    label {
      font-size: 1.5rem;
      display: inline;
    }

    #slug-input {
      font-size: 1.5rem;
      margin: {
        left: 1rem;
        right: 1rem;
      }
    ;
    }
  }

  .close {
    cursor: pointer;
  }

  .modal-card {
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 40px);
    overflow: hidden;
  }

  .modal-card-head, .modal-card-foot {
    align-items: center;
    background-color: white;
    display: flex;
    flex-shrink: 0;
    justify-content: flex-start;
    padding: 20px;
    position: relative;
  }

  .modal-card-head {
    /*border-bottom: 1px solid #dbdbdb;*/
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .modal-card-title {
    color: #363636;
    flex-grow: 1;
    flex-shrink: 0;
    font-size: 1.5rem;
    line-height: 1;
    margin: 0;

    a {
      color: #4a4a4a;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .modal-card-foot {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    /*border-top: 1px solid #dbdbdb;*/
    .button {
      &:not(:last-child) {
        margin-right: 10px;
      }
    }
  }

  a.button {
    padding-top: 0;
    padding-bottom: 0;
  }

  .button {
    -moz-appearance: none;
    -webkit-appearance: none;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border: 1px solid #dbdbdb;
    border-radius: 3px;
    -webkit-box-shadow: none;
    box-shadow: none;
    display: inline-flex;
    font-size: 1rem;
    height: 2.25em;
    line-height: 1.5;
    padding-bottom: calc(0.375em - 1px);
    padding-top: calc(0.375em - 1px);
    position: relative;
    vertical-align: top;
    -webkit-touch-callout: none;
    user-select: none;
    background-color: white;
    color: #363636;
    cursor: pointer;
    justify-content: center;
    padding-left: 0.75em;
    padding-right: 0.75em;
    text-align: center;
    white-space: nowrap;
    &:hover {
      border-color: #b5b5b5;
      color: #363636;
    }
    &:active {
      border-color: #4a4a4a;
      -webkit-box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);
      color: #363636;
    }
    &:focus {
      border-color: #00d1b2;
      color: #363636;
    }
  }
</style>
