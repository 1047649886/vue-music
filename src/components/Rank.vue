<template>
    <div class="box">
        <div  v-if="loadFinshed">
            <h3 class="mytitle">官方榜</h3>
            <div @click="Album(item.id)" v-for="(item,index) in myRankstorage" v-if="index<2">
            <yd-flexbox   class="click">
                <img :src="item.coverImgUrl"  alt="此处有图片" class="img">
                <yd-flexbox-item class="songsBox">
                    <p class="songs" v-for="( songs, index ) in item.tracks" v-if='index<4'>{{ index+1}}.{{songs.name }}--<span v-for="name in songs.artists">/{{name.name}}</span></p>
                </yd-flexbox-item>
            </yd-flexbox>
            </div>
            <h2 class="mytitle">全球榜</h2>
            <div  @click="Album(item.id)" v-for="(item,index) in myRankstorage" v-if="index>=2">
                <div class="mylist" >
                    <img :src="item.coverImgUrl" alt="此处有图片" class="img2">
                    <span>{{item.name}}</span>
                </div>
            </div>
        </div>

        <div v-show="!loadFinshed">
            首次加载数据，速度可能会慢一点，请等待
        </div>
    </div>
</template>

<script type="text/babel">
export default {
    name:'Rank',
    created(){
        this.myRankstorage = this.$store.state.Rankstorage;
        this.loadFinshed = true;
    },
    data(){
        return {
            myRankstorage:[],
            loadFinshed:false,
        }
    },
    methods:{
        Album(index){
            this.$router.push('/album/'+index);
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
        padding-bottom: 2rem;
}
.mytitle{
    height:.5rem;
    padding-top:.1rem;
    text-align:left;
    background:#f5f5f5;
    color:#888;
}
.click{
    width:100%;
    height:2.5rem;
    margin-bottom: .1rem;
}
.click:hover{
    background: #f8f8f8;
}
.img{
    height:100%;
    width:30%;
    margin-top:.1rem;
}
.img2{
    height:100%;
    width:100%;
    padding:.2rem .1rem 0 0;
}
.mylist{
    display: inline-block;
    height:3rem;
    width:33%;
    float:left;
    margin-bottom:.5rem;
    text-align: left;
}
.songsBox{
    text-align:left;
    padding-right:.1rem;
}
.songs{
    margin:.2rem 0 0 .2rem;
    width:100%;
    text-overflow:ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
</style>