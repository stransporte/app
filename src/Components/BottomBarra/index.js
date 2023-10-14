import React, { Component } from 'react';

import { SView, SText, STheme, SGradient, SIcon, SNavigation } from 'servisofts-component'
import Model from '../../Model';

export default class index extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
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
