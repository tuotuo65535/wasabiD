/*
create by wangzy
date:2016-05-20
desc:将日期控件表头独立出来
 */
let React=require("react");
let Lang=require("../Lang/language.js");
require("../Sass/Form/DateTime.scss");
let CalendarHeader = React.createClass({
    getInitialState:function(){
        return {
            year:this.props.year,
            month:this.props.month,
            day:this.props.day,
        };
    },
    componentWillReceiveProps:function(nextProps) {
        this.setState({
            year:nextProps.year,
            month:nextProps.month,
            day:nextProps.day,
        })
    },
    handleLeftClick:function(){
        var newMonth = parseInt(this.state.month) - 1;
        var year = this.state.year;
        if(newMonth < 1){
            year --;
            newMonth = 12;
        }
        this.props.updateFilter(year,newMonth); // 执行父组件回调函数，改变父组件状态值
    },
    handleRightClick:function(){
        var newMonth = parseInt(this.state.month) + 1;
        var year = this.state.year;
        if( newMonth > 12 ){
            year ++;
            newMonth = 1;
        }
        this.state.month = newMonth;
        this.state.year=year;
        this.setState(this.state);
        this.props.updateFilter(year,newMonth);// 执行父组件回调函数，改变父组件状态值
    },
    changeYear:function () {
        if(this.props.changeYear)
        {
            this.props.changeYear();
        }

    },
    changeMonth:function () {
        if(this.props.changeMonth)
        {
            this.props.changeMonth();
        }

    },
    render:function(){
        return(
            <div className="wasabi-datetime-header">
                <div className="header-text" ><a href="javascript:void(0);" style={{marginRight:8}} onClick={this.changeYear}>
                    <span>{this.state.year+"年"}</span><i style={{fontSize:12,marginTop:2}} className="icon-down"></i></a>
                    <a  href="javascript:void(0);" onClick={this.changeMonth}><span>{Lang.cn.Month[this.state.month-1]+"月"}</span><i style={{fontSize:12,marginTop:2}} className="icon-down"></i></a></div>
                <a  href="javascript:void(0);" className="triangle-left"    onClick={this.handleLeftClick}>
                </a>
                <a  href="javascript:void(0);" className="triangle-right" onClick={this.handleRightClick}></a>
            </div>
        )
    }
});
module .exports=CalendarHeader;