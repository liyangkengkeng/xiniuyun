<template>
	<div class="width1200 color54 ">
		<div class="size22 marginTB30">
			{{$t('navbar.Select_Sensor')}}
		</div>
		<div class="flex jc-sb">
			<div class="marginR40">
				<div class="sensor backgroundFFF marginB20">
					<p class="center image1 backgroundImage" :style='{backgroundImage : "url("+goods_details.image1+")"}'></p>
					<p class="size18 bold ellipsis">{{goods_details.goodsName}}</p>
					<p class="size14 color86 ellipsis2">{{goods_details.description}}</p>
				</div>
				<div v-for='(val,key) in goods_details.portInfo' :key='key' class="backgroundFFF marginB20 center height100 flex al-ce jc-ce fd-co">
					<p class="size18 bold">{{key}}</p>
					<p class="size14 color86">{{$t('navbar.Port_Type')}}：{{val}}</p>
				</div>
			</div>
			<div>
				<div class="backgroundFFF dtu-content marginB20 pr">
					<p class="size20 bold color5 center marginB20">{{goods_details.finalType1}}{{goods_details.finalType2 ? '-'+goods_details.finalType2 : ''}}</p>
					<p class="size14 color86 details" v-html='goods_details.details'></p>
					<p class="center pa see width100" v-if='see_url'>
						<a :href="see_url" target='_back' class="width120px height38 btnF">{{$t('navbar.Look_up_Details')}}</a>
					</p>
				</div>
				<div>
					<div v-for='(val,index) in sensor_arr' :key='index+"x"'>
						<template  v-if='val.obj'>
							<div class="paddingLR20 backgroundFFF marginB20 height100 flex al-ce jc-sb">
								<div class="flex al-ce">
									<div class="marginR20 sensor-img">
										<img :src="val.obj.image1" alt="">
									</div>
									<div>
										<p class="size18">{{val.obj.goodsName}}</p>
										<p class="color86 ellipsis sensor-synopsis">{{$t('navbar.Brief_Introduction')}}：{{val.obj.description}}</p>
									</div>
								</div>
								<div>
									<button type="" class="btnColor width100px height30" @click='choice_sensor=true,num=index'>{{$t('navbar.Reselect')}}</button>
								</div>
							</div>
						</template>
						<template v-else>
							<div class="backgroundFFF height100 flex al-ce jc-ce marginB20">
								<button type="" class="width200px height40 btnColor" @click='choice_sensor=true,num=index'>{{$t('navbar.Go_to_shelf_and_select_sensor')}}</button>
							</div>
						</template>
					</div>
				</div>
			</div>
		</div>
		<div class="center marginT30">
			<template v-if='productDateils._id'>
				<button type="" class="width400px height48 btnColor" @click='sub(false)'>{{$t('navbar.Save')}}</button>
			</template>
			<template v-else>
				<button type="" class="width400px height48 btnColor" @click='sub(true)'>{{$t('navbar.Complete_Release_Product')}}</button>
			</template>
		</div>
		<div class="modal" v-if='isModal'>
			<div class="backgroundFFF is-found-project center modal-div">
				<p>
					<img :src="tubiao1" alt="">
				</p>
				<p class="marginT30 size24">
					{{$t('navbar.Use_this_product_to_create_project')}}
				</p>
				<p class="marginT30">
					<button class="btnColor width200px height48 marginR20" @click='found'>{{$t('navbar.Confirm_Create')}}</button>
					<button class="btnF width200px height46" @click='noFound'>{{$t('navbar.Not_Sure_yet')}}</button>
				</p>
			</div>
		</div>


		<!-- 模态框 -->
		<div class='modal' v-if='choice_sensor' @click.self='choice_sensor=false,num=-1'>
			<div class='padding50 backgroundFFF modal-div'>
				<div class="size22 marginB20">
					{{$t('navbar.Sensor')}}
				</div>
				<div class="flex">
					<div class="flex jc-sb fw-wrap modal-sensor-box">
						<div v-if='goods_su.length<1' class='empty no-data'>
				  			<img :src="no_data" alt=""> 
				  			{{$t('navbar.No_product_yet')}}
				  		</div>
						<div v-for='(item,key) in goods_su' :key='item.skuNo' class="modal-sensor marginB20" @click='sensor_click(item,key)'>
							<p class="modal-sensor-img"><img :src="item.image1" alt=""></p>
							<p class="size18 marginB15 ellipsis" :class='item.choice ? "color" : ""'>{{item.goodsName}}</p>
							<p class="ellipsis3" :class='item.choice ? "color" : "color86"'>{{item.description}}</p>
						</div>
					</div>
					<div class="modal-sensor-details flex jc-sb fd-co">
						<div class="size22 marginB20">
							{{$t('navbar.Sensor')}}
						</div>
						<div class="modal-sensor-details-img">
							<img :src="sensor_details.image1" alt="">
						</div>
						<div class="ellipsis5">
							{{sensor_details.description}}
						</div>
						<div class="center">
							<a :href="goodsUrl+sensor_details.goodsId" target='_back' title="" class="width120px height38 btnF marginR40">{{$t('navbar.Look_up_Details')}}</a>
							<button class="width120px height38 btnF" @click='confirm'>{{$t('navbar.Select')}}</button>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'',
		props:{
			productDateils:{
				type: Object,
				default() {
				    return {}
				}
			},
			goods_details:{
				type: Object,
				default() {
				    return {}
				}
			},
			goods_su:{
				type: Array,
				default() {
				    return {}
				}
			},
			goods_su0:{
				type: Object,
				default() {
				    return {}
				}
			},
		},
	    data(){
			return {
				sensor1:require('@/assets/img/sensor1.png'),
				sensor2:require('@/assets/img/sensor2.jpg'),
				tubiao1:require('@/assets/img/tubiao1.png'),
				isModal:false,
				sensor_details:this.goods_su0,
				choice_sensor:false,
				sensor_arr:[], // 选择的
				num:-1,
				no_data:require('@/assets/img/no-data.png'),
				see_url:'',
			}
		},
		created(){
			if(typeof this.goods_details.portInfo == 'string'){
				this.goods_details.portInfo=JSON.parse(this.goods_details.portInfo)
			}
			
			
			for(let i in this.goods_details.portInfo){
				this.sensor_arr.push({[i]:this.goods_details.portInfo[i]})
			}

			if(this.productDateils._id){
				this.$store.commit('SENSOR')
				var num=this.$store.getters.sensor
				if(num==1 && this.productDateils.coms.length>0){
					this.coms()
				}
			}

			var self=this
			this.ajax({ 
			    mode:'GET',
			    goods:true,
			    url:'shop/goods/devInfo/'+this.goods_details.goodsId,
			    data:{
			    	body:{}
			    },
			    success(res){
			    	self.see_url=res.data.doc[0] ? res.data.doc[0].docLink : ''
			    }
			})


		},
		methods: {
			sub(boo){//完成创建
				this.isModal= boo
				var obj={}

				obj.skuNo=this.goods_details.skuNo
				obj.bindSkuNo=this.goods_details.bindSkuNo
				
				obj.coms=[]
				for(let j=0;j<this.sensor_arr.length;j++){
					obj.coms.push({['com'+(j+1)]:this.sensor_arr[j].obj ? this.sensor_arr[j].obj.skuNo : ''})
				}
				if(this.productDateils._id){
					this.$store.commit('PROJECT_DATA',0)
				}
				obj.data=this.goods_details.data
				this.$emit('sub',obj)
			},
			found(){//创建项目
				this.$router.push({  path:'myProduct',query: { model:true }});
			},
			noFound(){//不创建项目
				var id=localStorage.getItem('my_product_id') 
				this.$router.push({  path:'personal',query: { id: id }});
			},
			sensor_click(val,index){//选择传感器
				
				for(let i=0;i<this.goods_su.length;i++){
					this.goods_su[i].choice=false
				}
				this.sensor_details=val
				var obj=val
				obj.choice=true
				this.goods_su.splice(index,1,obj)
			},
			confirm(){//确认选择传感器
				if(this.sensor_details.goodsId){
					this.sensor_arr[this.num]={}
					this.sensor_arr[this.num].obj=this.sensor_details
					this.num=-1
					this.choice_sensor=false
				}else{
					this.$violate.center(this.$t('navbar.Please_select_sensor'))
				}
			},
			coms(){
				var self=this
				for(let i=0;i<self.productDateils.coms.length;i++){
					for(let j in self.productDateils.coms[i]){
						self.ajax({ 
						    mode:'GET',
						    goods:true,
						    url:'shop/goods/devInfo/'+self.productDateils.coms[i][j],
						    data:{
						    	body:{}
						    },
						    success(res){
						    	var obj={["com"+(i+1)]:self.$t('navbar.Port')+(i+1),obj:res.data.goods}
						    	self.sensor_arr.splice(i,1,obj)
						    }
						})
					}
				}
			}
		},
		computed:{
			goods_url(){
				var url=''
				if(this.$i18n.locale=='en'){
					url=GOODS_EN_DETAILS //商城链接
				}else{
					url=GOODS_ZH_DETAILS //商城链接
				}
    			return url
    		}
		},
		watch:{
			
		}
	}
