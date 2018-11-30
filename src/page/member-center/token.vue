<template>
  	<div class="applications">
		<div class="team-header backgroundF0 padding20">
			<button class='width120px marginR40 btnColor height30 colorFFF' type="" @click='backs'>{{$t('navbar.Return')}}</button>
			<!-- <span class="width120px marginR40" :class='switchs?"btnColor height30 colorFFF":"btnF height28"' @click='switchs=true'>{{$t('navbar.Return')}}</span> -->
			<!-- <button type="" class="width120px height30" :class='!switchs?"btnColor height30 colorFFF":"btnF height28"' @click='switchs=false'>{{$t('navbar.Create_a_Voucher')}}</button> -->
		</div>
		<div class="flex team-box">
			<div class="width100">
				<div class="flex paddingLR20 marginB20 backgroundFFF height48 border-r5">
					<p class="table_num">{{$t('navbar.Name')}}</p>
					<p class="table_name">{{$t('navbar.Introduction')}}</p>
					<p class="table_unit">access_token</p>
					<p class="table_val">{{$t('navbar.Operate')}}</p>
					
				</div>
				<div class='center no-data' v-if='uses.length<1'>
					<img :src="no_data" alt="">
					<span>{{$t('navbar.No_data_yet')}}</span>
				</div>
				<div v-for='(d,i) in uses' :key='i' class="flex paddingLR20 marginB20 backgroundFFF height48 border-r5">
					<p class="table_num">{{d.name}}</p>
					<p class="table_name">{{d.description}}</p>
					<p class="table_unit">{{d.access_token}}</p>
					<p class="table_val"><button class="btnColor width100px height30" @click='del(d,i)'>{{$t('navbar.Delete')}}</button></p>
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
				switchs:true,
				uses:[],
				no_data:require('@/assets/img/no-data.png'),
			    id:'',
			}
		},
		created(){
			this.id=this.$route.query.id
			this.list()
			console.log(this.$route.query.id)

    	},
		computed: {
		},
		methods: {
			list(){//列表
				var self=this
				self.ajax({
					url:'v1/applications/'+self.id+'/access_tokens/',
					mode:'get',
					data:{},
					success(ress){
						self.uses=ress.data.data
					}
				})
			},
			del(val,index){
				var self=this
				this.$prompt.center(this.$t('navbar.Confirm_to_delete')+"?",{
		        	hid(){},
		        	confirm(){
		        		var _this=this
		        		self.ajax({
		        			// scope_token:localStorage.getItem('scope_token'),
							url:'v1/oauth2/tokens/'+val.access_token+'/',
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
			backs(){
				this.$router.back(-1)
			}
		},
		watch: {
			
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
	.team-box input{
		width: 400px;
	}
	.third-party{
		margin-right: 50px;
		padding-right: 50px;
		border-right: 1px solid #d9d9d9
	}
	.table_num,.table_name{
		width: 20%
	}
	.table_unit{
		width: 45%
	}
	.table_val{
		width: 15%
	}
</style>
