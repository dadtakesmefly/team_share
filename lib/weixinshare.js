/**
 * Created by cnaisin06 on 2017/6/22.
 */
//微信分享名片
$.ajax({
    url:weixinUrl,
    data:{"appId":"wx5c2a0cf831ae3610","url":window.location.href},
    type:"post",
    success: function (result) {
        //console.log(result.data);
        //console.log(result.data.jsapi_ticket);
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