</script>

<style scoped>
	.width1200{
		width:1200px;margin:auto;
	}
	.sensor{
		padding:50px 40px;height: 350px;width:444px;
	}
	.image1{
		width:180px;height: 180px;margin:0px auto 30px;
	}

	.dtu-content{
		padding:40px 50px 30px;height: 350px;width:715px;
	}
	.see{
		bottom: 20px;margin-left: -50px;
	}
	.sensor-img{
		height:70px;
		/*padding:10px;*/
		/*background:#F4F4F4;*/
	}
	.sensor-img img{
		height:70px;width:70px;
	}


	.is-found-project{
		padding:50px;
		/*position: absolute;left: 0px;top: 0px;right: 0px;bottom: 0px;margin:auto;width: 524px;height: 425px*/
	}
	.is-found-project img{
		width:268px;
		display: block;
		margin:auto;
	}
	.height100{
		height: 80px;
	}
	.padding50{
		padding:50px 30px;
	}
	.modal-sensor-box{
		width: 580px;
		padding-right: 30px;
		overflow-y: auto;
		    height: 578px;
	}
	.modal-sensor{
		width: 260px;height: 269px;
		padding:30px 15px;
		background:#F4F4F4;
	}
	.modal-sensor-img{
		height: 70px;
		margin-bottom: 40px;
	}
	.modal-sensor img{
		display: block;
		height:70px;width: 70px;
		margin:auto;
	}
	.modal-sensor-details{
		width:500px;
		padding:0px 30px;
	}
	.modal-sensor-details-img{
		height:130px;
	}
	.modal-sensor-details-img img{
		height:130px;width: 130px;
		display: block;
		margin:auto;
	}
	.sensor-synopsis{
		width:410px;
	}
	.details{
		overflow: hidden;height:185px;
	}
	.details img,.details table{
		display: none
	}
</style>
