<template>
  	<div class="enterprise-data" v-if='edit'>
		<div class="enterprise-data-header padding20">
			<span class="borderB3 paddingB5 size24 bold marginR20">{{$t('navbar.Company_information')}}</span>
			<span class="width150px height28 btnF" @click='edit=false' v-if='enterprise_user'>{{$t('navbar.Resubmit_the_form')}}</span>
		</div>
  		<div class='enterprise-data-box color86 size16 backgroundFFF' v-if='!enterprise_user'>
				<table class="center" border='1' cellspacing="0">
					<tr>
						<td>
							<p><img :src="head" alt=""></p>
							<p>{{$t('navbar.Personal_Developer')}}</p>
							<p>{{$t('navbar.and_data_statistics')}}</p>
							<p class="btn11 width150px height46 size16 cd">
								{{level ? $t('navbar.Already_opened') : $t('navbar.current')}}
							</p>
						</td>
						<td>
							<p><img :src="enterprise" alt=""></p>
							<p>{{$t('navbar.Company_Developer')}}</p>
							<p>{{$t('navbar.and_data_statistics')}}</p>

							<p class="height46"></p>
							<!-- <template v-if='level'>
								<button class="btn86 width150px height46 marginAuto size16 cd" @click='edit=false'>
									{{$t('navbar.Application_for_opening')}}
								</button>
							</template>
							<template v-else>
								<button class="btn86 width150px height46 marginAuto size16 cd" @click='enterprise_user=!enterprise_user'>
									{{$t('navbar.Already_opened')}}
								</button>
							</template> -->
						</td>
						<td>
							<p><img :src="flagship" alt=""></p>
							<p>{{$t('navbar.Personal_Developer')}}</p>
							<p>{{$t('navbar.and_data_statistics')}}</p>
							<button class="btn86 width150px height46 marginAuto size16 cd" disabled="disabled">{{$t('navbar.Coming_soon')}}</button>
						</td>
					</tr>
					<tr>
						<td class="pr">
							<p class="pa colorFFF enterprise-header size14 background11 flex al-ce">{{$t('navbar.Product')}}</p>
							<p>{{$t('navbar.Can_create_up_to_3_products')}}</p>
							<p>{{$t('navbar.Virtual_simulation_commissioning')}}</p>
							<p>{{$t('navbar.Log_function')}}</p>
							<p>{{$t('navbar.Product_Files')}}</p>
						</td>
						<td>
							<p>{{$t('navbar.Product_unlimited')}}</p>
							<p>{{$t('navbar.Virtual_simulation_commissioning')}}</p>
							<p>{{$t('navbar.Log_function')}}</p>
							<p>{{$t('navbar.Product_Files')}}</p>
						</td>
						<td></td>
					</tr>
					<tr>
						<td class="pr">
							<p class="pa colorFFF enterprise-header size14 background11 flex al-ce">{{$t('navbar.Project')}}</p>
							<p>{{$t('navbar.Can_create_up_to_3_products')}}</p>
							<p>{{$t('navbar.Add_a_device')}}</p>
							<p>{{$t('navbar.Trigger_max_10')}}</p>
							<p>{{$t('navbar.Project_file')}}</p>
						</td>
						<td>
							<p>{{$t('navbar.can_create_project')}}</p>
							<p>{{$t('navbar.trigger')}}</p>
							<p>{{$t('navbar.Application_Setup')}}</p>
							<p>{{$t('navbar.Device_management')}}</p>
							<p>{{$t('navbar.rd_Party_Data')}}</p>
							<p>{{$t('navbar.Product_Files')}}</p>
						</td>
						<td></td>
					</tr>
					<tr>
						<td class="pr">
							<p class="pa colorFFF enterprise-header size14 background11 flex al-ce">{{$t('navbar.Team_management')}}</p>
							<p class="height240">{{$t('navbar.cannot_invite_team_member')}}</p>
						</td>
						<td>
							<p>{{$t('navbar.invite_project_manager')}}</p>
							<p>{{$t('navbar.invite_observer_unlimited')}}</p>
						</td>
						<td></td>
					</tr>
				</table>
  		</div>
  		<div class="enterprise_user" v-else>
  			<div class=" color86 size16 backgroundFFF flex border">
				<div class="enterprise_user_des center">
					<p><img :src="enterprise" alt=""></p>
					<p class="size20 marginTB20 color54">{{$t('navbar.Company_Developer')}}</p>
					<p>{{$t('navbar.and_data_statistics')}}</p>
				</div>
				<div class="width100 flex jc-sa paddingTB50">
					<div>
						<p class="size20 color54 marginB10 center">{{$t('navbar.Product_service')}}</p>
						<p class="marginB10">{{$t('navbar.Can_create_product')}}</p>
						<p class="marginB10">{{$t('navbar.Virtual_simulation_commissioning')}}</p>
						<p class="marginB10">{{$t('navbar.Virtual_simulation_commissioning')}}</p>
						<p>{{$t('navbar.Virtual_simulation_commissioning')}}</p>
					</div>
					<div>
						<p class="size20 color54 marginB10 center">{{$t('navbar.Project_service')}}</p>
						<p class="marginB10">{{$t('navbar.can_create_project')}}</p>
						<p class="marginB10">{{$t('navbar.trigger')}}</p>
						<p class="marginB10">{{$t('navbar.Application_Setup')}}</p>
						<p class="marginB10">{{$t('navbar.Device_management')}}</p>
						<p class="marginB10">{{$t('navbar.rd_Party_Data')}}</p>
						<p>{{$t('navbar.Product_Files')}}</p>
					</div>
				</div>
			</div>
			<div class="size20">
				<p class="marginTB20 basis-data">
					<span>{{$t('navbar.Application_Date')}}：</span>
					<span>{{apply_time}}</span>
				</p>
				<!-- <p class="marginTB20 basis-data">
					<span>姓名：</span>
					<input type="" name="" placeholder="姓名" disabled="disabled" v-model='name'>
				</p> -->
				<p class="marginTB20 basis-data">
					<span>{{$t('navbar.Company_Name')}}:</span>
					<input type="" name="" :placeholder="$t('navbar.Company_Name')" disabled="disabled" v-model='company_name'>
				</p>
				<p class="marginTB20 basis-data">
					<span>{{$t('navbar.Company_Address')}}:</span>
					<input type="" name="" :placeholder="$t('navbar.Company_Address')" disabled="disabled" v-model='company_city'>
				</p>
				<p class="marginTB20 basis-data">
					<span>{{$t('navbar.Contact_number')}}:</span>
					<input type="" name="" :placeholder="$t('navbar.Contact_number')" disabled="disabled" v-model='company_tel'>
				</p>
			</div>
  		</div>
		
  	</div>
  	<edit-enterprise-data @openUp='openUp' v-else></edit-enterprise-data>
