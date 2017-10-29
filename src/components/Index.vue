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
// 遇到的坑：- Component template should contain exactly one root element. If you are using v-if on multiple elements, use v-else-if to chain them instead.
// 解决：外面嵌套一个div

export default {
	name:'Index',
	components: {
	    myFooter
  	}
}

</script>

<style scoped>

</style>
