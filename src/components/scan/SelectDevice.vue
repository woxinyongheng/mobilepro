<template>
    <div class="selectdevice">
        <x-header style="background-color:#2CC7C5;">选择设备</x-header>
        <div class="contentbox" @scroll="scrollAjax">
            <div class="scrollbox">
                <div class="banner">
                    <div class="searchbox">
                        <img src="../../../static/image/search.png" alt="">
                        <input type="text" placeholder="请输入设备编号" v-model="assetsCode">
                        <span @click="requestList">搜索</span>
                    </div>
                    <div class="buttonbox">
                        <p :class="!assetsTypeId?'active':''" @click="tyepeClick()">全部</p>
                        <p v-for="item in typeList" :class="assetsTypeId==item.typeId?'active':''"
                           @click="tyepeClick(item.typeId)">{{item.typeName}}</p>
                    </div>
                </div>
                <div class="content">

                    <minecard v-if="listData.length" v-for="(item,index) in listData" :key="index" :item="item" @toGrade="toGrade"></minecard>
                    <none v-if="!listData.length"></none>

                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import {XHeader} from 'vux'
    import minecard from './Card'
    import none from '@/components/common/none'


    export default {
        name: "SelectDevice",
        data: function () {
            return {
                pageSize: 10,
                currentPage: 1,
                total: 0,
                typeList: [],
                assetsTypeId: '',
                assetsCode: '',
                scroll: false,
                listData: []


            }
        },
        mounted() {
            this.requestType()
            this.requestList()
        },
        methods: {
            tyepeClick(id) {
                this.assetsTypeId = id
                this.requestList()
            },
            toGrade(str) {
                this.$router.push('/Grade/' + str)
            },
            requestType() {
                let vm = this
                vm.$http.post('equipmentConfigController/getDeviceTypeList', {}).then(res => {
                    if (res.code == 200) {
                        vm.typeList = res.data
                    }
                })
            },
            requestList(str) {
                let vm = this
                vm.$http.post('equipmentListController/equipmentList', {
                    pageSize: vm.pageSize,
                    currentPage: vm.currentPage,
                    assetsTypeId: vm.assetsTypeId,
                    assetsCode: vm.assetsCode
                }).then(res => {
                    if (str) {
                        vm.listData = vm.listData.concat(res.data.list)
                    } else {
                        vm.listData = res.data.list
                    }
                    vm.scroll = false
                    vm.total = res.data.count
                })
            },
            //    滚动处理
            scrollAjax(e) {
                if (this.scroll) return;
                var nowScrollTop = document.querySelector(".contentbox").scrollTop;
                var _boxHeight = document.querySelector(".contentbox").clientHeight;
                var _height = document.querySelector(".scrollbox").clientHeight;
                if (nowScrollTop + _boxHeight > _height - 100) {
                    this.scroll = true;
                    var self = this;
                    if (self.listData.length >= self.total) return;
                    self.currentPage++;
                    self.requestList(true)
                }
            },
        },
        components: {
            XHeader, minecard,none
        },
    }
</script>

<style scoped lang="scss">
    .selectdevice {
        text-align: left;
        .contentbox {
            height: calc(100vh - 50px);
            overflow-y: scroll;
        }
        .banner {
            background-color: #fff;
            padding: 0.1rem;
            .searchbox {
                background-color: #EFEFF4;
                height: 0.4rem;
                line-height: 0.4rem;
                padding: 0 0.2rem;
                position: relative;
                border-radius: 5px;
                img {
                    width: 0.16rem;
                    vertical-align: middle;
                }
                input {
                    outline: 0;
                    border: none;
                    background-color: #EFEFF4;
                    height: 0.4rem;
                    width: 90%;
                    font-size: 0.14rem;
                    color: #B2B2B2;
                }
                span {
                    position: absolute;
                    right: 0.2rem;
                    font-size: 0.14rem;
                    padding-left: 0.1rem;
                }
                span::before {
                    content: '';
                    width: 1px;
                    height: 0.2rem;
                    background-color: #D3D3D5;
                    position: absolute;
                    top: 0.1rem;
                    left: -0.1rem;
                }
            }
            .buttonbox {
                margin-top: 0.1rem;
                p {
                    padding: 0 0.16rem;
                    height: 0.35rem;
                    line-height: 0.35rem;
                    background-color: #F4F4F4;
                    font-size: 0.14rem;
                    color: #353535;
                    display: inline-block;
                    border-radius: 5px;
                    margin: 5px 5px;
                }
                .active {
                    background: rgba(56, 199, 196, 0.1);
                    color: #38C7C4;
                }
            }
        }

    }
</style>