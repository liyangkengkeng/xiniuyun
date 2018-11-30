<template>
	<div class="width1200">
		<div class="marginTB20 size22 bold">
			{{$t('navbar.Select_Hardware')}}
		</div>
		<div class="flex fw-wrap hardware-box">
			<div v-if='list.length<1' class='empty no-data'>
	  			<img :src="no_data" alt=""> 
	  			{{$t('navbar.No_product_yet')}}
	  		</div>
			<div v-for='(val,index) in list' class="marginB20" :class='val.show ? "color" : ""'>
				<div class="backgroundFFF hardware pr cp" @click='choose($event,val,index)'>
					<p class="center hardware-img backgroundImage" :style='{backgroundImage:"url("+val.image1+")"}'><!-- <img :src="val.image1" alt=""> --></p>
			  		<p class="size18 marginB15 description ellipsis color30">
			  			{{val.goodsName}}
			  		</p>
			  		<p class="size14 color86 description ellipsis2">{{val.description}}</p>
			  		<p class="flex al-ce jc-ce well-status pa" v-if='val.show'><img :src="tick" alt=""> </p>
				</div>
				<div class='center width100 see backgroundFFF'>
					<a :href="goodsUrl+val.goodsId" target='_back' class="color86">{{$t('navbar.Look_up_Details')}}</a>
					<!-- <a href="javascript:void(0)" class="color86">查看详情</a> -->
				</div>
			</div>
		</div>
		<div class="center top-setp pa" v-if='list.length>0'>
			<!-- <button type="" class="btnColor width200px height30 marginR40" @click='upper'>{{$t('navbar.Last_Step')}}</button> -->
			<button type="" class="btnColor width200px height30" @click='sub'>{{$t('navbar.Create_Completed')}}</button>
		</div>



		<div class="modal" v-if='isModal'>
			<div class="backgroundFFF is-found-project center">
				<p>
					<img :src="tubiao1" alt="">
				</p>
				<p class="marginT30 size24">
					{{$t('navbar.Use_this_product_to_create_project')}}
				</p>
				<p class="marginT30">
					<button class="btnColor width230px height48 marginR20" @click='found'>{{$t('navbar.Confirm_Create')}}</button>
					<button class="btnF width230px height46" @click='noFound'>{{$t('navbar.Not_Sure_yet')}}</button>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'',
		props:['goods_cp'],
	    data(){
			return {
				img:require('@/assets/img/product-list-img.png'),
				tick:require('@/assets/img/tick.png'),
				tubiao1:require('@/assets/img/tubiao1.png'),
				isModal:false,
				my_goods:{},
				no_data:require('@/assets/img/no-data.png'),
				list:[]
			}
		},
		created(){
			this.list=this.goods_cp
		},
		methods: {
			choose(event,val,index){
				var self=this
				this.ajax({ 
				    mode:'GET',
				    goods:true,
				    url:'shop/goods/infoBySkuNo/'+val.skuNo,
				    data:{
				    	body:{}
				    },
				    success(res){
				    	val.data=res.data.data
				    	var show=val.show
						for(let i=0;i<self.list.length;i++){
							self.list[i].show=false
						}

						var obj=val
						obj.show=!show
						self.list.splice(index,1,obj)
							self.my_goods.bindSkuNo=val.bindSkuNo || val.skuNo
							self.my_goods.skuNo=val.skuNo
							self.my_goods.data=res.data.data
						// }
				    }
				})
				
			},
			sub(){//下一步
				if(this.my_goods.bindSkuNo &&this.my_goods.skuNo ){
					this.isModal=true
					this.$emit('sub',this.my_goods)
				}else{
					this.$violate.center(this.$t('navbar.a60'))
				}
				
			},
			upper(){
				this.$emit('upper',1)
			},
			found(){//创建项目
				this.$router.push({  path:'/myProduct',query: { model:true }});
			},
			noFound(){//不创建项目
				var id=localStorage.getItem('my_product_id') 
				this.$router.push({ path:'/personal/company/my/'+id});
			},
		},
		computed:{
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
		watch:{
		}
	}
</script>

<style scoped>
	.width1200{
		width:1200px;margin:auto;max-height: 852px;position: relative;padding-bottom: 30px;
	}
	.hardware-box{
		margin-bottom: 50px;
		max-height: 722px;
		overflow-y: auto;
	}
	.hardware-box>div:nth-child(4n){
		margin-right: 0px;
	}
	.hardware{
		padding:20px 15px 10px;
		margin:0px 20px 0px 0px;
		width:274px;
		height: 300px;
	}
	.hardware:hover .description{
		color:#11A9A4;
	}
	.hardware-img{
		width:150px;height: 150px;
		margin:0px auto 40px;
	}
	/*.hardware.color .description{
		color:#11A9A4;
	}*/
	.top-setp{
		bottom:0px;
		left: 50%;
		transform: translateX(-50%);
	}
	.well-status{
		top: 0px;left: 0px;
		width:100%;height: 100%;background:rgba(0,0,0,.2);
	}

	.is-found-project{
		padding:50px;
		position: absolute;left: 0px;top: 0px;right: 0px;bottom: 0px;margin:auto;width: 600px;height: 425px
	}
	.is-found-project img{
		width:268px;
		display: block;
		margin:auto;
	}
	.height100{
		height: 80px;
	}

	.see{
		width:274px;padding:0px 15px;
	}
	.see a{
		display:block;
		border-top: 1px solid #d9d9d9;
		padding:10px 0px;
	}
	.see a:hover{
		color:#11A9A4;
	}
	.ellipsis{
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.ellipsis2{
	display: -webkit-box; 
	-webkit-box-orient: vertical; 
	text-overflow: ellipsis; 
	overflow : hidden;
	-o-text-overflow: ellipsis;    /* Opera */ 
    text-overflow: ellipsis;    /* IE, Safari (WebKit) */ 
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	word-wrap:break-word;
}
.width230px{
	width: 230px;
}
</style>
