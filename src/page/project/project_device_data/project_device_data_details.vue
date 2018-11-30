<template>
  	<div class="project_device_details size16 color86" v-if='!isTrend'>
  		<div class=" ret flex width80">
  			<p class="flex border border-r5 ovh condition">
				<!-- <button class="width120px height30" :class='tabs=="info" ? "background11 colorFFF":"backgroundFFF"' @click='tabs="info"'>{{$t('navbar.Device_information')}}</button> -->
	  			<button class="width120px height30" :class='tabs=="data" ? "background11 colorFFF":"backgroundFFF"' @click='tabs="data"'>{{$t('navbar.Device_Data')}}</button>
	  			<button class="width120px height30" :class='tabs=="Journal" ? "background11 colorFFF":"backgroundFFF"' @click='tabs="Journal"'>{{$t('navbar.Warning_Log')}}</button>
  			</p>
  		</div>
		<div v-if='tabs=="data"' class='marginT20 width80 size14'>
			<div class="flex paddingLR20 marginB20 backgroundFFF height48 border-r5">
				<p class="table_num">#</p>
				<p class="table_name flex al-ce">{{$t('navbar.Function_point_Name')}}</p>
				<p class="table_unit flex al-ce">{{$t('navbar.TAG')}}</p>
				<p class="table_val flex al-ce">{{$t('navbar.Data_Transmit_Type')}}</p>
				<p class="table_val flex al-ce">{{$t('navbar.Function_point_Type')}}</p>
				<p class="table_des flex al-ce">{{$t('navbar.Function_point_Property')}}</p>
				<p class="table_time flex al-ce">{{$t('navbar.Remarks')}}</p>
				<p class="table_date flex al-ce">{{$t('navbar.Time')}}</p>
				<p class="table_data flex al-ce">{{$t('navbar.Value')}}</p>
				<p class="table_img flex al-ce">{{$t('navbar.History_Trend')}}</p>
			</div>
			<div class='center no-data' v-if='goods.length<1'>
				<img :src="no_data" alt=""> 
				{{$t('navbar.Not_data_point_yet')}}
			</div>
			<div v-for='(val,index) in goods' :key='index' class="flex paddingLR20 marginB20 backgroundFFF height48 border-r5">
				<p class="table_num">{{index+1}}</p>
				<p class="table_name flex al-ce">{{val.funName || '-'}}</p>
				<p class="table_unit flex al-ce">{{val.fieldname || '-'}}</p>
				<p class="table_val flex al-ce">{{val.transport ? val.transport.name : '-'}}</p>
				<p class="table_val flex al-ce">{{val.type ? val.type.name : '-'}}</p>
				<p class="table_des flex al-ce">
					<span v-if='val.type.val==1 '>
		    			-
		    		</span>
		    		<span v-else-if='val.type.val==2'>
		    			{{$t('navbar.Range_of_Value')}}：{{val.min || ''}}-{{val.max || ''}},{{$t('navbar.spacing')}}：{{val.spacing || '-'}}，{{$t('navbar.Multiples')}}：{{val.multiple || '-'}}，{{$t('navbar.Unit')}}：{{val.unit || '-'}}
		    		</span>
		    		<span v-else-if='val.type.val==3'>
		    			{{val.enumerate || '-'}}
		    		</span>
		    		<span v-else-if='val.type.val==4'>
		    			{{val.fault || '-'}}
		    		</span>
		    		<span v-else-if='val.type.val==5 || val.type.val==6'>
		    			{{$t('navbar.Max_Length_Less_than_255bits')}}
		    		</span>
					<span v-else>
						-
					</span>
				</p>
				<p class="table_time flex al-ce">
					{{val.description || '-'}}
				</p>
				<p class="table_date  flex al-ce">
					<template v-if='status_list[val.fieldname]'>
						<span>{{status_list[val.fieldname][0] || '-'}}</span>
					</template>
					<template v-else>
						-
					</template>
				</p>
				<p class="table_data flex al-ce">
					<template v-if='status_list[val.fieldname]'>
						<span>{{status_list[val.fieldname][1]}}</span>
					</template>
					<template v-else>
						-
					</template>
				</p>
				<p class="trend table_img flex al-ce"><img :src="trend" alt="" class="cp" @click='jump(val)'></p>
			</div>
		</div>
		<div v-else-if='tabs=="Journal"' class="marginT20 width80">
			<p class="marginB20">{{$t('navbar.Warning_Log')}}：</p>
			<div class="flex paddingLR20 marginB20 backgroundFFF height48 border-r5">
				<p class="log_rule log_rule1">{{$t('navbar.Rules')}}</p>
				<p class="log_name">{{$t('navbar.a34')}}</p>
				<p class="log_serverity">{{$t('navbar.Trigging_Level')}}</p>
				<p class="log_msg">{{$t('navbar.a35')}}</p>
				<p class="log_time">{{$t('navbar.Time')}}</p>
			</div>
			<div class='center no-data' v-if='log.length<1'>
				<img :src="no_data" alt=""> 
				{{$t('navbar.Not_data_point_yet')}}
			</div>
			<div class="log">
				<div v-for='(val,index) in log' :key='index' class="flex paddingLR20 marginB20 backgroundFFF height48 border-r5">
					<p class="log_rule flex al-ce">{{val.rule}}</p>
					<p class="log_name" :class='val.name==="DeviceRecovery" ? "green" : "red" '>{{val.name}}</p>
					<p class="log_serverity">{{val.serverity}}</p>
					<p class="log_msg">{{val.msg}}</p>
					<p class="log_time">{{val.time}}</p>
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
				edit:require('@/assets/img/edit11-icon.png'),
				minus:require('@/assets/img/minus-icon.png'),
				val:{},//设备信息
				productField:[],//产品字段
				log:[],
				status_list:{},//状态值
				trend:require('@/assets/img/trend-icon.png'),
				isTrend:false,
				trend_field:'voltage',
				trendID:'',
				tabs:'data',
				tags_list:[],//标签列表
				boo:false,//区分添加还是编辑设备标签
				goods:[],//商品
				no_data:require('@/assets/img/no-data.png'),
				set:null,
				lang_show:true
			}
		},
		created(){
			// if(this.$route.query.deviceDetails){
			// 	this.val=JSON.parse(this.$route.query.deviceDetails)
			// 	localStorage.deviceDetails = this.$route.query.deviceDetails
			// }else{
			// 	this.val=JSON.parse(localStorage.getItem('deviceDetails'))
			// }
			// this.goods_details()
			this.trendID=this.val.model_id
			this.product_field()
			this.alarm()
			this.status()
		},
		beforeDestroy(){
			clearInterval(this.set)
		},
		methods: {
			device_list(){
				this.$emit("sonDeviceList",false); 
			},
			product_field(){//产品字段
				var self=this
				this.ajax({
					scope_token:localStorage.getItem('scope_token'),
					url:'v1/models/'+self.val.model_id+'/fields/',
					mode:'GET',
					data:{},
					success(res){
						self.productField=res.data.data
					}
				})
			},
			alarm(){//报警字段
				var self=this
				this.ajax({
					scope_token:localStorage.getItem('scope_token'),
					url:'v1/devices/'+self.val._id+'/event/',
					mode:'GET',
					data:{},
					success(res){
						for(let i=0;i<res.data.data.length;i++){
							res.data.data[i].time=self.$time_stamp(res.data.data[i].time)
						}
						self.log=res.data.data
					}
				})
			},
			status(){//当前状态
				var self=this
				self.set=setInterval(()=>{
					this.ajax({
						scope_token:localStorage.getItem('scope_token'),
						url:'v1/data/devices/'+self.val._id+'/status/',
						set:true,
						mode:'GET',
						data:{},
						success(res){
							for(var i in res.data.data){
								if(i)
									res.data.data[i][0]=self.$time_stamp(res.data.data[i][0])
							}
							self.status_list=res.data.data
						}
					})
				},1000)
				
			},
			revert(val){
				this.isTrend=val
			},
			jump(val){
				var self=this
				self.trend_field=val.fieldname   
				this.$router.push({path:"/project/projectDevice/project_device_data/project_device_data_details/trend",query:{ids:self.trendID,name:self.trend_field,deviceID:self.val._id}})
			},
			minus_tags(i){//删除
				var self=this
				this.$prompt.center(this.$t('navbar.Confirm_to_delete')+"?",{
		        	hid(){},
		        	confirm(){
		        		var _this=this
		        		self.ajax({
							scope_token:localStorage.getItem('scope_token'),
							url:'v1/devices/'+self.val._id+'/tags/'+i,
							mode:'DELETE',
							data:{},
							success(res){
								// self.see_tags()
								self.$success.center(self.$t('navbar.delete_successful'))
								_this.hid()
							}
						})
		        	},
		        	cancel(){this.hid()},
		        })
			},
			goods_details(arr){
				var self=this
				var id;
				for(let j=0;j<arr.length;j++){
					if(self.val.model_id===arr[j]._id){
						id= arr[j]._id
					}
				}
				self.ajax({ 
					
				    mode:'GET',
				    // goods:true,
				    url:'v1/models/'+id+'/fields/',
				    data:{},
				    success(res){
				    	var type=[{val:1,name:self.$t('navbar.boolean_type')},{val:2,name:self.$t('navbar.value_type')},{val:3,name:self.$t('navbar.enumerate_type')},{val:4,name:self.$t('navbar.fault_type')},{val:5,name:self.$t('navbar.character_type')},{val:6,name:self.$t('navbar.RAW_type')}]
		    			var tran=[{val:'rw',name:self.$t('navbar.support_uplink_downlink')},{val:'ro',name:self.$t('navbar.support_uplink_only')},{val:'wo',name:self.$t('navbar.support_downlink_only')}]
				    	if(res.data.data.length>0){
							for(let i=0;i<res.data.data.length;i++){
						    	for(let a=0;a<type.length;a++){
			    					if(type[a].val==res.data.data[i].type){
			    						res.data.data[i].type=type[a]
			    					}
			    				}
			    				for(let b=0;b<tran.length;b++){
			    					if(tran[b].val==res.data.data[i].transport){
			    						res.data.data[i].transport=tran[b]
			    					}
			    				}
			    			}
			    			self.goods=res.data.data//商品
			    			console.log(self.goods)
				    	}
				    }
				})
			}
		},
		computed:{
			product_list(){
				return this.$store.state.project_product_list
			},
			lang(){
				return this.$i18n.locale
			}
		},
		watch:{
			product_list:{
				handler(val){
					if(this.$route.query.deviceDetails){
						this.val=JSON.parse(this.$route.query.deviceDetails)
						localStorage.deviceDetails = this.$route.query.deviceDetails
					}else{
						this.val=JSON.parse(localStorage.getItem('deviceDetails'))
					}
					if(val.length>0){
						this.goods_details(val)
					}
				},
				immediate:true
			},
			lang(val){
				this.lang_show=!this.lang_show
				this.goods_details(this.product_list)
			}
		},
		components: {
    		// trend
    	},
	}
