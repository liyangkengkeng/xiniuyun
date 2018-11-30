<template>
	<div class="calc80">
		<div class="flex jc-ce pr found-product-header">
			<div class="pa found-re">
				<button type="" class="width120px height28 btnF" @click='back' v-if='step!=0'>{{$t('navbar.Back_to_last_step')}}</button>	
			</div>
			<div class="flex size14 found-nav">
				<p class="marginR40" :class="step==0 ? 'color' : ''">{{$t('navbar.Create_product')}}</p>
				<p class="marginR40" :class="step==1 ? 'color' : ''">{{$t('navbar.Catergory_Select')}}</p>
				<p class="marginR40" :class="step==2 ? 'color' : ''">{{$t('navbar.Select_Hardware')}}</p>
				<p :class="step==3 ? 'color' : ''" v-if='show'>{{$t('navbar.Create_Completed')}}</p>
			</div>
		</div>
		<div v-if='renovate'>
			<div v-if='edit'> <!-- 编辑产品 -->
				<product-name v-if='step==0' @product_data='product_data' :productDateils='productDateils'></product-name>
				<product-type v-if='step==1' @addStep_suk='addStep_suk' @shows='shows'></product-type>
				<hardware v-if='step==2' @addStep_suk='addStep_suk' @sub='sub' @upper='upper' @goods='goods' :goods_cp='goods_cp' :goods_dtu='goods_dtu'></hardware>
				<finish v-if='step==3' @addStep_suk='addStep_suk' :goods_details='goods_details' :goods_su='goods_su' :goods_su0='goods_su[0]' @sub='sub' :productDateils='productDateils'></finish>
			</div>
			<div v-else>  <!-- 创建产品 -->
				<product-name v-if='step==0' @product_data='product_data' :product='product'></product-name>
				<product-type v-if='step==1' @addStep_suk='addStep_suk' @shows='shows'></product-type>
				<hardware v-if='step==2' @addStep_suk='addStep_suk' @sub='sub' @upper='upper' @goods='goods' :goods_cp='goods_cp' :goods_dtu='goods_dtu'></hardware>
				<finish v-if='step==3' @addStep_suk='addStep_suk' :goods_details='goods_details' :goods_su='goods_su' :goods_su0='goods_su[0]' @sub='sub'></finish>
			</div>
		</div>
		
	</div>
</template>

<script>
import productName from './product-name'
import productType from './product-type'
import hardware from './hardware'
import finish from './finish'
	export default {
		name:'foundProduct',
	    data(){
			return {
				step:0,
				goods_details:{}, //商品详情
				goods_cp:[], //成品商品列表
				goods_dtu:[], //DTU商品列表
				goods_su:[], //传感器列表
				product:{},
				show:true, //选择的是成品还是dtu
				edit:false, //是否是编辑
				finalType1:'', //编辑下关联商品属于成品还是DTU
				sensor:false,
				renovate:true
			}
		},
		created(){
			if(this.$route.query.edit)
				this.edit=this.$route.query.edit
			this.obtain_goods()
			this.$store.commit('SENSOR0')
		},
		methods: {
			addStep_suk(val){
				this.step=val
			},
			upper(val){
				this.step=val
			},
			goods(val){
				this.goods_details=val
			},
			product_data(val){
				if(this.edit){
					if(this.finalType1==this.$t('navbar.Industry_Product')){
						this.step = 2
					}else if(this.finalType1==this.$t('navbar.Data_Trasmit_Product')){
						this.step = 3
					}
				}else{
					this.step= 1
					this.product=val
				}
			},
			shows(){
				this.show=false
			},
			obtain_goods(){//获取商城商品列表
				var self=this
				self.goods_cp=[]
				self.goods_dtu=[]
				self.goods_su=[]
				this.ajax({ 
				    mode:'POST',
				    goods:true,
				    url:'shop/goods/listDev',
				    data:{
				    	pageSize:1000
				    },
				    success(res){
				    	for(let j=0;j<res.data.body.rows.length;j++){
				    		if(res.data.body.rows[j].showInDev==1){
				    			res.data.body.rows[j].choice=false
					    		if(self.edit && self.productDateils.skuNo==res.data.body.rows[j].skuNo){
					    			self.finalType1=res.data.body.rows[j].finalType1
					    			self.goods_details=res.data.body.rows[j]
					    			if(self.finalType1==self.$t('navbar.Industry_Product')){
					    				self.show=false
					    				self.$store.commit('WELL_OR_DTU',true)
					    			}else{
					    				self.show=true
					    				self.$store.commit('WELL_OR_DTU',false)
					    			}
					    		}
					    		if(res.data.body.rows[j].finalType1==="行业产品"){
					    			self.goods_cp.push(res.data.body.rows[j])
					    		}
					    		if(res.data.body.rows[j].finalType1==="DTU产品"){
					    			self.goods_dtu.push(res.data.body.rows[j])
					    		}
					    		if(res.data.body.rows[j].finalType1==="SU产品"){
					    			self.goods_su.push(res.data.body.rows[j])
					    		}
				    		}
				    	}
				    	self.goods_su[0].choice = self.goods_su[0] ? true : false 
				    }
				})
			},
			sub(val){
				var self=this
				self.product.skuNo=val.skuNo
				self.product.bindSkuNo=val.bindSkuNo
				self.product.coms=val.coms || []
				var url= self.edit ? 'v1/models/'+self.productDateils._id : 'v1/models/'
				self.ajax({
					mode:self.edit ? "PUT" : "post",
	                url:url,
	                data:self.product,
	                success(res){
	                	if(val.data && val.data.length>0){
	                		var a=0;
	                		for(let i=0;i<val.data.length;i++){
	                			var obj={}
	                			for(let key in val.data[i]){
	                				if(val.data[i][key]){
	                					obj[key]=val.data[i][key]
	                				}
	                			}
	                			self.ajax({
			                		mode:'post',
					                url:'v1/models/'+res.data.data._id+'/fields/',
					                data:obj,
					                success(ress){
					                	a++
					                	if(a==val.data.length){
				                			if(self.edit){
						                		self.$router.push({  path:'personal',query: { id: self.productDateils._id }});
						                	}else{
						                		localStorage.my_product_id=res.data.data._id
						                		self.$store.commit('PRODUCTID',res.data.data._id)
						                	}
				                		}
					                }
			                	})
	                		}
	                	}else{
	                		localStorage.my_product_id=res.data.data._id
						    self.$store.commit('PRODUCTID',res.data.data._id)
	                	}
	                }
				})
			},
			back(){//返回上一页面
				this.step--
			},
		},
		computed:{
			productDateils(){
				return this.$store.getters.product_data
			},	
			language(){
    			return this.$i18n.locale
    		}
		},
		watch:{
			language(val){
				var self=this
				this.renovate=false
				this.$nextTick(function(){
					self.step=0
					self.renovate=true
					self.product={}
				})
				this.obtain_goods()
			}
		},
		components:{
			productName,productType,hardware,finish
		}
	}
</script>

<style scoped>
	.calc80{
		/*min-height: calc(100vh + 80px);*/
	}
	.found-product-header{
		box-shadow: 0px 1px 2px rgba(0,0,0,.2);
	}
	.found-re{
		left: 20px;top: 50%;transform: translateY(-50%);
	}
	.found-nav{
		height: 50px;line-height: 50px;
	}
</style>
