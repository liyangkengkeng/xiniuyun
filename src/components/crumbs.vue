<template>
	<div class="crumbs pa">
		<div v-for='(item,index) in list' :key='index' class="box cp">
			<div class="header flex jc-sb al-ce" @click='isIcon(item,index)'>{{item.meta.title}} <Icon :type="item.icon ? 'chevron-down' : 'chevron-up'"></Icon></div>
			<router-link :to='item.path+"/"+val.path' v-if='item.children && item.icon' v-for='(val,key) in item.children' :key='key'>
				<div class="content" :class="val.path == crumbs ? 'background' : ''">{{val.meta.title}}</div>
			</router-link>
		</div>
		
	</div>
</template>

<script>
    export default {
		data(){
			return {
				list:[],
				crumbs:''
			}
		},
		created(){
			this.crumbs=this.$route.path
			this.list=this.$router.options.routes[1].children
			this.list.forEach(item=>{
				item.icon=false
			})
		},
		methods: {
			isIcon(item,index){
				item.icon=!item.icon
				this.list.splice(index,1,item)
			}
		},
		watch:{
			$route(){
				var str=this.$route.path.split('/')
				this.crumbs=str[str.length-1]
			}
		}
    }
</script>


<style scoped>
	.crumbs{
		width: 200px;
		background:#657180;
		height:  calc(100% - 80px);
		left: 0px;
		top: 80px;
		z-index: 999
	}
	.content.background{
		/*background: #657180;*/
	}
	.content{
		color: #fff;
		padding: 10px 40px;
		background: #464c5b
	}
	.content:hover{
		background: #657180;
	}

	.header{
		background: #657180;
		color: #fff;
		padding: 10px 20px;
	}
</style>
