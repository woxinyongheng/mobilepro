<template>
    <div class="servicetask">
        <x-header  style="background-color:#2CC7C5;">维修任务</x-header>
        <tab bar-active-color="#38C7C4">
            <tab-item active-class="active" selected @on-item-click="onItemClick('0')">未开始</tab-item>
            <tab-item active-class="active"  @on-item-click="onItemClick('1')">已挂单</tab-item>
            <tab-item active-class="active" @on-item-click="onItemClick('3')">已完成</tab-item>
        </tab>
        <div class="content" @scroll="scrollAjax">
            <div class="scrollbox" v-if="listData.length">
                <serviceCard v-for="item in listData" :item="item" :type="type" @toInfoHandle="toInfoHandle"></serviceCard>

            </div>
            <div v-if="!listData.length">
                <none></none>
            </div>
        </div>

    </div>
</template>

<script>
    import { XHeader,Tab, TabItem} from 'vux'
    import serviceCard from './tem/serviceCard'
    import none from '@/components/common/none'

    export default {
        name: "ServiceTask",
        data:function(){
            return{
                currentPage:1,
                pageSize:10,
                total:0,
                listData:[],
                state:'0',
                scroll:false,
                type:'0'
            }
        },
        mounted(){
            sessionStorage.removeItem('weixiudata')
            this.requestList()
        },
        methods:{
            toInfoHandle(item){
                this.$router.push('/ServiceInfo/'+item.id)
                sessionStorage.setItem(item.id,JSON.stringify(item))
            },
            onItemClick(str){
                this.type = str
                this.state = str
                this.requestList()
            },
            requestList(str){
                let vm =this
                if(JSON.parse(localStorage.getItem('ROLECODE')).ROLECODE=='teamleader' || JSON.parse(localStorage.getItem('ROLECODE')).ROLECODE=='worker'){
                    vm.$http.post('/appMyWork/getMaintenanceTaskByMark',{
                        currentPage:vm.currentPage,
                        pageSize:vm.pageSize,
                        state:vm.state,
                        interfaceNum:'2'
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
                }else{
                    vm.$http.post('repair/getMaintenanceOrder',{
                        currentPage:vm.currentPage,
                        pageSize:vm.pageSize,
                        state:vm.state,
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
                }
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
            XHeader,Tab, TabItem,serviceCard,none
        },
    }
</script>

<style scoped lang="scss">
.servicetask{
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