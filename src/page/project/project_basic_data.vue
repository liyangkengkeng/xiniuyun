<template>
  	<div class="projectData color30 ovh-x">
  		<div class='projectData-box'>
  			<div class="size22 flex jc-sb width80 marginB20">
	  			<p>{{$t('navbar.Project_information')}}</p>
	  			<p>
	  				<button type="" class="btnColor width100px height38 marginR30" @click='show=true'>{{$t('navbar.add_Product')}}</button>
	  				<button type="" class="btnColor width100px height38" @click='found_project=true'>{{$t('navbar.Edit_Project')}}</button>
	  			</p>
	  		</div>
  			<div class='project-content color86 marginB20 padding20 backgroundFFF width80 flex jc-sb al-ce'>
  				
  				<div class="">
  					<div class="color30 size18 marginB10 bold ellipsis">
	  					{{projectData.name}}
	  				</div>
  					<div class="project-name width100 flex jc-sb fd-co">
	  					<div class="marginB10 ellipsis3">
	  						{{$t('navbar.Project_description')}}：{{projectData.description}}
						</div>
	  					<div class="marginB10">{{$t('navbar.Create_Date')}}：{{projectData.create_at}}</div>
	  					<div class="flex jc-sb project-data-number size18 width100 marginT30">
			  				<p class="flex al-ce"><img class='marginR10 height22' :src="icon_overview" alt=""><span class="color">{{$t('navbar.Product')}}：{{list.length}}</span></p>
			  				<p class="flex al-ce"><img class='marginR10 width24' :src="icon_deviceManagement" alt=""><span class="color">{{$t('navbar.Device')}}：{{device_length.length}}</span></p>
			  				<p class="flex al-ce"><img class='marginR10 height20' :src="icon_dataPoint" alt=""><span class="color">{{$t('navbar.Trigger')}}：{{trigger_length.length}}</span></p>
			  			</div>
	  				</div>
  				</div>
  				<div class="app center marginR30">
  					<p><img :src="app" alt=""></p>
  					<p class="size16">{{$t('navbar.Download_Xnmatrix_App')}}</p>
  				</div>
  			</div>
  			<div class="list-box marginT30">
	  			<div class="list border-r5 backgroundFFF padding20 marginB20 flex jc-sb al-ce width80" v-for='(val,index) in list' :key='index'>
					<div class="flex calc230">
						<div class="marginR30 flex al-ce list-img"><img :src="val ? val.img : ''" alt=""> </div>
						<div class="calc120">
							<p class="size18 bold marginB10">{{$t('navbar.Product_Name')}}：&emsp;{{val ? val.name : ''}}</p>
							<p class="marginB10 ellipsis">{{$t('navbar.Product_Specs')}}：{{val ? val.description : ''}}</p>
							<p class="">{{$t('navbar.Add_Time')}}：{{val ? val.createTime : ''}}</p>
						</div>
					</div>
					<div class="operation">
						<button class="width100px height36 btnF marginR30" @click='see(val)'>{{$t('navbar.View')}}</button><button class="width100px height36 btnF" @click='del_prompt(val,index)'>{{$t('navbar.Delete')}}</button>
					</div>
	  			</div>
	  		</div>
  		</div>
  		<!-- 模态框 -->
		<div class="modal" v-if='show' @click.self='show=false'>
			<div class="product-box">
				<div class="width100 colorFFF background11 product-more-header size22 bold border-r5 flex al-ce jc-sb">
					<span>{{$t('navbar.Product_List')}}</span>
					<p class="modal_del"><img :src="modal_del" alt="" @click='show=false' class="cp"></p>
				</div>
				<div class="backgroundFFF flex fw-wrap product-list-box padding20">
					<div v-if='product_list_more.length<1' class='empty no-data'>
			  			<img :src="no_data" alt=""> 
			  			{{$t('navbar.No_product_yet')}}
			  		</div>
					<label class="marginB10" v-for='val in product_list_more'><input type="checkbox" name="" :value="val" v-model='product_id_arr'>{{val.name}}</label>
				</div>
				<div class="backgroundFFF center padding20">
					<button type="" class="width100px btnColor height38" @click='relevance'>{{$t('navbar.link')}}</button>
				</div>
			</div>
		</div>
		<div class="modal" v-if='found_project' @click.self='found_project=false'>
			<found-project :projectData='projectData' :edit='true' @sonProject='sonProject'></found-project>
		</div>
  	</div>
</template>

