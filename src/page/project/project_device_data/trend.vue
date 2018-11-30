<template>
	<div>
  		<div class="time width80">
  			<div class="marginB20">
  				<div class="marginB20 size22 bold">
  					{{$t('navbar.Time_slot')}}:
  				</div>
  				
  				<div class="query">
  					<vue-datepicker-local v-model="timeRange" format="YYYY-MM-DD HH:mm:ss" :disabled-date="disabledDate"/>
  					<button type="" class="btnColor width120px height38 marginLR20" @click='query'>{{$t('navbar.Query')}}</button>
  				</div>
  			</div>
  			<div class="">
  				<div class="marginB20 size22 bold">
  					{{$t('navbar.Quick')}}：
  				</div>
  				<div>
  					<div class="marginR20 flex kj fw-wrap">
  						<button class="height36 marginR20 marginB20 paddingLR20" :class='selec=="5m" ? "btnColor" : "btnF"' @click='update("5m")'>{{$t('navbar.Five_f')}}</button>
	  					<button class="height36 marginR20 marginB20 paddingLR20" :class='selec=="15m" ? "btnColor" : "btnF"' @click='update("15m")'>{{$t('navbar.Fiftee_fn')}}</button>
	  					<button class="height36 marginR20 marginB20 paddingLR20" :class='selec=="30m" ? "btnColor" : "btnF"' @click='update("30m")'>{{$t('navbar.Thirty_f')}}</button>
	  					<button class="height36 marginR20 marginB20 paddingLR20" :class='selec=="1h" ? "btnColor" : "btnF"' @click='update("1h")'>{{$t('navbar.One_h')}}</button>
	  					<button class="height36 marginR20 marginB20 paddingLR20" :class='selec=="3h" ? "btnColor" : "btnF"' @click='update("3h")'>{{$t('navbar.Three_h')}}</button>
  					<!-- </div>
  					<div class="marginR20"> -->
	  					<button class="height36 marginR20 marginB20 paddingLR20" :class='selec=="6h" ? "btnColor" : "btnF"' @click='update("6h")'>{{$t('navbar.Six_h')}}</button>
  						<button class="height36 marginR20 marginB20 paddingLR20" :class='selec=="12h" ? "btnColor" : "btnF"' @click='update("12h")'>{{$t('navbar.Twelve_h')}}</button>
	  					<button class="height36 marginR20 marginB20 paddingLR20" :class='selec=="24h" ? "btnColor" : "btnF"' @click='update("24h")'>{{$t('navbar.Twenty_four_h')}}</button>
  						<button class="height36 marginR20 marginB20 paddingLR20" :class='selec=="7d" ? "btnColor" : "btnF"' @click='update("7d")'>{{$t('navbar.Seven_t')}}</button>
	  					<button class="height36 marginR20 marginB20 paddingLR20" :class='selec=="15d" ? "btnColor" : "btnF"' @click='update("15d")'>{{$t('navbar.Fifteen_t')}}</button>
  					<!-- </div>
  					<div> -->
  						<button class="height36 marginR20 marginB20 paddingLR20" :class='selec=="30d" ? "btnColor" : "btnF"' @click='update("30d")'>{{$t('navbar.One_y')}}</button>
	  					<button class="height36 marginR20 marginB20 paddingLR20" :class='selec=="90d" ? "btnColor" : "btnF"' @click='update("90d")'>{{$t('navbar.Three_y')}}</button>
	  					<button class="height36 marginR20 marginB20 paddingLR20" :class='selec=="180d" ? "btnColor" : "btnF"' @click='update("180d")'>{{$t('navbar.Six_y')}}</button>
  					</div>
  					
  				</div>
  			</div>
  		</div>
  		<div class="myChart-box width80">
  			<div id="myChart" class="backgroundFFF border">
	  		
		  	</div>
  		</div>
		
	</div>
  	
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入图组件
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/dataZoom')
	export default {
	    data(){
	    	const min = new Date()
		    const max = new Date()
		    const now = new Date()
			return {
				timeRange: [min, max],
				selec:'',
				deviceID:'',
				id:'',
				name:'',
			}
		},
		created(){
			var self=this
			if(this.$route.query.ids){
				this.deviceID=this.$route.query.deviceID
				this.id=this.$route.query.ids
				this.name=this.$route.query.name
				var trend={
					deviceID:this.$route.query.deviceID, //设备id
					id:this.$route.query.ids, //产品id
					name:this.$route.query.name //数据点标识符
				}
				localStorage.trend = JSON.stringify(trend)
			}else{
				this.deviceID=JSON.parse(localStorage.getItem('trend')).deviceID
				this.id=JSON.parse(localStorage.getItem('trend')).id
				this.name=JSON.parse(localStorage.getItem('trend')).name
			}


			self.$nextTick(function(){
				self.update()
				// self.drawLine()
			})
    	},
		methods: {
			update(data){//获取数据
				var self=this
				data=data || '2d'
				this.ajax({
					scope_token:localStorage.getItem('scope_token'),
					url:'v1/data/models/'+self.id+'/devices/'+self.deviceID+'/history/?last='+data+'&fields='+self.name,
					mode:'GET',
					data:{},
					success(res){
						self.selec=data
						var objec=res.data.data[0]
						var obj={}
						if(objec){
							for(let i=0;i<objec.columns.length;i++){
								obj.time=[]
								obj[self.name]=[]
								for(let j=0;j<objec.values.length;j++){
									obj[self.name].push(objec.values[j][1])
									obj.time.push(self.$time_stamp(objec.values[j][0]))
								}
							}
							self.drawLine(obj)
						}else{
							self.$violate.center(self.$t('navbar.empty'))
						}
					}
				})
			},
			drawLine(obj) {
				var start={} //根据数据点数量显示缩放比例
				if(obj.time.length<101){
					start.start=0
					start.end=100
				}else if(obj.time.length>100 && obj.time.length<500){
					start.start=50
					start.end=100
				}else{
					start.start=80
					start.end=100
				}
				var self=this
			      // 基于准备好的dom，初始化echarts实例
			    let myChart = echarts.init(document.getElementById('myChart'))
			      // 绘制图表
			    myChart.setOption({
			       tooltip: {
				        trigger: 'axis',
				        position: function (pt) {
				            return [pt[0], '10%'];
				        }
				    },
				    title: {
				        left: 'center',
				        text: self.name+self.$t('navbar.chart'),
				    },
				    toolbox: {
				        feature: {
				            dataZoom: {
				                yAxisIndex: 'none'
				            },
				            restore: {},
				            saveAsImage: {}
				        }
				    },
				    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data: obj.time
				    },
				    yAxis: {
				        type: 'value',
				        boundaryGap: [0, '100%']
				    },
				    dataZoom: [{
				    	show:true,
				        // type: 'inside',
				        start: start.start,
				        end: start.end,
				        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
				        handleSize: '80%',
				        handleStyle: {
				            color: '#fff',
				            shadowBlur: 3,
				            shadowColor: 'rgba(0, 0, 0, 0.6)',
				            shadowOffsetX: 2,
				            shadowOffsetY: 2
				        }
				    }],
				    series: [
				        {
				            name:self.name+' '+self.$t('navbar.Data'),
				            type:'line',
				            smooth:true,
				            symbol: 'none',
				            sampling: 'average',
				            itemStyle: {
				                normal: {
				                    color: 'rgb(255, 70, 131)'
				                }
				            },
				            areaStyle: {
				                normal: {
				                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
				                        offset: 0,
				                        color: 'rgb(255, 158, 68)'
				                    }, {
				                        offset: 1,
				                        color: 'rgb(255, 70, 131)'
				                    }])
				                }
				            },
				            data: obj[this.name]
				        }
				    ]
				})
		    },
		    revert(){//父子组件交互
		    	this.$emit('revert',false)
		    },
		    query(){
		    	var self=this
		    	var start=parseInt((self.timeRange[0].getTime())/1000)
		    	var end=parseInt((self.timeRange[1].getTime())/1000)
				this.ajax({
					scope_token:localStorage.getItem('scope_token'),
					url:'v1/data/models/'+self.id+'/devices/'+self.deviceID+'/history/?fields='+self.name+'&limit=50&start='+start+'&end='+end,
					mode:'GET',
					data:{},
					success(res){
						var objec=res.data.data[0]
						var obj={}
						for(let i=0;i<objec.columns.length;i++){
							obj.time=[]
							obj[self.name]=[]
							for(let j=0;j<objec.values.length;j++){
								obj[self.name].push(objec.values[j][1])
								obj.time.push(self.$time_stamp(objec.values[j][0]))
							}
						}
						self.drawLine(obj)
					}
				})
		    },
		    disabledDate (time) {
		      return time < this.min || time > this.max
		    },
		},
		computed: {
			project_id(){
				return this.$store.state.projectID
			}
		},
		watch: {
		},
	}
</script>

<style scoped>
	.myChart-box{
		padding-right: 20px;
	}
	#myChart{
		width: 100%;height: 600px;
	}
	#myChart>div:first-child{
		background:#fff;
	}
	.ret .btnf{
		width: 120px;
		margin:15px auto;
	}
	.query .btn{
		width: 120px;height: 48px;line-height: 48px;
	}
	.kj{
		width: 100%
	}
	.kj .btnf{
		width: 120px;flex-shrink: 0;
		height: 48px;line-height: 48px;
	}
	.kj button:nth-child(9n){
		/*margin-right: 0px;*/
	}
</style>
