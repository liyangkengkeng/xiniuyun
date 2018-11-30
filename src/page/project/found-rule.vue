<template>
  	<div class="configure">
  		<div class="size22 flex jc-sb al-ce marginB20">
  			<p>{{$t('navbar.Trigger')}}</p>
  			<p><button type="" class="btn11 width200px height40 paddingLR20">{{$t('navbar.Advanced_trigger_setup')}}</button></p>
  		</div>

  		<!-- 创建规则 -->
  		<div class="backgroundFFF padding20 width80" v-if='!switchs'>
	  		<div>
				<div class="marginTB10 flex">
					<p class="marginR40"><span class="header-con">{{$t('navbar.Name')}}：</span><input type="text" v-model='name'></p>
					<p class="marginB10">
	  					<span class="header-con">{{$t('navbar.select_product')}}：</span>
	  					<select name="" class="paddingLR20" v-model='productID'>
		  					<!-- <option value="" selected="selected" disabled>选择产品</option> -->
		  					<option v-for='val in product_list' :value="val._id">{{val.name}}</option>}
		  				</select>
	  				</p>
				</div>
				<div class="flex">
					<div class="rule-header header-con">
						{{$t('navbar.Rules')}}：
					</div>
					<div class="edit-rule">
						<table class="width100 center ruleList" border-collapse='collapse' border='1' cellspacing='0'>
			  				<thead>
			  					<tr>
			  						<th>{{$t('navbar.Serial_Number')}}</th>
									<th>{{$t('navbar.Field_Name')}}</th>
									<th>{{$t('navbar.Compute_Sign')}}</th>
									<th>{{$t('navbar.Operate')}}</th>
									<th>{{$t('navbar.Modify_Sequence')}}</th>
			  					</tr>
			  				</thead>
			  				<tbody>
			  					<tr v-for='(val,index) in list' :key='index'>
			  						<td><p class="order marginR10"><span class="order">{{index+1}}</span></p></td>
			  						<td>
					  					<p class="name marginR10">
											<select name="" v-model='val.name' class="width100">
												<option value="" selected="selected" disabled="disabled">{{$t('navbar.select_field')}}</option>
												<option v-for='(v,k) in productField' :value="v.fieldname" :disabled='v.dis'>{{v.fieldname}}</option>
											</select>
										</p>
									</td>
			  						<td class="flex al-ce">
			  							<div>
			  								<div class="flex width320px fw-wrap" v-for='(item,n) in val.expr'>
			  									<p v-if='n!=0' class="width100 marginTB10">
					  								<select name="" class="paddingLR20" v-model='item.nexus'>
												    	<option value="AND">and</option>
												    	<option value="OR">or</option>
												    </select>
					  							</p>
				  								<p class="count marginR10">
													<select name="" class="border-r5 border width100 paddingLR20" v-model='item.count'>
														<option value="eq">=</option>
														<option value="neq">≠</option>
														<option value="gt">＞</option>
														<option value="lt">＜</option>
														<option value="geq">≥</option>
														<option value="leq">≤</option>
													</select>
												</p>
					  							<p class="rule">
					  								<input class="width150" type="number" name="" v-model='item.equation' @blur='isnumber(item.equation)' :placeholder="$t('navbar.Regular_expression')">
					  							</p>
				  							</div>
			  							</div>
			  							<p class="paddingLR20 size24 bold"><span class="marginR20 cp" @click='add_rule(val.expr)'>+</span><span class="cp" @click='minus_rule(val.expr)'>-</span></p>
			  						</td>
			  						<td>
			  							<p class="operation marginR10">
											<span class="size24 cp" @click='add(val,index)'>+</span>
											<span class="size24 cp" @click='minus(index)'>-</span>
										</p>
			  						</td>
			  						<td>
			  							<p class="sort">
											<span class="cp" v-if='index!=list.length-1' @click='lower(index)'>↓</span><span class="cp" v-if='index!=0' @click='top(index)'>↑</span>
										</p>
			  						</td>
			  					</tr>
			  				</tbody>
			  			</table>
					</div>
				</div>
				<div class="flex al-ce marginTB20">
					<p class="header-con">{{$t('navbar.Preview')}}：</p>
					<!-- <p class=""><button type="" class="btn paddingLR20">调整计算顺序</button></p> -->
					<p class="preview">
						<template v-for="(item,index) in arithmetic" v-if='item.name'>
						    <span>{{item.name}}</span>
						    <!-- <span>{{item.arithmetic}}</span>
						    <span>{{item.equation}}</span> -->
						    <!-- <span  class="marginLR20">AND</span> -->
						    <select name="" class="marginLR20" v-if='index!==arithmetic.length-1' v-model='item.nexus'>
						    	<option value="AND">and</option>
						    	<option value="OR">or</option>
						    </select>
						</template>
					</p>
				</div>
				<div>
					<p>
	  					<span class="header-con">{{$t('navbar.please_select_Device')}}：</span>
	  					<template v-if='device_list.length>0'>
	  						<label v-for='(a,key) in device_list' class="marginR20"><input type="checkbox" name="" :value="a._id" v-model='deviceIDs'>{{a.name}}</label>
	  					</template>
	  					<template v-else>
	  						<span>{{$t('navbar.No_associated_devices')}}</span>
	  					</template>
	  					
	  				</p>
				</div>
				<div class="flex marginTB20 al-ce">
					<p class="header-con">
						{{$t('navbar.do_you_want_to_repeat_the_request')}}：
					</p>
					<p>
						<label class="marginR20"><input type="radio" name="" value="1" v-model='repeat_send'>{{$t('navbar.Repeat_request')}}</label>
						<label><input type="radio" name="" value="0" v-model='repeat_send'>{{$t('navbar.Dont_repeat')}}</label>
					</p>
				</div>
				<div class="flex marginTB20 al-ce">
					<p class="header-con">
						{{$t('navbar.warning_template')}}：
					</p>
					<p>
						<input type="" name="" class="msg" v-model='msg'>
					</p>
				</div>
				<div class="flex marginTB20 al-ce">
					<p class="header-con">
						{{$t('navbar.Trigging_Level')}}：
					</p>
					<p>
						<label v-for='(g,key) in grade' class="marginR20"><input type="radio" name="grade" :value="g" v-model='select_grade'>{{g}}</label>
					</p>
				</div>
	  		</div>
	  		<div>
	  			<button type="" class="btnColor width200px height40 sub" @click='sub'>{{$t('navbar.Save')}}</button>
	  		</div>
  		</div>
  	</div>
