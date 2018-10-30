<template>
    <div class="home">
      <x-header :left-options="{showBack: false}" style="background-color:#2CC7C5;">我的工作<a style="color: #fff" slot="right">设备报修</a></x-header>


    </div>
</template>

<script>
  import { XHeader} from 'vux'
    export default {
        name: "Home",
        data:function () {
          return{

          }
        },
        components:{
          XHeader,
        },

    }
</script>

<style scoped lang="scss">
.home{

}
</style>
