<template>
	<div class="footer-box ">
		<div class="footer">
			<!-- <div class="gw-logo">
				<img :src="footer" alt="">
			</div> -->
			<div class="flex jc-sb al-ce">
				<div>
					<div class="flex footer-nav">
						<a :href='gw_url'  target="_back">{{$t('navbar.Official_Website')}}</a>
						<!-- <p class="size14">{{$t('navbar.Recruitment_Information')}}</p> -->
						<!-- <p class="size14">{{$t('navbar.Data_access')}}</p> -->
						<a :href='file_url'  target="_back">{{$t('navbar.Document_Center')}}</a>
						<!-- <router-link class="size14" :to='file_url'>{{$t('navbar.Document_Center')}}</router-link> -->
						<p class="size14">{{$t('navbar.Developer_community')}}</p>
					</div>
					<div class="footer-company size14">
						Copy @2018.Company name All rights reserved
					</div>
				</div>
				<div>
					<div class="footer-nav size14"><p>{{$t('navbar.Pay_attention_to_us')}}</p></div>
					<div class="my-icon flex">
						<p class="n"><img @mouseenter='serover("n")' @mouseleave='serout("n")' :src="n" alt=""></p>
						<p><img @mouseenter='serover("f")' @mouseleave='serout("f")' :src="f" alt=""></p>
						<p><img @mouseenter='serover("i")' @mouseleave='serout("i")' :src="i" alt=""></p>
						<p><img @mouseenter='serover("l")' @mouseleave='serout("l")' :src="l" alt=""></p>
						<p class="w"><img @mouseenter='serover("w")' @mouseleave='serout("w")' :src="w" alt=""></p>
					</div>
				</div>
			</div>
		</div>
		<div class="right pr">
			<button type="" class="btnColor width100px height30" @click='show=!show'>{{$t('navbar.a51')}}</button>
			<div class='opinion-modal pa backgroundFFF padding20 center' v-if='show'>
	  			<p class="marginB10 bold">{{$t('navbar.a48')}}</p>
	  			<p class="marginB10">{{$t('navbar.a49')}}</p>
	 			<p class="marginB10"><span class="marginR20">{{em}}</span><button type="" class="btnColor height30 paddingLR20" @click='copy'>{{$t('navbar.Copy')}}</button></p> 
				<p>{{$t('navbar.a50')}}</p>
	  		</div>
		</div>
	</div>
</template>

<script>
    export default {
    	data(){
    		return {
    			footer:require('@/assets/img/gw-logo.png'),
    			l:require('@/assets/img/l.png'),
    			w:require('@/assets/img/w.png'),
    			n:require('@/assets/img/n.png'),
    			i:require('@/assets/img/i.png'),
    			f:require('@/assets/img/f.png'),
    			file_url:'', //文档中心
    			gw_url:'', //官网
    			show:false,
    			em:'info@xnmatrix.com'
    		}
    	},
    	created(){
    		this.file_url=FILE_ZH_URL
    		this.gw_url=GW_URL
    	},
    	computed: {
    		language(){
				if(this.$i18n.locale=='en'){
					this.file_url=FILE_EN_URL //商城链接
				}else{
					this.file_url=FILE_ZH_URL //商城链接
				}
    			return this.$i18n.locale
    		}
    	},
    	methods:{
    		copy(){//复制
				 // 动态创建 input 元素
				  var aux = document.createElement("input");

				  // 获得需要复制的内容
				  aux.setAttribute("value", this.em);

				  // 添加到 DOM 元素中
				  document.body.appendChild(aux);

				  // 执行选中
				  // 注意: 只有 input 和 textarea 可以执行 select() 方法.
				  aux.select();
				  
				  // 获得选中的内容
				  var content = window.getSelection().toString();
				    
				  // 执行复制命令
				  document.execCommand("copy");

				  // 将 input 元素移除
				  document.body.removeChild(aux);
				  this.$success.center(this.$t('navbar.Copy_Successful'))
				  // this.url_modal=false
			},
			serover(val){
				this[val]=require('@/assets/img/'+val+'-11.png')
			},
			serout(val){
				this[val]=require('@/assets/img/'+val+'.png')
			}
    	},
    }
</script>

<style scoped>
	.footer-box{
		background:#f8f8f8;
	}
	.footer{
		width:1200px;margin:auto;
	}
	.gw-logo img{
		display: block;
		height: 44px;
		margin-bottom: 35px;
	}
	.footer-nav{
		border-bottom: 1px solid #11A9A4;
		margin-bottom: 10px
	}
	.footer-nav p,.footer-nav a{
		display: inline-block;
		margin-right: 55px;
		padding:10px 0px;
		color:#565A66;
		font-size: 14px
		/*font-size: 18px;*/
	}

	.footer-nav p:last-child{
		margin-right: 0px;
	}
	.footer-company{
		font-size: 16px;
		color:#989DAF
	}
	.my-icon{
		height: 30px;
	}
	.my-icon img{
		height: 19px;
		display: block;
		border-right: 21px solid transparent;
		border-left: 21px solid transparent;
		margin-left: -21px;
		box-sizing: content-box
	}

	/*.my-icon img:hover{
		-webkit-filter:drop-shadow(-21px 0 #11A9A4);
        filter:drop-shadow(-21px 0 #11A9A4);
		margin-left: 0px;
	}*/
	.my-icon .n,.my-icon .w{
		width:23px;
	}
	.my-icon .n img,.my-icon .w img{
		border-right: 23px solid transparent;
		border-left: 23px solid transparent;
		margin-left: -23px;
	}
	/*.my-icon .n img:hover,.my-icon .w img:hover{
		-webkit-filter:drop-shadow(-23px 0 #11A9A4);
        filter:drop-shadow(-23px 0 #11A9A4);
		margin-left: 0px;
	}*/
	.my-icon p{
		height: 19px;
		width:21px;
		margin-right: 30px;
		overflow: hidden;
	}
	.my-icon p:last-child{
		margin-right: 0px;
	}
	.opinion{
		right: 0px;bottom: 0px;
	}
	.opinion-modal{
		right: 0px;bottom:35px;
	}
</style>
