<template>
    <div class="card" @click="toGrade">
        <div class="title">
            设备编号: <span>{{item.assetsCode}}</span>
        </div>
        <hr class="hr">
        <div class="list">
            <ul>
                <li>
                    <span>设备名称：</span>{{item.assetsName}}
                </li>
                <li>
                    <span>设备类型：</span>{{item.classifyName}}
                </li>
                <li>
                    <span>设备品牌：</span>{{item.brandName}}
                </li>
                <li>
                    <span>所处区域：</span>{{item.areaName}}
                </li>
                <li>
                    <span>存放位置：</span>{{item.storageLocation}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Card",
        props:['item'],
        methods:{
            toGrade(){
                let vm =this
                this.$emit('toGrade',vm.item.assetsCode)
            }
        }
    }
</script>

<style scoped lang="scss">
    .card {
        background-color: #fff;
        padding: 0.1rem;
        margin-top: 0.14rem;
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

            span{
                font-weight: 300;
            }
            .status{
                color: #38C7C4;
                position: absolute;
                right: 0.14rem;
                font-size: 0.12rem;
            }
        }
        .hr{
            margin: 0 -0.1rem;
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
            left: -0.1rem;
            top: 0.12rem;
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
</style>