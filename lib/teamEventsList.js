/**
 * Created by cnaisin06 on 2017/6/16.
 */

//转码
var teamName = decodeURI(GetQueryString("teamName"));
var teamId = decodeURI(GetQueryString("teamId"));
//console.log(teamName);
//console.log(teamId);

//渲染
$(function(){
    function getData(config, offset,size){
        config.isAjax = true;
        $.ajax({
            type: 'post',
            url: teamExperience,
            data:{teamId:teamId},
            success: function(reponse){
                //console.log(reponse);
                config.isAjax = false;
                var data = reponse.list;
                var sum = reponse.list.length;
                document.title = teamName+"团队的活动经历"
                var result = '';
                //时长
                //$("h3 span").html(reponse.totaltime);
                //活动状态
                $.each(data, function (k,v) {
                    if(v.status == "Preparation"){
                        v.status = "报名中";
                    }
                    if(v.status == "Finish"){
                        v.status = "已结束";
                    }
                    if(v.status == "Archived"){
                        v.status = "已结束";
                    }
                    if(v.status == "Processing"){
                        v.status = "进行中";
                    }
                })
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
                        '<img class="banner" src=" '+data[i].banner+ '"  alt=/>'+
                        '<p class="status">'+data[i].status+'</p>'+
                        ' <div>'+
                        ' <h4>'+data[i].title+'</h4>'+
                        ' <img class="adresspic" src="images/本地活动地址.png" alt=/><span class="team_adress">'+data[i].adress+'</span>'+
                        ' <img src="images/本地活动时间.png" /><span class="time">'+dateConverts(data[i].time)+'</span>'+
                        ' <img class="teampic" src=" '+ data[i].logo +' " alt=/>' +
                        '</div>'+
                        ' </li>';

                }
                $('ul').append(result);
                //背景
                $.each($(".status"), function (i,v) {
                    //console.log($(this));
                    if($(this).html() == "已结束"){
                        $(this).css({"background-color":"#f5f5f5","color":"#666"})
                    }

                })
                /*******************************************/
                /*隐藏more*/
                if ( (offset + size) >= sum){
                    $(".js-load-more").hide();
                    //$(".js-load-more").html("到底啦")
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

