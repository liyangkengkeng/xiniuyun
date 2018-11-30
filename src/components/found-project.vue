<template>
		<div class='found-project backgroundFFF'>
			<div class="found-project-header center color86 size16">
				<template v-if='edit'>
					<span class="edit colorFFF background11 paddingLR20">{{$t('navbar.Edit_Project')}}</span>
				</template>
				<template v-else>
					<span :class="{step:!step2}">{{$t('navbar.Step')}}1</span><span :class="{step:step2}">{{$t('navbar.Step')}}2</span>
				</template>
				
			</div>
			<div class='padding40 found-project-content1' v-if='!step2'>
				<div v-if='productList.length<1' class='foundProduct flex al-ce jc-ce height568 pr'>
					<router-link to='/foundProduct' class='btnColor width120px height40'>{{$t('navbar.Create')}}</router-link>	
					<button type="" class="btnF width120px height38 marginR40 pa foundProduct-btn" @click='cancel'>{{$t('navbar.Cancel')}}</button>
				</div>
				<div v-else>
					<div class="flex al-ce size18 marginT20">
						<span class="found-input-name color30 must">{{$t('navbar.Project_Name')}}</span>
						<input class="width100 border border-r5 input" type="" name="" :placeholder="$t('navbar.Enter_the_name')" v-model='project_name' minlength="2" maxlength="12">
					</div>
					<div class="flex al-ce size18 marginT20">
						<span class="found-input-name color30 must">{{$t('navbar.describe')}}</span>
						<input class="width100 border border-r5 input" type="" name="" :placeholder="$t('navbar.Within_200_words')" maxlength="200" v-model='project_describe'>
					</div>
					<div class="flex marginT20">
		  				<div class="color30  found-input-name must">{{$t('navbar.Select_product_Icon')}}</div>
		  				<div class="border icon-box flex">
		  					<div v-for='index in 37' class="border icon margin5 center border-r5 pr" @click='icon_state(icon[index],index)'>
		  						<p v-if='icon[index]'><img :src="icon[index].url" alt="" class='cp' ></p>
		  						<div class="pa width100 height100 flex jc-ce al-ce status" v-show='icon[index] && icon[index].choice'>
		  							<img :src="tick" alt="">
		  						</div>
		  					</div>
		  				</div>
		  			</div>
					<!-- <div class="marginT20 flex" v-if='!edit'>
						<span class="found-input-name color30"></span>
						<label class=" flex al-ce jc-ce"><input type="checkbox" class="" name="" value="" v-model='project_protocol'>{{$t('navbar.Reading_protocol')}}</label>
					</div> -->
					<div class="next-step center marginTB20">
						<template v-if='edit'>
							<button type="" class="btnColor width200px height48" @click='sub'>{{$t('navbar.Save')}}</button>
						</template>
						<template v-else>
							<button type="" class="btnF width120px height38 marginR40" @click='cancel'>{{$t('navbar.Cancel')}}</button>
							<button type="" class="btnColor width120px height40" @click='next_step'>{{$t('navbar.Next_step')}}</button>
						</template>
						
					</div>
				</div>
				
			</div>
			<div class='found-project-content2' v-else>
				<div class="size22 bold marginB20">
					{{$t('navbar.select_product')}}
				</div>
				<div class="release-products-box flex fw-wrap jc-sb">
					<div class="release-products pr border-r5 border padding10 marginB20 ovh" @click='correlation(val,key,"public")' v-for='(val,key) in productList' :key='key'>
						<div class="product-content">
				  			<p class="center product-content-img" :style='{backgroundImage:product_img}'><!-- <img :src="product_img" alt=""> --></p>
					  		<p class="size18 marginB10  product-list-name ellipsis">{{val.name}}</p>
					  		<p class="size14 product-list-des ellipsis2">{{val.description}}</p>
				  		</div>
				  		<div class="flex jc-ce al-ce width100 pa select-state" v-show='val.state'>
							<img :src="tick" alt="">
						</div>
					</div>
				</div>
				<div class="flex found-project-btn jc-ce marginTB20">
					<button class="btnF width120px height36 marginR40" @click='step2=false'>{{$t('navbar.Last_Step')}}</button><button class="btnColor width120px height38" @click='son'>{{$t('navbar.Confirm_Create')}}</button>
				</div>
			</div>
		</div>
</template>

