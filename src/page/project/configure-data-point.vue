<template>
  	<div class="width80">
		<div class="size22 marginB20">
			{{$t('navbar.Data_point')}}
		</div>
		<div class="marginB20">
			<p v-for='(val,index) in list' class="point-nav marginR20 paddingLR10" :class="status==index ? 'btnColor height30' : 'height28 btnF'" @click='switch_product(val,index)'>
				{{$t('navbar.Product')}}{{index+1}}：{{val.name}}
			</p>
		</div>
		<div class="flex paddingLR20 marginB20 backgroundFFF height48 border-r5">
			<p class="table_num">#</p>
			<p class="table_name flex al-ce">{{$t('navbar.Function_point_Name')}}</p>
			<p class="table_unit flex al-ce">{{$t('navbar.TAG')}}</p>
			<p class="table_val flex al-ce">{{$t('navbar.Data_Transmit_Type')}}</p>
			<p class="table_val flex al-ce">{{$t('navbar.Function_point_Type')}}</p>
			<p class="table_des flex al-ce">{{$t('navbar.Function_point_Property')}}</p>
			<p class="table_time flex al-ce">{{$t('navbar.Remarks')}}</p>
			<!-- <p class="table_img">历史趋势</p> -->
		</div>
		<div class='center no-data' v-if='point_arr.length<1'>
			<img :src="no_data" alt="">
			<span>{{$t('navbar.No_data_yet')}}</span>
		</div>
		<div v-for='(val,index) in point_arr' :key='index' class="flex paddingLR20 marginB20 backgroundFFF height48 border-r5">
			<p class="table_num flex al-ce">{{index+1}}</p>
			<p class="table_name flex al-ce">{{val.funName || '-'}}</p>
			<p class="table_unit flex al-ce">{{val.fieldname || '-'}}</p>
			<p class="table_val flex al-ce">{{val.transport ? val.transport.name : '-'}}</p>
			<p class="table_val flex al-ce">{{val.type ? val.type.name : '-'}}</p>
			<p class="table_des flex al-ce">
				<span v-if='val.type.val==1 '>
	    			-
	    		</span>
	    		<span v-else-if='val.type.val==2'>
	    			{{$t('navbar.Range_of_Value')}}：{{val.min || ''}}-{{val.max || ''}},{{$t('navbar.spacing')}}：{{val.spacing || '-'}}，{{$t('navbar.Multiples')}}：{{val.multiple || '-'}}，{{$t('navbar.Unit')}}：{{val.unit || '-'}}
	    		</span>
	    		<span v-else-if='val.type.val==3'>
	    			{{val.enumerate || '-'}}
	    		</span>
	    		<span v-else-if='val.type.val==4'>
	    			{{val.fault || '-'}}
	    		</span>
	    		<span v-else-if='val.type.val==5 || val.type.val==6'>
	    			{{$t('navbar.Max_Length_Less_than_255bits')}}
	    		</span>
				<span v-else>
					-
				</span>
			</p>
			<p class="table_time flex al-ce">
				{{val.description || '-'}}
			</p>
			<!-- <p class="trend table_img flex al-ce"><img :src="trend" alt="" class="cp" @click='jump(val)'></p> -->
		</div>
  	</div>
</template>

<script>
	export default {
	    data(){
			return {
				status:0,
				point_arr:[],
				no_data:require('@/assets/img/no-data.png'),
			}
		},
		created(){
		},
		methods: {
			switch_product(val,index){
				this.status=index
				if(val.skuNo){
					this.goods(val._id)
				}
			},
			goods(id){
				var self=this
				self.ajax({ 
					scope_token:localStorage.getItem('scope_token'),
				    mode:'GET',
				    url:'v1/models/'+id+'/fields/',
				    data:{
				    },
				    success(res){
				    	var type=[{val:1,name:self.$t('navbar.boolean_type')},{val:2,name:self.$t('navbar.value_type')},{val:3,name:self.$t('navbar.enumerate_type')},{val:4,name:self.$t('navbar.fault_type')},{val:5,name:self.$t('navbar.character_type')},{val:6,name:self.$t('navbar.RAW_type')}]
		    			var tran=[{val:'rw',name:self.$t('navbar.support_uplink_downlink')},{val:'ro',name:self.$t('navbar.support_uplink_only')},{val:'wo',name:self.$t('navbar.support_downlink_only')}]

		    			// var a1=[{}]

					    for(let i=0;i<res.data.data.length;i++){
					    	for(let a=0;a<type.length;a++){
		    					if(type[a].val==res.data.data[i].type){
		    						res.data.data[i].type=type[a]
		    					}
		    				}
		    				for(let b=0;b<tran.length;b++){
		    					if(tran[b].val==res.data.data[i].transport){
		    						res.data.data[i].transport=tran[b]
		    					}
		    				}
		    			}
	    				// console.log(res.data.data)
	    				self.point_arr=res.data.data//商品
				    }
				})
			}
		},
		computed:{
			list(){
				if(this.$store.getters.project_product_list[0] && this.$store.getters.project_product_list[0]._id){
					this.goods(this.$store.getters.project_product_list[0]._id)	
				}
				return this.$store.getters.project_product_list
			},
		},
		watch: {
		}
	}
</script>

<style scoped>
	.point-nav{
		min-width: 100px;
	}

	.table_num{
		width:4%;
	}
	.table_name{
		width:14%;
	}
	.table_unit,.table_val,.table_operation{
		width:14%
	}
	.table_des{
		width:19%;
	}

	.table_des,.table_time,.table_name,.table_unit,.table_val{
		line-height: 16px;margin-right: 1%
	}
	.table_operation_see{
		text-decoration: underline
	}
	.table_time,.table_data{
		width:9%
	}
</style>
