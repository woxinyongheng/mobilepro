<template>
    <div class="repair">
        <x-header  style="background-color:#2CC7C5;">维修登记</x-header>
        <div class="contentbox">
            <div class="banner">
                <div class="title"><span><span>{{deviceInfo.classifyName+'-'+deviceInfo.assetsName}}</span></span>
                </div>
                <hr class="hr">
                <div class="list">
                    <ul>
                        <li>
                            <span>设备编号：</span>{{deviceInfo.assetsCode}}
                        </li>
                        <li>
                            <span>所处区域：</span>{{deviceInfo.areaName}}
                        </li>
                        <li>
                            <span>存放位置：</span>{{deviceInfo.storageLocation}}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="banner content">
                <div class="title">维修记录</div>
                <group style="font-size: 0.14rem">
                    <x-input title="维修人"  text-align="right" placeholder="" v-model="username"></x-input>
                    <x-input title="维修人电话" type="number" text-align="right" v-model="phone" placeholder=""></x-input>
                    <x-textarea title="损坏原因" v-model="repairreason" placeholder="请填写损坏原因" :show-counter="false" :rows="3"></x-textarea>
                </group>
            </div>
            <div class="banner content">
                <div class="title">使用配件</div>
                <p class="table" v-for="(item,index) in partArr">
                    <span class="labelname">{{item.dictLabel}}</span><span>{{item.num}}</span><span>{{item.money}}</span>
                    <img @click="deletePart(index)" src="../../../../static/image/delete.png" alt="" class="deletetable">
                </p>
                <p class="addpng" @click="addParts">
                    <img src="../../../../static/image/add.png" alt="">添加配件
                </p>
                <div style="font-size: 0.14rem">
                    <p style="padding: 10px 15px;position: relative;">
                        <span>其他支出</span>
                        <input  type="number" @blur="scrollBottom" v-model="servicePay" style="text-align: right;width: 50%;height: 1.5em;position: absolute;right: 15px;outline: none;
    -webkit-appearance: none; -webkit-appearance: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);border: none">
                    </p>
                    <!--<x-input title="其他支出" class="moneyinput" :show-clear="false" text-align="right" placeholder="" v-model="servicePay" type="number"></x-input>-->
                    <x-input title="维修总支出" disabled type="number" text-align="right" v-model="repairPay" placeholder=""></x-input>
                </div>
            </div>

            <div class="banner content">
                <div class="title">维修信息</div>
                <group style="font-size: 0.14rem">
                    <x-textarea title="维修说明" :max="120"  @on-blur="scrollBottom" v-model="repairExplain" placeholder="请输入维修说明" :show-counter="false" :rows="3"></x-textarea>
                </group>
                <p class="voice" v-if="!localId"  @touchstart.stop.prevent="recordStart" @touchend.stop.prevent="recordEnd">
                    <img src="../../../../static/image/voice.png" alt="">
                    按住说话
                </p>
                <p v-if="localId" class="voicebox">
                    <span class="playvoice" @click="playVoice">
                        <img class="vioicimg" src="../../../../static/image/vioictime.png" alt="">
                        <span>播放语音</span>
                    </span>
                    <!--<audio  class="voiceitem" :src="localId" controls="controls"></audio>-->
                    <span @click="clearVoice"><icon type="cancel" class="icon"></icon></span>
                </p>
                <!--<p v-if="localId" class="voicebox">-->
                    <!--<audio  class="voiceitem" :src="localId" controls="controls"></audio>-->
                    <!--<span @click="localId=''"><icon type="cancel" class="icon"></icon></span>-->
                <!--</p>-->
                <div class="imgbox">
                    <p>相关附件</p>
                    <div class="list">
                        <p class="imglist" v-for="(item,index) in urlArr">
                            <img :src="item" alt="" @click="pictureUrl=item">
                            <img @click="deleteImg(index)" src="../../../../static/image/close.png" alt="" class="close">
                        </p>
                        <upload v-if="urlArr.length<3" @uploadHandle="uploadHandle"></upload>
                    </div>
                </div>
            </div>
            <div class="buttonbox">
                <p  @click="cancle">取消</p>
                <p  @click="sureSubmit">确定</p>

            </div>
            <!--<div class="sure">-->
                <!--<p class="button" @click="sureSubmit">确认提交</p>-->
            <!--</div>-->
            <div>
                <confirm v-model="ranlingshow"
                         title="提示"
                         @on-confirm="onConfirm">
                    <p style="text-align:center;">确定提交吗，提交后无法进行修改</p>
                </confirm>
            </div>
        </div>
        <div class="footerimg" v-if="pictureUrl">
            <img src="/static/image/close.png" alt="" class="i" @click="pictureUrl=''">
            <img :src="pictureUrl" alt="">
        </div>

    </div>
