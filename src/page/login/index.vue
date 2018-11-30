<template>
  	<div id="login-index" class="flex fd-co">
  		<div class="login-index-header flex al-ce jc-sb">
  			<router-link to='/developerIndex'><img :src="logo" alt=""></router-link>
  			<!-- <span>{{ a }}</span> -->
  			<div class="lang" @click='lang'>
				<template v-if='language=="en"'>
					<img :src="e" alt="" class="cp">
				</template>
				<template v-if='language=="zh"'>
					<img :src="c" alt="" class="cp">
				</template>
			</div>
  		</div>
  		<router-view></router-view>
  	</div>
</template>

<script>
	export default {
	    data(){
			return {
				logo:require('@/assets/img/logo.png'),
				language:'',
				e:require('@/assets/img/e.png'),
    			c:require('@/assets/img/c.png'),
				// a:this.$t('navbar.contact'),
			}
		},
		created(){
			this.language=this.$i18n.locale
    	},
    	methods:{
    		lang(){
  				this.$i18n.locale === 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh'
  				localStorage.XNlang=this.$i18n.locale //后面会用做切换和将用户习惯存储到本地浏览器
			}
    	}
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
		padding:0px 30px;
	}
	.login-index-header img{
		height: 28px;
		margin: 0px 10px 0px 0px;
	}
	.lang img{
		width: 20px;
		height: 20px;
		line-height: 20px;
	}
</style>
