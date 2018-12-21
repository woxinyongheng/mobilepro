<template>
  <div id="app">
    <router-view v-if="show"/>
  </div>
</template>

<script>
export default {
  name: 'App',
    data:function () {
        return{
          show:false
        }
    },
    mounted(){
      this.requestColeLode()
    },
    methods:{
      //worker teamleader
      requestColeLode(){
          let vm =this
          if (!sessionStorage.getItem('ROLECODE') && localStorage.getItem('isLogin') == '1') {
              vm.$http.post(__PATH.FULLPATH + 'userControl/findRoleCodeByUserCode', {
                  unitCode: JSON.parse(localStorage.getItem('loginInfo')).userOffice[0].unitCode,
                  hospitalCode: JSON.parse(localStorage.getItem('loginInfo')).userOffice[0].hospitalCode,
                  userId: JSON.parse(localStorage.getItem('staffInfo')).staffId
              }).then(res => {
                  if(res.code==200){
                      localStorage.setItem('ROLECODE',JSON.stringify(res.data))
                      vm.show=true

                  }else{
                      localStorage.setItem('prevLinkUrl',location.href)
                      location.href = __PATH.LOGOUT
                      return
                  }
              })
          }
      }
    }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
