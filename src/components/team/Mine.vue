<template>
    <div class="mine">
      <x-header :left-options="{showBack: false}" style="background-color:#2CC7C5;">我的报修</x-header>

    </div>
</template>

<script>
  import { XHeader} from 'vux'

  export default {
        name: "Mine",
        data:function () {
          return{

          }
        },
        components:{
          XHeader,
        },
    }
</script>

<style scoped>

</style>
