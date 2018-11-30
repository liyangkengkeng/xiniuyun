<template>
	<div>
		<div class="personal backgroundF8 pr color30">
	  		<head-top :show='false'></head-top>
	  		<router-view></router-view>	
	  	</div>
	  	<div class="menberCenter-footer">
	  		<bottom></bottom>
	  	</div>
	</div>
</template>
<script>
import headTop from '@/components/headTop'
import bottom from '@/components/bottom'
	export default {
	    data(){
			return {
			}
		},
		created(){
    	},
		computed: {
			lang(){
				return this.$i18n.locale
			}
		},
		methods: {
			
		},
		watch: {
			lang(val){
				this.lang_show=!this.lang_show
			}
		},
		components: {
    		headTop,bottom
    	},
	}
</script>

<style scoped>
	.personal{
		width: 100vw;
		min-height: 100vh;
		overflow: hidden;
		padding: 50px;
	}

	.menberCenter-footer{
		position: absolute;bottom: 0px;width: 100%
	}
</style>
