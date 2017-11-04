<template>

	<div class="box">
		<div v-if="loadFinshed">
			<img src="../../static/jpg/00.png" alt="" height="230px" width="100%">
			<yd-infinitescroll  :callback="loadList" ref="infinitescrollDemo">
				<yd-list theme="1" slot="list">
		        	<yd-list-item v-for="item in Songstorage" type="div">
		            	<img slot="img" :src="item.coverImgUrl" @click="test(item.id)">
		           		<span slot="title">{{item.name}}</span>
		        	</yd-list-item>
		    	</yd-list>
		    	<span slot="doneTip">不拉这么多资源啦</span>
		    </yd-infinitescroll >
		</div>
		<div v-show="!loadFinshed">
           	首次加载数据，速度可能会慢一点，请等待
        </div>
	</div>
</template>
<script type="text/babel">
export default{
	name:'Songs',
	created(){
		    this.Songstorage = this.$store.state.Songstorage;
			if(this.Songstorage.length<1){
			let vm = this;
			axios.get('/api/top/playlist/highquality?cat=轻音乐').then(function(res){
				let result = res.data.playlists;
				vm.$store.commit('setSongstorage',result);
				result.forEach(function(item){
					vm.$store.commit('setAllSongs',item);
				});
				vm.loadFinshed  = true;
			//	console.log(result);
			}).catch( function(e){
				console.log(e)
			});
		}
	},
	data(){
		return {
			Songstorage:[],
			loadFinshed:true
		}
	},
	methods:{
		loadList(){
			this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
			this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
		},
		test(id){
			this.$router.push('/album/'+id);
		}
	},
	watch:{
		// Songstorage:function(){
		// 	if(this.Songstorage.length>0){
		// 		this.loadFinshed = true;
		// 	}
		// }
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
.listbox{
	width:100%;
	display: flex;
}
.left{
	width:40%;
	height:3.5rem;
	border:1px solid #000;
	margin:0 .1rem;
}
.right{

}
.img{
	width:100%;
	height:3.2rem;
}
.title{
	text-align: left;
	font-size:.3rem;
}
</style>