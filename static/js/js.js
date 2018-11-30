var clear_testUser=false
var OVERTIME = function(time){
       var time = time || 3600;
       var objTime = {
         init:0,
         time:function(){
          console.log('js'+111)
           objTime.init += 1;
           if(objTime.init == (time-200)){
              var xhr = new XMLHttpRequest();
              xhr.open('post', ALLURL+'v1/oauth2/tokens/', false);
              // 添加http头，发送信息至服务器时内容编码类型
              xhr.setRequestHeader("Authorization","Bearer "+localStorage.getItem('token'))
              xhr.setRequestHeader("Content-Type",'application/json')
              xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && (xhr.status == 201 || xhr.status == 200 || xhr.status == 304)) {
                  objTime.init=0
                  localStorage.token = JSON.parse(xhr.responseText).data.access_token;
                  localStorage.refresh_token=JSON.parse(xhr.responseText).data.refresh_token;
                  localStorage.isCloudAdmin = true;
                  localStorage.isSystemAdmin = false;

                }else{
                  objTime.init=0
                }
              };
              var obj={
                client_id:localStorage.getItem('client_id'),
                client_secret:localStorage.getItem('client_secret'),
                refresh_token:localStorage.getItem('refresh_token'),
                grant_type:'refresh_token'
              }
              xhr.send(JSON.stringify(obj));
            }
          },
         eventFun:function(){
           clearInterval(testUser);
           objTime.init = 0;
           if(!clear_testUser){
              testUser = setInterval(objTime.time,1000);
           }
         }
       }
       var testUser = setInterval(objTime.time,1000);
       if(clear_testUser){
        clearInterval(testUser);
       }
       var body = document.querySelector('html');
       body.addEventListener("click",objTime.eventFun);
       body.addEventListener("keydown",objTime.eventFun);
       body.addEventListener("mousemove",objTime.eventFun);
       body.addEventListener("mousewheel",objTime.eventFun);
    }
