# 启动APP
## 尝试启动APP，有则启动，没有则跳转到应用市场
### 微信和qq内置浏览器不能唤醒APP,其他浏览器可以唤醒；
### 安卓可以通过跳转应用宝市场唤醒APP,苹果则不行；
#### （坑）七牛获取的图片地址，不带后缀jpg或png的图片，在安卓微信浏览器不能正常显示，苹果则可以

           function openApp(){
           
             //var schemeUrl = 'app里即有的协议如：  apps custom url schemes ';
             
            var data={"type":"Team","relatId":"8","title":"","content":"","remark":""};
            
            var schemeUrl ="cnaisin://?data="+JSON.stringify(data);
            
            if (navigator.userAgent.match(/(iPhone|iPod|iPad)/i)) {
            
                var loadDateTime = new Date();
                
                window.setTimeout(function() {
                
                    var timeOutDateTime = new Date();
                    
                    if (timeOutDateTime - loadDateTime > 5000) {
                    
                        //window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.cnaisin.axgy"
                        
                        return
                        
                    } else {
                    
                        //layer.open({
                        //    skin:"demo-class",
                        //    title:"提示",
                        //    content:"无法打开,请点击底部下载爱信APP按钮"
                        //})
                    }
                    
                },25);
                
                window.location.href = schemeUrl;
                
            } else if (navigator.userAgent.match(/android/i)) {
            
                var state = null;
                
                try {
                
                    state = window.open(schemeUrl, '_self');
                    
                } catch(e) {}
                
                if (state) {
                
                    //alert('无法打开');
                    //layer.open({
                    //    skin:"demo-class",
                    //    title:"提示",
                    //    content:"无法打开,请点击底部下载爱信APP按钮"
                    //})
                    //window.close();
                    
                } else {
                
                    //window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.cnaisin.axgy"
                    
                }
                
            }
            
        }
        
## 调用手机系统方法，判断该页面是否在app内打开，在app内则不显示底部的下载app按钮，反之则显示
#### 需要ios和Android共同配合，写一个相同的方法，安卓app内返回Android，苹果app内返回ios，浏览器打开不调用该方法

            window.onload= function () {
            
                aisinJs.getMode();//系统方法
                
                alert(aisinJs.getMode())；
                
                //在app内
                
                if(aisinJs.getMode()){
                
                    $(".links").hide();
                    
                }
                
                else{
                
                    $(".links").show();
                    
               }

      
# URL传递中文时候
   result.data.teamName==团队名称；
   
   要先转码
   
         window.location.href=encodeURI("./teamEventsList.html"+"?teamName="+result.data.teamName);
          
   下个页面接受参数时候 要解码
          
          var teamName=decodeURI(GetQueryString("teamName"));
      
# 时间戳转化  年/月/日 时：分：秒
        function dateConvert(dateStr){
            var da = Number(dateStr);
            da = new Date(da);
            var year = da.getFullYear();
            var month = da.getMonth()+1;
            var date = da.getDate();
            var hour = da.getHours();
            var minute = da.getMinutes() < 10 ? "0" + da.getMinutes() : da.getMinutes() ;
            var second =da.getSeconds() <10 ?"0"+ da.getSeconds() : da.getSeconds();
            month = month < 10 ? "0" +month : month ;
            date = date < 10 ? "0" + date : date ;
            return [year,month,date].join('/')+" "+hour+":"+minute+":"+second;
        }
         dateConvert(1497861704308)
         
# 网页加载进度条
### 自动监听ajax
         <!--进度条样式-->
         <link rel="stylesheet" href="css/pace-theme-barber-shop.css"/>
         <!--进度条js-->
         <script src="lib/pace.js"></script>
