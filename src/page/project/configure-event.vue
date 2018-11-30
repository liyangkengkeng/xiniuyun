<template>
  	<div class="width80">
  		<div class="third-party">
			<div class="marginB20">
				<p class="size20 bold color30 marginB20">{{$t('navbar.Server_Setup')}}</p>
				<!-- <p>简介：服务器配置服务器配置服务器配置服务器配置服务器配置服务器配置服务器配置服务器配置服务器配置服务器配置服务器配置</p> -->
			</div>
			<div class="flex jc-sb">
				<div class="flex nav marginB20">
					<button type="" class="width120px marginR40" :class="see?'btnColor height30':'btn86 height28'" @click='see=true'>{{$t('navbar.View_List')}}</button>
  					<button type="" class="width120px" :class="!see?'btnColor height30':'btn86 height28'" @click='see=false'>{{$t('navbar.Create_Rules')}}</button>
				</div>
	  			<div class="websocket-btn">
	  				<!-- <span>websocket状态：</span>
	  				<button v-if='btn' type="" class="paddingLR20 btnf" :disabled='iswebsocket' @click='websocket(false)'>已打开</button>
	  				<button v-else type="" class="paddingLR20 btnf" :disabled='iswebsocket' @click='websocket(true)'>已关闭</button> -->
	  				
	  			</div>
	  		</div>
	  		<div class='third-party-box width80' v-show='!see'>
	  			<div class="flex marginT40 al-ce">
	  				<p class="color30 size16 bold width200">{{$t('navbar.Rule_Name')}}：</p>
	  				<p>
	  					<input type="" name="" v-model='name' class="width400px" maxlength="20">
	  				</p>
	  			</div>
	  			<div class="flex marginT40 al-ce">
	  				<p class="color30 size16 bold width200">{{$t('navbar.transmission_protocol')}}：</p>
	  				<p class="width100 color86 size16 ">
	  					<label for="" class="marginR40"><input type="radio" name="" value='http' v-model='transfer'>HTTP</label>
	  					<!-- <label for=""><input type="radio" name="" value='0' v-model='transfer'>安全传输</label> -->
	  				</p>
	  			</div>
	  			<div class="flex marginT40">
	  				<div class="color30 size16 bold width200">URL：</div>
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
	  				<p class="color30 size16 bold width200"></p>
	  				<p class="width100">
	  					<button type="" class="sub btnColor width120px height48" @click='sub'>{{$t('navbar.Submit')}}</button>
	  				</p>
	  			</div>
	  		</div>
	  		<div v-show='see' class="">
	  			<table class="width100 center ruleList backgroundFFF" border-collapse='collapse' border='0' cellspacing='0'>
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
	  						<td colspan="1000" rowspan="" headers="">
	  							<div class='center no-data'>
									<img :src="no_data" alt="">
									<span>{{$t('navbar.No_data_yet')}}</span>
								</div>
	  						</td>
	  					</tr>
	  					<!-- <tr>
	  						<td  class='colorCC'>websocket</td>
	  						<td  class='colorCC'>ws</td>
	  						<td  class='colorCC'></td>
	  						<td class="">
  								<div class="switch border colorFFF ovh" :class='val ? "background11" : "backgroundEE"' @click='no_off'>
									<span class="off center cp" :class='val ? "backgroundEF off" : "backgroundBD on"'></span>
								</div>
	  							
	  						</td>
	  					</tr> -->
	  					<tr v-for='(d,i) in ruleList'>
	  						<td  class='colorCC'>{{d.name}}</td>
	  						<td  class='colorCC'>{{d.push_type}}</td>
	  						<td  class='colorCC'>
	  							{{d.push_params ? d.push_params.target_url : ''}}
	  						</td>
	  						<td  class='colorCC'><button type="" class="btnColor width100px height30" @click='del(d,i)'>{{$t('navbar.Delete')}}</button></td>
	  					</tr>
	  				</tbody>
	  			</table>
	  		</div>
	  	</div>
  	</div>
</template>

