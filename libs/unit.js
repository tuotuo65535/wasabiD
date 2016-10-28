/**
 * Created by zhiyongwang on 2016-06-08.
 * 将独立于项目的公共函数分享出来
 *
 */

var paramFormat=require("./paramFormat.js");

var baseUtil = {};

/// 获取地址栏参数的值
baseUtil.GetArgsFromHref = function (sHref, sArgName) {
    /// <summary>
    /// 获取地址栏参数的值
    /// </summary>
    /// <param name="sHref" type="string">url地址，</param>
    /// <param name="iwidth" type="int">参数名称</param>
    var args = sHref.toString().split("?");
    var retval = "";
    if (args[0] == sHref) /*参数为空*/ {
        return retval;
        /*无需做任何处理*/
    }
    var str = args[1];
    args = str.toString().split("&");
    for (var i = 0; i < args.length; i++) {
        str = args[i];
        var arg = str.toString().split("=");
        if (arg.length <= 1) continue;
        if (arg[0] == sArgName) retval = arg[1];
    }
    return retval;
}

//判断是否为IE
baseUtil.isIE = function () { //ie?
    /// <summary>
    /// 判断是否为IE
    /// </summary>
    if (!!window.ActiveXObject || "ActiveXObject" in window)
        return true;
    else
        return false;
}
//判断浏览器类型
baseUtil. BrowserType=function(){
    var browserType="";
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    if (userAgent.indexOf("Opera") > -1) {//判断是否Opera浏览器
        browserType= "Opera"
    }
    else if(userAgent.indexOf("OPR")>-1)
    {//新版本是这个
        browserType= "Opera";
    }
    else  if (userAgent.indexOf("Firefox") > -1) {//判断是否Firefox浏览器
        browserType= "Firefox";
    }
    else if (userAgent.indexOf("Chrome") > -1){//先判断是否Chrome浏览器
        browserType= "Chrome";
    }
    else  if (userAgent.indexOf("Safari") > -1) {//判断是否Safari浏览器
        browserType= "Safari";
    }
    else if (navigator.appName == "Microsoft Internet Explorer") {////判断是否IE浏览器
        browserType=  IEType();
    }

    console.log(navigator);
    return browserType;
}
//判断IE类型
baseUtil.  IEType=function() {
    if(navigator.appName == "Microsoft Internet Explorer" && navigator.userAgent.indexOf("MSIE 6.")>-1){
        return ("IE 6");
    }
    else if(navigator.appName == "Microsoft Internet Explorer" && navigator.userAgent.indexOf("MSIE 7.")>-1){
        return ("IE 7");
    }
    else if(navigator.appName == "Microsoft Internet Explorer" &&  navigator.userAgent.indexOf("MSIE 8.")>-1){
        return("IE 8");
    }
    else if(navigator.appName == "Microsoft Internet Explorer" &&  navigator.userAgent.indexOf("MSIE 9.")>-1){
        return("IE 9");
    }
    else if(navigator.appName == "Microsoft Internet Explorer" &&  navigator.userAgent.indexOf("MSIE 10.")>-1){
        return ("IE 10");
    }
    else if(navigator.appName == "Microsoft Internet Explorer" &&  navigator.userAgent.indexOf("MSIE 11.")>-1){
        return ("IE 11");
    }
}

//判断是否 iPhone / iPod /iPad
baseUtil.is_ios = function () {
    /// <summary>
    /// 判断是否 iPhone / iPod /iPad
    /// </summary>
    if ((navigator.userAgent.match(/iPhone|iPod|iPad/i))) {
        //alert('true');
        // 判断系统版本号是否大于 7
        return Boolean(navigator.userAgent.match(/OS [7-9]_\d[_\d]* like Mac OS X/i));
    } else {
        //alert('false');
        return false;
    }
}
//将数字转为英文表达格式
baseUtil.dealNumToEnglishFormat = function (num) {
    /// <summary>
    /// 将数字转为英文表达格式
    /// </summary>
    /// <param name="num" type="int">数字</param>
    if (isNaN(num)) {
        return num;
    }

    var number = num.toString();
    return number.split('').reverse().join('').replace(/(.{3})/g, '$1,').split('').reverse().join('').replace(/^,/, "");
}

