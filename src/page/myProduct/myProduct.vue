<template>
  	<div>
  		<div class="flex al-ce jc-ce console backgroundImage" :style='{backgroundImage:console}'>
  			<span class='colorFFF size36'>{{$t('navbar.Console_of_developer_center')}}</span>
  		</div>
  		<div class="my">
  			<div class="flex al-ce">
	  			<p class="marginR40 size24 paddingTB10 cp opacity myproduct-header" @click='tabs=true' :class='tabs ? "select_tab" : ""'>{{$t('navbar.Product')}}</p>
	  			<p class="marginR40 size24 paddingTB10 cp opacity myproduct-header" @click='tabs=false' :class='!tabs ? "select_tab" : ""'>{{$t('navbar.Project')}}</p>
	  			<!-- <select name="" class="height40 paddingLR20 color86" v-model='field'>
	  				<option value="1">西谷物联科技有限公司</option>
	  				<option value="2">西谷物联科技有限公司</option>
	  			</select> -->
	  		</div>
	  		<!-- 我的产品 --> 
	  		<div  v-if='tabs'>
	  			<div class="flex jc-sb paddingTB20">
			  		<div class="color30">
			  			<span class="size20  marginR10">{{$t('navbar.My_product')}}</span>
			  			<span class="size16">{{product_list.length}}{{$t('navbar.Created')}}</span>
			  		</div>
			  		<div class="flex header-btn">
			  			<button class="btnColor width90px height34 size14" @click='add_product'>{{$t('navbar.Create')}}</button>
			  			<!-- <router-link to='/foundProduct' class='btnColor  width90px height34'>{{$t('navbar.Create')}}</router-link> -->
			  		</div>
			  	</div>
			  	<div class="marginB20" v-if='product_list.length>0'>
		  			<button type="" class="width120px marginR40 my-nav" :class='sort ? "btnColor height34" : "btnF height32"' @click='time_sort'>{{$t('navbar.Date_Sequence')}}</button>
		  			<button type="" class="width120px my-nav" :class='!sort ? "btnColor height34" : "btnF height32"' @click='use_sort'>{{$t('navbar.Used_Recently')}}</button>
		  		</div>
			  	<div class="product-list-box flex fw-wrap">
			  		<div v-if='product_list.length<1' class='empty no-data'>
			  			<img :src="no_data" alt=""> 
			  			<span>{{$t('navbar.No_data_yet')}}</span>
			  		</div>
				  	<div class="product-list size14 backgroundFFF marginB20 pr" v-for='(val,index) in product_list' v-else>
				  		<!-- <div class="right product-del pa"><img :src="del" alt="" class="cp" @click='model_del_product=true,product_id=val._id,product_index=index,del_content="product",productORproject=false'></div> -->
				  		<div class="right product-del pa"><img :src="del" alt="" class="cp" @click='dell(val._id,index,"product")'></div>
				  		<router-link :to='{path:"product/"+val.name+"/my/page/"+userId, query:{id:val._id}}'>
				  			<div class="product-content">
					  			<p class="center product-content-img backgroundImage" :style='{backgroundImage:"url("+val.image+")"}'><!-- <img :src="product_img" alt=""> --></p>
					  			<!-- <p>{{val.num}}---{{index}}</p> -->
						  		<p class="size18 marginB10  product-list-name ellipsis">{{val.name}}</p>
						  		<p class="size14 product-list-des ellipsis2">{{val.description}}</p>
					  		</div>
				  		</router-link>
				  	</div>
			  	</div>
	  		</div>
		  	
		  	
		  	<!-- 项目 -->
		  	<div  v-else>
		  		<div class="flex jc-sb paddingTB20">
			  		<div class="color30">
			  			<span class="size20 marginR10">{{$t('navbar.My_project')}}</span>
			  		</div>
			  		<div class="flex header-btn">
			  			<button class="btnColor width90px height34 size14" @click='add_project'>{{$t('navbar.Create')}}</button>
			  		</div>
			  	</div>
			  	<div class="product-list-box flex fw-wrap">
			  		<div v-if='project_list.length<1' class='empty no-data'>
			  			<img :src="no_data" alt=""> 
			  			<span>{{$t('navbar.No_data_yet')}}</span>
			  		</div>
			  		<div class="product-list size14 backgroundFFF marginB20 pr" v-for='(val,index) in project_list' v-else>
				  		<!-- <div class="right product-del pa"><img :src="del" alt="" class="cp" @click='model_del_product=true,product_id=val._id,product_index=index,del_content="project",productORproject=true'></div> -->
				  		<div class="right product-del pa"><img :src="del" alt="" class="cp" @click='dell(val.id,index,"project")'></div>
				  		<router-link :to='{path:"project", query:{id:val.id}}'>
				  			<div class="product-content">
					  			<p class="center product-content-img backgroundImage" :style='{backgroundImage: val.image_name}'><!-- <img :src="project_img" alt=""> --></p>
						  		<p class="size18 marginB10 product-list-name ellipsis">{{val.name}}</p>
						  		<p class="size14 product-list-des ellipsis2">{{val.description}}</p>
					  		</div>
				  		</router-link>
				  	</div>
			  	</div>
		  	</div>
			
			
			<!-- 创建项目 -->
			<div class="modal" v-if='found_project'>
				<found-project :checked_arr='checked_arr' :productList='product_list' :binding='binding' @cancel='cancel' @sonProject='sonProject'></found-project>
			</div>
  		</div>
  	</div>
