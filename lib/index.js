/**
 * Created by cnaisin06 on 2017/6/9.
 */
function openApp(){
//  var schemeUrl = 'app里即有的协议如：  apps custom url schemes ';
    var data = {"type":"Team","relatId":"8","title":"","content":"","remark":""};
    var schemeUrl = "cnaisin://?data="+JSON.stringify(data);
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
        //$(".links").hide();
        //$(".backtop").css({"bottom":"10px"})
        $(".downloading").on("click", function () {
            //安卓
          //window.location.href="./download.html";
            initUrl();
            download();

        })
    }
}
browserRedirect();
//ajax请求数据
$.ajax({
    url:baseTeamUrl,
    type:"post",
    data:{"teamId":"1","userId":"TG9jYWxob3N0XzFYaWVqY3hhQXRyNA=="},
    success: function (result) {
        //console.log(result);
        //console.log(result.data.teamId);
        $(".team_name").html(result.data.teamName);
        $(".team_buildtime").html(dateConvert(result.data.foundTime));
        $(".team_adress").html(result.data.address);
        $(".frequency").html(result.data.actNum);
        $(".teamMembers").html(result.data.memberNum);
        $(".followers").html(result.data.followNum);
        $(".teamProfile").html(result.data.content);
        $(".team_pic").attr("src",result.data.teamLogo);
        document.title = "您被邀请加入"+result.data.teamName+"团队";

        //跳转到团队活动列表 方案1
        $(".link").on("click", function () {
            window.location.href = encodeURI("./teamEventsList.html"+"?teamName="+result.data.teamName+"&teamId="+result.data.teamId);
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
        window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.cnaisin.axgy";
    }
    //苹果
    if (u.indexOf("iPhone") > -1) {
        window.location.href = "itms-apps://itunes.apple.com/app/id1190774356";
    }
})

//点击遮罩层出现或者启动app
$(".index_add").on("click", function () {
    openApp();
    $(".mask").show();
    $(document).scrollTop(0)
    //$('body').bind("touchmove",function(e){ e.preventDefault(); });
})
//点击遮罩层消失
$("#close").on("click", function () {
    $(".mask").hide();
    //$("body").unbind("touchmove");
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
    var val = this.value;
    //console.log(val);
    $("#btn").removeAttr("disabled");
    $("#btn").die().live("click", function () {
        this.disabled = true;
        $.ajax({
            url:sendCodesMsgUrl,
            async: false,
            type:"post",
            data:{phone:val},
            success: function (data) {
                //console.log(data);
                if(data.ok == true){
                    btn.disabled = true;
                    var nun = 60;
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
                else if(data.exCode === "TimesExceeded"){
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
                    btn.disabled = false;
                    btn.value = "获取验证码";
                    return false
                }
            }
        })
    })

    var num;
    $("#test").die().live("change", function () {
        num = this.value;
        //console.log(num);
        $("#sbm").die().live("click", function () {
            $.ajax({
                url:checkCodesUrl,
                type:"post",
                data:{phone:val,codes:num},
                success: function (data) {
                    //console.log(data);
                    if(data.ok == true){
                        layer.open({
                            skin:"demo-class",
                            title:"提示",
                            content:"操作成功",
                            end: function () {
                                $(".usertel").val("");
                                $(".test").val("");
                                $(".mask").hide();
                                $(".index_add").attr("disabled","disabled").css({"background-color":"rgb(202, 188, 188)"})
                                btn.value = "获取验证码";
                                //window.location.href=document.referrer;
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

