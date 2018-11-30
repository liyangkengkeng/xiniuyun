<template>
		<div class="invite-user1 backgroundFFF border border-r5 color30 bold size18">
			<!-- 团队内部选中用户 -->
			<div v-if='invite_mode'>
				<div class="center marginB20">
					邀请同事担任项目经理
				</div>
				<div class="flex fw-wrap user-list">
					<label class="marginB20 flex al-ce "><input type="checkbox" name="" value="1"><span>某某1</span></label>
					<label class="marginB20 flex al-ce "><input type="checkbox" name="" value="2"><span>某某2</span></label>
					<label class="marginB20 flex al-ce "><input type="checkbox" name="" value="3"><span>某某3</span></label>
					<label class="marginB20 flex al-ce "><input type="checkbox" name="" value="4"><span>某某4</span></label>
					<label class="marginB20 flex al-ce "><input type="checkbox" name="" value="5"><span>某某5</span></label>
					<label class="marginB20 flex al-ce "><input type="checkbox" name="" value="6"><span>某某6</span></label>
					<label class="marginB20 flex al-ce "><input type="checkbox" name="" value="7"><span>某某7</span></label>
					<label class="marginB20 flex al-ce "><input type="checkbox" name="" value="8"><span>某某8</span></label>
					<label class="marginB20 flex al-ce "><input type="checkbox" name="" value="9"><span>某某9</span></label>
					<label class="marginB20 flex al-ce "><input type="checkbox" name="" value="10"><span>某某10</span></label>
					<label class="marginB20 flex al-ce "><input type="checkbox" name="" value="11"><span>某某11</span></label>
					<label class="marginB20 flex al-ce "><input type="checkbox" name="" value="12"><span>某某12</span></label>
					<label class="marginB20 flex al-ce "><input type="checkbox" name="" value="13"><span>某某13</span></label>
					<label class="marginB20 flex al-ce "><input type="checkbox" name="" value="14"><span>某某14</span></label>
				</div>
				<div class="size16 flex jc-sb invite-btn">
					<span class="cp" @click='invite_mode=false'>从团队外邀请</span>
					<button type="" class="btn">邀请</button>					
				</div>
			</div>
			<!-- 团队外邀请 -->
			<div v-else>
				<div class="choice-power flex jc-sb al-ce">
					<p class="size14 cp" @click='invite_mode=true'>&lt;从团队内选择</p>
					<p>邀请同事担任项目经理</p>
					<p><img :src="close_icon" alt=""></p>
				</div>
				<div v-if='links'>
					<div class="center links">
						选择邀请人权限，点击生成链接
					</div>
					<div class="flex production">
						<div class="width100 marginR20">
							<p><input type="" name="" class="width100" disabled="true" v-model='power' @focus='whether_power=true'></p>
							<div v-show='whether_power'>
								<p class="cp flex jc-sb marginB10" @click='select_power("项目经理")'><span class="size14">项目经理</span><span class="size14 color86">创建项目|选择产品|发布项目|修改项目</span></p>
								<p class="cp flex jc-sb marginB10" @click='select_power("围观群众")'><span class="size14">围观群众</span><span class="size14 color86">查看产品全线，参考项目全线</span></p>
							</div>
							
						</div>
						<div><button class="btn generate" @click='generate'>生产链接</button></div>
					</div>
				</div>
				<div v-else>
					<div class="color16">将链接发给小伙伴</div>
					<div class="flex marginTB20">
						<input type="" name="" disabled="true" class="width100 marginR20">
						<button type="" class="btn generate size16" disabled="true">生成链接</button>
					</div>
					<div class="colorCC size16">有限期7天</div>
				</div>
			</div>
		</div>
</template>

<script>
	export default {
		name:'inviteUser',
	    data(){
			return {
				close_icon:require('@/assets/img/close-icon.png'),
				power:'',//输入框
				invite_mode:true,//邀请方式
				whether_power:false,//生成链接
				links:true,
			}
		},
		methods: {
			select_power(text){//选择权限
				this.power=text
				 this.whether_power=false
			},
			generate(){//生成链接
				this.links=false
			},
			son(){//组件是否隐藏
				this.$emit("sonProject",false); 
			},
		},
		watch:{
			
		}
	}
</script>

<style scoped>
	.invite-user1{
		width: 600px;
		height: 408px;
		padding: 40px 2%;
	}
	.user-list label{
		width: 33%
	}
	.user-list label span{
		display: inline-block;
		width: 70px;
	}
	.user-list label:nth-child(3n+2){
		justify-content: center;
	}
	.user-list label:nth-child(3n){
		justify-content: flex-end;
	}
	.invite-btn{
		margin-top: 30px;
	}
	.invite-btn button{
		width: 90px;
	}
	.choice-power,.links{
		margin-bottom: 54px;
	}
	.choice-power img{
		width: 13px;height: 13px;
	}
	.production{
		font-weight: initial
	}
	.production input{
		height: 48px;
	}
	.production span{
		display: inline-block;
	}
	.btn.generate{
		width: 120px;height: 48px;line-height: 48px;flex-shrink: 0;
	}
</style>
