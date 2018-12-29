<template>
    <div class="tmaininfo">
        <x-header  style="background-color:#2CC7C5;">任务详情</x-header>
        <div class="box">
            <div class="card">
                <p class="title">
                    设备信息
                    <span class="stabun">{{dataInfo.equipmentState==0?'正常':(dataInfo.equipmentState==1?'延期':'报废')}}</span>
                    <img src="../../../../static/image/down.png" v-if="!show1" alt="" @click="show1=!show1">
                    <img src="../../../../static/image/up.png" v-if="show1" alt="" @click="show1=!show1">

                </p>
                <div v-show="show1">
                    <hr class="hr">
                    <ul>
                        <li>
                            <span>设备编号:</span><span>{{deviceInfo.assetsCode}}</span>
                        </li>
                        <li>
                            <span>设备名称:</span><span>{{deviceInfo.assetsName}}</span>
                        </li>
                        <li>
                            <span>设备类型:</span><span>{{deviceInfo.classifyName}}</span>
                        </li>
                        <li>
                            <span>设备品牌:</span><span>{{deviceInfo.brandName}}</span>
                        </li>
                        <li>
                            <span>所处区域:</span><span>{{deviceInfo.areaName}}</span>
                        </li>
                        <li>
                            <span>存放位置:</span><span>{{deviceInfo.storageLocation}}</span>
                        </li>
                    </ul>
                </div>

            </div>

            <div class="card orther">
                <p class="title">
                    报修信息
                    <img src="../../../../static/image/down.png" v-if="!show2" alt="" @click="show2=!show2">
                    <img src="../../../../static/image/up.png" v-if="show2" alt="" @click="show2=!show2">

                </p>
                <div v-show="show2">
                    <hr class="hr">
                    <ul>
                        <li>
                            <span>任务编号:</span><span>{{dataInfo.repairCode}}</span>
                        </li>
                        <li>
                            <span>报修人:</span><span>{{dataInfo.reportPersonName}}</span>
                        </li>
                        <li>
                            <span>联系电话:</span><span>{{dataInfo.reportPersonPhone}}</span>
                        </li>
                        <li>
                            <span>报修时间:</span><span>{{dataInfo.reportTime}}</span>
                        </li>
                        <li class="liborder">
                            <span>维修说明:</span>
                            <p class="text">{{dataInfo.repairExplain}}</p>
                            <p class="voice">
                                <audio v-if="dataInfo.repairContentAttachmentUrl" class="voiceitem" :src="dataInfo.repairContentAttachmentUrl" controls="controls"></audio>

                            </p>
                        </li>
                        <li>
                            <span>相关附件:</span>
                            <p class="img">
                                <img v-for="item in dataInfo.repairAttachmentUrl" :src="item" alt="">
                            </p>
                        </li>

                    </ul>
                </div>

            </div>


            <div class="card orther" v-if="dataInfo.assignTime">
                <p class="title">
                    派工信息
                    <img src="../../../../static/image/down.png" v-if="!show3" alt="" @click="show3=!show3">
                    <img src="../../../../static/image/up.png" v-if="show3" alt="" @click="show3=!show3">

                </p>
                <div v-show="show3">
                    <hr class="hr">
                    <ul>
                        <li>
                            <span>派工时间:</span><span>{{dataInfo.assignTime}}</span>
                        </li>
                        <li>
                            <span>派工人:</span><span>{{dataInfo.assignPersonName}}</span>
                        </li>
                        <li>
                            <span>执行人:</span><span>{{dataInfo.implementPersonName}}</span>
                        </li>
                    </ul>
                </div>

            </div>


            <div class="card orther" v-if="($route.params.type==2 || $route.params.type==3) && dataInfo.paymentTime">
                <p class="title">
                    挂单信息
                    <img src="../../../../static/image/down.png" v-if="!show4" alt="" @click="show4=!show4">
                    <img src="../../../../static/image/up.png" v-if="show4" alt="" @click="show4=!show4">

                </p>
                <div v-show="show4">
                    <hr class="hr">
                    <ul>
                        <li>
                            <span>挂单时间:</span><span>{{dataInfo.paymentTime}}</span>
                        </li>
                        <li>
                            <span>挂单原因:</span><span>{{dataInfo.paymentCause}}</span>
                        </li>
                        <li>
                            <span>其他说明:</span><span>{{dataInfo.otherExplain}}</span>
                        </li>
                    </ul>
                </div>

            </div>


            <div class="card orther" v-if="$route.params.type==3">
                <p class="title">
                    维修信息
                    <img src="../../../../static/image/down.png" v-if="!show5" alt="" @click="show5=!show5">
                    <img src="../../../../static/image/up.png" v-if="show5" alt="" @click="show5=!show5">

                </p>
                <div v-show="show5">
                    <hr class="hr">
                    <ul>
                        <li>
                            <span>维修日期:</span><span>{{dataInfo.repairTime}}</span>
                        </li>
                        <li>
                            <span>维修人:</span><span>{{dataInfo.repairPersonName}}</span>
                        </li>
                        <li>
                            <span>联系电话:</span><span>{{dataInfo.repairPersonPhone}}</span>
                        </li>
                        <li>
                            <span>使用配件:</span>
                            <p class="table" v-if="dataInfo.partsEmploy" v-for="item in dataInfo.partsEmploy"><span>{{item.partsName}}</span><span>✖{{item.partsSum}}</span><span>{{item.partsPay}}</span></p>
                            <!--<p class="table"><span>过滤管</span><span>✖2</span><span>435元</span></p>-->

                        </li>


                        <li>
                            <span>其他支出:</span><span>{{dataInfo.servicePay}}</span>
                        </li>
                        <li class="liborder">
                            <span>维修总支出:</span><span>{{dataInfo.repairPay}}</span>
                        </li>




                        <li class="liborder">
                            <span>维修说明:</span>
                            <p class="text">{{dataInfo.repairFinishExplain}}</p>
                            <p class="voice">
                            <p class="voice">
                                <audio v-if="dataInfo.finishContentAttachmentUrl" class="voiceitem" :src="dataInfo.finishContentAttachmentUrl" controls="controls"></audio>

                            </p>
                        </li>
                        <li>
                            <span>相关附件:</span>
                            <p class="img">
                                <img v-for="item in dataInfo.finishAttachmentUrl" :src="item" alt="">
                            </p>
                        </li>
                    </ul>
                </div>

            </div>



            <div class="buttonbox" v-if="$route.params.type==1 || $route.params.type==2">
                <p v-if="$route.params.type==1" @click="paymentHandle">挂单</p>
                <p v-if="$route.params.type==2" @click="$router.push('/ServiceTask')">取消</p>

                <p @click="selectPerson">维修</p>
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
        name: "ServiceInfo",
        data:function(){
            return{
                ranlingshow:false,
                dataInfo:'',
                deviceInfo:'',
                show1:true,
                show2:true,
                show3:true,
                show4:true,
                show5:true
            }
        },
        mounted(){
            let vm =this
            // this.deviceInfo = JSON.parse(sessionStorage.getItem(vm.$route.params.id))
            this.requestInfo()
        },
        methods:{
            //挂单
            paymentHandle(){
                let vm =this
                vm.$router.push('/PayMent/weixiu/'+vm.$route.params.id)
            },
            //认领
            onConfirm(){
                let vm =this
                vm.$http.post('appMyWork/claimWorkOrderByStaffId',{
                    repairId:vm.dataInfo.id
                }).then(res=>{
                    if(res.code==200){
                        vm.$vux.toast.show({
                            text:res.message,
                            time:2000
                        })
                        vm.$router.push('/TServiceTask')
                    }
                })
            },
            //    维修
            selectPerson(){
                let vm =this
                sessionStorage.setItem(vm.$route.params.id,JSON.stringify(vm.deviceInfo))
                vm.$router.push('/Repair/'+vm.$route.params.id)
            },
            requestInfo(){
                let vm =this
                vm.$http.post('Apprepaircontroller/getRepairDetailById',{
                    id:vm.$route.params.id
                }).then(res=>{
                    if(res.code==200){
                        vm.dataInfo = res.data.repair
                        vm.deviceInfo = res.data.view
                    }
                })
            }
        },
        destroyed(){
            let vm =this
            // sessionStorage.removeItem(vm.deviceInfo.id)
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
                            span:nth-of-type(1){
                                width: 40%;
                            }
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