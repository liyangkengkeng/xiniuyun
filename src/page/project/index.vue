<template>
	<div v-if='renovate'>
		<div class="personal backgroundF8 pr color30">
	  		<head-top :show='false'></head-top>
	  		<div class="com colorF6 pf">
				<div class="flex jc-ce al-ce head backgroundImage" :style='{backgroundImage: head}'>
					<!-- <img :src="head" alt="" class="head border-r5 marginR10"> -->
					<!-- <span>企业开发者</span> -->
				</div>
				<div v-for='(val,index) in list' :key='index' class="pr">
					<router-link :to='val.path'>
						<div class='paddingTB15 colorF6 flex father-nav cp' @click='father(index)'>
			  				<div class="icon-img pr">
			  					<p class="marginR10 pa icon-box backgroundImage">
			  						<img :src="val.meta.icon_hover" alt="" v-if='val.path.indexOf(title_url)>-1'>
			  						<img :src="val.meta.icon" alt="" v-else>
			  					</p>
			  				</div>
			  				<div>{{$t(val.meta.title)}}</div>
						</div>
					</router-link>
					<div class="classify" >
						<template v-for='(item,key) in val.children'>
							<router-link :to='item.path' class='paddingTB10 colorFFF pr' :class="{current:item.path.indexOf(url)>-1}">
								<p>{{$t(item.meta.title)}}</p>
							</router-link>
						</template>
					</div>
				</div>
				<p class="index center width100 pa size12 cp">
					<router-link to='/myProduct' class='colorFFF flex al-ce jc-ce retu'>
						<img class="re-icon" :src="re"  alt="">
						<span class="pa tishi">{{$t('navbar.a38')}}</span> &emsp;
						<span class="size18 bold">{{$t('navbar.Return')}}</span>
					</router-link>
				</p>
	  		</div>
	  		<div>
	  			<div class="width80">
					<div class="flex projectData-header jc-sb">
						<div class="flex size18 al-ce">
							<p>
								<!-- <span class="btnColor width120px height30 marginR20 size16 development-state">项目信息</span> -->
								<template v-for='(item,key) in list'>
									<span class='borderB3 paddingB5 size24 bold marginR40' v-if="item.path.indexOf(title_url)>-1">
										<p>{{$t(item.meta.title)}}</p>
									</span>
								</template>
							</p>
							<!-- <p class="marginLR20">项目经理：某某</p> -->
							<p v-if='show && project_switch'>
								<select name="" class="paddingLR20 project_select" v-model='project_id' @change='change'>
									<option v-for="(item,index) in project_list"  :value="item.id">{{ item.name }}</option>
								</select>
							</p>
						</div>
					</div>
				</div>
				<!-- <div class="paddingLR20">
					<template v-for='(val,key) in crumbs' >
				    	<router-link class='color54' v-if='key<crumbs.length-1' :to='val.path' ><span v-if='key!==0 && key!=1'>/</span>&nbsp;<span v-if='key!=0'>{{val.meta.title}}</span> &nbsp;</router-link>
				    	<span v-else-if='val.meta.title'>/&nbsp; {{val.meta.title}} </span>
				    </template>
				</div> -->
				<div class='projectData-box'>
					<router-view></router-view>
				</div>
				
	  		</div>
	  	</div>
		<bottom></bottom>
	</div>
  	
</template>

