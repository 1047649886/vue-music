<template>
	<yd-tabbar fixed style="height:1.2rem!important">
        <yd-tabbar-item title="发现音乐" link="/findMusic" >
            <yd-icon name="home" slot="icon" size=".5rem"></yd-icon>
        </yd-tabbar-item>
    </yd-tabbar>
</template>

<script>
export default{
	name:'myFooter'
}
</script>
<style scoped>
.yd-tabbar{
    height:1.5rem !important;
}
.tabbbar-top-line-color:after {
    border-color: green !important;
}
.router-link-active{
    color:rgb(9, 187, 7) !important;
}

</style>