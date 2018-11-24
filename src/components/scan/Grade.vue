<template>
    <div class="grade">
        <x-header style="background-color:#2CC7C5;">报修登记</x-header>
        <div class="contentbox">
            <div class="banner">
                <div class="title" @click="selectDevice">设备信息<span class="status">选择设备 ></span>
                </div>
                <hr class="hr">
                <div class="list">
                    <ul>
                        <li>
                            <span>设备名称：</span>{{deviceInfo.assetsName}}
                        </li>
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
                <div class="title">报修记录</div>
                <!--<hr class="hr">-->
                <group style="font-size: 0.14rem">
                    <datetime v-model="value1" format="YYYY-MM-DD"  title="报修时间"></datetime>
                    <x-input title="报修人"  text-align="right" placeholder="" v-model="username"></x-input>

                    <!--<group title="报修人电话">-->
                        <x-input title="报修人电话" type="number" text-align="right" v-model="phone" placeholder=""></x-input>
                    <!--</group>-->
                    <x-textarea title="详细信息" v-model="repairExplain" placeholder="请输入您要报修的故障内容描述，字数在120字以内，或直接语音发布，限时60秒" :show-counter="false" :rows="3"></x-textarea>
                </group>
                <p class="voice" v-if="!localId"  @touchstart.stop.prevent="recordStart" @touchend.stop.prevent="recordEnd">
                    <img src="../../../static/image/voice.png" alt="">
                    按住说话
                </p>
                <p v-if="localId" class="voicebox">
                    <audio  class="voiceitem" :src="localId" controls="controls"></audio>
                    <span @click="localId=''"><icon type="cancel" class="icon"></icon></span>
                </p>
                <div class="imgbox">
                    <p>相关附件</p>
                    <div class="list">
                        <p class="imglist" v-for="(item,index) in urlArr">
                            <img :src="item" alt="">
                            <img @click="deleteImg(index)" src="../../../static/image/close.png" alt="" class="close">
                        </p>
                        <upload @uploadHandle="uploadHandle"></upload>
                    </div>
                </div>
            </div>
            <div class="sure">
                <p class="button" @click="sureSubmit">确认提交</p>

            </div>

        </div>


    </div>
</template>

<script>
    import { XHeader,Datetime,Group,Selector,PopupPicker,Cell,XTextarea,XInput,Icon} from 'vux'
    import upload from '@/components/common/UpLoad'
    import { dateFormat } from 'vux'
    export default {
        name: "Grade",
        data:function(){
            return{
                value1:dateFormat(new Date(), 'YYYY-MM-DD'),
                list1: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你']],
                list:[{key: 'gd', name: 'feifei'}, {key: 'gx', name: 'longlong'}],
                defaultValue:[],
                options3:'13298276688',
                option4:'13298276688',
                deviceInfo:{},
                username:JSON.parse(localStorage.getItem('loginInfo')).name,
                phone:JSON.parse(localStorage.getItem('loginInfo')).phone,
                startTime:0,
                endTime:0,
                localId:'',
                photoArr:[],
                urlArr:[],
                repairExplain:''


            }
        },
        mounted(){
          this.requestDeviceInfo()
        },
        methods:{
            uploadHandle(file,url){
                this.photoArr.push(file)
                this.urlArr.push(url)
            },
            deleteImg(i){
                this.photoArr.splice(i,1)
                this.urlArr.splice(i,1)
            },
            selectDevice(){
                this.$router.push('/SelectDevice')
            },
            requestDeviceInfo(){
                let vm =this
                vm.$http.post('equipmentListController/GetEquipmentById',{
                    id:vm.$route.params.id
                }).then(res=>{
                    if(res.code==200){
                        vm.deviceInfo = res.data.list
                    }
                })
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
                    },
                    fail: function (res) {
                        alert(JSON.stringify(res));
                    }
                });
            },
            //提交
            sureSubmit(){

                debugger
                let vm =this
                vm.$http.post('equipmentListController/equipmentRepair',{
                    createPersonName:JSON.parse(localStorage.getItem('loginInfo')).name,
                    createPersonCode:JSON.parse(localStorage.getItem('loginInfo')).id,
                    createPersonPhone:JSON.parse(localStorage.getItem('loginInfo')).phone,
                    reportTime:vm.value1,
                    reportPersonCode: vm.username ==JSON.parse(localStorage.getItem('loginInfo')).name ? JSON.parse(localStorage.getItem('loginInfo')).id:'',
                    reportPersonName:vm.username,
                    reportPersonPhone:vm.phone,
                    repairExplain:vm.repairExplain,
                    repairContentAttachmentUrl:vm.localId,
                    repairAttachmentUrl:vm.photoArr,
                    equipmentId:vm.$route.params.id,
                    flagkuayu:true
                }).then(res=>{
                    if(res.code==200){
                        vm.$vux.toast.show({
                            text:res.message,
                            time:2000
                        })
                        vm.$router.push('/index')
                    }
                })
            }
        },
        components:{
            XHeader,Datetime,Group,Selector,PopupPicker,Cell,XTextarea,XInput,Icon,upload
        }
    }
</script>

<style scoped lang="scss">
    .weui-cells{
        margin-top: 0 !important;
    }
    .grade{
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


    }

</style>