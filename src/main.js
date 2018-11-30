
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import ajax from '@/assets/js/ajax.js'
// import asyc_ajax from '@/assets/js/async_ajax.js'
import store from './store/index.js';  //vuex

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)


import DatePicker from './components/time'//时间插件
Vue.use(DatePicker)


const i18n = new VueI18n({
	// locale: LangStorage.getLang('zh'),  // 语言标识，后面会用做切换和将用户习惯存储到本地浏览器
	locale: 'zh', // 语言标识
    messages: {
      'zh': require('./lang/zh.json'),
      'en': require('./lang/en.json')
    }
})
if(!localStorage.getItem('XNlang')){
	localStorage.XNlang=i18n.locale
}else{
	i18n.locale=localStorage.getItem('XNlang')
}


import '@/assets/css/common.css'  //公用css样式表

Vue.prototype.axios=axios;
Vue.prototype.ajax=ajax
// Vue.prototype.asyc_ajax=asyc_ajax


import Toast from '@/assets/js/ui.js';			//提示框
import '@/assets/css/ui.css'

Vue.use(Toast);

Vue.config.productionTip = false;

var vm=new Vue({
	el: '#app',
	router,
	i18n,
	store,//使用store
	template: '<App/>',
	components: { App },
	created(){
		
	},
	computed:{
		title(){
			return this.$i18n.locale
		}
	},
	watch:{
		title(val){
			if(val=='en')
				document.title='Xnmatrix Cloud'
			else
				document.title='西牛智塔云'

		}
	}
})