<script>
	
	export default {
		name:'foundProject',
		props:{
			binding:{default:false},
			edit:{default:false},
			productList:{
				type: Array,
				default() {
				    return []
				}
			},
			checked_arr:{
				type: Array,
				default() {
				    return []
				}
			},
			projectData:{
				type: Object,
				default() {
				    return {}
				}
			}
		},
		// props:['binding','productList','checked_arr'],
	    data(){
			return {
				product_img:'url('+require('@/assets/img/product-list-img.png')+')',
				img:require('@/assets/img/project building.png'),
				device:require('@/assets/img/device-img.png'),
				data_icon:require('@/assets/img/data-icon.png'),
				tick:require('@/assets/img/tick.png'),
				project_name:'',
				project_describe:'',
				project_protocol:'',
				step2:false,
				// private_product_list:[], //未发布
				// public_product_list:[],  //已发布
				// checked_arr:[],//选中的产品
				tick:require('@/assets/img/tick.png'),
				image:'',//选择的项目图片
				icon:[
					{choice:false,url:require('@/assets/img/product-icon1.png')},
					{choice:false,url:require('@/assets/img/product-icon2.png')},
					{choice:false,url:require('@/assets/img/product-icon3.png')},
					{choice:false,url:require('@/assets/img/product-icon4.png')},
					{choice:false,url:require('@/assets/img/product-icon5.png')},
					{choice:false,url:require('@/assets/img/product-icon6.png')},
					{choice:false,url:require('@/assets/img/product-icon7.png')},
					{choice:false,url:require('@/assets/img/product-icon8.png')},
					{choice:false,url:require('@/assets/img/product-icon9.png')},
					{choice:false,url:require('@/assets/img/product-icon10.png')},
					{choice:false,url:require('@/assets/img/product-icon11.png')},
					{choice:false,url:require('@/assets/img/product-icon12.png')},
					{choice:false,url:require('@/assets/img/product-icon13.png')},
					{choice:false,url:require('@/assets/img/product-icon14.png')},
					{choice:false,url:require('@/assets/img/product-icon15.png')},
					{choice:false,url:require('@/assets/img/product-icon16.png')},
					{choice:false,url:require('@/assets/img/product-icon17.png')},
					{choice:false,url:require('@/assets/img/product-icon18.png')},
					{choice:false,url:require('@/assets/img/product-icon19.png')},
					{choice:false,url:require('@/assets/img/product-icon20.png')},
					{choice:false,url:require('@/assets/img/product-icon21.png')},
					{choice:false,url:require('@/assets/img/product-icon22.png')},
					{choice:false,url:require('@/assets/img/product-icon23.png')},
					{choice:false,url:require('@/assets/img/product-icon24.png')},
					{choice:false,url:require('@/assets/img/product-icon25.png')},
					{choice:false,url:require('@/assets/img/product-icon26.png')},
					{choice:false,url:require('@/assets/img/product-icon27.png')},
					{choice:false,url:require('@/assets/img/product-icon28.png')},
					{choice:false,url:require('@/assets/img/product-icon29.png')},
					{choice:false,url:require('@/assets/img/product-icon30.png')},
					{choice:false,url:require('@/assets/img/product-icon31.png')},
					{choice:false,url:require('@/assets/img/product-icon32.png')},
					{choice:false,url:require('@/assets/img/product-icon33.png')},
					{choice:false,url:require('@/assets/img/product-icon34.png')},
					{choice:false,url:require('@/assets/img/product-icon35.png')},
					{choice:false,url:require('@/assets/img/product-icon36.png')},
					{choice:false,url:require('@/assets/img/product-icon37.png')},
					{choice:false,url:require('@/assets/img/product-icon38.png')},
				],
				productLists:[]
			}
		},
		created(){
			if(this.edit){
				this.project_name=this.projectData.name
				this.project_describe=this.projectData.description
				if(this.projectData.image_name){
					var obj=this.icon[Number(this.projectData.image_name)-1]
					obj.choice=true
					this.icon.splice(this.projectData.image_name-1,1,obj)
				}
			}
		},
		methods: {
			next_step(){
				var self=this
				if(self.project_name && self.project_describe && self.image){
					if(self.project_name.length<2){
						self.$violate.center(self.$t('navbar.Length_less_than'))
						return false
					}
					this.step2=true
				}else{
					self.$violate.center(self.$t('navbar.Please_fill_the_form'))
				}
			},
			cancel(){
				this.$emit('cancel',false)
			},
			correlation(val,key,arr){//选中产品
				var state=val
				state.state=!val.state
				this.productList.splice(key,1,state)
				if(state.state){
					this.checked_arr.push(state._id)
				}
			},
			son(){
				var self=this
				self.ajax({
					mode:'post',
	                url:'v1/projects/',
	                data:{
	                	name:self.project_name,
	                	domain_id:localStorage.getItem('domain_id'),
	                	description:self.project_describe,
	                	image_name:self.image
	                },
	                success(res){
	                	self.addUser(res.data.data.id)
	                }
				})	
			},
			addUser(id){//添加项目成员  自己
				var self=this
				self.ajax({ 
            	 	mode:'post',
            		url:'v1/projects/'+id+'/users/',
            		data:[localStorage.getItem('userId')],
            		success(ress){
            			self.step2=true
            			for(var i=0;i<self.checked_arr.length;i++){
							self.ajax({
								mode:'post',
				                url:'v1/models/'+self.checked_arr[i]+'/associate/project/'+id+'/',
				                data:{a:1,b:2},
				                success(res){
				                	 self.$emit("sonProject",id); //组件是否隐藏
				                	 // self.$success.center('创建成功')
				                }
							})
						}
            		}
            	 })
			},
			icon_state(val,index){ //选择的图片
				if(index<this.icon.length){
					var choice=val.choice
					for(var i=0;i<this.icon.length;i++){
						this.icon[i].choice=false
					}
					var obj=val
					obj.choice=!choice
					this.icon.splice(index,1,obj)
					this.image=(index+1)
				}
			},
			sub(){
				var self=this
				self.ajax({
					mode:'PUT',
	                url:'v1/projects/'+self.projectData.id+'/',
	                data:{
	                	name:self.project_name,
	                	description:self.project_describe,
	                	image_name:self.image
	                },
	                success(res){
	                	self.$success.center(self.$t('navbar.Change_successful'))
	                	self.$emit("sonProject",self.projectData.id);
	                }
				})	
			}
		},
		computed:{
			
		},
		watch:{
			
		}
	}
