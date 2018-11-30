<template>
  	<div class="">
  		<div class='top-data flex jc-sb padding40 backgroundFFF marginTB40'>
  			<div class="line-H30">
  				网络连接正常请选择设备进行配置或升级<br>
  				网络连接正常请选择设备进行配置或升级<br>
  				网络连接正常请选择设备进行配置或升级<br>
  				网络连接正常请选择设备进行配置或升级<br>
  				网络连接正常请选择设备进行配置或升级<br>

  			</div>
  			<div>
  				<button type="" class='btnColor width120px height30'>清空</button>
  			</div>
  		</div>
		<div class="flex al-ce jc-sa backgroundFFF marginTB40 padding40">
			<div>
				<button type="" class='btn11 width120px height30 marginR20'>单选设备</button>
				<button type="" class='btnColor width120px height30'>批量选择设备</button>
			</div>
			<div>
				所选产品型号：CADSQSD 设备号：23134123
			</div>
			<div>
				<button type="" class='btnColor width120px height30 marginR20'>设备查询</button>
				<button type="" class='btnColor width120px height30'>设备重启</button>
			</div>
		</div>

		<div class="flex al-ce jc-sb marginTB40">
			<div class="marginR40 padding40 backgroundFFF width100 center height150">
				<p class="marginB20"><label><input type="radio" name="" value="1" v-model='or'>升级配置</label></p>
				<p><button type="" class='btnColor width120px height30' @click='up'>升级</button></p>
			</div>
			<div class="padding40 backgroundFFF width100 center height150">
				<p class="marginB20"><label><input type="radio" name="" value="2" v-model='or'>参数配置</label></p>
				<p><button type="" class='btnColor width120px height30' @click='con'>开始配置</button></p>
			</div>
			<div class="padding20 backgroundFFF width100 marginL40 height150 pr" v-if='or==2'>
				<div>
					<p class="marginB10">未连接设备</p>
					<p><input type="text" class="at-order"></p>
				</div>
				<div class="pa send width100">
					<button class="btnColor paddingLR10 paddingTB5 marginR10">发送</button>
					<button class="btnColor paddingLR10 paddingTB5" @click='help=!help'>帮助</button>
				</div>
			</div>
		</div>
		<div class="padding40 backgroundFFF">
			<div v-if='show'>
				<parameter v-if='or==1'></parameter>
				<div v-else class="center">
					<div class="marginB10">
			  			<img :src="parameter" alt="" class="img">
			  		</div>
			  		<div class="marginB20">
			  			请点击 开始配置 按钮
			  		</div>
			  		<div>
			  			<button class="btnF paddingLR20 paddingTB5 height28">配置帮助</button>
			  		</div>	
				</div>
			</div>
			<upgrade v-else></upgrade>
		</div>


		<div class="pf padding20 backgroundFFF help" :class='help?"help-a":""'>
			指令A：a <br>
			指令A：a <br>
			指令A：a <br>
			指令A：a <br>
			指令A：a <br>
			指令A：a <br>
			指令A：a <br>
			指令A：a <br>
			指令A：a <br>
			指令A：a <br>
			指令A：a <br>
		</div>
  	</div>
</template>

<script>
import parameter from './parameter'
import upgrade from './upgrade'
	export default {
	    data(){
			return {
				or:1,
				show:true,
				help:false,
				parameter:require('@/assets/img/parameter.png'),
			}
		},
		created(){
			
    	},
		computed: {
			
		},
		methods: {
			up(){
				if(this.or==1){
					this.show=true
				}
			},
			con(){
				if(this.or==2){
					this.show=false
				}
			}
		},
		watch: {
			
		},
		components: {
	      'parameter': parameter,'upgrade':upgrade
	    }
	}
</script>

<style scoped>
	.line-H30{
		line-height: 30px;
	}
	.height150{
		height:150px;
	}
	.send{
		text-align: right;
		overflow-y: hidden;
		margin-left: -40px;
		bottom: 20px;
	}
	.at-order{
		border:0px;
		border-bottom: 1px solid #d9d9d9
	}
	.help{
		right: 10px;top: 60px;
		box-shadow: -2px 2px 15px rgba(0,0,0,.2);
		transition: 0.5s;
		transform: translateX(150%);
	}
	.help-a{
		transform: translateX(0);
	}
	.img{
		width: 100px;height:100px;
	}
</style>
