/**
 * Created by cnaisin06 on 2017/6/9.
 */
/*让文字和标签的大小随着屏幕的尺寸做变话 等比缩放*/
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>=640){
                docEl.style.fontSize = '100px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
//时间转换 年/月/日
function dateConvert(dateStr){
    var da = Number(dateStr);
    da = new Date(da);
    var year = da.getFullYear();
    var month = da.getMonth()+1;
    var date = da.getDate();
    var hour = da.getHours();
    var minute = da.getMinutes() < 10 ? "0" + da.getMinutes() : da.getMinutes() ;
    month = month < 10 ? "0" +month : month ;
    date = date < 10 ? "0" + date : date ;
    return [year,month,date].join('-');
}
//时间转换 月/日 时/分
function dateConverts(dateStr){
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
    return [month,date].join('/')+" "+hour+":"+minute;
}

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