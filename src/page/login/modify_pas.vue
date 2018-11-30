<template>
  	<div class="modify_pas flex jc-ce al-ce">
  		<div>
  			<div class="modify_pas-index-content-header center colorFFF margin58">
		  		<p class="size36 marginB14">{{$t('navbar.Forgot_password')}}</p>
		  		<p class="size16">{{$t('navbar.You_may_reset_your_password_after_verification')}}</p>
		  	</div>
		  	<div class="form backgroundFFF border-r5">
		  		<div class="input-box size4">
		  			<div class="input ">
		  				<div class="name colorCC">{{$t('navbar.Username')}}</div>
		  				<input type="text colorCC" class='text' name="" :placeholder="$t('navbar.please_enter_your_registered_phone_number_email')" v-model='emailText' :style='{border:borderTel}'></input>
		  			</div>
		  			<div class="input ">
		  				<div class="name colorCC">{{$t('navbar.a54')}}</div>
		  				<div class="content flex code">
		  					<input type="text" class='text paddingLR20' name="" :placeholder="$t('navbar.character_verification_code')" v-model='code' :style='{border:borderCode}'></input>
		  					<button @click='sendCode' :disabled='codeSend' :class='codeSend ? "btn86":"btnColor"' class="height44" >{{codeBtn}}</button>
		  				</div>
		  			</div>
		  			<div class="input ">
		  				<div class="name colorCC">{{$t('navbar.Password')}}</div>
		  				<input class='text paddingLR20 colorCC' type="password" name="" :placeholder="$t('navbar.Please_enter_5_20_characters')" v-model='pas'   :style='{border:borderPas}'></input>
		  			</div>
		  			<div class="input ">
		  				<div class="name colorCC">{{$t('navbar.Please_confirm_your_password')}}</div>
		  				<input class='text paddingLR20 colorCC' type="password" name="" :placeholder="$t('navbar.Please_confirm_your_password')" v-model='co_pas'  @blur="(pas===co_pas ? borderCopas='1px solid #dddee1' : borderCopas='2px solid red')"  :style='{border:borderCopas}'></input>
		  			</div>
		  			<div class="modify_pas-btn">
		  				<button type="" class='btnColor height44 width100' @click='register'>{{$t('navbar.Submit')}}</button>
		  				<!-- <Button type="primary" long class='cp' @click='register'>提交</Button> -->
		  			</div>
		  			<div class="center marginTB10">
		  				<router-link to='login' class='color99 size14'>{{$t('navbar.Back_to_login_page')}}</router-link>
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
				logo:require('@/assets/img/logo.png'),
				emailText:'',		//账号输入框
				pas:'',			//密码输入框
				co_pas:'',		//确认密码输入框
				xieyi:[],
				borderTel:'1px solid #dddee1',	//账号提示框
				borderPas:'1px solid #dddee1',	//密码提示框
				borderCopas:'1px solid #dddee1',   //确认密码提示框
				borderCode:'1px solid #dddee1',
				code:'',				//验证码
				codeBtn:this.$t('navbar.Send_verification_code'),
				codeSend:false,
				set:null
			}
		},
		created(){
		},
		computed: {
			
		},
		beforeDestroy(){
			clearInterval(this.set)
		},
		methods: {
			// 提交
			register(){
				var self=this
				var email= /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
				var	tel = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
				var pas=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;
				var obj={}
				if(email.test(self.emailText)){
					obj.email=self.emailText
					self.borderTel='1px solid #d9d9d9'
				}else if(tel.test(self.emailText)){
					obj.phone=self.emailText
					self.borderTel='1px solid #d9d9d9'
				}else{
					self.$violate.center(self.$t('navbar.Please_enter_your_email_phone_number_in_correct_format'))
					self.borderTel='2px solid red'
					return false
				}
				obj.code=self.code
				obj.new_password=self.pas
				if((email.test(self.emailText)||tel.test(self.emailText)) && pas.test(self.pas) && self.pas===self.co_pas && self.code){
					self.ajax({
						url:'v1/passwords/',
						mode:'post',
						data:obj,
						success(rel){
							self.$success.center(self.$t('navbar.Change_successful'))
							self.$router.push({path:'/login',query:{name:self.emailText}})
						}
					})
				}else{
					if(!self.emailText){
						self.$violate.center(self.$t('navbar.Please_enter_your_email_or_phone_number'))
						self.borderTel='2px solid red'
					}else if(!(email.test(self.emailText))||tel.test(self.emailText)){
						self.$violate.center(self.$t('navbar.Please_enter_your_email_phone_number_in_correct_format'))
						self.borderTel='2px solid red'
					}
					if(!self.pas){
						self.$violate.center(self.$t('navbar.Please_enter_your_password'))
						self.borderPas='2px solid red'
					}else if(!pas.test(self.pas)){
						self.$violate.center(self.$t('navbar.character_started_with_letter'))
						self.borderPas='2px solid red'
					}	
					if(self.pas!==self.co_pas){
						self.$violate.center(self.$t('navbar.Passwords_unmatched_please_re_enter'))
						self.borderCopas='2px solid red'
					}
					if(!self.code){
						self.$violate.center(self.$t('navbar.Please_enter_verification_code'))
						self.borderCode='2px solid red'
					}
				}	
			},
			
			// 发送验证码
			sendCode(){
				var self=this
				var url,num=59;
				var email= /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
				var	tel = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
				if(!self.emailText){
					self.$violate.center(self.$t('navbar.Please_enter_your_email_or_phone_number'))
					self.borderTel='2px solid red'
					return false
				}
				if(email.test(self.emailText)){
					url='email'
				}else if(tel.test(self.emailText)){
					url='phone'
				}else{
					self.$violate.center(self.$t('navbar.Please_enter_your_email_phone_number_in_correct_format'))
					self.borderTel='2px solid red'
					return false
				}
				self.ajax({
	   				login:true,
					mode:'post',
					url:'v1/verifycode/?user='+self.emailText+'&'+url+'='+self.emailText+'&language='+self.language+'&type=1',
					data:{},
					success(res){
						self.codeSend=true
						self.set=setInterval(function(){
							num--
							self.codeBtn=self.$t('navbar.Resend')+'（'+num+'）'
							if(num<1){
								clearInterval(self.set)
								self.codeBtn=self.$t('navbar.Resend')
								self.codeSend=false
							}
						},1000)
					}
				})
			},
		},
		computed:{
			language(){
    			return this.$i18n.locale
    		}
		},
		watch: {
		}
	}
</script>

<style scoped>
	.modify_pas{
		height: 100%;
		width: 100%;
		background-image: url(../../assets/img/login-background.png);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100% 100%;
	}
	.modify_pas .form{
		padding: 40px;
		width: 510px;
		box-shadow: 0px -5px 80px rgba(0,0,0,.5), 0px 20px 20px rgba(0,0,0,.5);
		border-radius: 15px;
	}
	.input-box{
		/*margin-top: 36px;*/
	}
	.input{
		margin-bottom: 15px;
	}
	.text{
		display: inline-block;
		width: 100%;
		height: 44px;
		border-radius: 4px;
		padding:0px 20px;
	}
	.text input{
		border:0px;
	}

	.code button,.code input{
		display: inline-block;
		width: 47%;
	}
	.code button{
		margin-left: 10%;
	}
	
	.modify_pas-btn button{
		margin-top: 18px;
	}
	.margin58{
		margin-bottom: 58px;
	}
	.name{
		margin-bottom: 4px;font-size: 12px;
	}
</style>
