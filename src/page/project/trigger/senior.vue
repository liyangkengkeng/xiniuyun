<template>
  	<div>
      	<div class="flex al-ce marginB20">
  			<span class="width120px color86 size16">{{$t('navbar.Trigger_Name')}}：</span>
  			<input type="" name="" :placeholder="$t('navbar.Trigger_Name')" class="width400px paddingLR10" v-model='name'  :disabled='see'>
  		</div>
  		<div class="flex marginB20">
  			<span class="width120px color86 size16 height40">{{$t('navbar.Select_device')}}:</span>
  			<div>
  				<div class="marginB20">
  					<select name="" class="marginR20 width200px height40 paddingLR10" v-model='product_id'  :disabled='see'>
			            <option value="" checked disabled>{{$t('navbar.select_product')}}</option>
			  			<option v-for='(val,index) in product' :key='val._id' :value="val._id">{{val.name}}</option>
			  		</select>
			  		<button type="" class="btnColor width120px height40 marginR20" @click='batch=true'  :class='see ? "ban" : ""' :disabled='see'>{{$t('navbar.Html_select')}}</button>
	  			</div>
	  			<!-- <div>
	  				<input type="" name="" placeholder="输入设备SN" class="marginR20 width200px paddingLR10" v-model='sn'>
  					<button type="" class="btnColor width120px height40" @click='add_device'>添加</button>
	  			</div> -->
  			</div>
  		</div>
  		<div class="flex marginB20">
  			<span class="width120px"></span>
  			<div class="device color86">
  				<table class="width100 center">
  					<tr>
  						<th class="height40 paddingLR20">#</th>
  						<th class="height40 paddingLR20">{{$t('navbar.Device_Name')}}</th>
  						<th class="height40 paddingLR20">{{$t('navbar.Device_model')}}</th>
  						<th class="height40 paddingLR20">{{$t('navbar.Device_SN')}}</th>
  						<th class="height40 paddingLR20">{{$t('navbar.Operate')}}</th>
  					</tr>
		            <tr v-if='device_list.length<1'>
		            	<td colspan="100" class='height40 no-device'>
		                  <img :src="no_data" alt="">
		                  {{$t('navbar.No_device_yet')}}
		                </td>
		            </tr>
					<tr v-for='(val,index) in device_list' :key='index'>
						<td class="height40 paddingLR20">{{index+1}}</td>
						<td class="height40 paddingLR20">{{val.name}}</td>
						<td class="height40 paddingLR20">{{val.description}}</td>
						<td class="height40 paddingLR20">{{val.sn}}</td>
						<template v-if='see'>
		                  <td class="height40 paddingLR20 color cp ban">{{$t('navbar.Clear')}}</td>
		                </template>
		                <template v-else>
		                  <td class="height40 paddingLR20 color cp" @click='del(val,index)'>{{$t('navbar.Clear')}}</td>
		                </template>
					</tr>
				</table>
			</div>
  		</div>
		<div class="flex">
			<div class="rule-header header-con width120px color86 size16">
				{{$t('navbar.Rules')}}
			</div>
			<div class="edit-rule center">
				<table>
	  				<thead>
	  					<tr>
	  						<th class="height40 paddingLR20">{{$t('navbar.Serial_Number')}}</th>
							<th class="height40 paddingLR20">{{$t('navbar.Field_Name')}}</th>
							<th class="height40 paddingLR20">{{$t('navbar.Compute_Sign')}}</th>
							<th class="height40 paddingLR20">{{$t('navbar.Operate')}}</th>
							<th class="height40 paddingLR20">{{$t('navbar.Modify_Sequence')}}</th>
	  					</tr>
	  				</thead>
	  				<tbody>
	  					<tr v-if='list.length<1'>
			            	<td colspan="100" class='height40 no-device'>
			                  <img :src="no_data" alt="">
			                  {{$t('navbar.No_device_yet')}}
			                </td>
			            </tr>
	  					<tr v-for='(val,index) in list' :key='index'>
	  						<td class=""><p class="order marginR10"><span class="order">{{index+1}}</span></p></td>
	  						<td class="">
			  					<p class="name marginR10">
									<select name="" v-model='val.name' class="width150px height40 paddingLR10" :disabled='see'>
										<option value="" selected="selected" disabled="disabled">{{$t('navbar.select_field')}}</option>
										<option v-for='(v,k) in productField' :value="v.fieldname" :disabled='v.dis'>{{v.fieldname}}</option>
									</select>
								</p>
							</td>
	  						<td class="flex al-ce ">
	  							<div>
	  								<div class="flex width320px fw-wrap" v-for='(item,n) in val.expr'>
	  									<p v-if='n!=0' class="width100 marginTB10">
			  								<select name="" class="paddingLR20 height40" v-model='item.nexus' :disabled='see'>
										    	<option value="AND">{{$t('navbar.And')}}</option>
										    	<option value="OR">{{$t('navbar.Or')}}</option>
										    </select>
			  							</p>
		  								<p class="count marginR10">
											<select name="" class="border-r5 border height40 width150 paddingLR20" v-model='item.count' :disabled='see'>
												<option value="eq">=</option>
												<option value="neq">≠</option>
												<option value="gt">＞</option>
												<option value="lt">＜</option>
												<option value="geq">≥</option>
												<option value="leq">≤</option>
											</select>
										</p>
			  							<p class="rule">
			  								<input class="width150 paddingLR10" type="number" name="" v-model='item.equation' @blur='isnumber(item.equation)' :placeholder="$t('navbar.Value')" :disabled='see'>
			  							</p>
		  							</div>
	  							</div>
	  							<p class="paddingLR20 size24 bold"><span class="marginR20 cp" @click='add_rule(val.expr)'>+</span><span class="cp" @click='minus_rule(val.expr)'>-</span></p>
	  						</td>
	  						<td class="">
	  							<p class="operation marginR10 color bold">
									<span class=" cp" @click='add(val,index)'>{{$t('navbar.Increase')}}</span>
									<span class=" cp" @click='minus(index)' v-if='index>0'>{{$t('navbar.Decrease')}}</span>
								</p>
	  						</td>
	  						<td class="">
	  							<p class="sort color bold">
									<span class="cp marginR20" v-if='index!=list.length-1' @click='lower(index)'>{{$t('navbar.Move_down')}}</span><span class="cp" v-if='index!=0' @click='top(index)'>{{$t('navbar.Move_up')}}</span>
								</p>
	  						</td>
	  					</tr>
	  				</tbody>
	  			</table>
			</div>
		</div>
		<div class="flex al-ce marginTB20">
			<span class="width120px color86 size16">{{$t('navbar.Preview')}}：</span>
  			<p class="preview">
				<template v-for="(item,index) in list" v-if='item.name'>
				    <span>{{item.name}}</span>
				    <select name="" class="marginLR20 paddingLR10 height40" v-if='index!==list.length-1' v-model='item.nexus' :disabled='see'>
				    	<option value="AND">{{$t('navbar.ADD')}}</option>
				    	<option value="OR">{{$t('navbar.OR')}}</option>
				    </select>
				</template>
			</p>
		</div>
		<div class="flex al-ce marginTB20">
	        <p class='height40 width120px color86 size16'>{{$t('navbar.do_you_want_to_repeat_the_request')}}:</p>
	        <p>
	            <label class="marginR20"><input type="radio" name="" value="1" v-model='repeat_send' :disabled='see'>{{$t('navbar.Repeat_request')}}</label>
	            <label><input type="radio" name="" value="0" v-model='repeat_send' :disabled='see'>{{$t('navbar.Dont_repeat')}}</label>
	        </p>
	    </div>
	    <div class='flex al-ce marginTB20'>
		 	<p class='height40 width120px color86 size16'>{{$t('navbar.warning_template')}}:</p>
	        <input type="" name="" :placeholder="$t('navbar.warning_template')" class="width400px height40 paddingLR20" v-model='msg' :disabled='see'>
	    </div>
	    <div class='flex al-ce marginTB20'>
		 	<p class='height40 width120px color86 size16'>{{$t('navbar.Trigging_Level')}}：</p>
	        <div class="flex">
	        	<label v-for='val in grade' class="marginR20"><input type="radio" name="" :value="val" v-model='select_grade' :disabled='see'>{{val}}</label>
	        </div>
	    </div>
	    <div>
	    	<button type="" class="width150px height40 btnColor" @click='sub'  :class='see ? "ban" : ""' :disabled='see'>{{$t('navbar.Save')}}</button>
	    </div>
		<!-- 模态框 -->
		<div class="modal" v-if='batch' @click.self='batch=false'>
	        <div class="backgroundFFF padding20 border-r5 batch-modal">
	          <div>
	            <table class="width100 center">
	              <tr>
	                <th>{{$t('navbar.Select')}}</th>
	                <th class="height40 paddingLR20">#</th>
	                <th class="height40 paddingLR20">{{$t('navbar.Device_name')}}</th>
	                <th class="height40 paddingLR20">{{$t('navbar.Device_model')}}</th>
	                <th class="height40 paddingLR20">{{$t('navbar.Device_SN')}}</th>
	              </tr>
	            </table>
	          </div>
	          <div class="ovy-sc">
	            <table class="width100 center">
	              <tr v-if='device.length<1'>
	                <td colspan="100" class='height40 no-device'>
	                  <img :src="no_data" alt="">
	                  {{$t('navbar.No_device_yet')}}
	                </td>
	              </tr>
	              <tr v-for='(val,index) in device' :key='index'>
	                <td><input type="checkbox" :value='val' v-model='correlation'></td>
	                <td class="height40 paddingLR20">{{index+1}}</td>
	                <td class="height40 paddingLR20">{{val.name}}</td>
	                <td class="height40 paddingLR20">{{val.model}}</td>
	                <td class="height40 paddingLR20">{{val.sn}}</td>
	              </tr>
	            </table>
	          </div>
	          <div class="flex jc-ce marginT20">
	            <button type="" class="width200px height40 btnColor marginR40" @click='batch=false'>{{$t('navbar.Cancel')}}</button>
	            <button type="" class="width200px height40 btnColor" @click='confirm'>{{$t('navbar.Confirm')}}</button>
	          </div>
	        </div>
	      </div>
	  	</div>
  	</div>