<script>
import headTop from '@/components/headTop'
import footers from '@/components/footer'
import bottom from '@/components/bottom'
	export default {
	    data(){
			return {
				logo:require('@/assets/img/logo.png'),
				re:require('@/assets/img/return-icon.png'),
				isEndit:false,
				url:'',
				head:'url('+require('@/assets/img/product-icon1.png')+')',
				list:[],
				project_list:[],//所有项目列表
				project_id:'',//当前项目id
				project_id_change:'',
				crumbs:'',
				title_url:'',
				show:true,
				project_switch:true,
				project_switch_arr:[],
				renovate:true,
			}
		},
		created(){
			if(localStorage.getItem('project_switch')=='true')
				this.project_switch=true
			else
				this.project_switch=false
			this.project_switch_arr=[]
			this.crumbs=this.$route.matched
			var arr=this.$router.options.routes
			for(var i=0;i<arr.length;i++){
				if(arr[i].path==="/project"){
					this.list=arr[i].children
					for(let x=0;x<arr[i].children.length;x++){
						for(let y=0;y<arr[i].children[x].children.length;y++){
							this.project_switch_arr.push(arr[i].children[x].children[y].path)
						}
					}
				}
			}
			this.url=this.$route.path
			this.title_url=this.$route.path.split('/')[2]
			
			if(this.$route.query.id){
				localStorage.projectID=this.$route.query.id
			}

			this.project_id=this.project_id_change=localStorage.getItem('projectID')
			this.$store.commit('PROJECTID',localStorage.getItem('projectID'))
			this.$store.commit('IS_DEVICELIST',0)
			// this.projectList() //获取项目列表
			this.scope_token(this.project_id)
    	},
		methods: {
			father(index){
				for(var j=0;j<this.list.length;j++){
					this.list[j].father_select=false
				}
				var _dom=this.list[index]
				_dom.father_select=true
				var arr=this.list.splice(index,1,_dom)
			},
			projectList(){ //获取项目列表
				var self=this
				this.ajax({
					scope_token:localStorage.getItem('scope_token'),
					url:'v1/users/'+localStorage.getItem('userId')+'/projects/',
					mode:'GET',
					data:{},
					success(res){
						self.project_list=res.data.data
					}
				})
			},
			
			scope_token(val){//更新token
				var self=this
				this.ajax({
					resource:true,
					url:'v1/oauth2/tokens/',
					mode:'POST',
					data:{ 
					    grant_type: "upgrade_scope", 
					    access_token: localStorage.getItem('token'), 
					    scope: {
					        "project_id": val
					    }
					},
					success(res){
					    localStorage.scope_token=res.data.data.access_token;
					    self.$store.commit('ACCESS_TOKEN',res.data.data.access_token)
					    self.$store.commit('PROJECTID',val)
					    self.producer_list()
					    self.projectList()
					    self.deviceList()
					    self.trigger()
					    self.$store.commit('PROJECTID',val)
					}
				})
			},
			producer_list(){//产品列表
				var self=this
				this.ajax({
					scope_token:localStorage.getItem('access_token'),
					url:'v1/models/associate/project/'+localStorage.getItem('projectID'),
					mode:'GET',
					data:{},
					success(res){
						for(var i=0;i<res.data.data.length;i++){
							if(res.data.data[i]){
								res.data.data[i].createTime=self.$time_stamp(res.data.data[i].createTime)
								res.data.data[i].publicDate=self.$time_stamp(res.data.data[i].publicDate)
							}
						}
						// self.$store.state.project_product_list=res.data.data
						self.$store.commit('PROJECT_PRODUCT_LIST',res.data.data)
					}
				})
			},
			deviceList(productID=''){//设备列表
				var self=this
				self.ajax({
					scope_token:localStorage.getItem('scope_token'),
					mode:'get',
					url:productID?'v1/devices/?model_id='+self.productID:'v1/devices/',
					data:{},
					success(res){
						for(let i=0;i<res.data.data.length;i++){
							if(res.data.data[i]){
								res.data.data[i].create_at=self.$time_stamp(res.data.data[i].create_at)
								res.data.data[i].update_at=self.$time_stamp(res.data.data[i].update_at)
							}
						}
						self.$store.commit('PROJECT_DEVICE_LIST',res.data.data)
					}
				})
			},
			trigger(){//规则列表
				var self=this
				self.ruleList=[]
				this.ajax({
					scope_token:localStorage.getItem('scope_token'),
					url:'v1/rules/trigger/',
					mode:'GET',
					data:{},
					success(res){
						// self.$store.state.trigger_list=res.data.data
						self.$store.commit('TRIGGER_LIST',res.data.data)
					}
				})
			},
			change(event){
				var self=this
				this.$prompt.center(self.$t('navbar.Do_you_want_to_switch_projects'),{
		        	hid(){},
		        	confirm(){
		        		self.project_id_change=self.project_id=event.target.value
		        		localStorage.projectID=event.target.value
		        		this.hid()
		        		self.scope_token(event.target.value)//更新token
		        	},
		        	cancel(){
		        		self.project_id=self.project_id_change
		        		this.hid()
		        	},
		        });
			}
		},
		watch: {
			$route(val){
				this.project_switch=false
				for(let i=0;i<this.project_switch_arr.length;i++){
					if(this.project_switch_arr[i]==val.path){
						this.project_switch=true
					}
				}
				localStorage.project_switch=this.project_switch
				var arr=val.path.split('/')
				if(arr.length<6)
					this.show=true
				else
					this.show=false
				arr.length=4
				this.url=arr.join('/')
				this.crumbs=this.$route.matched
				this.title_url=arr[2]
			},
			project_id(val){
				for(let i=0;i<this.project_list.length;i++){
					if(this.project_list[i].id==val){
						this.project_list[i].image_name = this.project_list[i].image_name || 1
						this.head='url('+require('@/assets/img/product-icon'+this.project_list[i].image_name+'.png')+')'
					}
				}
			},
			projectData:{
				handler(val){
					if(val.image_name)
						this.head='url('+require('@/assets/img/product-icon'+(Number(val.image_name))+'.png')+')' 
				},
				deep: true
			},
			language(val){
				var self=this
				this.renovate=false
				this.$nextTick(function(){
					self.renovate=true
				})
				this.scope_token(this.project_id)
			}
		},
		computed:{
			projectData(){
				// this.head='url('+require('@/assets/img/product-icon'+(this.$store.getters.project_data.image_name+1)+'.png')+')'
				return this.$store.getters.project_data
			},
			language(){
    			return this.$i18n.locale
    		}
		},
		components: {
    		headTop,footers,bottom
    	},
	}
