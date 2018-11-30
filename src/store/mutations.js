
import axios from 'axios';
export default {
    PROJECTID:function(state,a){//项目id
        state.projectID=a
    },
    PRODUCTID:function(state,a){//產品id
        state.productID=a
    },
    INVITE:function(state,a){//是否是邀请
    	state.invite=a
    },
    PROJECT_PRODUCT_LIST:function(state,a){//项目关联产品列表
    	state.project_product_list=a
    },
    PROJECT_DEVICE_LIST:function(state,a){//项目下所有设备列表
    	state.project_device_list=a
    },
    TRIGGER_LIST:function(state,a){//触发器规则列表
    	state.trigger_list=a
    },
    WELL_OR_DTU:function(state,a){//创建产品选择的是成品(true)还是dtu(false)
        state.wellORdtu=a
    },
    GOODSDATA:function(state,a){//商品
        state.goodsData=a
    },
    PRODUCT_DATA:function(state,a){//产品数据
        state.product_data=a
    },
    PROJECT_DATA(state,a){//项目数据
        state.project_data=a
    },
    personal_center:function(state,a){//是否显示个人中心
        state.personal_center=a
    },
    SENSOR:function(state,a){//传感器页面是否是首次进入
        state.sensor++
    },

    SENSOR0:function(state,a){//传感器页面是否是首次进入
        state.sensor=0
    },

    COMS_GOODS0:function(state,a){//清空关联的接口商品
        state.comsGoods=[]
    },
    COMS_GOODS:function(state,a){//关联的接口商品
        state.comsGoods.push(a)
    },
    ACCESS_TOKEN:function(state,a){//设备分页
        state.access_token=a
    }, 
    IS_DEVICELIST:function(state,a){//项目首页是否获取设备列表
        state.isDeviceList=a
    },
};

