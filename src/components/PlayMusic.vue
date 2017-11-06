<template>
	<div>
		<div v-if="loadFinshed">
			<yd-navbar :title="songs[0].title +'--'+songs[0].author" fixed fontsize=".3rem">
		       <span slot="left" @click="goBack">
		       	   <yd-navbar-back-icon></yd-navbar-back-icon>
		       </span>
	    	</yd-navbar>
	    	<div class="comment" @click="getComment">
	    		<yd-icon name="feedback"></yd-icon>
	    		 <yd-badge type="hollow"><span>评论</span></yd-badge>
	    	</div>
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
          	首次加载数据，速度可能会慢一点，请等待
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
		let AllSingle = this.$store.state.AllSingle;
		vm.songs[0].id = this.$route.params.id;

		if(AllSingle.has(vm.songs[0].id))
		{
			this.songs[0] = AllSingle.get(vm.songs[0].id);
			this.loadFinshed = true;
			console.log(this.songs[0]);
			console.log("客户端缓存了这首歌信息！");
			return;
		}

		let Playing = this.$store.state.PlayMusic;
		let author='';
		let artists = Playing.artists?Playing.artists:Playing.ar;
		artists.forEach( item => author=author+' '+item["name"]);
		let url=['/api/music/url?id=','/api/lyric?id='];
		let request = url.map( item =>{
			item+=vm.songs[0].id;
			return axios.get(item);
		});

		axios.all(request).then(axios.spread( function(music,lyric){

			let musics = music.data.data[0];
			let lyrics = lyric.data.lrc;

			// console.log(musics);
			vm.songs[0].title = Playing.name?Playing.name:Playing.al.name;
			vm.songs[0].pic = Playing.album?(Playing.album.picUrl?Playing.album.picUrl:Playing.album.artist.img1v1Url)
:(Playing.al.picUrl);
			vm.songs[0].author = author;
			vm.songs[0].url = musics.url;

			if(lyrics&&lyrics.lyric){
				vm.songs[0].lrc = lyrics.lyric;
			}else{
				vm.songs[0].lrc = '[00:00.00]暂无歌词\n';
			}
			console.log(vm.songs[0]);
			console.log(vm.$store.state.AllSingle);
			vm.$store.commit('setAllSingle',vm.songs[0]);
			vm.loadFinshed = true;

		})).catch( function(error ){
			console.log(error);
		})
	},
	data(){
		return {
			loadFinshed:false,
			changeLrc:false,
			control:false,
			lrc:'',
			lrcIndex:'',
			songs:[
				{
	              title: '',
	              author: '',
	              url: "",
	              pic: '',
	              lrc: '',
	              id:''
		        },
	        ]
		}
	},
	methods:{
		goBack(){
			this.$router.go(-1);
		},
		check(){
			let vm = this;
			this.changeLrc = !this.changeLrc;
			let aplayer = this.$refs.player.control;
			let content = aplayer.lrcContents;
			//隐藏歌词
			if(content&&this.changeLrc){
				content.style.display = 'none';
			}
			//显示歌词
			if(!this.changeLrc){
				content.style.display = 'block';
			}
			//填充歌词
			if(this.lrc=='') this.lrc = aplayer.lrc;
			//监听事件
			if(!this.control){
				this.control = true;
				let img =document.getElementsByClassName('face-img')[0];
				let last = 0;
				aplayer.on('playing',function(){
						let now =  aplayer.audio.currentTime%15;
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
		getComment(){
			this.$router.push('/comment/music/'+this.songs[0].id);
		}
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
.comment{
	position: absolute;
	width:1rem;
	height:1rem;
	top:1.5rem;
	right:.5rem;
/*	border: 1px solid green;*/
	color:#fff;
}
</style>