<template>
    <div class="maintask">
        <x-header  style="background-color:#2CC7C5;" :left-options="{preventGoBack:true}"  @on-click-back="back">保养任务</x-header>
        <tab bar-active-color="#38C7C4">
            <tab-item active-class="active" selected @on-item-click="onItemClick('2')">未开始</tab-item>
            <tab-item active-class="active"  @on-item-click="onItemClick('1')">已挂单</tab-item>
            <tab-item active-class="active" @on-item-click="onItemClick('3')">已完成</tab-item>
            <tab-item active-class="active" @on-item-click="onItemClick('over')">已超时</tab-item>
        </tab>
        <div class="content" @scroll="scrollAjax">
            <div class="scrollbox" v-if="listData">
                <minecard v-for="item in listData" :item="item" :type="type" @toInfoHandle="toInfoHandle"></minecard>

            </div>
            <div v-if="!listData.length">
                <none></none>
            </div>
            <!--<minecard :type="2"></minecard>-->
        </div>
    </div>
</template>

<script>
    import { XHeader,Tab, TabItem} from 'vux'
    import minecard from './tem/Card'
    import none from '@/components/common/none'


    export default {
        name: "MainTask",
        data:function(){
          return{
              currentPage:1,
              pageSize:10,
              total:0,
              state:'2',
              overTime:'0',
              listData:[],
              scroll:false,
              type:'2'

          }
        },
        mounted(){
          this.requestList()
        },
        methods:{
            back(){
                this.$router.push('/index')
            },
            onItemClick(str){
                if(str=='over'){
                    this.overTime='1'
                    this.state=''
                }else{
                    this.overTime=''
                    this.state = str
                }
                this.type=str
                this.requestList()
            },
            requestList(str){
              let vm =this
              vm.$http.post('AppmaintainController/myMaintainList',{
                  currentPage:vm.currentPage,
                  pageSize:vm.pageSize,
                  state:vm.state,
                  overTime:vm.overTime
              }).then(res=>{
                  if(res.code==200){
                      if(str){
                          vm.listData = vm.listData.concat(res.data.data)
                      }else{
                          vm.listData = res.data.data
                      }
                      vm.scroll =false
                      vm.total = res.data.count
                  }
              })
            },
            toInfoHandle(item){
                this.$router.push('/MainInfo/'+item.id+'/'+item.state)
                sessionStorage.setItem(item.id,JSON.stringify(item))

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
            XHeader,Tab, TabItem,minecard,none
        },
    }
</script>

<style scoped lang="scss">
.maintask{
    .content{
        height: calc(100vh - 1rem);
        overflow-y: scroll;
    }
    .active{
        color:#38C7C4 !important;
        border-color: #38C7C4 !important;
    }
}
</style>