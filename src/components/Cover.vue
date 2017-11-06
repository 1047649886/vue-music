<template>
	<div style="height:100%">
		 <yd-slider autoplay="2000" style="height:100%" :show-pagination='false'>
	        <yd-slider-item style="height:100%">
	            <img src="../../static/img/Cover1.jpg" widtg="100%" height="100%">
	        </yd-slider-item>
	        <yd-slider-item style="height:100%">
	            <img src="../../static/img/Cover2.jpg" widtg="100%" height="100%">
	        </yd-slider-item>
	       	<yd-slider-item style="height:100%">
	            <img src="../../static/img/Cover3.jpg" widtg="100%" height="100%">
	        </yd-slider-item>
	    </yd-slider>
	    <div class="timeout">
	    	<p @click="jump">跳过</p>
	    	<yd-countdown :time="6" timetype="second" format="{%s2}秒" done-text="0秒" :callback="jump"></yd-countdown>
	    </div>
	</div>
</template>
<script>
	export default{
		name:'Cover',
		created(){
			//加载排行榜专辑
			let vm = this;
			let urls = [];
			for(let i=0;i<4;i++){
				urls[i] ='/api/top/list?idx='+i;
			}
			let requests = urls.map( url => axios.get(url));
			axios.all(requests).then(function(gets){
		    	let result = gets.map( (res) => res.data.result);
		    	vm.$store.commit('setRankstorage',result);
		    	result.forEach(function(item){
		    		vm.$store.commit('setAllSongs',item);
		    	});

		    }).catch(function(err){
		    	console.log(err);
		    })
		},
		methods:{
			jump(){
				this.$router.push('/findMusic');
			}
		}
	}
</script>
<style scoped>
.timeout{
	position: absolute;
	bottom:.4rem;
	right:.4rem;
	width:1rem;
	height: 1rem;
	border:1px solid red;
	border-radius:.5rem;
	z-index:999;
	font-size:.3rem;
	padding:.1rem 0;
	color:#fff;
	background:#f44009;
}
</style>