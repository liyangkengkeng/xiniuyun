<template>
  	<div class="applications">
		<div class="team-header backgroundF0 padding20">
			<span class="width120px marginR40" :class='switchs?"btnColor height30 colorFFF":"btnF height28"' @click='switchs=true'>{{$t('navbar.Application_list')}}</span>
			<button type="" class="width120px height30" :class='!switchs?"btnColor height30 colorFFF":"btnF height28"' @click='switchs=false'>{{$t('navbar.User_Application')}}</button>
		</div>
		<div v-if='switchs' class="team-box">
			<table class="width100 center ruleList" border-collapse='collapse' border='0' cellspacing='0'>
  				<thead>
  					<tr>
  						<th class="width15">{{$t('navbar.Name')}}</th>
  						<th class="width32">{{$t('navbar.Introduction')}}</th>
  						<th class="width32">{{$t('navbar.Redirect_Address')}}</th>
  						<th class="width10">{{$t('navbar.Website_Address')}}</th>
  						<th>client_id</th>
  						<th>client_secret</th>
  						<th class="width16">{{$t('navbar.Operate')}}</th>
  					</tr>
  				</thead>
  				<tbody>
  					<tr>
  						<td colspan="100" rowspan="" headers="" class="no-data" v-if='uses.length<1'>
  							<img :src="no_data" alt=""> 
  							{{$t('navbar.Not_data_yet')}}
  						</td>
  					</tr>
  					<tr v-for='(d,i) in uses'>
  						<td>{{d.name}}</td>
  						<td>{{d.description}}</td>
  						<td>{{d.redirect_uri}}</td>
  						<td>{{d.website}}</td>
  						<td>{{d.client_id}}</td>
  						<td>{{d.client_secret}}</td>
  						<td>
  							<button class="btnColor paddingTB5 paddingLR20 height28 marginR20" @click='add(d)'>{{$t('navbar.Create')}}</button>
  							<!-- <router-link class="btnColor paddingTB5 paddingLR20 height28 marginR20" :to='{path:"/personal/company/voucher/"+userid,query:{applications:JSON.stringify(d)}}'>{{$t('navbar.Create')}}</router-link>	 -->
							<router-link class="btn11 paddingTB5 paddingLR20 height28 marginR20" :to='{path:"/personal/company/voucher/"+userid,query:{id:d.id}}'>{{$t('navbar.Details')}}</router-link>	
							<button class="btnColor paddingTB5 paddingLR20 height30" @click='del(d,i)'>{{$t('navbar.Delete')}}</button>
  						</td>
  					</tr>
  				</tbody>
  			</table>
		</div>
		<div class="flex team-box" v-else>
			<div class="third-party">
				<div class="size22 bold marginB20">
					{{$t('navbar.rd_Party_Platform')}}：
				</div>
				<div class='marginB20 paddingLR20'>
					<p class="marginB20"><label><span>{{$t('navbar.Name')}}：</span><input class='input' type="text" name="" v-model='name' maxlength="10"></label></p>
					<p class="marginB20"><label><span>{{$t('navbar.Introduction')}}：</span><input class='input' type="text" name="" v-model='description' maxlength="20"></label></p>
					<p class="marginB20"><label><span>{{$t('navbar.Redirect_Address')}}：</span><input class='input' type="text" name="" v-model='redirect_uri'></label></p>
					<p class="marginB20"><label><span>{{$t('navbar.Website_Address')}}：</span><input class='input' type="text" name="" v-model='website'></label></p>
					<p class="marginB20">
						<span>{{$t('navbar.Website_Address')}}：</span>
						<label class="marginR40"><input type="radio" name="" value='2' v-model='radios'>断送快递记录卡萨</label>
						<label><input type="radio" name="" value='1' v-model='radios'>大大</label>
					</p>
					<p><span></span><button type="" class='btnColor width100px height38' @click='generate'>{{$t('navbar.Generate')}}</button></p>
				</div>
				<div class='paddingLR20' v-if='show'>
					<div class="marginB20"><span>{{$t('navbar.Name')}}：</span>{{obj.name}}</div>
					<div class="marginB20"><span>{{$t('navbar.Introduction')}}：</span>{{obj.description}}</div>
					<div class="marginB20"><span>{{$t('navbar.Redirect_Address')}}：</span>{{obj.redirect_uri}}</div>
					<div class="marginB20"><span>{{$t('navbar.Website_Address')}}：</span>{{obj.website}}</div>
					<div class="marginB20 flex jc-sb">
						<p><span>client_id：</span>{{obj.client_id}}</p>
						<button type="" class="btnColor width100px height30" @click='copy("client_id")'>{{$t('navbar.Copy')}}</button>
					</div>
					<div class="marginB20 flex jc-sb">
						<p><span>client_secret：</span>{{obj.client_secret}}</p>
						<button type="" class="btnColor width100px height30" @click='copy("client_secret")'>{{$t('navbar.Copy')}}</button>
					</div>
					<div class="marginB20 flex jc-sb">
						<p><span>user_id：</span>{{obj.user_id}}</p>
						<button type="" class="btnColor width100px height30" @click='copy("user_id")'>{{$t('navbar.Copy')}}</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal" v-if='modal_show'>
			<div class='modal-content backgroundFFF pr'>
				<img :src="close" alt="" class="close pa cp" @click='closeClick'>
				<div class="size22 bold marginB20">
					<span>TOKEN:</span>
				</div>
				<div class='marginB20 paddingLR20'>
					<p class="marginB20"><span>{{$t('navbar.Name')}}：</span><input class="width400px" type="" name="" v-model='token_name'></p>
					<p class="marginB20"><span>{{$t('navbar.Introduction')}}：</span><input class="width400px" type="" name="" v-model='token_description'></p>
					<p class="marginB20">
						<span>{{$t('navbar.Expiration_date')}}：</span>
						<template v-if='t_lang=="en"'>
			  				<date-picker class="data-picker marginR40" :placeholder="$t('navbar.Creation_time')" v-model="token_expired_at" :lang="lang"></date-picker>
			  			</template>
			  			<template v-else>
			  				<date-picker class="data-picker marginR40" :placeholder="$t('navbar.Creation_time')" v-model="token_expired_at"></date-picker>
			  			</template>
						<!-- <input type="date" name="" v-model='token_expired_at'> -->
					</p>
					<p class="marginB20">
						<span>是否应用到项目：</span>
						<label class="marginR40"><input type="radio" name="" value="2" v-model='project'>是</label>
						<label><input type="radio" name="" value="1" v-model='project'>否</label>
					</p>
					<p class="marginB20">
						<span>应用项目：{{project_name}}</span>
					</p>
					<p><button type="" class='btnColor width100px height38' @click='generate_test'>{{$t('navbar.Generate_Visit_Voucher')}}</button></p>
				</div>
				<div class='paddingLR20' v-if='show1'>
					<div class="marginB20 flex jc-sb al-ce">
						<p class="marginR20"><span>access_token：</span>{{obj.access_token}}</p>
						<button type="" class="btnColor width100px height30" @click='copy("client_id")'>{{$t('navbar.Copy')}}</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal project-box" v-if='project_show'>
			<div class="backgroundFFF modal-content pr">
				<img :src="close" alt="" class="close pa cp" @click='projectClose'>
				<div class="size22 bold marginB20">
					项目列表
				</div>
				<div class="project-list">
					<label class="width200px marginB15" v-for='(val,key) in project_list' :key='key'><input type="radio" name="" :value="val" v-model='project_obj'>{{val.name}}</label>
				</div>
				<div>
					<button type="" class="btnColor paddingTB10 width100px" @click='project_show=false'>确定</button>
				</div>
			</div>
		</div>
  	</div>
