<template>
	<div class="">
		<well-hardware v-if='show' @addStep_suk='addStep_suk' @upper='upper' :goods_cp='goods_cp' @sub='sub'></well-hardware>
		<dtu-hardware v-else @upper='upper' @addStep_suk='addStep_suk' :goods_dtu='goods_dtu' @goods='goods'></dtu-hardware>
	</div>
</template>

<script>
import wellHardware from './well-hardware'
import dtuHardware from './dtu-hardware'
	export default {
		name:'',
		props:['goods_dtu','goods_cp','finalType1'],
	    data(){
			return {
				goods_details:{},
			}
		},
		created(){
			
		},
		methods: {
			addStep_suk(val){
				this.$emit('addStep_suk',val)
			},
			upper(val){
				this.$emit('upper',val)
			},
			goods(val){
				this.goods_details=val
				this.$emit('goods',val)
			},
			sub(val){ //创建产品
				this.$emit('sub',val)
			},
		},
		computed:{
			show(){
				return this.$store.getters.wellORdtu
			}
		},
		watch:{
			
		},
		components:{
			wellHardware,dtuHardware
		}
	}
</script>

<style scoped>
	
</style>
