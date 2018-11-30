<template>
	<div class='center backgroundF8 pr height30'>
  		<span>Copy @2018.Company name All rights reserved</span>
  		<button type="" class="btnColor width150px height30 pa opinion al-ce jc-ce" @click='show=!show'><img class="xf-icon" :src="xf" alt="">&nbsp;<span>{{$t('navbar.a48')}}</span></button>
  		<div class='opinion-modal pa backgroundFFF padding20' v-if='show'>
  			<p class="marginB10 bold">{{$t('navbar.a48')}}</p>
  			<p class="marginB10">{{$t('navbar.a49')}}</p>
 			<p class="marginB10"><span class="marginR20">{{em}}</span><button type="" class="btnColor height30 paddingLR20" @click='copy'>{{$t('navbar.Copy')}}</button></p> 
			<p>{{$t('navbar.a50')}}</p>
  		</div>
	</div>
</template>

<script>
    export default {
    	data(){
    		return {
    			show:false,
    			em:'info@xnmatrix.com',
    			xf:require('@/assets/img/xf-icon.png'),
    		}
    	},
    	created(){
    		
    	},
    	computed: {
    		
    	},
		methods: {
			copy(){//复制
				 // 动态创建 input 元素
				  var aux = document.createElement("input");

				  // 获得需要复制的内容
				  aux.setAttribute("value", this.em);

				  // 添加到 DOM 元素中
				  document.body.appendChild(aux);

				  // 执行选中
				  // 注意: 只有 input 和 textarea 可以执行 select() 方法.
				  aux.select();
				  
				  // 获得选中的内容
				  var content = window.getSelection().toString();
				    
				  // 执行复制命令
				  document.execCommand("copy");

				  // 将 input 元素移除
				  document.body.removeChild(aux);
				  this.$success.center(this.$t('navbar.Copy_Successful'))
				  // this.url_modal=false
			},
		},
		watch:{
			
		}
    }
</script>

<style scoped>
	.btnColor.opinion{
		right: 0px;bottom: 0px;
		border-radius: 0px;
		border-top-left-radius: 5px;
		display: flex
	}
	.opinion-modal{
		right: 0px;bottom:35px;
		min-width: 370px;
   	 	box-shadow: -5px -5px 20px rgba(0,0,0,.1), -5px 5px 20px rgba(0,0,0,.1);
	}
	.xf-icon{
		width: 20px;height: 20px;
	}
	.width150px{
		width: 150px;
	}
</style>
