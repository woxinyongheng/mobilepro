// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
import qs from 'qs'
// 引入echarts
import echarts from 'echarts'
//路由守卫
import routerConfig from './router/config'
routerConfig()

import  { LoadingPlugin,ToastPlugin } from 'vux'
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false




axios.defaults.baseURL = __PATH.FULLPATH;
axios.defaults.withCredentials=false //不设置
Vue.prototype.$http = {
    get: (url, param, flag) => {
        return axios.get(url, {
            params: param
        }).then((res) => {
            return Promise.resolve(res.data)
        }).catch((response) => {
            return Promise.resolve(response)
        })
    },
    post: (url, param, flag) => {
        if(localStorage.getItem('loginInfo')){
            var obj = JSON.parse(localStorage.getItem('loginInfo'))
            param.unitCode = obj.unitCode
            param.hospitalCode = obj.hospitalCode
            param.userId = obj.id
            // param.roleCode = JSON.parse(localStorage.getItem('ROLECODE')).roleCode
            param.roleCode = obj.roleCode   //测试使用

            param.userName = obj.name
        }
        let params=''
        if(param.flagkuayu){
            var formdata = new FormData();
            for(var item in param){
                formdata.append(item, param[item]||'');
            }
            params = formdata
        }else{
            params = qs.stringify(param)
        }
        return axios.post(url, params).then((res) => {
            return Promise.resolve(res.data)
        }).catch((res) => {
            return Promise.resolve(res)
        })
    }
}

//全局请求响应配置
axios.interceptors.request.use(config => { //spinShowSet
    Vue.$vux.loading.show({
        text:'加载中...'
    })
    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8;multipart/form-data'

    return config
}, error =>{
    Vue.$vux.loading.hide()
    return Promise.reject(error)
})

axios.interceptors.response.use(data => {
    Vue.$vux.loading.hide()
    if(data.data.code!=200){
        Vue.$vux.toast.show({
            text:data.data.message,
            time:2000,
            type:'warn'
        })
        Message.error(data.data.message)
    }

    return data
}, error => {
    Vue.$vux.loading.hide()
    return Promise.reject(error)
})




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
