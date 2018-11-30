<template>
  	<div class="team">
		<div class="team-header backgroundF0 padding20">
			<span class="borderB3 paddingB5 size24 bold">{{$t('navbar.Team_Member')}}</span>
		</div>
  		<div class='team-box'>
  			<div class="flex jc-sb al-ce">
  				<span class="size16 bold">{{$t('navbar.Member_List')}}</span>
  				<button type="" class="btnF width150px height28" @click='invite'>{{$t('navbar.Invite')}}</button>
  			</div>
  			<div>
  				<table class="width100">
  					<tr class="center size18 bold">
  						<td>{{$t('navbar.Name')}}</td>
  						<td>{{$t('navbar.Joined_Date')}}</td>
  						<!-- <td>到期时间</td> -->
  						<td>{{$t('navbar.role')}}</td>
  						<!-- <td>id</td> -->
  					</tr>
  					<tr>
  						<td colspan="100" rowspan="" headers="" class="no-data" v-if='list.length<1'>
  							<img :src="no_data" alt=""> 
  							暂时没有数据
  						</td>
  					</tr>
					<tr v-for='(val,index) in list' :key='index' class="center">
						<td>{{val.name}}</td>
						<td>{{val.create_at}}</td>
						<!-- <td>{{val.expires_active_days}}</td> -->
						<td>
							<!-- <p v-for='item in val.roles'>{{item}}</p> -->
							{{$t('navbar.Personal_Developer')}}
						</td>
						<!-- <td>{{val.id}}</td> -->
					</tr>
  				</table>
  			</div>
  		</div>
  		<div class='modal' v-show='url_modal' @click.self='url_modal=false'>
  			<div class="backgroundFFF padding20 border-r5">
  				<div class="center marginB20">
  					{{$t('navbar.Please_just_send_the_link')}}
  				</div>
  				<div>
  					<input class="url" type="" name="" :value='url' readonly="readonly"> 
  					<button type="" class="btnColor width100px height30" @click='copy'>{{$t('navbar.Copy')}}</button>
  				</div>
  			</div>
  		</div>
  	</div>
</template>

<script>
	export default {
	    data(){
			return {
				trigger_img:require('@/assets/img/trigger-img.png'),
				url:'',
				url_modal:false,
				list:[],
				no_data:require('@/assets/img/no-data.png')
			}
		},
		created(){
			this.users()
    	},
		computed: {
			
		},
		methods: {
			invite(){//邀请接口
				var self=this
				this.ajax({
					url:'v1/invitations/',
					mode:'post',
					data:{
						roles:['domain_admin','operator'],
						projects:[],
					},
					success(res){
						self.url=window.location.origin+'/#/invite?v1/invitations/users/'+res.data.data.inviter_id+"/code/"+res.data.data.code
						self.url_modal=true
					}
				})
			},
			copy(){//复制
				 // 动态创建 input 元素
				  var aux = document.createElement("input");

				  // 获得需要复制的内容
				  aux.setAttribute("value", this.url);

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
			users(){
				var self=this
				this.ajax({
					url:'v1/users/',
					mode:'GET',
					data:{},
					success(res){
						for(let i=0;i<res.data.data.length;i++){
							res.data.data[i].create_at=self.$time_stamp(res.data.data[i].create_at)
							res.data.data[i].expires_active_days=self.$time_stamp(res.data.data[i].expires_active_days)
						}
						self.list=res.data.data
					}
				})
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
	.team-header .btn{
		width: 120px;
	}
	.url{
		width: 820px;
	}
	table{border-collapse:collapse;}
	table tr:last-child{
		border-bottom: 0px;
	}
	tr{
		border-bottom: 1px solid #d9d9d9
	}
	td{
		padding:25px 0px;
	}
</style>
