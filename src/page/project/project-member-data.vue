<template>
  	<div class='width80'>
  		<div class='size20 bold color30 marginB20 flex jc-sb al-ce'>
  			<p>{{$t('navbar.Member_profile')}}</p>
  			<!-- <p class="invite flex"><button type="" class="btnColor width150px height48 size18 marginR20" @click='invite_enroll'>邀请</button><button type="" class="btn86 width150px height46 size18" @click='addUser_modal'>加入</button></p> -->
  		</div>
  		<div class='list-box size18'> 
  			<div class='list flex jc-sb al-ce backgroundFFF border-r5 marginB20' v-for='(val,index) in list' :key='index'>
  				<div class="flex">
  					<div class="member-img marginR20">
	  					<img :src="member_img" alt="">
	  				</div>
	  				<div class="flex">
	  					<div class="flex fd-co jc-sb marginR20">
	  						<p class="width300px">{{$t('navbar.my')}}：{{val.name}}</p>
	  						<p class="color86">{{$t('navbar.Joined_Time')}}：{{val.create_at}}</p>
	  					</div>
	  					<!-- <div>
	  						所属域：域名称
	  					</div> -->
	  				</div>
  				</div>
  				<div class="flex al-ce">
  					<div class="icon">
	  					<!-- <img :src="edit" alt="" class="marginR30 cp ban"> -->
	  					<!-- <img class="cp" :src="del" alt="" @click='del_user(val,index)'> -->
	  				</div>
	  				<!-- <div class="color center nexus">
	  					自己
	  				</div> -->
  				</div>
  			</div>
  		</div>
  		<div class="modal" v-if='invite=="yes" || invite=="no"' @click.self='invite=false'>
  			<div class="backgroundFFF" v-if='invite=="yes"'>
  				<header class="header colorFFF size22 background11">
  					{{$t('navbar.Click_to_add_member')}}
  				</header>
  				<div class="user-box">
  					<label v-for='(item,index) in sure_add_list' class="marginR40 marginT20"><input type="checkbox" name="" :value="item" v-model='selectUser'>{{item.name}}</label>
  				</div>
  				<div class='paddingTB20 flex'>
  					<button type="" class="marginAuto btnColor width150px height38" @click='invite_user'>{{$t('navbar.Join')}}</button>
  				</div>
  			</div>
  			<div class="backgroundFFF padding20 border-r5" v-if='invite=="no"'>
  				<div class="center marginB20">
  					{{$t('navbar.Please_just_send_the_link_to_the_person_you_want_to_invite')}}
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
				member_img:require('@/assets/img/member.png'),
				edit:require('@/assets/img/edit-asd-icon.png'),
				del:require('@/assets/img/del-asd-icon.png'),
				list:[],//本项目用户列表
				AllList:[],//所有用户列表
				invite:false,//弹框
				selectUser:[],//选中的用户
				sure_add_list:[],//可加入项目用户列表
				url:'',
			}
		},
		created(){
			this.userList()
			this.allUserList()
    	},
		methods: {
			userList(){//项目成员列表
				var self=this
				this.ajax({  
					scope_token:localStorage.getItem('scope_token'),
					url:'/v1/projects/'+self.project_id+'/users/',
					mode:'GET',
				    data:{},
				    success(res){
				    	for(let i=0;i<res.data.data.length;i++){
				    		res.data.data[i].create_at=self.$time_stamp(res.data.data[i].create_at)
				    	}
				    	self.list=res.data.data
				    }
				})
			},
			allUserList(arr){//所有成员列表
				var self=this
				self.AllList=[]
				this.ajax({  
					scope_token:localStorage.getItem('scope_token'),
					url:'/v1/users/',
					mode:'GET',
				    data:{},
				    success(res){
				    	self.AllList=res.data.data
				    }
				})
			},
			addUser_modal(){//加入成员弹框
				this.sure_add_list=[]
				for(var i=0;i<this.AllList.length;i++){
		            var flag = true;
		            for(var j=0;j<this.list.length;j++){
		                if(this.AllList[i].id == this.list[j].id){
		                    flag = false;
		                }
		            }
		            if(flag){
		                this.sure_add_list.push(this.AllList[i]);
		            }
				}
				this.invite='yes'
			},
			invite_user(){//加入成员
				var arr=[]
				for(let a=0;a<this.selectUser.length;a++){
					arr.push(this.selectUser[a].id)
				}
				var self=this
				this.ajax({  
					scope_token:localStorage.getItem('scope_token'),
					url:'v1/projects/'+self.project_id+'/users/',
					mode:'post',
				    data:arr,
				    success(res){
				    	for(let x=self.selectUser.length-1;x>-1;x--){
				    		self.list.unshift(self.selectUser[x])
				    	}
				    	self.$success.center(self.$t('navbar.Successful_Added'))
				    	self.invite=false
				    }
				})
			},
			invite_enroll(){//邀请接口
				var self=this
				this.ajax({
					scope_token:localStorage.getItem('scope_token'),
					url:'v1/invitations/',
					mode:'post',
					data:{
						roles:['domain_admin','operator'],
						projects:[],
					},
					success(res){
						self.url=window.location.origin+'/#/invite?'+res.data.data.invitation_url
						self.invite='no'
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
				  this.invite=false
			},
			del_user(val,index){//移除项目成员
				if(val.name==localStorage.getItem('userName')){
					this.$violate.center(this.$t('navbar.Cannot_delete_myself'))
				}else{
					var arr=[val.id]
					var self=this
					 this.$prompt.center(self.$t('navbar.Do_you_want_to_remove_the_member'),{
			        	hid(){},
			        	confirm(){
			        		var _this=this
			        		self.ajax({
			        			scope_token:localStorage.getItem('scope_token'),
			        			url:'v1/projects/'+self.project_id+'/users/',
								mode:'DELETE',
							    data:arr,
							    success(res){
							    	self.list.splice(index,1)
							    	self.$success.center(self.$t('navbar.Remove_success'))
							    	_this.hid()
							    }
			        		})
			        	},
			        	cancel(){
			        		this.hid()
			        	},
			        });
				}
			}
		},
		computed: {
			project_id(){
				return this.$store.getters.projectID
			},
		},
		watch:{
			project_id(val){
				this.userList()
			}
		}
	}
</script>

<style scoped>

	.list{
		padding: 20px 42px;
	}
	.member-img{
		width: 80px;height: 80px;
	}
	.member-img img{
		width: 100%;height: 100%;
	}
	.icon{
		margin-right: 100px;
	}
	.icon img{
		width: 24px;height: 24px;
	}
	.nexus{
		width: 100px;
		flex-shrink: 0
	}
	.header{
		padding:22px 50px;
	}
	.user-box{
		width: 760px;
		padding:0px 50px;
	}
	.user-box label{
		width: 100px;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.user-box>label:nth-child(5n){
		margin-right: 0px;
	}
	.width300px{
		width: 300px;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.url{
		width: 820px;
	}
</style>
