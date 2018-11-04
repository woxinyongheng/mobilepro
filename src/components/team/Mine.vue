<template>
    <div class="mine">
      <x-header :left-options="{showBack: false}" style="background-color:#2CC7C5;">我的报修</x-header>
        <tab bar-active-color="#38C7C4">
            <tab-item active-class="active" selected @on-item-click="onItemClick">未派工</tab-item>
            <tab-item active-class="active"  @on-item-click="onItemClick">已派工</tab-item>
            <tab-item active-class="active"  @on-item-click="onItemClick">已挂单</tab-item>
            <tab-item active-class="active" @on-item-click="onItemClick">已完成</tab-item>
        </tab>
        <div class="content">
            <mincard v-for="(item,index) in 6" :key="index"></mincard>
        </div>
    </div>
</template>

<script>
  import { XHeader,Tab, TabItem} from 'vux'
  import mincard from '../minetem/Card'

  export default {
        name: "Mine",
        data:function () {
          return{

          }
        },
      methods:{
          onItemClick(){

          }
      },
        components:{
          XHeader,Tab, TabItem,mincard
        },
    }
</script>

<style scoped lang="scss">
    .mine{
        height: 100%;
        .active{
            color:#38C7C4 !important;
            border-color: #38C7C4 !important;
        }
        .content{
            height: calc(100vh - 150px);
            overflow-y: scroll;
        }
    }


</style>
