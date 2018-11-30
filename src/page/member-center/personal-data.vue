<template>
  	<div class="personal-data">
		<div class="personal-data-header backgroundF0 padding20">
			<span class="borderB3 paddingB5 size24 bold">{{$t('navbar.Personal_Information')}}</span>
		</div>
  		<div class='personal-data-box color86 size16'>
				<div class="color30 marginB20">
					{{$t('navbar.Basic_information')}}
				</div>
				<div class='personal-data-name marginB20 line-height38'>
					<span class="marginR20 width100px">{{$t('navbar.Username')}}：</span>
					<input class="width500 ban" type="" name="" v-model='my_data.name' disabled="display">
				</div>
				<!-- <div class="personal-data-img flex marginB20 line-height38">
					<div class="marginR20">
						头像：
					</div>
					<div class="upload-box flex">
						<p class="upload-img border marginR20 backgroundFFF">
							<img :src="img" alt="">
						</p>
						<p class="btn86 width100px height36 size14 pr ban">上传<!-- <input type="file" id='file' class="file btn86 width100px height36 pa" @change='change'> --><!--</p>
					</div>
				</div> -->
				
				<div class="flex marginB20 line-height38">
					<div class="marginR20 width100px">{{$t('navbar.Password')}}：</div>
					<div class="flex al-fe">
						<div class="width400 marginR20">
							<p class="marginB10"><input class="width500" @blur='blur_used' :style='{border:borderUsed}' type="" name="" :placeholder="$t('navbar.Please_enter_your_old_password')" v-model='former_pas'></p>
							<p class="marginB10"><input class="width500" @blur='blur_new' :style='{border:borderNew}' type="" name="" :placeholder="$t('navbar.Please_enter_your_new_password')" v-model='now_pas'></p>
							<p><input type="" name="" class="width500" @blur='blur_news' :placeholder="$t('navbar.Please_confirm_your_new_password')" :style='{border:borderNews}' v-model='nows_pas'></p>
						</div>
						<div>
							<!-- <button type="" class="btn86 width100px height36" @click='edit_pas'>确定</button> -->
						</div>
					</div>
					
				</div>
				<div class="marginB20 color30 line-height38">
					{{$t('navbar.Register_information')}}
				</div>
				<div class="flex marginB20 line-height38">
					<p class="marginR20">{{$t('navbar.Register_Time')}}：</p><p class="flex jc-sb width500">{{my_data.create_at}}</p>
				</div>
				<div class="flex marginB20 line-height38">
					<p><button class="btnColor width100px height36" type="" @click='sub'>{{$t('navbar.Save')}}</button></p>
				</div>
  		</div>
  	</div>
</template>

<script>
	export default {
	    data(){
			return {
				img:require('@/assets/img/head-img.png'),
				name:'',
				my_data:{},//我的信息
				former_pas:'',//旧密码
				now_pas:'',//新密码
				nows_pas:'',//再次输入新密码
				borderUsed:'1px solid #d9d9d9',
				borderNew:'1px solid #d9d9d9',
				borderNews:'1px solid #d9d9d9',
			}
		},
		created(){
			this.users()
		},
		methods: {
			change(event){//上传头像
				var self=this
				var file = new FileReader();
		        file.readAsDataURL(event.currentTarget.files[0]);
		        file.onload = function (url) {
		           	self.img=url.currentTarget.result
		           	document.getElementById('file').outerHTML=document.getElementById('file').outerHTML.replace(/(value=\").+\"/i,"$1\""); 
		        };
			},
			users(){//个人信息
				var self=this
				self.ajax({
					url:'v1/users/'+localStorage.getItem("userId")+'/',
					mode:'GET',
					data:{},
					success(res){
						self.my_data=res.data.data
						self.my_data.create_at=self.$time_stamp(self.my_data.create_at)
						self.my_data.expires_active_days=self.$time_stamp(self.my_data.expires_active_days)
					}
				})
			},
			modify(data){//修改信息
				this[data]=false
			},
			edit_pas(data){//展示修改信息
				
			},
			sub(){//提交修改的信息
				var self=this
				var pas=/^[a-zA-Z]{1}([a-zA-Z0-9]){4,19}$/;
				if(self.former_pas && pas.test(self.former_pas) && self.now_pas && self.nows_pas && pas.test(self.now_pas) && self.now_pas===self.nows_pas){
					self.ajax({
						url:'v1/users/'+localStorage.getItem('userId')+'/password/',
						mode:'PUT',
						data:{
							old_password:self.former_pas,
							new_password:self.now_pas
						},
						success(res){
							self.$success.center(self.$t('navbar.'))
							self.former_pas=''
							self.now_pas=''
							self.nows_pas=''
							self.ajax({
								url:'v1/oauth2/tokens/'+localStorage.getItem('token'),
								mode:'DELETE',
								data:{},
								success(ress){
									self.$router.push({path:'/login',query:{name:localStorage.getItem('userName')}})
								}
							})
						}
					})
				}else{
					if(!self.former_pas){
						self.$violate.center(self.$t('navbar.Old_password_cannot_be_empty'))
						self.borderUsed='2px solid red'
					}else if(!pas.test(self.former_pas)){
						self.$violate.center(self.$t('navbar.Old_password_format_wrong'))
						self.borderUsed='2px solid red'
					}else if(self.now_pas){
						self.$violate.center(self.$t('navbar.New_password_cannot_be_empty'))
						self.borderNew='2px solid red'
					}else if(!pas.test(self.now_pas)){
						self.$violate.center(self.$t('navbar.New_password_format_wrong'))
						self.borderNew='2px solid red'
					}else if(self.now_pas!==self.nows_pas){
						self.$violate.center(self.$t('navbar.Passwords_unmatched'))
						self.borderNews='2px solid red'
					}
				}
			},
			blur_used(){
				var pas=/^[a-zA-Z]{1}([a-zA-Z0-9]){4,19}$/;
				if(!this.former_pas){
					this.$violate.center(self.$t('navbar.Old_password_cannot_be_empty'))
					this.borderUsed='2px solid red'
				}else if(!pas.test(this.former_pas)){
					this.$violate.center(self.$t('navbar.Old_password_format_wrong'))
					this.borderUsed='2px solid red'
				}else{
					this.borderUsed='1px solid #d9d9d9'
				}
			},
			blur_new(){
				var pas=/^[a-zA-Z]{1}([a-zA-Z0-9]){4,19}$/;
				if(!this.now_pas){
					this.$violate.center(self.$t('navbar.New_password_cannot_be_empty'))
					this.borderNew='2px solid red'
				}else if(!pas.test(this.now_pas)){
					this.$violate.center(self.$t('navbar.New_password_format_wrong'))
					this.borderNew='2px solid red'
				}else{
					this.borderNew='1px solid #d9d9d9'
				}
			},
			blur_news(){
				if(this.now_pas!==this.nows_pas){
					this.$violate.center(self.$t('navbar.Passwords_unmatched'))
					this.borderNews='2px solid red'
				}else{
					this.borderNews='1px solid #d9d9d9'
				}
			}
		},
		watch: {
			
		}
	}
</script>

<style scoped>
	.personal-data-header,.personal-data-box{
		min-width: 965px;
		padding:20px 110px;
	}
	.personal-data-box span{
		display: inline-block;
	}

	.upload-box{
		align-items: flex-end;
	}

	.upload-img{
		width: 190px;height: 150px;
	}
	.upload-img img{
		width: 100%;height: 100%;
	}
	.file{
		display: block;
		top: 0px;left: 0px;opacity: 0;
	}
	.width500{
		width: 500px;
	}
	.width400{
		width: 380px;
	}
</style>
