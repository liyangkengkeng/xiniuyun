<template>
	<div class="scroll flex jc-ce">
		<div class='found-product-box'>
	  		<!-- <div class="center size20 bold color30">
	  			创建产品
	  		</div> -->
	  		<div class="flex marginB50 al-ce">
  				<p class="found-product-field color99 "></p>
  				<p class="text center size20 bold color30">{{$t('navbar.Create_product')}}</p>
  			</div>
  			<div class="flex marginTB20 al-ce">
  				<p class="found-product-field color99 must">{{$t('navbar.Product_name')}}</p>
  				<p class="text"><input type="" name="" class="border" maxlength="20":placeholder="$t('navbar.Please_enter_product_name_in_less_than_40_characters')" v-model='name'></p>
  			</div>
  			<div class="flex marginTB20">
  				<p class="color99  found-product-field must">{{$t('navbar.Product_description')}}</p>
  				<p class="text"><textarea name="" :placeholder="$t('navbar.Product_description_information')" v-model='description' class=" border"></textarea></p>
  			</div>
  			<div class="flex marginTB20 al-ce">
  				<p class="color99  found-product-field must">{{$t('navbar.Industry_Types')}}</p>
  				<p class="flex jc-sb width100 ">
  					<select v-model="UnitSelected" class="border color86">
  						<option value="" class="colorCC" checked disabled>{{$t('navbar.Select_Product_Type')}}</option>
				        <option v-for="item in clasify" :value="item.key">{{item.val}}</option>
				    </select>
  					<!-- <select v-model="UnitSelected" class="border color86">
  						<option value="" class="colorCC" checked disabled>{{$t('navbar.Select_Product_Type')}}</option>
				        <option v-for="item in UnitList" :value="item.id">{{item.name}}</option>
				    </select>
				    <select v-model="DepartmentSelected" class="marginLR20 border color86">
				    	<option value="" class="colorCC" checked disabled>{{$t('navbar.Please_select')}}</option>
				        <option v-for="item in DepartmentList" :value="item.id">{{item.name}}</option>
				    </select>
				    <select v-model="UserSelected" class="border color86">
				    	<option value="" class="colorCC" checked disabled>{{$t('navbar.Please_select')}}</option>
				        <option v-for="item in UserList" :value="item.id">{{item.name}}</option>
				    </select> -->
  				</p>
  			</div>
  			<div class="flex marginTB20 al-ce">
  				<p class="color99  found-product-field must ">{{$t('navbar.Access_Method')}}</p>
  				<p class="text height100">
  					<select name="" v-model='protocol' class="border color86">
  						<option value="" class="colorCC" checked disabled>{{$t('navbar.Select_Access_Protocol')}}</option>
  						<option value="http">HTTP</option>
  						<option value="tcp">TCP</option>
  					</select>
  				</p>
  			</div>
  			<!-- <div class="flex marginTB20">
  				<div class="color99  found-product-field">选择产品图标</div>
  				<div class="border icon-box flex">
  					<div v-for='index in 40' class="border icon margin5 center border-r5 pr" @click='icon_state(icon[index],index)'>
  						<p v-if='icon[index]'><img :src="icon[index].url" alt="" class='cp' ></p>
  						<div class="pa width100 height100 flex jc-ce al-ce status" v-show='icon[index] && icon[index].choice'>
  							<img :src="tick" alt="">
  						</div>
  					</div>
  				</div>
  			</div> -->
  			<div class="marginTB20 operate center flex">
  				<div class="found-product-field">
  					
  				</div>
  				<div class="width100 flex jc-sa marginT70">
  					<button class='btnColor width120px height38 marginR40' @click='son'>{{$t('navbar.Return')}}</button>
  					<button class="btnColor width120px height38" @click='found'>{{$t('navbar.Next_step')}}</button>
  				</div>
  				
  			</div>
  		</div>
	</div>
</template>

