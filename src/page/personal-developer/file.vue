<template>
  	<div class="file width80">
  		<div class="marginTB40 flex al-ce jc-sb">
			<span class='borderB3 paddingB5 size24 bold'>{{$t('navbar.Relevant_files')}}</span>
		</div>
  		<div class='file-box'>
  			<div class="file-box-header-text center marginB20 flex al-ce jc-ce" :style='{backgroundImage:file_img}'>
  				<span class='size36 colorFFF'>{{$t('navbar.Relevant_files')}}</span>
  			</div>
  			<div class="flex file-list-box">
  				<div v-if='file.length<1' class='center no-data width100'>
					<img :src="no_data" alt=""> 
					<span>{{$t('navbar.No_data_yet')}}</span>
				</div>
  				<div class="flex file-list size16 color86 marginB20" v-for='(val,index) in file'>
  					<div class="file-list-img marginR20"><img :src="img" alt=""></div>
  					<div class="flex fd-co jc-sb">
  						<p class="color30">{{val.docName}}</p>
  						<p>{{val.description}}</p>
  						<p class="cp file-download"><a :href="val.docLink" target='_blank'>{{$t('navbar.Details')}}</a></p>
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
				file_img:'url('+require('@/assets/img/file-img.png')+')',
				no_data:require('@/assets/img/no-data.png')
			}
		},
		created(){
			
    	},
		computed: {
			file(){
		        return this.$store.getters.goodsData.doc || []
		      }
		},
		methods: {
			// download(){  //单个下载
			// 	var eleForm = document.createElement('form');
			// 	eleForm.method='get'
	  //           eleForm.action="https://codeload.github.com/douban/douban-client/legacy.zip/master";
	  //           document.getElementsByTagName('body')[0].appendChild(eleForm);
	  //           //提交表单，实现下载
	  //           eleForm.submit();
	  //           document.getElementsByTagName('body')[0].removeChild(eleForm)
			// },
			// full_text_download(){//全文下载
			// 	var eleForm = document.createElement('form');
			// 	eleForm.method='get'
	  //           eleForm.action="https://codeload.github.com/douban/douban-client/legacy.zip/master";
	  //           document.getElementsByTagName('body')[0].appendChild(eleForm);
	  //           //提交表单，实现下载
	  //           eleForm.submit();
	  //           document.getElementsByTagName('body')[0].removeChild(eleForm)
			// }
		},
		watch: {
			
		}
	}
</script>

<style scoped>



	.file-box-header-text{
		height: 150px;
		background-size: 100% 100%;
		background-position: center;
		background-repeat: no-repeat;
		/*padding-top: 30px;*/
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
	}
	.file-download{
		text-decoration: underline
	}
	.full-text-download{
		background:#f0f1f3;
	}
	.no-data img{
		margin-top: 180px;
	}
</style>
