<template>
    <div class="none">
        <img src="../../../static/image/none.png" alt="">
        <p>暂无数据</p>
    </div>
</template>

<script>
    export default {
        name: "none"
    }
</script>

<style scoped lang="scss">
.none{
    width: 100%;
    height: 100%;
    text-align: center;
    color: #666666;
    font-size: 0.12rem;
    margin-top: 1.2rem;
    img{
        width: 1.4rem;
    }
    p{
        height: 0.4rem;
        line-height: 0.4rem;
    }
}
</style>