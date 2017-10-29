<template>
	<div>
		<div v-show="loadFinshed">
			<yd-navbar title="dd" fixed >
		       <span slot="left" @click="goBack">
		       	   <yd-navbar-back-icon></yd-navbar-back-icon>
		       </span>
	    	</yd-navbar>
	    	<div class="lrc">
	    		{{songs[0].lrc}}
	    	</div>
	    	<div class="player" v-if="loadFinshed">
		    	<a-player autoplay :music="songs" ref="player" :showlrc="showlrc" :mutex="true">
				</a-player>
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
		console.log(author);

		let url=['/api/music/url?id=','/api/lyric?id='];
		let request = url.map( item =>{
			item+=vm.id;
			return axios.get(item);
		});

		axios.all(request)
		.then( axios.spread( (music,lyric) =>{

			let musics = music.data.data[0];
			let lyrics = lyric.data.lrc;

			console.log(musics);
			console.log(lyrics);
			console.log(Playing);

			vm.songs[0].title = Playing.name;
			vm.songs[0].author = author;
			vm.songs[0].url = musics.url;
			vm.songs[0].pic = Playing.album.picUrl;
			vm.songs[0].lrc = lyrics.lyric;

			vm.loadFinshed = true;
			//console.log(vm.songs[0].lrc);
			console.log(vm.songs[0]);
		}))
		.catch( error => console.log(error) )


	},
	mounted() {
        // let aplayer = this.$refs.player.control;
        // aplayer.play();
    },
	data(){
		return {
			id:'',
			loadFinshed:false,
			showlrc:1,
			songs:[
				{
	              title: '',
	              author: '',
	              url: "",
	              pic: '',
	              lrc: ''
		        }
	        ]
		}
	},
	methods:{
		goBack(){
			this.$router.go(-1);
		}
	}
}
</script>

<style scoped>
.lrc{
	margin-top:1rem;
}
.player{
	position: absolute;
	bottom:1rem;
	width:100%;
}
</style>