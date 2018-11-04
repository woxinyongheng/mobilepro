<template>
    <div class="selectdevice">
        <x-header style="background-color:#2CC7C5;">选择设备</x-header>
        <div class="contentbox">
            <div class="banner">
                <div class="searchbox">
                    <img src="../../../static/image/search.png" alt="">
                    <input type="text" placeholder="请输入设备编号">
                    <span>搜索</span>
                </div>
                <div class="buttonbox">
                    <p class="active">全部</p>
                    <p>制冷设备</p>
                    <p>制冷设备</p>
                    <p>制冷设备</p>
                    <p>制冷设备</p>
                    <p>制冷设备</p>
                    <p>制冷设备</p>
                </div>
            </div>
            <div class="content">
                <minecard v-for="(item,index) in 6" :key="index" @toGrade="toGrade"></minecard>
            </div>
        </div>


    </div>
</template>

<script>
    import { XHeader} from 'vux'
    import minecard from './Card'

    export default {
        name: "SelectDevice",
        data:function(){
            return{

            }
        },
        methods:{
            toGrade(str){
                this.$router.push('/Grade/'+str)
            }
        },
        components:{
            XHeader,minecard
        },
    }
</script>

<style scoped lang="scss">
.selectdevice{
    text-align: left;
    .contentbox{
        height: calc(100vh - 50px);
        overflow-y: scroll;
    }
    .banner{
        background-color: #fff;
        padding: 0.1rem;
        .searchbox{
            background-color: #EFEFF4;
            height: 0.4rem;
            line-height: 0.4rem;
            padding: 0 0.2rem;
            position: relative;
            border-radius: 5px;
            img{
                width: 0.16rem;
                vertical-align: middle;
            }
            input{
                outline: 0;
                border: none;
                background-color: #EFEFF4;
                height: 0.4rem;
                width: 90%;
                font-size: 0.14rem;
                color: #B2B2B2;
            }
            span{
                position: absolute;
                right: 0.2rem;
                font-size: 0.14rem;
                padding-left: 0.1rem;
            }
            span::before{
                content: '';
                width: 1px;
                height: 0.2rem;
                background-color: #D3D3D5;
                position: absolute;
                top: 0.1rem;
                left: -0.1rem;
            }
        }
        .buttonbox{
            margin-top: 0.1rem;
            p{
                padding: 0 0.16rem;
                height: 0.35rem;
                line-height: 0.35rem;
                background-color: #F4F4F4;
                font-size: 0.14rem;
                color: #353535;
                display: inline-block;
                border-radius: 5px;
                margin: 5px 0;
            }
            .active{
                background: rgba(56,199,196,0.1);
                color: #38C7C4;
            }
        }
    }


}
</style>