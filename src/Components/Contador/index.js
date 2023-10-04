import React, { Component } from 'react';

import { SView, SText, STheme, SGradient, SIcon, SNavigation, SDate, SThread, SLoad } from 'servisofts-component'

export default class Contador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curTime: new SDate(),
    };
  }


  render() {
    if(!this.props.date) return <SLoad/>
    var time = new SDate(this.props.date);
    var diff = this.state.curTime.diffTime(time);
    new SThread(1000/10, "hiloRelojTimeOut", true).start(() => {
        this.setState({curTime:new SDate()});
    })
    var minutes = diff / (1000 * 60) ;
    var seconds = (diff %  (1000 * 60)) / 1000;
    minutes = Math.floor(minutes);
    seconds = Math.floor(seconds);
    if(diff <= 0 ){
      return null;
    }
    return (
      <SView col={"xs-12"} height={50} border={'transparent'} style={{ backgroundColor: STheme.color.primary }}>
        <SView col={'xs-12'} row height center >
          <SText font={"Arial"} fontSize={40} center color={STheme.color.secondary}  >{minutes} : {seconds<10?"0"+seconds:seconds} </SText>
        </SView>
      </SView >
    );
  }
}
