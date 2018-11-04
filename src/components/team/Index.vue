<template>
    <div class="home">
        <x-header :left-options="{showBack: false}" style="background-color:#2CC7C5;">我的工作
            <a style="color: #fff" slot="right" @click="repairShow=true">设备报修</a>
        </x-header>
        <div class="banner"></div>
        <div class="cardbox">
            <div class="card">
                <p class="title">我的任务</p>
                <div class="cardlist" >
                    <div class="carditem common-1px-r" @click="mineRouterTo('0')">
                        <img src="../../../static/image/maintan.png" alt="">
                        <div class="rightitem">
                            <p class="miancolor-1">150</p>
                            <p class="">维修任务</p>
                        </div>
                    </div>
                    <div class="carditem" @click="mineRouterTo('1')">
                        <img src="../../../static/image/service.png" alt="">
                        <div class="rightitem">
                            <p class="miancolor-2">150</p>
                            <p>保养任务</p>
                        </div>
                    </div>
                </div>

            </div>
            <div class="card">
                <p class="title">班组任务</p>
                <div class="cardlist">
                    <div class="carditem common-1px-r" @click="teamRouterTo('0')">
                        <img src="../../../static/image/maintan.png" alt="">
                        <div class="rightitem">
                            <p class="miancolor-1">150</p>
                            <p class="">维修任务</p>
                        </div>
                    </div>
                    <div class="carditem" @click="teamRouterTo('1')">
                        <img src="../../../static/image/service.png" alt="">
                        <div class="rightitem">
                            <p class="miancolor-2">150</p>
                            <p>保养任务</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="contentbox">
            <p class="caltotal">任务统计</p>
            <div id="myChart"></div>
        </div>
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
  import { XHeader} from 'vux'
    export default {
        name: "Home",
        data:function () {
          return{
              options:{
                  tooltip: {
                      trigger: 'item',
                      // formatter: " {b}：{c} "

                      // ({d}%)   代表该模块所占圆环比例
                      formatter: "{a} <br/>{b}: {c} ({d}%)"
                  },
                  //环形颜色
                  color:['#38C7C4','#FCB635'],
                  legend: {
                      left: 'center',
                      itemGap:40
                  },
                  // graphic 是原生图形元素组件。可以支持的图形元素包括：image, text, circle, sector, ring, polygon, polyline, rect, line, bezierCurve, arc, group,
                  graphic: {
                      type: 'text',               // [ default: image ]用 setOption 首次设定图形元素时必须指定。image, text, circle, sector, ring, polygon, polyline, rect, line, bezierCurve, arc, group,
                      top: 'center',              // 描述怎么根据父元素进行定位。top 和 bottom 只有一个可以生效。如果指定 top 或 bottom，则 shape 里的 y、cy 等定位属性不再生效。『父元素』是指：如果是顶层元素，父元素是 echarts 图表容器。如果是 group 的子元素，父元素就是 group 元素。
                      left: 'center',             // 同上
                      style: {
                          text: '共计',       // 文本块文字。可以使用 \n 来换行。[ default: '' ]
                          fill: '#999',           // 填充色。
                          fontSize: 16,           // 字体大小
                          fontWeight: 'bold'		// 文字字体的粗细，可选'normal'，'bold'，'bolder'，'lighter'
                      }
                  },
                  series: [

                      {
                          name: '访问来源',
                          type: 'pie',
                          radius: ['45%', '65%'],
                          labelLine: {
                              normal: {
                                  length: 0,
                                  length2: 20,
                                  lineStyle: {
                                      color: '#999999'
                                  }
                              }

                          },

                          label: {
                              normal: {
                                  // \n\n可让文字居于牵引线上方，很关键
                                  //  {b}  代表显示的内容标题
                                  // {c}代表数据
                                  formatter: '{c}\n{b|{b}}',
                                  borderWidth: 0,
                                  borderRadius: 4,

                                  rich: {
                                      a: {
                                          color: '#333',
                                          fontSize: 12,
                                          lineHeight: 20,
                                          left: 'center'
                                      },
                                      b: {
                                          fontSize: 12,
                                          lineHeight: 20,
                                          color: '#333',
                                          left: 'center'
                                      }
                                  }
                              }
                          },
                          data: [{
                              value: 8,
                              name: '保养任务'
                          }, {
                              value: 35,
                              name: '维修任务'
                          }]
                      }
                  ]
              },
              repairShow:false
          }
        },
        mounted(){
            this.drawLine()
        },
        methods: {
            drawLine(){
                let vm = this
                let mycharts = this.$echarts.init(document.getElementById('myChart'));
                mycharts.setOption(vm.options)

            },
            //我的报修
            routertosacn(num){
                if(num==0){


                    return
                }
                this.$router.push('/SelectDevice')
            },
            //班组任务
            teamRouterTo(num){
                let _path = '/'+ (num==1?'TMainTask':"TServiceTask")
                this.$router.push(_path)
            },
        //    我的任务
            mineRouterTo(num){
                let _path = '/'+ (num==1?'MainTask':"ServiceTask")
                this.$router.push(_path)
            }

        },
        components:{
          XHeader
        },

    }
</script>

<style scoped lang="scss">

.home{
    .banner{
        height: 0.4rem;
        background-color:  #2CC7C5;
        overflow-x: hidden;
    }
    .cardbox{
        width: 94%;
        margin: 0 auto;
        height: 2rem;
        margin-top: -0.3rem;
        margin-bottom: 0.7rem;
        .card{
            width:100%;
            background:rgba(255,255,255,1);
            box-shadow:0px 1px 6px 0px rgba(0, 0, 0, 0.08);
            border-radius:16px;
            margin-bottom: 0.1rem;
            padding:0 0.1rem;
            box-sizing: border-box;
            .title{
                height: 0.42rem;
                line-height: 0.42rem;
                font-size: 0.14rem;
                color: #333;
                border-bottom: 1px solid #E2E2E2;
            }
            .cardlist{
                display: flex;
                .carditem{
                    display: flex;
                    width: 50%;
                    margin: 0.2rem 0;
                    justify-content: center;
                    font-size: 0.12rem;
                    img{
                        width: 0.4rem;
                        height: 0.4rem;
                        vertical-align: middle;
                        padding-right: 0.16rem;
                    }
                    .rightitem{
                        p{
                            height: 0.2rem;
                            line-height: 0.2rem;
                        }
                    }
                }
            }

        }
    }
    .contentbox{
        text-align: left;
        background-color: #fff;
        padding:0 0.2rem;
        padding-bottom: 0.2rem;
        .caltotal{
            font-size: 0.16rem;
            font-weight: 500;
            color: #353535;
            height: 0.5rem;
            line-height: 0.5rem;
        }
        #myChart{
            width: calc(100% - 0.4rem);
            height: 2rem;
            margin: 0 auto;
            background-color: #F7F7F7;
        }
    }
    .mask{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.1);

        .content{
            background-color: #fff;
            padding:0 0.2rem;
            position: absolute;
            right: 0.1rem;
            top: 40px;
            p{
                height: 0.48rem;
                line-height: 0.48rem;
            }
            img{
                width: 0.2rem;
                height: 0.2rem;
                vertical-align: middle;
                padding-right: 0.12rem;
            }
            .up{
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
