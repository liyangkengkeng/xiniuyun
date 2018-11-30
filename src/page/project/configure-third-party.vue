<template>
  	<div class="width80">
  		<div class="third-party">
			<div class="marginB20">
				<p class="size20 bold color30 marginB20">{{$t('navbar.Server_Setup')}}</p>
				<!-- <p>简介：服务器配置服务器配置服务器配置服务器配置服务器配置服务器配置服务器配置服务器配置服务器配置</p> -->
			</div>
			<div class="flex nav marginB20">
				<button type="" class="width120px marginR40" :class="switchs?'btnColor height30':'btn86 height28'" @click='switchs=true'>{{$t('navbar.View_List')}}</button>
  				<button type="" class="width120px" :class="!switchs?'btnColor height30':'btn86 height28'" @click='switchs=false'>{{$t('navbar.Create_Rules')}}</button>
	  		</div>
	  		<div class='third-party-box width80' v-show='!switchs'>
	  			<div class="flex marginT40 al-ce">
	  				<p class="color30 size16 bold width200 must">{{$t('navbar.Rule_Name')}}：</p>
	  				<p>
	  					<input type="" name="" v-model='name'>
	  				</p>
	  			</div>
	  			<div class="flex marginT40 al-ce">
	  				<p class="color30 size16 bold width200">{{$t('navbar.transmission_protocol')}}：</p>
	  				<p class="width100 color86 size16 ">
	  					<label for="" class="marginR40"><input type="radio" name="" value='HTTP' v-model='transfer'>HTTP</label>
	  					<!-- <label for=""><input type="radio" name="" value='0' v-model='transfer'>安全传输</label> -->
	  				</p>
	  			</div>
	  			<div class="flex marginT40">
	  				<div class="color30 size16 bold width200 must">URL：</div>
	  				<div class="width100">
	  					<input class="third-party-input width100 marginR20" type="" name="" placeholder="http://" v-model='urls'>
	  					<!-- <p class="url flex marginB5 al-ce" v-for='(val,index) in urls'>
	  						<input class="third-party-input width100 marginR20" type="" name="" placeholder="http://" v-model='val.url'>
	  						<span class="center size24 bold add marginR10 cp colorFFF background11" @click='add(index)'>+</span>
	  						<span class="center size24 bold add cp colorFFF background11" @click='minus(index)'>-</span>
	  					</p> -->
	  				</div>
	  			</div>
	  			<div class="flex marginT40 al-ce">
	  				<p class="color30 size16 bold width200">TOKEN：</p>
	  				<p class="width100">
	  					<input class="third-party-input width100" type="" name="" :placeholder="$t('navbar.Enter_token_to')" v-model='token'>
	  				</p>
	  			</div>
	  			
	  			<!-- <div class="flex marginT40 al-ce">
	  				<p class="color30 size16 bold width200">{{$t('navbar.Push_time')}}：</p>
	  				<p class="width100 push-time flex">
	  					<input class="third-party-input marginR40 width100" type="number" name="" min='0' max='60' :placeholder="$t('navbar.Enter_a_value_between')" v-model='time'>
	  					<select name="" v-model='time_unit'>
	  						<option value="m">{{$t('navbar.Second')}}</option>
	  						<option value="f">{{$t('navbar.Minute')}}</option>
	  						<option value="s">{{$t('navbar.Hour')}}</option>
	  					</select>
	  				</p>
	  			</div> -->
	  			<!-- <div class="flex marginTB10 al-ce">
	  				<p class="color30 size16 bold width200"></p>
	  				<p class="width100 size16 color86">
	  					{{$t('navbar.Set_up_time_to_relieve_the_pressure_of_server')}}
	  				</p>
	  			</div> -->
	  			<!-- <div class="flex marginT40 al-ce">
	  				<p class="color30 size16 bold width200">{{$t('navbar.Quantity_Limit_of_Push_Data')}}：</p>
	  				<p class="width100">
	  					<input class="third-party-input width100" type="number" step='0.01' min='0' max='1000' name="" :placeholder="$t('navbar.Enter_a_number_less_than')" v-model='number'>
	  				</p>
	  			</div> -->
	  			<div class="flex marginT40 al-ce">
	  				<p class="color30 size16 bold width200"></p>
	  				<p class="width100">
	  					<button type="" class="sub btnColor width120px height48" @click='sub'>{{$t('navbar.Submit')}}</button>
	  				</p>
	  			</div>
	  		</div>
	  		<div v-show='switchs' class="">
	  			<!-- <table class="width100 center ruleList backgroundFFF" border-collapse='collapse' border='0' cellspacing='0'>
	  				<thead>
	  					<tr>
	  						<th class="color86">{{$t('navbar.Name')}}</th>
	  						<th class="color86">{{$t('navbar.transmission_protocol')}}</th>
	  						<th class="color86">{{$t('navbar.address')}}</th>
	  						<th class="color86">{{$t('navbar.Operate')}}</th>
	  					</tr>
	  				</thead>
	  				<tbody>
	  					<tr v-if='ruleList.length<1'>
	  						<td colspan="100" rowspan="" headers="" class="colorCC no-data">
	  							<img :src="no_data" alt="">
	  							<span>{{$t('navbar.No_data_yet')}}</span>
	  						</td>
	  					</tr>
	  					<tr v-for='(d,i) in ruleList'>
	  						<td class='colorCC'>{{d.name}}</td>
	  						<td class='colorCC'>{{d.method}}</td>
	  						<td class='colorCC'>
								<p v-for='(val,key) in d.urls'>{{val.url}}</p>
	  						</td>
	  						<td class='colorCC'><button type="" class="btnColor del-btn" @click='del(d,i)'>{{$t('navbar.Delete')}}</button></td>
	  					</tr>
	  				</tbody>
	  			</table> -->
	  			<div class="flex paddingLR20 marginB20 backgroundFFF border-r5">
					<p class="table_name color86 paddingTB10">{{$t('navbar.Name')}}</p>
					<p class="table_unit color86 paddingTB10">{{$t('navbar.transmission_protocol')}}</p>
					<p class="table_url color86 paddingTB10">{{$t('navbar.address')}}</p>
					<p class="table_val color86 paddingTB10">{{$t('navbar.Operate')}}</p>
					<!-- <p class="table_img">历史趋势</p> -->
				</div>
				<div class='center no-data' v-if='ruleList.length<1'>
					<img :src="no_data" alt="">
					<span>{{$t('navbar.No_data_yet')}}</span>
				</div>
				<div  v-for='(d,i) in ruleList' :key='i' class="flex al-ce paddingLR20 marginB20 backgroundFFF border-r5">
					<div class="table_name color86 paddingTB10">{{d.name || ''}}</div>
					<div class="table_unit color86 paddingTB10">{{d.push_type || ''}}</div>
					<div class="table_url color86 paddingTB10">
						{{d.push_params ? d.push_params.target_url : ''}}
						<!-- <p class="width100" v-for='(val,key) in d.urls'>{{val.url}}</p> -->
					</div>
					<div class="table_val color86 paddingTB10">
						<button type="" class="btnColor del-btn" @click='del(d,i)'>{{$t('navbar.Delete')}}</button>
					</div>
				</div>
	  		</div>
	  	</div>
  	</div>
