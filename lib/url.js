/**
 * Created by cnaisin06 on 2017/6/22.
 */
//验证码
//    var baseUrl = "http://192.168.31.248:7070/AXGY_OP/"; //本地联调地址
//    var baseUrl = "https://rest.cnaisin.com:8443/AXGY_OP/";
var baseUrl = "https://rest.cnaisin.com:15443/AXGY_OP/"; //product
var sendCodesMsgUrl = baseUrl + "sendCodesMsg"; //发送验证码
var checkCodesUrl = baseUrl + "checkCodes"; //检查验证码

//团队分享
//var baseTeamUrl ="https://192.168.31.248:8443/backend/share/team" //本地联调地址
var baseTeamUrl ="https://rest.cnaisin.com:8443/backend/share/team"//测试地址

//团队列表
//var teamExperience = "https://192.168.31.248:8443/backend/v1b08/team/teamAct"//联调地址
var teamExperience ="https://rest.cnaisin.com:8443/backend/v1b08/team/teamAct"//测试地址

//微信分享
var weixinUrl= "https://rest.cnaisin.com:8443/AXGY_OP/weixin";
