<template>
  	<div class="project_device_data" v-if='device==="index"'>
  		<div class="size22 width80">
  			{{$t('navbar.Device_information')}}
  		</div>
  		<div class="query-box flex jc-sb al-ce size16 marginT20 width80">
  			<div class="flex">
  				<p class="queryID">
  					<input class="center paddingLR20 marginR20" type="" name="" :placeholder="$t('navbar.Query_by_device_ID')" v-model='queryID'>
  				</p>
	  			<!-- <p class="query-select">
	  				<select name="" class="paddingLR20 marginR20" v-model='product_id'>
	  					<option value="">{{$t('navbar.select_product')}}</option>
	  					<option v-for='val in product_list' :value="val._id">{{val.name}}</option>}
	  				</select>
	  			</p> -->
  			</div>
  			<div class="flex">
  				<p class="btnColor width100px height38 marginR20 size14" @click='query'>{{$t('navbar.Query')}}</p>
  				<template v-if='guide_show'>
  					<router-link to='project_device_data_add' class='btnColor width100px height38 marginR20 size14 pr add-device'>{{$t('navbar.Add_devcie')}}</router-link>
  					<div class="guide pf" v-if='guide_show'>
  						<img :src="guide" alt="" class="pa">
  					</div>
  				</template>
  				<template v-else>
  					<router-link to='project_device_data_add' class='btnColor width100px height38 marginR20 size14 pr '>{{$t('navbar.Add_devcie')}}</router-link>
  				</template>
  			</div>
  		</div>
  		<!-- <div class="flex  width80"> -->
  			<!-- <p class="flex border border-r5 ovh condition marginT20"> -->
  				<!-- <button class="width120px height30 cp" v-if='device_list.length>0' :class='condition==0 ? "background11 colorFFF":"backgroundFFF"' @click='condition_switch'>{{$t('navbar.All_devices')}}</button> -->
	  			<!-- <button class="width120px height30" :class='condition==1 ? "background11 colorFFF":"backgroundFFF"' @click='condition_switch(1)'>连接设备</button> -->
	  			<!-- <button class="width120px height30" :class='condition==2 ? "background11 colorFFF":"backgroundFFF"' @click='condition_switch(2)'>离线设备</button> -->
	  			<!-- <button class="width120px height30" :class='condition==3 ? "background11 colorFFF":"backgroundFFF"' @click='condition_switch(3)'>未激活设备</button> -->
  			<!-- </p> -->
  		<!-- </div> -->
  		<div class='flex width80 marginT20'>
  			<button class="paddingLR20 height30 cp" :class='condition==0 ? "background11 colorFFF":"backgroundFFF"' @click='condition_switch'>{{$t('navbar.All_devices')}}</button>
  			
  		</div>
  		<div class="width80">
  			<div class="list-box marginT30">
  				<div :style='{marginTop:margintop}' class="pagingTrans color86">
  					<div class="center no-data" v-if='queryARR.length<1'>
						<img :src="no_data" alt=""> 
						<span>{{$t('navbar.No_device_yet')}}</span>
					</div>
					<div class="flex data-list backgroundFFF pr jc-sb al-ce size16 ovh marginB20" v-for='(val,index) in queryARR' :key='index'>
						<div class="flex">
							<div class="data-list-img flex al-ce marginR20 backgroundImage" :style='{backgroundImage:val.image ? "url("+val.image+")" : "url("+img+")"}'> 
  							<!-- <img :src="img" alt=""> -->
  						</div>
  						<div>
  							<div class="size18 color54 bold marginB10">
  								DID:{{val.DID}}
  							</div>
  							<div class="flex">
  								<div class="marginR20">
  									<!-- <p class="marginB10">型号：xxxxxxxxxxxx</p> -->
  									<p class="marginB10">{{$t('navbar.Linked_Product')}}：{{val.model_name}}</p>
  									<p>{{$t('navbar.Device_Name')}}：{{val.name}}</p>
  								</div>
  								<div class="marginR20">
  									<p class="marginB10">{{$t('navbar.Create_Date')}}：{{val.create_at}}</p>
	  								<p>DUID：{{val._id}}</p>
  								</div>
  								<div class="flex al-fe">
  									<p>KEY：{{val.KEY}}</p>
  								</div>
  							</div>
  						</div>
						</div>
					<div class='del-device flex al-ce'>
						<button type="" class="btnF width100px height28 marginR20" @click='jump($event,val)'>{{$t('navbar.View')}}</button>
						<button type="" class="btnF width100px height28" @click='del_device(val,index)'>{{$t('navbar.Delete')}}</button>
					</div>
						<!-- <div class="pa size12" :class='val.status==="online" ? "data-state" : "off-line"'> -->
							<!-- <span>在线</span> -->
						<!-- </div> -->
					</div>
  				</div>
  			</div>
			<div class="flex page jc-ce marginT20" v-if='total>4'>
				<!-- <button class="btn86 width400px height46" @click='paging(true)'>{{$t('navbar.Last_Page')}}</button><button class="btn86 width400px height46" @click='paging(false)'>{{$t('navbar.Next_Page')}}</button> -->
				<v-pagination :total="total" :display='display' :current-page='current' @pagechange="pagechange"></v-pagination>
			</div>
  		</div>
  	</div>
