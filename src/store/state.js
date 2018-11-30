 const state={
 	token:'', 
	scope_token:'',
   	projectID:'',//项目ID
   	productID:'',//產品ID
   	invite:'',//是否是邀请的用户
   	project_product_list:[],//项目下的产品列表
   	project_device_list:[],//项目下的设备列表
   	trigger_list:[],//项目触发器列表
   	wellORdtu:null,//创建产品选择的是成品(true)还是dtu(false)
   	goodsData:'',//商品数据
   	product_data:{},//产品数据
      project_data:{},//项目详情
      personal_center:'',//个人中心
      sensor:0,//传感器页面是否是首次进入
      comsGoods:[],//关联的接口商品
      access_token:'',//设备分页总数
      // set:0,//定时器，用于刷新token
      isDeviceList:0, //项目首页是否获取设备列表
 }

 export default state