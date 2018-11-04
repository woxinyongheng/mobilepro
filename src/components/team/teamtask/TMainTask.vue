<template>
    <div class="maintask">
        <x-header  style="background-color:#2CC7C5;">保养任务</x-header>
        <tab bar-active-color="#38C7C4">
            <tab-item active-class="active" selected @on-item-click="onItemClick">未派工</tab-item>
            <tab-item active-class="active"  @on-item-click="onItemClick">已派工</tab-item>
            <tab-item active-class="active"  @on-item-click="onItemClick">已挂单</tab-item>
            <tab-item active-class="active" @on-item-click="onItemClick">已完成</tab-item>
            <tab-item active-class="active" @on-item-click="onItemClick">已超时</tab-item>

        </tab>
        <div class="content">
            <minecard :type="1" @toInfoHandle="toInfoHandle"></minecard>
            <minecard :type="2"></minecard>
        </div>
    </div>
</template>

<script>
    import { XHeader,Tab, TabItem} from 'vux'
    import minecard from './tem/Card'
    export default {
        name: "MainTask",
        data:function () {
            return{

            }
        },
        methods:{
            onItemClick(){

            },
            //详情
            toInfoHandle(id){
                this.$router.push('/TMainInfo/'+id)
            }
        },
        components:{
            XHeader,Tab, TabItem,minecard
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