<template>
    <div class="plantask">
        <x-header style="background-color:#2CC7C5;">计划任务</x-header>
        <tab bar-active-color="#38C7C4">
            <tab-item active-class="active" selected @on-item-click="onItemClick('0')">进行中</tab-item>
            <tab-item active-class="active"  @on-item-click="onItemClick('1')">未完成</tab-item>
            <tab-item active-class="active" @on-item-click="onItemClick('2')">已完成</tab-item>
        </tab>
        <div class="content" @scroll="scrollAjax">
            <div class="scrollbox" v-if="listData.length">
                <mincard v-for="(item,index) in listData" :key="index" :item="item"  @routerToinfo="routerToinfo"></mincard>
            </div>
            <div v-if="!listData.length">
                <none></none>
            </div>
        </div>
    </div>
</template>

<script>
    import { XHeader,Tab, TabItem} from 'vux'
    import mincard from './card'
    import none from '@/components/common/none'

    export default {
        name: "Plantask",
        data:function () {
            return{
                currentPage:1,
                pageSize:10,
                total:0,
                listData:[],
                scroll:false,
                taskState:'0'

            }
        },
        mounted(){
            this.requestList()
        },
        methods:{
            routerToinfo(item){
                this.$router.push('/PlanInfo/'+item.id)
            },
            onItemClick(str){
                this.taskState = str
                this.requestList()
            },
            requestList(str){
                let vm =this
                vm.$http.post('/planTask/getPlanTaskList',{
                    currentPage:vm.currentPage,
                    pageSize:vm.pageSize,
                    planCode:'',
                    planName:'',
                    maintainType:'',
                    cycleType:'',
                    facilityTypeCode:'',
                    maintainName:'',
                    startDateTime:'',
                    endDateTime:'',
                    company:'',
                    columnName:'',
                    sort:'',
                    taskState:vm.taskState
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
            scrollAjax(e){
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
            }
        },
        components:{
            XHeader,Tab, TabItem,mincard,none
        },
    }
</script>

<style scoped lang="scss">
.plantask{
    height: 100%;
    .active{
        color:#38C7C4 !important;
        border-color: #38C7C4 !important;
    }
    .content{
        height: calc(100vh - 40px);
        overflow-y: scroll;
    }

}
</style>