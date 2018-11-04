<template>
    <div class="card">
        <div class="title">
            任务编号: <span>HNZ100115004</span>
            <span class="status">未派工</span>
        </div>
        <hr class="hr">
        <div class="list">
            <ul>
                <li>
                    <span>设备名称：</span>9号楼8号电梯
                </li>
                <li>
                    <span>设备类型：</span>9号楼8号电梯
                </li>
                <li>
                    <span>所处区域：</span>9号楼8号电梯
                </li>
                <li>
                    <span>报修日期：</span>9号楼8号电梯
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Card"
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