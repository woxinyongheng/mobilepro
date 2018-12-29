<template>
    <div class="mindex">

        <div class="cardbox" @click="$router.push('/PlanTask')">
            <img src="../../../../static/image/plan.png" alt="">
            计划任务
            <span class="num">{{plannum}}</span>
            <img src="../../../../static/image/right.png" alt="" class="rightimg">

        </div>
        <div class="contentbox" @click="$router.push('/TMainTask')">
            <p class="caltotal">保养任务</p>
            <div id="myChart"></div>
        </div>
        <div class="contentbox" @click="$router.push('/TServiceTask')">
            <p class="caltotal">维修任务</p>
            <div id="myChart1"></div>
        </div>


    </div>
</template>

<script>
    export default {
        name: "mindex",
        data: function () {
            return {
                options: {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c} ({d}%)"
                    },
                    //环形颜色
                    color: ['#38C7C4', '#FCB635','#FA6872','#4F87FB'],
                    legend: {
                        left: 'center',
                        itemGap: 40
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
                                    formatter: '{c}\n{b|{d}%}',
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
                            data: []
                        }
                    ]
                },
                options1: {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c} ({d}%)"
                    },
                    //环形颜色
                    color: ['#38C7C4', '#FCB635','#FA6872','#4F87FB'],
                    legend: {
                        left: 'center',
                        itemGap: 5
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
                                    formatter: '{c}\n{b|{d}%}',
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
                            data: []
                        }
                    ]
                },
                myData: {},
                teamData: {},
                plannum:''
            }
        },
        mounted(){
            this.requestNum()
            this.requestChart()
        },
        methods: {
            //计划任务数量
            requestNum(){
              let vm =this
              vm.$http.post('appMyWork/getPlanTaskUnfinishedSum',{}).then(res=>{
                  if(res.code==200){
                      vm.plannum = res.data.count
                  }
              })
            },
            requestChart(){
                let vm =this

                vm.$http.post('appMyWork/getMaintenanceTask',{}).then(res=>{
                    if(res.code==200){
                        let obj = res.data.maintenance
                        let obj1 = res.data.clean
                let total = 0
                let total1 = 0
                        let arr = []
                        let arr1=[]
                        for (let i in  obj){
                            let _o={}
                            _o.name=i
                            _o.value=obj[i]
                                total+=obj[i]
                            arr.push(_o)
                        }
                        for (let i in  obj1){
                            let _o={}
                            _o.name=i
                            _o.value=obj1[i]
                            total1+=obj1[i]
                            arr1.push(_o)
                        }
                        vm.options.series[0].data=arr
                        vm.options1.series[0].data=arr1
                vm.options.graphic.style.text = '共计' + total
                vm.options1.graphic.style.text = '共计' + total1
                        let mycharts = this.$echarts.init(document.getElementById('myChart'));
                        let mycharts1 = this.$echarts.init(document.getElementById('myChart1'));

                        mycharts.setOption(vm.options)
                        mycharts1.setOption(vm.options1)


                    }
                })
            }





        },
    }
</script>

<style scoped lang="scss">
    .mindex{
        position: relative;
        top:-0.3rem;
        height: 120%;
        padding-bottom: 2rem;
        z-index: 100;
        .cardbox {
            position: relative;
            box-sizing: border-box;
            width: 94%;
            margin: 0 auto;
            height: 0.6rem;
            line-height: 0.6rem;
            background-color: #fff;
            border-radius: 5px;
            margin-bottom: 0.2rem;
            padding: 0 0.12rem;
            color: #333333;
            font-size: 0.15rem;
            font-weight: 600;
            img{
                width: 0.24rem;
                vertical-align: middle;
                padding-right: 0.15rem;
            }
            .rightimg{
                position: absolute;
                right: 0.12rem;
                width: 0.12rem;
                padding: 0;
                top: 30%;
            }
            .num{
                position: absolute;
                right: 0.4rem;
                color: #4F87FB;

            }


        }
        .contentbox {
            text-align: left;
            background-color: #fff;
            padding: 0 0.2rem;
            padding-bottom: 0.2rem;
            margin-bottom: 0.2rem;
            .caltotal {
                font-size: 0.16rem;
                font-weight: 500;
                color: #353535;
                height: 0.5rem;
                line-height: 0.5rem;
            }
            #myChart {
                width: calc(100% - 0.4rem);
                height: 2rem;
                margin: 0 auto;
                background-color: #F7F7F7;
            }
            #myChart1 {
                width: calc(100% - 0.4rem);
                height: 2rem;
                margin: 0 auto;
                background-color: #F7F7F7;
            }
        }

    }
</style>