</template>

<script>
import merge from 'webpack-merge'
import FoundProject from '@/components/found-project'
	export default {
	    data(){
			return {
				product_list:[],
				project_list:[],//项目列表
				project_img:'url('+require('@/assets/img/product-icon1.png')+')',
				console:'url('+require('@/assets/img/console.png')+')',
				del:require('@/assets/img/x-icon.png'),
				sort:true,//产品排序
				tabs:true,//产品/项目切换
				found_project:false,
				field:1,//域
				binding:false,//創建產品后直接创建项目
				productORproject:false,
				checked_arr:[],
				no_data:require('@/assets/img/no-data.png'),
				lang_show:true,
				userId:''
			}
		},
		created(){
			this.userId=localStorage.getItem('userId')
            if(this.$route.query.model){
            	this.tabs=false
            	this.found_project=true
            	this.binding=true
            }
            this.project()
            this.product()
		},
		methods: {
			dell(id,index,str){ //确认删除
				var self=this
				 this.$prompt.center(self.$t('navbar.Confirm_to_delete')+'?',{
		        	hid(){},
		        	confirm(){
		        		var _this=this
						var url
						url = str=="product" ?  'v1/models/'+id+'/' : 'v1/projects/'+id+'/'
						if(!(str=="product")){
							self.ajax({
			        			url:'v1/projects/'+id+'/users/',
								mode:'DELETE',
							    data:[localStorage.getItem('userId')],
							    success(res){
							    	self.ajax({
					        			mode:'DELETE',
						                url:url,
						                data:{},
						                success(res){
						                	self.project_list.splice(index,1)
						                	// self.product()
						                	self.$success.center(self.$t('navbar.delete_successful'))
						                	_this.hid()
						                }
					        		})
							    }
			        		})
						}else{
							self.ajax({
			        			mode:'DELETE',
				                url:url,
				                data:{},
				                success(res){
				                	self.product_list.splice(index,1)
				                	// self.project()
				                	// if(str=="product")
				                	// 	self.product_list.splice(self.product_index,1)
				                	// else
				                	// 	self.project_list.splice(self.product_index,1)
				                	self.$success.center(self.$t('navbar.delete_successful'))
				                	_this.hid()
				                }
			        		})
						}
		        	},
		        	cancel(){this.hid()},
		        });
			},
			project(){//项目列表
				var self=this
				self.project_list=[]
				self.ajax({ 
	                mode:'GET',
	                url:'v1/users/'+localStorage.getItem('userId')+'/projects/',
	                data:{},
	                success(res){
	                	for(let i=0;i<res.data.data.length;i++){
	                    	res.data.data[i].create_at=self.$time_stamp(res.data.data[i].create_at) //创建时间戳转换
	                    	res.data.data[i].image_name = Number(res.data.data[i].image_name) ? Number(res.data.data[i].image_name) : 1
	                    	res.data.data[i].image_name = 'url('+require('@/assets/img/product-icon'+(res.data.data[i].image_name || 1)+'.png')+')'
	                    }
	                    self.project_list=res.data.data
	                }
	            })
			},
			product(url=''){//产品列表
				var self=this
				url = url ? "?"+url : url
				self.ajax({ //产品列表
				    mode:'GET',
				    url:'v1/models/'+url,
				    data:{},
				    success(res){
	                    self.product_list=res.data.data
	                    for(let j=0;j<res.data.data.length;j++){
	                    	
	                    	res.data.data[j].num=j
				    		res.data.data[j].createTime=self.$time_stamp(res.data.data[j].createTime) //创建时间戳转换
				    		res.data.data[j].publicDate=self.$time_stamp(res.data.data[j].publicDate) //创建时间戳转换
				    		// console.log(j)
							if(self.binding && (res.data.data[j]._id == localStorage.getItem('my_product_id'))){
								self.checked_arr.push(res.data.data[j]._id)
								self.goods(self.product_list[j],j,true)
							}else{
								self.goods(self.product_list[j],j,false)
							}
						}
				    }
				})
			},
			use_sort(){//使用排序
				this.product("sortby=accesstime")
				this.sort=false
			},
			time_sort(){//时间排序
				this.product()
				this.sort=true
			},
			sonProject(val){
				this.found_project=false
				this.project()
				// this.$router.push({path:'/project',query:{id:val}})
			},
			cancel(val){
				this.found_project=false
				this.$router.push({
    				query:merge({})
    			})
			},
			goods(val,index,boo){
				var self=this
				val.bindSkuNo = val.bindSkuNo || val.skuNo
				var parameter= self.lang_show ? val.skuNo : val.bindSkuNo
				if(val.skuNo){
					this.ajax({
					    mode:'GET',
					    goods:true,
					    url:'shop/goods/infoBySkuNo/'+parameter,
					    data:{
					    	body:{}
					    },
					    success(res){
					    	if(res.data.code==1000){
					    		val.image=res.data.goods.image1
						    	val.state=boo ? true : false
						    	self.$set(self.product_list,index,val)
					    	}else{
					    		self.$set(self.product_list,index,val)
					    	}
					    }
					})
				}
			},
			updata_token(){
				this.ajax({
			        mode: 'post',
			        url: 'v1/oauth2/tokens/',
			        data:{
			        	client_id:localStorage.getItem('client_id'),
			        	client_secret:localStorage.getItem('client_secret'),
			        	refresh_token:localStorage.getItem('refresh_token'),
			        	grant_type:'refresh_token'
			        },
			        success(response){
			        	localStorage.token = response.data.data.access_token;
				        localStorage.refresh_token=response.data.data.refresh_token;
				        localStorage.isCloudAdmin = true;
				        localStorage.isSystemAdmin = false;
			        }
			    })
			},
			add_project(){//创建项目
				this.found_project=true
			},
			add_product(){//创建产品
				this.$router.push('/foundProduct');
			}
		},
		computed:{
			lang(){
				return this.$i18n.locale
			}
		},
		watch:{
			field(val){
				this.product()
            	this.project()
			},
			lang(val){
				this.lang_show=!this.lang_show
				this.product()
			}
		},
		components: {
    		FoundProject
    	},
	}
