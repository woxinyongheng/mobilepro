<template>
    <div class="home">
        <x-header :left-options="{showBack: false}" style="background-color:#2CC7C5;">我的工作
            <a style="color: #fff" slot="right" @click="deviceRepair">设备报修</a>
        </x-header>
        <div class="banner"></div>
        <tindex class="conbox" v-if="role=='teamleader'|| role=='worker'"></tindex>
        <mindex class="conbox" v-else></mindex>
        <div class="mask" v-if="repairShow" @click="repairShow=false">
            <div class="content">
                <p class="up"></p>

                <p @click="routertosacn(0)"><img src="../../../static/image/scan.png" alt="">扫描条码</p>
                <p @click="routertosacn(1)"><img src="../../../static/image/add.png" alt="">手动新增</p>

            </div>
        </div>
    </div>
</template>

<script>
    import {XHeader} from 'vux'
    import tindex  from './indextem/tindex'
    import  mindex from './indextem/mindex'

    export default {
        name: "Home",
        data: function () {
            return {
                role: JSON.parse(localStorage.getItem('ROLECODE')).roleCode ,
                repairShow: false,
            }
        },
        mounted() {
            this.requestWechart()
        },
        methods: {
            //我的报修
            routertosacn(num) {
                let vm = this
                if (num == 0) {
                    console.log('调用扫码')
                    wx.scanQRCode({
                        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                        success: function (res) {
                            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                            vm.$router.push('/Grade/' + result)
                        }
                    });

                    return
                }
                this.$router.push('/SelectDevice')
            },
            //设备报修
            deviceRepair() {
                let vm = this
                this.requestWechart()
                vm.repairShow = true
            },
            requestWechart() {
                let vm = this
                if (!sessionStorage.getItem('WECHART')) {
                    let _url = __PATH.WECHART + 'accessToken/getSignature?'+'hospitalCode='+JSON.parse(localStorage.getItem('loginInfo')).userOffice[0].hospitalCode +'&localUrl=' + location.href
                    vm.$http.get(_url).then(res => {
                        if (res.code == 200) {
                            console.log('请求成功')
                            sessionStorage.setItem('WECHARTDATA',JSON.stringify(res.data))
                            wx.config({
                                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                                appId: res.data.appId, // 必填，公众号的唯一标识
                                timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                                nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                                signature: res.data.signature, // 必填，签名，见附录1
                                jsApiList: ['scanQRCode', 'startRecord', 'stopRecord','playVoice','pauseVoice','uploadVoice']
                            });
                            console.log('配置')
                            wx.ready(function () {
                                wx.hideMenuItems({
                                    menuList: [
                                        'menuItem:scanQRCode',
                                        'menuItem:startRecord',
                                        'menuItem:stopRecord',
                                        'menuItem:playVoice',
                                        'menuItem:pauseVoice',
                                        'menuItem:uploadVoice',
                                    ],
                                    success: function (res) {
                                        console.log('配置成功')
                                        sessionStorage.setItem('WECHART', 'TRUE')
                                    },
                                    fail: function (res) {
                                        console.log('配置失败')
                                    }
                                });
                            })
                        }
                    })
                }
            }

        },
        components: {
            XHeader,tindex,mindex
        },

    }
</script>

<style scoped lang="scss">

    .home {
        .banner {
            height: 0.4rem;
            background-color: #2CC7C5;
            overflow-x: hidden;
        }
        .conbox{
            height: 90vh;
            overflow-y: scroll;
        }
        .mask {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.1);
            z-index: 999;

            .content {
                background-color: #fff;
                padding: 0 0.2rem;
                position: absolute;
                right: 0.1rem;
                top: 40px;
                p {
                    height: 0.48rem;
                    line-height: 0.48rem;
                }
                img {
                    width: 0.2rem;
                    height: 0.2rem;
                    vertical-align: middle;
                    padding-right: 0.12rem;
                }
                .up {
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    border-bottom: 5px solid #fff;
                    left: 80%;
                    -webkit-transform: translateX(-50%);
                    transform: translateX(-50%);
                    height: 5px;
                    width: 3px;
                    position: absolute;
                    top: -10px;
                }

            }
        }
    }
</style>
