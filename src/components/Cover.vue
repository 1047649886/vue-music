<template>
	<div style="height:100%">
		 <yd-slider autoplay="2000" style="height:100%" :show-pagination='false'>
	        <yd-slider-item style="height:100%">
	            <img src="../../static/jpg/Cover1.jpg" widtg="100%" height="100%">
	        </yd-slider-item>
	        <yd-slider-item style="height:100%">
	            <img src="../../static/jpg/Cover2.jpg" widtg="100%" height="100%">
	        </yd-slider-item>
	        <yd-slider-item style="height:100%">
	            <img src="../../static/jpg/00.png" widtg="100%" height="100%">
	        </yd-slider-item>
	    </yd-slider>
	    <div class="timeout">
	    	<yd-countdown :time="4" timetype="second" format="{%s2}秒" done-text="0秒" :callback="jump"></yd-countdown>
	    </div>
	     
	</div>
</template>
<script>
	export default{
		name:'Cover',
		created(){
			let vm = this;
			let urls = [];
			for(let i=0;i<1;i++){
				urls[i] ='/api/top/list?idx='+i;
			}
			let requests = urls.map( url => axios.get(url));
			axios.all(requests).then(function(gets){
		    	let result = gets.map( (res) => res.data.result);
		    	vm.$store.commit('setRankstorage',result);
		    	result.forEach(function(item){
		    		// console.log(item);
		    		vm.$store.commit('setAllSongs',item);
		    	});
		    	//console.log(this.$store.state.AllSongs);

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
	padding:.3rem 0;
	color:#fff;
	background:#f44009;
}
</style>