</template>

<script>
	export default {
	    data(){
			return {
				list:[
					{name:'',expr:[{count:'eq',equation:'',nexus:'AND'}],nexus:'AND'}
				],
				product_list:[],//关联产品列表
				productID:'',//产品id
				productField:[],//产品字段
				device_list:[],//设备列表
				switchs:true,
				deviceIDs:[],//关联的设备id
				select_grade:'',//选中的报警等级
				grade:['Private','Information','Warnning','Averag','High','Critical','Disaster'],//报警等级
				name:'',//规则名称
				ruleList:[],//规则列表
				msg:'',//告警模板
				repeat_send:0,//是否重复发送
				name:'',
				// deviceArr:[],
				merge:1,//计算规则
				edit_co:false,//关联设备编辑弹框
				relevance_arr:[],//当前已关联设备列表
				rule_device_arr:[],//当前产品关联设备，去重已关联规则的
				editable_arr:[],
				rule_name:'',
				index:'',
				select_arr:[],//删除的关联设备
			}
		},
		created(){
			this.trigger()
			this.productList()
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
							self.devices(self.ruleList[i].name)
						}
					}
				})
			},
			devices(name){//规则关联设备列表
				var self=this
				this.ajax({
					scope_token:localStorage.getItem('scope_token'),
					url:'v1/rules/trigger/'+name+'/associate/devices/',
					mode:'GET',
					data:{},
					success(ress){
						var obj={}
						for(let x=0;x<self.ruleList.length;x++){
							if(self.ruleList[x].name===name){
								obj=self.ruleList[x]
								obj.deviceArr=ress.data.data
								self.ruleList.splice(x,1,obj)
							}
						}
					}
				})
			},
			add(val,index){//增加计算规则
				var str,index
				for(let i=0;i<this.productField.length;i++){
					if(this.productField[i].fieldname===val.name){
						index=i
					}
				}
				str=this.productField[index]
				str.dis=true
				this.productField.splice(index,1,str)

				var obj={name:'',expr:[{count:'eq',equation:'',nexus:'AND'}],nexus:'AND'}
				if(this.list.length<this.productField.length){
					this.list.splice(index+1,0,obj)
				}else{
					return
				}
			},
			add_rule(val){//增加规则字段及条件
				val.push({count:'eq',equation:'',nexus:'AND'})
			},
			minus_rule(val){
				if(val.length>1){
					val.pop()
				}
			},
			minus(index){//删除规则
				if(this.list.length>1){
					this.list.splice(index,1)
				}
			},
			top(index){//调整顺序 向上
				var arr=this.list[index]
				this.list.splice(index,1)
				this.list.splice(index-1,0,arr)
			},
			lower(index){//调整顺序 乡下
				var arr=this.list[index]
				this.list.splice(index,1)
				this.list.splice(index+1,0,arr)
			},
			productList(){//产品列表
				var self=this
				this.ajax({
					scope_token:localStorage.getItem('scope_token'),
					url:'v1/models/associate/project/'+self.$store.getters.projectID,
					mode:'GET',
					data:{},
					success(res){
						self.product_list=res.data.data
						if(self.product_list.length)
							self.productID=self.product_list[0]._id
					}
				})
			},
			product_field(){//产品字段
				var self=this
				this.ajax({
					scope_token:localStorage.getItem('scope_token'),
					url:'v1/models/'+self.productID+'/fields/',
					mode:'GET',
					data:{},
					success(res){
						for(let i=0;i<res.data.data.length;i++){
							res.data.data[i].dis=false
						}
						self.productField=res.data.data
					}
				})
			},
			deviceList(){//设备列表
				var self=this
				self.ajax({
					scope_token:localStorage.getItem('scope_token'),
					mode:'get',
					url:'v1/devices/?model_id='+self.productID,
					data:{},
					success(res){
						self.device_list=res.data.data
					}
				})
			},
			isnumber(num){
				num=parseFloat(num)
				if(num === "" || num ==null){
			        this.$violate.center(this.$t('navbar.Please_enter_the_value'))
			    }
			    if(isNaN(num)){
			     	this.$violate.center(this.$t('navbar.Please_enter_numbers'))
			    }
			},
			sub(){//提交规则
				var self=this,obj={},rp='',name,key
				for(let i=0;i<self.arithmetic.length;i++){
					obj[self.arithmetic[i].name]={}
					obj[self.arithmetic[i].name].rp=''
					let sins=[]
					for(let j=0;j<self.arithmetic[i].expr.length;j++){
						//字符串转为数字
						self.arithmetic[i].expr[j].equation=parseFloat(self.arithmetic[i].expr[j].equation)
						sins[j]={}
						sins[j][self.arithmetic[i].expr[j].count]=self.arithmetic[i].expr[j].equation

						if(j!=self.arithmetic[i].expr.length-1){
							obj[self.arithmetic[i].name].rp+=j+' '+self.arithmetic[i].expr[j].nexus+' '
						}else{
							obj[self.arithmetic[i].name].rp+=j
						}

						// rp+=j+(j==self.arithmetic[i].expr[j].length-1?' ':' '+(self.arithmetic[i].expr[j+1]?self.arithmetic[i].expr[j+1].nexus:'')+' ')
					}
					if(i!=self.arithmetic.length-1){
						rp+=self.arithmetic[i].name+' '+self.arithmetic[i].nexus+' '
					}else{
						rp+=self.arithmetic[i].name
					}
					obj[self.arithmetic[i].name].sins=sins
				}
				if(self.deviceIDs.length>0 && self.device_list.length>0 && self.msg && self.select_grade && self.name){
					self.ajax({
						scope_token:localStorage.getItem('scope_token'),
						url:'v1/rules/trigger',
						mode:'post',
						data:{
						    expr: obj,
				            rp:rp,
				            modelId:self.productID,
				            msg: self.msg,
				            name: self.name,
				            serverity: self.select_grade,
				            templateId: "templateId-1",
				            multi_alert:self.repeat_send
						},
						success(res){
							self.ruleList.unshift(res.data.data)
							self.switchs=true
							self.use()
							self.trigger()
						}
					})					
				}
			},
			use(){//应用到设备
				var self=this
				this.ajax({
					url:'v1/rules/trigger/'+this.name+'/associate/devices/',
					scope_token:localStorage.getItem('scope_token'),
					mode:'post',
					data:self.deviceIDs,
					success(ress){
					}
				})
			},
			del(name,index){//删除规则
				var self=this
				self.name=name
				self.$prompt.center(self.$t('navbar.Confirm_to_delete')+"?",{
					name:name,
		        	hid(){},
		        	confirm(){
		        		var _this=this
		        		self.ajax({
		        			scope_token:localStorage.getItem('scope_token'),
							url:'v1/rules/trigger/'+self.name+'/',
							// scope_token:localStorage.getItem('scope_token'),
							mode:'DELETE',
							data:{},
							success(ress){
								self.$success.center(self.$t('navbar.delete_successful'))
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
			relevance_device(d,index){//关联设备编辑
				var arrs=[]
				for(let i=0;i<this.device_list.length;i++){
					var flag=true
					for(let j=0;j<d.deviceArr.length;j++){
						if(d.deviceArr[j]._id==this.device_list[i]._id){
							flag=false
						}
					}
					if(flag){
						arrs.push(this.device_list[i])
					}
				}
				this.rule_name=d.name
				this.index=index
				this.rule_device_arr=arrs
				this.relevance_arr=d.deviceArr
				this.select_arr=d.deviceArr
				this.edit_co=true
				this.productID=d.modelId
			},
			rule_device_rel(){//编辑关联设备保存
				var self=this
				if(self.editable_arr.length){//增加设备
					var arrAdd=[]
					for(var i=0;i<self.editable_arr.length;i++){
						arrAdd.push(self.editable_arr[i]._id)
					}
					self.ajax({
	        			scope_token:localStorage.getItem('scope_token'),
						url:'v1/rules/trigger/'+self.rule_name+'/associate/devices/',
						mode:'post',
						data:arrAdd,
						success(ress){
							self.$success.center(self.$t('navbar.Edit_Successful'))
							self.edit_co=false
							self.devices(self.rule_name)
							self.editable_arr=[]
						}
					})
				}
				if(self.relevance_arr.length<self.select_arr.length){//删除设备
					var arrRemvoe=[]
					for(let x=0;x<self.select_arr.length;x++){
						var flag=true
						for(var j=0;j<self.relevance_arr.length;j++){
							if(self.relevance_arr[j]._id==self.select_arr[x]._id){
								flag=false
							}
						}
						if(flag){
							arrRemvoe.push(self.select_arr[x]._id)
						}
					}
					self.ajax({
	        			scope_token:localStorage.getItem('scope_token'),
						url:'v1/rules/trigger/'+self.rule_name+'/associate/devices/',
						mode:'DELETE',
						data:arrRemvoe,
						success(ress){
							self.$success.center(self.$t('navbar.Edit_Successful'))
							self.edit_co=false
							self.devices(self.rule_name)
							self.editable_arr=[]
						}
					})
				}
			},
		},
		computed:{
			project_id(){
				return this.$store.getters.projectID
			},
			arithmetic(){
				for(let i=0;i<this.list.length;i++){
					for(let j=0;j<this.list[i].expr.length;j++){
						if(this.list[i].expr[j].count==="eq")
							this.list[i].expr[j].arithmetic='='
						if(this.list[i].expr[j].count==="neq")
							this.list[i].expr[j].arithmetic='≠'
						if(this.list[i].expr[j].count==="lt")
							this.list[i].expr[j].arithmetic='＜'
						if(this.list[i].expr[j].count==="gt")
							this.list[i].expr[j].arithmetic='＞'
						if(this.list[i].expr[j].count==="geq")
							this.list[i].expr[j].arithmetic='≥'
						if(this.list[i].expr[j].count==="leq")
							this.list[i].expr[j].arithmetic='≤'
					}
				}
				return this.list
			},
		},
		watch: {
			productID(val){
				this.deviceList()
				this.product_field()
			},
			project_id(val){
				this.product_list=[]
				this.device_list=[]
				this.productList()
				this.trigger()
			},
		}
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
	.table_num,.table_is{
		width:10%;
	}
	.table_name{
		width: 20%
	}
	.table_length{
		width: 10%
	}
	.table_time{
		width: 30%
	}
	.table_operation{
		width:20%;
	}
	.table_operation span{
		text-decoration: underline;
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
</style>
