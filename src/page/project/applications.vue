<template>
  	<div class="applications">
		<div class="team-header backgroundF0 padding20">
			<span class="width120px marginR40" :class='switchs?"btnColor height30 colorFFF":"btnF height28"' @click='switchs=true'>{{$t('navbar.Application_list')}}</span>
			<button type="" class="width120px height30" :class='!switchs?"btnColor height30 colorFFF":"btnF height28"' @click='switchs=false'>{{$t('navbar.User_Application')}}</button>
		</div>
		<div v-if='switchs' class="team-box">
			<table class="width100 center ruleList" border-collapse='collapse' border='1' cellspacing='0'>
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
  					<tr v-for='(d,i) in uses'>
  						<td>{{d.name}}</td>
  						<td>{{d.description}}</td>
  						<td>{{d.redirect_uri}}</td>
  						<td>{{d.website}}</td>
  						<td>{{d.client_id}}</td>
  						<td>{{d.client_secret}}</td>
  						<td><button class="btnColor width100px height30" @click='del(d,i)'>{{$t('navbar.Delete')}}</button> </td>
  					</tr>
  				</tbody>
  			</table>
		</div>
		<div class="flex team-box" v-else>
			<div class="third-party">
				<div class="size22 bold marginB20">
					第三方：
				</div>
				<div class='marginB20 paddingLR20'>
					<p class="marginB20"><label><span>{{$t('navbar.Name')}}：</span><input type="text" name="" v-model='name'></label></p>
					<p class="marginB20"><label><span>{{$t('navbar.Introduction')}}：</span><input type="text" name="" v-model='description'></label></p>
					<p class="marginB20"><label><span>{{$t('navbar.Redirect_Address')}}：</span><input type="text" name="" v-model='redirect_uri'></label></p>
					<p class="marginB20"><label><span>{{$t('navbar.Website_Address')}}：</span><input type="text" name="" v-model='website'></label></p>
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
  	</div>
</template>

<script> 
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
				uses:[]
			}
		},
		created(){
			this.list()
    	},
		computed: {
			
		},
		methods: {
			generate(){
				var self=this
				if(self.website && self.name && self.description && self.redirect_uri){
					self.ajax({
	        			scope_token:localStorage.getItem('scope_token'),
						url:'v1/applications/',
						mode:'post',
						data:{
							name:self.name,
							description:self.description,
							redirect_uri:self.redirect_uri,
							website:self.website
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
        			scope_token:localStorage.getItem('scope_token'),
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
				this.$prompt.center(self.$t('navbar.Confirm_to_delete')+'？',{
		        	hid(){},
		        	confirm(){
		        		var _this=this
		        		self.ajax({
		        			scope_token:localStorage.getItem('scope_token'),
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
			}
		},
		watch: {
			
		}
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
	.team-box input{
		width: 400px;
	}
	.third-party{
	}
	.ruleList th{
		height: 40px;line-height: 40px;
	}
	table{
		border-color: #d9d9d9
	}
	td{
		text-align: center;
		padding:10px;
	}
</style>
