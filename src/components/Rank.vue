<template>
    <div class="box">
        <h3 class="mytitle">官方榜</h3>
        <yd-flexbox>
            <img src="../../static/jpg/00.png"  alt="此处有图片" class="img">
            <yd-flexbox-item>
                <p v-for="n in 3">yd-flexbox-item</p>
            </yd-flexbox-item>
        </yd-flexbox>
        <yd-flexbox>
            <img src="../../static/jpg/00.png"  alt="此处有图片" class="img">
            <yd-flexbox-item>
                <p v-for="n in 3">yd-flexbox-item</p>
            </yd-flexbox-item>
        </yd-flexbox>
        <yd-flexbox>
            <img src="../../static/jpg/00.png"  alt="此处有图片" class="img">
            <yd-flexbox-item>
                <p v-for="n in 3">yd-flexbox-item</p>
            </yd-flexbox-item>
        </yd-flexbox>
        <yd-flexbox>
            <img src="../../static/jpg/00.png"  alt="此处有图片" class="img">
            <yd-flexbox-item>
                <p v-for="n in 3">yd-flexbox-item</p>
            </yd-flexbox-item>
        </yd-flexbox>
        <h2 class="mytitle">全球榜</h2>
        <div class="mybox">
            <div class="mylist" >
                <img src="../../static/jpg/00.png" alt="此处有图片" class="img2">
                <span>msgsssssssssssssssssssssssssss</span>
            </div>
              <div class="mylist" >
                <img src="../../static/jpg/00.png" alt="此处有图片" class="img2">
                <span>msgsssssssssssssssssssssssssss</span>
            </div>
              <div class="mylist" >
                <img src="../../static/jpg/00.png" alt="此处有图片" class="img2">
                <span>msgsssssssssssssssssssssssssss</span>
            </div>
              <div class="mylist" >
                <img src="../../static/jpg/00.png" alt="此处有图片" class="img2">
                <span>msgsssssssssssssssssssssssssss</span>
            </div>
        </div>
    </div>

</template>

<script type="text/babel">
export default {
    name:'Rank',
}
</script>
<style scoped>
.box{
        position:relative;
        height:100%;
        width:100%;
        overflow-x: hidden;
        overflow-y:scroll;
}
.mytitle{
    height:.8rem;
    padding:.4rem 0 0 .2rem;
    text-align:left;
    background:#f5f5f5;
    color:#888;
}
.img{
    height:20%;
    width:30%;
    margin-top:.1rem;
}
.img2{
    height:100%;
    width:100%;
    padding:2px;
}
.mylist{
    display: inline-block;
    height: 4rem;
    width:33%;
    float:left;
    margin-bottom:.5rem;
    text-align: left;
}
</style>