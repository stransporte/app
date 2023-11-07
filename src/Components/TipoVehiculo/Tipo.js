import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SGradient, STheme, SView, SText, SIcon, SImage } from 'servisofts-component';
import SSocket from 'servisofts-socket';

type Tipo_props = {
    width?: number,
    icon?: string,
    titulo?: string,
}

export default class index extends Component<Tipo_props> {
    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SView col={"xs-12"}>
                <SView col={"xs-12"}/>
                <SView width={(this.props.width) ? this.props?.width : 120} height={this.props.height} row center card
                    style={{
                        borderRadius: 10,
                    }}>
                    <SImage src={SSocket.api.root + "tipo_vehiculo/" + this.props?.data.key} style={{
                            width: "100%",
                            height: "100%",
                            resizeMode: "cover"
                        }} />
                </SView>
            </SView >
        );
    }
}
