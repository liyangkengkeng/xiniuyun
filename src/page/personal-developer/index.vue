<template>
	<div>
		<div class="personal backgroundF8 pr color30">
	  		<head-top :show='false'></head-top>
	  		<div class="com colorF6 center pf">
	  			<div class="flex jc-ce al-ce head backgroundImage" :style='{backgroundImage : "url("+head+")"}'>
					<!-- <img :src="head" alt="" class="head border-r5 marginR10"> -->
					<!-- <span>企业开发者</span> -->
				</div>
				<!-- <div class="paddingTB20 flex jc-ce al-ce" style='box-shadow: 0px 2px 3px rgba(0,0,0,.1)'>
					<img :src="head" alt="" class="head border-r5 marginR10">
					<span>产品</span>
				</div> -->
				
				<div v-for='(val,index) in list' :key='index' class="pr classify" :class='{current:url.indexOf(val.path)>-1}'>
					<router-link :to='val.path' class='paddingTB15 colorF6 flex'>
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
	  	</div>
	  	<div class="menberCenter-footer">
	  		<bottom></bottom>
	  	</div>
	</div>
</template>
<script>
import headTop from '@/components/headTop'
import footers from '@/components/footer'
import bottom from '@/components/bottom'
	export default {
	    data(){
			return {
				head:require('@/assets/img/head.png'),
				list:[],
				url:'',
				lang_show:true,
				re:require('@/assets/img/return-icon.png'),
				// product_data:{}
			}
		},
		created(){
			this.url=this.$route.path

			var self=this
			if(this.$route.query.id){
				this.$store.commit('PRODUCTID',this.$route.query.id)
				localStorage.my_product_id=this.$route.query.id
			} else{
				this.$store.commit('PRODUCTID',localStorage.getItem('my_product_id'))
			}
			this.productDetiles()
    	},
		computed: {
			lang(){
				return this.$i18n.locale
			}
		},
		methods: {
			goods_details(data){
				var self=this
				var sku= self.lang_show ? data.skuNo : data.bindSkuNo
				sku = sku || data.skuNo
				this.ajax({ 
				    mode:'GET',
				    goods:true,
				    url:'shop/goods/infoBySkuNo/'+sku,
				    data:{
				    	body:{}
				    },
				    success(res){
				    	self.head=res.data.goods.image1 || self.head
				    	res.data.goods=self.data_handling(res.data.goods)

				    	self.$store.commit('GOODSDATA',res.data)//商品
				    	self.$store.commit('COMS_GOODS0')
				    	if(data.coms && data.coms.length>0){
							for(let i=0;i<data.coms.length;i++){
								for(let j in data.coms[i]){
									if(data.coms[i][j]){
										self.ajax({ 
									    	mode:'GET',
										    goods:true,
										    url:'shop/goods/devInfo/'+data.coms[i][j],
										    data:{
										    	body:{}
										    },
										    success(ress){
										    	ress.data.goods=self.data_handling(ress.data.goods)
												self.$store.commit('COMS_GOODS',ress.data.goods) //关联的接口商品
										    }
										})
									}
								}
							}
						}
				    }
				})
			},
			data_handling(data){ //数据处理
				data.appArea= data.appArea ? data.appArea.split(',') : []
				data.cellularNetwork=(data.cellularNetwork && JSON.parse(data.cellularNetwork)) ? JSON.parse(data.cellularNetwork) : []
				data.nearField=(data.nearField && JSON.parse(data.nearField)) ? JSON.parse(data.nearField) : []
				data.networkProtocol=(data.networkProtocol && JSON.parse(data.networkProtocol) ) ? JSON.parse(data.networkProtocol) : []
				data.suFunType1= (data.suFunType1 && JSON.parse(data.suFunType1) ) ? JSON.parse(data.suFunType1) : []

				var arr=[]
				if(data.network){
					arr.push(data.network)
				}

				if(data.mobileOperator){
					if(data.mobileOperator=='wt'){
						arr.push(this.$t('navbar.a41') || '')
					}
					if(data.mobileOperator=='dx'){
						arr.push(this.$t('navbar.a42') || '')
					}
					if(data.mobileOperator=='lt'){
						arr.push(this.$t('navbar.a43') || '')
					}
					if(data.mobileOperator=='yd'){
						arr.push(this.$t('navbar.a44') || '')
					}
				}

				arr=arr.concat(data.cellularNetwork,data.nearField,data.networkProtocol,data.appArea)
				
				if(data.suFunType1.length>0){
					for(var i=0;i<data.suFunType1.length;i++){
						arr=arr.concat(data.suFunType1[i].sub)
					}
				}
				data.arr=arr
				return data
			},
			productDetiles(){
				var self=this
				this.ajax({ //产品详情
				    mode:'GET',
				    url:'v1/models/'+this.$store.getters.productID+'/',
				    data:{},
				    success(res){
				    	res.data.data.createTime=self.$time_stamp(res.data.data.createTime)
				    	res.data.data.publicDate=self.$time_stamp(res.data.data.publicDate)
				    	self.$store.commit('PRODUCT_DATA',res.data.data)
				    	
				    	var arr=self.$router.options.routes
						for(var i=0;i<arr.length;i++){
							if(arr[i].path==="/product/my"){
								for(let j=0;j<arr[i].children.length;j++){
									arr[i].children[j].path=arr[i].children[j].path.replace(":userid",localStorage.getItem('userId'))
									arr[i].children[j].path=arr[i].children[j].path.replace(":name",res.data.data.name)
								}
								self.list=arr[i].children
							}
						}

						self.goods_details(res.data.data)
				    }
				})
			}
		},
		watch: {
			$route(val){
				this.url=val.path
			},
			lang(val){
				this.lang_show=!this.lang_show
				this.productDetiles()
			}
		},
		components: {
    		headTop,footers,bottom
    	},
	}
</script>

<style scoped>
	.personal{
		width: 100vw;
		min-height: 100vh;
		overflow: hidden;
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
		padding-top: 50px;
		height: 100%;
		z-index: 2
	}

	.classify a{
		margin-left: 60px
	}

	.icon-img{
		width: 20px;height: 20px;
		overflow: hidden;
	}
	.icon-img img{
		width: 100%;height: 100%;border-left: 20px solid transparent;box-sizing: content-box;
		margin-left: -20px;
	}
	.icon-img .iconTouch{
		-webkit-filter:drop-shadow(20px 0 rgb(255, 255, 255));
        filter:drop-shadow(20px 0 rgb(255, 255, 255));
		margin-left: -60px;
	}
	.header_common{
		box-shadow: 0px 2px 5px rgba(0,0,0,.2);
		padding: 10px 20px;
		height: 100px;
	}
	.header_common_logo{
		/*color: #fff;*/
		font-size: 26px;
	}
	.header_common_logo img{
		height: 40px;
		margin-right: 10px;
		display: block;
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
		background:#11A9A4;overflow: hidden;
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

	.head{
		width:68px;
		height: 68px;
		margin:20px auto 10px;
	}
	.index{
		left: 0px;bottom:30px;
	}
	.index a{
		/*border-bottom: 1px solid #9d9d9d*/
	}

	.menberCenter-footer{
		position: absolute;bottom: 0px;width: 100%
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
