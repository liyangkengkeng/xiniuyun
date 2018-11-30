<template>
  	<div class="color86 size14 file-flow width80">
  		<div class="size20 bold marginB10">
  			<span>文章A标点</span>
  			<a href="javascript.vido(0)" class="width100px height28 btnF">下载PDF</a>
  		</div>
  		<div class="flex color86 size14">
	  		<p class="marginR20">发布时间：2017-12-01</p>
	  		<p>更新时间：2017-12-01</p>
  		</div>
  		<div class="size16 bold marginT40 marginB10">
  			1.锚点标题
  		</div>
  		<div class="marginB10">
  			内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内
			容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容
			详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详
			情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情
			内容详情内容详情内容详情内容详情内容详情内容详情内容详情
  		</div>
  		<div class="">
  			<p class="img"><img :src="img" alt="" class="marginB10"></p>
  			<p class="center marginB10">图1</p>
  		</div>
  		<div class="marginT20">
  			内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内
			容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容
			详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详
			情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情
			内容详情内容详情内容详情内容详情内容详情内容详情内容详情
  		</div>
  		<div class="size16 bold marginT40 marginB10">
  			2.锚点标题
  		</div>
  		<div class="marginB10">
  			内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内
			容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容
			详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详
			情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情
			内容详情内容详情内容详情内容详情内容详情内容详情内容详情
  		</div>

  	</div>
</template>

<script>
	export default {
	    data(){
			return {
				img:require('@/assets/img/file-flow-img.png'),
			}
		},
	}
</script>

<style scoped>
	.file-flow{
		width: 882px;
	}
	.img{
		width: 882px;height: 320px;
	}
	.img img{
		width: 100%;height: 100%;
	}
</style>