</script>

<style scoped>
	.my{
		width: 1200px;margin:auto;height:100%
	}
	.myproduct-header{
		border-bottom: 4px solid transparent
	}
	.myproduct-header.select_tab{
		border-bottom: 4px solid #11A9A4;color:#11A9A4;
	}
	.product-list-box>div:nth-child(4n){
		margin-right: 0px;
	}
	.product-list{
		width: 277.5px;height: 290px;
	}
	.product-list{
		margin-right: 30px;
		padding:20px 10px;
	}
	.product-del{
		right: 10px;top: 10px;width:12px;overflow: hidden;display: none
	}
	.product-del img{
		border-left:12px solid transparent;
		border-right:12px solid transparent;box-sizing: content-box;
		width: 12px; height:12px;
		margin-left: -12px;
	}
	.product-del img:hover{
		-webkit-filter:drop-shadow(-12px 0 rgb(17, 169, 164));
        filter:drop-shadow(-12px 0 rgb(17, 169, 164));
		margin-left: 0px;
	}
	.product-list a {
		color:#564f4f;
	}
	.product-list-name{
		font-weight: 400;
	}
	.product-list:hover{
		box-shadow: 0px 5px 5px rgba(0,0,0,.1);
	}

	.product-content:hover{
		color: #11A9A4 !important;
	}


	.product-content img{
		height: 100%;width:100%;
		/*width: 142px;
		margin:20px 0px 40px;*/
	}

	.del-product{
		padding:40px 75px 60px;
		width: 550px;
	}

	.input input{
		border:0px;height:100%;
	}
	.del-code{
		display: inline-block;width: 150px;flex-shrink: 0;border-left: 1px solid #d9d9d9
	}
	.my-nav:hover{
		background:#11A9A4;color:#fff;border:0px;
	}
	.modal-tips-icon{
		width:12px;
		right: -50px;
		top: -20px;
	}
	.product-content-img{
		width:130px;
		height:130px;
		margin:20px auto 20px;
		
		/*background-size: column*/
		position: relative;
		/*transition: .5s*/
	}
/*	.product-content-img:hover{
		transform: scale(1.2);
		transition: .5s
	}*/
	.product-list:hover .product-del{
		display: block
	}
	.height34{
		height:34px;line-height: 34px;
	}
	.height32{
		height:34px;line-height: 32px;
	}
	.width90px{
		width: 90px;
	}
	.console{
		height: 200px;
	}
</style>
