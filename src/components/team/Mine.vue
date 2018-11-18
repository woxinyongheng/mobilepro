<template>
    <div class="mine">
      <x-header :left-options="{showBack: false}" style="background-color:#2CC7C5;">我的报修</x-header>
        <tab bar-active-color="#38C7C4">
            <tab-item active-class="active" selected @on-item-click="onItemClick('0')">未派工</tab-item>
            <tab-item active-class="active"  @on-item-click="onItemClick('2')">已派工</tab-item>
            <tab-item active-class="active"  @on-item-click="onItemClick('1')">已挂单</tab-item>
            <tab-item active-class="active" @on-item-click="onItemClick('3')">已完成</tab-item>
        </tab>
        <div class="content" @scroll="scrollAjax">
            <div class="scrollbox">
                <mincard v-for="(item,index) in listData" :key="index" :item="item"  @routerToinfo="routerToinfo"></mincard>

            </div>
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
              pageSize:10,
              currentPage:1,
              total:0,
              listData:[],
              state:0,
              scroll:false
          }
        },
      mounted(){
        this.requestList()
      },
      methods:{
          routerToinfo(item){
              let vm =this
              this.$router.push('/RepairInfo/'+item.id+'/'+item.equipmentId+'/'+vm.state)
              sessionStorage.setItem(item.equipmentId,JSON.stringify(item))
          },
          onItemClick(str){
            this.state = str
              this.requestList()
          },
      //    列表
          requestList(str){
              let vm =this
              vm.$http.post('equipmentListController/getMyRepairs',{
                  pageSize:vm.pageSize,
                  currentPage:vm.currentPage,
                  state:vm.state
              }).then(res=>{
                  if(res.code==200){
                      if(str){
                          vm.listData = vm.listData.concat(res.data.list)
                      }else{
                          vm.listData = res.data.list
                      }
                      vm.scroll =false
                      vm.total = res.data.count
                  }
              })

          },
      //    滚动处理
          scrollAjax(e) {
              if (this.scroll) return;
              var nowScrollTop = document.querySelector(".content").scrollTop;
              var _boxHeight = document.querySelector(".content").clientHeight;
              var _height = document.querySelector(".scrollbox").clientHeight;
              if (nowScrollTop + _boxHeight > _height - 100) {
                  this.scroll = true;
                  var self = this;
                  if (self.listData.length >= self.total) return;
                  self.currentPage++;
                  self.requestList(true)
              }
          },
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
