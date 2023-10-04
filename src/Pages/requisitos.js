import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import { Btn, Container } from '../Components';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SPage preventBack hidden disableScroll>
                {/* <SText>{"Bienvenido al sitio oficial de"}</SText> */}
                <SView col={"xs-12"} backgroundColor={STheme.color.primary} flex>

                    <SView width={100} height={100} >
                        <SIcon name={"LogoClear"} fill={"#fff"} />
                    </SView>
                    <SHr h={20} />
                    <SView col={"xs-12"} backgroundColor='#fff' padding={16}>
                        <SText fontSize={20} bold>{"Qué necesitas para registrarte"}</SText>
                        <SHr h={16} />
                        <SView col={"xs-12"} row>
                            <SView col={"xs-4"}>
                                <SText fontSize={16} bold>{"Requisitos"}</SText>
                                <SHr />
                                <SText fontSize={14}>{"- Ser mayor de 21 años"}</SText>
                                <SText fontSize={14}>{"- Aprobación de documentos"}</SText>
                            </SView>
                            <SView col={"xs-4"}>
                                <SText fontSize={16} bold>{"Documentación requerida"}</SText>
                                <SHr />
                                <SText fontSize={14}>{"- Licencia de conducción"}</SText>
                                <SText fontSize={14}>{"- SOAT"}</SText>
                                <SText fontSize={14}>{"- Foto de placa o RUA"}</SText>
                            </SView>
                            <SView col={"xs-4"}>
                                <SText fontSize={16} bold>{"Empezar es muy fácil"}</SText>
                                <SHr />
                                <SText fontSize={14}>{"- Registráte en línea"}</SText>
                                <SText fontSize={14}>{"- Subí tus documentos"}</SText>
                                <SText fontSize={14}>{"- Descargá la app y empezá a manejar"}</SText>
                            </SView>
                        </SView>
                    </SView>
                    <Container>
                        <SHr h={50} />
                        <Btn col={"xs-12"} type='secondary' padding={8} onPress={() => {
                            SNavigation.navigate("/registro", { url_callback: "/datos" })
                        }}>Registrate como conductor</Btn>
                        <SHr h={50} />
                        <Btn col={"xs-12"} type='secondary' padding={8} onPress={() => {
                            SNavigation.navigate("/login")
                        }}>Ya tienes una cuenta?</Btn>
                    </Container>

                    <SHr h={100} />
                </SView>

            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);