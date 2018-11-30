<template>
  	<div class="configure width80">
  		<div class="size22 flex jc-sb al-ce marginB20">
  			<p>{{$t('navbar.Trigger')}}</p>
  		</div>
  		<div class="flex nav marginB20">
  			<input type="" name="" :placeholder="$t('navbar.Trigger_query')" class="marginR40 paddingLR20" v-model='name'>
  			<template v-if='t_lang=="en"'>
  				<date-picker class="data-picker marginR40" :placeholder="$t('navbar.Creation_time')" v-model="time" :lang="lang"></date-picker>
  			</template>
  			<template v-else>
  				<date-picker class="data-picker marginR40" :placeholder="$t('navbar.Creation_time')" v-model="time"></date-picker>
  			</template>
  			<!-- <input type="date" name="" :placeholder="$t('navbar.Creation_time')"class="width300px paddingLR20 marginR40" v-model='time'> -->
  			<button type="" class="btnColor width120px height38 marginR40" @click='query'>{{$t('navbar.Query')}}</button>
  			<template v-if='guide_show'>
  				<router-link to='foundTrigger' class='width120px btnColor height38 add-trigger'>{{$t('navbar.Create')}}</router-link>
  				<div class="guide pf">
					<img :src="guide" alt="" class="pa">
				</div>
  			</template>
  			<template v-else>
  				<router-link to='foundTrigger' class='width120px btnColor height38'>{{$t('navbar.Create')}}</router-link>
  			</template>
  		</div>
  		<!-- 规则列表 -->
  		<div class="">
  			<div class="flex backgroundFFF paddingLR20 height48 marginB20">
  				<p class="table_num">#</p>
  				<p class="table_name">{{$t('navbar.Trigger_Name')}}</p>
				<p class="table_length">{{$t('navbar.Devie_quantities')}}</p>
				<p class="table_is">{{$t('navbar.Execute_or_not')}}</p>
				<p class="table_time">{{$t('navbar.Create_Date')}}</p>
				<p class="table_operation">{{$t('navbar.Operate')}}</p>
  			</div>
  			<div class="center color86 no-data" v-if='ruleList.length<1'> 
  				<img :src="no_data" alt=""> 
  				<span>{{$t('navbar.No_trigger_yet')}}</span>
  			</div>
  			<div v-for='(d,i) in ruleList' class="flex backgroundFFF paddingLR20 height48 marginB20">
  				<p class="table_num">{{i+1}}</p>
  				<p class="table_name">{{d.name}}</p>
  				<p class="table_length">{{d.deviceArr ? d.deviceArr.length : 0}}</p>
				<p class="table_is">{{$t('navbar.Yes')}}</p>
				<p class="table_time">{{d.create_at}}</p>
				<p class="table_operation color"><span class="marginR20 btnColor height30 paddingLR20 cp" @click='see(d,i)'>{{$t('navbar.View')}}</span><span class="marginR20 btnColor height30 paddingLR20 cp" @click='edit(d,i)'>{{$t('navbar.Edit')}}</span><span class="cp btnF height28 paddingLR20" @click='del(d.name,i)'>{{$t('navbar.Delete')}}</span></p>
  			</div>	
  		</div>
  	</div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
	export default {
	    data(){
			return {
				ruleList:[],//规则列表
				arr:[],
				name:'',
				time:'',
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
			    guide:require('@/assets/img/guide-icon.png'),
			    guide_show:false, //是否显示引导
			}
		},
		created(){
			this.trigger()
			this.guide_show=this.$route.query.guide || false
    	},
		methods: {
			trigger(){//规则列表
				var self=this
				self.ruleList=[]
				this.ajax({
					scope_token:localStorage.getItem('scope_token'),
					url:'v1/rules/trigger/',
					mode:'GET',
					data:{},
					success(res){
						self.ruleList=res.data.data
						for(let i=0;i<self.ruleList.length;i++){
							self.ruleList[i].create_at=self.$time_stamp(self.ruleList[i].create_at)
							self.devices(self.ruleList[i].name,i)
						}
						self.arr=self.ruleList
						self.$store.commit('TRIGGER_LIST',res.data.data)
						if(!self.guide_show && self.arr.length<1){
							self.$prompt.center(self.$t('navbar.a40'),{
					        	hid(){},
					        	confirm(){
					        		self.guide_show=true
					        		this.hid()
					        	},
					        	cancel(){this.hid()},
					        });
						}
					}
				})
			},
			devices(name,i){//规则关联设备列表
				var self=this
				this.ajax({
					scope_token:localStorage.getItem('scope_token'),
					url:'v1/rules/trigger/'+name+'/associate/devices/',
					mode:'GET',
					data:{},
					success(ress){
						var obj=self.ruleList[i]
						obj.deviceArr=ress.data.data
						self.ruleList.splice(i,1,obj)
					}
				})
			},
			del(name,index){//删除规则
				var self=this
				// self.name=name
				self.$prompt.center(self.$t('navbar.Delete_or_not')+"?",{
					// name:name,
		        	hid(){},
		        	confirm(){
		        		var _this=this
		        		self.ajax({
		        			scope_token:localStorage.getItem('scope_token'),
							url:'v1/rules/trigger/'+name+'/',
							// scope_token:localStorage.getItem('scope_token'),
							mode:'DELETE',
							data:{},
							success(ress){
								self.ruleList.splice(index,1)
								_this.hid()
							}
						})
		        	},
		        	cancel(){
		        		this.hid()
		        	},
		        });				   
			},
			edit(val,index){
				if(val.grade==0){//跳转到初级
					this.$router.push({path:"foundTrigger",query:{details:JSON.stringify(val),grade:true}})
				}
				if(val.grade==1){//跳转到高级
					this.$router.push({path:"foundTrigger",query:{details:JSON.stringify(val),grade:false}})
				}
			},
			see(val,index){
				if(val.grade==0){//跳转到初级
					this.$router.push({path:"foundTrigger",query:{details:JSON.stringify(val),grade:true,see:true}})
				}
				if(val.grade==1){//跳转到高级
					this.$router.push({path:"foundTrigger",query:{details:JSON.stringify(val),grade:false,see:true}})
				}
			},
			query(){
				let arr=[],date,time
				var t=new Date(this.time)
				time=t.valueOf()/1000
				var time1=time+86400
				

				if(this.name && this.time){
					let i=0,len=this.arr.length
					for(;i<len;i++){
						var at=new Date(this.arr[i].create_at.substring(0,10))
						date=at.valueOf()/1000
						if(this.arr[i].name==this.name && (!(time>date) && date<time1) ){
							arr.push(this.arr[i])
						}
					}
					if(arr.length<1){
						this.$violate.center(this.$t('navbar.failed_to_find_the_device'))
					}else{
						this.ruleList=arr
					}
				}else if(this.name || this.time){
					let i=0,len=this.arr.length
					for(;i<len;i++){
						var at=new Date(this.arr[i].create_at.substring(0,10))
						date=at.valueOf()/1000
						if(this.arr[i].name==this.name || (!(time>date) && date<time1) ){
							arr.push(this.arr[i])
						}
					}
					if(arr.length<1){
						this.$violate.center(this.$t('navbar.failed_to_find_the_device'))
					}else{
						this.ruleList=arr
					}
				}else{
					// this.trigger()
					this.ruleList=this.arr
				}
			}
		},
		computed:{
			project_id(){
				return this.$store.getters.projectID
			},
			t_lang(){
				return this.$i18n.locale
			}
		},
		watch: {
			project_id(val){
				this.trigger()
			},

		},
		components: { DatePicker },
	}
