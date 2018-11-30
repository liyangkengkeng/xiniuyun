<template>
  	<div>
  		<div class="size22">
  			历史记录
  		</div>
  		<div class="marginTB20">
  			<input type="" name="" class="width200px marginR20 paddingLR20" placeholder="输入SN码查询" v-model='sn'>
  			
  			<button type="" class='btnColor width100px height30' @click='query'>查询</button>
  		</div>
  		<div class="width80">
  			<div class="flex backgroundFFF marginB20 height40 border-r5">
  				<p class="table-index paddingLR20">#</p>
  				<p class="table-model">设备型号</p>
  				<p class="table-num">告警</p>
  				<p class="table-time">时间</p>
  			</div>
  			<div v-for='(val,index) in list' class="flex backgroundFFF marginB20 height40 border-r5">
  				<p class="table-index paddingLR20">{{index+1}}</p>
  				<p class="table-model">{{val.model}}</p>
  				<p class="table-num">告警值++模板</p>
  				<p class="table-time">{{val.time}}</p>
  			</div>
  		</div>
  	</div>
</template>

<script>
	export default {
	    data(){
			return {
				list:[
					{model:1111,num:2222,time:'2011-11-11',sn:11},
					{model:1111,num:2222,time:'2011-11-11',sn:22},
					{model:1111,num:2222,time:'2011-11-11',sn:33}
				],
				sn:''
			}
		},
		created(){
    	},
		methods: {
			query(){
				if(this.sn){
					var arr=[]
					let i=0,len=this.list.length
					for(;i<len;i++){
						if(this.list[i].sn==this.sn){
							arr.push(this.list[i])
							this.list=arr
						}
					}
					if(arr.length<1){
						this.$violate.center('未查询到该设备')
					}
				}else{

				}
				
			}
		},
		watch: {
		},
		components: {
    		
    	},
	}
</script>

<style scoped>
	.table-index{
		width:10%;
	}
	.table-model{
		width:20%;
	}
	.table-num{
		width:20%;
	}
	.table-time{
		width:50%;
	}
</style>
