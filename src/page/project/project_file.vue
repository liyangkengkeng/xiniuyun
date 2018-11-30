<template>
  	<div class="file">
  		<!-- <div class="backgroundF0 file-header">
  			<span class="btn marginR20">项目信息</span>
  		</div> -->
  		<div class='file-box'>
  			<div class="file-box-header-text center marginB20 flex al-ce jc-ce" :style='{backgroundImage:"url("+file_img+")"}'>
  				<span class='size36 colorFFF'>{{$t('navbar.Relevant_files')}}</span>
  			</div>
  		<div class="flex file-list-box fw-wrap width80">
	        <div v-if='list.length<1' class='center width100 no-data width80'>
	         	<img :src="no_data" alt="">
	          	<span>{{$t('navbar.No_file_information')}}</span>
	        </div>
			<div class="flex file-list size16 color86 marginB20" v-for='(val,index) in list'>
		        <div class="file-list-img marginR20"><img :src="img" alt=""></div>
		        <div class="flex fd-co jc-sb">
		          <p class="color30"><a :href="val.docLink" target='_blank'>{{val.docName}}</a></p>
		          <p>{{val.description}}</p>
		          <!-- <p class="cp file-download"><a :href="val.docLink" target='_blank'>{{$t('navbar.Details')}}</a></p> -->
		        </div>
		    </div>
  		</div>
  			
  			
  		</div>
  	</div>
</template>

<script>
	export default {
	    data(){
			return {
				img:require('@/assets/img/my-file.png'),
				file_img:require('@/assets/img/file-img.png'),
        		list:[],
        		no_data:require('@/assets/img/no-data.png'),
        		lang_show:true
			}
		},
		created(){
			
    	},
		computed: {
			file(){
		        return this.$store.getters.project_product_list
		    },
		    lang(){
				return this.$i18n.locale
			}
		},
		methods: {
	      goods(id){
	        var self=this
	        this.ajax({ 
	        	scope_token:localStorage.getItem('scope_token'),
	            mode:'GET',
	            goods:true,
	            url:'shop/goods/infoBySkuNo/'+id,
	            data:{
	              body:{
	                
	              }
	            },
	            success(res){
	              res.data.doc=res.data.doc || []
	              if(res.data.goods.image1)
	              	self.img=res.data.goods.image1
	              for(let i=0;i<res.data.doc.length;i++){
	              	self.list.push(res.data.doc[i])
	              }
	            }
	        })
	      } 
		},
		watch: {
			file:{
		        handler(val){
		        	this.list=[]
			        for(let i=0;i<val.length;i++){
			        	var sku= this.lang_show ? val[i].skuNo : val[i].bindSkuNo
			         	this.goods(sku)
			        }
		        },
		        immediate:true
		    },
		    lang(val){
				this.lang_show=!this.lang_show
				for(let i=0;i<this.file.length;i++){
					var sku= this.lang_show ? this.file[i].skuNo : this.file[i].bindSkuNo
		          	this.goods(sku)
		        }
			}
		}
	}
</script>

<style scoped>
	.file-box-header-text{
		height: 150px;
		background-size: 100% 100%;
		background-position: center;
		background-repeat: no-repeat;
	}
	.file-list-img{
		width: 100px;height: 100px;
	}
	.file-list-img img{
		width: 100%;height: 100%;
	}
	.file-list-box{
		flex-wrap: wrap;
	}
	.file-list{
		width:30%;
		flex-shrink: 0;
		margin-right: 3%
	}
	.file-download{
		text-decoration: underline
	}
	.full-text-download{
		background:#f0f1f3;
	}
	.full-text-download .btnf{
		width: 164px;height: 48px;line-height: 48px;margin:0px 50px;
	}
	.no-data img{
		margin-top: 150px;
	}
</style>
