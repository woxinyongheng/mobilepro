<template>
    <div class="maintain">
        <x-header  style="background-color:#2CC7C5;">保养登记</x-header>
        <div class="contentbox" v-if="dataInfo">
            <div class="banner">
                <div class="title"><span><span>{{dataInfo.classifyName+'-'+dataInfo.assetsName}}</span></span>
                </div>
                <hr class="hr">
                <div class="list">
                    <ul>
                        <li>
                            <span>设备编号：</span>{{dataInfo.assetsCode}}
                        </li>
                        <li>
                            <span>所处区域：</span>{{dataInfo.areaName}}
                        </li>
                        <li>
                            <span>存放位置：</span>{{dataInfo.storageLocation}}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="banner content">
                <div class="title">保养记录</div>
                <group style="font-size: 0.14rem">
                    <x-input title="保养人"  text-align="right" placeholder="" v-model="username"></x-input>
                    <x-input title="保养人电话" type="number" text-align="right" v-model="phone" placeholder=""></x-input>
                </group>
            </div>




            <div class="banner content">
                <div class="title">保养信息</div>
                <group style="font-size: 0.14rem">
                    <x-textarea title="保养说明" v-model="repairExplain" placeholder="请输入保养说明" :show-counter="false" :rows="3"></x-textarea>
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
                            <img :src="item" alt="">
                            <img @click="deleteImg(index)" src="../../../../static/image/close.png" alt="" class="close">
                        </p>
                        <upload @uploadHandle="uploadHandle"></upload>
                    </div>
                </div>
            </div>

            <div class="banner content">
                <div class="title">保养项目作业书</div>
                <div class="baoyangshu" v-for="(item,index) in workList">
                    <p class="baoyangshulist">{{index+1+'：'+item.content}}</p>
                    <p class="baoyangshulist">
                        <span  @click="selectMain(index,1)">
                            <icon type="circle"  v-if="item.state==0"></icon>
                            <icon type="success"  v-if="item.state==1"></icon>
                            已完成

                        </span>
                        <span  @click="selectMain(index,0)">
                            <icon type="circle"  v-if="item.state==1"></icon>
                            <icon type="warn"  v-if="item.state==0"></icon>
                            未完成
                        </span>
                    </p>
                    <group style="font-size: 0.14rem">
                        <x-textarea  v-model="item.remarks" placeholder="请输入备注信息" :show-counter="false" :rows="3"></x-textarea>
                    </group>
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

    </div>
</template>

<script>
    import { XHeader,Datetime,Group,Selector,PopupPicker,Cell,XTextarea,XInput,Icon,Confirm} from 'vux'
    import upload from '@/components/common/UpLoad'

    export default {
        name: "Maintain",
        data:function(){
            return{
                dataInfo:'',
                username:JSON.parse(localStorage.getItem('loginInfo')).name,
                phone:JSON.parse(localStorage.getItem('loginInfo')).phone,
                repairExplain:'',
                startTime:0,
                endTime:0,
                localId:'',
                photoArr:[],
                urlArr:[],
                workList:[],
                ranlingshow:false,
                serverId:''
            }
        },
        mounted(){
            this.requestInfo()
            this.requestList()
        },
        methods:{
            cancle(){
              this.$router.push('/MainTask')
            },
            selectMain(i,num){
                let vm =this
                let obj = this.workList[i]
                obj.state=num
                // this.workList.splice(i,1,obj)
                vm.$set(vm.workList,i, obj)
            },
            sureSubmit(){
                let vm =this
                let _i = vm.workList.findIndex(function (item) {
                    return item.state ==0
                })
                if(_i>-1){
                    vm.$vux.toast.show({
                        text:'尚有未完成的作业事项，请完成后再提交',
                        time:2000,
                        type:'warn'
                    })
                    return
                }
                this.ranlingshow = true
            },
            onConfirm(){
                let vm =this
                vm.$http.post('AppmaintainController/maintainEquipment',{
                    id:vm.$route.params.id,
                    maintainPersonPhone:vm.phone,
                    maintainExplain:vm.repairExplain,
                    finishAttachmentUrl:vm.photoArr,
                    content:JSON.stringify(vm.workList),
                    repairAttachmentUrl:vm.serverId,
                    appId:JSON.parse(sessionStorage.getItem('WECHARTDATA')).appId,
                    flagkuayu:true
                }).then(res=>{
                    if(res.code==200){
                        vm.$vux.toast.show({
                            text:res.message,
                            time:2000,
                        })
                        vm.$router.push('/MainTask')
                    }
                })
            },
            requestInfo(){
                let vm =this
                vm.$http.post('AppmaintainController/MaintainView',{
                    id:vm.$route.params.id
                }).then(res=>{
                    if(res.code==200){
                        vm.dataInfo = res.data.assetsInfo
                    }
                })
            },
            requestList(){
                let vm =this
                vm.$http.post('AppmaintainController/findMaintainWorkList',{
                    id:vm.$route.params.id
                }).then(res=>{
                    if(res.code==200){
                        let arr = res.data.work
                        arr.forEach(function (item,index) {
                            item.state=0
                            arr[index] = item
                        })
                        vm.workList = arr
                    }
                })
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

        },

        components:{
            XHeader,Datetime,Group,Selector,PopupPicker,Cell,XTextarea,XInput,Icon,upload,Confirm
        },
    }
</script>

<style scoped lang="scss">
    .weui-cells{
        margin-top: 0 !important;
    }
    .maintain{
        overflow-x: hidden;
        .contentbox{
            height: calc(100vh - 50px);
            overflow-y: scroll;
            .baoyangshu{
                padding: 0.2rem 0.1rem;
                .baoyangshulist{
                    height: 0.4rem;
                    line-height: 0.4rem;
                }
                .baoyangshulist:nth-of-type(2){
                    color: #999999;
                }
                .baoyangcontent{
                    padding: 0.12rem;
                    background:rgba(244,244,244,1);

                }
            }
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