<template>
    <div class="payment">
        <x-header style="background-color:#2CC7C5;">挂单原因</x-header>
        <div class="content">
            <p class="title">挂单说明</p>
            <group>
                <x-textarea :max="120" placeholder="请输入您的挂单说明,最多120字" v-model="otherExplain"></x-textarea>
            </group>
            <hr class="hr">
            <p class="title">挂单原因</p>
            <group>
                <radio :options="radio001" @on-change="change">
                    <template slot-scope="props" slot="each-item"><!-- use scope="props" when vue < 2.5.0 -->
                        <p>
                            {{ props.label }}
                        </p>
                    </template>
                </radio>
            </group>
        </div>
        <div class="buttonbox">
            <p @click="sureSubmit">确定</p>
        </div>
    </div>
</template>

<script>
    import {XHeader, Radio, Group,XTextarea} from 'vux'

    export default {
        name: "PayMent",
        data:function(){
          return{
              radio001:[],
              paymentCause:'',
              otherExplain:''
          }
        },
        mounted(){
          this.requestList()
        },
        methods:{
            change(e){
                debugger
                this.paymentCause =e
            },
            sureSubmit(){
                let vm =this
                if(!vm.paymentCause){
                    vm.$vux.toast.show({
                        text:'请选择挂单原因',
                        time:2000,
                        type:'warn'
                    })
                    return
                }
                debugger
                if(vm.$route.params.type=='weixiu'){
                    vm.$http.post('appMyWork/marketOrderByRepairId',{
                        paymentCause:vm.paymentCause,
                        otherExplain:vm.otherExplain,
                        repairId:vm.$route.params.id,
                    }).then(res=>{
                        if(res.code==200){
                            vm.$vux.toast.show({
                                text:res.message,
                                time:2000,
                            })
                            vm.$router.push('/ServiceTask')
                        }
                    })
                }else if(vm.$route.params.type=='baoyang'){
                    vm.$http.post('AppmaintainController/paymentMaintain',{
                        id:vm.$route.params.id,
                        paymentCause:vm.paymentCause,
                        otherExplain:vm.otherExplain,
                    }).then(res=>{
                        if(res.code==200){
                            vm.$vux.toast.show({
                                text:res.message,
                                time:2000,
                            })
                            vm.$router.push('/MainTask')
                        }
                    })
                }
            },
            requestList(){
                let vm =this
                vm.$http.post('maintainPlan/getDictValue',{
                    mark:6,
                    dictType:'hang_reason'
                }).then(res=>{
                    if(res.code==200){
                        let arr=[]
                        res.data.forEach(function (item) {
                            let obj={}
                            obj.key = item.dictLabel
                            obj.value = item.dictLabel
                            arr.push(obj)
                        })
                        vm.radio001 = arr
                    }
                })
            }
        },
        components: {
            XHeader, Radio, Group,XTextarea
        },
    }
</script>

<style scoped lang="scss">
    .payment {

        .content {
            height: calc(100vh - 0.5rem);
            background-color: #fff;
            overflow-y: scroll;
            .title{
                position: relative;
                height: 0.39rem;
                line-height: 0.39rem;
                color: #353535;
                font-weight: 500;
                margin-left: 0.14rem;
                font-size: 0.16rem;
                box-sizing: border-box;
                padding-top: 0.1rem;
            }
            .hr{
                border-top:0.1rem solid #EFEFF4;

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
                top: 0.22rem;
            }
        }
        .buttonbox {
            background-color: #fff;
            height: 0.6rem;
            line-height: 0.6rem;
            position: fixed;
            bottom: 0;
            width: 100%;
            p {
                color: #ffffff;
                height: 0.44rem;
                line-height: 0.44rem;
                background-color: #38C7C4;
                border-radius: 4px;
                display: inline-block;
                width: 90%;
                margin-left: 5%;
                text-align: center;
            }
        }
    }
</style>