import Vue from 'vue'
import Router from 'vue-router'
import Intro from './views/Intro'
import Home from './views/Home'
import Project from './components/Project'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'intro',
      component: Intro
    },
    {
      path: '/work',
      name: 'home',
      component: Home
    },
    {
      path: '/project/:id',
      name: 'project',
      component: Project
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
