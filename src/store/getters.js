
export const token = (state) => {
    return state.token;
}

export const scope_token = (state) => {
    return state.scope_token
}

export const projectID = (state) => {//项目ID
    return state.projectID;
}
export const productID = (state) => {//產品ID
    return state.productID;
}

export const invite = (state) => {//是否是邀请的用户
    return state.invite
}

export const project_product_list = (state) => {//项目下的产品列表
    return state.project_product_list
}

export const project_device_list = (state) => {//项目下的设备列表
    return state.project_device_list
}

export const trigger_list = (state) => {//项目触发器列表
    return state.trigger_list
}

export const wellORdtu = (state) => {//创建产品选择的是成品(true)还是dtu(false)
    return state.wellORdtu
}

export const goodsData = (state) => {//商品
    return state.goodsData
}

export const product_data = (state) => {//产品详情
    return state.product_data
}
export const project_data = (state) => {//设备详情
    return state.project_data
}
export const personal_center = (state) => {//是否显示个人中心
    return state.personal_center
}

export const sensor = (state) => {//传感器页面是否是首次进入
    return state.sensor
}

export const comsGoods = (state) => {//关联的接口商品
    return state.comsGoods
}

export const access_token = (state) => {//设备分页
    return state.access_token
}
export const isDeviceList = (state) => {//项目首页是否获取设备列表
    return state.isDeviceList
}