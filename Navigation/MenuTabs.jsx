/*create by wangzy
 //date:2016-03-02后开始a独立框架改造
 //标签页组
 */
require("../Sass/Navigation/MenuTabs.scss");
require("../Sass/Buttons/icon.scss");
var React =require("react");
var Tab=require("./MenuTab.jsx");
var TabSection=require("./MenuTabSection.jsx");
var LinkButton=require("../Buttons/LinkButton.jsx");
var unit=require("../libs/unit.js");

class MenuTabs extends  React.Component {
    constructor(props) {
        super(props);
        this.menuHandler = this.menuHandler.bind(this);
        this.homeHandler = this.homeHandler.bind(this);
        this.userHandler=  this.userHandler.bind(this);
        this.tabClickHandler = this.tabClickHandler.bind(this);
        this.tabCloseHandler = this.tabCloseHandler.bind(this);
        this.leftClickHandler= this.leftClickHandler.bind(this);
        this.rightClickHandler= this.rightClickHandler.bind(this);

        //复制一份，当菜单关闭时用于比较显示的位置，不能直接复制给状态值，这样会导致不停的刷新
        this.oldTabsLength=(this.props.tabs).length;
        let resultWidth=this.setDeWidth();

        var rightIndex=0;//右边下标
        if(this.props.tabs instanceof  Array&&this.props.tabs.length>0) {
            if (this.props.tabs.length < resultWidth.availNum) {
                rightIndex = this.props.tabs.length - 1;
            }
            else {
                rightIndex = resultWidth.availNum - 1;
            }
        }


        this.  state = {
            tabs: this.props.tabs,
            homeActive: -1,//主页是否处于激活状态
            menuVisible: false,//
            leftIndex: 0,//可见的第一个下标
            rightIndex:rightIndex,//可见的最后一个下标
            availWidth:resultWidth.availWidth,//可以宽度
            availNum: resultWidth.availNum,//可用个数
        }
    }
    static    propTypes = {
        tabs: React.PropTypes.array,//标签页数据
        menuHandler: React.PropTypes.func,//菜单按钮的单击事件
        homeUrl: React.PropTypes.string,//主页的链接地址
        homeTitle:React.PropTypes.string,//主页的标题
        userHandler: React.PropTypes.func,//用户个人中心按钮的单击事件
        userComponent:React.PropTypes.any,//用户自定义的组件
        tabNumChangeHandler: React.PropTypes.func,//标签页数据发生改变事件

    }
    static defaultProps = {
        tabs: null,
        menuHandler: null,
        homeUrl: null,
        homeTitle:"我的桌面",//我的桌面
        userHandler: null,
        userComponent: null,//用户自定义组件
        cellWidth: 121,//单元格默认宽度
        tabNumChangeHandler:null,//标签页数据发生改变事件
    }
    setDeWidth() {//设置可以用宽度与可用个数
        var detractWidth = 0;//被减去的宽度,
        if (this.props.menuHandler) {//是否有菜单按钮
            detractWidth += 40;
        }
        if (this.props.homeUrl) {//是否有主页按钮
            detractWidth += 40;
        }
        if (this.props.userComponent) {//是否自定义用户信息
            detractWidth += 300;
        }
        else if (this.props.userHandler) {//是否有用户按钮
            detractWidth += 40;
        }
        var availWidth=document.body.getBoundingClientRect().width - detractWidth;
        var availNum = parseInt((availWidth) / this.props.cellWidth);
        return {
            availWidth: availWidth,//可用宽度
            availNum: availNum,//可用个数
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            tabs:( nextProps.tabs),
            homeActive: (nextProps.tabs&&nextProps.tabs.length>0)?false:true,//判断主页是否激活
            menuVisible: nextProps.menuVisible,//菜单按钮是否打开
        })
    }
    menuHandler() {//显示/隐藏菜单的事件
        this.setState({
            menuVisible: !this.state.menuVisible
        })
        this.props.menuHandler(!this.state.menuVisible);//回调父组件
    }
    userHandler() {//用户中心单击事件
        this.props.userComponent?this.props.userHandler?this.props.userHandler():void(0):void(0);//如果自定义了组件，不处理
    }
    homeHandler(){//主页的单击事件
        this.setState({
            homeActive:true,//激活主页
            tabs:this.state.tabs.map((item,index)=>{item.active=false;return item;})
        })
    }
    tabClickHandler(index) {
        //页签单击事件
        this.setState({
            tabs: this.state.tabs.map((item,itemIndex)=>{return index==itemIndex?(()=>{item.active=true;return item;})():(()=>{item.active=false;return item;})()}),
            homeActive:false,
        });
    }
    tabCloseHandler(index) {

        var newTabs =this.state.tabs;
        var parentuuid = newTabs[index].parentuuid;
        var parentIndex = null;//父页面的下标
        for (var i = 0; i < newTabs.length; i++) {
            if (newTabs[i].uuid == parentuuid) {
                parentIndex = i;
                break;
            }
        }
        if (newTabs[index].active == true) { //删除tab为激活的tab
            if (parentIndex != null) {//存在父页面，父页面激活
                newTabs[parentIndex].active = true;
            }
            else {//不存在父页面，激活临近页面
                if (index < newTabs.length - 1) {//不是最后一个，下一个激活
                    newTabs[index + 1].active = true;

                }
                else {
                    //最后一个，上一个激活
                    if (index != 0) {
                        newTabs[index - 1].active = true;
                    }
                    else {
                    }

                }
            }
        }
        newTabs.splice(index, 1);//删除

        this.setState({
            tabs: newTabs,

            homeActive:newTabs.length==0?true:false
        })
        if (this.props.tabNumChangeHandler) {
            this.props.tabNumChangeHandler(newTabs);//返回给你父组组件更新
        }
    }


    leftClickHandler() {

        if(this.state.leftIndex>0)
        {
            this.setState({
                leftIndex:this.state.leftIndex-1,
                rightIndex:this.state.rightIndex-1,
            })
        }
    }
    rightClickHandler() {
        if (this.state.rightIndex < this.state.tabs.length - 1) {
            this.setState({
                leftIndex: this.state.leftIndex + 1,
                rightIndex: this.state.rightIndex + 1,
            })
        }
    }





    render() {
        var tabobj = [];
        var sectionobj = [];
            this.state.tabs.map((child, index) => {
                if (child.active == true) {//保存当前激活标签uuid，用于子标签中打开新标签时设置其父标签
                    window.localStorage.setItem("alog_currentTabUUID", child.uuid);//保存当前激活节点，用于新建tab
                    if (child.parentuuid != null) {//记录当前节点的父节点，用于关闭时更新父tab
                        var parentTabUUID = window.localStorage.getItem("parentTabUUID");
                        if (parentTabUUID == null) {
                            parentTabUUID = "";
                        };
                        parentTabUUID += child.uuid + "$" + child.parentuuid;//);//保存当前激活节点的uuid及父节点的uuid,用于关闭tab时刷新父节点,
                        window.localStorage.setItem("parentTabUUID", parentTabUUID);
                    }

                }
                tabobj.push(<Tab key={"tab" + index}  onContextMenu={this.headerContextMenuHandler} index={index}  title={child.title} iconCls={child.iconCls}
                                 active={child.active} clickHandler={this.tabclickHandler}
                                 closeHandler={this.tabCloseHandler} hide={(index>=this.state.leftIndex&&index<=this.state.rightIndex)?false:true} ></Tab>);
                sectionobj.push(<TabSection key={"tabsection" + index} url={child.url}
                                            active={(this.state.homeActive) ? false : child.active}
                                            content={child.content}></TabSection>);
            });

        if (this.props.homeUrl ) {//如果有主页的话
            tabobj.unshift(<Tab key={"tab"}  title={this.props.homeTitle} index={-1}
                                active={(this.state.homeActive)?true:false} clickHandler={this.homeHandler}
                             closeHandler={this.tabCloseHandler} ></Tab>);
            sectionobj.unshift(<TabSection key={"homesection"} url={this.props.homeUrl}
                                           active={(this.state.homeActive)?true:false}></TabSection>)
        }

        return (
            <div className="wasabi-nav-container">
                <ul className=" wasabi-nav-tabs" ref="menutab">
                    <li className={"tabmenu "+(this.state.menuVisible?"close":"")} style={{display:(this.props.menuHandler?"inline-block":"none")}} onClick={this.menuHandler}></li>
                    <li className={"tabhome "+((this.state.homeActive)?"active":"")} style={{display:(this.props.homeUrl?"inline-block":"none")}}  onClick={this.homeHandler}>
                        <div className="split"></div></li>


                    <li className="content" style={{width:this.state.availWidth}}>
                        <ul > {tabobj}</ul>
                        <div className="scrollbar"></div>
                    </li>
                    <li style={{display:(this.props.userComponent||this.props.userHandler)?"inline-block":"none"}}
                        className={(this.props.userComponent?"tabuser-control":this.props.userHandler?"tabuser":"") }
                        onClick={this.userHandler}>{this.props.userComponent}
                    </li>
                </ul>
                { sectionobj}

            </div>);

    }
};
module.exports=MenuTabs;
