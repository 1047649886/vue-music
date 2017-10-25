<template>
	<div>
		<nav>
			 <yd-flexbox>
		        <div class="slide">
			       	<router-link to="#" slot="left">
			       		<yd-icon name="ucenter" color="#fff" size=".8rem"></yd-icon>
			        </router-link>
		        </div>
		        <yd-flexbox-item>
		        	 <div class="mycenter" >
			        	 <yd-cell-item >
			            	<yd-input slot="left"  placeholder="搜索歌词、歌曲" v-model="search" @keyup.enter="test"></yd-input>
			        	</yd-cell-item>
		       		</div>
		        </yd-flexbox-item>
		        <div class="right">
		        	<router-link to="#" slot="right">
		       		<yd-icon name="more" color="#fff" size=".8rem"></yd-icon>
		       	 	</router-link>
		    	</div>
		    </yd-flexbox>
		</nav>
		<div style="height:1.5rem"></div>
		<div class="music" v-show="!search">
			<TopList></TopList>
		</div>
		<div v-show="search">
			<h3>hi</h3>
			<ul class="myUl" >
				<!-- <span>{{searchList}}</span> -->
			</ul>
		</div>
	</div>
</template>
<script>
import TopList from '@/components/TopList'
export default {
	name:'findMusic',
	components:{
		 TopList
	},
	data(){
		return {
			search:'',
			searchList:[],

		}
	},
	methods:{
		test(){
			console.log(1);
		}
	},
	watch:{
		// search:function(){
		// 	console.log(this.search);
		// 	axios.get('api/search/',{
		// 		params:{
		// 			keywords:this.search,
		// 			limit:10
		// 		}
		// 	})
		// 	.then(function(response){
		// 		self.searchList=response.data.result.songs;
		// 		console.log(self.searchList);
		// 		console.log(response);
		// 	})
		// 	.catch(function(e){
		// 		console.log(e);
		// 	})
		// },
		search(){
			let vm = this;
			vm.searchList =[
				{name:'1'},
				{name:'1'},
				{name:'1'}
			]
		}
	}
}

</script>

<style scoped>
nav{
	height: 1.5rem;
	width:100%;
	position: fixed;
	top:0;
	background:rgb(9, 187, 7);
	padding:.2rem .3rem;
	font-size:.4rem;
	border-radius: .1rem;
	z-index:999;
}
.mycenter{
	border:1px solid #fff;
	border-radius:.4rem;
	margin:0 .4rem;
	background:#fff;
}
.music{
	padding-bottom:1.5rem;
}
.myUl{
	margin-top:1.5rem;
	list-style-type: none;
	text-align: left;
	font-size:1rem;
}
</style>