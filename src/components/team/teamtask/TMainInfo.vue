<template>
    <div class="tmaininfo">
        <x-header  style="background-color:#2CC7C5;">任务详情</x-header>
        <div class="box">
            <div class="card">
                <p class="title">
                    设备信息
                    <span class="stabun">报废</span>
                    <img src="../../../../static/image/down.png" alt="">
                </p>
                <div>
                    <hr class="hr">
                    <ul>
                        <li>
                            <span>设备名称:</span><span>********</span>
                        </li>
                        <li>
                            <span>设备名称:</span><span>9号楼8号电梯</span>
                        </li>
                        <li>
                            <span>设备类型:</span><span>#353535</span>
                        </li>
                        <li>
                            <span>设备品牌:</span><span>某某品牌</span>
                        </li>
                        <li>
                            <span>所处区域:</span><span>9号楼8层425室</span>
                        </li>
                        <li>
                            <span>存放位置:</span><span>9号楼8层425室</span>
                        </li>
                    </ul>
                </div>

            </div>

            <div class="card orther">
                <p class="title">
                    任务信息
                    <img src="../../../../static/image/down.png" alt="">
                </p>
                <div>
                    <hr class="hr">
                    <ul>
                        <li>
                            <span>设备编号:</span><span>********</span>
                        </li>
                        <li>
                            <span>保养类型:</span><span>9号楼8号电梯</span>
                        </li>
                        <li>
                            <span>保养周期:</span><span>#353535</span>
                        </li>
                        <li>
                            <span>保养项目:</span><span>某某品牌</span>
                        </li>
                        <li>
                            <span>维保单位:</span><span>9号楼8层425室</span>
                        </li>
                        <li>
                            <span>联系人:</span><span>9号楼8层425室</span>
                        </li>
                        <li>
                            <span>联系电话:</span><span>9号楼8层425室</span>
                        </li>
                        <li>
                            <span>规定时间:</span><span>2018/07/12  12:00 至 2018-08-14
23:59</span>
                        </li>
                    </ul>
                </div>

            </div>


            <div class="card orther">
                <p class="title">
                    派工信息
                    <img src="../../../../static/image/down.png" alt="">
                </p>
                <div>
                    <hr class="hr">
                    <ul>
                        <li>
                            <span>派工时间:</span><span>2018-07-15  15:23</span>
                        </li>
                        <li>
                            <span>派工人:</span><span>9号楼8号电梯</span>
                        </li>
                        <li>
                            <span>执行人:</span><span>#353535</span>
                        </li>
                    </ul>
                </div>

            </div>


            <div class="card orther">
                <p class="title">
                    挂单信息
                    <img src="../../../../static/image/down.png" alt="">
                </p>
                <div>
                    <hr class="hr">
                    <ul>
                        <li>
                            <span>挂单时间:</span><span>2018-07-15  15:23</span>
                        </li>
                        <li>
                            <span>挂单原因:</span><span>9号楼8号电梯</span>
                        </li>
                        <li>
                            <span>其他说明:</span><span>说明说明说明说明说明说明说明说明
说明说明说明说明说明说明</span>
                        </li>
                    </ul>
                </div>

            </div>


            <div class="card orther">
                <p class="title">
                    完工信息
                    <img src="../../../../static/image/down.png" alt="">
                </p>
                <div>
                    <hr class="hr">
                    <ul>
                        <li>
                            <span>完工时间:</span><span>2018-07-15  15:23</span>
                        </li>
                        <li>
                            <span>保养人:</span><span>9号楼8号电梯</span>
                        </li>
                        <li class="liborder">
                            <span>联系电话:</span><span>说明说明</span>
                        </li>
                        <li class="liborder">
                            <span>维修说明:</span>
                            <p class="text">故障说明故障说明故障说明故障说明故障说明故障说明故障说明故障说明故障说明故障说明故障说明故障说明故障说明故障说明障说明故障说明故障说明故障说明故障说明故障说</p>
                            <p class="voice">
                                <span>
                                    <img src="../../../../static/image/palyvoice.png" alt="">44"
                                </span>
                                播放语音
                            </p>
                        </li>
                        <li>
                            <span>相关附件:</span>
                            <p class="img">
                                <img src="../../../../static/image/maintan.png" alt="">
                                <img src="../../../../static/image/maintan.png" alt="">
                                <img src="../../../../static/image/maintan.png" alt="">


                            </p>
                        </li>
                    </ul>
                </div>

            </div>


            <div class="card orther">
                <p class="title">
                    保养项目作业书
                    <img src="../../../../static/image/down.png" alt="">
                </p>
                <div>
                    <hr class="hr">
                    <div class="plan">
                        <p class="plantitle">
                            <span>1.某某保养</span>
                            <span class="right">
                                <img src="../../../../static/image/select.png" alt="">完成
                            </span>
                        </p>
                        <p class="info">进行了某某保养</p>
                    </div>
                    <div class="plan">
                        <p class="plantitle">
                            <span>2.某某保养</span>
                            <span class="right">
                                 <img src="../../../../static/image/alert.png" alt="">未完成

                            </span>
                        </p>
                        <p class="info">进行了某某保养</p>
                    </div>
                </div>

            </div>

            <div class="buttonbox">
                <p @click="ranlingshow=true">认领</p>
                <p @click="selectPerson">指派</p>
            </div>
            <div>
                <confirm v-model="ranlingshow"
                         title="提示"
                         @on-confirm="onConfirm">
                    <p style="text-align:center;">确定认领此任务吗？</p>
                </confirm>
            </div>

        </div>
    </div>
