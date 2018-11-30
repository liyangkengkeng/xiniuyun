import axios from 'axios';
import Vue from 'vue'
import Toast from './ui.js';
import router from '@/router'

var headers,URL

const ajax=function(obj){
    if(obj==='' || obj===null || obj===undefined){
        return false
    }
    obj.goods=obj.goods || false
    if(obj.goods){
        URL=GOODSURL
        // obj.data.lang='cn'//语言
        obj.data.lang = localStorage.getItem('XNlang')=='en' ? 'en' : 'cn'
    }else{
        URL=ALLURL
    }
    obj.resource = obj.resource || false  //资源请求
    var token = obj.scope_token || localStorage.getItem('token')
    obj.from = obj.from || false
    if(obj.from){
        headers={
            'Authorization': "Bearer " + token,
        }
    }else{
        if(obj.mode=='get' || obj.mode=='GET'){
            headers={
                'Authorization': "Bearer " + token,
            }
        }else{
            headers={
                'Authorization': "Bearer " + token,
                'Content-Type': 'application/json'
            }
        }
    }
	
    // 注册登陆页面头部信息
    obj.login = obj.login || false
    if(obj.login){
        headers={'Content-Type': 'application/x-www-form-urlencoded'}
    }
    if(obj.data.constructor  === String){
            obj.data = obj.data ? obj.data+'&client_id='+localStorage.getItem('client_id')+'&client_secret='+localStorage.getItem('client_secret') : '';
    }
    else if(obj.data.constructor  === Array){
        obj.data=obj.data
        obj.data=JSON.stringify(obj.data)
    }else{
        obj.data = obj.data || {};
        // 判断是否是请求资源
        if(obj.resource){
            obj.data.client_id=localStorage.getItem('client_id')
            obj.data.client_secret=localStorage.getItem('client_secret')
        }
        obj.data=JSON.stringify(obj.data)
    }
    if(!obj.set){
        Vue.prototype.$loading('loading...')
    }
    axios.defaults.timeout =  5000
    axios({
        method: obj.mode,
        url: URL+obj.url,
        headers: headers,
        data:obj.data,
    })
    .then(response => {
        if(!obj.set){
           Vue.prototype.$loading.close()
        }
        
        if(obj.success){
            obj.success(response)
        } else
        	return;
    })
    .catch(error => {
       console.log(error)
       console.log(error.request)
       console.log(error.response)
       console.log(error.config)
       if(!obj.set){
           Vue.prototype.$loading.close()
        }
        var falg=true
        if(error.response.headers){//access-control-allow-credentials
            for(let i in error.response.headers){
                if(i==='x-oauth-token-expired' && error.response.headers[i]){
                    router.push('/login')
                    return false
                }
            }
        }
        if (error.response) {
            Vue.prototype.$fail.center(error.response.data.message)
        } else if (error.request) {
            console.log(error.request);
        }else if(error.config){
            Vue.prototype.$fail.center(error.config.data.message)
        } else {
            Vue.prototype.$fail.center(error.message)
        }
        if(error.response.data.message=='token null not find'){
            router.push('/login')
        }
        
    });
}

export default ajax;