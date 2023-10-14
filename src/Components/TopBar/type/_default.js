import React, { Component } from 'react'
import { SIcon, SNavigation, SText, STheme, SView } from 'servisofts-component';

import { TopBarPropsType } from '..';
import { Gradient } from '../..';
export default class index extends Component<TopBarPropsType> {
    constructor(props) {
        super(props);
        this.state = {}
    }
    getBack() {
        if (this.props.preventBack) {
            return null;
        }
        return <SView col={"xs-12"} height center >
            <SView onPress={() => {
                if (this.props.onBack) {
                    var prevent_default = this.props.onBack();
                    if (prevent_default) {
                        return;
                    }
                }
                SNavigation.goBack();
            }} col={"xs-12"} style={{
                paddingBottom: 4,
            }} center height>
                <SIcon height={18} name={"BackArrow"} fill={STheme.color.white} />
            </SView>
        </SView>
    }
    render() {
        return (<SView col={"xs-12"} height={50} backgroundColor={STheme.color.primary} center row>
            <Gradient/>
            <SView width={50} height>
                {this.getBack()}
            </SView>
            <SView flex height center>
                <SText color={STheme.color.white}>{this.props.title}</SText>
            </SView>
            <SView width={50} height></SView>
        </SView>)
    }
}