<template>
  	<div class="ajax500 flex al-ce jc-ce">
  		<p class="width100 center"><img :src="no_505" alt=""><span>页面出错了！</span></p>
  	</div>
</template>

<script>
	export default {
	    data(){
			return {
				no_505:require('@/assets/img/404.png')
			}
		},
		mounted(){
			
		},
		computed: {
			
		},
		methods: {
			
		},
		watch: {
			
		},
		components: {
    	},
	}
</script>

<style scoped>
	.ajax500{
		width: 100%;
		height: 100vh;flex-wrap: wrap;
	}
	.ajax500 img{
		display: block;
		width:400px;
		margin: 0px auto 20px;
	}
</style>
