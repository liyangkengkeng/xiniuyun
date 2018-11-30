<template>
  	<div class="">
  		<div class="flex jc-sb al-ce marginB20 center">
  			<p>Bee01-4G-S（4G透传型DTU）配置显示（多个）</p>
  			<p>
  				<button type="" class="btnColor paddingLR20 paddingTB5">恢复出厂设置</button>
  			</p>
  		</div>
  		<div class="flex">
  			<div class="device-box border">
  				<p class="color size20 currency marginB10"><label for=""><input type="radio" name="">通用设备配置</label></p>
  				<p class="paddingLR10 marginB10"><label for=""><input type="radio" name="">设备号：jkhdjksadjsa</label></p>
  				<p class="paddingLR10 marginB10"><label for=""><input type="radio" name="">设备号：jkhdjksadjsa</label></p>
  				<p class="paddingLR10 marginB10"><label for=""><input type="radio" name="">设备号：jkhdjksadjsa</label></p>
  				<p class="paddingLR10 marginB10"><label for=""><input type="radio" name="">设备号：jkhdjksadjsa</label></p>
  				<p class="paddingLR10 marginB10"><label for=""><input type="radio" name="">设备号：jkhdjksadjsa</label></p>
  				<p class="paddingLR10 marginB10"><label for=""><input type="radio" name="">设备号：jkhdjksadjsa</label></p>
  				<p class="paddingLR10 marginB10"><label for=""><input type="radio" name="">设备号：jkhdjksadjsa</label></p>
  				<p class="paddingLR10 marginB10"><label for=""><input type="radio" name="">设备号：jkhdjksadjsa</label></p>
  				<p class="paddingLR10 marginB10"><label for=""><input type="radio" name="">设备号：jkhdjksadjsa</label></p>
  			</div>
  			<div class="marginL40 width100">
  				<div class="pr min-height200">
  					<div class="color size20">
  						网络模式选择
  					</div>
  					<div >
  						<p class="marginT30 width150px"><label class=""><input type="radio" name="" value="1" v-model='network'>网络透传</label></p>
  						<p class="marginT30 width150px"><label class=""><input type="radio" name="" value="2" v-model='network'>西牛云模式</label></p>
  						<p class="marginT30 width150px"><label class=""><input type="radio" name="" value="3" v-model='network'>电信NB平台转发模式</label></p>
  					</div>
  					<div class="pa mode-frame border">
	  					<div class="padding20 pr backgroundFFF z-index3">
	  						<div>
	  							<div v-if='network==1 || network==2'>
	  								<div class="marginB10">
			  							<label class="marginR40"><input type="radio" name="" value="a" v-model='server'>链接服务器A</label>
			  							<label><input type="radio" name="" value="b" v-model='server'>链接服务器B</label>
			  						</div>
	  								<div class="marginB10">
		  								<span class='width120px'>地址和端口：</span><input class="width200px" type="text" v-model='port'>
		  							</div>
		  							<div class="marginB10 flex al-ce">
		  								<p class='width120px'>链接类型：</p>
		  								<select name="" id="" class="height38 width200px" v-model='link_type'>
		  									<option value="COAP">COAP</option>
		  									<option value="TCP">TCP</option>
		  									<option value="UDP">UDP</option>
		  								</select>
										<p v-if='link_type=="TCP"' class="marginL40">
											<label class="marginR20"><input type="radio" name="" value="1" v-model='length_link'>长链接</label>
											<label><input type="radio" name="" value="2" v-model='length_link'>短链接</label>
										</p>
		  							</div>
		  							<div>
		  								<span class='width120px'>超时时间（S）：</span><input class="width200px" type="text" v-model='date'>
		  							</div>
	  							</div>
	  							<div v-else class="center">
	  								电信模式
	  							</div>
	  						</div>
	  					</div>
  					</div>
  				</div>
  				<div class="marginT40 flex color bold">
  					<p class="marginR20">产品型号：xxxxxx</p>
  					<p class="marginR20">固件版本：V1.0.0</p>
  					<p class="marginR20">固件版本类型显示：定制版本</p>
  					<p class="marginR20">固件更新时间：2012.12.12 12:12:12</p>
  					<p class="marginR20">当前信号强度：5</p>
  				</div>
  				<div class="marginT40 pr heigh">
  					<div class="marginB20">
  						<span class="width60px color size20">设置参数配置</span>
  						<button type="" class="paddingLR10 paddingTB5" :class='sele=="parameter" ? "btnColor" : "btnF"' @click='sele="parameter"'>选择</button>
  					</div>
  					<div class="marginB20">
  						<span class="width60px color size20">注册包设置</span>
  						<button type="" class="paddingLR10 paddingTB5" :class='sele=="register" ? "btnColor" : "btnF"' @click='sele="register"'>选择</button>
  					</div>
  					<div class="marginB20" v-if='link_type=="TCP" && length_link=="1"'>
  						<span class="width60px color size20">心跳包</span>
  						<button type="" class="paddingLR10 paddingTB5" :class='sele=="heartbeat" ? "btnColor" : "btnF"' @click='sele="heartbeat"'>选择</button>
  					</div>
  					<div>
  						<span class="width60px color size20">高级设置</span>
  						<button type="" class="paddingLR10 paddingTB5" :class='sele=="senior" ? "btnColor" : "btnF"' @click='sele="senior"'>选择</button>
  					</div>

  					<!-- 参数设置 -->
  					<div class="pa set-up border height100 top1" v-if='sele=="parameter"'>
	  					<div class="padding20 pr backgroundFFF z-index3">
	  						<div class="marginB10">
	  							<span class='width100px'>串口波特率</span>
	  							<select name="" class="height38 width200px paddingLR20">
	  								<option value="">600</option>
	  								<option value="">1200</option>
	  								<option value="">2400</option>
	  								<option value="">4800</option>
	  								<option value="">14400</option>
	  								<option value="">19200</option>
	  								<option value="">38400</option>
	  								<option value="">57800</option>
	  								<option value="">115200</option>
	  								<option value="">230400</option>
	  								<option value="">256000</option>
	  								<option value="">460200</option>
	  								<option value="">921600</option>
	  							</select>
	  						</div>
	  						<div class="marginB10">
	  							<span class='width100px'>校验位</span>
	  							<select name="" class="height38 width200px paddingLR20">
	  								<option value="">无校验</option>
	  								<option value="">偶校验</option>
	  								<option value="">奇校验</option>
	  							</select>
	  						</div>
	  						<div class="marginB10">
	  							<span class='width100px'>数据位</span>
	  							<select name="" class="height38 width200px paddingLR20">
	  								<option value="5">5</option>
	  								<option value="6">6</option>
	  								<option value="7">7</option>
	  								<option value="8">8</option>
	  							</select>
	  						</div>
	  						<div class="marginB10">
	  							<span class='width100px'>停止位</span>
	  							<select name="" class="height38 width200px paddingLR20">
	  								<option value="0">没有</option>
	  								<option value="1">有</option>
	  							</select>
	  						</div>
	  						<div class="marginB10">
	  							<span class='width100px'>打包长度</span>
	  							<input type="" name="" class="width200px paddingLR20">
	  						</div>
	  					</div>
  					</div>
  					<!-- 注册包设置 -->
  					<div class="pa set-up border height100 top2" v-else-if='sele=="register"'>
	  					<div class="padding20 pr backgroundFFF z-index3">
	  						<div class="marginB10">
	  							<span class='width100px'>发送方式</span>
	  							<select name="" class="height38 width200px paddingLR20">
	  								<option value="">方式1</option>
	  								<option value="">方式2</option>
	  								<option value="">方式3</option>
	  							</select>
	  						</div>
	  						<div class="marginTB15">
	  							<span class='width100px'></span>
	  							<label class="marginR20"><input type="radio" name="" value="">数据携带</label>
	  							<label><input type="radio" name="" value="">链接发送</label>
	  						</div>
	  						<div class="marginB10">
	  							<span class='width100px'>数据类型</span>
	  							<select name="" class="height38 width200px paddingLR20" v-model='data_type'>
	  								<option value="1">IMEI</option>
	  								<option value="2">自定义数据</option>
	  							</select>
	  						</div>
	  						<div class="marginB10" v-if='data_type==1'>
	  							<span class='width100px'></span>
	  							<input type="" name="" placeholder="请输入IMEI" class="width200px">
	  						</div>
	  						<div class="marginB10 flex al-ce" v-else>
	  							<span class='width100px'></span>
	  							<div class="flex al-ce">
	  								<label class="marginR20"><input type="radio" name="" value="">HEX</label>
	  								<label class="marginR20"><input type="radio" name="" value="">ASIC</label>
	  								<input type="" name="" placeholder="请输入对应数据" maxlength="20">
	  							</div>
	  						</div>
	  					</div>
  					</div>
  					<!-- 心跳包设置 -->
  					<div class="pa set-up border height100 top3" v-else-if='sele=="heartbeat"'>
	  					<div class="padding20 pr backgroundFFF z-index3">
	  						<div class="marginB10">
	  							<span class='width100px'>心跳时间</span>
	  							<input type="" name="" placeholder="输入30s-120s之间的正整数" class="width200px">
	  						</div>
	  					</div>
  					</div>
  					<!-- 高级设置 -->
  					<div class="pa set-up border height100" :class='(link_type=="TCP" && length_link=="1") ? "top4" : "top3"' v-else-if='sele=="senior"'>
	  					<div class="padding20 pr backgroundFFF z-index3">
	  						<div class="marginB10 flex al-ce">
	  							<span class='width100px'>指定回显</span>
	  							<div class="flex al-ce">
	  								<label class="marginR20"><input type="radio" name="" value="1">是</label>
	  								<label class="marginR20"><input type="radio" name="" value="2">否</label>
	  							</div>
	  						</div>
	  						<div class="marginB10 flex al-ce">
	  							<span class='width100px'>类RFC2217</span>
	  							<div class="flex al-ce">
	  								<label class="marginR20"><input type="radio" name="" value="1">是</label>
	  								<label class="marginR20"><input type="radio" name="" value="2">否</label>
	  							</div>
	  						</div>
	  						<div class="marginB10">
	  							<span class='width100px'>命令密码</span>
	  							<input type="" name="" placeholder="" class="width200px">
	  						</div>
	  						<div class="marginB10">
	  							<span class='width100px'>自定义通道</span>
	  							<select name="" class="height38 width200px paddingLR20">
	  								<option value="">11111</option>
	  								<option value="">22222</option>
	  								<option value="">333333</option>
	  							</select>
	  						</div>
	  					</div>
  					</div>
  					<!-- <div class="pa set-up border height100"
						:class="[sele=='parameter' ? 'top1' : '' , sele=='register' ? 'top2' : '', sele=='heartbeat' ? 'top3' : '', sele=='senior' ? 'top4' : '']">
	  					<div class="padding20 pr backgroundFFF z-index3">
	  						dasdsad	<br>
	  						dasdsad	<br>		
	  						dasdsad	<br>	
	  						dasdsad	<br>	
	  						dasdsad	<br>	
	  						dasdsad	<br>
	  					</div>
  					</div> -->
  				</div>
  			</div>
  		</div>
  	</div>
