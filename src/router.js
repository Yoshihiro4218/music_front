import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Done from './views/Done.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/musics',
      name: 'Done',
      component: Done
    },
    {
      path: '/about',
      name: 'about',

      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
