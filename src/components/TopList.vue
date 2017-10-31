<template>
  	<yd-tab>
	    <yd-tab-panel label="个性推荐" class="page" active><Recommend></Recommend></yd-tab-panel>
	    <yd-tab-panel label="歌单" class="page"><Songs></Songs></yd-tab-panel>
	    <yd-tab-panel label="主播电台" class="page"></yd-tab-panel>
	    <yd-tab-panel label="排行榜" class="page" ><Rank></Rank></yd-tab-panel>
	</yd-tab>
</template>
<script>
import Recommend from '@/components/Recommend'
import Songs from '@/components/Songs'
import Rank from '@/components/Rank'
export default{
	name:'TopList',
	components:{
		Recommend,
		Songs,
		Rank,
	},
	// created(){
	// 	axios.get('/api/top/list', {
	// 	    params: {
	// 	      idx: 0
	// 	    }
	// 	  })
	// 	  .then(function (response) {
	// 	  	let result  = response.data.result;
	// 	    console.log(result);
	// 	  })
	// 	  .catch(function (error) {
	// 	    console.log(error);
	// 	  });
	// },
	 methods: {
      	test() {
      	console.log(this.$store.state.list);
		//console.log(1);
		// axios.get('/api/top/list', {
		//     params: {
		//       idx: 0
		//     }
		//   })
		//   .then(function (response) {
		//   	let result  = response.data.result;
		//     console.log(result);
		//   })
		//   .catch(function (error) {
		//     console.log(error);
		//   });
		 }
    }
}
</script>
<style scoped>
.page{

	height: 440px;

}
</style>