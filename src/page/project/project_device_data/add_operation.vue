<template>
  	<div class="add_operation size18 width80">
  		<div class="flex jc-sb al-ce marginB20">
  			<div class="ellipsis">{{$t('navbar.Linked_Product')}}：{{product_name}}</div>
  			<div class="flex">
  				<div class="pr">
					<button type="" class="btn11 width120px height36 marginR20" @click='inportexcel'>{{$t('navbar.Export_Template')}}</button>
				</div>
  				<div class="pr ">
					<button type="" class="btnColor width120px height38">{{$t('navbar.Import_Device')}}</button>
					<input id="upload" type="file" @change="importfxx(this)" v-if='clearShow'  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
				</div>
  			</div>
  			
  		</div>
  		<!-- <div class="marginB20 flex al-ce jc-sb">
  			<div class='flex al-ce width100'>
  				<div>{{$t('navbar.a62')}}：</div>
  				<div contenteditable="true" class='tagBox border height38 paddingLR10 size14 flex al-ce '>
  					<p class="tag border-r5 marginR10 flex al-ce" v-for='(val,index) in tag_list'>
  						<span>{{val}}</span>
  						<img :src="del_icon" alt="" class='cp' @click='del_tag(index)'>
  					</p>
  					<input type="" name="" class='tag-input height38 width100' maxlength="8" v-model='tag' @blur='add_tag'  @keyup.enter='add_tag'>
  				</div>
  			</div>
  			<div>
  				<button type="" class="btnColor height30 width100px" @click='add'>{{$t('navbar.Add')}}</button>
  			</div>
  		</div> -->
  		<div class="marginB20 flex al-ce jc-sb">
  			<!-- <span>{{$t('navbar.Device_access_protocol')}}：{{protocol}}</span> -->
  			<button type="" class="btnColor height30 width100px" @click='add'>{{$t('navbar.Add')}}</button>
  		</div>
  		<div class="add_operation_list">
  			<div class="marginB20 backgroundFFF height40 flex al-ce paddingLR20">
  				<p class="table_num">#</p>
  				<p class="table_name">{{$t('navbar.Device_Name')}}</p>
  				<p class="table_sn"><!-- {{$t('navbar.Device_SN')}} -->DID</p>
  				<p class="table_des">KEY</p>
  				<p class="table_des">{{$t('navbar.Device_Description')}}</p>

  				<p class="table_des">是否有心跳</p>
  				<p class="table_des">心跳间隔</p>
  				<p class="table_des">心跳超时周期</p>
  				
  				<p class="table_add">{{$t('navbar.Operate')}}</p>
  			</div>
  			<div v-for='(val,index) in list' class="marginB20 backgroundFFF height48 flex al-ce paddingLR20">
  				<p class="table_num">{{index+1}}</p>
  				<p class="table_name"><input type="" name="" v-model='val.name' class="height30 width90" maxlength="20"></p>
  				<p class="table_sn"><input type="" name="" v-model='val.DID' class="height30 width90" maxlength="30"></p>
  				<p class="table_sn"><input type="" name="" v-model='val.KEY' class="height30 width90" maxlength="30"></p>
  				
  				<p class="table_des"><input type="" name="" v-model='val.description' class="height30 width90"></p>

  				<p class="table_beat">
  					<!-- <input type="" name="" v-model='val.isHeartBeat' class="height30 width90"> -->
  					<select name=""  v-model='val.isHeartBeat' class="height30 width90">
  						<option value="true">有</option>
  						<option value='false'>无</option>
  					</select>
  				</p>
  				<p class="table_beat"><input type="" name="" v-model='val.heartBeatInterval' class="height30 width90" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"></p>
  				<p class="table_beat"><input type="" name="" v-model='val.timeoutPeriod' class="height30 width90" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}"></p>

  				<p class="table_add">
					<button type="" class="btnF height28 width100px" @click='del(index)'>{{$t('navbar.Delete')}}</button>
  				</p>
  			</div>
  		</div>
  		<div class="center">
			<button type="" class="btnColor width200px height40 marginR40" @click='cancel'>{{$t('navbar.Return')}}</button>
			<button type="" class="btnColor width200px height40" @click='sub'>{{$t('navbar.Confirm')}}</button>
		</div>
  	</div>
</template>

