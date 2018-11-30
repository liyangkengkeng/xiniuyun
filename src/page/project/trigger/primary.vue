<template>
  	<div>
  		<div class="flex al-ce marginB20">
  			<span class="width150px color86 size16">{{$t('navbar.Trigger_Name')}}</span>
  			<input type="" name="" :placeholder="$t('navbar.Trigger_Name')" class="width400px paddingLR10" v-model='name' :disabled='see'>
  		</div>
  		<div class="flex marginB20">
        <span class="width150px color86 size16 height40">{{$t('navbar.Select_device')}}</span>
        <div>
          <!-- <div class="marginB20">
            <input type="" name="" placeholder="输入设备SN" class="marginR20 width200px paddingLR10" v-model='sn'>
            <button type="" class="btnColor width120px height40" @click='add'>添加</button>
          </div> -->
          <div>
            <select name="" class="marginR20 width200px height40 paddingLR10" v-model='product_id' :disabled='see'>
                <option value="" checked disabled>{{$t('navbar.select_product')}}</option>
                <option v-for='(val,index) in product' :key='val._id' :value="val._id">{{val.name}}</option>
            </select>
            <button type="" class="btnColor width120px height40 marginR20" @click='batch=true' :class='see ? "ban" : ""' :disabled='see'>{{$t('navbar.Html_select')}}</button>
          </div>
        </div>
        
  		</div>
  		<div class="flex marginB20">
  			<span class="width150px"></span>
  			<div class="device color86">
  				<table class="width100 center">
  					<tr>
  						<th class="height40 paddingLR20">#</th>
  						<th class="height40 paddingLR20">{{$t('navbar.Device_Name')}}</th>
  						<th class="height40 paddingLR20">{{$t('navbar.Device_model')}}</th>
  						<th class="height40 paddingLR20">{{$t('navbar.Device_SN')}}</th>
  						<th class="height40 paddingLR20">{{$t('navbar.Operate')}}</th>
  					</tr>
            <tr v-if='list.length<1'>
              <td colspan="100" class='height40 no-device'>
                <img :src="no_data" alt=""> 
                {{$t('navbar.No_device_yet')}}
              </td>
            </tr>
  					<tr v-for='(val,index) in list' :key='index'>
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
  		<div class="flex marginB20">
  			<span class="height40 width150px color86 size16">{{$t('navbar.Setup_Trigger')}}</span>
  			<div>
  				<div class="marginB20">
  					<select name="" class="width400px height40 paddingLR10" v-model='condition' :disabled='see'>
  						<option value=''>{{$t('navbar.Single_value_conditions')}}</option>
              <option value='1'>{{$t('navbar.Range_conditions')}}</option>
  					</select>
  				</div>
  				<div v-show='!condition'>
  					<select name="" v-model='rule_field' class="height40 width200px paddingLR10 marginR20" :disabled='see'>
              <option value="" selected="selected" disabled="disabled">{{$t('navbar.select_field')}}</option>
              <option v-for='(v,k) in productField' :value="v.fieldname" :disabled='v.dis'>{{v.fieldname}}</option>
            </select>
  					
  					<select name="" class="width120px height40 marginR20 paddingLR10" v-model='symbol1' :disabled='see'>
              <option v-for='(val,index) in nexus_arr' :value="val" :key='val.val'>{{val.name}}</option>
            </select>
            <input type="" name="" :placeholder="$t('navbar.enter_the_value_of_X')" class="width200px height40 marginR20 paddingLR10" v-model='one' :disabled='see'>
  					<!-- <button type="" class="btnColor btn-add center"  @click='add_rule'>+</button> -->
  				</div>
          <div v-show='condition'>
            <select name="" v-model='rule_field' class="height40 width120px paddingLR10 marginR20" :disabled='see'>
              <option value="" selected="selected" disabled="disabled">{{$t('navbar.select_field')}}</option>
              <option v-for='(v,k) in productField' :value="v.fieldname" :disabled='v.dis'>{{v.fieldname}}</option>
            </select>
            <input type="" name="" :placeholder="$t('navbar.enter_the_value_of_X')" class="width120px height40 marginR20 paddingLR10" v-model='one' :disabled='see'>
            <select name="" class="width120px height40 marginR20 paddingLR10" v-model='symbol1' :disabled='see'>
              <option v-for='(val,index) in nexus_arr' :value="val" :key='val.val'>{{val.name}}</option>
            </select>
            <select name="" class="width120px height40 marginR20 paddingLR10" v-model='add_or' :disabled='see'>
              <option value="ADD">{{$t('navbar.And')}}</option>
              <option value="OR">{{$t('navbar.Or')}}</option>
            </select>
            <input type="" name="" :placeholder="$t('navbar.enter_the_value_of_Y')" class="width120px height40 marginR20 paddingLR10" v-model='two' :disabled='see'>
            <select name="" class="width120px height40 marginR20 paddingLR10" v-model='symbol2' :disabled='see'>
              <option v-for='(val,index) in nexus_arr' :value="val" :key='val.val'>{{val.name}}</option>
            </select>
            
          </div>
  			</div>
  		</div>
      <div class="flex marginB20">
        <span class="height40 width150px color86 size16">{{$t('navbar.warning_template')}}</span>
        <input type="" name="" :placeholder="$t('navbar.warning_template')" class="width400px height40 marginR20 paddingLR10" v-model='mould' :disabled='see'>
      </div>
  		<div class="flex marginB20">
  			<span class="width150px"></span>
  			<div class="device color86" v-if='symbol1 && one'>
          <template v-if='symbol2 && two'>
            {{$t('navbar.Rules')}}：{{symbol1.name}}{{one}} {{add_or == "ADD" ? $t('navbar.And') : $t('navbar.Or')}} {{symbol2.name}}{{two}} {{$t('navbar.Then')}}  {{mould}}
          </template>
          <template v-else>
            {{$t('navbar.Rules')}}：{{symbol1.name}}{{one}} {{$t('navbar.Then')}} {{mould}}
          </template>
  			</div>
  		</div>
      <!-- <div class="flex al-ce">
        <p class='height40 width120px color86 size16'>触发等级</p>
        <p>
           <label v-for='(g,key) in grade' class="marginR20"><input type="radio" name="grade" :value="g" v-model='select_grade'>{{g}}</label>
        </p>
      </div> -->
      <div class="flex al-ce marginTB20">
        <p class='height40 width150px color86 size16 linh18 flex al-ce'>{{$t('navbar.do_you_want_to_repeat_the_request')}}</p>
        <p>
            <label class="marginR20"><input type="radio" name="" value="1" v-model='repeat_send' :disabled='see'>{{$t('navbar.Repeat_request')}}</label>
            <label><input type="radio" name="" value="0" v-model='repeat_send' :disabled='see'>{{$t('navbar.Dont_repeat')}}</label>
        </p>
      </div>
  		<div>
  			<button type="" class="btnColor width150px height40" @click='sub' :class='see ? "ban" : ""' :disabled='see'>{{$t('navbar.Save')}}</button>
  		</div>



      <div class="modal" v-if='batch' @click.self='batch=false'>
        <div class="backgroundFFF padding20 border-r5 batch-modal">
          <div>
            <table class="width100 center">
              <tr>
                <th>{{$t('navbar.Select')}}</th>
                <th class="height40 paddingLR20">#</th>
                <th class="height40 paddingLR20">{{$t('navbar.Device_Name')}}</th>
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
                <td><input type="checkbox" :value='val' v-model='correlation' :disabled='see'></td>
                <td class="height40 paddingLR20">{{index+1}}</td>
                <td class="height40 paddingLR20">{{val.name}}</td>
                <td class="height40 paddingLR20">{{val.model}}</td>
                <td class="height40 paddingLR20">{{val.sn}}</td>
              </tr>
            </table>
          </div>
          <!-- <table class="width100 center">
            
            <tr v-if='device.length<1'>
              <td colspan="100" class='height40'>暂无设备</td>
            </tr>
            <tr v-for='(val,index) in device' :key='index'>
              <td><input type="checkbox" :value='val' v-model='correlation'></td>
              <td class="height40 paddingLR20">{{index+1}}</td>
              <td class="height40 paddingLR20">{{val.name}}</td>
              <td class="height40 paddingLR20">{{val.model}}</td>
              <td class="height40 paddingLR20">{{val.sn}}</td>
            </tr>
          </table> -->
          <div class="flex jc-ce marginT20">
            <button type="" class="width200px height40 btnColor marginR40" :class='see ? "ban" : ""' @click='batch=false' :disabled='see'>{{$t('navbar.Cancel')}}</button>
            <button type="" class="width200px height40 btnColor" :class='see ? "ban" : ""' @click='confirm' :disabled='see'>{{$t('navbar.Confirm')}}</button>
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
  				list:[], //关联的设备
          correlation:[],//选择关联设备
          name:'',//触发器名称
          product_id:'',//产品id
          device:[],//产品下的设备列表
          sn:'',
          condition:'',//触发条件
          batch:false,
          rule_field:'',//选择的字段
          productField:[],//产品字段
          symbol1:{name:'=',val:'eq'},//选择的判断符号
          symbol2:{name:'=',val:'eq'},//选择的判断符号
          nexus:'',//关系运算符
          nexus_arr:[{name:'=',val:'eq'},{name:'≠',val:'neq'},{name:'＞',val:'gt'},{name:'＜',val:'lt'},{name:'≥',val:'geq'},{name:'≤',val:'leq'}],
          one:'',//第一个值
          two:'',//第二个值
          mould:'',//告警模板
          add_or:'ADD',//且或者
          grade:['Private','Information','Warnning','Averag','High','Critical','Disaster'],//报警等级
          repeat_send:0,//是否重复发送
          // select_grade:'',//选中的报警等级
          no_data:require('@/assets/img/no-data.png'),
  			}
		},
		created(){
      if(this.obj.name){ //编辑赋值
        this.name=this.obj.name
        this.product_id=this.obj.modelId
        this.list=this.obj.deviceArr
        this.mould=this.obj.msg
        this.repeat_send=this.obj.multi_alert

        for(let i in this.obj.expr){
          this.rule_field=i
          var arr=this.obj.expr[i].rp.split(' ')
          if(arr.length>1){
            this.condition='1'
          }else{
            this.condition=''
          }
          
          for(let key in this.obj.expr[i].sins[0]){
            this.one=this.obj.expr[i].sins[0][key]
            this.symbol1.val=key
            this.symbol1.name=this.operator(key)
          }
          if(this.obj.expr[i].sins[1]){
            for(let key in this.obj.expr[i].sins[1]){
              this.two=this.obj.expr[i].sins[1][key]
              this.symbol2.val=key
              this.symbol2.name=this.operator(key)
            }
          }

        }
      }
    },
		methods: {
      operator(val){
        for(let i=0;i<this.nexus_arr.length;i++){
          if(this.nexus_arr[i].val==val)
            return this.nexus_arr[i].name
        }
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
              // self.batch=true
            }
          })
        }else{
          this.$violate.center(this.$t('navbar.please_select_Device'))
        }
      },
      confirm(){//批量关联设备
        this.list=this.correlation
        this.batch=false
      },
      add(){//搜索sn添加设备
        if(this.sn){
          let i=0,len=this.all_device.length
          for(;i<len;i++){
            if(this.sn==this.all_device[i].sn){
              var flag=true
              for(let j=0;j<this.list.length;j++){
                if(this.list[j].sn==this.sn){
                  flag=false
                }
              }
              if(flag){
                this.list.push(this.all_device[i])
              }
            }
          }
        }else{
          this.$violate.center(this.$t('navbar.please_select_Device'))
        }
      },
      del(val,index){//取消关联设备
        this.list.splice(index,1)
      },
      sub(){//保存规则
        var self=this
        if(this.name && (this.list.length>0) && this.productField && this.product_id && this.mould && self.rule_field){
            this.$prompt.center(this.$t('navbar.Save_or_Not')+'?',{
             hid(){},
             confirm(){
               var _this=this
               var obj={}
                if(self.two && self.symbol2){
                  obj[self.rule_field]={}
                  obj[self.rule_field].rp= '0 ' +self.add_or +' 1'
                  obj[self.rule_field].sins=[]
                  obj[self.rule_field].sins[0]={}
                  obj[self.rule_field].sins[0][self.symbol1.val]=Number(self.one)
                  obj[self.rule_field].sins[1]={}
                  obj[self.rule_field].sins[1][self.symbol2.val]=Number(self.two)
                }else{
                  obj[self.rule_field]={}
                  obj[self.rule_field].rp='0'
                  obj[self.rule_field].sins=[]
                  obj[self.rule_field].sins[0]={}
                  obj[self.rule_field].sins[0][self.symbol1.val]=Number(self.one)
                }
                if(self.product_id && self.name){
                   self.ajax({
                      scope_token:localStorage.getItem('scope_token'),
                      url:'v1/rules/trigger',
                      mode:'post',
                      data:{
                          expr: obj,
                          rp:'',//选择的产品字段
                          modelId:self.product_id, //产品id
                          msg: self.mould,//告警模板
                          name: self.name,//触发器名字
                          serverity: 'Information',//选中的报警等级
                          templateId: "templateId-1",
                          multi_alert:self.repeat_send,//是否重复发送
                          grade:0
                      },
                      success(res){
                        self.use()
                        self.$router.push('configureTrigger')
                        _this.hid()
                      }
                  }) 
                }   
             },
             cancel(){this.hid()},
            });
        }else{
          if(!this.name){
            this.$violate.center(this.$t('navbar.please_enter_the_trigger_name'))
          }else if(this.list.length<1){
            this.$violate.center(this.$t('navbar.please_select_Device'))
          }else if(!this.productField){
            this.$violate.center(this.$t('navbar.please_select_Field'))
          }else if(!this.product_id){
            this.$violate.center(this.$t('navbar.please_select_Product'))
          }else if(!this.mould){
            this.$violate.center(this.$t('navbar.Please_fill_the_warning_template'))
          }else if(!self.rule_field){
            self.$violate.center(self.$t('navbar.please_select_Field'))
          }
        }
      },
      use(){//应用设备到规则
        var self=this,arr=[]
        let i=0,len=this.list.length
        for(;i<len;i++){
          arr.push(this.list[i]._id)
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
      goods_details(id){
        var self=this
        self.ajax({ 
          scope_token:localStorage.getItem('scope_token'),
          mode:'GET',
          url:'v1/models/'+id+'/fields/',
          data:{},
          success(res){
            self.productField=[]
            for(let j=0;j<res.data.data.length;j++){
              self.productField.push({fieldname:res.data.data[j].fieldname,dis:false})
            }
          }
        })
      }
		},
    computed:{
      product(){//产品
        return this.$store.getters.project_product_list
      },
      all_device(){//所有设备列表
        return this.$store.getters.project_device_list
      },
    },
		watch: {
			product_id(val){
        this.goods_details(val)
        this.batch_select(val)
      },
		}
	}
</script>

<style scoped>
	.device{
		width:600px;
		max-height: 300px;
		overflow-y:auto;
	}
	th{
		border-bottom: 1px solid #d9d9d9
	}
	.btn-add.btnColor{
		width:25px;height: 25px;border-radius: 50%
	}
  .batch-modal{
    width:600px;
    max-height: 500px;
    overflow-y:auto;
  }
  .ovy-sc{
    height: 300px;overflow-y: scroll;
  }
  .no-device img{
    height:50px;
    display: block;
    margin:30px auto 0px;
  }
  .linh18{
    line-height: 18px;
  }
</style>
