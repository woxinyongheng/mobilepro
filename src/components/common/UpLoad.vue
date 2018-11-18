<template>
    <div class="upload">
        <div tabindex="0" class="el-upload el-upload--picture-card" @click="upClick">
            <img src="../../../static/image/addimg.png" alt="" class="addicon">
            <input @change="upImage" style="display: none"  type="file" name="file" class="el-upload__input">
        </div>
    </div>
</template>

<script>
    export default {
        name: "UpLoad",
        data:function () {
            return{
                photo:'',
                imgurl:'',
            }
        },
        methods:{
            upClick(){
                document.querySelector('[type="file"]').click();
            },
            upImage(e){
                var vm =this
                var _file = e.target.files[0];
                if(_file.type.indexOf('image')>-1){
                }else{
                    vm.$message({
                        message: '请选择正确的格式',
                        type: 'warning'
                    });
                    return
                }
                var form = new FormData(); // FormData 对象
                form.append("file", _file); // 文件对象
                vm.photo = _file
                var _reader = new FileReader();
                _reader.readAsDataURL(_file);
                _reader.onload = function(result){
                    var  data = ''
                    if (typeof result.target.result === 'object') {
                        data = window.URL.createObjectURL(new Blob([result.target.result]))
                    } else {
                        data = result.target.result
                    }
                    vm.imgurl = data
                    vm.$emit('uploadHandle',vm.photo,vm.imgurl)
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .upload{
        display: inline-block;
        .addicon{
            width: 0.8rem;


        }
    }
</style>