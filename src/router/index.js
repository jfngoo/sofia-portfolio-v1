import Vue from 'vue'
import Router from 'vue-router'
import Intro from '@/components/Intro'
import Home from '@/components/Home'
import Project from '@/components/Project'
import About from '@/components/About'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'intro', component: Intro},
    { path: '/home', name: 'home', component: Home},
    { path: '/project/:id', name: 'project', component: Project},
    { path: '/about', name: 'about', component: About},
  ]
})
