<template>
  	<div class="personal backgroundF8 pr color30">
	    <head-top :show='false'></head-top>
  		<div class="com colorF6 center pf">
			<div class="paddingTB20 flex jc-ce al-ce">
				<img :src="head" alt="" class="head border-r5 marginR10">
				<!-- <span>个人中心</span> -->
			</div>
			
			<div v-for='(val,index) in list' :key='index' class="pr classify" :class='{current:url.indexOf(val.path)>-1}'>
				<router-link :to='val.path' class='paddingTB15 colorF6 flex' v-if='val.meta'>
	  				<p class="icon-img marginR10">
	  					<img :src="val.meta.icon_hover" alt="" v-if='url.indexOf(val.path)>-1'>
			  			<img :src="val.meta.icon" alt="" v-else>
	  				</p>
	  				<p>{{$t(val.meta.title)}}</p>
				</router-link>
			</div>
			<p class="index center width100 pa size18 cp">
				<router-link to='/myProduct' class='colorFFF flex al-ce jc-ce retu'>
					<img class="re-icon" :src="re"  alt="">
					<span class="pa tishi">{{$t('navbar.a38')}}</span> &emsp;
					<span class="size18 bold">{{$t('navbar.Return')}}</span>
				</router-link>
			</p>
  		</div>
  		<router-view></router-view>	
  		<div class='bottom pa'>
  			<bottom></bottom>
  		</div>
  		
  	</div>
</template>

<script>
import headTop from '@/components/headTop'
import bottom from '@/components/bottom'
	export default {
	    data(){
			return {
				head:require('@/assets/img/memberCenter.png'),
				list:[],
				url:'',
				re:require('@/assets/img/return-icon.png'),
			}
		},
		created(){
			var arr=this.$router.options.routes
			for(var i=0;i<arr.length;i++){
				if(arr[i].path==="/personal/company"){
					for(let j=0;j<arr[i].children.length;j++){
						arr[i].children[j].path=arr[i].children[j].path.replace(":userid",localStorage.getItem('userId'))
					}
					this.list=arr[i].children
				}
			}
			this.url=this.$route.path
    	},
		computed: {
			
		},
		methods: {
		},
		watch: {
			$route(val){
				this.url=val.path
			}
		},
		components: {
    		headTop,bottom
    	},
	}
</script>

<style scoped>
	.personal{
		width: 100vw;
		padding: 50px 0px 30px 235px;
		min-height: 100vh;
		overflow-y: hidden;
	}
	.personal-header{
		height: 50px;
		left: 0px;
		top: 0px;
		z-index: 3
	}
	.com{
		background:#373737;
		width: 235px;
		left:0px;
		top: 0px;
		padding-top: 60px;
		height: 100%;
		z-index: 2
	}
	.head{
		width:68px;
		height: 68px;
	}

	.classify a{
		margin-left: 35px
	}

	.icon-img{
		width: 20px;height: 20px;
		overflow: hidden;
	}
	.icon-img img{
		width: 40px;height: 100%;border-right: 20px solid transparent
	}
	.icon-img .iconTouch{
		-webkit-filter:drop-shadow(20px 0 rgb(255, 255, 255));
        filter:drop-shadow(20px 0 rgb(255, 255, 255));
		margin-left: -20px;
	}
	

	.current{
		background:#11A9A4;
	}
	.current::after{
		content:'';
		position: absolute;
		border:10px solid transparent;
		border-right: 10px solid #f8f8f8;
		right: 0px;
		top: 50%;
		transform: translateY(-50%);
	}

	.content{

	}
	.record{
		left: 0px;
		bottom: 0px;
		height: 30px;
		line-height: 30px;
	}
	.index{
		left: 0px;bottom:30px;
	}
	.index a{
		/*border-bottom: 1px solid #9d9d9d*/
	}
	.bottom{
		bottom: 0px;width: 100%;margin-left: -240px;
	}
	.re-icon{
		width: 30px;height: 30px;
	}
	.tishi{
		display: none;
		left:50%;top: -20px;
		transform: translateX(-50%);
		color:#d9d9d9
	}
	.re-icon:hover+.tishi{
		display: block;
	}
</style>