<script>
// import noOff from '@/components/no-off'
	export default {
	    data(){
			return {
				no_data:require('@/assets/img/no-data.png'),
				urls:'http://',   
				transfer:'http',  //加密方式
				name:'',
				see:true,
				ruleList:[],
				iswebsocket:false,
				// val:true
			}
		},
		created(){
			this.list()
    	},
		computed: {
			project_id(){
				return this.$store.getters.projectID
			}
		},
		methods: {
			list(){//规则列表
				var self=this
				this.ajax({
					scope_token:localStorage.getItem('scope_token'),
					url:'v1/rules/event/',
					mode:'GET',
					data:{},
					success(res){
						self.ruleList=res.data.data
						// if(res.data.data.length<1){
						// 	self.val=false
						// 	return false
						// }
						// for(let i=0;i<self.ruleList.length;i++){
						// 	self.ruleList[i].urls=self.ruleList[i].urls.join('<br />')
						// 	if(self.ruleList[i].name=='websocket' && self.ruleList[i].method=="ws"){
						// 		self.val=true
						// 		self.ruleList.splice(i,1)
						// 		return false;
						// 	}
						// 	self.val=false
						// }
					}
				})
			},
			sub(){
				var self=this
				// var reg = /^((ht|f)tps?|http?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/;
				// var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/
				// for(let i=0;i<this.urls.length;i++){
				// 	urls.push(this.urls[i].url)
				// 	if(!reg.test(this.urls[i].url)){
				// 		this.$fail.center(this.$t('navbar.Protocol_format_incorrect'))
				// 		return false
				// 	}
				// }
				// var arr=[]
				// for(let key=0;key<self.urls.length;key++){
				// 	arr.push(self.urls[key].url)
				// }
				if(self.urls.length && self.name){
					self.ajax({
						scope_token:localStorage.getItem('scope_token'),
						url:'v1/rules/event/',
						mode:'post',
						data:{
							// urls:arr
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
						},
						success(res){
							self.list()
							// self.ruleList.unshift(res.data.data)
							// self.ruleList[0].urls=self.ruleList[0].urls.join('<br />')
							self.see=true
						}
					})
				}else{
					this.$violate.center(this.$t('navbar.please_complete_the_information'))
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
			// websocket(boo){//是否开启websocket
			// 	var self=this
			// 	var obj=!boo?{name:'websocket',method:'ws',urls:[]}:{}
			// 	self.ajax({
			// 		scope_token:localStorage.getItem('scope_token'),
			// 		url:!boo ? 'v1/rules/event/':'v1/rules/event/websocket/',
			// 		mode:!boo ?'post':'DELETE',
			// 		data:obj,
			// 		success(res){
			// 			self.val=!boo
			// 			// self.list()
			// 			self.$success.center(self.$t('navbar.Operate_Successful'))
			// 		}
			// 	})
			// },
			// no_off(){
				//	// this.val=false
				// this.websocket(this.val)
			// },
			del(val,index){
				var self=this
				this.$prompt.center(self.$t('navbar.Confirm_to_delete')+'?',{
		        	hid(){},
		        	confirm(){
		        		var _this=this
		        		self.ajax({
							scope_token:localStorage.getItem('scope_token'),
							url:'v1/rules/event/'+val.name,
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
			}
		},
		watch: {
			project_id(val){
				this.list()
			}
		},
		components:{
			// noOff
		}
	}
</script>

<style scoped>

	.third-party-header .btn{
		width: 150px;
	}
	.width200{
		width: 220px;flex-shrink: 0
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
	.sub.btn{
		width: 120px;
		height: 48px;line-height: 48px;
	}
	.nav .btn,.nav .btnf{
		width: 120px; margin-right: 50px;
	}
	.ruleList td,.ruleList th{
		height: 40px;line-height: 40px;
	}
	.ruleList th{
		border-bottom:1px solid #d9d9d9
	}
	.websocket-btn{
		/*width: 100px;*/
	}

	.switch{
		width: 60px;height: 30px;line-height: 28px;border-radius: 30px;margin:auto;text-align: left;
	}
	.switch span{
		display: inline-block;
		width: 30px;
		height: 100%;
		border-radius: 30px;
		transition: 1s
	}
	.backgroundEF{
		background:#fff
	}
	.backgroundBD{
		background:#bdb7b7
	}
	.off{
		transform: translateX(100%);
	}
	.on{
		transform: translateX(0%);
	}
</style>
