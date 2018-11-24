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
import  TServiceInfo from '@/components/team/teamtask/TServiceInfo'  //班组维修详情
import  TServiceTask from '@/components/team/teamtask/TServiceTask' //班组维修
//我的任务
import  MainTask from '@/components/team/minetask/MainTask' //我的保养
import  MainInfo from '@/components/team/minetask/MainInfo'  //我的保养详情

import  ServiceTask from '@/components/team/minetask/ServiceTask'//我的维修
import ServiceInfo from '@/components/team/minetask/ServiceInfo'



//我的
import Mine from '@/components/team/Mine'
import RepairInfo from '@/components/team/RepairInfo'


//报修
import SelectDevice from '@/components/scan/SelectDevice'
import  Grade from '@/components/scan/Grade'


//挂单
import PayMent from '@/components/team/minetask/PayMent'
//维修
import Repair from '@/components/team/minetask/Repair'
import AddParts from '@/components/team/minetask/AddParts'

//保养登记
import Maintain from '@/components/team/minetask/Maintain'

// 计划任务
import PlanTask from '@/components/plan/PlanTask'
import PlanInfo from '@/components/plan/PlanInfo'
import TaskInfo from '@/components/plan/TaskInfo'


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
        path:'/ServiceInfo/:id',
          name:'ServiceInfo',
          component:ServiceInfo
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
          path:'/SelectPerson/:type/:ids',
          name:'SelectPerson',
          component:SelectPerson
      },{
          path:'/TServiceInfo/:id',
          name:'TServiceInfo',
          component:TServiceInfo
      },{
          path:'/MainInfo/:id',
          name:'MainInfo',
          component:MainInfo
      },{//RepairInfo
          path:'/RepairInfo/:id/:equipid/:state',
          name:'RepairInfo',
          component:RepairInfo
      },{
        path:'/PayMent/:type/:id',
          name:'PayMent',
          component:PayMent
      },{
      path:'/Repair/:id',
          name:'Repair',
          component:Repair
      },{
        path:'/AddParts',
          name:'AddParts',
          component:AddParts
      },{
        path:'/Maintain/:id',
          name:'Maintain',
          component:Maintain
      },{
        path:'/PlanTask',
          name:'PlanTask',
          component:PlanTask
      },{
      path:'/PlanInfo/:id',
          name:'PlanInfo',
          component:PlanInfo
      },{
      path:'/TaskInfo/:id',
          name:'TaskInfo',
          component:TaskInfo
      }

  ]
})
