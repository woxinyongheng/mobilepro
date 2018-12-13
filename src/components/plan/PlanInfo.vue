<template>
    <div class="planinfo">
        <x-header style="background-color:#2CC7C5;">计划任务详情</x-header>
        <div class="content" v-if="dataInfo">
            <div class="title">
                计划详情
            </div>
            <div class="list">
                <ul>
                    <li>
                        <span>计划详情：</span><span class="right">{{dataInfo.taskDetail.planName}}保养计划</span>
                    </li>
                    <li>
                        <span>设备类型：</span><span class="right">{{dataInfo.taskDetail.facilityTypeName}}</span>
                    </li>
                    <li>
                        <span>设备数量：</span><span class="right">{{dataInfo.taskDetail.facilityNum}}</span>
                    </li>
                    <li>
                        <span>保养类型：</span><span class="right">{{dataInfo.taskDetail.maintainType==1?'质保':'维保'}}</span>
                    </li>
                    <li>
                        <span>保养周期：</span><span class="right">{{dataInfo.taskDetail.cycleType==0?'周':(dataInfo.taskDetail.cycleType==1?'半月':(dataInfo.taskDetail.cycleType==2?'月':(dataInfo.taskDetail.cycleType==3?'季度':(dataInfo.taskDetail.cycleType==4?'半年':'年'))))}}
                     </span>
                    </li>
                    <li>
                        <span>保养单位：</span><span class="right">{{dataInfo.taskDetail.company}}</span>
                    </li>
                    <li>
                        <span>规定时间：</span><span class="right">{{dataInfo.taskDetail.startTime+'-'+dataInfo.taskDetail.endTime}}</span>
                    </li>
                </ul>
            </div>
            <div class="renwu" v-for="item in dataInfo.maintainTaskList" @click="$router.push('/TaskInfo/'+item.id)">
                <div class="title topborder">
                    任务编号：{{item.maintainTaskCode}}
                    <span class="status" v-if="item.state==0">未派工</span>
                    <span class="status" v-if="item.state==1">已挂单</span>
                    <span class="status" v-if="item.state==2">已派工</span>
                    <span class="status" v-if="item.state==3">已完成</span>
                </div>
                <div class="list">
                    <ul>
                        <li>
                            <span>设备编号：</span><span class="right">{{item.assetsCode}}</span>
                        </li>
                        <li>
                            <span>设备名称：</span><span class="right">{{item.assetName}}</span>
                        </li>
                        <li>
                            <span>设备品牌：</span><span class="right">{{item.brandName}}</span>
                        </li>
                        <li>
                            <span>所处区域：</span><span class="right">{{item.areaName}}</span>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import { XHeader} from 'vux'

    export default {
        name: "PlanInfo",
        data:function(){
          return{
              dataInfo:''
          }
        },
        mounted(){
            this.requestInfo()
        },
        methods:{
          requestInfo(){
              let vm =this
              vm.$http.post('/planTask/getPlanTaskDetail',{
                  id:vm.$route.params.id
              }).then(res=>{
                  if(res.code==200){
                      vm.dataInfo = res.data
                  }
              })

          }
        },
        components:{
            XHeader
        },
    }
</script>

<style scoped lang="scss">
.planinfo{
    .content{
        background-color: #fff;
        padding: 0.1rem;
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
                    /*height: 0.35rem;*/
                    line-height: 0.35rem;
                    span{
                        display: inline-block;
                        vertical-align: top;
                        font-weight: 400;
                    }
                    span:nth-of-type(1){
                        width: 1rem;
                    }
                    .right{
                        font-weight: 300;
                        width: calc(100% - 1rem);
                        word-wrap: break-word;
                        /*line-height: 0.25rem;*/
                        /*padding: 0.1rem 0;*/
                    }

                }
            }
        }
        .renwu{
            border-top: 10px solid #f3f6f9;
            margin: 0 -0.1rem;
            padding: 0.1rem;
        }


    }
}
</style>