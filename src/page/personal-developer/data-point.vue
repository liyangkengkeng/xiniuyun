<template>
  	<div class="data-point width80">
  		
  		<div class="marginTB40 flex al-ce jc-sb">
			<span class='borderB3 paddingB5 size24 bold'>{{$t('navbar.Product_Information')}}</span>
		</div>
  		<div class="data-point-box">
			<div class="size24 marginTB20">
				{{$t('navbar.Standard_Functions')}}
			</div>
			<div class="data-point-list-box">
				<div :style='{marginTop:margintop}' class="pagingTrans">
					<div class="flex paddingLR20 marginB20 backgroundFFF height48 border-r5">
						<p class="table_num">#</p>
						<p class="table_name flex al-ce">{{$t('navbar.Function_point_Name')}}</p>
						<p class="table_unit flex al-ce">{{$t('navbar.TAG')}}</p>
						<p class="table_val flex al-ce">{{$t('navbar.Data_Transmit_Type')}}</p>
						<p class="table_val flex al-ce">{{$t('navbar.Function_point_Type')}}</p>
						<p class="table_des flex al-ce">{{$t('navbar.Function_point_Property')}}</p>
						<p class="table_time flex al-ce">{{$t('navbar.Remarks')}}</p>
					</div>
					<div v-if='fun.length<1' class='center no-data'>
						<img :src="no_data" alt=""> 
						<span>{{$t('navbar.No_data_yet')}}</span>
					</div>
					<div v-for='(val,index) in fun' :key='index' class="flex paddingLR20 marginB20 backgroundFFF height48 border-r5">
						<p class="table_num">{{index+1}}</p>
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
						<!-- <p class="table_data">
							啊飒飒
						</p> -->
						<!-- <p class="trend table_img flex al-ce"><img :src="trend" alt="" class="cp" @click='jump(val)'></p> -->
					</div>
				</div>
				
			</div>
			<!-- <div class="center size12 color86 marginB10">
				定制化功能，研发中
			</div> -->
			<div class="page-btn flex jc-ce" v-if='fun.length>7'>
				<button class="btnF width200px height28 marginR40" @click='paging(true)'>{{$t('navbar.Last_Page')}}</button><button class="btnF width200px height28" @click='paging(false)'>{{$t('navbar.Next_Page')}}</button>
			</div>
  		</div>	
  	</div>
</template>

<script>
	export default {
	    data(){
			return {
				see:require('@/assets/img/see-asd-icon.png'),
				del:require('@/assets/img/del-asd-icon.png'),
				img:require('@/assets/img/switch.png'),
				fun:[],
				table:[],
				page:0,
				margintop:0,
				no_data:require('@/assets/img/no-data.png')
			}
		},
		created(){
			this.point()
    	},
		computed: {
			language(){
    			return this.$i18n.locale
    		}
		},
		methods: {
			dels(val,index){//删除
				this.table.splice(index,1)
				val.state=false;
				for(var i=0;i<this.fun.length;i++){
					if(this.fun[i].content===val.content){
						this.fun.splice(i,1,val)
					}
				}
			},
			edit_table(event,val){
				val.state=!val.state
				event.target.checked=val.state
			},
			paging(boo){//翻页
				var len=Math.ceil(this.fun.length/6)
				if(boo){
					if(this.page>0){
						this.page--
						this.margintop=-this.page*528+'px'
					}
				}else{
					if(this.page<Math.ceil(this.fun.length/6)-1){
						this.page++
						this.margintop=-this.page*528+'px'
					}
				}
			},
			point(){
				var self=this
				self.ajax({ 
				    mode:'GET',
				    url:'v1/models/'+localStorage.getItem('my_product_id')+'/fields/',
				    data:{},
				    success(res){
				    	var type=[{val:1,name:self.$t('navbar.boolean_type')},{val:2,name:self.$t('navbar.value_type')},{val:3,name:self.$t('navbar.enumerate_type')},{val:4,name:self.$t('navbar.fault_type')},{val:5,name:self.$t('navbar.character_type')},{val:6,name:self.$t('navbar.RAW_type')}]
		    			var tran=[{val:'rw',name:self.$t('navbar.support_uplink_downlink')},{val:'ro',name:self.$t('navbar.support_uplink_only')},{val:'wo',name:self.$t('navbar.support_downlink_only')}]
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
	    				self.fun=res.data.data//商品
				    }
				})
			}
		},
		watch: {
			language(val){
				this.point()
			}
		}
	}
</script>

<style scoped>

	.fun-list-box{
		flex-wrap: wrap;
	}
	.fun-list{
		width: 140px;
		height: 60px;
		margin: 0px 12px 10px 0px;
	}
	.filter{
		width: 20px;height: 20px;overflow: hidden;
	}
	.filter img{
		width: 100%;height: 100%;
	}
	.fun-list.drop img{
        -webkit-filter:drop-shadow(20px 0 rgb(255, 255, 255));
        filter:drop-shadow(20px 0 rgb(255, 255, 255));
		margin-left: -20px;
	}
	.fun-list.drop{
		color:#fff;
		background:rgb(185, 146, 89);
	}
	.fun-list input{
		opacity: 0;
		width: 100%;height: 100%;left: 0;top: 0
	}
	.data-point-list-box{
		overflow: hidden;
		height: 528px;
	}
	.data-point-list-btn{
		width: 200px;
		flex-shrink: 0
	}
	.data-point-list-btn img{
		width: 22px;height: 22px;
	}
	.data-point-list-btn img:last-child{
		margin-top: -2px
	}
	.page-btn{
		margin-top: 30px
	}
	.page-btn button{
		width: 200px;
	}
	.fieldname,.description{
		min-width: 250px;
	}
	.max,.min,.unit{
		width: 150px;
	}
	.table_num{
		width:4%;
	}
	.table_name{
		width:19%;
	}
	.table_unit,.table_val,.table_operation{
		width:9%
	}
	.table_des{
		width:24%;
	}
	.table_operation_see{
		text-decoration: underline
	}
	.table_time,.table_data{
		width:9%
	}
	.no-data img{
		margin-top: 180px;
	}
	.table_time,.table_des,.table_name,.table_unit,.table_val{
		line-height: 16px;margin-right: 1%
	}

</style>
