<template>
<div class='modal' @click.self='hid'>
	<div class="spot backgroundFFF padding20">
			<table class="pagingTrans">
				<thead>
					<tr>
						<th class="">#</th>
						<th class="">功能名称</th>
						<th class="">单位</th>
						<th class="">最小长度</th>
						<th class="">最大长度</th>
						
						<th class="">描述</th>
						<th class="">操作</th>
						<th class="">&nbsp;</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for='(val,index) in list' :key='index'>
						<td class="center">{{index+1}}</td>
						<td class="center"><input type="" name="" v-model='val.fieldname'></td>
						<td class="center"><input type="" name="" v-model='val.unit'></td>
						<td class="center"><input type="number" step="0.01" name="" v-model='val.min'></td>
						<td class="center"><input type="number" step="0.01" name="" v-model='val.max'></td>
						<td class="center"><input type="" name="" v-model='val.description'></td>
						<td class="operate center"><button class="see height30 btnColor" @click='sub(index)' :disabled="val.dis">确定</button></td>
						<td class="bold size24 flex arr center"><button class="btnF width30px" @click='add(index)'>+</button>&emsp;<button class="btnF width30px" @click='minus(index)' :disabled="val.dis">-</button></td>	
					</tr>
				</tbody>
			</table>
	</div>
</div>
</template>

<script>
    export default {
		data(){
			return {
				list:[
					{fieldname:'',unit:'',max:'',min:'',description:'',dis:false}
				]
			}
		},
		created(){
			
		},
		methods: {
			hid(){
				this.$emit('hidcustom',false)
			},
			sub(index){
				var product=JSON.parse(localStorage.getItem('product_data'))
				
				// var product=JSON.parse(localStorage.getItem('product_data'))
				// var proto=Object.getPrototypeOf(this.list[index]);
				// var obj=Object.assign({},Object.create(proto),this.list[index]);

				// obj.dis=true
				// delete this.list[index].dis
				var self=this
				self.list[0].min=parseFloat(self.list[0].min)
				self.list[0].max=parseFloat(self.list[0].max)
				this.ajax({
					scope_token:localStorage.getItem('access_token'),
					url:'v1/models/'+product._id+'/fields/',
					mode:'post',
					data:self.list[0],
					success(res){
						self.$success.center('保存成功')
						self.$emit('sub',self.list)
						self.list.splice(0,1,{fieldname:'',unit:'',max:'',min:'',description:'',dis:false})
					}
				})
			},
			add(index){
				var obj={fieldname:'',unit:'',max:'',min:'',description:'',dis:false}
				this.list.splice(index+1,0,obj)
				// this.list.push(obj)
			},
			minus(index){
				if(this.list.length>1){
					this.list.splice(index,1)
				}
			}
		},
		watch:{
			
		}
    }
</script>


<style scoped>
	.spot{
		width: 1200px;
	}
	table{
		width: 100%;
	}
	tr th:first-child, tr td:first-child{
		width: 60px;display: inline-block;
	}
	th,td{
		width: 155px;
		padding:10px 0px;display: inline-flex;
	}
	td input{
		width: 80%
	}
	.tbody{
		max-height:600px; 
		overflow-y: auto;
		border-top: 1px solid #e5e5e5;
	}
	.see{
		width: 80%;
	}
</style>
