<template>
  	<div class="center">
  		<div class="marginB10">
  			<img :src="parameter" alt="" class="img">
  		</div>
  		<div class="marginB20">
  			<p class="marginB10">已选择升级包：</p>
  			<p class="">固件包创建：</p>
  		</div>
  		<div class="marginB20">
  			<button class="btnColor paddingLR20 paddingTB5 height30 marginR40">在线升级包</button><button class="btnColor paddingLR20 paddingTB5 height30">离线升级包</button>
  		</div>
  		<div>
  			<button class="btnF paddingLR20 paddingTB5 height28">升级帮助</button>
  		</div>
  	</div>
</template>

<script>
	export default {
	    data(){
			return {
				parameter:require('@/assets/img/parameter.png'),
			}
		},
		created(){
			
    	},
		computed: {
			
		},
		methods: {
			
		},
		watch: {
			
		},
		
	}
</script>

<style scoped>
	.img{
		width: 100px;height:100px;
	}
</style>
