//creete by wangzy
//date:2016-11-21
//desc 增加多行文本
let React=require("react");

var validation=require("../Lang/validation.js");
let setStyle=require("../../Mixins/setStyle.js");
var validate=require("../../Mixins/validate.js");
var shouldComponentUpdate=require("../../Mixins/shouldComponentUpdate.js");
var Label=require("../Unit/Label.jsx");
var Button=require("../Buttons/Button.jsx");
var pasteExtend=require("../../Mixins/pasteExtend.js");
var MutiText=React.createClass({
    mixins:[setStyle,validate,shouldComponentUpdate],
    propTypes: {
        name:React.PropTypes.string.isRequired,//字段名
        label:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.element,React.PropTypes.node]),//字段文字说明属性
        width:React.PropTypes.number,//宽度
        height:React.PropTypes.number,//高度
        value:React.PropTypes.oneOfType([React.PropTypes.number,React.PropTypes.string]),//默认值,
        text:React.PropTypes.oneOfType([React.PropTypes.number,React.PropTypes.string]),//默认文本值
        placeholder:React.PropTypes.string,//输入框预留文字
        readonly:React.PropTypes.bool,//是否只读
        required:React.PropTypes.bool,//是否必填
        onlyline:React.PropTypes.bool,//是否只占一行
        hide:React.PropTypes.bool,//是否隐藏
        regexp:React.PropTypes.string,//正则表达式
        invalidTip:React.PropTypes.string,//无效时的提示字符
        style:React.PropTypes.object,//自定义style
        className:React.PropTypes.string,//自定义class
        size:React.PropTypes.oneOf([
            "default",
            "large",
            "onlyline"
        ]),//组件表单的大小
        position:React.PropTypes.oneOf([
            "left",
            "default",
            "right"
        ]),//组件在表单一行中的位置

        //其他属性
        rows:React.PropTypes.number,//行数
        min:React.PropTypes.number,//最小值,最小长度,
        max:React.PropTypes.number,//最大值,最大长度
        onClick:React.PropTypes.func,//单击事件
        onChange:React.PropTypes.func,//值改变事件

    },
    getDefaultProps:function() {
        return{
            type:"text",
            name:"",
            label:null,
            width:null,
            height:null,
            value:"",
            text:"",
            placeholder:"",
            readonly:false,
            required:false,
            onlyline:false,
            hide:false,
            regexp:null,
            invalidTip:null,
            style:null,
            className:null,
            size:"default",
            position:"default",



        }
    },
    getInitialState:function() {
        return{
            hide:this.props.hide,
            value:this.props.value,
            text:this.props.text,
            readonly:this.props.readonly,

            //其他属性
            show:false,//是否显示

            //验证
            required:this.props.required,
            validateClass:"",//验证的样式
            helpShow:"none",//提示信息是否显示
            helpTip:validation["required"],//提示信息
            invalidTip:"",
            areaValue:this.props.value,//多行文本框的值

        }
    },
    componentWillReceiveProps:function(nextProps) {
        this.setState({
            hide:nextProps.hide,
            min:nextProps.min,
            max:nextProps.max,
            value: nextProps.value,
            areaValue:nextProps.value,
            text: nextProps.text,
            readonly: nextProps.readonly,
            required: nextProps.required,
            validateClass:"",//重置验证样式
            show:false

        });

    },
    changeHandler:function(event)
    {
        this.setState({
            areaValue:event.target.value,
        })
    },
    showPicker:function() {//显示选择
        if (this.state.readonly) {
            //只读不显示
            return;
        }
        else {
            this.setState({
                show: !this.state.show
            })
        }
    },
    clearHandler:function() {//清除数据
        if(this.props.onSelect!=null)
        {
            this.props.onSelect("","",this.props.name,null);
        }
        this.setState({
            value:null,
            text:null,
            areaValue:""
        })
    },
    cancelHandler:function() {//取消选择
        this.setState({
            show: false,
            areaValue:this.state.value,//还原之前的值

        })
    },
    onSelectHandler:function() {//确定事件
        this.setState({
            ulShow:false,
            value:this.state.areaValue,
            text:this.state.areaValue,
        });
        if( this.props.onSelect!=null)
        {
            this.props.onSelect(this.state.areaValue,this.state.areaValue,this.props.name);
        }
    },
    render:function() {
        var size=this.props.onlyline==true?"onlyline":this.props.size;//组件大小
        var componentClassName=  "wasabi-form-group "+size+" "+(this.props.className?this.props.className:"");//组件的基本样式
        var style =this.setStyle("input");//设置样式
        let inputProps=
        {
            readOnly:this.state.readonly==true?"readonly":null,
            style:style,
            name:this.props.name,
            placeholder:(this.props.placeholder===""||this.props.placeholder==null)?this.state.required?"必填项":"":this.props.placeholder,
            className:"wasabi-form-control  "+(this.props.className!=null?this.props.className:"")

        }//文本框的属性

        //textarea 不支持null值
        let areaValue=this.state.areaValue;
        if(!areaValue)
        {
            areaValue="";
        }
        return (
            <div className={componentClassName+this.state.validateClass} style={style}>
                <Label name={this.props.label} hide={this.state.hide} required={this.state.required}></Label>
                <div className={ "wasabi-form-group-body"} style={{width:!this.props.label?"100%":null}}>
                    <div className="combobox"  style={{display:this.props.hide==true?"none":"block"}}   >
                        <i className={"picker-clear"} onClick={this.clearHandler} style={{display:this.state.readonly?"none":(this.state.value==""||!this.state.value)?"none":"inline"}}></i>
                        <i className={"pickericon"} onClick={this.showPicker}></i>
                        <input type="text"  {...inputProps}  value={this.state.text} onClick={this.showPicker}      />
                        <div className={"dropcontainter  mutiText "+this.props.position} style={{display:this.state.show==true?"block":"none"}}  >
                       <textarea value={areaValue} ref="input" onChange={this.changeHandler}
                                 style={{width:"100%",height:100,border:"1px solid #d7dde2",resize:"none"}}></textarea>
                            <div className="ok" >
                                <Button title="确定" name="ok"  theme="green" onClick={this.onSelectHandler}></Button>
                                <Button title="取消" name="ok"  theme="cancel" onClick={this.cancelHandler}></Button>
                            </div>
                        </div>
                    </div>
                    <small className={"wasabi-help-block "+this.props.position} style={{display:(this.state.helpTip&&this.state.helpTip!="")?this.state.helpShow:"none"}}>{this.state.helpTip}</small>
                </div>
            </div>


        )
    }
});
module .exports=MutiText;