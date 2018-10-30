<template>
    <div class="home">
      <div class="main">
        <router-view></router-view>
      </div>
      <tabbar>
        <tabbar-item link="/index" :selected="$route.path == '/index'">
          <img slot="icon" src="../../static/image/home.png">
          <img slot="icon-active" src="../../static/image/home-active.png" alt="">
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item link="/mine"  :selected="$route.path == '/mine'" >
          <img slot="icon" src="../../static/image/user.png">
          <img slot="icon-active" src="../../static/image/user-active.png" alt="">

          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
    </div>
</template>

<script>
  import { Tabbar, TabbarItem } from 'vux'

  export default {
        name: "Home",
        data:function () {
          return{

          }
        },
        components:{
          Tabbar, TabbarItem
        }
    }
</script>

<style scoped lang="scss">

</style>
