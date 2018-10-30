import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

//班组
//首页
import Index from '@/components/team/Index'
//我的
import Mine from '@/components/team/Mine'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: "/index"
    },{
      path:'/',
      name:'Home',
      component:Home,
      ridirect: "/home/index",
      children:[
        {
          path: 'index',
          name: 'Index',
          component: Index
        },
        {
          path: 'mine',
          name: 'Mine',
          component: Mine
        }
      ]

    },

  ]
})