</template>

<script>
import pagination from '@/components/page'
	export default {
	    data(){
			return {
				img:require('@/assets/img/sensor1.png'),
				device:"index",    //设备详情
				page:0,
				margintop:0,
				device_list:[],//设备列表
				queryID:null,//设备查询id
				queryARR:[],
				product_id:'',
				condition:0,//快速赛选条件
				no_data:require('@/assets/img/no-data.png'),
				guide:require('@/assets/img/guide-icon.png'),
				guide_show:false, //是否显示引导
				lang_show:true,
				tag_list:[],
				current:1,//当前页数
				display:4,//每页显示数量
				total:0,//总条数
			}
		},
		created(){
			if(this.isDeviceList){
				this.deviceList()
			}
		},
		mounted(){
			// var self=this
			// setTimeout(function(){
			// 	self.queryID=''
			// },500)
			
		},
		methods: {
			deviceList(val=localStorage.getItem('scope_token')){//设备列表
				var self=this
				self.device_list=[]
				self.queryARR=[]
				self.ajax({
					scope_token:val,
					mode:'get',
					url:'v1/devices/?page='+self.current+'&pagesize='+self.display,
					data:{},
					success(res){
						self.total=res.data.total
						for(let i=0;i<res.data.data.length;i++){
							res.data.data[i].create_at=self.$time_stamp(res.data.data[i].create_at)
							res.data.data[i].update_at=self.$time_stamp(res.data.data[i].update_at)
							self.producer_list(res.data.data[i],i)
							self.tag(res.data.data[i]._id)
							res.data.data[i].image=self.img
						}
						self.device_list=res.data.data
						self.queryARR=res.data.data
						self.$store.commit('PROJECT_DEVICE_LIST',res.data.data)
						if(res.data.data.length<1){
							self.$prompt.center(self.$t('navbar.a39'),{
					        	hid(){},
					        	confirm(){
					        		self.guide_show=true
					        		this.hid()
					        	},
					        	cancel(){this.hid()},
					        });
						}
						setTimeout(function(){
							self.queryID=''
						},500)
					}
				})
			},
			query(){//查询设备
				var self=this
				self.queryARR=[]
				self.ajax({
					scope_token:localStorage.getItem('scope_token'),
					mode:'get',
					url:'v1/devices/sn/'+self.queryID+'/',
					data:{},
					success(res){
						self.queryARR=self.queryARR.concat(res.data.data)
						self.producer_list(res.data.data)
						setTimeout(function(){
							self.queryID=''
						},500)
					}
				})
			},
			del_device(val,index){//删除设备
				var self=this
				this.$prompt.center(self.$t('navbar.Do_you_want_to_delete_this_device'),{
		        	hid(){},
		        	confirm(){
		        		var _this=this
		        		self.ajax({
							scope_token:localStorage.getItem('scope_token'),
							mode:'DELETE',
							url:'v1/devices/'+val._id+'/',
							data:{},
							success(res){
								_this.hid()
								self.$success.center(self.$t('navbar.Delete_successful'))
								self.queryARR.splice(index,1)
							}
						})
		        	},
		        	cancel(){this.hid()},
		        });
			},
			jump(e,val){
				if(e.target.localName!=='img'){
					this.$router.push({path:"project_device_data_details",query:{deviceDetails:JSON.stringify(val)}})
				}
			},
			goods(id,val,i){
				var self=this
				if(id){
					this.axios.get(GOODSURL+'shop/goods/infoBySkuNo/'+id,{
						headers:{'Content-Type': 'application/x-www-form-urlencoded'}
					})
	                .then(function (response) {
	                    if(response.data.code==1000){
							var objec=val
							objec.image=response.data.goods.image1
		    				self.device_list.splice(i,1,objec)
							self.queryARR.splice(i,1,objec)
				    	}
	                })
	                .catch(function (response) {
	                })
				}
			},
			producer_list(obj,i){//产品列表
				var self=this
				this.ajax({
					scope_token:localStorage.getItem('access_token'),
					url:'v1/models/associate/project/'+localStorage.getItem('projectID'),
					mode:'GET',
					data:{},
					success(res){
						for(var i=0;i<res.data.data.length;i++){
							res.data.data[i].createTime=self.$time_stamp(res.data.data[i].createTime)
							res.data.data[i].publicDate=self.$time_stamp(res.data.data[i].publicDate)
							if(obj.model_id===res.data.data[i]._id){
								obj.model_name=res.data.data[i].name
								var id= self.lang_show ? res.data.data[i].skuNo : res.data.data[i].bindSkuNo
								self.goods(id,obj,i)
							}
						}
					}
				})
			},
			condition_switch(){//全部设备
				this.current=1
				this.deviceList()
			},
			tag(id){
				this.ajax({
					scope_token:localStorage.getItem('scope_token'),
					mode:'get',
					url:'v1/devices/'+id+'/tags/',
					data:{},
					success(res){
						// console.log(res)
					}
				})
			},
			pagechange(page){/*翻页*/
            	this.current=page
            	this.deviceList()
            }
		},
		computed:{
			project_id(){
				return this.$store.state.projectID
			},
			isDeviceList(){
				return this.$store.state.isDeviceList
			},
			product_list(){
				return this.$store.state.project_product_list
			},
			lang(){
				return this.$i18n.locale
			},
			access_token(){
				return this.$store.state.access_token
			}
		},
		watch:{
			project_id(val){
				if(val){
					this.deviceList()
				}
			},
			lang(val){
				this.lang_show=!this.lang_show
				this.deviceList()
			},
			access_token(val){
				this.deviceList(val)
				this.$store.commit('IS_DEVICELIST',1)
			}
		},
		components: {
	      'v-pagination': pagination,
	    }
	}
