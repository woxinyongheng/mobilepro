import router from './index'

const routerConfig = () => {
  router.beforeEach((to, from, next) => {
    let toPath = to.name
    let fromPath = from.name
      if(localStorage.getItem('isLogin')!=1){
        localStorage.setItem('prevLinkUrl',location.href)
        location.href = __PATH.LOGOUT
        return
      }
    if(!localStorage.getItem('loginInfo')&& toPath != 'Login'){
      next('/login')
    }
    if(localStorage.getItem('loginInfo')&& (toPath == 'Login'||!toPath)){
      next('/index')
      return
    }


    next()
  })

  router.onReady(() => {
  })
}

export default routerConfig
