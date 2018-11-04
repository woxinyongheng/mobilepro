<template>
    <div class="card" @click="toInfoHandle(1)">
        <div class="title">
            <span class="stabun">{{type==1?'质保':'维保'}}</span>任务编号: <span>HNZ100115004</span>
            <span class="status" :class="type==1?'error':''">未派工</span>
        </div>
        <hr class="hr">
        <div class="list">
            <ul>
                <li>
                    <span>任务名称：</span><span class="right">电梯设备-9号楼8号电梯（月保养）</span>
                </li>
                <li>
                    <span>保养任务：</span><span class="right">过滤网保养</span>
                </li>
                <li>
                    <span>维保单位：</span><span class="right">某某设备维保公司</span>
                </li>
                <li>
                    <span>规定时间：</span><span class="right">2018-07-12  12:00 至 2018-08-14
                    23:59</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props:['type'],
        name: "Card",
        methods:{
            toInfoHandle(id){
                this.$emit('toInfoHandle',id)
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
            color: #353535;
            font-weight: 500;
            font-size: 0.16rem;
            box-sizing: border-box;
            margin-bottom: 0.06rem;
            .stabun{
                display: inline-block;
                vertical-align: middle;
                background:rgba(245,248,255,1);
                border:1px solid rgba(79,135,251,1);
                border-radius:4px;
                font-size: 0.12rem;
                height: 0.18rem;
                line-height: 0.18rem;
                padding: 0 0.1rem;
                color: #4F87FB;
                font-weight: 400;
                margin-right: 0.1rem;
            }
            span{
                font-weight: 300;
            }
            .status{
                color: #38C7C4;
                position: absolute;
                right: 0.14rem;
                font-size: 0.12rem;
            }
            .error{
                color: #FF2020;
            }
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
                    /*height: 0.35rem;*/
                    line-height: 0.35rem;
                    span{
                        display: inline-block;
                        vertical-align: top;
                        font-weight: 400;
                    }
                    span:nth-of-type(1){
                        width: 0.8rem;
                    }
                    .right{
                        font-weight: 300;
                        width: calc(100% - 0.8rem);
                        /*line-height: 0.25rem;*/
                        /*padding: 0.1rem 0;*/
                    }

                }
            }
        }
        

    }
</style>