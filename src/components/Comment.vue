<template>
	<div>
		<yd-navbar :title="'评论('+comment.total+')'" fixed v-show="loadFinshed" fontsize=".3rem">
	       <span slot="left" @click="goBack">
	       	   <yd-navbar-back-icon></yd-navbar-back-icon>
	       </span>
    	</yd-navbar>

    	<div class="comment" v-show="loadFinshed">
    		<div v-if="hotComments.length>0">
	    		<h3 class="title">热门评论</h3>
	    		<div class="box" v-for="item in hotComments" slot="list">
			    		<div class="left">
		            			<img :src="item.user.avatarUrl" alt="此处有图" class="img">
		            	</div>
		    			<div class="right">
		    				<p class="nickName">{{ item.user.nickname}}
		    					<span class="like">
		    						{{ item.likedCount|Fixed }} <yd-icon name="good" size=".3rem"></yd-icon>
		    					</span>
		    				</p>
		    				<p class="time">{{item.time|parseTime}}
		    				<p>{{item.content|emoji}}</p>
		    			</div>
			    </div>
		     </div>
    		<h3 class="title">最新评论({{comment.total}})</h3>
    		<yd-infinitescroll  :callback="loadList" ref="infinitescrollDemo">
		    	<div class="box" v-for="item in comments" slot="list">
		    		<div class="left">
	            			<img :src="item.user.avatarUrl" alt="此处有图" class="img">
	            	</div>
	    			<div class="right">
	    				<p class="nickName">{{ item.user.nickname}}
	    					<span class="like">
	    						{{ item.likedCount|Fixed }} <yd-icon name="good" size=".3rem"></yd-icon>
	    					</span>
	    				</p>
	    				<p class="time">{{item.time|parseTime}}
	    				<p>{{item.content|emoji}}</p>
	    			</div>
		    	</div>
<!--         	<img slot="loadingTip" src="../../static/source/loading.svg"/> -->
	    	</yd-infinitescroll>
    	</div>
    	<div v-show="!loadFinshed">
            数据正在加载中……
        </div>
	</div>
</template>

<script>
export default{
	name:'Comment',
	created(){
		let vm = this;
		vm.id = this.$route.params.id;
		vm.kind = this.$route.params.kind;
		axios.get('/api/comment/'+vm.kind+'?id='+this.id+'&limit=10').then( (res) =>{
			console.log(res.data);
			vm.comment = res.data;
			vm.hotComments = res.data.hotComments;
			vm.comments = res.data.comments;
			// console.log(res.data);
			// console.log(vm.hotComments);
			// console.log(vm.comments);
		}).catch( (error) =>console.log(error) )
		console.log(this.id);
	},
	data(){
		return{
			id:'',
			kind:'',
			comment:[],
			hotComments:[],
			comments:[],
			loadFinshed:false
		}
	},
	filters:{
		parseTime(value){
			let date =new Date(value);
			let year = date.getFullYear();
			let month = date.getMonth();
			let day =date.getDay();
			let hour = date.getHours();
			let minute = date.getMinutes();

			let myDate =new Date();
			if(year == myDate.getFullYear() &&month == myDate.getMonth()){
				//一天内
				if(day == myDate.getDay()){
					//1小时内
					if(hour == myDate.getHours()){
						return myDate.getMinutes()-minute+'分钟前';
					}
					if(hour<10) hour = '0'+hour;
					if(minute<10) minute = '0'+minute;
					return hour+':'+minute;
				}
				//昨天
				if(day == myDate.getDay()-1){
					if(hour<10) hour = '0'+hour;
					if(minute<10) minute = '0'+minute;
					return '昨天 '+hour+':'+minute;
				}
			}
			//其他时间
			if(month<10)month='0'+month;
			if(day<10)day='0'+day;
			return year+'年'+month+'月'+day+'日';
		},
		emoji(value){
			// return value.replace(/^\[流泪\]$/g,'.');
			return value;
		},
		Fixed(value){
			if(value>10000){
				return (parseInt(value)/10000).toFixed(1)+'万';
			}
			return value;
		}
	},
	watch:{
		comments:function(){
			if(this.comments.length>0){
				this.loadFinshed = true;
			}
		}
	},
	methods:{
		goBack(){
			this.$router.go(-1);
		},
		loadList(){
			let vm = this;
			this.id = this.$route.params.id;
			axios.get('/api/comment/'+this.kind+'?id='+this.id+'&offset=10').then(function(res){
				res.data.comments.forEach(function(item){
					vm.comments.push(item);
					return;
				});
			}).catch(function(e){
				console.log(e);
			} )
			this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
			//this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
		}
	}
}
</script>
<style scoped>
.comment{
	margin-top:1rem;
	text-align: left;
	padding:.1rem;
}
.box{
	display: flex;
	padding-top:.1rem;
}
.left{
	width:50px;
}
.img{
	width:40px;
	height:40px;
	border: 1px solid #fff;
	border-radius:20px;
}
.right{
	padding-bottom:.1rem;
	border-bottom:1px solid #ccc;
	flex:1;
}
.nickName{
	color:#9b8a8a;
	width:100%;
	font-size:.25rem;
}
.time{
	font-size:.2rem;
	margin-bottom: .4rem;
}
.like{
	float:right;
}

.title{
	border-bottom: 1px solid #ccc;
	padding:.1rem;
}
</style>