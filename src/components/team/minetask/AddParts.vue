<template>
    <div class="addperts">
        <x-header  style="background-color:#2CC7C5;">添加配件</x-header>
        <div class="banner">
            <div class="searchbox">
                <img src="../../../../static/image/search.png" alt="">
                <input type="text" placeholder="请输入配件名称" v-model="partname">
                <span @click="search">搜索</span>
            </div>
        </div>
        <div class="content">
            <div v-for="(item,index) in onePart" class="list">
                <p class="title">
                    {{item.dictLabel}}
                    <img src="../../../../static/image/down.png" v-if="!item.show" alt="" class="down" @click="requestChild(item.dictCode,index)">
                    <img src="../../../../static/image/up.png" v-if="item.show"  alt="" class="down" @click="requestChild(item.dictCode,index)">
                </p>
                <div class="item" v-if="item.children && item.show">
                    <p v-for="i in item.children" :class="selectCode==i.dictCode?'itemi':''" @click="selecthandle(i)">{{i.dictLabel}}</p>
                </div>
            </div>
        </div>
        <div class="mask" v-if="showMask" @click="showMask=false">
            <div class="maskinfo" @click.stop="">
                <group>
                    <x-input title="配件名称"  text-align="right" v-model="selectName" disabled></x-input>
                    <x-number title="配件数量" align="right" v-model="numberValue" button-style="round" :min="1" :max="10000"></x-number>
                    <x-input title="配件金额" class="moneyinput"  text-align="right" v-model="moneyValue" placeholder="请输入金额" type="number"></x-input>
                </group>

                <div class="buttonbox">
                    <p @click="$router.back()">取消</p>
                    <p @click="srue">确定</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { XHeader,Radio, Group,XInput,XNumber} from 'vux'

    export default {
        name: "AddParts",
        data:function(){
          return{
              partname:'',
              onePart:[],
              selectCode:'',
              selectName:'',
              numberValue:1,
              moneyValue:0,
              showMask:false
          }
        },
        mounted(){
          this.requestList()
        },
        methods:{
            srue(){
                let vm =this
                let _val = document.querySelector('.moneyinput input').value*1
                if(!vm.moneyValue){
                    vm.moneyValue = _val
                }
                let obj ={}
                // if(!vm.moneyValue){
                //     vm.$vux.toast.show({
                //         text:'请输入金额',
                //         time:2000,
                //         type:'warn'
                //     })
                //     return
                // }
                let _data = JSON.parse(sessionStorage.getItem('weixiudata'))
                obj.dictLabel = vm.selectName
                obj.dictCode = vm.selectCode
                obj.num = vm.numberValue
                obj.money = vm.moneyValue
                _data.partArr.push(obj)
                _data.repairPay = _data.repairPay?(_data.repairPay*1+vm.moneyValue*1):vm.moneyValue*1
                sessionStorage.setItem('weixiudata',JSON.stringify(_data))
                vm.$router.back()
            },
            selecthandle(o){
                this.selectCode = o.dictCode
                this.selectName = o.dictLabel
                this.showMask = true
            },
            requestChild(code,index){
                let vm =this
                if(vm.onePart[index].children){
                    let obj = vm.onePart[index]
                    obj.show = !obj.show
                    vm.onePart.splice(index,1,obj)
                    return
                }
                vm.$http.post('appMyWork/getPartsData',{
                    dictCode:code
                }).then(res=>{
                    if(res.code==200){
                        let obj = vm.onePart[index]
                            obj.children = res.data
                        obj.show = true
                        vm.onePart.splice(index,1,obj)

                    }
                })
            },
            search(){

            },
            requestList(){
                let vm =this
                vm.$http.post('appMyWork/getPartsData',{
                    // dictCode:'1060449731521916928'
                }).then(res=>{
                    if(res.code==200){
                        let arr = res.data
                        arr.forEach(function (item) {
                            item.show = false
                        })
                        vm.onePart = res.data
                    }
                })
            }
        },
        components:{
            XHeader,Radio, Group,XInput,XNumber
        },
    }
</script>

<style scoped lang="scss">
.addperts{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
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
        color: #666;
        .list{
            background-color: #fff;
            padding: 0 0.2rem;
            padding-bottom: 0.1rem;
            border-bottom: 0.1rem solid #EFEFF4;
            .title {
                position: relative;
                height: 0.5rem;
                line-height: 0.5rem;
                color: #353535;
                font-weight: 500;
                font-size: 0.16rem;
                box-sizing: border-box;
                .down{
                    width: 0.16rem;
                    position: absolute;
                    right: 0.12rem;
                    top: 0.2rem;
                }
            }
            .title::before{
                content: '';
                position: absolute;
                width: 6px;
                height: 0.14rem;
                background-color: #38C7C4;
                top: 0.18rem;
                left: -0.1rem;
            }
            .item{
                p{
                    display: inline-block;
                    vertical-align: middle;
                    background:rgba(244,244,244,1);
                    border-radius:5px;
                    height: 0.36rem;
                    line-height: 0.36rem;
                    padding: 0 0.1rem;
                    margin: 0.1rem;
                }
                .itemi{
                    background:rgba(56,199,196,0.1);
                    color: #38C7C4;
                }
            }
        }
    }
    .mask{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background: rgba(0,0,0,0.4);
        .maskinfo{
            width: 100%;
            padding: 0.12rem 0;
            background-color: #fff;
            position: fixed;
            bottom: 0;
            left: 0;
            .buttonbox{
                padding: 0.12rem 0;
                display: flex;
                justify-content: space-around;
                align-items: center;
                p{
                    height:0.36rem;
                    line-height: 0.36rem;
                    text-align: center;
                    color: #ffffff;
                    background:rgba(56,199,196,1);
                    border-radius:5px;
                    width: 40%;
                }
            }
        }
    }

}
</style>