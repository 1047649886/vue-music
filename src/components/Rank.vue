<template>
    <div class="box">
        <h3 class="mytitle">官方榜</h3>
        <yd-flexbox v-for="n in 6">
            <img src="../../static/jpg/00.png"  alt="此处有图片" class="img">
            <yd-flexbox-item>
                <p v-for="n in 3">yd-flexbox-item</p>
            </yd-flexbox-item>
        </yd-flexbox>
        <h2 class="mytitle">全球榜</h2>
        <div class="mybox">
            <div class="mylist" v-for="n in 6">
                <img src="../../static/jpg/00.png" alt="此处有图片" class="img2">
                <span>msgsssssssssssssssssssssssssss</span>
            </div>
        </div>
    </div>

</template>

<script type="text/babel">
    export default {
        name:'Rank',
        data() {
            return {
                page: 1,
                pageSize: 10,
                list: [
                    {
                        img: "http://img1.shikee.com/try/2016/06/23/14381920926024616259.jpg",
                        title: "标题标题标题标题标题",
                        marketprice: 56.23,
                        productprice: 89.36
                    },
                    {
                        img: "http://img1.shikee.com/try/2016/06/21/10172020923917672923.jpg",
                        title: "骆驼男装2016夏装男士短袖T恤 圆领衣服 印花男装体恤 半袖打底衫",
                        marketprice: 56.23,
                        productprice: 89.36
                    },
                    {
                        img: "http://img1.shikee.com/try/2016/06/23/15395220917905380014.jpg",
                        title: "条纹短袖T恤男士韩版衣服大码潮流男装夏季圆领体恤2016新款半袖",
                        marketprice: 56.23,
                        productprice: 89.36
                    },
                    {
                        img: "http://img1.shikee.com/try/2016/06/25/14244120933639105658.jpg",
                        title: "夏季青少年衣服男生潮牌t恤 男士 夏秋学生 日系棉短袖半袖男小衫",
                        marketprice: 56.23,
                        productprice: 89.36
                    },
                    {
                        img: "http://img1.shikee.com/try/2016/06/26/12365720933909085511.jpg",
                        title: "2016夏装新款时尚潮流短袖T恤男纯棉V领日系青少年韩版夏季上衣服",
                        marketprice: 56.23,
                        productprice: 89.36
                    }
                ]
            }
        }
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