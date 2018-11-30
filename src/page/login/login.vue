<template>
  	<div class="login flex jc-ce al-ce">
	  	<div class="form backgroundFFF border-r5">
	  		<div class="login-index-content-header center">
		  		<p class="marginB14"><img :src="logo" alt=""></p>
		  		<p class="size24">{{$t('navbar.Login_to_Xnmatrix_Cloud')}}</p>
		  	</div>
	  		<div class="input-box"  @keyup.enter='login'>
	  			<div class="input pr">
	  				<div class="name colorCC">{{$t('navbar.Username')}}</div>
	  				<div class="text-box">
	  					<input type="" name="" class='text size16 paddingLR10' :placeholder="$t('navbar.Email_Phone_number')" v-model='emailText' :style='{border:borderTel}'>
	  					<p class="red right tishi pa size12" v-if='tips_name'>{{$t('navbar.a52')}}</p>
	  				</div>
	  			</div>
	  			<div class="input">
	  				<div class="name colorCC">{{$t('navbar.Password')}}</div>
	  				<div class="text-box pr" v-if='pas_switch'>
	  					<input class='text size16 paddingLR10' type="text" name="" :placeholder="$t('navbar.Password')" v-model='pas' :style='{border:borderPas}'>
						<img :src="pas1" alt="" @click='pas_switch=false' class="pa cp pas-icon">
						<p class="red right tishi pa size12" v-if='tips_pas'>{{$t('navbar.a53')}}</p>
	  				</div>
	  				<div class="text-box pr" v-else>
	  					<input class='text size16 paddingLR10' type="password" name="" :placeholder="$t('navbar.Password')" v-model='pas' :style='{border:borderPas}'>
						<img :src="pas2" alt="" @click='pas_switch=true' class="pa cp pas-icon">
						<p class="red right tishi pa size12" v-if='tips_pas'>{{$t('navbar.a53')}}</p>
	  				</div>
	  			</div>
	  			<div class="login-btn">
	  				<button class="btnColor height44 width100 size16" type="" @click='login'>{{$t('navbar.Login')}}</button>
	  			</div>
	  			<div class="register-btn center">
	  				<router-link to='/register' class='size16'>{{$t('navbar.Register')}}</router-link>&emsp;|&emsp;<router-link to='/Forgot-password' class='size16'>{{$t('navbar.Forgot_password')}}?</router-link>
	  			</div>
	  		</div>
	  	</div>
  	</div>
</template>

<script>
	export default {
	    data(){
			return {
				pas_icon:require('@/assets/img/pas.svg'),
				logo:require('@/assets/img/logo.png'),
				// user:require('@/assets/img/user.svg'),
				pas1:require('@/assets/img/pas-icon1.png'),
				pas2:require('@/assets/img/pas-icon2.png'),
				emailText:'',
				pas:'',
				borderTel:'1px solid #dddee1',	//账号提示框
				borderPas:'1px solid #dddee1',	//密码提示框
				pas_switch:false,
				tips_name:false,
				tips_pas:false
			}
		},
		created(){
			if(this.$route.query.name){
				this.emailText=this.$route.query.name
			}    	},
		computed: {
		},
		methods: {
			login(){
				let self=this
				let tel = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/; //验证手机号
				let email= /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/  //验证邮箱
				var reg = /^[a-zA-Z]{1}([a-zA-Z0-9]){4,19}$/;//只能输入5-20个以字母开头
				if(self.emailText && self.pas && (tel.test(self.emailText) || email.test(self.emailText)) &&  reg.test(self.pas)){
					self.ajax({
		   				login:true,
						mode:'post',
						url:'v1/oauth2/tokens/',
						data:'grant_type=password&username='+ self.emailText+'&password='+ self.pas,
						success(response){
							if(response.status === 201) {
			                	if(response.data.data.is_system_admin){
			                		this.$fail.center(self.$t('navbar.Your_authority_is_too_high_to_login'));
			                	}else{
			                		localStorage.token = response.data.data.access_token;
			                		localStorage.userName = self.emailText;
				                    localStorage.refresh_token=response.data.data.refresh_token;
				                    localStorage.domain_id=response.data.data.domain_id;
				                    localStorage.isCloudAdmin = true;
				                    localStorage.isSystemAdmin = false;
				                    localStorage.userId = response.data.data.user_id;
				                    localStorage.expires_in=response.data.data.expires_in
				                    // self.$store.commit('SET',response.data.data.expires_in) //更新token
				                    // OVERTIME(response.data.data.expires_in)
				                    if(self.$route.query.invite){ //是否是邀请用户
				                    	self.invite(localStorage.getItem('invite'))
				                    }else{
				                    	self.$router.push('/myProduct');
				                    }
			                	}
			                }
						}
					})
				}else{
					if(!self.emailText){
						self.tips_name=true
						// self.$violate.center(self.$t('navbar.Please_enter_your_email_or_phone_number'))
						// self.borderTel='2px solid red'
					}else if(!(tel.test(self.emailText) || email.test(self.emailText))){
						self.tips_name=true
						// self.$violate.center(self.$t('navbar.Please_enter_your_email_phone_number_in_correct_format'))
						// self.borderTel='2px solid red'
					}else if(!self.pas){
						self.tips_pas=true
						// self.$violate.center(self.$t('navbar.Please_enter_your_password'))
						// self.borderPas='2px solid red'
					}else if(!reg.test(self.pas)){
						self.tips_pas=true
						// self.$violate.center(self.$t('navbar.Please_enter_the_correct_password'))
						// self.borderPas='2px solid red'
					}
				}
			},
			invite(str){
				var self=this
				self.axios.post(str, {},{
					headers:{
						'Authorization': "Bearer " + localStorage.getItem('token'),
	        			'Content-Type': 'application/json'
					}
				}).then(function (response) {
				　　self.$router.push('/myProduct')
					localStorage.invite=null
				}).catch(function (error) {
					self.$fail.center(error.response.data.message)
				});
			},
			// openLoading(){
		 //        this.$prompt.center('测试11',{
		 //        	hid(){},
		 //        	confirm(){
		 //        		console.log(11111)
		 //        		this.hid()
		 //        	},
		 //        	cancel(){console.log(322222),this.hid()},
		 //        });
		 //    },
		},
		watch: {
			
		}
	}
</script>

<style scoped>
	.login{
		height: 100%;
		width: 100%;
		background-image: url(../../assets/img/login-background.png);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100% 100%;

	}
	.form{
		width: 510px;
		padding:40px;
		box-shadow: 0px -5px 80px rgba(0,0,0,.5), 0px 20px 20px rgba(0,0,0,.5);
		border-radius: 15px;
	}
	.login-index-content-header{
		margin-bottom:36px;
	}
	.login-index-content-header img{
		display: block;
		margin: auto;
		width: 120px;
	}

	.input{
		margin-bottom: 25px;
	}

	.text{
		display: inline-block;
		width: 100%;
		height: 44px;
	}
	.login-btn button{
		height: 44px;
		margin-top: 20px;
	}
	.register-btn{
		margin-top:14px;color:#999;
	}
	.register-btn a{
		color:#999;
	}

	.pas-icon{
	    width: 20px;
	    right: 15px;
	    top: 50%;
	    transform: translateY(-50%);
	}
	.name{
		margin-bottom: 10px;
	}
	.tishi{
		right: 0px;bottom: -20px;
	}
</style>
