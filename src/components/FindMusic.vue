<template>
	<div>
		<nav>
			 <yd-flexbox>
		        <div class="slide">
			       	<router-link to="#" slot="left">
			       		<yd-icon name="ucenter" color="#fff" size='.7rem'></yd-icon>
			        </router-link>
		        </div>
		        <yd-flexbox-item>
		        	 <div class="mycenter" >
			        	 <yd-cell-item style="height:.6rem"> 
			            	<yd-input slot="left"  placeholder="搜索歌词、歌曲" v-model="search" ></yd-input>
			            	<!--  <yd-button size="small" slot="right" style="padding:0!important">搜索</yd-button> -->
			        	</yd-cell-item>
		       		</div>
		        </yd-flexbox-item>
		        <div class="right">
		        	<router-link to="#" slot="right">
		       		<yd-icon name="more" color="#fff" size='.7rem'></yd-icon>
		       	 	</router-link>
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
			    <yd-tab-panel label="单曲" class="page" active></yd-tab-panel>
			    <yd-tab-panel label="歌单" class="page"></yd-tab-panel>
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
	height: 1rem;
	width:100%;
	position: fixed;
	top:0;
	background:rgb(9, 187, 7);
	padding:.05rem .2rem;
	font-size:.4rem;
	border-radius: .1rem;
	z-index:999;
}
.mycenter{
	border:1px solid #fff;
	border-radius:.4rem;
	margin:0 .3rem;
	background:#fff;
}

.music{
	padding-bottom:1.3rem;
}
.myUl{
	margin-top:1.5rem;
	list-style-type: none;
	text-align: left;
	font-size:1rem;
}
</style>