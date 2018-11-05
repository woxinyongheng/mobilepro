<template>
    <div class="servicetask">
        <x-header  style="background-color:#2CC7C5;">维修任务</x-header>
        <tab bar-active-color="#38C7C4">
            <tab-item active-class="active" selected @on-item-click="onItemClick">未派工</tab-item>
            <tab-item active-class="active"  @on-item-click="onItemClick">已派工</tab-item>
            <tab-item active-class="active"  @on-item-click="onItemClick">已挂单</tab-item>
            <tab-item active-class="active" @on-item-click="onItemClick">已完成</tab-item>
        </tab>
        <div class="content">
            <serviceCard v-for="(item,index) in 6" :key="index" @toInfoHandle="toInfoHandle"></serviceCard>

        </div>

    </div>
</template>

<script>
    import { XHeader,Tab, TabItem} from 'vux'
    import serviceCard from './tem/serviceCard'
    export default {
        name: "ServiceTask",
        data:function () {
            return{

            }
        },
        methods:{
            onItemClick(){

            },
            toInfoHandle(id){
                this.$router.push('/TServiceInfo/'+id)
            }
        },
        components:{
            XHeader,Tab, TabItem,serviceCard
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