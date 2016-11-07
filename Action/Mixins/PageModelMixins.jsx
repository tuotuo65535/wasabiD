/*
 create by wangzhiyong
 date:2016-10-30
 desc:单页面应用的事件处理模型
 */

let React=require("react");
let ButtonModel =require("../../model/ButtonModel.js");
let FetchModel =require("../../model/FetchModel.js");
let FormModel =require("../../model/FormModel.js");
let HeaderModel =require("../../model/HeaderModel.js");
let unit=require("../../libs/unit.js");
let PageModelMixins= {
    modelUrl:function(){//获取模型的url
        var url = "";
        if (this.props.modelUrl && this.props.modelUrl !== "") {
            url = this.props.modelUrl;

        } else {
            var url = this.props.corsUrl + this.props.controller + "/GetModel";
        }
        if (this.props.tocket) {
            if (this.props.tocket.indexOf("?") > -1) {//已经带有问号
                url += this.props.tocket;
            }
            else {
                url += "?" + this.props.tocket;
            }

        }
        return url;
    },
    getUrl:function(){//获取实例的url
        var url = "";
        if (this.props.getUrl && this.props.getUrl !== "") {
            url = this.props.getUrl;

        } else {
            var url = this.props.corsUrl + this.props.controller + "/Get";
        }
        if (this.props.tocket) {
            if (this.props.tocket.indexOf("?") > -1) {//已经带有问号
                url += this.props.tocket;
            }
            else {
                url += "?" + this.props.tocket;
            }

        }
        return url;
    },
    addUrl: function () {//新增时年请求地址
        var url = "";
        if (this.props.addUrl && this.props.addUrl !== "") {
            url = this.props.addUrl;

        } else {
            var url = this.props.corsUrl + this.props.controller + "/Add";
        }
        if (this.props.tocket) {
            if (this.props.tocket.indexOf("?") > -1) {//已经带有问号
                url += this.props.tocket;
            }
            else {
                url += "?" + this.props.tocket;
            }

        }
        return url;

    },
    deleteUrl: function () {//新增时年请求地址
        var url = "";
        if (this.props.deleteUrl && this.props.deleteUrl !== "") {
            url = this.props.deleteUrl;

        } else {
            var url = this.props.corsUrl + this.props.controller + "/Delete";
        }
        if (this.props.tocket) {
            if (this.props.tocket.indexOf("?") > -1) {//已经带有问号
                url += this.props.tocket;
            }
            else {
                url += "?" + this.props.tocket;
            }

        }
        return url;

    },
    updateUrl: function () {//新增时年请求地址
        var url = "";
        if (this.props.updateUrl && this.props.updateUrl !== "") {
            url = this.props.updateUrl;

        } else {
            var url = this.props.corsUrl + this.props.controller + "/Update";
        }
        if (this.props.tocket) {
            if (this.props.tocket.indexOf("?") > -1) {//已经带有问号
                url += this.props.tocket;
            }
            else {
                url += "?" + this.props.tocket;
            }

        }
        return url;

    },
    queryUrl:function() {//不分页查询(也可以理解为按条件查询)
        var url = "";
        if (this.props.queryUrl && this.props.queryUrl !== "") {
            url = this.props.queryUrl;

        } else {
            var url = this.props.corsUrl + this.props.controller + "/Query";
        }
        if (this.props.tocket) {
            if (this.props.tocket.indexOf("?") > -1) {//已经带有问号
                url += this.props.tocket;
            }
            else {
                url += "?" + this.props.tocket;
            }

        }
        return url;
    },
    pageUrl: function () {//分页时的请求地址
        var url = "";
        if (this.props.pageUrl && this.props.pageUrl !== "") {
            url = this.props.pageUrl;

        } else {
            var url = this.props.corsUrl + this.props.controller + "/Page";
        }
        if (this.props.tocket) {
            if (this.props.tocket.indexOf("?") > -1) {//已经带有问号
                url += this.props.tocket;
            }
            else {
                url += "?" + this.props.tocket;
            }

        }
        return url;

    },
    submitButton:function(disabled) {//提交按钮对象
        let btn =new ButtonModel("btnSubmit","提交");
        btn.theme=this.props.submitTheme;
        btn.disabled=disabled;
        btn.delay=disabled?null:3000;//防止重复提交
        return btn;

    },
    initModel:function() {//获取数据模型
        let fetchModel = new FetchModel(this.state.modelUrl, this.initModelSuccess, null, this.fetchErrorHandler);
        unit.fetch.get(fetchModel);
    },
    initModelSuccess:function(result) {//获取数据模型成功
       if(result.data!=null&&result.data instanceof Array)
       {
           if(this.props.initModel)
           {//用户进行一步处理数据模型,有返回值
                let returnValue=this.props.initModel(result.data);
               if(returnValue) {//有返回值

                   result.data=returnValue;
               }

           }
           let model=[];//表单的数据模型
           let filterModel=[];//筛选栏的数据模型
           let headers=[];//列表头的数据模型
           for(let index=0;index<result.data.length;index++) {
               var modelOject = new FormModel(result.data[index].name, result.data[index].label);
               modelOject = {...result.data[index]};//解构
               if (modelOject.filterAble == true) {//此字段可用于筛选
                   //除去验证属性
                   var filterModel=unit.clone(modelOject);
                   filterModel.required=false;
                   filterModel.regexp=null;
                   filterModel.min=null;
                   filterModel.max=null;
                   filterModel.push(filterModel);//加入筛选模型中
               }
               if (modelOject.gridAble == true) {//此字段可用于列表
                   var headerModel = new HeaderModel(modelOject.name, model.label);//得到默认表头
                   if (modelOject.headerModel) {//用户定义了其他设置
                       headerModel = {...modelOject.headerModel};//解构

                   }
                   headers.push(headerModel)//加入列表表头模型
               }
               model.push(modelOject);

           }

           this.setState({
               model:model,
               filterModel:filterModel,
               headers:headers,

           })

       }
    },
}
module .exports=PageModelMixins;