</script>

<style scoped>
	.input{
		height: 48px;
	}
	.found-project{
		position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%)
	}
	.found-project-header span{
		display: inline-block;
		width: 50%;
		border-bottom: 2px solid #a0a0a0;
		background:#eee;
		height: 48px;
		line-height: 48px;
	}
	.found-project-header .step{
		color:#11A9A4;
		background:#fff;
		border-bottom-color:#11A9A4 
	}
	.found-project-header .edit{
		background:#11A9A4;
		border:0px;
		width: 100%
	}
	.found-project-content1{
		width: 682px;
	}
	.found-project-content2{
		width: 925px;
		padding:40px;
		height: 666px;
	}
	.found-project-content1 img{
		width: 100%;height: 120px;display: block;
	}
	.found-input-name{
		display: inline-block;
		width: 150px;
		flex-shrink: 0
	}

	.release-products-box{
		height: 456px;
		overflow-y: scroll;
	}
	.release-products{
		width: 400px;height: 316px;
	}
	.release-products-img img{ 
		width: 65px;height: 65px;
	}
	.data_icon img{
		width: 17px;height: 17px;
	}
	.release{
		width: 100px;height: 60px;
		padding-top: 5px;
		background:rgba(17,169,164,.15);
		bottom: -20px;right: -40px;
		transform: rotate(-45deg);
	}

	.select-state{
		height: 100%;left: 0px;top: 0px;background:rgba(0,0,0,.2);
	}
	.select-state img{
		width: 100px;height: 72px;
	}

	.no{
		width: 105px;height: 105px;
		padding-top: 5px;
		background:rgba(131,131,131,.25);
		color:#8E8D8D;
		transform: rotate(-45deg);
		right: -55px;
		bottom: -55px;
	}
	.name{
		max-width: 99px;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}
	.product-content-img{
		width:160px;
		height:160px;
		margin:20px auto 40px;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		/*background-size: column*/
		position: relative;
		transition: .5s
	}

	.icon-box{
		flex-wrap: wrap;width: 500px;
	}
	.icon{
		display: inline-block;
		height: 40px;
		width: 40px;
		/*line-height: 40px;*/
		padding: 5px;
	}
	.icon img{
		width: 100%;height: 100%;
	}
	.icon  .svg-icon{
		width: 30px;height: 30px;
		top: -10px;
		right: -10px;
	}
	.status{
		left: 0px;top: 0px;background:rgba(0,0,0,.3);
	}
	.status img{
		width:60%;height: 42%;
	}
	.foundProduct{
		width: 100%;height: 100%;padding-bottom: 40px;
	}
	.height568{
		height: 568px;
	}
	.foundProduct-btn{
		bottom: 0px;
		left: 50%;
		transform: translate(-50%, 0px)
	}
</style>
