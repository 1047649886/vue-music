<template>
  	<yd-tab>
	    <yd-tab-panel label="歌单" class="page"><Songs></Songs></yd-tab-panel>
	    <yd-tab-panel label="排行榜" class="page" ><Rank></Rank></yd-tab-panel>
	</yd-tab>
</template>
<script>
import Songs from '@/components/Songs'
import Rank from '@/components/Rank'
export default{
	name:'TopList',
	components:{
		Songs,
		Rank,
	}
}
</script>
<style scoped>
.page{

	height: 440px;

}
</style>