// 日期格式化为字符串
baseUtil.dateformat = function (date, format) {
    /// <summary>
    /// 日期格式化为字符串
    /// </summary>
    /// <param name="date" type="date">日期</param>
    /// <param name="format" type="string">格式化字符串，"yyyy-MM-dd hh:mm:ss","yyyy-MM-dd"</param>
    if (date instanceof Date) {

    }
    else {
        //日期格式错误
        return null;
    }

    var isToday = false;

    if (date.toLocaleDateString() == new Date().toLocaleDateString()) {
        isToday = true;
        date = new Date();
    }

    var o = {
        "M+": date.getMonth() + 1, //month
        "d+": date.getDate(), //day
        "h+": isToday ? date.getHours() : 23, //hour
        "m+": isToday ? date.getMinutes() : 59, //minute
        "s+": isToday ? date.getSeconds() : 59, //second
        "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
        "S": date.getMilliseconds() //millisecond
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

baseUtil.log = function (text) {
    console.log(text);
};

//判断手机类型
baseUtil.phoneType=function() {
    /// <summary>
    /// 判断手机类型
    /// </summary>
    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isiOS)
    {
        return "iphone";
    }
    else if(isAndroid)
    {
        return "android";
    }
    else
    {
        return "undefined";
    }
}

/// 字符转日期
baseUtil.stringToDate=function (strDate) {
    /// <summary>
    /// 字符转日期
    /// </summary>
    /// <param name="strDate" type="string">日期字符格式</param>
    var date = new Date(Date.parse(strDate.replace(/-/g, "/"))); //转换成Date();
    return date;
}

baseUtil.cookies={
    /// <summary>
    /// cookies设置
    /// </summary>
    set:function(key,val){
        var Days = 7;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = key + "="+ val+";path=/;expires=" + exp.toGMTString();
    },
    get:function(key){
        var arr,reg=new RegExp("(^| )"+key+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return arr[2];
        else
            return null;
    },
    del:function(key){
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=this.get(key);
        if(cval!=null)
            document.cookie= key + "="+cval+";expires="+exp.toGMTString();
    }
}
/// 除去两端窗口
baseUtil.trim = function(str){
    /// <summary>
    /// 除去两端窗口
    /// </summary>
    /// <param name="str" type="string">str</param>
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
///获取OMS查询中公共参数
baseUtil.getOMSParams=function() {
    let ticket = baseUtil.cookies.get('ticket');
    let secretKey = baseUtil.cookies.get('secretKey');

    return "?ticket="+ticket+"&secretKey="+secretKey;
}
/*
 *ie兼容placeholder
 */
baseUtil.placeHolderIE8 = function(){
    if (!("placeholder" in document.createElement("input"))) {
        var inputs = document.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            var curInput = inputs[i];
            var placeholder = curInput.getAttribute("placeholder");
            if (curInput.getAttribute("type") != "text" || baseUtil.trim(placeholder) == "") return;

            curInput.value = placeholder;

            curInput.onfocus = function () {
                if (this.value = placeholder) {
                    this.value = "";
                }
            }

            curInput.onblur = function () {
                if (baseUtil.trim(this.value) == "") {
                    this.value = placeholder;
                }
            }
        }
    }
}
//向后台请求数据
baseUtil.fetch = {
    /// <summary>
    /// 把对象复制,返回
    /// </summary>
    get:function(fetchmodel){
        fetch(
            fetchmodel.url,
            {
                method:"GET"
            }
        ).then(function(res){
            if(res.ok){
                try {


                    res.json().then(function (data) {
                        if (data.success) {
                            fetchmodel.success && fetchmodel.success(data);
                        }
                        else {

                            if (fetchmodel.error) {
                                fetchmodel.error(data.errCode, data.message);
                            } else {
                                console.log("fetch-error",data.errCode,data.message);
                                baseUtil.showError(baseUtil.Error.HandlerError +",错误原因：" + data.message);
                            }

                        }

                    });
                }catch (e)
                {
                    baseUtil.showError(e.message);
                }
            }
            else {
                if(fetchmodel.error)
                {
                    fetchmodel.error("002",baseUtil.Error.ServiceError);
                }else {

                    baseUtil.showError(baseUtil.Error.ServiceError);
                }
            }

        }).catch(function(e){
            if(fetchmodel.error)
            {
                fetchmodel.error("001",baseUtil.Error.HttpError+e.message);
            }else {

                baseUtil.showError(baseUtil.Error.HttpError+e.message);
            }
        });
    },
    post:function(fetchmodel){
        fetch(
            fetchmodel.url,
            {
                method: "POST",
                headers: {
                    "Content-Type": fetchmodel.lang == "C#" ? "application/x-www-form-urlencoded" : "application/json;charset=UTF-8"
                },
                body:this.setParams(fetchmodel.lang,fetchmodel.params)
            }
        ).then(function(res){
            if(res.ok){
                try
                {
                    res.json().then(function(data){
                        if(data.success){
                            fetchmodel.success&&fetchmodel.success(data);
                        }
                        else {
                            if(fetchmodel.error)
                            {
                                fetchmodel.error(data.errCode,data.message);
                            }else {
                                console.log("fetch-error",data.errCode,data.message);
                                baseUtil.showError(baseUtil.Error.HandlerError + ",错误原因：" + data.message);
                            }
                        }
                    });
                }
                catch (e)
                {
                    baseUtil.showError(e.message);
                }
            }
            else {
                if(fetchmodel.error)
                {
                    fetchmodel.error("002",baseUtil.Error.ServiceError);
                }else {
                    baseUtil.showError(baseUtil.Error.ServiceError);
                }
            }
        }).catch(function(e){
            if(fetchmodel.error)
            {
                fetchmodel.error("001",baseUtil.Error.HttpError + e.message);
            }else {
                baseUtil.showError(baseUtil.Error.HttpError + e.message);
            }
        });
    },
    setParams:function(lang,params)
    {
        if(lang=="C#") {
            //let cparams = "";
            //if (params != undefined && params != null && params !== "") {
            //    for (let v in params) {
            //        if (cparams == "") {
            //            cparams += v.toString() + "=" + params[v].toString();
            //        }
            //        else {
            //            cparams += "&" + v.toString() + "=" + params[v].toString();
            //        }
            //    }
            //}
            //return cparams;
            return paramFormat.xhrFormat(params);
        }
        else {
            return params ? JSON.stringify(params) : ""
        }
        return "";
    }
}
baseUtil.showError=function(msg) {
    if (!!document.getElementById("alog-error")) {
        //存在
        let child = document.getElementById("alog-error");
        document.body.removeChild(child);


    }
    let error = document.createElement("div");
    error.id="alog-error";
    error.title="";
    error.style.position="absolute";
    error.style.zIndex=99999;
    error.innerHTML = '<div class="wasabi-message error"   >'
        + '<div class="notice">' + msg + '</div>'
        + ' </div>';
    error.onmousemove=onMouseOver;
    error.onmouseout=onMosueOut;
    document.body.appendChild(error);
    timeoutHandler();//开始执行
    function  onMosueOut()
    {
        let child = document.getElementById("alog-error");
        child.title="";
        timeoutHandler();
    }
    function  onMouseOver()
    {
        let child = document.getElementById("alog-error");
        child.title="0";
        child.style.opacity=1;
    }

    function  timeoutHandler()
    {
        setTimeout(()=>{
            let child = document.getElementById("alog-error");

        if (child&&child.title=="") {
            child.style.opacity=0.5;
            child.style.transition="opacity 2s";
        }
    },10);
        setTimeout(()=> {
            let child = document.getElementById("alog-error");
        if (child&&child.title=="") {

            document.body.removeChild(child);

        }
    }, 4000
    );
    }

}
/// 把对象复制,返回
baseUtil.clone=clone;
function clone (obj) {
    /// <summary>
    /// 把对象复制,返回
    /// </summary>
    /// <param name="obj" type="object">源对象</param>
    var o;
    switch(typeof obj){
        case 'undefined': break;
        case 'string'   : o = obj + '';break;
        case 'number'   : o = obj - 0;break;
        case 'boolean'  : o = obj;break;

        case 'object'   :

            if(obj === null){
                o = null;
            }else{
                if(obj instanceof Array){

                    o=[];
                    //o= obj.slice(0)， 注意了这里不能直接使用这个复制，如果数组中的元素为对象，复制是不成功的
                    for(var i=0;i<obj.length;i++)
                    {
                        o.push(clone(obj[i]));
                    }
                }else{
                    o = {};
                    for(var k in obj){
                        o[k] = clone(obj[k]);
                    }
                }
            }
            break;
        default:
            o = obj;break;
    }
    return o;
}
//获取真正的数据源
baseUtil.getSource=function(data,source) {
    /// <summary>
    /// 获取真正的数据源
    /// </summary>
    /// <param name="Data" type="object">Data</param>
    /// <param name="source" type="string">source</param>
    var sourceArr=new Array();
    var returnData=data;

    if(source.indexOf(".")>-1)
    {
        sourceArr=source.split(".");
    }
    else
    {
        sourceArr.push(source);
    }
    var i=0;
    try {
        while (i<sourceArr.length)
        {
            returnData=returnData[sourceArr[i]];
            if(returnData==null) {
                return  null;//直接返回
            }
            i++;

        }
    }
    catch(e)
    {
        return null;
    }

    return  returnData;
}
//判断是否空对象
baseUtil.isEmptyObject=function(obj) {
    var isempty=true;
    if( typeof obj==="object")
    {
        for(var o in obj)
        {
            isempty=false;
        }
    }
    return isempty;

}



//错误信息
baseUtil.Error={
    HttpError:"错误代码:001,网络地址无法请求",
    ServiceError:"错误代码:002,后台服务器响应失败",
    HandlerError:"后台业务程序处理错误"
}
var base64 = require("./base64.js");
baseUtil.base64 = base64;
var md5 = require("./md5.js");
baseUtil.md5 = md5;


module.exports = baseUtil;