</template>

<script>
	export default {
		props:{
	        obj: {
	          type: Object,
	          default: function () {
	            return {}
	          }
	        },
	        see:{default:false},
	      },
	    data(){
			return {
				name:'',//触发器名称
				device_list:[],//关联的设备列表
				list:[
					{name:'',expr:[{count:'eq',equation:'',nexus:'AND'}],nexus:'AND'}
				],
				productField:[],//产品字段
				product_id:'',//选择的产品id
				device:[],//产品下的设备列表
        		sn:'',
        		batch:false,
        		correlation:[],//选择关联设备
        		repeat_send:0,//是否重复发送
        		grade:[this.$t('navbar.Private'),this.$t('navbar.Information'),this.$t('navbar.Warnning'),this.$t('navbar.Averag'),this.$t('navbar.High'),this.$t('navbar.Critical'),this.$t('navbar.Disaster')],//报警等级
        		msg:'',//模板
        		select_grade:'',//报警等级
        		no_data:require('@/assets/img/no-data.png'),
			}
		},
		created(){
			if(this.obj.name){//编辑赋值
				this.name=this.obj.name
				this.product_id=this.obj.modelId
				this.msg=this.obj.msg
				this.select_grade=this.obj.serverity
				this.repeat_send=this.obj.multi_alert
				// this.list=
				this.device_list=this.obj.deviceArr
				var expr=this.obj.expr
				let num=0
				for(let i in expr){
					this.list[num]={}
					this.list[num].name=i
					this.list[num].expr=[]
					if(expr[i].sins.length>1){
						for(let j=0;j<expr[i].sins.length;j++){
							var arr=expr[i].rp.split(' ')
							this.list[num].expr[j]={}
							for(let x in expr[i].sins[j]){
								this.list[num].expr[j].count=x
								this.list[num].expr[j].equation=expr[i].sins[j][x]
								this.list[num].expr[j].nexus=arr[2*j+1] || 'AND'
							}
						}
					}else{
						for(let x in expr[i].sins[0]){
							this.list[num].expr[0]={}
							this.list[num].expr[0].count=x
							this.list[num].expr[0].equation=expr[i].sins[0][x]
							this.list[num].expr[0].nexus='AND'
						}
					}
					num++
				}
				var rp_arr=this.obj.rp.split(' ')
				var arr_num=0
				for(let y=0;y<rp_arr.length;y++){
					if(y%2==0){
						this.list[arr_num].nexus=rp_arr[y+1] || 'AND'
						arr_num++
					}
				}
			}
    	},
		methods: {
			product_field(id){//产品字段
		        var self=this
		        self.ajax({ 
		        	scope_token:localStorage.getItem('scope_token'),
		            mode:'GET',
		            goods:true,
		            url:'shop/goods/infoBySkuNo/'+id,
		            data:{
		              body:{}
		            },
		            success(res){
		              for(let j=0;j<res.data.data.length;j++){
		                self.productField[j]={}
		                self.productField[j].fieldname=res.data.data[j].fieldname
		                self.productField[j].dis=false
		              }
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
			batch_select(){ //设备列表
		        if(this.product_id){
		          var self=this
		          self.ajax({
		            scope_token:localStorage.getItem('scope_token'),
		            mode:'get',
		            url:'v1/devices/?model_id='+self.product_id,
		            data:{},
		            success(res){
		              for(let i=0;i<res.data.data.length;i++){
		                res.data.data[i].create_at=self.$time_stamp(res.data.data[i].create_at.substring(0,10))
		                res.data.data[i].update_at=self.$time_stamp(res.data.data[i].update_at.substring(0,10))
		              }
		              self.device=res.data.data
		            }
		          })
		        }else{
		          this.$violate.center(this.$t('navbar.please_select_Device'))
		        }
		    },
		    confirm(){//批量关联设备
		        this.device_list=this.correlation
		        this.batch=false
		    },
		    add_device(){//搜索添加设备
		    	if(this.product_id){
		    		if(this.sn){
		    			var arr=[]
			          let i=0,len=this.device.length
			          for(;i<len;i++){
			            if(this.sn==this.device[i].sn){
			            	var flag=true
			            	for(let j=0;j<this.device_list.length;j++){
			            		if(this.device_list[j].sn==this.sn){
			            			flag=false
			            		}
			            	}
			            	if(flag){
			            		arr.push(this.device[i])
		            			this.device_list.push(this.device[i])
		            		}
			            }
			          }
			          if(arr.length<1){
			          	this.$violate.center(this.$t('navbar.failed_to_find_the_device'))
			          }
			        }else{
			          this.$violate.center(this.$t('navbar.Input_SN'))
			        }
		    	}else{
		    		this.$violate.center(this.$t('navbar.please_select_Product'))
		    	}
		    },
		    del(val,index){//取消关联设备
		        this.device_list.splice(index,1)
		    },
		    sub(){//保存
		    	var self=this,obj={},rp='',name,key
				for(let i=0;i<self.list.length;i++){
					if(!self.list[i].name){
						self.$violate.center(self.$t('navbar.please_select_Field'))
						return false
					}
					obj[self.list[i].name]={}
					obj[self.list[i].name].rp=''
					let sins=[]
					for(let j=0;j<self.list[i].expr.length;j++){
						//字符串转为数字
						self.list[i].expr[j].equation=Number(self.list[i].expr[j].equation)
						sins[j]={}
						sins[j][self.list[i].expr[j].count]=self.list[i].expr[j].equation

						if(j!=self.list[i].expr.length-1){
							obj[self.list[i].name].rp+=j+' '+self.list[i].expr[j].nexus+' '
						}else{
							obj[self.list[i].name].rp+=j
						}
					}
					if(i!=self.list.length-1){
						rp+=self.list[i].name+' '+self.list[i].nexus+' '
					}else{
						rp+=self.list[i].name
					}
					obj[self.list[i].name].sins=sins
				}
				if(self.device_list.length>0 && self.msg && self.select_grade && self.name){
					self.ajax({
						scope_token:localStorage.getItem('scope_token'),
						url:'v1/rules/trigger',
						mode:'post',
						data:{
						    expr: obj,
				            rp:rp,
				            modelId:self.product_id,
				            msg: self.msg,
				            name: self.name,
				            serverity: self.select_grade,
				            templateId: "templateId-1",
				            multi_alert:self.repeat_send,
				            grade:1
						},
						success(res){
							self.use()
                			self.$router.push('configureTrigger')
						}
					})					
				}
		    },
		     use(){//应用设备到规则
		        var self=this,arr=[]
		        let i=0,len=this.device_list.length
		        for(;i<len;i++){
		          arr.push(this.device_list[i]._id)
		        }
		        this.ajax({
		          url:'v1/rules/trigger/'+this.name+'/associate/devices/',
		          scope_token:localStorage.getItem('scope_token'),
		          mode:'post',
		          data:arr,
		          success(ress){
		          }
		        })
		    },
		},
		computed:{
			product(){//产品
		        return this.$store.getters.project_product_list
		    },
		},
		watch: {
			product_id(val){
				this.product_field(val)
				this.batch_select()
			},
		}
	}
</script>

<style scoped>
	.edit-rule th{
		border-bottom: 1px solid #d9d9d9
	}
	.edit-rule td{
		padding:10px 20px;
	}
	.operation span,.sort span{
		text-decoration: underline
	}
	.width320px{
		width:320px;
	}
	.ovy-sc{
	    height: 300px;overflow-y: scroll;
	  }
	  .no-device img{
	    height:50px;
	    display: block;
	    margin:30px auto 0px;
	  }
</style>
