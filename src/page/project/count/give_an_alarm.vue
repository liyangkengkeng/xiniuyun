<template>
	<div>
		<div class="size22 marginB20">
			新增数据
		</div>
		<div class="project-data-echart  padding20 backgroundFFF border-r5 border">
			<div class="flex al-ce size22">
				<p class="marginLR20 size20">数据量</p>
				<p class="btn1 size18 marginLR20">月份</p>
			</div>
			<div class="echarts" id="myChart">
			
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
	export default {
	    data(){
			return {
				
			}
		},
		created(){
			var self=this
			self.$nextTick(function(){
				self.drawLine()
			})
    	},
		methods: {
			drawLine() {
			      // 基于准备好的dom，初始化echarts实例
			    let myChart = echarts.init(document.getElementById('myChart'))
			      // 绘制图表
			    myChart.setOption({
			        legend: {
				        data:['高度(km)与气温(°C)变化关系']
				    },
				    tooltip: {
				        trigger: 'axis',
				        formatter: "Temperature : <br/>{b} : {c}"
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        axisTick:{
				        	alignWithLabel:true
				        },
				       data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
				    },
				    yAxis: {
				        type: 'category',
				        axisLine: {onZero: false},
				        axisLabel: {
				            formatter: '{value}'
				        },
				        boundaryGap: false,
				        data: [0,0.25,0.5,0.75,1]  //Y轴数据
				    },
				    series: [
				        {
				            name: '高度(km)与气温(°C)变化关系',
				            type: 'line',
				            smooth: true,
				            lineStyle: {
				                normal: {
				                    width: 3,
				                    shadowColor: 'rgba(0,0,0,0.4)',
				                    shadowBlur: 10,
				                    shadowOffsetY: 10
				                }
				            },
				            data:[3,1,1,1,1,1,1]
				        }
				    ]
				})
		    }
		},
		watch: {
			
		},
		components: {
    		
    	},
	}
</script>

<style scoped>
	.echarts{
		width: 100%;
		height:500px;
	}
</style>
