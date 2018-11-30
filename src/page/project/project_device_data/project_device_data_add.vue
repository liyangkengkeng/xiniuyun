<template>
  	<div class="project_device_add size18 width80">
  		<div>
  			<router-link to='project_device_data_list' class='btnF width100px height28 marginB20 size14'>{{$t('navbar.Return')}}</router-link>
  			<!-- <button type="$rout">返回</button> -->
  		</div>
  		<div class="flex fw-wrap project_device_add-box">
  			<div class="center no-data width100" v-if='product_list.length<1'>
				<img :src="no_data" alt=""> 
				<span>{{$t('navbar.No_data_yet')}}</span>
			</div>
  			<div v-for='(val,index) in product_list' :key='val._id' class="project_device_add_list backgroundFFF marginB20"> 
	  			<div class="flex jc-sb al-ce marginB20">
	  				<p class=""><router-link target="_blank" class="Product" :to='{path:"/product/"+val.name+"/my/page/"+userId, query:{id:val._id}}'>{{$t('navbar.Product')}}：{{val.name}}</router-link></p>
	  			</div>
	  			<div class="marginB20">
	  				<!-- {{$t('navbar.Select_Access_Protocol')}}：{{val.protocol.toUpperCase()}} -->
	  			</div>
	  			<div class="flex al-ce jc-sb">
	  				<p><button type="" class="btnColor width150px height30" @click='add(val)'>{{$t('navbar.Add_devcie')}}</button></p>
	  			</div>
	  		</div>
  		</div>
  		
  	</div>
</template>

<script>
	export default {
	    data(){
			return {
				no_data:require('@/assets/img/no-data.png'),
				userId:''
			}
		},
		created(){
			this.userId=localStorage.getItem('userId')
		},
		methods: {
			see(val){ //查看产品
				window.open(this.$router.push({path:"/product/"+val.name+"/my/page/"+this.userId, query:{id:val._id}}))
			},
			add(val){ //添加设备
				this.$router.push({path:'add_operation',query:{addId:val._id,name:val.name}})
			},
		},
		computed:{
			product_list(){
				return this.$store.state.project_product_list
			}
		}
		
	}
</script>

<style scoped>
	.project_device_add_list{
		padding:30px 45px;
		width:30%;
		margin-right: 5%
	}
	.project_device_add-box>div:nth-child(3n){
		margin-right: 0px;
	}
	.no-data img{
		margin-top: 180px;
	}
	.Product:hover{
		color:#11A9A4;
	}
</style>
