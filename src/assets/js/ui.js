var Toast = {};
var showToast = false, // 存储toast显示状态
  showLoad = false, // 存储loading显示状态
  toastVM = null, // 存储toast vm
  loadNode = null; // 存储loading节点元素
 
Toast.install = function (Vue, options) {
  // 参数
  var opt = {
    defaultType: 'bottom',
    duration: '2000',
    wordWrap: false
  };
  for (var property in options) {
    opt[property] = options[property];
  }

  var body=document.getElementsByTagName('body')[0]
 var tishi=function(tips, type,succ){

	 	var tips= tips || '操作成功'
	    var curType = type || opt.defaultType;
	    var wordWrap = opt.wordWrap ? 'lx-word-wrap' : '';
	    var style = opt.width ? 'style="width: ' + opt.width + '"' : '';
	    var tmp = '<div v-show="show" :class="type" class="lx-toast toast-prompt' + wordWrap + '" ' + style + '><img src="../../../static/img/'+succ+'.png" alt="" />{{tip}}</div>';
	    if (showToast) {
	      // 如果toast还在，则不再执行
	      return;
	    }else{
	    	toastVM=null
	    }
	    if (!toastVM) {
	      var toastTpl = Vue.extend({
	        data: function () {
	          return {
	            show: showToast,
	            tip: tips,
	            type: 'lx-toast-' + curType
	          }
	        },
	        template: tmp
	      });
	      toastVM = new toastTpl()
	      var tpl = toastVM.$mount().$el;
	      document.body.appendChild(tpl);
	    }

	    ///
	    toastVM.type = 'lx-toast-' + curType;
	    toastVM.tip = tips;
	    toastVM.show = showToast = true;
	 	var _toastVM=toastVM
	 	body.onmousedown =function(){
		  	_toastVM.show = showToast = false;
		}
	    setTimeout(function () {
	      _toastVM.show = showToast = false;
	    }, opt.duration)
 }
 // 成功提示框
  Vue.prototype.$success = function (tips, type) {
 	tishi(tips, type,'success')
  };
  ['bottom', 'center', 'top'].forEach(function (type) {
    Vue.prototype.$success[type] = function (tips) {
      return Vue.prototype.$success(tips, type)
    }
  });

  //提醒提示框 violate
  Vue.prototype.$violate = function (tips, type) {
 	tishi(tips, type,'prompt')
  };
  ['bottom', 'center', 'top'].forEach(function (type) {
    Vue.prototype.$violate[type] = function (tips) {
      return Vue.prototype.$violate(tips, type)
    }
  });
  // 失败提示框
  Vue.prototype.$fail = function (tips, type) {
 	tishi(tips, type,'fail')
  };
 
  ['bottom', 'center', 'top'].forEach(function (type) {
    Vue.prototype.$fail[type] = function (tips) {
      return Vue.prototype.$fail(tips, type)
    }
  });

  // 对话框
  Vue.prototype.$prompt=function(tips, type,obj){
  	var chenggong=localStorage.getItem('XNlang')=='zh' ? '确认' :"Confirm"
  	var quxiao=localStorage.getItem('XNlang')=='zh' ? '取消' :"Cancel"
  		var obj= obj || {}
  		var tips= tips || '操作成功'
	    var curType = type || opt.defaultType;
	    var wordWrap = opt.wordWrap ? 'lx-word-wrap' : '';
	    var style = opt.width ? 'style="width: ' + opt.width + '"' : '';
	    var tmp = `<div class='modal' v-if="show"><div :class="type" class="lx-toast ${wordWrap}"${style}>
	    				<p class='toast-icon'><img src="../../../static/img/prompt.png" alt="" />{{tip}}</p>
	    				<p class='toast-prompt-btn'><button @click='cancel'>${quxiao}</button><button @click='confirm'>${chenggong}</button></p>
	    		   </div></div>`;
	    if (showToast) {
	      // 如果toast还在，则不再执行
	      return;
	    }else{
	    	toastVM=null
	    }
	    if (!toastVM) {
	      var toastTpl = Vue.extend({
	        data: function () {
	          return {
	            show: showToast,
	            tip: tips,
	            type: 'lx-toast-' + curType
	          }
	        },
	        created(){
	        	// console.log(obj.hid)
	        	if(obj.hasOwnProperty('hid')){
					obj.hid=this.hid
	        	}
	        },
	        methods:{
	        	cancel(){
	        		if(obj.hasOwnProperty('cancel') && typeof obj.cancel == 'function'){
	        			obj.cancel()
	        		}else{
	        			this.hid()
	        		}
	        	},
	        	confirm(){
	        		showToast=false
	        		if(obj.hasOwnProperty('confirm') && typeof obj.confirm == 'function'){
	        			obj.confirm()
	        			this.hid()
	        		}
	        		else{
	        			this.hid()
	        		}
	        	},
	        	hid(){
	        		this.show=showToast=false
	        	}

	        },
	        template: tmp
	      });
	      toastVM = new toastTpl()
	      var tpl = toastVM.$mount().$el;
	      document.body.appendChild(tpl);
	    }
	    toastVM.type = 'lx-toast-' + curType;
	    toastVM.tip = tips;
	    toastVM.show = showToast = true;
	 	
	    // setTimeout(function () {
	    //   toastVM.show = showToast = false;
	    // }, opt.duration)
  };
  ['bottom', 'center', 'top'].forEach(function (type) {
    Vue.prototype.$prompt[type] = function (tips,obj) {
      return Vue.prototype.$prompt(tips, type,obj)
    }
  });


 // loading框
  Vue.prototype.$loading = function (tips, type) {
	    if (type == 'close') {
	      loadNode.show = showLoad = false;
	    } else {
	      if (showLoad) {
	        // 如果loading还在，则不再执行
	        return;
	      }else{
	    	toastVM=null
	      }
	      var loadTpl = Vue.extend({
	        data: function () {
	          return {
	            show: showLoad
	          }
	        },
	        template: '<div v-if="show" class="lx-load-mark"><div class="lx-load-box"><div class="lx-loading"><div class="loading_leaf loading_leaf_0"></div><div class="loading_leaf loading_leaf_1"></div><div class="loading_leaf loading_leaf_2"></div><div class="loading_leaf loading_leaf_3"></div><div class="loading_leaf loading_leaf_4"></div><div class="loading_leaf loading_leaf_5"></div><div class="loading_leaf loading_leaf_6"></div><div class="loading_leaf loading_leaf_7"></div><div class="loading_leaf loading_leaf_8"></div><div class="loading_leaf loading_leaf_9"></div><div class="loading_leaf loading_leaf_10"></div><div class="loading_leaf loading_leaf_11"></div></div><div class="lx-load-content">' + tips + '</div></div></div>'
	      });
	      loadNode = new loadTpl();
	      var tpl = loadNode.$mount().$el;
	 
	      document.body.appendChild(tpl);
	      loadNode.show = showLoad = true;
	    }
  };
 
  ['open', 'close'].forEach(function (type) {
    Vue.prototype.$loading[type] = function (tips) {
      return Vue.prototype.$loading(tips, type)
    }
  });

// 时间戳转换成时间
  Vue.prototype.$time_stamp=function(time){
  		var date = new Date(time * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = (date.getDate()<10 ? '0' + date.getDate() : date.getDate() )+ ' ';
        h = (date.getHours()<10 ? '0' + date.getHours() : date.getHours() ) + ':';
        m = (date.getMinutes()<10 ? '0' + date.getMinutes() : date.getMinutes() ) + ':';
        s = date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds();
        return Y+M+D+h+m+s;
 	 }

}
 
// 向外暴露接口
module.exports = Toast;