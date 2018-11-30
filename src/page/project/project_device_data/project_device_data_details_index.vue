<template>
  	<div>
  		<div class='width80'>
  			<button type="" class="btnF width100px height28" @click='$router.go(-1)'>{{$t('navbar.Return')}}</button>
  			<!-- <router-link :to='$router.history.go(-1)' >{{$t('navbar.Return')}}</router-link> -->
  		</div>
  		<div class="flex data-list backgroundFFF pr al-ce ovh marginT20 color30 width80">
			<div class="flex">
				<div class="data-list-img flex al-ce marginR40">
					<img :src="img" alt="">
				</div>
				<div>
					<div class="size18 color54 bold marginB10">
						{{$t('navbar.Device_Name')}}：{{val.name}}
					</div>
					<div class="flex">
						<div class="marginR40">
							<!-- <p class="marginB10">型号：xxxxxxxxxxxx</p> -->
							<p class="marginB10">{{$t('navbar.Linked_Product')}}：{{val.model_name}}</p>
							<p>SN:{{val.sn}}</p>
						</div>
						<div class="marginR40">
							<p class="marginB10">{{$t('navbar.Create_Date')}}：{{val.create_at}}</p>
							<p>DUID：{{val._id}}</p>
						</div>
						<div class="flex al-fe">
							<p>key_id：{{val.key_id}}</p>
						</div>
					</div>
				</div>
			</div>
			<!-- <div class="pa size12" :class='val.status==="online" ? "data-state" : "off-line"'>
				
			</div> -->
		</div>
  		<router-view></router-view>
  	</div>
</template>

<script>
	export default {
	    data(){
			return {
				img:require('@/assets/img/sensor1.png'),
				val:{}
			}
		},
		computed:{
			product_list(){
				return this.$store.state.project_product_list
			}
		},
		watch:{
			product_list:{
				handler(val){
					if(this.$route.query.deviceDetails){
						this.val=JSON.parse(this.$route.query.deviceDetails)
						localStorage.deviceDetails = this.$route.query.deviceDetails
					}else{
						this.val=JSON.parse(localStorage.getItem('deviceDetails'))
					}
				},
				immediate:true
				
			}
		},
	}
</script>

<style scoped>
	.data-list{
		padding: 20px 38px;margin-bottom: 40px;
	}
	.data-list>div{
		/*height: 80px;*/
		margin-right: 66px;
	}
	.data-list>div:last-child{
		margin-left: 50px;
	}
	.data-list-img{
		width: 80px
	}
	.data-list-img img{
		width: 100%;
	}
</style>
