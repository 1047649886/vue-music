<template>
	<div>
		<div v-show="loadFinshed">
			<yd-navbar :title="songs[0].title +'--'+songs[0].author" fixed fontsize=".3rem">
		       <span slot="left" @click="goBack">
		       	   <yd-navbar-back-icon></yd-navbar-back-icon>
		       </span>
	    	</yd-navbar>
	    <div @click="check" class="box" v-show="changeLrc">
			<p v-for="(item,index) in lrc" class="lrc" >
				<span v-if="index==lrcIndex" class='nowPlay'>{{item[1]}}</span>
				<span v-else v-show="index>lrcIndex-7">{{item[1]}}</span>
			</p>
		</div>
		<div @click="check" class="box" v-show="!changeLrc">
			<img :src="songs[0].pic" alt="此处有图" class="face-img">
		</div>
    	<div class="player" v-if="loadFinshed">
	    	<a-player  :music="songs" ref="player" :mutex=" true"  :showlrc="1">
			</a-player id="aplayer">
		</div>
		</div>
        <div v-show="!loadFinshed">
            数据正在加载中……
        </div>
	</div>
</template>
<script >
import VueAplayer from 'vue-aplayer';
export default{
	name:'playMusic',
	components: {'a-player': VueAplayer},
	created(){
		let vm  = this;
		vm.id = this.$route.params.id;
		let Playing = this.$store.state.PlayMusic;
		let author='';
		Playing.artists.forEach( item => author=author+' '+item["name"]); 

		let url=['/api/music/url?id=','/api/lyric?id='];
		let request = url.map( item =>{
			item+=vm.id;
			return axios.get(item);
		});

		axios.all(request).then(axios.spread( function(music,lyric){

			let musics = music.data.data[0];
			let lyrics = lyric.data.lrc;
			vm.songs[0].title = Playing.name;
			vm.songs[0].author = author;
			vm.songs[0].url = musics.url;
			vm.songs[0].pic = Playing.album.picUrl;
			vm.songs[0].lrc = lyrics.lyric;
			vm.loadFinshed = true;
		})).catch( function(error ){
			console.log(error);
		})
	},
	mounted() {

    },
	data(){
		return {
			id:'',
			loadFinshed:false,
			changeLrc:false,
			lrc:'',
			lrcIndex:'',
			songs:[
				{
	              title: '',
	              author: '',
	              url: "",
	              pic: '',
	              lrc: ''
		        },
	        ]
		}
	},
	methods:{
		goBack(){
			this.$router.go(-1);
		},
		check(){
			let aplayer = this.$refs.player.control;
			let content = aplayer.lrcContents;
			content.style.display = 'none';
			this.lrc = aplayer.lrc;
			this.changeLrc = !this.changeLrc;
			let vm = this;
			let img =document.getElementsByClassName('face-img')[0];
			let audio = aplayer.audio;
			let last = 0;
			if(this.changeLrc){
				aplayer.on('playing',function(){
					let now =  audio.currentTime%15;
					let deg =  Math.floor(now/15*360);
					if(Math.abs(deg-last)>=30){
						deg = last + 24;
						img.style.transform ='rotate('+deg+'deg)';
						img.style.transition = 'all 1s linear';
						if(deg<24)deg=360;
						last = deg%360;
					}
					if(vm.lrcIndex != aplayer.lrcIndex){
						vm.lrcIndex = aplayer.lrcIndex;
					}
				})
			}
		},
	},
}
</script>

<style scoped>
.box{
	margin-top:1rem;
	width:100%;
	height:9.8rem;
	background:#3b3b3b;
	overflow: hidden;
	margin:0 .01rem;
	padding:.2rem;
	font-size:.3rem;
}
.lrc{
	margin-top:.3rem;
	color:#9c9c9c;
}
.nowPlay{
	color:#fff;
}
.face-img{
	position:absolute;
	top:3rem;
	left:1.2rem;
	height:5rem;
	width:5rem;
	border: 1px solid #fff;
	border-radius: 2.5rem;
}
.player{
	position: absolute;
	bottom:0;
	width:100%;
}
</style>