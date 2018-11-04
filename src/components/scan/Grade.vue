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
                            <span>设备名称：</span>9号楼8号电梯
                        </li>
                        <li>
                            <span>设备编号：</span>9号楼8号电梯
                        </li>
                        <li>
                            <span>所处区域：</span>9号楼8号电梯
                        </li>
                        <li>
                            <span>存放位置：</span>9号楼8号电梯
                        </li>
                    </ul>
                </div>
            </div>
            <div class="banner content">
                <div class="title">报修记录</div>
                <!--<hr class="hr">-->
                <group style="font-size: 0.14rem">
                    <datetime v-model="value1" title="报修时间"></datetime>
                    <popup-picker title="报修人" :data="list1" v-model="defaultValue"></popup-picker>
                    <cell title="报修人电话" :value="options3"></cell>
                    <x-textarea title="详细信息" placeholder="请输入您要报修的故障内容描述，字数在120字以内，或直接语音发布，限时60秒" :show-counter="false" :rows="3"></x-textarea>
                </group>
                <p class="voice">
                    <img src="../../../static/image/voice.png" alt="">
                    按住说话
                </p>
                <div class="imgbox">
                    <p>相关附件</p>
                    <div class="list">
                        <p class="imglist">
                            <img src="../../../static/image/maintan.png" alt="">
                            <img src="../../../static/image/close.png" alt="" class="close">
                        </p>

                        <img src="../../../static/image/addimg.png" alt="">
                    </div>
                </div>
            </div>
            <div class="sure">
                <p class="button">确认提交</p>

            </div>

        </div>


    </div>
</template>

<script>
    import { XHeader,Datetime,Group,Selector,PopupPicker,Cell,XTextarea} from 'vux'

    export default {
        name: "Grade",
        data:function(){
            return{
                value1:'',
                list1: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你']],
                list:[{key: 'gd', name: 'feifei'}, {key: 'gx', name: 'longlong'}],
                defaultValue:[],
                options3:'13298276688',
                option4:'13298276688'

            }
        },
        methods:{
            selectDevice(){
                this.$router.push('/SelectDevice')
            }
        },
        components:{
            XHeader,Datetime,Group,Selector,PopupPicker,Cell,XTextarea
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