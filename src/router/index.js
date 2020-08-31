import Vue from 'vue'
import Router from 'vue-router'
import CreateEmployee from '@/components/CreateEmployee'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Create Employee',
    component: CreateEmployee
  }]
})
