import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSyncAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.component('fa', {
  name: 'FontAwesomeIconWrapper',
  props: {
    icon: {
      type: String,
      required: true
    }
  },
  render (createElement) {
    return createElement(
      'font-awesome-icon',
      {
        props: {
          icon: [
            'fa',
            this.icon
          ]
        }
      }
    )
  }
})
