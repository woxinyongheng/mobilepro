<template>
    <div class="repairinfo">
        <x-header  style="background-color:#2CC7C5;">任务详情</x-header>
        <div class="box">
            <div class="card">
                <p class="title">
                    设备信息
                    <span class="stabun">报废</span>
                    <img src="../../../static/image/down.png" alt="" @click="show1=!show1">
                </p>
                <div v-show="show1">
                    <hr class="hr">
                    <ul>
                        <li>
                            <span>设备编号:</span><span>{{seviceData.assetsCode}}</span>
                        </li>
                        <li>
                            <span>设备名称:</span><span>{{seviceData.assetsName}}</span>
                        </li>
                        <li>
                            <span>设备类型:</span><span>{{seviceData.classifyName}}</span>
                        </li>
                        <li>
                            <span>设备品牌:</span><span>{{seviceData.brandName}}</span>
                        </li>
                        <li>
                            <span>所处区域:</span><span>{{seviceData.areaName}}</span>
                        </li>
                        <li>
                            <span>存放位置:</span><span>{{seviceData.storageLocation}}</span>
                        </li>
                    </ul>
                </div>

            </div>

            <div class="card orther">
                <p class="title">
                    报修信息
                    <img src="../../../static/image/down.png" alt="" @click="show2=!show2">
                </p>
                <div v-show="show2">
                    <hr class="hr">
                    <ul>
                        <li>
                            <span>任务编号:</span><span>{{seviceData.repairCode}}</span>
                        </li>
                        <li>
                            <span>报修人:</span><span>{{infoData.reportPersonName}}</span>
                        </li>
                        <li>
                            <span>联系电话:</span><span>{{infoData.reportPersonPhone}}</span>
                        </li>
                        <li>
                            <span>报修时间:</span><span>{{infoData.reportTime}}</span>
                        </li>
                        <li>
                            <span>报修说明:</span>
                            <p class="text">{{infoData.repairExplain}}</p>
                            <p class="voice">
                                <!--<span>-->
                                    <audio v-if="infoData.repairContentAttachmentUrl" class="voiceitem" :src="infoData.repairContentAttachmentUrl" controls="controls"></audio>
                                    <!--<img src="../../../static/image/palyvoice.png" alt="">44"-->
                                <!--</span>-->
                                <!--播放语音-->
                            </p>
                        </li>
                        <li>
                            <span>相关附件:</span>
                            <p class="img" v-for="i in infoData.repairAttachmentUrl">
                                <img :src="i" alt="">
                            </p>
                        </li>
                    </ul>
                </div>

            </div>


            <div class="card orther" v-if="state!=0">
                <p class="title">
                    派工信息
                    <img src="../../../static/image/down.png" alt="" @click="show3=!show3">
                </p>
                <div v-show="show3">
                    <hr class="hr">
                    <ul>
                        <li>
                            <span>派工时间:</span><span>{{infoData.assignTime}}</span>
                        </li>
                        <li>
                            <span>派工人:</span><span>{{infoData.assignPersonName}}</span>
                        </li>
                        <li>
                            <span>执行人:</span><span>{{infoData.implementPersonName}}</span>
                        </li>
                    </ul>
                </div>

            </div>


            <div class="card orther"  v-if="state==1||state==3">
                <p class="title">
                    挂单信息
                    <img src="../../../static/image/down.png" alt="" @click="show4=!show4">
                </p>
                <div v-show="show4">
                    <hr class="hr">
                    <ul>
                        <li>
                            <span>挂单时间:</span><span>{{infoData.paymentTime}}</span>
                        </li>
                        <li>
                            <span>挂单原因:</span><span>{{infoData.paymentCause}}</span>
                        </li>
                        <li>
                            <span>其他说明:</span><span>{{infoData.otherExplain}}</span>
                        </li>
                    </ul>
                </div>

            </div>


            <div class="card orther" v-if="state==3">
                <p class="title">
                    维修信息
                    <img src="../../../static/image/down.png" alt="" @click="show5=!show5">
                </p>
                <div v-show="show5">
                    <hr class="hr">
                    <ul>
                        <li>
                            <span>维修日期:</span><span>{{infoData.repairTime}}</span>
                        </li>
                        <li>
                            <span>维修人:</span><span>{{infoData.repairPersonName}}</span>
                        </li>
                        <li>
                            <span>联系电话:</span><span>{{infoData.repairPersonPhone}}</span>
                        </li>
                        <li>
                            <span>使用配件:</span>
                            <p class="table"><span></span><span></span><span></span></p>
                            <!--<p class="table"><span>过滤管</span><span>✖2</span><span>435元</span></p>-->

                        </li>
                        <li>
                            <span>其他支出:</span><span>{{infoData.servicePay}}</span>
                        </li>
                        <li>
                            <span>维修总支出:</span><span>{{infoData.repairPay}}</span>
                        </li>
                        <li class="liborder">
                            <span>维修说明:</span>
                            <p class="text">{{infoData.repairFinishExplain}}</p>
                            <p class="voice">
                                <!--<span>-->
                                <audio v-if="infoData.finishContentAttachmentUrl" class="voiceitem" :src="infoData.finishContentAttachmentUrl" controls="controls"></audio>
                                <!--<img src="../../../static/image/palyvoice.png" alt="">44"-->
                                <!--</span>-->
                                <!--播放语音-->
                            </p>
                        </li>
                        <li>
                            <span>相关附件:</span>
                            <p class="img" v-for="i in infoData.finishAttachmentUrl">
                                <img :src="i" alt="">
                            </p>
                        </li>
                    </ul>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    import { XHeader} from 'vux'

    export default {
        name: "RepairInfo",
        data:function(){
          return{
              infoData:'',
              seviceData:'',
              state:0,
              show1:true,
              show2:true,
              show3:true,
              show4:true,
              show5:true,

          }
        },
        mounted(){
            let vm =this
            vm.seviceData = JSON.parse(sessionStorage.getItem(vm.$route.params.equipid))
            vm.state = vm.$route.params.state
            this.requestInfo()
        },
        methods:{
          requestInfo(){
              let vm=this
              vm.$http.post('equipmentListController/getRepairDetailById',{
                  id:vm.$route.params.id
              }).then(res=>{
                  if(res.code==200){
                      vm.infoData = res.data.repair
                  }
              })
          }
        },
        destroyed(){
            let vm =this
          sessionStorage.removeItem(vm.seviceData.equipmentId)
        },
        components:{
            XHeader
        },
    }
</script>

<style scoped lang="scss">
    .repairinfo{
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
                            width:0.86rem;
                        }
                        span:nth-of-type(2){
                            width: calc(100% - 0.86rem);
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
                            color: #ffffff;
                            position: relative;
                            text-align: center;
                            margin-top: 0.3rem;
                            border-radius: 4px;
                            margin-bottom: 0.1rem;
                            .voiceitem{
                                background-color: #38C7C4;

                            }
                            /*span{*/
                                /*position: absolute;*/
                                /*left: 0.1rem;*/
                            /*}*/
                            /*.voiceitem{*/
                                /*width: 0.2rem;*/
                                /*vertical-align: middle;*/
                            /*}*/
                        }
                        .img{
                            img{
                                width: 1rem;
                                height: 0.8rem;
                            }
                        }
                        .table{

                            display: flex;
                            justify-content: space-around;
                            background:rgba(244,244,244,1);
                            border-radius:4px;
                            span{
                                width:20%

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