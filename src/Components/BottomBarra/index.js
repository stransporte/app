import React, { Component } from 'react';

import { SView, SText, STheme, SGradient, SIcon, SNavigation } from 'servisofts-component'
import Model from '../../Model';

export default class index extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	getItem({ key, title, icon, url, params }) {
		var color = "#ffffff";
		var isSelect = (url == this.props.url)
		return <SView flex center height onPress={() => {
			SNavigation.navigate(url, params);
		}} >
			<SView style={{
				borderRadius: 16,
				// backgroundColor: (isSelect ? "#ffffff44" : ""),
				width: 55,
				height: 45,
			}} center>
				<SView height={23} colSquare center >
					{/* <SIcon name={icon} stroke={color} fill={STheme.color.primary} /> */}
					{/* <SIcon name={icon} stroke={isSelect ? STheme.color.info : color} fill={isSelect ? STheme.color.info : STheme.color.white} /> */}
					<SIcon name={icon} fill={isSelect ? STheme.color.info : color}  />
				</SView>
				<SView height={2} />
				<SText fontSize={8} center color={isSelect ? STheme.color.info : color}  >{title}</SText>
			</SView>
		</SView>
	}
	render() {
		return (
			<>
				<SView col={"xs-12"} height={30} border={'transparent'}
					style={{
						// backgroundColor: STheme.color.primary,
						// borderTopLeftRadius: 35,
						// borderTopRightRadius: 35,
						// overflow: 'hidden',
						borderWidth:0
					}}>
					
					<SGradient colors={["#155830", "#37A614",]} style={{zIndex:99}} />
				</SView >
			</>
		);
	}
}
