<template>
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
		            	<yd-input slot="left"   placeholder="搜索歌词、歌曲" ></yd-input>
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
</template>
<script type="text/x-template">
export default {
	name:'myHeader'
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

}
.mycenter{
	border:1px solid #fff;
	border-radius:.4rem;
	margin:0 .4rem;
	background:#fff;
}

</style>