</script>

<style scoped>

	.data-list{
		padding: 20px 38px;
	}
	.data-list>div{
		/*height: 80px;*/
		margin-right: 66px;
	}
	.data-list>div:last-child{
		margin-left: 50px;
	}
	.data-list-img{
		width: 80px
	}
	.data-list-img img{
		width: 100%;
	}
	.label{
		padding: 5px;
		margin-left: 16px
	}
	.data-state,.off-line{
		right: 0px;bottom: 0px;
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
	table{border-collapse:collapse;}
	table tr:last-child{
		border-bottom: 0px;
	}
	tr{
		border-bottom: 1px solid #d9d9d9
	}
	.device-data td{
		padding:25px 0px;
	}
	.log{
		height: 390px;
		overflow-y: auto;
	}
	.no-log{
		margin:30px 0px 0px 100px;
	}
	.border-b{
		border-bottom: 1px solid #d9d9d9;
		padding-bottom: 5px;
	}
	.trend img{
		width: 30px;height: 30px;
	}
	.width30{
		width:30%;
	}
	.minus-icon{
		width: 20px;height:20px;
	}
	.tags_list{
		border-bottom: 1px solid #d9d9d9
	}
	.tags_list span{
		display:block;
		width: 300px;
	}


	.details-status{
		padding:30px 75px;
	}

	.condition button{
		border:0px;
		border-radius: 0px;
		border-right: 1px solid #d9d9d9;
	}
	.condition button:last-child{
		border-right: 0px;
	}
	.table_num{
		width:2%;
	}

	.table_val{
		width:7%
	}
	.table_date{
		width: 14%;line-height: 16px;
	}
	.table_name,.table_unit,.table_img,.table_data,.table_time{
		width:9%
	}
	.table_name,
	.table_unit,
	.table_val,
	.table_des,
	.table_time,
	.table_date,
	.table_data,
	.table_img{
		line-height: 16px;
		margin-right: 1%
	}
	.table_des{
		width:19%;
		line-height: 16px;
	}
	.table_des1.table_des{
		line-height: 48px;
	}
	.table_date.table_date1{
		line-height: 48px;
	}
	.ret{
		margin:15px auto;
	}

	.log_name,
	.log_serverity,
	.log_msg,
	.log_time{
		width: 17%
	}
	.log_rule.log_rule1{
		line-height: 48px;
	}
	.log_rule{
		line-height: 20px;
		width: 32%
	}
	.green{
		color:green;
	}
</style>
