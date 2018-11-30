<template>
    <div id="app" class="fillcontain" >
		    <router-view></router-view>
		    <!-- <aside  class="consult">
				<div class="consult-btn flex">
					<button type="" class="" @click='consult_show=!consult_show'><img class="consult-icon" :src="consult" alt="">咨询建议</button>
				</div>
				<div class='consult-frame ' v-if='consult_show'>
					<div class='consult-step-box' v-show='step==0'>
						<div class="consult-content">
							<div class="consult-support">
								<p>技术支持</p>
								<p>业务支持</p>
							</div>
						</div>
						<div class="consult-step">
							<p class="consult-front"></p>
							<p class="consult-next-step"><button type="" @click='stepC(1)'>下一步</button></p>
						</div>
					</div>
					<div class='consult-feedback  consult-step-box' v-show='step==1'>
						<div class="consult-file-box consult-content">
							<textarea name="" placeholder="填写反馈内容（2-200以内）" minlength="2" maxlength="200"></textarea>
							<input type="file" name="" id="consult-file">
							<p><img :src="file" alt=""></p>
						</div>
						<div class="consult-step">
							<p class="consult-front" @click='stepC(0)'><span>→</span>返回</p>
							<p class="consult-next-step"><button type="" @click='stepC(2)'>下一步</button></p>
						</div>
					</div>
					<div class=" consult-step-box" v-show='step==2'>
						<div class="consult-content consult-contact">
							<p>您的邮箱地址</p>
							<p class="consult-mailbox"><input type="text" placeholder="您的邮箱地址"> </p>
							<p>您的邮箱地址</p>
							<p class="consult-name"><input type="text" placeholder="名"><input type="text" placeholder="姓"></p>
						</div>
						
						<div class="consult-step">
							<p class="consult-front" @click='stepC(1)'><span>→</span>返回</p>
							<p class="consult-next-step"><button type="" @click='stepC(3)'>下一步</button></p>
						</div>
					</div>
					<div class=" consult-step-box" v-show='step==3'>
						<div class="consult-content consult-success">
							<img :src="success" alt="">
							<p>提交成功！</p>
						</div>
						<div class="consult-step">
							<p class="consult-front" @click='stepC(2)'><span>→</span>返回</p>
							<p class="consult-next-step"></p>
						</div>
					</div>
				</div>
			</aside> -->
    </div>
</template>

<script>
    export default {
    	data(){
			return {
				renovate:true,
			}
		},
		methods: {
			
		},
		created(){
			
    	},
    	computed:{
			language(){
    			return this.$i18n.locale
    		}
		},
		watch:{
			language(val){
				this.renovate=false
				this.$nextTick(()=>{
					this.renovate=true
				})
			}
		}
    }
</script>

<style scoped>
	#app{
		/*padding-bottom: 120px;*/
	}
</style>
