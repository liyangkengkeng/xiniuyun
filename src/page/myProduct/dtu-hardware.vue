<template>
	<div class="width1200">
		<div class="marginTB20 size22 bold">
			{{$t('navbar.Select_DTU')}}
		</div>
		<div class="flex fw-wrap hardware-box">
			<div v-if='list.length<1' class='empty no-data'>
	  			<img :src="no_data" alt=""> 
	  			{{$t('navbar.No_product_yet')}}
	  		</div>
			<div v-for='(val,index) in list' class="hardware backgroundFFF cp" @click='choose(val)'>
				<p class="center hardware-img backgroundImage" :style='{backgroundImage:"url("+val.image1+")"}'><!-- <img :src="val.image1" alt=""> --></p>
				<!-- <p class="center"><img :src="img" alt=""></p> -->
		  		<p class="size18 marginB15 ellipsis description">{{val.goodsName}}</p>
		  		<p class="size14 ellipsis2 color86 description">{{val.description}}</p> 
			</div>
		</div>
		<!-- <div class="center" v-if='more_arr.length'>
			<button type="" class="btnF width120px height28" @click='more'>{{$t('navbar.Look_for_More')}}</button>
		</div> -->
		<!-- <div class="center top-setp width100 flex al-ce jc-ce">
			<button type="" class="btnColor width200px height30" @click='upper'>{{$t('navbar.Last_Step')}}</button>
		</div> -->
	</div>
</template>

<script>
	export default {
		name:'',
		props:['goods_dtu'],
	    data(){
			return {
				img:require('@/assets/img/product-list-img.png'),
				no_data:require('@/assets/img/no-data.png')
				// more_arr:[],
				// list:[],
			}
		},
		created(){
		},
		methods: {
			choose(val){
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
				    	self.$emit('goods', val)
						self.$emit('addStep_suk', 3)
				    }
				})
			},
			// more(){
			// 	this.list=this.list.concat(this.more_arr)
			// 	this.more_arr=[]
			// },
			upper(){
				this.$emit('upper',1)
			},
		},
		computed:{
			list(){
				if(this.goods_dtu.length>8){
		    		return this.goods_dtu.slice(0,8)
		    	}else{
		    		return this.goods_dtu
		    	}
			},
			more_arr(){
				if(this.goods_dtu.length>8){
					return this.goods_dtu.slice(8,this.goods_dtu.length-1)
				}else{
					return []
				}
			}
		},
		watch:{
			// goods_dtu(val){
			// 	if(val.length>8){
			// 		this.more_arr=val.slice(8,val.length-1)
		 //    		this.list= val.slice(0,8)
		 //    	}else{
		 //    		this.list= val
		 //    	}
			// }
		}
	}
</script>

<style scoped>
	.width1200{
		width:1200px;margin:auto;
	}
	.hardware-box{
		max-height: 718px;
		overflow-y: auto;
	}
	.hardware-box>div:nth-child(4n){
		margin-right: 0px;
	}
	.hardware{
		padding:30px 15px 30px;
		margin:0px 27px 30px 0px;
		width:274px;
	}
	.hardware:hover .description{
		color:#11A9A4;
	}
	.hardware-img{
		width:150px;height: 150px;
		margin:0px auto 40px;
	}
	.top-setp{
		
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
</style>
