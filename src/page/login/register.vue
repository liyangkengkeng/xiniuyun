<template>
  	<div class="register flex jc-ce al-ce">
  		<div>
  			<div class="modify_pas-index-content-header center colorFFF margin58">
		  		<p class="size36 marginB14">{{$t('navbar.a55')}}</p>
		  		<p class="size16">{{$t('navbar.Please_complete_the_required_field')}}</p>
		  	</div>
		  	<div class="register-box backgroundFFF border-r5">
			  	<div class="table-nav flex center color30 size16" v-if='language=="zh"'>
		  			<p class="width100 cp" @click='mode=true'><span class="paddingTB20" :class=' !mode ? "" : "border4f"'>{{$t('navbar.Phone_number')}}</span></p>
		  			<p class="width100 cp" @click='mode=false'><span class="paddingTB20" :class='mode ? "" :"border4f" '>{{$t('navbar.Email')}}</span></p>
		  		</div>
		  		<div class="table-nav flex center color30 size16" v-else>
		  			<p class="width100 cp" @click='english_version'><span class="paddingTB20" :class=' !mode ? "" : "border4f"'>{{$t('navbar.Phone_number')}}</span></p>
		  			<p class="width100 cp"><span class="paddingTB20" :class='mode ? "" :"border4f" '>{{$t('navbar.Email')}}</span></p>
		  		</div>
		  		<div class="form">
			  		<div class="input-box">
			  			<div class="input marginB14">
			  				<div class="name colorCC">{{$t('navbar.Username')}}</div>
			  				<input v-if='mode' type="text" class='text paddingLR20' name="" :placeholder="$t('navbar.Phone_number')" v-model='emailText' :style='{border:borderTel}'></input>
			  				<input v-else type="text" class='text paddingLR20' name="" :placeholder="$t('navbar.Email')" v-model='emailText' :style='{border:borderTel}'></input>
			  			</div>
			  			<div class="input marginB14">
			  				<div class="name colorCC">{{$t('navbar.a54')}}</div>
			  				<div class=" content code flex">
			  					<input type="text" class='text paddingLR20 width100' name="" :placeholder="$t('navbar.character_verification_code')" maxlength="4" v-model='code' :style='{border:borderCode}'></input>
			  					<button @click='sendCode' :disabled='codeSend' :class='codeSend ? "btn86":"btnColor"' class="height44" >{{codeBtn}}</button>
			  				</div>
			  			</div>
			  			<div class="input marginB14 pr">
			  				<div class="name colorCC">{{$t('navbar.Password')}}</div>
			  				<input type="password" class='text paddingLR20' name="" :placeholder="$t('navbar.Please_enter_5_20_characters')" v-model='pas' @focus='pas_format=true' @blur='pas_format=false' :style='{border:borderPas}'></input>
			  				<span class="pas-format pa size12 border-r5 backgroundFFF" v-show='pas_format'>{{$t('navbar.character_started_with_letter')}}</span>
			  			</div>
			  			<div class="input marginB14">
			  				<div class="name colorCC">{{$t('navbar.Please_confirm_your_password')}}</div>
			  				<input type="password" class='text paddingLR20' name="" :placeholder="$t('navbar.Please_confirm_your_password')" v-model='co_pas'  @blur="blur_co_pas"  :style='{border:borderCopas}'></input>
			  			</div>
			  			<div class="agreement marginB14">
			  				<div>
			  					<div class="pr flex al-ce">
			  						<p class="icon-box" @click='checked=true'></p>
			  						<img class='success-icon pa' :src="success" alt=""  @click='checked=false' :class='checked ? "" : "hidden"'>
			  						<input type="checkbox" id="mike" :checked="checked" value="Mike" v-model="xieyi" class='hidden'></input>
			  						<a :href="register_url" :class='user_protocol ? "red" : ""' title="" target="view_frame">{{$t('navbar.User_Terms_and_conditions')}}</a>
			  					</div>
			  				</div>
				  			<!-- <label class="">
				  				<input type="checkbox" id="mike" value="Mike" v-model="xieyi"></input>
				  				<a href="www.baidu.com" :class='user_protocol ? "red" : ""' title="" target="view_frame">{{$t('navbar.User_Terms_and_conditions')}}</a>
				  			</label> -->
				  		</div>
			  			<div class="register-btn">
			  				<!-- <Button type="primary" long class='cp' @click='register'>注册</Button> -->
			  				<button type="" class='btnColor width100 height44' @click='register'>{{$t('navbar.Create_an_Account')}}</button>
			  			</div>
			  			
			  			<div class="login center">
				  			<router-link to='/login' class='color99 size14'>{{$t('navbar.Registered_User_Login')}}</router-link>
				  		</div>
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
				username:'',
				emailText:'',		//账号输入框
				pas:'',			//密码输入框
				pas_format:false,
				co_pas:'',		//确认密码输入框
				code:'',		//验证码
				codeSend:false,
				xieyi:null,		
				borderTel:'1px solid #dddee1',	//账号提示框
				borderPas:'1px solid #dddee1',	//密码提示框
				borderCopas:'1px solid #dddee1',   //确认密码提示框
				borderCode:'1px solid #dddee1',   //验证码
				mode:true,//账号类型
				codeBtn:this.$t('navbar.Send_verification_code'),
				user_protocol:false,
				set:null,
				success:require('@/assets/img/success-icon.png'),
				checked:false,
				register_url:'http://172.168.0.84:81/en-us/protocol.html'
			}
		},
		created(){
			// this.register_url=REGISTER_ZH_URL
			if(this.$i18n.locale=='en')
				this.mode=false
		},
		beforeDestroy(){
			clearInterval(this.set)
		},
		methods: {
			// 提交
			register(){
				var self=this
				var reg;
				var obj={
                	username:self.emailText,
					password:self.pas,
					
					code:self.code,
                }
				if(self.mode){
					reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/; //验证手机号
					obj.phone=self.emailText
				}else{
					reg= /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/  //验证邮箱
					obj.email=self.emailText
				}
				var pas=/^[a-zA-Z]{1}([a-zA-Z0-9]){4,19}$/;//只能输入5-20个以字母开头、

				if(reg.test(self.emailText) && pas.test(self.pas) && self.pas===self.co_pas && self.code && self.checked){
		   			self.ajax({
		   				login:true,
						mode:'post',
						url:'v1/registry/',
						data:obj,
						success(res){
							if(self.$route.query.invite){
								self.$router.push({path:'/login',query:{name:self.emailText,invite:self.$route.query.invite}})
								self.$success.center(self.$t('navbar.a37'))
							}
							else
								self.$router.push({path:'/login',query:{name:self.emailText}})
						}
					})
				}else{
					
					if(!self.emailText){
						var a=!self.mode ? self.$t('navbar.Please_enter_your_email') : self.$t('navbar.Please_enter_your_phone_number')
						self.$violate.center('提示：请输入'+a)
						self.borderTel='2px solid red'
						return false
					}else if(!reg.test(self.emailText)){
						var b=!self.mode ? self.$t('navbar.Please_enter_your_email_right') : self.$t('navbar.Please_enter_your_phone_number_right')
						self.$violate.center(b)
						self.borderTel='2px solid red'
						return false
					}
					if(!self.code){
						self.$violate.center(self.$t('navbar.Please_enter_verification_code'))
						self.borderCode='2px solid red'
						return false
					}
					if(!self.pas){
						self.$violate.center(self.$t('navbar.Please_enter_your_password'))
						self.borderPas='2px solid red'
						return false
					}else if(!pas.test(self.pas)){
						self.$violate.center(self.$t('navbar.Please_enter_the_correct_password'))
						self.borderPas='2px solid red'
						return false
					}	
					if(self.pas!==self.co_pas){
						self.$violate.center(self.$t('navbar.Passwords_unmatched_please_re_enter'))
						self.borderCopas='2px solid red'
						return false
					}
					
					if(!self.checked){
						self.$violate.center(self.$t('navbar.conditions_and_register'))
						self.user_protocol=true
						return false
					}
				}	

			},
			blur_co_pas(){
				// (pas===co_pas ? borderCopas='1px solid #dddee1' : borderCopas='2px solid red')
				if(this.co_pas){
					if(this.co_pas==this.pas){
						this.borderCopas='1px solid #dddee1'
					}else{
						this.borderCopas='2px solid red'
						this.$violate.center(this.$t('navbar.Passwords_unmatched_please_re_enter'))
					}
				}else{
					this.$violate.center(this.$t('navbar.Please_confirm_your_password'))
				}
			},
			sendCode(){//获取验证码
				var self=this
				var reg,url,num=59;
				var type = this.language=="zh" ? 0 : 1 
				if(this.mode){
					reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/; //验证手机号
					url='v1/verifycode/?user='+self.emailText+'&phone='+self.emailText+'&language='+self.language+'&type=0'
				}else{
					reg= /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/  //验证邮箱
					url='v1/verifycode/?user='+self.emailText+'&email='+self.emailText+'&language='+self.language+'&type=0'
				}
				
				if(reg.test(self.emailText)){
					// self.codeBtn='重新发送（59）'
					self.ajax({
		   				login:true,
						mode:'post',
						url:url,
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
				}else{
					
					if(!self.emailText){
						var a=!self.mode ? self.$t('navbar.Please_enter_your_email') : self.$t('navbar.Please_enter_your_phone_number')
						self.$violate.center(a)
						self.borderTel='2px solid red'
					}else if(!reg.test(self.emailText)){
						var b=!self.mode ? self.$t('navbar.Please_enter_your_email_right') : self.$t('navbar.Please_enter_your_phone_number_right')
						self.$violate.center(b)
						self.borderTel='2px solid red'
					}
				}
			},
			english_version(){
				this.$violate.center(this.$t('navbar.a56'))
			}
		},
		computed:{
			language(){
				if(this.$i18n.locale=='en'){
					this.register_url=REGISTER_EN_URL
				}else{
					this.register_url=REGISTER_ZH_URL
				}
    			return this.$i18n.locale
    		}
		},
		watch: {
			xieyi(val){
				this.user_protocol = !val
			},
			language(val){
				if(val=='en'){
					this.mode=false
				}
			}
		}
	}
</script>

<style scoped>
	.register{
		height: 100%;
		width: 100%;
		background-image: url(../../assets/img/login-background.png);
		background-repeat: no-repeat;
		background-position: center;
		background-size: 100% 100%;
	}
	.register-box{
		width: 510px;
		box-shadow: 0px -5px 80px rgba(0,0,0,.5), 0px 20px 20px rgba(0,0,0,.5);
		border-radius: 15px;
	}
	.table-nav{
		border-bottom: 1px solid rgba(79,83,98,0.3);
	}
	.table-nav span{
		display: inline-block;
		width: 60%;
	}
	.form{
		padding:0px 53px 25px;
	}
	.register-index-content-header{
		font-size: 30px;
		color: #fff;
	}
	.register-index-content-header img{
		display: block;
		margin: auto;
		width: 50px;
	}
	.input-box{
		margin-top:20px;
	}
	.code input{
		display: inline-block;
	}
	.code button{
		display: inline-block;
		margin-left: 10%;width: 120px;flex-shrink: 0
	}
	.text{
		display: inline-block;
		width: 100%;
		height: 44px;
		border-radius: 4px;
	}

	.register-btn button{
		/*margin-top: 18px;*/
	}

	.login{
		margin-top:13px;
	}
	
	.pas-format{
		width: 250px;
		display: inline-block;
		padding:5px 10px;
		border:1px solid red;
		right: -259px;
		top: -10px;
		z-index: 10
	}
	.pas-format::after{
		content:'';
		display: inline-block;
		border-top:20px solid red;
		border-right:5px solid transparent;
		border-left:5px solid transparent;
		border-bottom:20px solid transparent;
		/*border-top: 10px solid red;*/
		position: absolute;
		left: -17px;
		bottom: -32px;
		transform: rotate(45deg);
	}
	.agreement a:hover{
		color:#11A9A4;
	}
	.agreement input{
		width:12px;
		/*margin-bottom: 0px;*/
	}
	.margin58{
		margin-bottom: 58px;
	}
	.name{
		margin-bottom: 3px;font-size: 12px;
	}
	.border4f{
		border-bottom: 3px solid #4F5362
	}
	.icon-box{
		width: 15px;
	    height: 15px;
	    border: 1px solid #d9d9d9;
	    display: inline-block;
	    margin-right: 5px;
	}
	.success-icon{
		top: 0px;
	    left: -4px;
	    width: 23px;
	    display: block;
	}
	.hidden{
		display: none;
	}
</style>