</template>

<script>
    import { XHeader,Datetime,Group,Selector,PopupPicker,Cell,XTextarea,XInput,Icon,Confirm} from 'vux'
    import upload from '@/components/common/UpLoad'
    export default {
        name: "Repair",
        data:function(){
            return{
                pictureUrl:'',
                deviceInfo:'',
                ranlingshow:false,
                username:JSON.parse(sessionStorage.getItem('weixiudata'))?JSON.parse(sessionStorage.getItem('weixiudata')).username:JSON.parse(localStorage.getItem('loginInfo')).name,
                phone:JSON.parse(sessionStorage.getItem('weixiudata'))?JSON.parse(sessionStorage.getItem('weixiudata')).phone :JSON.parse(localStorage.getItem('loginInfo')).phone,
                repairreason:JSON.parse(sessionStorage.getItem('weixiudata'))?JSON.parse(sessionStorage.getItem('weixiudata')).repairreason :'',
                repairExplain:JSON.parse(sessionStorage.getItem('weixiudata'))?JSON.parse(sessionStorage.getItem('weixiudata')).repairExplain:'',

                partArr:JSON.parse(sessionStorage.getItem('weixiudata'))?JSON.parse(sessionStorage.getItem('weixiudata')).partArr : [],
                repairPay:JSON.parse(sessionStorage.getItem('weixiudata'))?JSON.parse(sessionStorage.getItem('weixiudata')).repairPay : '0',
                servicePay:JSON.parse(sessionStorage.getItem('weixiudata'))?JSON.parse(sessionStorage.getItem('weixiudata')).servicePay : '',

                serverId:'',
                startTime:0,
                endTime:0,
                localId:JSON.parse(sessionStorage.getItem('weixiudata'))?JSON.parse(sessionStorage.getItem('weixiudata')).localId :'',
                photoArr:JSON.parse(sessionStorage.getItem('weixiudata'))?JSON.parse(sessionStorage.getItem('weixiudata')).photoArr : [],
                urlArr:JSON.parse(sessionStorage.getItem('weixiudata'))?JSON.parse(sessionStorage.getItem('weixiudata')).urlArr:[],
            }
        },
        mounted(){
          let vm =this
            vm.deviceInfo = JSON.parse(sessionStorage.getItem(vm.$route.params.id))
            // document.querySelector('.moneyinput input').oninput = function(){
            //     this.servicePay = document.querySelector('.moneyinput input').value*1
            //     if(this.servicePay){
            //         if(this.partArr && this.partArr.length){
            //             let num =0
            //             this.partArr.forEach(function (item) {
            //                 num += item.money*1
            //             })
            //             this.repairPay = num + this.servicePay*1
            //         }else{
            //             this.repairPay = this.servicePay*1
            //         }
            //     }else{
            //         if(this.partArr &&  this.partArr.length){
            //             let num =0
            //             this.partArr.forEach(function (item) {
            //                 num += item.money*1
            //             })
            //             this.repairPay = num
            //         }else{
            //             this.repairPay = this.servicePay*1
            //         }
            //     }
            // }

        },
        methods:{

            cancle(){
              this.$router.push('/ServiceTask')
            },
            deletePart(i){
                this.partArr.splice(i,1)
                if(this.servicePay){
                    if(this.partArr && this.partArr.length){
                        let num =0
                        this.partArr.forEach(function (item) {
                            num += item.money*1
                        })
                        this.repairPay = num + this.servicePay*1
                    }else{
                        this.repairPay = this.servicePay*1
                    }
                }else{
                    if(this.partArr &&  this.partArr.length){
                        let num =0
                        this.partArr.forEach(function (item) {
                            num += item.money*1
                        })
                        this.repairPay = num
                    }else{
                        this.repairPay = this.servicePay*1
                    }
                }
            },
            addParts(){
                let vm =this
                sessionStorage.setItem('weixiudata',JSON.stringify(vm._data))
                this.$router.push('/AddParts')
            },
            onConfirm(){
                let vm = this
                if(!vm.username){
                    vm.$vux.toast.show({
                        text:'维修人姓名必须填写',
                        time:2000,
                        type:'warn'
                    })
                    return
                }
                if(!vm.phone){
                    vm.$vux.toast.show({
                        text:'维修人电话必须填写',
                        time:2000,
                        type:'warn'
                    })
                    return
                }
                let _code = []
                let _name =[]
                let _num =[]
                let _money = []
                vm.partArr.forEach(function (item) {
                    _code.push(item.dictCode)
                    _name.push(item.dictLabel)
                    _num.push(item.num)
                    _money.push(item.money)
                })
                vm.$http.post('appMyWork/completeWorkOrder',{
                    repairPersonName:vm.username,
                    repairPersonPhone:vm.phone,
                    repairId:vm.$route.params.id,
                    damageCause:vm.repairreason,
                    partsCode:_code.join(','),
                    partsName:_name.join(','),
                    partsSum:_num.join(','),
                    partsPay:_money.join(','),
                    servicePay:vm.servicePay,
                    repairPay:vm.repairPay,
                    repairFinishExplain:vm.repairExplain,
                    finishContentAttachmentUrl:vm.serverId,
                    appId:JSON.parse(sessionStorage.getItem('WECHARTDATA')).appId,
                    finishAttachmentUrl:vm.photoArr,
                    flagkuayu:true
                }).then(res=>{
                    if(res.code==200){
                        vm.$vux.toast.show({
                            text:res.message,
                            time:2000,
                        })
                        vm.$router.push('/ServiceTask')
                        sessionStorage.removeItem('weixiudata')
                    }
                })
            },
            sureSubmit(){
                this.ranlingshow = true
                // return

            },
            //图片
            uploadHandle(file,url){
                this.photoArr.push(file)
                this.urlArr.push(url)
            },
            deleteImg(i){
                this.photoArr.splice(i,1)
                this.urlArr.splice(i,1)
            },
            //录音
            recordStart(){
                let vm =this
                vm.startTime = new Date().getTime();
                wx.startRecord({
                    success: function(){
                        localStorage.rainAllowRecord = 'true';
                    },
                    cancel: function () {
                        alert('用户拒绝授权录音');
                    }
                });

            },
            recordEnd(){
                let vm =this
                vm.endTime = new Date().getTime();
                if(vm.endTime - vm.startTime <300){
                    vm.endTime =0
                    vm.startTime=0
                    return
                }
                wx.stopRecord({
                    success: function (res) {
                        vm.localId = res.localId;
                        wx.uploadVoice({
                            localId: res.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: function (res) {
                                vm.serverId = res.serverId; // 返回音频的服务器端ID
                                console.log(vm.serverId)
                            }
                        });
                    },
                    fail: function (res) {
                        alert(JSON.stringify(res));
                    }
                });
            },
            playVoice(){
                let vm =this
                wx.playVoice({
                    localId: vm.localId, // 需要播放的音频的本地ID，由stopRecord接口获得
                    success:function(){
                        // alert('成功');
                    },
                    fail:function() {
                        // alert('失败');
                    }
                });
            },
            clearVoice(){
                let vm =this
                wx.pauseVoice()
                vm.localId=''
            },
            scrollBottom(){
                window.scroll(0, document.body.scrollHeight);
            }
        },
        components:{
            XHeader,Datetime,Group,Selector,PopupPicker,Cell,XTextarea,XInput,Icon,upload,Confirm
        },
        watch:{
            servicePay:function () {
                if(this.servicePay){
                    if(this.partArr.length){
                        let num =0
                        this.partArr.forEach(function (item) {
                            num += item.money*1
                        })
                        this.repairPay = num + this.servicePay*1
                    }else{
                        this.repairPay = this.servicePay*1
                    }
                }else{
                    if(this.partArr.length){
                        let num =0
                        this.partArr.forEach(function (item) {
                            num += item.money*1
                        })
                        this.repairPay = num
                    }else{
                        this.repairPay = this.servicePay*1
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .weui-cells{
        margin-top: 0 !important;
    }
.repair{
    overflow-x: hidden;
    .contentbox{
        height: calc(100vh - 50px);
        overflow-y: scroll;
    }
    .banner{
        padding: 0 0.1rem;
        background-color: #fff;
        text-align: left;
        font-family:PingFangSC-Light;
        .labelname{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            display: inline-block;
            width: 40%;
        }
        .title{
            position: relative;
            height: 0.39rem;
            line-height: 0.39rem;
            margin-left: 0.14rem;
            color: #353535;
            font-weight: 500;
            font-size: 0.16rem;
            box-sizing: border-box;
            margin-bottom: 0.06rem;
            .status{
                color: #38C7C4;
                position: absolute;
                right: 0.14rem;
                font-size: 0.12rem;
            }
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
                    height: 0.35rem;
                    line-height: 0.35rem;
                    font-weight: 300;
                    span{
                        font-weight: 400;
                    }

                }
            }
        }
    }
    .content{
        margin-top: 0.16rem;
        .title{
            margin-bottom: -0.14rem;
        }
        .table{
            height: 0.4rem;
            line-height: 0.4rem;
            display: flex;
            justify-content: space-around;
            background:rgba(244,244,244,1);
            border-radius:4px;
            color: #999999;
            span{
                width:20%

            }
        }
        .table:nth-of-type(1){
            margin-top: 0.12rem;
        }
        .deletetable{
            width: 0.24rem;
            height: 0.24rem;
            padding-top: 0.08rem;

        }
        .addpng{
            width:90%;
            margin: 0.2rem auto;
            height:0.4rem;
            line-height: 0.4rem;
            text-align: center;
            background:rgba(255,255,255,1);
            border:1px solid rgba(56,199,196,1);
            border-radius:8px;
            color: #38C7C4;
            img{
                width: 0.2rem;
                height: 0.2rem;
                vertical-align: middle;
                padding-right: 0.2rem;
            }
        }
        .voice{
            color: #ffffff;
            background-color: #38C7C4;
            height: 0.4rem;
            width: 80%;
            line-height: 0.4rem;
            text-align: center;
            border-radius: 5px;
            margin: 0.14rem auto;
            img{
                width: 0.12rem;
                vertical-align: middle;
                padding-right: 0.2rem;
            }
        }
        .voicebox{
            text-align: center;
            margin: 0.14rem 0;
            position: relative;
            .voiceitem{
                width: 60%;
            }
            .icon{
                position: absolute;
                right: 0.14rem;
                top: 0.2rem;
            }

        }
    }
    .imgbox{
        padding: 0.14rem;
        font-size: 16px;
        img{
            width: 0.8rem;
            height: 0.6rem;
        }
        .list{
            .imglist{
                display: inline-block;
                position: relative;
                .close{
                    width: 0.2rem;
                    height: 0.2rem;
                    position: absolute;
                    top: 0;
                    right: 0;
                }

            }
        }
    }
    .sure{
        margin-top: 0.2rem;
        height: 0.44rem;
        line-height: 0.44rem;
        background-color: #fff;
        text-align: center;
        padding: 0.2rem;
        .button{
            height: 0.44rem;
            line-height: 0.44rem;
            color: #ffffff;
            background:rgba(56,199,196,1);
            border-radius: 5px;
        }
        .surebutton{
            background:rgba(56,199,196,0.34);

        }
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
</style>