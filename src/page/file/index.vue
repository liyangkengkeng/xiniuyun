<template>
	<div>
		<div class="personal backgroundF8 pr color30">
  		<!-- <head-top :show='false'></head-top> -->
	  		<div class="file-header pf">
	  			<div class="flex jc-sb">
	  				<div class='header_common_logo flex al-ce'>
						<p><router-link to='/developerIndex'><img :src="logo" alt=""></router-link></p>
						<p class="size16">{{$t('navbar.Developer_Guide')}}</p>
					</div>
					<div class="header_common_data flex al-ce">
						<router-link to='/login' class='btnColor marginR40'>{{$t('navbar.Login')}}</router-link>
						<p @click='lang'>
							<template v-if='language=="en"'>
								<img :src="e" alt="" class="cp">
							</template>
							<template v-if='language=="zh"'>
								<img :src="c" alt="" class="cp">
							</template>
						</p>
						
					</div>
	  			</div>
	  			
	  		</div>
	  		<div class="com pf">
				<div v-for='(val,index) in list' :key='index' class="pr">
					<router-link :to='val.path'>
						<div class='paddingTB15 flex father-nav cp' @click='father(index)'>
			  				<div class="icon-img pr">
			  					<p class="marginR10 pa icon-box"></p>
			  				</div>
			  				<div>{{index+1}}.&emsp;{{$t(val.meta.title)}}</div>
						</div>
					</router-link>
					<div class="classify">
						<router-link :to='item.path' class='paddingTB10 pr' :class="{current:item.path===url}" v-for='(item,key) in val.children' :key='key'>
							<p>{{$t(item.meta.title)}}</p>
						</router-link>
					</div>
				</div>
	  		</div>
	  		<div>
				<div class='projectData-box'>
					<router-view></router-view>
				</div>
				<div class='record width100'>
			  		<footers></footers>
			  	</div>
	  		</div>
	  	</div>
	</div>
  	
</template>

<script>
import headTop from '@/components/headTop'
import footers from '@/components/footer'
	export default {
	    data(){
			return {
				logo:require('@/assets/img/logo.png'),
				isEndit:false,
				head:require('@/assets/img/head.png'),
				list:[],
				url:'',
				e:require('@/assets/img/e.png'),
    			c:require('@/assets/img/c.png'),
			}
		},
		created(){
			var arr=this.$router.options.routes
			for(var i=0;i<arr.length;i++){
				if(arr[i].path==="/fileIndex"){
					this.list=arr[i].children
				}
			}

			this.url=this.$route.path
			for(var j=0;j<this.list.length;j++){
				this.list[j].father_select=false
				if(this.list[j].path===this.url){
					this.list[j].father_select=true
				}else{
					for(let a=0;a<this.list[j].children.length;a++){
						if(this.list[j].children[a].path===this.url){
							this.list[j].father_select=true
						}
					}
				}
			}
    	},
		computed: {
			language(){
    			return this.$i18n.locale
    		}
		},
		methods: {
			out(){
				locacalStorage.removeItem('token')
				this.$router.push({path:'/loginIndex'})
			},
			father(index){
				for(var j=0;j<this.list.length;j++){
					this.list[j].father_select=false
				}
				var _dom=this.list[index]
				_dom.father_select=true
				var arr=this.list.splice(index,1,_dom)
			},
			lang(){
  				this.$i18n.locale === 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh'
  				localStorage.XNlang=this.$i18n.locale //后面会用做切换和将用户习惯存储到本地浏览器
			}
		},
		watch: {
			$route(val){
				this.url=val.path
				// this.url=val.path.split('/')[val.path.split('/').length-1]
			},
		},
		components: {
    		headTop,footers
    	},
	}
</script>

<style scoped>
	.personal{
		width: 100vw;
		padding: 50px 0px 30px 235px;
	}
	.personal-header{
		height: 50px;
		left: 0px;
		top: 0px;
		z-index: 3
	}
	.com{
		width: 235px;
		left:0px;
		top: 0px;
		padding-top: 50px;
		height: 100%;
		z-index: 2;border-right: 1px solid #d9d9d9
	}
	.head{
		width:68px;
		height: 68px;
	}

	.classify a{
		padding-left: 80px;
		display: block;
	}
	.icon-img{
		width: 55px;flex-shrink: 0;
		text-align: -webkit-right;
	}
	.icon-img p{
		width: 20px;height: 20px;
		overflow: hidden;
	}
	.icon-img img{
		width: 100%;height: 100%;
	}
	.icon-img .iconTouch{
		-webkit-filter:drop-shadow(-20px 0 rgb(255, 255, 255));
        filter:drop-shadow(-20px 0 rgb(255, 255, 255));
		margin-left: 20px;
	}
	.header_common{
		box-shadow: 0px 2px 5px rgba(0,0,0,.2);
		padding: 10px 20px;
		height: 100px;
	}

	.header_common_member_type{
		height: 40px;
		padding: 0px 10px;
		line-height: 40px;
		background:#ccc;
		margin-right: 15px;
	}
	.header_common_name{
		height: 40px;
		padding: 0px 10px 40px;
		line-height: 40px;
		background: #e7e7e7;
	}
	.header_common_nav{
		top: 50px;
		left: 0px;
		width: 100%;
		background: #e1e1e1;
		padding: 10px;
		z-index: 999
	}
	.header_common_nav::after{
		content:'';
		border:10px solid transparent;
		border-bottom-color: #e1e1e1;
		position: absolute;
		top:-20px;
		left: 50%;
		transform: translateX(-50%);
	}

	.current{
		color:#11A9A4;
	}


	.projectData-header,.projectData-box{
		min-width: 965px;
		padding:20px 70px;
	}
	.projectData-box{
		padding-bottom: 120px;
	}
	.projectData-header .btnf{
		width: 120px;
	}

	.projectData-header select{
		/*width: 120px;*/
		height: 30px;
	}
	.icon-box{
		right: 0px;
	}
	.header_common_logo{
		/*color: #fff;*/
		font-size: 26px;flex-shrink: 0
	}
	.header_common_logo img{
		height: 28px;
		margin-right: 10px;
		display: block;
	}
	.file-header{
		z-index: 10;
		left: 0px;
		top: 0px;
		width: 100%;
		background:#fff;
		/*height: */
		box-shadow: 0px 2px 5px rgba(0,0,0,.2);
		padding:5px 0px 5px 305px;
	}
	.file-header>div{
		width:882px;
	}
	.header_common_data{
		flex-shrink: 0
	}
	.header_common_data a{
		/*margin-left: 705px;*/
		padding:5px 20px;
	}
	.header_common_data img{
		display: block
	}
</style>
