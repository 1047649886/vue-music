import Vue from 'vue'
import Router from 'vue-router'
import FindMusic from '@/components/FindMusic'
import UserCenter from '@/components/UserCenter'
import Index from '@/components/Index'
import Cover from '@/components/Cover'
import Album from '@/components/Album'
import Comment from '@/components/Comment'
import PlayMusic from '@/components/PlayMusic'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Cover',
      component: Cover,
      meta:{keepAlive:true}
    },
    {
    	path:'/index',
    	name:'Index',
    	component:Index,
      children:[
        {
          path:'/findMusic',
          name:'FindMusic',
          component:FindMusic,
          meta:{keepAlive:true}
        },
        {
          path:'/userCenter',
          name:'UserCenter',
          component:UserCenter,
          meta:{keepAlive:true}
        }
      ]
    },
    {
      path:'/album/:index',
      name:'Album',
      component:Album,
      meta:{keepAlive:false}
    },
    {
      path:'/comment/:kind/:id/',
      name:'Comment',
      component:Comment,
      meta:{keepAlive:false}
    },
    {
      path:'/music/:id',
      name:'PlayMusic',
      component:PlayMusic,
      meta:{keepAlive:false}
    },
    // {
    //   path:'/music/:id/playing',
    //   name:'PlayMusic',
    //   component:PlayingMusic,
    //   meta:{keepAlive:true}
    // },

  ]
})
