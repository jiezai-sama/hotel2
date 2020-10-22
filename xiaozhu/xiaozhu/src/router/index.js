//路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import Detail from '../views/Detail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/detail/:id',
    name: 'detail',
    component: Detail,
    props:true
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router