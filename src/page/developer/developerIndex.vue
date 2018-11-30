<template>
	<div class="index">
		<header id="header" class="width1200 flex al-ce jc-sb">
			<div class="logo flex">
				<a :href="gw_url" target='_back'><img :src="logo" alt=""></a>
				<span>{{$t('navbar.Developer_Center')}}</span>
			</div>
			<div>
				<ul class="nav flex al-ce">
					<li><a :href="goods_url"  target="_back">{{$t('navbar.a12')}}</a></li>
					<li><a :href='file_url'  target="_back">{{$t('navbar.Developer_Guide')}}</a></li>
					<li><a href=""  target="_back">{{$t('navbar.Developer_Forum')}}</a></li>
					<li>
						<router-link to='/login'>{{$t('navbar.Login')}}</router-link>
					</li>
					<li @click='lang'>
						<template v-if='language=="en"'>
							<img :src="c" alt="" class="cp">
						</template>
						<template v-if='language=="zh"'>
							<img :src="e" alt="" class="cp">
						</template>
						<!-- <button type="" class="lang background11 colorFFF height30 paddingLR20 marginLR20 cp" @click='lang'>{{$t('language.name')}}</button> -->
					</li>
				</ul>
			</div>
		</header><!-- /header -->
		<div class="main">
			<article class="width1200">
				<div class="details_header after">
					{{$t('navbar.a13')}}
				</div>
				<div class="marginB30 color98">
					<p>{{$t('navbar.a11')}}</p>
				</div>
				<div class="flex jc-sb al-ce">
					<div>
						<div class="content marginB50">
							<p class="color content-header">{{$t('navbar.a01')}}</p>
							<p class="color98">{{$t('navbar.a04')}} </p>
						</div>
						<div class="content marginB50">
							<p class="color content-header">{{$t('navbar.a02')}}</p>
							<p class="color98">{{$t('navbar.a05')}}</p>
						</div>
						<div class="content">
							<p class="color content-header">{{$t('navbar.a03')}}</p>
							<p class="color98">{{$t('navbar.a06')}}</p>
						</div>
					</div>
					<div class='link'>
						<router-link to="/register" title=""><p class="btnColor marginB30">{{$t('navbar.Register_Now')}}</p></router-link>
						<a :href="demo_url" target="_back"><p class="btnColor marginB30">{{$t('navbar.Access_Demo')}}</p></a>
						<!-- <a href="" title=""><p class="btnColor">{{$t('navbar.Access_Demo')}}</p></a> -->
					</div>
				</div>
			</article>
			<article class="merit-box flex al-ce">
				<div class="width1200 flex jc-sa ">
					<div class="merit">
						<p><img :src="index1" alt=""></p>
						<p class="size24 merit-name">{{$t('navbar.Quick_and_Simple')}}</p>
						<!-- <p class="color98">{{$t('navbar.Access_your_device_in_5min')}}</p> -->
						<p class="color98">{{$t('navbar.a07')}}
						</p>
					</div>
					<div class="merit">
						<p><img :src="index2" alt=""></p>
						<p class="size24 merit-name">{{$t('navbar.Stable_and_Reliable')}}</p>
						<!-- <p class="color98">{{$t('navbar.All_Hardware_Officially_Tested')}}</p> -->
						<p class="color98">
							{{$t('navbar.a08')}}
						</p>
					</div>
					<div class="merit">
						<p><img :src="index3" alt=""></p>
						<p class="size24 merit-name">{{$t('navbar.Mobile_Device')}}</p>
						<!-- <p class="color98">{{$t('navbar.Support_APP_Monitoring_Alarm')}}</p> -->
						<p class="color98">
							{{$t('navbar.a09')}}
						</p>
					</div>
				</div>
			</article>
			<article class="width1200">
				<div class="size30 center marginB30">
					{{$t('navbar.a10')}}
				</div>
				
				<template v-if='language=="en"'>
					<img :src="index5" alt="" class="width1100">
				</template>
				<template v-if='language=="zh"'>
					<img :src="index4" alt="" class="width1100">
				</template>
			</article>
		</div>
		<div class='record pa width100'>
	  		<footers></footers>
	  	</div>
	</div>
  	
