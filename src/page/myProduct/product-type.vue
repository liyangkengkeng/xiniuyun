<template>
	<div class="flex jc-sb width1200">
		<div class="well backgroundFFF">
			<div>
				<img :src="chengp" alt="" class="dtu-img width100">
			</div>
			<div>
				<p class="center size20 color54 bold marginB10">{{$t('navbar.Finished_Product')}}</p>
				<p class="height80">{{$t('navbar.a46')}}</p>
				<p class="center marginT20"><button type="" class="btnF width120px height28 choice" @click='choice(true,1)'>{{$t('navbar.Select')}}</button></p>
			</div>
		</div>
		<div class="dtu backgroundFFF">
			<div>
				<img :src="dtu_img" alt="" class="dtu-img width100">
			</div>
			<div>
				<p class="center size20 color54 bold marginB10">DTU</p>
				<p class="height80">{{$t('navbar.a47')}}</p>
				<p class="center marginT20">
					<button type="" class="btnF width120px height28 choice" @click='choice(false,0)'>{{$t('navbar.Select')}}</button>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'',
	    data(){
			return {
				well_img:require('@/assets/img/product-list-img.png'),
				dtu_img:require('@/assets/img/found-dtu.png'),
				chengp:require('@/assets/img/chengp.png')
			}
		},
		created(){
			
		},
		methods: {
			choice(boo,index){
				this.$store.commit('WELL_OR_DTU',boo)
				this.$emit('addStep_suk',2)
				if(index==1){
					this.$emit('shows',false)
				}
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
	.well, .dtu{
		width:575px;
		padding:50px;
		margin-top: 40px;
	}
	.well-img-box p{
		width:230px;height:160px;background:#F4F4F4;margin-bottom: 14.25px;
	}
	.well-img-box p img{
		width:142px;
	}

	.dtu-img{
		display: block;margin-bottom: 14.25px;width: 475px;height: 334.25px;
	}
	.choice:hover{
		background:#11A9A4;color:#fff
	}
	.height80{
		height: 80px;
	}
</style>