<script>
import FoundProject from '@/components/found-project'
	export default {
	    data(){
			return {
				app:require('@/assets/img/xnAPP.png'),
				icon_overview:require('@/assets/img/overview.png'),
				icon_deviceManagement:require('@/assets/img/device-management.png'),
				icon_file:require('@/assets/img/file.png'),
				icon_dataPoint:require('@/assets/img/data-point.png'),
				// projectData:{},//项目详情
				img:require('@/assets/img/sensor1.png'),
				device:require('@/assets/img/device-list-img.png'),
				update:require('@/assets/img/update-icon.png'),
				del:require('@/assets/img/del-ash-icon.png'),
				modal_del:require('@/assets/img/x-icon.png'),
				dataIMG:require('@/assets/img/data-icon.png'),
				update_prompt:false, //更新提示框
				product_list_more:'',//所有产品列表
				show:false,
				product_id_arr:[],
				found_project:false,//编辑项目弹框
				no_data:require('@/assets/img/no-data.png'),
				list:[],
				lang_show:true,
				projectData:{}
			}
		},
		created(){
			// this.project()
			var self=this
			self.product_list_more=[]
			self.ajax({
				scope_token:localStorage.getItem('access_token'),
				mode:'get',
	            url:'v1/models/',
	            data:{},
	            success(res){
	            	for(let i=0;i<res.data.data.length;i++){
	            		var flag=true
	            		for(let j=0;j<self.list.length;j++){
	            			if(self.list[j]._id==res.data.data[i]._id){
	            				flag=false
	            			}
	            		}
	            		if(flag){
	            			self.product_list_more.push(res.data.data[i])
	            		}
	            	}
	            }
			})
			self.project()
    	},
		computed: {
			project_id(){
				return this.$store.state.projectID
			},
			device_length(){
				return this.$store.getters.project_device_list
			},
			trigger_length(){
				return this.$store.getters.trigger_list
			},
			// list(){//产品列表
			// 	return this.$store.getters.project_product_list
			// },
			// projectData(){
			// 	return this.$store.getters.project_data
			// },
			lists(){
				return this.$store.getters.project_product_list
			},
			lang(){
				return this.$i18n.locale
			}
		},
		methods: {
			project(){//获取项目详情
				var self=this
				this.ajax({
					scope_token:localStorage.getItem('access_token'),
					url:'v1/projects/'+self.project_id+'/',
					mode:'GET',
					data:{},
					success(res){
						res.data.data.create_at=self.$time_stamp(res.data.data.create_at)
						self.projectData=res.data.data
						self.$store.commit('SENSOR0',0)
						self.$store.commit('PROJECT_DATA',res.data.data)
					}
				})
			},
			del_prompt(val,index){//移除关联产品
				var self=this
				self.ajax({
        			scope_token:localStorage.getItem('access_token'),
        			mode:'get',
	                url:'v1/devices/?model_id='+val._id,
	                data:{},
	                success(res){
	                	if(res.data.data.length<1){
	                		self.$prompt.center(self.$t('navbar.Devie_and_data_point_information'),{
					        	hid(){},
					        	confirm(){
					        		var _this=this
					        		self.ajax({
					        			scope_token:localStorage.getItem('access_token'),
					        			mode:'DELETE',
						                url:'v1/models/'+val._id+'/associate/project/'+self.$store.getters.projectID,
						                data:{},
						                success(res){
						                	self.list.splice(index,1)
						                	_this.hid()
						                	self.$success.center(self.$t('navbar.The_linkage_is_successfully_removed'))
						                	self.producer_list()
						                }
					        		})
					        	},
					        	cancel(){
					        		this.hid()
					        	},
					        });
	                	}else{
	                		self.$violate.center(self.$t('navbar.a61'))
	                	}
	                }
        		})
				
			},
			relevance(){
				var self=this
				for(let i=0;i<self.product_id_arr.length;i++){
					self.ajax({
	        			scope_token:localStorage.getItem('access_token'),
	        			mode:'post',
		                url:'v1/models/'+self.product_id_arr[i]._id+'/associate/project/'+self.$store.getters.projectID+'/',
		                data:{},
		                success(res){
		                	self.list.unshift(self.product_id_arr[i])
		                	for(let a=0;a<self.product_list_more.length;a++){
		                		if(self.product_list_more[a]._id==self.product_id_arr[i]._id){
		                			self.product_list_more.splice(a,1)
		                		}
		                	}
		                	self.$success.center(self.$t('navbar.Linkage_successful'))
		                	self.show=false
		                	self.producer_list()
		                }
	        		})
				}
			},
			producer_list(){//产品列表
				var self=this
				this.ajax({
					scope_token:localStorage.getItem('access_token'),
					url:'v1/models/associate/project/'+self.$store.getters.projectID,
					mode:'GET',
					data:{},
					success(res){
						for(var i=0;i<res.data.data.length;i++){
							res.data.data[i].createTime=self.$time_stamp(res.data.data[i].createTime)
							res.data.data[i].publicDate=self.$time_stamp(res.data.data[i].publicDate)
						}
						// self.$store.state.project_product_list=res.data.data
						self.$store.commit('PROJECT_PRODUCT_LIST',res.data.data)
					}
				})
			},
			see(val){
				this.$router.push({path:'/personal',query:{id:val._id}})
			},
			sonProject(val){
				var self=this
				this.found_project=false
				this.ajax({
					scope_token:localStorage.getItem('access_token'),
					url:'v1/projects/'+self.$store.state.projectID+'/',
					mode:'GET',
					data:{},
					success(res){
						res.data.data.create_at=self.$time_stamp(res.data.data.create_at)
						self.$store.commit('PROJECT_DATA',res.data.data)
					}
				})
			},
		},
		watch: {
			lists:{
				handler(val){
					this.list=JSON.parse(JSON.stringify(val))
					for(let i=0;i<val.length;i++){
						if(val[i]){
							var self=this,bind
							bind = self.lang_show ? val[i].skuNo : val[i].bindSkuNo
							this.ajax({ 
							    mode:'GET',
							    goods:true,
							    url:'shop/goods/infoBySkuNo/'+bind,
							    data:{
							    	body:{}
							    },
							    success(res){
							    	if(res.data.code==1000){
							    		val[i].img=res.data.goods.image1
							    		self.list.splice(i,1,val[i])
							    	}					    	
							    }
							})
						}
					}
				},
				immediate:true
			},
			lang(val){
				this.lang_show=!this.lang_show
			}
		},
		components: {
    		FoundProject
    	},
	}
