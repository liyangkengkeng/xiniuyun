<template>
  	<div class="">
  		<div class="size20 bold color30 marginB20">
			{{$t('navbar.Application_Setup')}}
		</div>
		<div>
			<div class="flex backgroundFFF border-r5 border demo">
				<div class="marginR20">
					<img :src="qr" alt="">
				</div>
				<div class="flex fd-co jc-sb">
					<p class="size16 bold">DEMO</p>
					<p class="size12">lorem ipsum dolor sit amet，lorem ipsum dolor sit amet，lorem ipsum dolor sit amet，lorem ipsum dolor sit amet，lorem ipsum dolor sit amet，lorem ipsum dolor sit amet，lorem ipsum dolor sit amet，lorem ipsum dolor sit amet.</p>
					<p><button type="" class="btnf size16 color30">下载源码</button></p>
				</div>
			</div>
			<div class="flex backgroundFFF border-r5 border marginT30 demo">
				<div class="marginR20">
					<img :src="qr" alt="">
				</div>
				<div class="flex fd-co jc-sb">
					<p class="size16 bold">西牛云APP</p>
					<p class="size12">lorem ipsum dolor sit amet，lorem ipsum dolor sit amet，lorem ipsum dolor sit amet，lorem ipsum dolor sit amet，lorem ipsum dolor sit amet，lorem ipsum dolor sit amet，lorem ipsum dolor sit amet，lorem ipsum dolor sit amet.</p>
					<p><button type="" class="btnf size16 color30">{{$t('navbar.Download_Xnmatrix_App')}}</button></p>
				</div>
			</div>
		</div>
  	</div>
</template>

<script>
	export default {
	    data(){
			return {
				qr:require('@/assets/img/qr.png')
			}
		},
		created(){
			
    	},
		computed: {
			
		},
		methods: {
			
		},
		watch: {
			
		}
	}
</script>

<style scoped>
	.demo{
		padding: 47px 34px;
	}
	.demo img{
		width: 184px;height: 184px;
	}
	.demo .btnf{
		width: 180px;height: 48px;line-height: 48px;
	}
</style>
