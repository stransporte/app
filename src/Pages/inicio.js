import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SGradient, SHr, SIcon, SNavigation, SPage, SText, STheme, SThread, SView } from 'servisofts-component';
import Model from '../Model';
import { Container } from '../Components';
import BottomBarra from '../Components/BottomBarra';

class inicio extends Component {
    state = {}

    renderFooter() {
        if (!this.state.layout) return null;
        var h = this.state.layout.width / 4.46
        return <SView col={"xs-12"} height={h} style={{
            position: "absolute",
            bottom: 0,
        }}>
            <SIcon name={"adornocarga"} />
        </SView>
    }
    targetCliente() {
        return <SView col={"xs-12"} >
            <SView col={"xs-12"} style={{ borderRadius: 8, overflow: "hidden" }} row center>
                <SGradient deg={50} colors={["#B8BBBE", STheme.color.white]} />
                <SIcon name={"LogoClear"} fill={STheme.color.primary + "12"} height={150} style={{ position: "absolute", padding: 20 }} />
                <SView col={"xs-12"} style={{ alignItems: "flex-end", padding: 10 }}>
                    <SText fontSize={25} color={STheme.color.black} bold>¿Eres pasajero?</SText>
                </SView>
                <SHr height={1} />
                <SView col={"xs-6"} style={{ alignItems: "flex-start" }}>
                    <SIcon name={"Ipasajero"} height={140} width={65} />
                </SView>
                <SView col={"xs-5"}>
                    <SHr height={40} />
                    <SView center backgroundColor={"#37A614"} style={{ borderRadius: 10, borderColor: "#1E7F44", borderBottomWidth: 3, padding: 10 }}
                        onPress={() => {
                            SNavigation.navigate("/login-cliente")
                        }}
                    >
                        <SText fontSize={25} color={STheme.color.white} bold center>CLIC AQUÍ</SText>
                        {/* <SHr height={10} />
                        <SText fontSize={12} color={STheme.color.primary} >¡Registrate y disfruta de los beneficios de Tllebo!</SText> */}
                    </SView>
                    <SHr height={20} />
                </SView>
            </SView>
        </SView>
    }

    targetConductor() {
        return <SView col={"xs-12"} >
            <SView col={"xs-12"} style={{ borderRadius: 8, overflow: "hidden" }} row center>
                <SGradient deg={50} colors={["#B8BBBE", STheme.color.white]} />
                <SIcon name={"LogoClear"} fill={STheme.color.primary + "12"} height={150} style={{ position: "absolute", padding: 20 }} />
                <SView col={"xs-12"} style={{ alignItems: "flex-start", padding: 10 }}>
                    <SText fontSize={25} color={STheme.color.black} bold>¿Eres conductor?</SText>
                </SView>
                <SHr height={1} />
                <SView col={"xs-5"}>
                    <SHr height={40} />
                    <SView center backgroundColor={"#37A614"} style={{ borderRadius: 10, borderColor: "#1E7F44", borderBottomWidth: 3, padding: 10 }}
                        onPress={() => {
                            SNavigation.navigate("/login")
                        }}
                    >
                        <SText fontSize={25} color={STheme.color.white} bold center>CLIC AQUÍ</SText>
                    </SView>
                    <SHr height={20} />
                </SView>
                <SView col={"xs-6"} style={{ alignItems: "flex-end" }}>
                    <SIcon name={"Iconductor"} height={150} width={140} />
                </SView>
            </SView>
        </SView>
    }
    render() {
        return (
            <SPage hidden disableScroll center footer={<BottomBarra url={"/login"} />}>
                <SView col={"xs-12"} flex backgroundColor={STheme.color.primary} center onLayout={(evt) => {
                    this.setState({ layout: evt.nativeEvent.layout })
                }}>
                    <SHr height={30} />
                    <Container>
                        <SText fontSize={26} color={STheme.color.white} bold>¡Bienvenido a TLLEBO!</SText>
                        <SHr height={15} />
                        <SIcon name={"Franja1"} height={42} />
                        <SHr height={15} />
                        {this.targetCliente()}
                        <SHr height={15} />
                        <SIcon name={"Franja1"} height={42} />
                        <SHr height={15} />
                        {this.targetConductor()}
                        <SHr height={15} />
                    </Container>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(inicio);