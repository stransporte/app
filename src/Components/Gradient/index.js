import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Linking, Platform } from 'react-native'
import { SGradient, SPage, SText, STheme, SView } from 'servisofts-component';

export type GradientePropsType = {
    latLng: {
        latitude: any,
        longitude: any
    }
}
export default class index extends Component<GradientePropsType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return  <SGradient deg={90} colors={[STheme.color.primary, "#C90A0A" ]} />
    }
}