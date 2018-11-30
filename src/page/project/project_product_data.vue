<template>
  	<div class="backgroundF8 pr color30">
  		<div class="size22 flex jc-sb width80">
  			<p>{{$t('navbar.Product_Information')}}</p>
  			<p><button type="" class="btnColor width100px height38" @click='show=true'>{{$t('navbar.Add')}}</button></p>
  		</div>
  		<div class="list-box marginT30">
  			<div class="list border-r5 backgroundFFF padding20 marginB20 flex jc-sb al-ce width80" v-for='(val,index) in list' :key='index'>
				<div class="flex">
					<div class="marginR30 flex al-ce list-img"><img :src="img" alt=""> </div>
					<div>
						<p class="size18 bold marginB10">{{$t('navbar.Product_name')}}：&emsp;{{val.name}}</p>
						<p class="marginB10">{{$t('navbar.Product_Specs')}}：Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod</p>
						<p class="">{{$t('navbar.Add_Time')}}：{{val.createTime}}</p>
					</div>
				</div>
				<div>
					<button class="width100px height36 btnF marginR30" @click='see(val)'>{{$t('navbar.View')}}</button><button class="width100px height36 btnF" @click='del_prompt(val,index)'>{{$t('navbar.Delete')}}</button>
				</div>
  			</div>
  		</div>
  		<!-- 模态框 -->
		<div class="modal" v-if='show' @click.self='show=false'>
			<div class="product-box">
				<div class="width100 colorFFF background11 product-more-header size22 bold border-r5 flex al-ce jc-sb">
					<span>{{$t('navbar.Product_List')}}</span>
					<img :src="modal_del" alt="" @click='show=false'>
				</div>
				<div class="backgroundFFF flex fw-wrap product-list-box padding20">
					<label class="marginB10" v-for='val in product_list_more'><input type="checkbox" name="" :value="val" v-model='product_id_arr'>{{val.name}}</label>
				</div>
				<div class="backgroundFFF center padding20">
					<button type="" class="width100px btnColor height38" @click='relevance'>{{$t('navbar.link')}}</button>
				</div>
			</div>
		</div>
  		
  	</div>
</template>

<script>
	export default {
	    data(){
			return {
				img:require('@/assets/img/sensor1.png'),
				device:require('@/assets/img/device-list-img.png'),
				update:require('@/assets/img/update-icon.png'),
				del:require('@/assets/img/del-ash-icon.png'),
				modal_del:require('@/assets/img/x-icon.png'),
				dataIMG:require('@/assets/img/data-icon.png'),
				update_prompt:false, //更新提示框
				product_list_more:'',//所有产品列表
				show:false,
				product_id_arr:[]
			}
		},
		created(){
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
    	},
		computed: {
			project_id(){
				return this.$store.getters.projectID
			},
			list(){//产品列表
				return this.$store.getters.project_product_list
			}
		},
		methods: {
			del_prompt(val,index){//移除关联产品
				var self=this
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
			                }
		        		})
		        		
		        	},
		        	cancel(){
		        		this.hid()
		        	},
		        });
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
		                }
	        		})
				}
			},
			see(val){
				this.$router.push({path:'/personal',query:{id:val._id}})
			}
		},
		watch: {
		},
	}
</script>

<style scoped>
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
		width:840px;
	}
	.product-list-box label{
		width:200px;
	}
</style>