</template>

<script>
	export default {
	    data(){
			return {
				sele:'parameter',
				server:'a',//服务器类型
				port:'122221',//端口
				link_type:'COAP',//链接类型
				length_link:'',//长、短链接
				network:'1',//网络模式
				date:'',//超时时间

				data_type:'1',//数据类型
			}
		},
		created(){
			
    	},
		computed: {
			
		},
		methods: {
			
		},
		watch: {
			server(val){
				if(val=='a')
					this.port='122221'
				else
					this.port='4d5sa5d'
			},
			network(val){
				this.server='a'
				this.port='122221'
				this.link_type='COAP'
				this.length_link=''
				this.date=''
			}
		},
		
	}
</script>

<style scoped>
	.device-box{
		padding:10px 15px;
		width: 30%;
	}
	.currency{
		border-bottom: 1px solid #d9d9d9;
		padding-bottom: 10px;
	}
	.mode-frame,.set-up{
		left: 250px;top: 0px;
	}
	.min-height200{
		min-height: 200px;
	}
	.mode-frame{
		min-width: 360px;
		min-height:200px;
	}
	.mode-frame::before,.set-up::before{
		content:'';
		display: block;
		position: absolute;
		left: -10px;
		transform: translateY(-50%) rotate(-45deg);
		width: 20px;
		height:20px;
		border-top:1px solid #d9d9d9;
		border-left:1px solid #d9d9d9;
		z-index: 2;
		background:#fff;
	}
	.mode-frame::before{
		top: 50%;
	}
	.z-index3{
		z-index: 3
	}
	.width60px{
		display: inline-block;width:150px;
	}
	.width120px,.width100px{
		display: inline-block;
	}
	.paddingTB5{
		padding-top: 5px;padding-bottom: 5px;
	}
	.btnColor{
		border:1px solid #11A9A4;
	}
	.heigh{
		min-height: 300px;
	}
	.set-up.top1::before{
		top: 15px;
	}
	.set-up.top2::before{
		top: 65px;
	}
	.set-up.top3::before{
		top: 115px;
	}
	.set-up.top4::before{
		top: 165px;
	}
</style>
