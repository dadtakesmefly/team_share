/**
 * Created by cnaisin06 on 2017/6/16.
 */
//获取参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}
//转码
var teamName=decodeURI(GetQueryString("teamName"));
//时间转换
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
    return [month,date].join('/')+" "+hour+":"+minute+":"+second;
}

//渲染
$(function(){
    function getData(config, offset,size){
        config.isAjax = true;
        $.ajax({
            type: 'GET',
            url: 'json/blog.json',
            dataType: 'json',
            success: function(reponse){
                config.isAjax = false;
                var data = reponse.list;
                var sum = reponse.list.length;
                document.title=teamName+"团队的活动经历"
                console.log(document.title);
                var result = '';
                //document.title=reponse.ok+"团队的活动经历"
                /************业务逻辑块：实现拼接html内容并append到页面*****************/
                //console.log(offset , size, sum);
                /*如果剩下的记录数不够分页，就让分页数取剩下的记录数
                 * 例如分页数是5，只剩2条，则只取2条
                 */
                if(sum - offset < size ){
                    size = sum - offset;
                }
                /*使用for循环模拟SQL里的limit(offset,size)*/
                for(var i=offset; i< (offset+size); i++){
                    result +=  ' <li>'  +
                        '<img src=" '+data[i].banner+ '"  alt=/>'+
                        '<p class="status">'+data[i].status+'</p>'+
                        ' <div>'+
                        ' <h4>'+data[i].title+'</h4>'+
                        ' <img class="adresspic" src="images/地址.png" alt=/><span class="team_adress">'+data[i].adress+'</span>'+
                        ' <img src="images/日历.png" /><span class="time">'+dateConvert(data[i].time)+'</span>'+
                        ' <img class="teampic" src=" '+ data[i].pic +' " alt=/>' +
                        '</div>'+
                        ' </li>';
                }
                $('ul').append(result);
                /*******************************************/
                /*隐藏more*/
                if ( (offset + size) >= sum){
                    $(".js-load-more").hide();
                    config.isEnd = true; /*停止滚动加载请求*/
                    //提示没有了
                }else{
                    $(".js-load-more").show();
                }
            },
            error: function(xhr, type){
                alert('Ajax error!');
            }
        });
    }
    $.loadmore.get(getData, {scroll: true, size:5});
});

