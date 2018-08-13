import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'

Vue.use(Router)

export default new Router({
  // TODO: uncomment for history mode.
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    }
    // {
    //   path: '*',
    //   name: 'NotFound',
    //   component: () => import(/* webpackChunkName: "about" */
    // './views/About.vue') }
  ]
})