</script>

<style scoped>
	.personal{
		width: 100vw;
	}
	.personal-header{
		height: 50px;
		left: 0px;
		top: 0px;
		z-index: 3
	}
	.com{
		background:#373737;
		width: 235px;
		left:0px;
		top: 0px;
		padding-top: 50px;
		height: 100%;
		z-index: 2
	}
	.head{
		width:68px;
		height: 68px;
		margin:20px auto 10px;
	}
	.father-nav{
		padding-left: 75px;text-align: left
	}
	.classify a{
		padding-left: 75px;
		display: block;text-align: left
	}
	.icon-img{
		flex-shrink: 0;
		text-align: -webkit-right;
	}
	.icon-img p{
		width: 20px;height: 20px;
		overflow: hidden;
	}
	.icon-img img{
		width: 60px;height: 100%;border-right: 20px solid transparent;border-left: 20px solid transparent;margin-left: -20px;
	}
	.icon-img .iconTouch{
		-webkit-filter:drop-shadow(-20px 0 rgb(255, 255, 255));
        filter:drop-shadow(-20px 0 rgb(255, 255, 255));
		margin-left: 0px;
	}
	.header_common{
		box-shadow: 0px 2px 5px rgba(0,0,0,.2);
		padding: 10px 20px;
		height: 100px;
	}
	.header_common_logo{
		/*color: #fff;*/
		font-size: 26px;
	}
	.header_common_logo img{
		height: 40px;
		margin-right: 10px;
		display: block;
	}
	.header_common_member_type{
		height: 40px;
		padding: 0px 10px;
		line-height: 40px;
		background:#ccc;
		margin-right: 15px;
	}
	.header_common_name{
		height: 40px;
		padding: 0px 10px 40px;
		line-height: 40px;
		background: #e7e7e7;
	}
	.header_common_nav{
		top: 50px;
		left: 0px;
		width: 100%;
		background: #e1e1e1;
		padding: 10px;
		z-index: 999
	}
	.header_common_nav::after{
		content:'';
		border:10px solid transparent;
		border-bottom-color: #e1e1e1;
		position: absolute;
		top:-20px;
		left: 50%;
		transform: translateX(-50%);
	}

	.current{
		background:#11A9A4;
	}
	.current::after{
		content:'';
		position: absolute;
		border:10px solid transparent;
		border-right: 10px solid #f8f8f8;
		right: 0px;
		top: 20px;
		transform: translateY(-50%);
	}


	.projectData-header,.projectData-box{
		min-width: 965px;
		padding:20px 0px;
	}

	.projectData-header .btnf{
		width: 120px;
	}

	.projectData-header select{
		/*width: 120px;*/
		height: 48px;
	    width: 250px;
	}
	.icon-box{
		right: 0px;
	}
	.index{
		left: 0px;bottom:30px;
	}
	.index a{
		/*border-bottom: 1px solid #9d9d9d*/
	}
	.re-icon{
		width: 30px;height: 30px;
	}
	.tishi{
		display: none;
		left:50%;top: -20px;
		transform: translateX(-50%);
		color:#d9d9d9;
		width: 200px
	}
	.retu:hover .tishi{
		display: block;
	}
</style>
