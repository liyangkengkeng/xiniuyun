<template>
	<div class="overview-box width80">
		<div class="marginTB40 flex al-ce jc-sb">
			<span class='borderB3 paddingB5 size24 bold'>{{$t('navbar.Product_Layout')}}</span>
			<button type="" class='btnColor width120px height40' @click='edit'>{{$t('navbar.Edit')}}</button>
			<!-- <router-link :to="{path:'/foundProduct',query:{edit:true}}" class='btnColor width120px height40'>{{$t('navbar.Edit')}}</router-link> -->
			<!-- <select name="" class="paddingLR20 height30" disabled="disabled">
				<option value="">西谷物联科技有限公司</option>
			</select> -->
		</div>
		<div class="overview-content backgroundFFF">
			<div class="flex jc-sb marginB20">
				<p class="size18">{{product_data.name}}</p>
			</div>
			<div class="flex jc-sb">
				<div class="marginR40">
					<div class="">
						<div class="marginB20">
							{{product_data.description}}
						</div>
						<div class="flex">
							<div class="marginR30">
								<!-- <p class="marginB10">产品ID：{{product_data.user_id}}</p> -->
								<!-- <p class="marginB10">创建人昵称：XXX</p> -->
								<p class="marginB10">{{$t('navbar.Device_access_protocol')}}：{{product_data.protocol ? product_data.protocol.toUpperCase() : ''}}</p>
							</div>
							<div>
								<p class="marginB10">{{$t('navbar.Create_Date')}}：{{product_data.createTime}}</p>
								<!-- <p class="marginB10">数据点：12</p> -->
							</div>
							
						</div>
					</div>
				</div>
				<!-- <div class="center">
					<p class="qr marginB10"><img :src="qr" alt=""></p>
					<p>下载西牛云APP</p>
				</div> -->
			</div>
		</div>
		
		<div class="flex marginTB20 backgroundFFF overview-data-footer al-ce jc-sb padding20">
			<div class="flex">
				<div class="marginR20 tubiao2 backgroundImage" :style='{backgroundImage: goods ? "url("+goods.image1+")" : ""}'></div>
				<div class="flex fd-co jc-sb">
					<p class="color54 size18">{{$t('navbar.Commodity_Name')}}&emsp;&emsp;<span v-text='goods ? goods.goodsName : ""'></span></p>
					<p><span v-for='(val,index) in goods.arr'>{{val}}&emsp;</span></p>
					<p>{{goods.finalType1}}{{goods.finalType2}}</p>
				</div>
			</div>
			<div>
				<a :href="goodsUrl+goods.goodsId" target='_back' class="width100px height28 btnF">{{$t('navbar.Buy_Now')}}</a>
			</div>
		</div>
		<div class="flex marginTB20 backgroundFFF overview-data-footer al-ce jc-sb padding20"  v-for='(val,index) in coms'>
			<div class="flex">
				<div class="marginR20 tubiao2 backgroundImage" :style='{backgroundImage: "url("+val.image1+")" }'></div>
				<div class="flex fd-co jc-sb">
					<p class="color54 size18">{{$t('navbar.Commodity_Name')}}&emsp;&emsp;<span v-text='val.goodsName'></span></p>
					<p><span v-for='(item,index) in val.arr'>{{item}}&emsp;</span></p>
					<p>{{val.finalType1}}{{val.finalType2}}</p>
				</div>
			</div>
			<div>
				<a :href="goodsUrl+val.goodsId" target='_back' class="width100px height28 btnF">{{$t('navbar.Buy_Now')}}</a>
			</div>
		</div>
	</div>
	
</template>

<script> 

	export default {
		name:'overview-data',
	    data(){
			return {
				qr:require('@/assets/img/qr.png'),
				tubiao2:require('@/assets/img/tubiao2.png'),
				uesrId:localStorage.getItem('userId'),
				goods:{},
				// coms:[]
			}
		},
		created(){
		},
		methods: {
			edit(){
				this.$router.push({  path:'/foundProduct',query: { edit:true }});
			},
		},
		computed: {
			goods_obj(){
				return this.$store.getters.goodsData.goods
			},
			product_data(){
				return this.$store.getters.product_data
			},
			coms(){
				return this.$store.getters.comsGoods
			},
			goodsUrl(){
				var url=''
				if(this.$i18n.locale=='en'){
					url=GOODS_EN_DETAILS //商城链接
				}else{
					url=GOODS_ZH_DETAILS //商城链接
				}
    			return url
    		}
		},
		watch: {
			goods_obj:{
				handler(val){
					if(val){
						if(typeof val.cellularNetwork === "string"){
							val.cellularNetwork=val.cellularNetwork ? JSON.parse(val.cellularNetwork).join(' , ') :''
							val.nearField=val.nearField ? JSON.parse(val.nearField).join(' , ') :''
							val.networkProtocol=val.networkProtocol ? JSON.parse(val.networkProtocol).join(' , ') :''
							this.goods=val
						}
						this.goods=val
					}
				},
				immediate:true	
			},
		},
	}
</script>

<style scoped>
	.overview-box{
		min-width: 965px;
		padding:0px 50px;
		overflow-y: hidden;
	}
	.overview-content,.overview-data-footer{
		padding:20px 40px;
	}
	.overview-test{
		width: 120px;
	}
	.qr{
		width: 120px;height: 120px;
	}
	.qr img{
		width: 100%;height: 100%;
	}
	.overview-state{
		margin-left:40px;
		padding:40px; 
	}

	
	.table{
		padding: 20px 40px;
	}
	.hieght120{
		height: 120px;
	}

	.tubiao2{
		width:80px;height:80px;
	}
	.tubiao2 img{
		display: block;
		width:100%;
	}
</style>