<script>
	var UnitRows = [
	    {name:"家用电器",id:"1"},
	    {name:"办公设备",id:"2"},
	];
	var DepartmentRows = [
	    {name:"大家电",id:"1",pid:"1"},
	    {name:"生活电器",id:"2",pid:"1"},

	    {name:"外设产品",id:"3",pid:"2"},
	    {name:"网络产品",id:"4",pid:"2"}
	];
	var UserRows = [
	    {name:"平板电视",id:"1",pid:"1"},
	    {name:"空调",id:"2",pid:"1"},

	    {name:"取暖电器",id:"3",pid:"2"},
	    {name:"净化器",id:"4",pid:"2"},

	    {name:"手写板",id:"5",pid:"3"},
	    {name:"游戏设备",id:"6",pid:"3"},

	    {name:"路由器",id:"7",pid:"4"},
	    {name:"网卡",id:"8",pid:"4"}
	]
	export default {
		name:'',
		props:{
			productDateils:{
				type: Object,
				default() {
				    return {}
				}
			},
			product:{
				type: Object,
				default() {
				    return {}
				}
			}
		},
	    data(){
			return {
				tick:require('@/assets/img/tick.png'),
				developer:"url("+require('@/assets/img/developer.png')+")",
				developer1:require('@/assets/img/developer1.png'),
				developer2:require('@/assets/img/developer2.png'),
				name:'',
				description:'',
				protocol:'',
				
				clasify:[],
				/*三级联动*/
				UnitSelected:"",
		        UnitList:[],
		        DepartmentSelected:"",
		        DepartmentList:[],
		        UserSelected:"",
		        UserList:[]
			}
		},
		created(){
			this.clasify=[{val:this.$t('navbar.a14'),key:'a1'},
							{val:this.$t('navbar.a15'),key:'a2'},
							{val:this.$t('navbar.a16'),key:'a3'},
							{val:this.$t('navbar.a17'),key:'a4'},
							{val:this.$t('navbar.a18'),key:'a5'},
							{val:this.$t('navbar.a19'),key:'a6'},

							{val:this.$t('navbar.a20'),key:'a7'},
							{val:this.$t('navbar.a21'),key:'a8'},
							{val:this.$t('navbar.a22'),key:'a9'},
							{val:this.$t('navbar.a23'),key:'a10'},
							{val:this.$t('navbar.a24'),key:'a11'},

							{val:this.$t('navbar.a25'),key:'a12'},
							{val:this.$t('navbar.a26'),key:'a13'},
							{val:this.$t('navbar.a27'),key:'a14'},
							{val:this.$t('navbar.a28'),key:'a15'},
							{val:this.$t('navbar.a29'),key:'a16'},

							{val:this.$t('navbar.a30'),key:'a17'},
							{val:this.$t('navbar.a31'),key:'a18'},
							{val:this.$t('navbar.a32'),key:'a19'},
							{val:this.$t('navbar.a33'),key:'a20'}
						]
			if(this.productDateils.name){
				this.name=this.productDateils.name
				this.description=this.productDateils.description
				this.protocol=this.productDateils.protocol
				this.UnitSelected=this.productDateils.proCategory
				// var arr=this.productDateils.proCategory.split(';')

				// for(let i=0;i<UnitRows.length;i++){
				// 	if(UnitRows[i].name==arr[0]){
				// 		this.UnitSelected=UnitRows[i].id
				// 	}
				// }
				// for(let i=0;i<DepartmentRows.length;i++){
				// 	if(DepartmentRows[i].name==arr[1]){
				// 		this.DepartmentSelected=DepartmentRows[i].id
				// 	}
				// }
				// for(let i=0;i<UserRows.length;i++){
				// 	if(UserRows[i].name==arr[2]){
				// 		this.UserSelected=UserRows[i].id
				// 	}
				// }
			}
			
			if(this.product.name){
				this.name=this.product.name
				this.description=this.product.description
				this.protocol=this.product.protocol
				this.UnitSelected=this.product.proCategory
				// var arr=this.product.proCategory.split(';')
				// for(let i=0;i<UnitRows.length;i++){
				// 	if(UnitRows[i].name==arr[0]){
				// 		this.UnitSelected=UnitRows[i].id
				// 	}
				// }
				// for(let i=0;i<DepartmentRows.length;i++){
				// 	if(DepartmentRows[i].name==arr[1]){
				// 		this.DepartmentSelected=DepartmentRows[i].id
				// 	}
				// }
				// for(let i=0;i<UserRows.length;i++){
				// 	if(UserRows[i].name==arr[2]){
				// 		this.UserSelected=UserRows[i].id
				// 	}
				// }
			}

			// 三级联动
			this.UnitList = UnitRows;
	        // this.UnitSelected = this.UnitList.length>0 ? this.UnitList[0].id : "";

	        var val = this.UnitSelected;
	        this.DepartmentList = DepartmentRows.filter(function (x) { return x.pid == val });
	        // this.DepartmentSelected = this.DepartmentList.length>0 ? this.DepartmentList[0].id : "";

	        val = this.DepartmentSelected;
	        this.UserList = UserRows.filter(function (x){ return x.pid == val});
	        // this.UserSelected = this.UserList.length>0 ? this.UserList[0].id : "";
		},
		methods: {
			found(){//下一步
				// for(var a1=0;a1<UnitRows.length;a1++){
				// 	if(UnitRows[a1].id===this.UnitSelected){
				// 		this.UnitSelected=UnitRows[a1].name   //一级目录
				// 	}
				// }
				// for(var a2=0;a2<DepartmentRows.length;a2++){
				// 	if(DepartmentRows[a2].id===this.DepartmentSelected){
				// 		this.DepartmentSelected=DepartmentRows[a2].name   //2级目录
				// 	}
				// }
				// for(var a3=0;a3<UserRows.length;a3++){
				// 	if(UserRows[a3].id===this.UserSelected){
				// 		this.UserSelected=UserRows[a3].name   //3级目录
				// 	}
				// }
				var self=this
				if(self.name && self.description && self.protocol && self.UnitSelected){
					var obj={
						name:self.name,
						description:self.description,
						protocol:self.protocol,
						proCategory:self.UnitSelected
					}
					self.$emit('product_data',obj)
				}else{
					self.$violate.center(self.$t('navbar.Please_fill_the_form'))
				}
				
			},
			son(){//组件是否隐藏
				var self=this
				this.$prompt.center(self.$t('navbar.Give_up_current_editing_and_go_to_homepage'),{
		        	hid(){},
		        	confirm(){
		        		self.$router.back()
		        		this.hid()
		        	},
		        	cancel(){this.hid()},
		        });
			},
			icon_state(val,index){
				if(index<this.icon.length){
					for(var i=0;i<this.icon.length;i++){
						this.icon[i].choice=false
					}
					var obj=val
					obj.choice=!obj.choice
					this.icon.splice(index,1,obj)
				}
			}
		},
		watch:{
			UnitSelected(val) {
	            this.DepartmentList = DepartmentRows.filter(function (x) { return x.pid == val });
	            this.DepartmentSelected = this.DepartmentList.length>0 ? this.DepartmentList[0].id : "";
	        },
	        DepartmentSelected(val) {
	            this.UserList = UserRows.filter(function (x){ return x.pid == val});
	            this.UserSelected = this.UserList.length>0 ? this.UserList[0].id : "";
	        },
	        name(val){
	        	var a=0
	        	for(let i=0;i<val.length;i++){
	        		if(val.charCodeAt(i)<0||val.charCodeAt(i)>255){
	        			a++
	        		}
	        	}
	        	if((a+val.length)>40){
	        		val.length=40
	        	}
	        },
	        description(val){
	        	var a=0
	        	for(let i=0;i<val.length;i++){
	        		if(val.charCodeAt(i)<0||val.charCodeAt(i)>255){
	        			a++
	        		}
	        	}
	        	if((a+val.length)>400){
	        		val.length=400
	        	}
	        }
		}
	}
</script>

<style scoped>
	.scroll{
		min-height: 534px;overflow-y: auto;margin-top: 100px
	}
	.found-product-box{
		width: 622px;
	}
	.found-product-field{
		width: 120px;flex-shrink: 0
	}
	input, select{
		height: 40px;
		padding:5px 15px;
		width: 100%
	}
	select option{
		height: 30px;
	}
	.text{
		width: 100%;
	}
	.icon-box{
		flex-wrap: wrap;
	}
	.icon{
		display: inline-block;
		height: 40px;
		width: 40px;
		/*line-height: 40px;*/
		padding: 5px;
	}
	.icon img{
		width: 100%;height: 100%;
	}
	.icon  .svg-icon{
		width: 30px;height: 30px;
		top: -10px;
		right: -10px;
	}
	textarea{
		height: 100px;width: 100%;
		padding: 5px 15px;
	}
	.status{
		left: 0px;top: 0px;background:rgba(0,0,0,.3);
	}
	.status img{
		width:60%;height: 42%;
	}
	.marginB50{
		margin-bottom: 50px;
	}
	.marginT70{
		margin-top: 70px
	}
</style>
