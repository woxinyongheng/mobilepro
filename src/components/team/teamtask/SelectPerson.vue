<template>
    <div class="selectperson">
        <x-header  style="background-color:#2CC7C5;">选择人员</x-header>
        <!--<div class="banner">-->
            <!--<div class="searchbox">-->
                <!--<img src="../../../../static/image/search.png" alt="">-->
                <!--<input type="text" placeholder="请输入人员">-->
                <!--<span>搜索</span>-->
            <!--</div>-->
        <!--</div>-->
        <div class="content">
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
    import { XHeader,Radio, Group} from 'vux'

    export default {
        name: "SelectPerson",
        data:function(){
          return{
              radio001: [],
              selectId:''
          }
        },
        mounted(){
          this.requestPerson()
        },
        methods:{
            sureSubmit(){
                let vm =this
                if(!vm.selectId){
                    vm.$vux.toast.show({
                        text:'请选择指派人员',
                        time:2000
                    })
                    return
                }
                let _name = ''
                let _i = vm.radio001.findIndex(function (item) {
                    return item.key == vm.selectId
                })
                _name = vm.radio001[_i].value
                if(vm.$route.params.type=='weixiu'){

                    vm.$http.post('appMyWork/designateWorkOrderByStaffId',{
                        staffId:vm.selectId,
                        staffName:_name,
                        repairId:vm.$route.params.ids
                    }).then(res=>{
                        if(res.code==200){
                            vm.$vux.toast.show({
                                text:res.message,
                                time:2000
                            })
                            vm.$router.push('/TServiceTask')
                        }
                    })
                }else if(vm.$route.params.type=='baoyang'){
                    vm.$http.post('AppmaintainController/claimOrAssignMaintain',{
                        type:1,
                        id:vm.$route.params.ids,
                        implementPersonCode:vm.selectId,
                        implementPersonName: _name
                    }).then(res=>{
                        if(res.code==200){
                            vm.$vux.toast.show({
                                text:'指派成功',
                                time:2000
                            })
                            vm.$router.push('/TMainTask')
                        }
                    })
                }

            },
            change(e){
                this.selectId=e
            },
            requestPerson(){
                let vm =this
                vm.$http.post('appMyWork/getTeamMembers',{}).then(res=>{
                    if(res.code==200){

                        let arr = []
                        res.data.data.forEach(function (item) {
                            let _o ={}
                           for(let i in item){
                               _o.key = i
                               _o.value = item[i]

                           }
                           arr.push(_o)
                        })
                        vm.radio001 = arr
                    }
                })
            }
        },
        components:{
            XHeader,Radio, Group
        },
    }
</script>

<style scoped lang="scss">
.selectperson{
    .banner{
        background-color: #fff;
        padding: 0.1rem;
        .searchbox{
            background-color: #EFEFF4;
            height: 0.4rem;
            line-height: 0.4rem;
            padding: 0 0.2rem;
            position: relative;
            border-radius: 5px;
            img{
                width: 0.16rem;
                vertical-align: middle;
            }
            input{
                outline: 0;
                border: none;
                background-color: #EFEFF4;
                height: 0.4rem;
                width: 90%;
                font-size: 0.14rem;
                color: #B2B2B2;
            }
            span{
                position: absolute;
                right: 0.2rem;
                font-size: 0.14rem;
                padding-left: 0.1rem;
            }
            span::before{
                content: '';
                width: 1px;
                height: 0.2rem;
                background-color: #D3D3D5;
                position: absolute;
                top: 0.1rem;
                left: -0.1rem;
            }
        }
    }
    .content{
        margin-top: -0.77em;
        height: calc(100vh - 80px);
        overflow-y: scroll;
    }
    .buttonbox{
        background-color: #fff;
        height: 0.6rem;
        line-height: 0.6rem;
        position: fixed;
        bottom: 0;
        width: 100%;
        p{
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