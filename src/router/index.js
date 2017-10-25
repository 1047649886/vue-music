import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import FindMusic from '@/components/FindMusic'
import UserCenter from '@/components/UserCenter'
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: HelloWorld
    },
    {
    	path:'/',
    	name:'Index',
    	component:Index,
      children:[
        {
          path:'/findMusic',
          name:'FindMusic',
          component:FindMusic
        },
        {
          path:'/UserCenter',
          name:'UserCenter',
          component:UserCenter
        }
      ]
    }
  ]
})
