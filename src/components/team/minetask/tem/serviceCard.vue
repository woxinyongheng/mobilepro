<template>
    <div class="card" @click="toInfoHandle">
        <div class="title">
            任务编号: <span>{{item.repairCode}}</span>
            <span v-if="item.state==1" class="status" :class="type==0?'error':''">未开始</span>
            <span v-if="item.state==2" class="status" :class="type==1?'error':''">已挂单</span>
            <span v-if="item.state==3" class="status" :class="type==1?'error':''">已完成</span>

        </div>
        <hr class="hr">
        <div class="list">
            <ul>
                <li>
                    <span>设备名称：</span><span class="right">{{item.assetsName}}</span>
                </li>
                <li>
                    <span>设备类型：</span><span class="right">{{item.classifyName}}</span>
                </li>
                <li>
                    <span>所处区域：</span><span class="right">{{item.areaName}}</span>
                </li>
                <li>
                    <span>报修日期：</span><span class="right">{{item.reportTime}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props:['type','item'],
        name: "serviceCard",
        methods:{
            toInfoHandle(){
                let vm =this
                this.$emit('toInfoHandle',vm.item)
            }
        }
    }
</script>

<style scoped lang="scss">
    .card {
        background-color: #fff;
        padding: 0.1rem;
        margin-top: 0.14rem;
        text-align: left;
        font-family:PingFangSC-Light;
        .title{
            position: relative;
            height: 0.39rem;
            line-height: 0.39rem;
            color: #353535;
            font-weight: 500;
            margin-left: 0.14rem;

            font-size: 0.16rem;
            box-sizing: border-box;
            margin-bottom: 0.06rem;
            .stabun{
                display: inline-block;
                vertical-align: middle;
                background:rgba(245,248,255,1);
                border:1px solid rgba(79,135,251,1);
                border-radius:4px;
                font-size: 0.12rem;
                height: 0.18rem;
                line-height: 0.18rem;
                padding: 0 0.1rem;
                color: #4F87FB;
                font-weight: 400;
                margin-right: 0.1rem;
            }
            span{
                font-weight: 300;
            }
            .status{
                color: #38C7C4;
                position: absolute;
                right: 0.14rem;
                font-size: 0.12rem;
            }
            .error{
                color: #FF2020;
            }
        }
        .hr{
            margin: 0 -0.1rem;
            border-top:1px solid #EFEFF4;

            border-left:none;

            border-right:none;

            border-bottom:none;
        }
        .title::before{
            content: '';
            position: absolute;
            width: 6px;
            height: 0.14rem;
            background-color: #38C7C4;
            left: -0.1rem;
            top: 0.12rem;
        }

        .list{
            margin-top: 0.1rem;
            padding:0 0.2rem;
            ul{
                li{
                    /*height: 0.35rem;*/
                    line-height: 0.35rem;
                    span{
                        display: inline-block;
                        vertical-align: top;
                        font-weight: 400;
                    }
                    span:nth-of-type(1){
                        width: 1rem;
                    }
                    .right{
                        font-weight: 300;
                        width: calc(100% - 1rem);
                        /*line-height: 0.25rem;*/
                        /*padding: 0.1rem 0;*/
                    }

                }
            }
        }


    }
</style>