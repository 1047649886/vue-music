import Vue from 'vue'
import Router from 'vue-router'
import FindMusic from '@/components/FindMusic'
import Index from '@/components/Index'
import Cover from '@/components/Cover'
import Album from '@/components/Album'
import Comment from '@/components/Comment'
import PlayMusic from '@/components/PlayMusic'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    //封面
    {
      path: '/',
      name: 'Cover',
      component: Cover,
      meta:{keepAlive:true}
    },
    //首页
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
      ]
    },
    //专辑
    {
      path:'/album/:index',
      name:'Album',
      component:Album,
      meta:{keepAlive:false}
    },
    //评论
    {
      path:'/comment/:kind/:id/',
      name:'Comment',
      component:Comment,
      meta:{keepAlive:false}
    },
    //播放歌曲
    {
      path:'/music/:id',
      name:'PlayMusic',
      component:PlayMusic,
      meta:{keepAlive:false},
    },
  ]
})
