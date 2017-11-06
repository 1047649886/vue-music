<template>
	<div>
		<div v-if="loadFinshed">
			<yd-navbar :title="mySongs.name" fixed>
		        <router-link to="/findMusic" slot="left">
		            <yd-navbar-back-icon></yd-navbar-back-icon>
		        </router-link>
	    	</yd-navbar>

	    	<div class="myBox">
	    		<div class="face">
	    			<img :src="mySongs.coverImgUrl" height="250px" width="100%">
	    			<div class="faceIcon" @click="message">
	    				<yd-icon name="question"></yd-icon>
	    			</div>
		    		<ul class="myUl">
	    				<li>
	    					<router-link :to="{path:'/comment/playlist/'+mySongs.commentThreadId.slice(7)}" v-if="mySongs.commentThreadId">
	    						<yd-icon name="feedback" size=".3rem"></yd-icon>
	    						评论
	    						 <p><yd-badge type="danger">{{mySongs.commentCount|Fixed}}</yd-badge></p>
	    					</router-link>
	    				</li>
	    				<li>
	    					<router-link to="#" >
	    						<yd-icon name="play" size=".3rem"></yd-icon>
	    						播放
	    						 <p class="font"><yd-badge type="danger">{{mySongs.playCount|Fixed}}</yd-badge></p>
	    					</router-link>
	    				</li>
	    				<li>
	    					<router-link to="#" >
	    						<yd-icon name="share2" size=".3rem"></yd-icon>
	    						分享
	    						 <p><yd-badge type="danger">{{mySongs.shareCount|Fixed}}</yd-badge></p>
	    					</router-link>
	    				</li>
	    				<li>
	    					<router-link to="#" >
	    						<yd-icon name="like-outline" size=".3rem"></yd-icon>
	    						收藏
	    						 <p><yd-badge type="danger" >{{mySongs.subscribedCount|Fixed}}</yd-badge></p>
	    					</router-link>
	    				</li>
	    			</ul>
	    		</div>
	    	 	<div v-for="(item,index) in mySongs.tracks">
	            	<div @click="play(item)" class="myLink">
	            		<div class="left">
	            			<span v-if="index<3" class="hot">0{{index+1}}</span>
	            			<span v-else-if="index<9">0{{index+1}}</span>
	            			<span v-else="index>=9">{{index+1}}</span>
	            		</div>
	            		<div class="right">
	            			<div class="icon">
	            				 <yd-icon name="play" size=".5rem" color="#FF685D" ></yd-icon>
	            			</div>
	            			<p>{{item.name}} </p>
	            			<p style="color:rgba(213, 106, 73, 0.96)">
	            				<small v-for="artist in item.artists">{{artist.name}}/</small>
	            				<small>{{item.name}}</small>
	            			</p>
	            		</div>
	            	</div>
	            </div>
	        </div>
	    </div>
	    <div v-show="!loadFinshed">
	    	首次加载数据，速度可能会慢一点，请等待
	    </div>
	</div>
</template>
<script>
export default{
	name:'Album',
	created(){
		let index = this.$route.params.index;
		let AllSongs = this.$store.state.AllSongs;
		let vm  = this;
		this.mySongs = AllSongs.get(index);
		if(this.mySongs&&this.mySongs.tracks){
			this.loadFinshed =true;
			console.log("客户端缓存了这个专辑信息！");
		}else{
			axios.get('/api/playlist/detail?id='+index).then(function(res){
				vm.mySongs = res.data.playlist;
				vm.$store.commit('setAllSongs',vm.mySongs);
				vm.loadFinshed = true;
			}).catch(function(e){
				console.log(e);
			})

		}
	},
	filters:{
		Fixed(value){
			//转化数字
			if(value>10000){
				return (parseInt(value)/10000).toFixed(1)+'万';
			}
			return value;
		}
	},
	data(){
		return{
			mySongs:[],
			loadFinshed:false,
		}
	},
	methods:{
		//专辑的一些信息
		message(){
			this.$dialog.notify({
                    mes: this.mySongs.description,
                    timeout: 2500,
            });
		},
		//播放歌曲
		play(item){
			let url = '/music/'+item.id;
			this.$store.commit('setPlayMusic',item);
			this.$router.push(url);
		}
	}
}
</script>
<style scoped>
.myBox{
	margin-top:1rem;
}
.faceIcon{
	position: absolute;
	top:1.5rem;
	right:.4rem;
	color:#fff;
}

/*歌曲布局*/
.myLink{
	display: flex;
	height:1.1rem;
	width:100%;
	background: #fff;
	text-align: left;
}

.left{
	padding-left:.2rem;
	padding-top:.3rem;
	width:.8rem;
	color:rgba(213, 106, 73, 0.7);
}
.hot{
	color:red;
}
.right{
	flex:1;
	padding:.2rem 0;
	font-weight:bold;
	border-bottom:1px solid #ccc;
	font-size:.25rem;
}
.myLink:hover{
	background:#f8f8f8;
}
.icon{
	float:right;
	margin:0 .2rem;
}
.myUl{
	position: absolute;
	top:4.5rem;
	left:0;
	list-style-type: none;
	display:inline-flex;
	color:#fff;
}
.myUl>li{
	border: 1px solid #fff;
	height:1rem;
	width:1.4rem;
	margin-left:.4rem;
	border-radius: .3rem;
	padding:.3rem 0;
	font-size:.3rem;
}
</style>