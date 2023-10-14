import { Linking, Platform, Text, View } from 'react-native'
import React, { Component } from 'react'
import { SHr, SIcon, SPage, SPopup, SText, STheme, SView } from 'servisofts-component'
import { Container } from '../Components'

export default class version_required extends Component {
    render() {
        return <SPage preventBack hidden>
            <Container flex>
                <SHr h={50} />
                <SView height={100} width={100}>
                    <SIcon name={"LogoClear"} fill={STheme.color.primary} />
                </SView>

                <SHr h={20} />
                <SView col={"xs-10"}>
                    <SText fontSize={24} bold center>{`¡Actualización Disponible!`}</SText>
                    <SHr h={20} />
                    <SText fontSize={16} center color={STheme.color.gray}>{`Nos complace informarte que hay una nueva versión de nuestra aplicación disponible en las tiendas.\n\nHemos trabajado arduamente para incluir nuevas características y mejoras que harán tu experiencia aún mejor.`}</SText>
                </SView>
                <SView flex />
                <SView width={150} height={50} center card style={{
                    backgroundColor: STheme.color.primary,
                }}
                    onPress={() => {
                        if (Platform.OS == "android") {
                            Linking.openURL("https://play.google.com/store/apps/details?id=com.stransporte_app")
                        } else if (Platform.OS == "ios") {
                            Linking.openURL("https://apps.apple.com/us/app/calistenia-bolivia/id6469413033")
                        }
                    }}>
                    <SText fontSize={16} bold>Actualizar</SText>
                </SView>
                <SHr h={50} />
            </Container>
        </SPage>
    }
}