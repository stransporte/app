import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, SList, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import { AccentBar, Container } from '../../Components';
import BottomBarra from '../../Components/BottomBarra';

class rutas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                [0]: { inicio: "Santa Cruz", fin: "Montero" },
                [1]: { inicio: "Montero", fin: "Santa Cruz" },
            }

        };
    }

    cardOpciones(title, subtitle, image, root) {
        return <SView card col={"xs-12"} row height={145}
            onPress={() => {
                SNavigation.navigate(root)
            }}
        >
            <SView col={"xs-8"} center style={{ alignItems: "flex-start", padding: 10 }} >
                <SText fontSize={22} bold color={STheme.color.text}>{title}</SText>
                <SText fontSize={14} color={STheme.color.text}>{subtitle}</SText>
            </SView>
            <SView col={"xs-4"} style={{ justifyContent: "flex-end" }} flex >
                <SImage src={image} style={{ resizeMode: "contain", borderRadius: 8, alignItems: 'flex-end' }} />
            </SView>
        </SView>
    }

    cardRutas() {
        return <SList
            buscador
            initSpace={10}
            space={10}
            data={this.state.data}
            render={(data) => {
                return <SView col={"xs-12"} card padding={10} row>
                    <SText fontSize={20} bold>{data.inicio}</SText>
                    <SText fontSize={20} bold> - {data.fin}</SText>
                    <SHr />
                    <SText fontSize={14} color={STheme.color.darkGray} >Tiempo estimado, 50 minutos.</SText>
                    <SIcon name={"Irutas"} height={60} />
                </SView>
            }}
        />
    }

    render() {

        return (
            <SPage footer={<BottomBarra url={"/login"} title={'¿Qué deseas hacer?'} />} >
                <SView col={"xs-12"} center>
                    <Container>
                        <SHr height={16} />
                        {this.cardRutas()}
                        <SHr height={16} />

                        {/* <SHr height={16} />
                        {this.cardOpciones("Comprar pasaje", "Reserva tu asiento y viaja de manera segura y barata.", require('../../Assets/img/pasaje.png'), "/pasajero/rutas")}
                        <SHr height={15} />
                        {this.cardOpciones("Pedir expreso", "Te recogemos desde tu ubicación.", require('../../Assets/img/expreso.png'), "/pasajero/expreso")}
                        <SHr height={15} />
                        {this.cardOpciones("Enviar encomiendas", "Envía paquetes al destino..", require('../../Assets/img/encomienda.png'), "/pasajero/encomienda")} */}
                        <SHr height={50} />
                    </Container>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(rutas);