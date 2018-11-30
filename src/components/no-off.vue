<template>
		<div class="switch border colorFFF" :class='val ? "background11" : "backgroundEE"' @click='no_off'>
			<span class="off center cp" :class='val ? "backgroundEF off" : "backgroundBD on"'>{{val}}</span>
		</div>
</template>

<script>
	export default {
		name:'noOff',
		props:['off'],
	    data(){
			return {
				val:this.off
			}
		},
		created(){
		},
		methods: {
			no_off(){
				this.val=!this.val
			}
		},
		watch:{
			off(val){
				this.val=val
			},
			val(val){
				this.$emit('NoOff',val)
			}
		}
	}
</script>

<style scoped>
	.switch{
		width: 60px;height: 30px;line-height: 28px;border-radius: 30px;
	}
	.switch span{
		display: inline-block;
		width: 30px;
		height: 100%;
		border-radius: 30px;
		transition: 1s
	}
	.backgroundEF{
		background:#fff
	}
	.backgroundBD{
		background:#bdb7b7
	}
	.off{
		transform: translateX(0);
	}
	.on{
		transform: translateX(100%);
	}
</style>
