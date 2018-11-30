 const asyc_ajax=function(obj){
 	var xhr = new XMLHttpRequest();
    xhr.open(obj.mode, ALLURL+obj.url, false);
    // 添加http头，发送信息至服务器时内容编码类型
    obj.refresh=obj.refresh || false
    if(obj.refresh){
    	xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
    }else{
    	if(obj.mode=='get' || obj.mode=='GET'){
	        xhr.setRequestHeader("Authorization", "Bearer "+localStorage.getItem('token'));
            xhr.setRequestHeader("Accept",'application/json')
	    }else{
	    	xhr.setRequestHeader("Authorization","Bearer "+localStorage.getItem('token'))
	    	xhr.setRequestHeader("Content-Type",'application/json')
	    }
    }
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && (xhr.status == 201 || xhr.status == 200 || xhr.status == 304)) {
        obj.success(JSON.parse(xhr.responseText))
        console.log(JSON.parse(xhr.responseText))
      }else{
        console.log(xhr)
      }
    };
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
    xhr.send(obj.data);

 }


 export default asyc_ajax;