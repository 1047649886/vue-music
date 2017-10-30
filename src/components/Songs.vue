<template>

	<div class="box">
		<div v-if="loadFinshed">
			<img src="../../static/jpg/00.png" alt="" height="300px" width="100%">
			<yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
				<yd-list theme="1">
		        	<yd-list-item v-for="item in Songstorage" class="myBox">
		            	<img slot="img" :src="item.coverImgUrl">
		           		<span slot="title">{{item.name}}</span>
		        	</yd-list-item>
		    	</yd-list>
		    </yd-pullrefresh>
		</div>
		<div v-show="!loadFinshed">
            数据正在加载中……
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
			axios.get('/api/top/playlist/highquality?limit=10')
			.then( (res) => {
				let result = res.data.playlists;
				vm.$store.commit('setSongstorage',result);
				this.loadFinshed  = true;
				console.log(result)
			})
			.catch( e => console.log(e));
		}
	},
	data(){
		return {
			Songstorage:[],
			loadFinshed:false
		}
	},
	methods:{
		loadList(){
			console.log(1);
		}
	},
	watch:{
		Songstorage:function(){
			if(this.Songstorage.length>0){
				this.loadFinshed = true;
			}
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
.myBox{

}
</style>