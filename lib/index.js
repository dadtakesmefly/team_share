/**
 * Created by cnaisin06 on 2017/6/9.
 */

//    var baseUrl = "http://192.168.31.248:7070/AXGY_OP/"; //本地联调地址
//    var baseUrl = "https://rest.cnaisin.com:8443/AXGY_OP/";
var baseUrl = "https://rest.cnaisin.com:15443/AXGY_OP/"; //product
var sendCodesMsgUrl = baseUrl + "sendCodesMsg"; //发送验证码
var checkCodesUrl = baseUrl + "checkCodes"; //检查验证码

//团队分享
//var baseTeamUrl ="https://192.168.31.248:8443/backend/share/team" //本地联调地址
var baseTeamUrl ="https://rest.cnaisin.com:8443/backend/share/team"//测试地址

function openApp(){
//  var schemeUrl = 'app里即有的协议如：  apps custom url schemes ';
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

//判断用户设备是pc还是移动
function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return
    } else {
        $(".links").hide();
        //$(".backtop").css({"bottom":"10px"})
    }
}
browserRedirect();
//时间转换
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

//ajax请求数据
$.ajax({
    url:baseTeamUrl,
    type:"post",
    data:{"teamId":"1","userId":"TG9jYWxob3N0XzFYaWVqY3hhQXRyNA=="},
    success: function (result) {
        $(".team_name").html(result.data.teamName);
        $(".team_buildtime").html(dateConvert(result.data.foundTime));
        $(".team_adress").html(result.data.address);
        $(".frequency").html(result.data.actNum);
        $(".teamMembers").html(result.data.memberNum);
        $(".followers").html(result.data.followNum);
        $(".teamProfile").html(result.data.content);
        $(".team_pic").attr("src",result.data.teamLogo);
        document.title="您被邀请加入"+result.data.teamName+"团队";
        //跳转到团队活动列表 方案1
        $(".link").on("click", function () {
            window.location.href=encodeURI("./teamEventsList.html"+"?teamName="+result.data.teamName);

        })


    }
})

var u = navigator.userAgent;
//点击底部下载app按钮消失
$(".close").on("click", function () {
    $(".links").fadeOut();
})
$(".downloading").on("click", function () {
    //安卓
    if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
        window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.cnaisin.axgy";
    }
    //苹果
    if (u.indexOf("iPhone") > -1) {
        window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.cnaisin.axgy";

    }
})

//function target(){
//    $.ajax({
//        url:"",
//        type:"post",
//        data:{},
//        success: function () {
//
//        }
//
//    })
//    window.location.href="./teamEventsList.html"
//}

//点击遮罩层出现或者启动app
$(".index_add").on("click", function () {
    openApp();
    $(".mask").show();
    $(document).scrollTop(0)
    $('body').bind("touchmove",function(e){ e.preventDefault(); });
})
//点击遮罩层消失
$("#close").on("click", function () {
    $(".mask").hide();
    $("body").unbind("touchmove");
})

//验证手机号
var inpPhone=document.getElementById("usertel");
var regPhone=/^0?(13|14|15|18)[0-9]{9}$/;
check(inpPhone,regPhone);
function check(inp, reg) {
    inp.onblur = function () {
        if (reg.test(this.value)) {
            return;
        } else {
            btn.value = "获取验证码";
        }
    };
}
var btn = document.getElementById("btn");
var timer = null;
$("#usertel").die().live("change", function () {
    var val=this.value;
    console.log(val);
    $("#btn").removeAttr("disabled");
    $("#btn").die().live("click", function () {
        this.disabled = true;
        $.ajax({
            url:sendCodesMsgUrl,
            async: false,
            type:"post",
            data:{phone:val},
            success: function (data) {
                console.log(data);
                if(data.ok==true){
                    btn.disabled = true;
                    var nun=60;
                    timer = setInterval(function () {
                        nun--;
                        btn.disabled = true;
                        btn.value = nun + "秒";
                        if (nun === 0) {
                            clearInterval(timer);
                            btn.value = "获取验证码";
                            btn.disabled = false;
                            nun = 60;
                        }
                    }, 1000);
                }
                else if(data.exCode==="TimesExceeded"){
                    layer.open({
                        skin:"demo-class",
                        title:"提示",
                        content:"一个手机号一天只能获取3次验证码,请明天再试!"
                    })
                    btn.disabled = false;
                    return false
                }
                else{
                    layer.open({
                        skin:"demo-class",
                        title:"提示",
                        content:"手机号错误，请重新输入"
                    })
                    btn.disabled=false;
                    btn.value = "获取验证码";
                    return false
                }
            }
        })
    })

    var num;
    $("#test").die().live("change", function () {
        num=this.value;
        console.log(num);
        $("#sbm").die().live("click", function () {
            $.ajax({
                url:checkCodesUrl,
                type:"post",
                data:{phone:val,codes:num},
                success: function (data) {
                    console.log(data);
                    if(data.ok==true){
                        layer.open({
                            skin:"demo-class",
                            title:"提示",
                            content:"操作成功",
                            end: function () {
                                $(".usertel").val("");
                                $(".test").val("");
                                btn.value = "获取验证码";
                                window.location.href=document.referrer;
                            }
                        })
                    }
                    else{
                        layer.open({
                            skin:"demo-class",
                            title:"提示",
                            content:"短信验证码错误"
                        })
                        btn.disabled = false;
                        return false
                    }
                }
            })
        })
    })
})

//微信分享名片
var weixinUrl="https://rest.cnaisin.com:8443/AXGY_OP/weixin";
$.ajax({
    url:weixinUrl,
    data:{"appId":"wx5c2a0cf831ae3610","url":window.location.href},
    type:"post",
    success: function (result) {
        console.log(result.data);
        console.log(result.data.jsapi_ticket);
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wx5c2a0cf831ae3610', // 必填，公众号的唯一标识
            timestamp: result.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: result.data.nonceStr, // 必填，生成签名的随机串
            signature: result.data.signature,// 必填，签名，见附录1
            jsApiList: [
                "onMenuShareTimeline",
                "onMenuShareAppMessage",
                "onMenuShareQQ",
                "onMenuShareWeibo",
                "onMenuShareQZone",
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        window.share_config = {
            "share": {
                "imgUrl":"../images/爱信.png",//分享图，默认当相对路径处理，所以使用绝对路径的的话，“http://”协议前缀必须在。
                "desc" : "公益专属App,随时随地做公益",//摘要,如果分享到朋友圈的话，不显示摘要。
                "title" : document.title,//分享卡片标题
//                   "link": window.location.href,//分享出去后的链接，这里可以将链接设置为另一个页面。
                "success":function(){//分享成功后的回调函数
                },
                'cancel': function () {
                    // 用户取消分享后执行的回调函数
                }
            }
        };
        wx.ready(function () {
            wx.onMenuShareAppMessage(share_config.share);//分享给好友
            wx.onMenuShareTimeline(share_config.share);//分享到朋友圈
            wx.onMenuShareQQ(share_config.share);//分享给手机QQ
            wx.onMenuShareWeibo(share_config.share);//分享给微博
            wx.onMenuShareQZone(share_config.share)//QQ空间
        });
    }
})
