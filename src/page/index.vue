<template>
  	<div class="indexStyle">
  		<!-- <crumbs></crumbs> -->
  		<head-top :show='false'></head-top>
  		<div class="box pr">
  			<router-view></router-view>
  		</div>
  		<div class='record pa width100'>
		  		<footers></footers>
		  	</div>
  	</div>
</template>

<script>
import headTop from '@/components/headTop'
import footers from '@/components/footer'
import '../../static/js/js'
	export default {
	    data(){
			return {
			}
		},
		created(){
			clear_testUser=false
			OVERTIME(Number(localStorage.getItem('expires_in')))
		},
		mounted(){
			
		},
		computed: {
			
		},
		methods: {
			
		},
		watch: {
			
		},
		destroyed(){
			clear_testUser=true
		},
		components: {
    		headTop,footers
    		// ,crumbs
    	},
	}
</script>

<style scoped>
	.box{
		padding: 50px 0px 130px;
		background:#f8f8f8;
		min-height: calc(100vh - 130px)
	}
	
</style>
