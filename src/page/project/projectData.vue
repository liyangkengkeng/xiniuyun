<template>
	<div>
			<router-view></router-view>
	</div>
</template>

<script>
	export default {
	    data(){
			return {
				fa:null,
			}
		},
		created(){
			// console.log(this.$parent.$data)
			this.fa=this.$parent.$data
		}
	}
</script>

<style scoped>
	
</style>
