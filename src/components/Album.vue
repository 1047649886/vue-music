<template>
	<div>
		<yd-navbar :title="mySongs.name" fixed>
	        <router-link to="/findMusic" slot="left">
	            <yd-navbar-back-icon></yd-navbar-back-icon>
	        </router-link>
    	</yd-navbar>
    	<div class="myBox">
    		<div class="face">
    			<img :src="mySongs.coverImgUrl" height="450px" width="100%">
    			<div class="faceIcon" @click="message">
    				<yd-icon name="question"></yd-icon>
    			</div>
	    		<ul class="myUl">
    				<li>
    					<router-link :to="{path:'/comment/playlist/'+mySongs.commentThreadId.slice(7)}" >
    						<yd-icon name="feedback" size=".6rem"></yd-icon>
    						评论
    						 <p><yd-badge type="danger">{{mySongs.commentCount|Fixed}}</yd-badge></p>
    					</router-link>
    				</li>
    				<li>
    					<router-link to="/#" >
    						<yd-icon name="play" size=".6rem"></yd-icon>
    						播放
    						 <p class="font"><yd-badge type="danger">{{mySongs.playCount|Fixed}}</yd-badge></p>
    					</router-link>
    				</li>
    				<li>
    					<router-link to="/#" >
    						<yd-icon name="share2" size=".6rem"></yd-icon>
    						分享
    						 <p><yd-badge type="danger">{{mySongs.shareCount|Fixed}}</yd-badge></p>
    					</router-link>
    				</li>
    				<li>
    					<router-link to="/#" >
    						<yd-icon name="like-outline" size=".6rem"></yd-icon>
    						收藏
    						 <p><yd-badge type="danger" >{{mySongs.subscribedCount|Fixed}}</yd-badge></p>
    					</router-link>
    				</li>
    			</ul>
    		</div>
    	 	<div v-for="(item,index) in mySongs.tracks">
            	<div @click="play(item,index)" class="myLink">
            		<div class="left">
            			<span v-if="index<3" class="hot">0{{index+1}}</span>
            			<span v-else-if="index<9">0{{index+1}}</span>
            			<span v-else="index>=9">{{index+1}}</span>
            		</div>
            		<div class="right">
            			<div class="icon">
            				 <yd-icon name="play" size=".8rem" color="#FF685D" ></yd-icon>
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
</template>
<script>
export default{
	name:'Album',
	created(){
		let index = this.$route.params.index;
		console.log(this.$route.params.index);
		this.mySongs = this.$store.state.Rankstorage[index];
		console.log(this.mySongs);
	},
	filters:{
		Fixed(value){
			//console.log(parseInt(val,10));
			if(value>10000){
				return (parseInt(value)/10000).toFixed(1)+'万';
			}
			return value;
		}
	},
	data(){
		return{
			mySongs:[],
		}
	},
	methods:{
		message(){
			this.$dialog.notify({
                    mes: this.mySongs.description,
                    timeout: 2500,
            });
		},
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
	right:1rem;
	color:#fff;
}

/*歌曲布局*/
.myLink{
	display: flex;
	height:1.6rem;
	width:100%;
	background: #fff;
	text-align: left;
}

.left{
	padding-left:.2rem;
	padding-top:.5rem;
	width:1rem;
	color:rgba(213, 106, 73, 0.7);
}
.hot{
	color:red;
}
.right{
	flex:1;
	padding:.3rem 0;
	font-weight:bold;
	border-bottom:1px solid #ccc;
}
.myLink:hover{
	background:#f8f8f8;
}
.icon{
	float:right;
	margin:0 1rem;
}
.myUl{
	position: absolute;
	top:7rem;
	left:0;
	list-style-type: none;
	display:inline-flex;
	color:#fff;
}
.myUl>li{

	border: 1px solid #fff;
	height:1.5rem;
	width:2.6rem;
	margin-left:.7rem;
	border-radius: .3rem;
	padding:.4rem 0;
	font-size:.4rem;
}
</style>