</script>

<style scoped>
	select{
		height: 35px;line-height: 35px;
	}

	.header-con{
		display: inline-block;width: 120px;text-align: right;
	}
	.rule-header{
		line-height: 35px;
	}
	.edit-rule input{
		height: 35px;line-height: 35px;width: 100%
	}
	.table-th p{
		line-height: 35px;
	}
	.table-td p{
		margin-bottom: 10px;
		line-height: 30px;
	}
	.order{
		width: 30px;
	}
	.name,.rule{
		width: 200px;
	}

	.count,.connect{
		width: 100px;
	}
	.operation,.sort{
		width: 100px;
	}
	.operation span,.sort span{
		display: inline-block;width: 30px;
	}
	.preview span{
		display: inline-block;
		margin-right: 5px;
	}
	.preview .marginLR20{
		margin:0px 20px;
	}
	.sub{
		margin-left: 100px;
	}
	.ruleList th{
		height: 40px;line-height: 40px;
	}
	.table_num{
		width:5%;
	}
	.table_is{
		width: 10%
	}
	.table_name{
		width: 15%
	}
	.table_length{
		width: 10%
	}
	.table_time{
		width: 30%
	}
	.table_operation{
		width:30%;
	}

	table{
		border-color: #d9d9d9
	}
	td{
		text-align: center;
		padding:10px;
	}
	.msg{
		width: 600px;
	}
	.width320px{
		width: 310px;
	}
	.edit_co{
		width: 840px;
	}
	.device-list label{
		width: 150px;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.no-data img{
		margin-top: 150px;
	}
	.guide{
		width: 100vw;min-height: 100vh;height: 100%;
		left: 0px;top: 0px;
		background:rgba(0,0,0,.5);z-index: 100
	}
	.guide img{
		width:100px;
		display: block;
		right: 35%;top: 250px;
		animation: jello 1s;
		animation-iteration-count: infinite;
	}
	.add-trigger{
		z-index: 101
	}

	@keyframes jello {

	 	0%{
	 		transform: translate3d(-50px,50px,0px);
	      	opacity: 0.2;
	 	}
	 	10%{
	 		transform: translate3d(-45px,45px,0px);
	      	opacity: 0.3;
	 	}
	 	20%{
	 		transform: translate3d(-40px,40px,0px);
	      	opacity: 0.4;
	 	}
	 	30%{
	 		transform: translate3d(-35px,35px,0px);
	      	opacity: 0.5;
	 	}
	 	40%{
	 		transform: translate3d(-30px,30px,0px);
	      	opacity: 0.6;
	 	}
	 	50%{
	 		transform: translate3d(-25px,25px,0px);
	      	opacity: 0.7;
	 	}
	 	60%{
	 		transform: translate3d(-20px,20px,0px);
	      	opacity: 0.8;
	 	}
	 	70%{
	 		transform: translate3d(-15px,15px,0px);
	      	opacity: 0.9;
	 	}
	 	80%{
	 		transform: translate3d(-10px,10px,0px);
	      	opacity: 1;
	 	}
	 	80%{
	 		transform: translate3d(-5px,5px,0px);
	      	opacity: 0.5;
	 	}
	 	100%{
	 		transform: translate3d(0px,0px,0px);
	      	opacity: 0;
	 	}
	}
</style>