</template>

<script>
    import { XHeader,Confirm,TransferDomDirective as TransferDom} from 'vux'

    export default {
        name: "TMainInfo",
        data:function(){
          return{
              ranlingshow:false
          }
        },
        methods:{
            //认领
            onConfirm(){
                debugger
            },
        //    指派
            selectPerson(){
                this.$router.push('/selectPerson/1')
            }
        },

        components:{
            XHeader,Confirm
        },
    }
</script>

<style scoped lang="scss">
.tmaininfo{
    height:100%;

    .box{
        height: calc(100vh - 50px);
        overflow-y: scroll;
        overflow-x: hidden;
        .weui-dialog__btn_primary{
            color: #38C7C4 !important;
        }
        .card{
            background-color: #fff;
            padding: 0 0.2rem;
            padding-bottom: 0.1rem;

            .title{
                position: relative;
                height: 0.5rem;
                line-height: 0.5rem;
                color: #353535;
                font-weight: 500;
                font-size: 0.16rem;
                box-sizing: border-box;
                .stabun{
                    display: inline-block;
                    vertical-align: middle;
                    background:rgba(255,15,15,1);
                    border-radius:4px;
                    font-size: 0.12rem;
                    height: 0.18rem;
                    line-height: 0.18rem;
                    padding: 0 4px;
                    color: #ffffff;
                    font-weight: 400;
                    margin-right: 0.1rem;
                }
                span{
                    font-weight: 300;
                }
                .error{
                    color: #FF2020;
                }
                img{
                    width: 0.2rem;
                    position: absolute;
                    right: 0;
                    top: 35%;
                }
            }
            .hr{
                margin: 0 -0.2rem;
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
                top: 0.18rem;
                left: -0.1rem;
            }
            ul{
                color: #353535;
                margin-top: 0.1rem;
                li{
                    line-height: 0.4rem;
                    font-size: 0.16rem;
                    span{
                        display: inline-block;
                        vertical-align: top;
                    }
                    span:nth-of-type(1){
                        width:0.8rem;
                    }
                    span:nth-of-type(2){
                        width: calc(100% - 0.8rem);
                        padding-top: 0.1rem;
                        line-height: 0.2rem;
                    }
                    .text{
                        line-height: 0.2rem;
                    }
                    .voice{
                        width: 88%;
                        height: 0.4rem;
                        margin: 0 auto;
                        background-color: #38C7C4;
                        color: #ffffff;
                        position: relative;
                        text-align: center;
                        margin-top: 0.3rem;
                        border-radius: 4px;
                        margin-bottom: 0.1rem;
                        span{
                            position: absolute;
                            left: 0.1rem;
                        }
                        img{
                            width: 0.2rem;
                            vertical-align: middle;
                        }
                    }
                    .img{
                        img{
                            width: 1rem;
                            height: 0.8rem;
                        }
                    }
                }
                .liborder{
                    border-bottom: 1px solid #E5E5E5;

                }
            }
            .plan{
                padding: 0.1rem 0;
                .plantitle{
                    height: 0.4rem;
                    line-height: 0.4rem;
                    color: #353535;
                    font-weight: 400;
                    position: relative;
                    .right{
                        position: absolute;
                        right: 0;
                        font-weight: 300;
                    }
                }
                .info{
                    color: #888;
                }
                img{
                    width: 0.16rem;
                    vertical-align: middle;
                    margin-right: 5px;
                }
            }
        }
        .orther{
            margin-top: 0.2rem;
        }
        .buttonbox{
            background-color: #fff;
            height: 0.6rem;
            line-height: 0.6rem;
            margin-top: 0.2rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            p{
                display: inline-block;
                border-radius: 5px;
                width: 40%;
                height: 0.35rem;
                line-height: 0.35rem;
                color: #ffffff;
                font-weight: 500;
                font-size: 0.16rem;
                background-color: #38C7C4;
                text-align: center;
            }
        }

    }
}
</style>