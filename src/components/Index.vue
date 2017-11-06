<template>
	<div>
		<keep-alive>
			<router-view v-if="$route.meta.keepAlive" />
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive" />
		<myFooter></myFooter>
	</div>
</template>


<script type="text/x-template">
import myFooter from '@/components/Footer'
export default {
	name:'Index',
	components: {
	    myFooter
  	}
}

</script>

<style scoped>

</style>