</script>

<style scoped>
	.queryID{
		height: 40px;
	}
	.queryID input{
		height: 100%;
		width:300px;
	}
	.query-select{
		height: 40px;
	}
	.query-select select{
		height: 100%;
	}
	
	.page button:first-child{
		margin-right: 96px;
	}
	.data-list{
		padding: 10px 38px;
	}
	/*.data-list>div{
		margin-right: 66px;
	}
	.data-list>div:last-child{
		margin-left: 50px;
	}*/
	.data-list-img{
		width: 80px;height:80px;
	}
	.label{
		padding: 5px;
		margin-left: 16px
	}
	.data-state,.off-line{
		right: 60px;bottom: 0px;
	}
	.data-state::after{
		content: '\5728\7EBF';
	    padding: 5px 30px 20px;
	    width: 50px;
	    background:rgba(17,169,164,.15);
	    color:#11A9A4;
	    transform: rotate(-45deg);
	    right: -116px;
	    bottom: 0px;
	    position: absolute;
		/*position: absolute;*/
	}
	.off-line::after{
		content:'不在线';
	    padding: 5px 30px 20px;
	    width: 50px;
	    background: rgba(179,143,88,.25);
	    color: #B99259;
	    transform: rotate(-45deg);
	    right: -116px;
	    bottom: 0px;
	    position: absolute;
	}

	.list-box{
		height: 508px;
		overflow: hidden;
	}
	.width300{
		width: 250px;
	}

	.del-device{
		
		right: 0px;top: 0px;
	}
	.del-device img{
		width: 25px;height:25px;
	}
	

	.condition button{
		border:0px;
		border-radius: 0px;
		/*border-right: 1px solid #d9d9d9;*/
	}
	/*.condition button:last-child{
		border-right: 0px;
	}*/
	.no-data img{
		margin-top: 180px;
	}
	.guide{
		width: 100vw;min-height: 100vh;height: 100%;
		left: 0px;top: 0px;
		background:rgba(0,0,0,.5);z-index: 100
	}
	.guide img{
		width:100px;
		display: block;
		right: 200px;top: 270px;
		animation: jello 1s;
		animation-iteration-count: infinite;
	}
	.add-device{
		z-index: 101
	}

	@keyframes jello {

	 	0%{
	 		transform: translate3d(-50px,50px,0px);
	      	opacity: 0.2;
	 	}
	 	10%{
	 		transform: translate3d(-45px,45px,0px);
	      	opacity: 0.3;
	 	}
	 	20%{
	 		transform: translate3d(-40px,40px,0px);
	      	opacity: 0.4;
	 	}
	 	30%{
	 		transform: translate3d(-35px,35px,0px);
	      	opacity: 0.5;
	 	}
	 	40%{
	 		transform: translate3d(-30px,30px,0px);
	      	opacity: 0.6;
	 	}
	 	50%{
	 		transform: translate3d(-25px,25px,0px);
	      	opacity: 0.7;
	 	}
	 	60%{
	 		transform: translate3d(-20px,20px,0px);
	      	opacity: 0.8;
	 	}
	 	70%{
	 		transform: translate3d(-15px,15px,0px);
	      	opacity: 0.9;
	 	}
	 	80%{
	 		transform: translate3d(-10px,10px,0px);
	      	opacity: 1;
	 	}
	 	80%{
	 		transform: translate3d(-5px,5px,0px);
	      	opacity: 0.5;
	 	}
	 	100%{
	 		transform: translate3d(0px,0px,0px);
	      	opacity: 0;
	 	}
	}
</style>
