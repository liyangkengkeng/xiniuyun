<template>
  	<div class="invite flex al-ce jc-ce">
  		<div class="backgroundFFF invite-content center">
  			<p><img :src="img" alt=""> </p>
  			<p class="size16">Hi~{{name}}{{$t('and_create_projects')}}</p>
  			<p><button type="" class="btnColor width200px height48" @click='add'>{{$t('Join_the_team')}}</button></p>
  			<p class="size12 color86">{{$t('Internet_of_All_Things')}}始</p>
  		</div>
  	</div>
</template>

<script>
	export default {
	    data(){
			return {
				img:require('@/assets/img/project building.png'),
				name:'',
				url:'',
			}
		},
		created(){
			this.url=ALLURL
			var self=this
			var substr = window.location.href.split('?')[1].match(/users%2F(\S*)%2Fcode/)[1];
			this.ajax({
				mode:'GET',
			    url:'v1/users/'+substr+'/',
			    data:{},
			    success(res){
			    	self.name=res.data.data.name
			    }
			})
		},
		methods: {
			add(){
				var self=this
				var par=window.location.href.split('?')[1]
				var str=par.replace(/%2F/g,"/");
				str=self.url+str.replace(/%3A/g,":");
				localStorage.invite=str
				if(localStorage.getItem('token')){
					this.axios.post(str, {},{
						headers:{
							'Authorization': "Bearer " + localStorage.getItem('token'),
	            			'Content-Type': 'application/json'
						}
					}).then(function (response) {
					　　self.$router.push('/myProduct')
					}).catch(function (error) {
						if (error.response) {
				            self.$fail.center(error.response.data.message)
				        } else if (error.request) {
				            console.log(error.request);
				        }else if(error.config){
				            self.$fail.center(error.config.data.message)
				        } else {
				            self.$fail.center(error.message)
				        }
					});
				}else{
					this.$router.push({path:'/register',query:{invite:true}});
				}
				
			},
		},
	}
</script>

<style scoped>
	.invite{
		width: 100vw;height: 100vh;
		position: fixed;left: 0px;top: 0px;
		background: #000;
	}
	.invite-content{
		padding: 45px 40px 14px;
	}
	.invite-content img{
		width: 592px;height: 120px;margin-bottom: 70px;
	}
	.invite-content .btnColor{
		margin: 55px 0px 60px;
	}
</style>