</template>

<script>
import editEnterpriseData from './edit-enterprise-data'
	export default {
	    data(){
			return {
				head:require('@/assets/img/memberCenter.png'),
				enterprise:require('@/assets/img/enterprise.png'),
				flagship:require('@/assets/img/flagship.png'),
				edit:true,
				level:false,
				enterprise_user:false,
				apply_time:'2018/18/18',//申请时间
				// name:'姓名',//姓名
				company_name:this.$t('navbar.Company_Name'),//公司名称
				company_city:this.$t('navbar.Company_Address'),//公司地址
				company_tel:this.$t('navbar.Contact_number'),//公司电话
			}
		},
		created(){
			this.developer()
		},
		methods:{
			openUp(val){
				this.enterprise_user=val
				this.edit=true
			},
			developer(){
				var self=this
				this.ajax({
	        		url:'v1/domains/'+localStorage.getItem('domain_id')+'/',
					mode:'GET',
					data:{},
					success(res){
						if(res.data.data.display_name && res.data.data.address && res.data.data.contacts_phone){
							self.level=true
						}
						self.apply_time=self.$time_stamp(res.data.data.create_at)
						self.company_name=res.data.data.display_name
						self.company_city=res.data.data.address
						self.company_tel=res.data.data.contacts_phone
						// self.$success.center('保存成功')
					}
	        	})
			}
		},
		components: {
    		editEnterpriseData
    	},
	}
</script>

<style scoped>
	.enterprise-data-header{
		min-width: 965px;
		padding:20px 110px;
	}
	.enterprise-data-header .btn{
		width: 120px;
	}
	.enterprise-data-box{
		margin: 20px 148px;
		width: 1192px;
		/*height: 899px;*/
	}
	table{
		 border-collapse: collapse;border:0px;
	}
	table,tr,td{
		border-color:#d9d9d9;
	}
	table img{
		width: 68px;height: 68px;display: block;margin:auto;
	}
	table td{
		padding:20px 40px;
	}
	table p{
		margin-bottom: 20px;
	}
	td p:last-child{
		margin-bottom: 0px;
	}
	table .btnf{
		width: 164px;height: 48px;line-height: 48px;margin:0px auto;
	}
	.enterprise-header{
		padding: 10px 15px;
	    border-radius: 5px;
	    left: 0;
	    top: 50%;
	    transform:rotate(90deg) translate(-50%);
	    transform-origin:0% 0%;
	}
	.enterprise_user{
		margin:20px 110px;
	}
	.paddingTB50{
		padding:50px 0px;
	}
	.enterprise_user_des{
		width: 360px;
		padding:50px;
		border-right: 1px solid #d9d9d9
	}
	.basis-data span:first-child{
		display: inline-block;
		width: 200px;
	}
	.basis-data input{
		width: 40%
	}
	.height240{
		height: 240px;line-height: 240px
	}
</style>
