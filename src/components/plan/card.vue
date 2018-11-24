<template>
    <div class="card" @click="routerToinfo">
        <div class="title">
            <span class="stabun">{{item.maintainType==1?'维保':'质保'}}</span>
            {{item.planName}}保养计划
            <span class="status" v-if="item.taskState==0">进行中</span>
            <span class="status" v-if="item.taskState==1">未完成</span>
            <span class="status" v-if="item.taskState==2">已完成</span>

        </div>
        <hr class="hr">
        <div class="list">
            <ul>
                <li>
                    <span>设备名称：</span><span class="right">{{item.planName}}</span>
                </li>
                <li>
                    <span>保养周期：</span><span class="right">{{item.cycleType==0?'周':(item.cycleType==1?'半月':(item.cycleType==2?'月':(item.cycleType==3?'季度':(item.cycleType==4?'半年':'年'))))}}

                    </span>
                </li>
                <li>
                    <span>保养项目：</span><span class="right">{{item.maintainName}}</span>
                </li>
                <li>
                    <span>维保公司：</span><span class="right">{{item.company}}</span>
                </li>
                <li>
                    <span>计划时间：</span><span class="right">{{item.startTime+'-'+item.endTime}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props:['item'],
        name: "card",
        methods:{
            routerToinfo(){
                this.$emit('routerToinfo',this.item)
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
            /*margin-left: 0.14rem;*/
            color: #353535;
            font-weight: 500;
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
        }
        .hr{
            margin: 0 -0.1rem;
            border-top:1px solid #EFEFF4;

            border-left:none;

            border-right:none;

            border-bottom:none;
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