<script>
	export default {
	    data(){
			return {
				product_name:'',//产品名称
				protocol_id:'',	//产品id
				// protocol:'',//协议
				list:[{name:'',DID:'',description:'',KEY:"",isHeartBeat:'',heartBeatInterval:'',timeoutPeriod:''}],
				clearShow:true,
				obj:{},//导入导出使用
				tag:'',
				tag_list:[],
				del_icon:require('@/assets/img/del-fff-icon.png'),
			}
		},
		created(){
			// this.list=JSON.parse(this.list)
			this.product_name=this.$route.query.name
			this.protocol_id=this.$route.query.addId
			// this.protocol=this.$route.query.protocol
		},
		methods: {
			add(){
				this.list.push({name:'',DID:'',description:'',KEY:"",isHeartBeat:'',heartBeatInterval:'',timeoutPeriod:''})
			},
			del(index){
				this.list.splice(index,1)	
			},
			cancel(){//取消
				this.$router.push('project_device_data_add');
			},
			sub(){
				var self=this
				for(let i=0;i<self.list.length;i++){
					self.list[i].model_id=self.protocol_id
					// self.list[i].key_id=''
					if(!(self.list[i].name && self.list[i].DID && self.list[i].KEY)){
						self.$violate.center(self.$t('navbar.Device_Name_or_SN_can_not_be_absent'))
						return false
					}
				}
				this.ajax({
					scope_token:localStorage.getItem('scope_token'),
					mode:'post',
					url:'v1/devices/',
					data:self.list,
					success(res){
						// for(let j=0;j<self.list.length;j++){
						// 	self.ajax({
						// 		scope_token:localStorage.getItem('scope_token'),
						// 		mode:'post',
						// 		url:'v1/devices/',
						// 		data:self.tag_list,
						// 	})
						// }
						if(self.length<1){
							self.$prompt.center(self.$t('navbar.a40'),{
					        	hid(){},
					        	confirm(){
					        		self.$router.push({path:"/project/projectDevice/trigger/configureTrigger",query:{guide:true}})
					        		this.hid()
					        	},
					        	cancel(){
					        		self.$success.center(self.$t('navbar.Import_successful'))
									self.$router.push('project_device_data_list');
					        		this.hid()
					        	},
					        });
						}else{
							self.$success.center(self.$t('navbar.Import_successful'))
							self.$router.push('project_device_data_list');
						}
					}
				})
			},
			importfxx(obj) {//导入模板
				this.clearShow=false
				var self=this
				let _this = this;
				let inputDOM = this.$refs.inputer;
				// 通过DOM取文件数据
				 
				this.file = event.currentTarget.files[0];
				 
				var rABS = false; //是否将文件读取为二进制字符串
				var f = this.file;
				 
				var reader = new FileReader();
				//if (!FileReader.prototype.readAsBinaryString) {
				FileReader.prototype.readAsBinaryString = function(f) {
					// self.$loading('loading...')
					var binary = "";
					var rABS = false; //是否将文件读取为二进制字符串
					var pt = this;
					var wb; //读取完成的数据
					var outdata;
					var reader = new FileReader();
					reader.onload = function(e) {
						// self.$loading('loading...')
						var bytes = new Uint8Array(reader.result);
						var length = bytes.byteLength;
						for(var i = 0; i < length; i++) {
							binary += String.fromCharCode(bytes[i]);
						}
						var XLSX = require('xlsx');
						if(rABS) {
							wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
								type: 'base64'
							});
						} else {
							wb = XLSX.read(binary, {
								type: 'binary'
							});
						}
						self.obj=JSON.parse(localStorage.getItem('export_obj'))
						for(let a=0;a<wb.SheetNames.length;a++){
							var arr=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[a]])  //sheets名称=>商品名称
							if(arr.length>0){//有数据
								for(let b=0;b<arr.length;b++){
									arr[b].model_id=self.obj[wb.SheetNames[a]]  //将对应商品id塞入表格数据
									arr[b].isHeartBeat
									// arr[b].DID=arr[b].DID
								}
								// self.sub(arr) //发送请求
								self.list=arr
							}
						}
						// outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是你想要的东西
						self.clearShow=true
						self.$loading.close()
					}
					reader.readAsArrayBuffer(f);
				}
				if(rABS) {
					self.$loading('loading...')
					reader.readAsArrayBuffer(f);
				} else {
					self.$loading('loading...')
					reader.readAsBinaryString(f);
				}
			},
			inportexcel() {　//导出模板
				var arr=[]
				for(let j=0;j<this.product_list.length;j++){
					arr.push(this.product_list[j].name)
					this.obj[this.product_list[j].name]=this.product_list[j]._id
				}
				localStorage.setItem('export_obj',JSON.stringify(this.obj))
				require.ensure([], () => {　　　
					const { export_json_to_excel } = require('@/vendor/Export2Excel.js');　　//引入文件　　　　　　
					 //将对应的属性名转换成中文
					const tHeader = ['name', 'DID','KEY','description','IMEI','isHeartBeat','heartBeatInterval','timeoutPeriod'];
				    const filterVal=['设备名称', 'DID','KEY','设备描述','是否有心跳（true有false无）','心跳间隔（大于0正整数）','心跳超时周期（大于0正整数）'];
				    const list = [];
				    const data = this.formatJson(filterVal, list); // 自行洗数据 按序排序的一个array数组
				    export_json_to_excel(tHeader, data, this.$t('navbar.List_excel'),arr);
				})
			},
			formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            add_tag(){
            	if(this.tag && this.tag_list.length<5){
            		this.tag_list.push(this.tag)
            		this.tag=''
            	}else{
            		if(this.tag_list.length>4){
            			this.$violate.center(this.$t('navbar.a63'))
            			this.tag=''
            		}
            	}

            },
            del_tag(index){
            	this.tag_list.splice(index,1)
            },
            add_tags(){
            	this.ajax({
            		scope_token:localStorage.getItem('scope_token'),
					mode:'post',
					url:'v1/devices/'+id+'/tags/',
					data:{},
					success(res){
						console.log(res)
					}
            	})
            },
		},
		computed:{
			product_list(){
				return this.$store.state.project_product_list
			},
			length(){
				return this.$store.state.project_device_list
			}
		}
		
	}
</script>

<style scoped>
	.table_num{
		width:5%;
	}
	.table_name,.table_sn,.table_des,.table_beat{
		width:12%;
	}
	.table_add{
		width:11%;
	}
	.width90{
		width:90%
	}
	#upload{
		position: absolute;
		width: 120px;height: 38px;left: 0px;top: 0px;opacity: 0
	}
	.add_operation_list{
		height: 604px;overflow-y: auto;
	}
	.tagBox{
		width:80%;
	}
	.tag{
		padding:0px 5px;
		background:#9B9B9B;
		height: 30px;line-height: 30px;
		color:#fff;
		flex-shrink: 0
	}
	.tag span{
		display: inline-block;
		margin-right: 10px;
	}
	.tag img{
		display: block;
		width:10px;
		height: 10px;
	}
	.tag-input{
		background:transparent;border:0px;
	}
</style>
