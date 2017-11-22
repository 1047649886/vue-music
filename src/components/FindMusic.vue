<template>
	<div>
		<nav>
			 <yd-flexbox>
		        <div>
			       	<router-link to="#" slot="left" v-show="!search">
			       		<yd-icon name="ucenter" color="#fff" size='.6rem'></yd-icon>
			        </router-link>
			       	 <yd-button  type="primary" bgcolor="#fff" shape="circle" @click.native="cancle()" v-show="search">返回</yd-button>
		        </div>
		        <yd-flexbox-item>
		        	 <div class="mycenter" >
			        	 <yd-cell-item style="height:.6rem;" >
			        	 	<yd-input slot="left"  placeholder="搜索歌曲、专辑" v-model="search" ></yd-input >
			        	</yd-cell-item>
		       		</div>
		        </yd-flexbox-item>
		        <div>
		       	 	 <yd-button  type="primary" bgcolor="#fff" shape="circle" @click.native="searchMusic()">搜索</yd-button>
		    	</div>
		    </yd-flexbox>
		</nav>
		<div style="height:1rem"></div>
		<div class="music" v-show="!search">
			<TopList></TopList>
		</div>
		<div v-show="search">
			<!-- <h3>{{search}}</h3> -->
			<yd-tab>
			    <yd-tab-panel label="单曲" class="page" active>
			    	<div class="box">
			    		<div v-for="(item,index) in songs">
			            	<div @click="play(item)" class="myLink">
			            		<div class="left">
			            			<span>{{index+1}}</span>
			            		</div>
			            		<div class="right">
			            			<div class="icon">
			            				 <yd-icon name="play" size=".5rem" color="#FF685D" ></yd-icon>
			            			</div>
			            			<p>{{item.name}} </p>
			            			<p style="color:rgba(213, 106, 73, 0.96)">
			            				<small>{{item.artists[0].name}}--</small>
			            				<small>{{item.album.name}}</small>
			            			</p>
			            		</div>
			            	</div>
			            </div>
			    	</div>
			    </yd-tab-panel>
			    <yd-tab-panel label="歌单" class="page" >
			    	<div class="box">
			    		<div class="myItem" v-for="item in playlists" @click="Album(item.id)">
			    			<img :src="item.coverImgUrl" alt="图片" class="img">
			    			<div class="itemRight">
			    				<p class="title">{{item.name}}</p>
			    				<p class="des"><small><span class="highLight">{{item.trackCount}} </span>首音乐,by  <span class="highLight">{{item.creator.nickname}}</span>,播放 <span class="highLight">{{ item.playCount }}</span> 次</small></p>
			    			</div>
			    		</div>
			    	</div>
			    </yd-tab-panel>
			</yd-tab>
		</div>
	</div>
</template>
<script>
import TopList from '@/components/TopList';
export default {
	name:'findMusic',
	components:{
		TopList,
	},
	data(){
		return {
			search:'',
			songs:[],
			playlists:[],
		}
	},
	methods:{
		cancle(){
			this.search = '';
		},
		//查找歌曲
		searchMusic(){
			if(this.search=='')return;
			console.log(this.search);
			let vm = this;
			let url = ['/api/search?type=1&&keywords=','/api/search?type=1000&&keywords='];
			let request = url.map(function(item){ return axios.get(item+vm.search); });
			axios.all(request)
			.then(axios.spread(function(single,album){
					//console.log(single.data.result);
					//console.log(album.data.result);
					vm.songs = single.data.result.songs;
					vm.playlists = album.data.result.playlists;
			}))
			.catch(function(e){
			 console.log(e)
			})
		},
		//歌曲
		play(item){
			let url = '/music/'+item.id;
			this.$store.commit('setPlayMusic',item);
			this.$router.push(url);
		},
		//专辑
		Album(index){
            this.$router.push('/album/'+index);
        }
	}
}

</script>

<style scoped>
nav{
	height: 1rem;
	width:100%;
	position: fixed;
	top:0;
	background:rgb(9, 187, 7);
	padding:.15rem .2rem;
	font-size:.3rem;
	border-radius: .1rem;
	z-index:999;
}
.mycenter{
	border:1px solid #fff;
	border-radius:.4rem;
	margin:0 .2rem;
	background:#fff;
}
.page{
	height: 440px;
}
.box{
    position:relative;
    height:100%;
    width:100%;
    overflow-x: hidden;
    overflow-y:scroll;
    padding-bottom: 2rem;
}

.myLink{
	display: flex;
	height:1.1rem;
	width:100%;
	background: #fff;
	text-align: left;
}
.myLink:hover{
	background:#f8f8f8;
}
.left{
	padding-left:.2rem;
	padding-top:.3rem;
	width:.8rem;
	color:rgba(213, 106, 73, 0.7);
}
.right{
	flex:1;
	padding:.2rem 0;
	font-weight:bold;
	border-bottom:1px solid #ccc;
	font-size:.25rem;
}
.icon{
	float:right;
	margin:0 .2rem;
}
.myItem{
	width:100%;
	height:1.2rem;
	display:flex;
	text-align: left;
	margin-bottom:.1rem;
}
.myItem:hover{
	background:#f8f8f8;
}
.img{
	width:1rem;
	height:100%;
}
.itemRight{
	flex:1;
	padding:.2rem;
	border-bottom:1px solid #ccc;
}
.title{
	margin:.1rem 0;
	color:rgba(213, 106, 73, 0.7);
}
.des{

}
.highLight{
	color:rgba(213, 106, 73, 1);
}
</style>