</template>

<script> 
import DatePicker from 'vue2-datepicker'
	export default {
	    data(){
			return {
				name:'',
				description:'',
				redirect_uri:'',
				website:'',
				obj:{},
				show:false,
				test:{},
				switchs:true,
				uses:[],
				radios:'',
				no_data:require('@/assets/img/no-data.png'),
				close:require('@/assets/img/x-icon.png'),
				client_secret:'',
				client_id:'',
				applications_id:'',
				userid:'',
				lang: {
			        days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			        pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
			        placeholder: {
			          date: 'Select Date',
			          dateRange: 'Select Date Range'
			        }
			    },
			    token_name:'',
				token_description:'',
				token_expired_at:'',
				modal_show:false,
				show1:false,
				project:'1',
				project_show:false,
				project_list:[],
				project_id:'',
				project_name:'',
				project_obj:{},
			}
		},
		created(){
			this.userid=localStorage.getItem('userId')
			this.list()
			this.projectLists()
    	},
		computed: {
			t_lang(){
				return this.$i18n.locale
			}
		},
		methods: {
			generate(){
				var self=this
				if(self.website && self.name && self.description && self.redirect_uri){
					self.ajax({
						url:'v1/applications/',
						mode:'post',
						data:{
							name:self.name,
							description:self.description,
							redirect_uri:self.redirect_uri,
							website:self.website,
						},
						success(ress){
							self.$success.center(self.$t('navbar.Generate_Successful'))
							self.obj=ress.data.data
							self.uses.unshift(self.obj)
							self.show=true
						}
					})
				}else{
					if(!self.website)
						self.$violate.center(self.$t('navbar.Website_address_is_absent'))
					if(!self.name)
						self.$violate.center(self.$t('navbar.Name_is_absent'))
					if(!self.description)
						self.$violate.center(self.$t('navbar.Introduction_is_absent'))
					if(!self.redirect_uri)
						self.$violate.center(self.$t('navbar.Redirect_Address_is_absent'))
				}
			},
			generate_test(){
				var self=this
				var time = (new Date()).valueOf()
				var expired = (new Date(self.token_expired_at)).valueOf()
				var date=expired-time
				if(date>0 && self.token_name && self.token_description){
					var obj={
						name:self.token_name,
						description:self.token_description,
						expired_at:expired/1000,
						client_secret:self.client_secret,
						client_id:self.client_id,
					}
					if(self.project_id)
						obj.scope_project=self.project_id

					self.ajax({
						url:'v1/applications/'+self.applications_id+'/access_tokens',
						mode:'post',
						data:obj,
						success(ress){
							self.$success.center(self.$t('navbar.Generate_Successful'))
							self.obj=ress.data.data
							self.show1=true
							// self.list()
						}
					})
				}else{
					if(!(expired>time)){
						self.$violate.center(self.$t('navbar.Expiration_date_later_than_current_date'))
					}
					if(!self.token_name)
						self.$violate.center(self.$t('navbar.Name_is_absent'))
					if(!self.token_description)
						self.$violate.center(self.$t('navbar.Introduction_is_absent'))
				}	
			},
			copy(val){//复制
				 // 动态创建 input 元素
				  var aux = document.createElement("input");

				  // 获得需要复制的内容
				  aux.setAttribute("value", this.obj[val]);

				  // 添加到 DOM 元素中
				  document.body.appendChild(aux);

				  // 执行选中
				  // 注意: 只有 input 和 textarea 可以执行 select() 方法.
				  aux.select();
				  
				  // 获得选中的内容
				  var content = window.getSelection().toString();
				    
				  // 执行复制命令
				  document.execCommand("copy");

				  // 将 input 元素移除
				  document.body.removeChild(aux);
				  this.$success.center(this.$t('navbar.Copy_Successful'))
				  this.url_modal=false
			},
			list(){//列表
				var self=this
				self.ajax({
        			// scope_token:localStorage.getItem('scope_token'),
					url:'v1/applications/',
					mode:'get',
					data:{},
					success(ress){
						self.uses=ress.data.data
					}
				})
			},
			del(val,index){
				var self=this
				this.$prompt.center(self.$t('navbar.Confirm_to_delete')+'?',{
		        	hid(){},
		        	confirm(){
		        		var _this=this
		        		self.ajax({
		        			// scope_token:localStorage.getItem('scope_token'),
							url:'v1/applications/'+val.id+'/',
							mode:'DELETE',
							data:{},
							success(ress){
								self.uses.splice(index,1)
								self.$success.center(self.$t('navbar.delete_successful'))
								_this.hid()
							}
						})
		        	},
		        	cancel(){this.hid()},
		        });
			},
			add(obj){
				this.modal_show=true
				this.client_secret=obj.client_secret
				this.client_id=obj.client_id
				this.applications_id=obj.id
			},
			closeClick(){
				this.modal_show=false
				this.token_name=''
				this.token_description=''
				this.token_expired_at=''
				this.show1=false
			},
			projectClose(){
				this.project_show=false
				this.project_id=''
			},
			projectLists(){
				var self=this
				self.ajax({ 
	                mode:'GET',
	                url:'v1/users/'+localStorage.getItem('userId')+'/projects/',
	                data:{},
	                success(res){
	                    self.project_list=res.data.data
	                }
	            })
			},
		},
		watch: {
			project(val){
				if(val==2){
					this.project_show=true
				}else{
					this.project_show=false
					this.project_id=''
					this.project_name=''
				}
			},
			project_obj(val){
				this.project_id=val.id
				this.project_name=val.name
			}
		},
		components: { DatePicker },
	}
</script>

<style scoped>
	.team-header,.team-box{
		min-width: 965px;
		padding:20px 110px;
	}
	.team-box span{
		display: inline-block;
		width: 100px;
	}
	.team-box .input{
		display: inline-block;
		width: 400px;
	}
	.third-party{
	}
	.ruleList th{
		height: 40px;line-height: 40px;
	}
	table{
		/*border-color: #d9d9d9*/
	}
	td{
		text-align: center;
		padding:10px;
	}
	.modal-content {
		padding:20px 40px;
	}
	.close{
		right: 20px;top: 20px;width:20px;
	}
	.project-box{
		z-index: 10001
	}
	.project-list{
		width:650px;
	}
</style>
