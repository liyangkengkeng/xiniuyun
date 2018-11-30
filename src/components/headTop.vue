<template>
	<div class="header_common width100 backgroundFFF flex al-ce" :style='show?"":sty'>
		<div class="flex al-ce jc-sb paddingLR20 width100">
			<div class='header_common_logo flex al-ce'>
				<!-- <p><a :href="gw_url" target='_back'><img :src="logo" alt=""></a></p> -->
				<p><router-link to='/myProduct'><img :src="logo" alt=""></router-link></p>
				<p class="size16"><router-link to='/myProduct'>{{$t('navbar.Developer_Center')}}</router-link></p>
			</div>
			<div class="header_common_data flex al-ce">
				<div class="pr marginR10">
					<p class='header_common_name cp pr' @click='user'>{{name}}</p>
					<p class='header_common_nav backgroundFFF pa center' v-if='isEndit'>
						<router-link :to='"/personal/company/my/"+userId'>{{$t('navbar.Myconsole')}}</router-link>
						<span class='header_common_out cp' @click='out'>{{$t('navbar.Logout')}}</span>
					</p>
				</div>
				<div class="lang" @click='lang'>
					<template v-if='language=="en"'>
						<img :src="c" alt="" class="cp">
					</template>
					<template v-if='language=="zh"'>
						<img :src="e" alt="" class="cp">
					</template>
				</div>
			</div>
	    </div>
	    <div class="crumbs-header flex al-ce paddingLR20 marginB5" v-if='show'>
		    <div class="flex al-ce marginR20">
		    	<template v-for='(val,key) in crumbs' >
			    	<router-link class='color54' v-if='key<crumbs.length-1' :to='val.path' ><span v-if='!val.meta.hidden'>/</span>&nbsp;{{val.meta.title}} &nbsp;</router-link>
			    	<span v-else-if='val.meta.title'>/&nbsp; {{val.meta.title}} </span>
			    </template>
		    </div>
		</div>
		<div class="paddingLR20 flex al-ce jc-ce"  v-if='show'>
   			<p class="color54 yu">域：西谷物联科技有限公司</p>
   			<p class="flex">
   				<span class="btnF height28 paddingLR20 marginR40">切换公司开发者</span>
   				<router-link to='/myProduct' class='btnF height28 paddingLR20' v-if='total!=="/myProduct"'>{{$t('navbar.Console_of_developer_center')}}</router-link>
   			</p>
   		</div>
	</div>
</template>

<script>
    export default {
    	props:{
    		show:{
    			default:true,
    		}
    	},
    	data(){
    		return {
    			logo:require('@/assets/img/logo.png'),
    			e:require('@/assets/img/e.png'),
    			c:require('@/assets/img/c.png'),
    			// isEndit:false,
    			crumbs:null,
    			total:'',
    			sty:{
    				height:'50px',
    				position:'fixed',
    				zIndex:10,
    				left:'0px',
    				top:'0px'
    			},
    			name:'',
    			gw_url:"",
    			userId:localStorage.getItem('userId')
    			// language:'',
    		}
    	},
    	created(){
    		this.name=localStorage.getItem('userName')
    		this.total=this.$route.path
    		this.crumbs=this.$route.matched
    		this.gw_url=GW_URL
    	},
    	computed: {
    		isEndit(){
    			return this.$store.getters.personal_center
    		},
    		language(){
    			return this.$i18n.locale
    		}
    	},
		methods: {
			out(){
				var self=this
				this.ajax({
					url:'v1/oauth2/tokens/'+localStorage.getItem('token'),
					mode:'DELETE',
					data:{},
					success(ress){
						self.$router.push({path:'/login'})
						localStorage.removeItem('token')
						localStorage.removeItem('userName')
					}
				})
			},
			user(){
				// this.isEndit=!this.isEndit
				this.$store.commit('personal_center',!this.isEndit)
			},
			lang(){
  				this.$i18n.locale === 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh'
  				localStorage.XNlang=this.$i18n.locale //后面会用做切换和将用户习惯存储到本地浏览器
			}
		},
		watch:{
			$route(val){
				this.crumbs=this.$route.matched
				this.total=this.$route.path
			},
		}
    }
</script>

<style scoped>
	.header_common{
		box-shadow: 0px 2px 5px rgba(0,0,0,.2);
		padding:5px 0px;
	}
	.header_common_logo{
		/*color: #fff;*/
		font-size: 26px;
	}
	.header_common_logo img{
		height: 28px;width: 73px;
		margin-right: 10px;
		display: block;
		border:0px;
	}
	.header_common_member_type{
		height: 26px;
		padding: 0px 10px;
		line-height: 26px;
	}
	.header_common_name{
		height: 26px;
		padding: 0px 10px;
		line-height: 26px;
		margin-right: 20px;
	}
	
	.header_common_nav{
		top: 30px;
		left: 0px;
		width: 100%;
		padding: 10px;
		z-index: 999;
		box-shadow: 0px 0px 10px rgba(0,0,0,.1)
	}
	.header_common_nav::after{
		content:'';
		border:10px solid transparent;
		border-bottom-color: #fff;
		position: absolute;
		top:-20px;
		left: 50%;
		transform: translateX(-50%);
	}
	.header_common_nav a{
		display: block;
		width:100%;
	}
	.header_common_out{
		display: inline-block;
		margin-top: 10px;
		width:100%;
	}
	.crumbs-header{
		width: 100%;
		bottom: 10px;box-shadow: 0px 2px 5px rgba(0,0,0,.03);
	}
	.crumbs-header .btnf{
		width: 150px;
	}
	.yu{
		margin-right: 365px;
	}
	.lang img{
		width: 20px;
		height: 20px;
		line-height: 20px;
		display: block;
	}
</style>
