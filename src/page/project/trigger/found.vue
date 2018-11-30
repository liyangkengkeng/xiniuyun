<template>
	<div>
		<div class="flex al-ce marginB20 width80">
			<span class='width120px size22'>{{$t('navbar.Trigger')}}</span>
			<template v-if='show'>
				<button type=""  :class='see ? "ban" : ""' :disabled='see' class="btn11 width200px height36" @click='show=false'>{{$t('navbar.Advanced_trigger_setup')}}</button>
			</template>
			<template v-else>
				<button type=""  :class='see ? "ban" : ""' :disabled='see' class="btn11 width200px height36" @click='show=true'>{{$t('navbar.Basic_trigger_setup')}}</button>
			</template>
		</div>
	  	<div class="width80">
	  		<primary v-show='show' :obj='obj' :see='see'></primary>
	  		<senior v-show='!show' :obj='obj' :see='see'></senior>
	  	</div>
	</div>
	
</template>

<script>
import primary from './primary'
import senior from './senior'
	export default {
	    data(){
			return {
				show:true,
				obj:{},
				see:false,
			}
		},
		created(){
			if(this.$route.query.see){
				this.see=this.$route.query.see
			}
		    if(this.$route.query.details){
		        this.show=this.$route.query.grade
		        this.obj=JSON.parse(this.$route.query.details)
		    }
    	},
		components: {
    		primary,senior
    	},
	}
</script>

<style scoped>
</style>
