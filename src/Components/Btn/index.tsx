// @ts-nocheck
import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SText, STextProps, SView, SViewProps } from 'servisofts-component'
import _default from "./type/default"
import danger from "./type/danger"
import secondary from "./type/secondary"

const types = {
    default: _default,
    danger,
    secondary
}

export type ButtomType = {
    viewProps: SViewProps,
    textProps: STextProps
}


type BotoncitoPropsType = {
    onPress: () => any,
    children?: any,
    type: keyof typeof types,

} & SViewProps

export default class Btn extends Component<BotoncitoPropsType> {

    render() {
        const { children, onPress, type, style } = this.props
        const typeSelect: ButtomType = types[type ?? "default"]();
        let CONTENIDO = null
        if (typeof children == "string" || typeof children == "number") {
            CONTENIDO = <SText {...typeSelect.textProps}>{children}</SText>
        } else if (Array.isArray(children)) {
            CONTENIDO = children.map(itm => {
                if (typeof itm == "string" || typeof itm == "number") {
                    return <SText {...typeSelect.textProps}>{itm}</SText>
                } else {
                    return itm
                }
            })
        } else {
            CONTENIDO = children;
        }

        // @ts-ignore
        return <SView  {...typeSelect.viewProps} {...this.props} style={{ ...typeSelect.viewProps?.style ?? {}, ...style ?? {} }}  onPress={this.props.onPress}>
            {CONTENIDO}
        </SView >
    }
}