</template>

<script>
	export default {
	    data(){
			return {
				no_data:require('@/assets/img/no-data.png'),
				urls:'http://',  
				token:'',
				transfer:'HTTP',  //加密方式
				time:'',
				time_unit:'m',
				number:'',
				name:'',
				switchs:true,
				ruleList:[],
			}
		},
		created(){
			this.lists()
    	},
		computed: {
			
		},
		methods: {
			sub(){
				var self=this
				// var urls=[]//地址参数
				// var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/
				// for(let i=0;i<this.urls.length;i++){
				// 	urls.push(this.urls[i].url)
				// 	if(!reg.test(this.urls[i].url)){
				// 		this.$fail.center(this.$t('navbar.Protocol_format_incorrect'))
				// 		return false
				// 	}
				// }
				var time=''//间隔时间参数
				if(self.time_unit=='m')
					time=self.time
				if(self.time_unit=='f')
					time=self.time*60
				if(self.time_unit=='s')
					time=self.time*60*60

				if(self.urls && self.name){
					self.ajax({
						scope_token:localStorage.getItem('scope_token'),
						url:'v1/rules/transfer/',
						mode:'post',
						data:{
							name:self.name,
							push_type:self.transfer,
							is_enabled:true,
							push_params:{
								method:'POST',
								is_auth:false,
								auth_type:'TOKEN',
								auth_header_key:'Authorization',
								auth_header_value:'Bearer bVFwbHh-SXQ2TDRiS20rOW9GSjlqX0lX',
								target_url:self.urls,
								is_batch:false,
								batch_size:1,
								batch_time:5
							}
							// urls:self.urls
						},	
						success(res){
							// res.data.data.urls=res.data.data.urls.join('<br />')
							self.lists()
							self.switchs=true
						}
					})
				}else{
					self.$violate.center(this.$t('navbar.please_complete_the_information'))
				}
			},
			add(index){//增加url
				var obj={url:'http://'}
				this.urls.splice(index+1,0,obj)
			},
			minus(index){
				if(this.urls.length>1){
					this.urls.splice(index,1)
				}
			},
			del(val,index){
				var self=this
				this.$prompt.center(self.$t('navbar.Confirm_to_delete')+'?',{
		        	hid(){},
		        	confirm(){
		        		var _this=this
		        		self.ajax({
							scope_token:localStorage.getItem('scope_token'),
							url:'v1/rules/transfer/'+val.name,
							mode:'DELETE',
							data:{},	
							success(res){
								self.ruleList.splice(index,1)
								_this.hid()
							}
						})
		        		
		        	},
		        	cancel(){this.hid()},
		        });
			},
			lists(){
				var self=this
				this.ajax({//规则列表
					scope_token:localStorage.getItem('scope_token'),
					url:'v1/rules/transfer/',
					mode:'GET',
					data:{},
					success(res){
						// for(let i=0;i<res.data.data.length;i++){
						// 	for(let j=0;j<res.data.data[i].urls.length;j++){
						// 		res.data.data[i].urls[j]=JSON.parse(res.data.data[i].urls[j])
						// 	}
						// }
						self.ruleList=res.data.data
					}
				})
			}
		},
		watch: {
			
		}
	}
</script>

<style scoped>

	.third-party-header .btn{
		width: 150px;
	}
	.width200{
		width: 220px;flex-shrink: 0;line-height: 40px;
	}
	.push-time select{
		width: 120px;
		height: 40px;
		padding:0px 10px;
		flex-shrink: 0
	}
	.url span{
		display: inline-block;
		flex-shrink: 0;
		border-radius: 50%;
		width:30px;height: 30px;line-height: 30px;
	}
	.nav .btn,.nav .btnf{
		width: 120px; margin-right: 50px;
	}
/*	.ruleList td,.ruleList th{
		height: 40px;line-height: 40px;
	}
	.ruleList th{
		border-bottom:1px solid #d9d9d9
	}*/
	.del-btn{
		width:70px;
		height:25px;
	}
	.table_name,
	.table_unit,
	.table_url,
	.table_val{
		margin-right: 1%;width: 20%;
		
	}
	.table_url{
		width: 40%
	}
</style>
