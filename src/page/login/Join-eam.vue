<template>
  	<div id="login-index" class="flex fd-co">
  		<div class="login-index-header flex al-ce">
  			<img :src="logo" alt=""><span>西牛云</span>
  		</div>
  		<router-view></router-view>
  		<!-- <div class="login-index-content-box">
  			<div class="login-index-content">
	  			<div class="login-index-content-header center">
			  		<p><img :src="logo" alt=""></p>
			  		<p>西牛云</p>
			  	</div>
	  			<router-view></router-view>
	  		</div>
  		</div> -->
  		
  	</div>
</template>

<script>
	export default {
	    data(){
			return {
				logo:require('@/assets/img/logo.png'),
			}
		},
		created(){
    		
    	},
	}
</script>

<style scoped>
	#login-index{
		width: 100vw;
		height:100vh;
		overflow: hidden;
	}
	.login-index-header{
		height: 45px;
		width: 100%;
		flex-shrink: 0;
		background: #fff;
		font-size: 16px;
	}
	.login-index-header img{
		width: 30px;
		margin: 0px 10px 0px 30px;
	}
	
</style>
