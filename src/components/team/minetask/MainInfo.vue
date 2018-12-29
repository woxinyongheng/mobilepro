<template>
    <div class="maininfo">
        <x-header  style="background-color:#2CC7C5;">任务详情</x-header>
        <div class="box">
            <div class="card">
                <p class="title">
                    设备信息
                    <span class="stabun" v-if="dataInfo && dataInfo.assetsInfo">{{dataInfo.assetsInfo.equipmentState==0?'正常':(dataInfo.assetsInfo.equipmentState==1?'延期':'报废')}}</span>
                    <img src="../../../../static/image/down.png" alt="" @click="show1=!show1">
                </p>
                <div v-show="show1">
                    <hr class="hr">
                    <ul v-if="dataInfo">
                        <li>
                            <span>设备名称:</span><span>{{dataInfo.assetsInfo.assetsName}}</span>
                        </li>
                        <li>
                            <span>设备编号:</span><span>{{dataInfo.assetsInfo.assetsCode}}</span>
                        </li>
                        <li>
                            <span>设备类型:</span><span>{{dataInfo.assetsInfo.classifyName}}</span>
                        </li>
                        <li>
                            <span>设备品牌:</span><span>{{dataInfo.assetsInfo.brandName}}</span>
                        </li>
                        <li>
                            <span>所处区域:</span><span>{{dataInfo.assetsInfo.areaName}}</span>
                        </li>
                        <li>
                            <span>存放位置:</span><span>{{dataInfo.assetsInfo.storageLocation}}</span>
                        </li>
                    </ul>
                </div>

            </div>

            <div class="card orther">
                <p class="title">
                    任务信息
                    <img src="../../../../static/image/down.png" alt="" @click="show2=!show2">
                </p>
                <div v-show="show2">
                    <hr class="hr">
                    <ul v-if="dataInfo">
                        <li>
                            <span>任务编号:</span><span>{{dataInfo.taskInfo.maintainCode}}</span>
                        </li>
                        <li>
                            <span>保养类型:</span><span>{{dataInfo.taskInfo.maintainType==0?'质保':'维保'}}</span>
                        </li>
                        <li>
                            <span>保养周期:</span><span v-if="dataInfo.taskInfo.cycleType==0">周</span><span v-if="dataInfo.taskInfo.cycleType==1">半月</span><span v-if="dataInfo.taskInfo.cycleType==2">月</span><span v-if="dataInfo.taskInfo.cycleType==3">季度</span><span v-if="dataInfo.taskInfo.cycleType==4">半年</span><span v-if="dataInfo.taskInfo.cycleType==5">年</span>
                        </li>
                        <li>
                            <span>保养项目:</span><span>{{dataInfo.taskInfo.maintainItem}}</span>
                        </li>
                        <li>
                            <span>维保单位:</span><span>{{dataInfo.taskInfo.maintenanceCompany}}</span>
                        </li>
                        <li>
                            <span>联系人:</span><span>{{dataInfo.taskInfo.maintenancePersonName}}</span>
                        </li>
                        <li>
                            <span>联系电话:</span><span>{{dataInfo.taskInfo.maintenancePersonPhone}}</span>
                        </li>
                        <li>
                            <span>规定时间:</span><span>{{dataInfo.taskInfo.stipulateTime}}</span>
                        </li>
                    </ul>
                </div>

            </div>


            <div class="card orther" v-if="dataInfo.assignInfo && dataInfo.assignInfo.assignTime">
                <p class="title">
                    派工信息
                    <img src="../../../../static/image/down.png" alt="" @click="show3=!show3">
                </p>
                <div v-show="show3">
                    <hr class="hr">
                    <ul v-if="dataInfo">
                        <li>
                            <span>派工时间:</span><span>{{dataInfo.assignInfo.assignTime}}</span>
                        </li>
                        <li>
                            <span>派工人:</span><span>{{dataInfo.assignInfo.assignPersonName}}</span>
                        </li>
                        <li>
                            <span>执行人:</span><span>{{dataInfo.assignInfo.implementPersonName}}</span>
                        </li>
                    </ul>
                </div>

            </div>


            <div class="card orther" v-if="dataInfo.paymentInfo && dataInfo.paymentInfo.paymentTime">
                <p class="title">
                    挂单信息
                    <img src="../../../../static/image/down.png" alt="" @click="show4=!show4">
                </p>
                <div v-show="show4">
                    <hr class="hr">
                    <ul v-if="dataInfo">
                        <li>
                            <span>挂单时间:</span><span>{{dataInfo.paymentInfo.paymentTime}}</span>
                        </li>
                        <li>
                            <span>挂单原因:</span><span>{{dataInfo.paymentInfo.paymentCause}}</span>
                        </li>
                        <li>
                            <span>其他说明:</span><span>{{dataInfo.paymentInfo.otherExplain}}</span>
                        </li>
                    </ul>
                </div>

            </div>


            <div class="card orther" v-if="dataInfo.completionInfo && dataInfo.completionInfo.maintainTime">
                <p class="title">
                    完工信息
                    <img src="../../../../static/image/down.png" alt="" @click="show5=!show5">
                </p>
                <div v-show="show5">
                    <hr class="hr">
                    <ul v-if="dataInfo">
                        <li>
                            <span>完工时间:</span><span>{{dataInfo.completionInfo.maintainTime}}</span>
                        </li>
                        <li>
                            <span>保养人:</span><span>{{dataInfo.completionInfo.maintainPersonName}}</span>
                        </li>
                        <li class="liborder">
                            <span>联系电话:</span><span>{{dataInfo.completionInfo.maintainPersonPhone}}</span>
                        </li>
                        <li class="liborder">
                            <span>保养说明:</span>
                            <p class="text">{{dataInfo.completionInfo.maintainExplain}}</p>
                            <p class="voice">
                                <audio v-if="dataInfo.completionInfo.repairContentAttachmentUrl" class="voiceitem" :src="dataInfo.completionInfo.repairContentAttachmentUrl" controls="controls"></audio>

                            </p>
                        </li>
                        <li>
                            <span>相关附件:</span>
                            <p class="img" v-if="dataInfo.completionInfo.repairAttachmentUrl">
                                <img v-for="item in dataInfo.completionInfo.repairAttachmentUrl" :src="item" alt="">
                            </p>
                        </li>
                    </ul>
                </div>

            </div>


            <div class="card orther">
                <p class="title">
                    保养项目作业书
                    <img src="../../../../static/image/down.png" alt="" @click="show6=!show6">
                </p>
                <div v-show="show6">
                    <hr class="hr">
                    <div class="plan" v-for="item in workList">
                        <p class="plantitle">
                            <span>{{item.content}}</span>
                            <span class="right">
                               <icon type="warn"  v-if="item.state==0"></icon>
                                <icon type="success"  v-if="item.state==1"></icon>
                                {{item.state==0?'未完成':'已完成'}}
                            </span>
                        </p>
                        <p class="info">{{item.content}}</p>
                    </div>
                </div>

            </div>

            <div class="buttonbox" v-if="$route.params.type==2 || $route.params.type==1 ">
                <p v-if="$route.params.type==2 " @click="paymentHandle">挂单</p>
                <p v-if="$route.params.type==1" @click="$router.push('/MainTask')">取消</p>
                <p @click="selectPerson" >保养</p>
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
    import { Icon,XHeader,Confirm,TransferDomDirective as TransferDom} from 'vux'

    export default {
        name: "MainInfo",
        data:function(){
            return{
                ranlingshow:false,
                dataInfo:'',
                workList:[],
                show1:true,
                show2:true,
                show3:true,
                show4:true,
                show5:true,
                show6:true,
                deviceInfo:''
            }
        },
        mounted(){
            let vm =this
            this.deviceInfo = JSON.parse(sessionStorage.getItem(vm.$route.params.id))

            this.requestInfo()
            this.requestList()
        },
        methods:{

            //挂单
            paymentHandle(){
                let vm =this
                vm.$router.push('/PayMent/baoyang/'+vm.$route.params.id)
            },
            //认领
            onConfirm(){
                let vm =this
                vm.$http.post('AppmaintainController/claimOrAssignMaintain',{
                    type:0,
                    id:vm.$route.params.id,
                    implementPersonCode:JSON.parse(localStorage.getItem('loginInfo')).name,
                    implementPersonName:JSON.parse(localStorage.getItem('loginInfo')).id
                }).then(res=>{
                    if(res.code==200){
                        vm.$vux.toast.show({
                            text:'认领成功',
                            time:2000
                        })
                        vm.$router.push('/TMainTask')
                    }
                })
            },
            //    指派
            selectPerson(){
                let vm =this
                sessionStorage.setItem(this.$route.params.id,JSON.stringify(vm.dataInfo.assetsInfo))
                this.$router.push('/Maintain/'+this.$route.params.id)
            },
            requestInfo(){
                let vm =this
                vm.$http.post('AppmaintainController/MaintainView',{
                    id:vm.$route.params.id
                }).then(res=>{
                    if(res.code==200){
                        vm.dataInfo = res.data
                    }
                })
            },
            requestList(){
                let vm =this
                vm.$http.post('AppmaintainController/findMaintainWorkList',{
                    id:vm.$route.params.id
                }).then(res=>{
                    if(res.code==200){
                        vm.workList = res.data.work
                    }
                })
            },
        },

        components:{
            XHeader,Confirm,Icon
        },
    }
</script>

<style scoped lang="scss">
    .maininfo{
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
                        .voice {
                            height: 0.4rem;
                            margin: 0 auto;
                            color: #ffffff;
                            position: relative;
                            text-align: center;
                            margin-top: 0.3rem;
                            border-radius: 4px;
                            margin-bottom: 0.1rem;
                            .voiceitem {
                                background-color: #38C7C4;

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