</template>

<script>
import footers from '@/components/footer'
	export default {
	    data(){
			return {
				logo:require('@/assets/img/logo.png'),
				index1:require('@/assets/img/index1.png'),
				index2:require('@/assets/img/index2.png'),
				index3:require('@/assets/img/index3.png'),
				index4:require('@/assets/img/framework.png'),
				index5:require('@/assets/img/framework-en.png'),
				num:-1,
				e:require('@/assets/img/e.png'),
    			c:require('@/assets/img/c.png'),
    			file_url:'',
    			goods_url:'',
    			demo_url:'',
    			gw_url:"",
			}
		},
		created(){
			// this.file_url=FILE_ZH_URL //开发文档链接
			
			// this.demo_url=DEMO_URL //接入示例链接
			this.gw_url=GW_URL //官网
		},
		methods: {
			lang(){
  				this.$i18n.locale === 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh'
  				localStorage.XNlang=this.$i18n.locale //后面会用做切换和将用户习惯存储到本地浏览器
			}
		},
		computed:{
			language(){
				if(this.$i18n.locale=='en'){
					this.goods_url=GOODS_EN_URL //商城链接
					this.demo_url=DEMO_EN_URL//接入示例链接
					this.file_url=FILE_EN_URL //开发文档链接
				}else{
					this.goods_url=GOODS_ZH_URL //商城链接
					this.demo_url=DEMO_ZH_URL//接入示例链接
					this.file_url=FILE_ZH_URL //开发文档链接
				}
    			return this.$i18n.locale
    		}
		},
		components: {
    		footers
    	},
		
	}
</script>

<style scoped>
	.index{
		color: #565A66;
		font-size: 16px;
	}

	.color98{
		color: #989DAF
	}

	.width1200{
		width: 1200px;
		margin: 0px auto
	}
	.marginB30{
		margin-bottom: 30px;
	}
	.marginB50{
		margin-bottom: 50px;
	}

	#header{
		font-size: 16px;
		height: 75px;
	}
	.logo{
		align-items: center;
	}
	.logo img{
		display: block;
		width: 76px;
		margin-right: 12px;
	}
	.nav{
	}
	.nav a,.nav img{
		display: block;
		margin-left: 30px;
	}
	.nav .login{
		font-size: 12px;
		padding: 5px 20px;
		background:#11A9A4;
		color: #fff
	}

	.details_header{
		font-size: 30px;
		margin:83px 0px 35px;
	}
	.after:after{
		display: block;
		content: '';
		margin-top:30px;
		width: 70px;
		height: 1px;
		background:#11A9A4;
		/*border-top: 1px solid #11A9A4;*/
	}

	.content{
		width: 700px;
	}
	.content-header{
		margin-bottom: 10px;
	}


	.btnColor{
		width: 190px;
		height: 52px;
		text-align: center;
		line-height: 52px;
		border-radius: 5px;
		color: #fff;
		background:#11A9A4;
	}

	.link a{
		display: block
	}


	.merit-box{
		background:#F7F8FA;
		height: 390px;
		margin:50px 0px;
	}
	.merit{
		text-align: center;width:440px;margin:0px 20px;
	}
	.merit img{
		height: 140px;
		display: block;
		margin:0px auto 40px;
	}
	.merit-name{
		margin-bottom: 15px;
	}



	.main{
		margin-bottom: 170px;
	}
	.record{
		margin-top: 50px;
	}
	.record .footer-box{
		background:#f8f8f8 ;
		/*margin-top: 50px;*/
	}
	.lang{

	}
	.size30{
		font-size: 30px;
	}
	.width1100{
		width: 1000px;margin:auto;display: block;
	}
</style>
