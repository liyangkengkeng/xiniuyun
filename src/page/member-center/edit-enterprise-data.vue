<template>
  	<div class="edit-enterprise-data">
		<div class="edit-enterprise-data-header backgroundF0 padding20">
			<span class="borderB3 paddingB5 size24 bold">{{$t('navbar.Company_information')}}</span>
		</div>
  		<div class='edit-enterprise-data-box color86 size16'>
			<div class="data flex jc-sb al-ce size20"><span class="bold color30">{{$t('navbar.Company_Data')}}</span><span class="color bold">{{$t('navbar.Company_Developer')}}</span>
			</div>
			<!-- <div class="marginT40 flex input-box  al-ce"> 
				<div>
					<span>姓名：</span>
				</div>
				<div class="width100 flex">
					<input class="width100 marginR40 paddingLR20" type="" name="" placeholder="名">
					<input class="width100 paddingLR20" type="" name="" placeholder="姓">
				</div>
			</div> -->
			<div class="marginT30 flex input-box  al-ce"> 
				<div>
					<span class="must">{{$t('navbar.Company_Name')}}：</span>
				</div>
				<div class="width100">
					<input class="width100 paddingLR20" type="" name="" v-model='display_name'>
				</div>
			</div>
			<div class="marginT30 flex input-box  al-ce"> 
				<div>
					<span>{{$t('navbar.Country_Based')}}：</span>
				</div>
				<div class="width100">
					<select name="" class="width100 height38 paddingLR20" v-model='country'>
						<option value="China">{{$t('navbar.China')}}</option>
					</select>
				</div>
			</div>
			<div class="marginT30 flex input-box"> 
				<div>
					<span class="must">{{$t('navbar.Company_Address')}}：</span>
				</div>
				<div class="width100">
					<div>
						<select-city v-model="cityInfo" class="select-city" @input="chooseAddress"></select-city>
					</div>
					<div class="marginT30">
						<input class="width100 color86 paddingLR20" type="" name="" :placeholder="$t('navbar.Address_Details')" v-model='address'>
					</div>
				</div>
			</div>
			<div class="marginT30 flex input-box  al-ce"> 
				<div>
					<span class="must">{{$t('navbar.Contact_number')}}：</span>
				</div>
				<div class="width100">
					<input class="width100 paddingLR20" type="" name="" v-model='contacts_phone'>
				</div>
			</div>
			<div class="marginT30 flex input-box al-ce"> 
				<div>
					<span class="must">{{$t('navbar.Verification')}}：</span>
				</div>
				<div class="width100 flex al-ce">
					<!-- <select name="" class="marginR10 width100 height38 paddingLR20">
						<option value="">邮箱验证</option>
						<option value="">手机验证</option>
					</select> -->
					<span class="marginR40">{{userName}}</span>
					<input type="" name="" :placeholder="$t('navbar.Please_enter_verification_code')" class="marginR10 width100 height38 paddingLR20" v-model='codeText'>
					<button type="" class="btnColor height38 width120px code" :class='codeSend ? "ban" : ""' :disabled='codeSend' @click='code'>{{codeBtn}}</button>
				</div>
			</div>
			<div class="flex input-box marginT30">
				<div><span></span></div>
				<div><button type="" class="btnColor width200px height38 sub size18" @click='sub'>{{$t('navbar.Submit')}}</button></div>
			</div>
  		</div>
  	</div>
</template>

<script>
import SelectCity from '../../components/city'
	export default {
	    data(){
			return {
				head:require('@/assets/img/memberCenter.png'),
				enterprise:require('@/assets/img/enterprise.png'),
				flagship:require('@/assets/img/flagship.png'),
				cityInfo:null,
				country:'',
				show:false,
				userName:'',
				display_name:'',//公司名称
				type:'',//公司类型
				size:'',//公司规模
				contacts_name:'',//联系人
				contacts_title:'',//联系人职位
				contacts_phone:'',//联系人手机
				contacts_email:'',//联系人邮箱
				address:'',//详细地址
				location:'',  //区域
				codeText:'',
				codeBtn:'发送验证码',
				codeSend:false,
			}
		},
		created(){
			this.userName=localStorage.getItem('userName')
			if(localStorage.getItem('userName').indexOf('@')>-1){
				this.show=false  //邮箱登陆
			}else{
				this.show=true  //手机登录
			}
			
    	},
		methods: {
	        sub(){//提交信息
	        	var self=this
	        	if(self.display_name && self.address && self.contacts_phone && self.codeText){
	        		this.ajax({
		        		url:'v1/domains/'+localStorage.getItem('domain_id')+'/',
						mode:'PUT',
						data:{
							display_name:self.display_name,//公司名称
							type:self.type,//公司类型
							size:self.size,//公司规模
							contacts_name:self.contacts_name,//联系人
							contacts_title:self.contacts_title,//联系人职位
							contacts_phone:self.contacts_phone,//联系人手机
							contacts_email:self.contacts_email,//联系人邮箱
							address:self.address,//详细地址
							location:self.location,  //区域
						},
						success(res){
							self.$success.center(self.$t('navbar.Save_Successful'))
							self.$emit('openUp',true)
						}
		        	})
	        	}else{
	        		self.$violate.center(self.$t('navbar.Please_fill_the_form'))
	        	}
	        	
	        },
	        code(){
	        	var self=this,num=59;
	        	var type =  this.language=="zh" ? 0 : 1 
	        	var url=this.show ? 'v1/verifycode/?user='+self.userName+'&phone='+self.userName+'&type='+type : 'v1/verifycode/?user='+self.userName+'&email='+self.userName+'&type='+type
	        	self.ajax({
	   				login:true,
					mode:'post',
					url:url,
					data:{},
					success(res){
						self.codeSend=true
						self.$success.center(self.$t('navbar.request_Successful'))
						var set=setInterval(function(){
							num--
							self.codeBtn=self.$t('navbar.Resend')+'（'+num+'）'
							if(num<1){
								clearInterval(set)
								self.codeBtn=self.$t('navbar.Resend')
								self.codeSend=false
							}
						},1000)
					}
				})
	        },
	        chooseAddress(){
	        }
		},
		computed: {
	    //cityName 为选择的省市区名称
	      cityName() {
	        const names = [];
	        this.cityInfo.province && names.push(this.cityInfo.province.name + ' ')
	        this.cityInfo.city     && names.push(this.cityInfo.city.name + ' ')
	        this.cityInfo.block    && names.push(this.cityInfo.block.name + ' ')
	        return names.join('')
	      },
	      language(){
			return this.$i18n.locale
		  }
	    },
		components: {
	      SelectCity
	    },
	}
</script>

<style scoped>
	.edit-enterprise-data-header{
		min-width: 965px;
		padding:20px 110px;
	}

	.edit-enterprise-data-box{
		padding:20px 110px;
		width: 1200px;
	}

	.input-box span{
		display: inline-block;
		width: 150px;flex-shrink: 0
	}
	.code{
		flex-shrink: 0
	}
</style>