</script>

<style scoped>

	.edit-project-data{
		text-decoration: underline;
	}
	.project-data-number img{
		width: 22px;height: 20px;
	}
	.project-data-echart .btn1{
		width: 120px;
	}
	
	.project-data-number .width24{
		width: 26px;height: 24px;
	}
	.project-data-number .height22{
		height: 22px;
	}
	.project-data-number .height24{
		height: 24px;
	}
	.project-data-number .height20{
		height: 20px;
	}
	.app{
		width: 140px;flex-shrink: 0
	}
	.app img{
		width:120px;
	}
	.project-name{
		margin-right: 100px;
	}
	.list-img img{
		width:90px;
	}
	.device-img{
		width: 68px;height: 60px;
	}
	.device-img img{
		width: 100%;height: 100%;
	}
	.btn-icon img{
		width: 20px;height: 20px;
	}
	.data-img-icon{
		width: 17px;height: 14px;
	}
	.data-img-icon img{
		width: 100%;height: 100%;
	}
	.state{
		width: 100px;height: 60px;
		padding-top: 5px;
		background:rgba(17,169,164,.15);
		bottom: -20px;right: -40px;
		transform: rotate(-45deg);
	}
	.no{
		width: 100px;height: 60px;
		padding-top: 5px;
		background:rgba(131,131,131,.25);
		color:#8E8D8D;
		transform: rotate(-45deg);
		bottom: -20px;right: -40px;
	}

	.prompt{
		width: 530px;
		height: 340px;
		padding:39px 51px 43px;
	}
	.prompt-content{
		margin:58px 0px 77px;padding:0px 30px;
	}
	.prompt .btn{
		height: 48px;line-height: 48px;
	}
	.name{
		max-width: 135px;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}
	.product-more-header{
		padding: 22px 50px;
	}
	.product-more-header img{
		width:22px;
	}
	.product-box{
		width:840px;height: 500px;
		position: absolute;left: 0px;top: 0px;right: 0px;bottom: 0px;margin:auto;
	}
	.product-list-box{
		height: 350px;
		overflow-y: auto;
	}
	.product-list-box label{
		width:200px;
	}

	.modal_del{
		width: 22px;height: 22px;overflow: hidden;
	}
	.modal_del img{
		display: block;
		width: 22px;
		box-sizing: content-box;
		border-left: 22px solid transparent;
		border-right: 22px solid transparent;
		-webkit-filter:drop-shadow(-22px 0 rgb(255, 255, 255));
        filter:drop-shadow(-22px 0 rgb(255, 255, 255));
	}
	.no-data img{
		margin-top: 100px;
	}
	.operation{
		width: 230px;flex-shrink: 0
	}
	.calc230{
		width: calc(100% - 230px )
	}
	.calc120{
		width: calc(100% - 120px )
	}
</style>
