import React, { Component } from 'react';
import { SGradient, SLoad, SText, STheme, SView } from 'servisofts-component';

type PButtomSmall_props = {
    primary?: boolean,
    secondary?: boolean,
    withe?: boolean,
    outline?: boolean,
    onPress?: () => void,
    loading?: boolean,
    small?: boolean,
    style?: any,
    width?: number,
    height?: number,
}

export default class PButtomSmall extends Component<PButtomSmall_props> {
    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    render() {
        var bgColor = this.props.primary ? STheme.color.primary : this.props.secondary ? STheme.color.info : STheme.color.primary;
        var colorText = STheme.color.white;
        if (this.props.withe) {
            bgColor = "#fff"
            colorText = STheme.color.primary;
        }
        var size = {
            width: this.props.width ?? 65,
            height: this.props.height ?? 24,
        }
        if (this.props.small) {
            size.width = 65;
            size.height = 24;
        }
        return (<SView height={size.height} style={{
            borderRadius: 8,
            width: "100%",
            maxWidth: size.width,
            // borderRadius:8,
            ...(this.props.outline ? { borderWidth: 1, borderColor: bgColor } : { backgroundColor: bgColor }),
        }} center
            activeOpacity={this.props.loading ? 1 : 0.5}
            {...this.props}
            onPress={() => {
                if (this.props.loading) return;
                if (this.props.onPress) {
                    this.props.onPress();
                }
            }} >
            {this.props.loading ? <SLoad /> : <SText {...this.props} color={STheme.color.white} >
                {/* {this.props.children} */}
                
                </SText>}
        </SView>);
    }
}
