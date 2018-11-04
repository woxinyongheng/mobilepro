import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

//班组
//首页
import Index from '@/components/team/Index'
//班组任务
import  TMainTask from '@/components/team/teamtask/TMainTask'  //班组保养
import  TMainInfo from '@/components/team/teamtask/TMainInfo'  //班组保养详情
import  SelectPerson from '@/components/team/teamtask/SelectPerson'  //指派人员




import  TServiceTask from '@/components/team/teamtask/TServiceTask' //班组维修
//我的任务
import  MainTask from '@/components/team/mineTask/MainTask' //我的保养
import  ServiceTask from '@/components/team/mineTask/ServiceTask'//我的维修

//我的
import Mine from '@/components/team/Mine'


//报修
import SelectDevice from '@/components/scan/SelectDevice'
import  Grade from '@/components/scan/Grade'

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

    },{
          path:'/SelectDevice',
          name:'SelectDevice',
          component:SelectDevice
      },{
          path:'/Grade/:id',
          name:'Grade',
          component:Grade
      },{
          path:'/TMainTask',
          name:'TMainTask',
          component:TMainTask
      },{
          path:'/TServiceTask',
          name:'TServiceTask',
          component:TServiceTask
      },{
          path:'/MainTask',
          name:'MainTask',
          component:MainTask
      },{
          path:'/ServiceTask',
          name:'ServiceTask',
          component:ServiceTask
      },{
          path:'/TMainInfo/:id',
          name:'TMainInfo',
          component:TMainInfo
      },{
          path:'/SelectPerson/:ids',
          name:'SelectPerson',
          component:SelectPerson
      }

  ]
})
