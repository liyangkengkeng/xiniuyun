<template>
  	<div class="applications width80">
		<div class="team-header marginTB20">
			<span class="width120px marginR40" :class='switchs?"btnColor height30 colorFFF":"btnF height28"' @click='switchs=true'>{{$t('navbar.Voucher_list')}}</span>
			<!-- <button type="" class="width120px height30" :class='!switchs?"btnColor height30 colorFFF":"btnF height28"' @click='switchs=false'>{{$t('navbar.Create_a_Voucher')}}</button> -->
		</div>
		<div class="flex team-box">
			<div class="" v-show='!switchs'>
				<div class="size22 bold marginB20">
					TOKEN:
				</div>
				<div class='marginB20 paddingLR20'>
					<p class="marginB20"><span>{{$t('navbar.Name')}}：</span><input type="" name="" v-model='token_name'></p>
					<p class="marginB20"><span>{{$t('navbar.Introduction')}}：</span><input type="" name="" v-model='token_description'></p>
					<p class="marginB20">
						<span>{{$t('navbar.Expiration_date')}}：</span>
						<template v-if='t_lang=="en"'>
			  				<date-picker class="data-picker marginR40" :placeholder="$t('navbar.Creation_time')" v-model="token_expired_at" :lang="lang"></date-picker>
			  			</template>
			  			<template v-else>
			  				<date-picker class="data-picker marginR40" :placeholder="$t('navbar.Creation_time')" v-model="token_expired_at"></date-picker>
			  			</template>
						<!-- <input type="date" name="" v-model='token_expired_at'> -->
					</p>
					<p><button type="" class='btnColor width100px height38' @click='generate_test'>{{$t('navbar.Generate_Visit_Voucher')}}</button></p>
				</div>
				<div class='paddingLR20' v-if='show1'>
					<div class="marginB20 flex jc-sb al-ce">
						<p><span>{{$t('navbar.a45')}}：</span>{{obj.access_token}}</p>
						<button type="" class="btnColor width100px height30" @click='copy("client_id")'>{{$t('navbar.Copy')}}</button>
					</div>
				</div>
			</div>
			<div v-show='switchs' class="width100">
				<div class="flex paddingLR20 marginB20 backgroundFFF height60 border-r5">
					<p class="table_num">{{$t('navbar.Name')}}</p>
					<p class="table_name">{{$t('navbar.Introduction')}}</p>
					<p class="table_unit">{{$t('navbar.a45')}}</p>
					<!-- <p class="table_val">{{$t('navbar.Operate')}}</p> -->
					
				</div>
				<div class='center no-data' v-if='uses.length<1'>
					<img :src="no_data" alt="">
					<span>{{$t('navbar.No_data_yet')}}</span>
				</div>
				<div v-for='(d,i) in uses' :key='i' class="flex paddingLR20 marginB20 backgroundFFF height60 border-r5">
					<p class="table_num">{{d.name}}</p>
					<p class="table_name">{{d.description}}</p>
					<p class="table_unit flex al-ce">
						<span class="width70">{{d.access_token}}</span>
						<canvas :id="'canvas'+i" class="canvas" @click='canvas_click(d.access_token,i)'></canvas>
					</p>
					<!-- <p class="table_val"><button class="btnColor width100px height30" @click='del(d,i)'>{{$t('navbar.Delete')}}</button></p> -->
				</div>
			</div>
		</div>
		<div class='modal' v-if='canvas_img' @click='canvas_img=""'>
			<canvas :class='canvas_img' class="canvas_img"></canvas>
		</div>
  	</div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import QRCode from 'qrcode'     //引入生成二维码组件
	export default {
	    data(){
			return {
				name:'',
				description:'',
				redirect_uri:'',
				website:'',
				show1:false,
				token_name:'',
				token_description:'',
				token_expired_at:'',
				obj:{},
				switchs:true,
				uses:[],
				no_data:require('@/assets/img/no-data.png'),
				lang: {
			        days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			        pickers: ['next 7 days', 'next 30 days', 'previous 7 days', 'previous 30 days'],
			        placeholder: {
			          date: 'Select Date',
			          dateRange: 'Select Date Range'
			        }
			    },
			    canvas_img:''
			}
		},
		created(){
			this.list()
    	},
		computed: {
			id(){
				return this.$store.getters.projectID
			},
			t_lang(){
				return this.$i18n.locale
			},
			project_id(){
				return this.$store.state.projectID
			},
		},
		mounted(){
			
		},
		methods: {
			generate_test(){
				var self=this
				var time = (new Date()).valueOf()
				var expired = (new Date(self.token_expired_at)).valueOf()
				if(expired>time && self.token_name && self.token_description){
					self.ajax({
	        			scope_token:localStorage.getItem('scope_token'),
						url:'v1/projects/'+self.id+'/access_tokens',
						mode:'post',
						data:{
							name:self.token_name,
							description:self.token_description,
							expired_at:expired/1000
						},
						success(ress){
							self.$success.center(self.$t('navbar.Generate_Successful'))
							self.obj=ress.data.data
							self.show1=true
							self.token_name=''
							self.token_description=''
							self.token_expired_at=''
							self.list()
						}
					})
				}else{
					if(!(expired>time)){
						self.$violate.center(self.$t('navbar.Expiration_date_later_than_current_date'))
					}
					if(!self.token_name)
						self.$violate.center(self.$t('navbar.Name_is_absent'))
					if(!self.token_description)
						self.$violate.center(self.$t('navbar.Introduction_is_absent'))
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
					url:'v1/projects/'+self.id+'/access_tokens/',
					mode:'get',
					data:{},
					success(ress){
						self.uses=ress.data.data
						self.$nextTick(()=>{
							for(let i=0;i<self.uses.length;i++){
								var canvas = document.getElementById('canvas'+i)
						        QRCode.toCanvas(canvas, self.uses[i].access_token, function (error) {
							        if (error) 
							        	console.error(error)
							        console.log('success!');
						        })
							}
						})
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
		        			scope_token:localStorage.getItem('scope_token'),
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
			canvas_click(token,i){
				this.canvas_img='canvas'+i
				this.$nextTick(()=>{
					var canvas = document.getElementsByClassName('canvas'+i)[0]
			        QRCode.toCanvas(canvas, token, function (error) {
				        if (error) 
				        	console.error(error)
				        console.log('success!');
			        })
				})
			}
		},
		watch: {
			project_id(val){
				if(val)
					this.list()
			},
		},
		components: { DatePicker },
	}
</script>

<style scoped>
	.height60{
		height: 60px;line-height: 60px;
	}
	.team-header,.team-box{
		/*min-width: 965px;*/
		/*padding:20px 110px;*/
	}
	.team-box span{
		display: inline-block;
		width: 130px;
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
	.table_unit .width70{
		width: 70%
	}
	.table_val{
		width: 15%
	}
	.canvas{
		width: 50px !important;height: 50px!important;
	}
	.canvas_img{
		width: 350px !important;height: 350px!important;
	}
</style>
