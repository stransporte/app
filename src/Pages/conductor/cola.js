import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SGradient, SHr, SIcon, SImage, SList, SNavigation, SPage, SText, STheme, SThread, SView } from 'servisofts-component';
import { Container, Gradient } from '../../Components';
import BarraCargando from '../../Components/BarraCargando';

class cola extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                [0]: { nombre: "Alejandro", modelo: "MonToyota corolla", placa: "2531XCV", puesto: 1 },
                [1]: { nombre: "Fernando", modelo: "Suzuki Dzire", placa: "4689FGB", puesto: 2 },
                [2]: { nombre: "Pedro", modelo: "Toyota Mirai", placa: "6152HHN", puesto: 3 },
            }

        };
    }

    cardCola() {
        return <SList
            initSpace={10}
            space={10}
            data={this.state.data}
            render={(data) => {
                return <SView col={"xs-12"} card row
                    onPress={() => { SNavigation.navigate("/conductor/asientos") }}>
                    <SView col={"xs-3"} center padding={10}>
                        <SView width={60} height={60} center
                            style={{ borderRadius: 35, backgroundColor: STheme.color.primary + "50" }}
                        >
                            <SImage src={require('../../Assets/img/sinFoto.png')} style={{ resizeMode: "contain", width: 40, height: 40 }} />
                        </SView>
                    </SView>
                    <SView col={"xs-1"} />
                    <SView col={"xs-5.5"} padding={10}>
                        <SText fontSize={20} bold>{data.nombre}</SText>
                        <SText fontSize={14} color={STheme.color.text} >{data.modelo}</SText>
                        <SText fontSize={14} color={STheme.color.text} >{data.placa}</SText>
                    </SView>
                    <SView col={"xs-2.5"} center backgroundColor={STheme.color.primary}
                        style={{ overflow: "hidden", borderTopRightRadius: 4, borderBottomRightRadius: 4 }}
                    >
                        <SGradient deg={90} colors={[STheme.color.primary, "#C90A0A"]} />
                        <SText fontSize={25} bold color={STheme.color.white}>#{data.puesto}</SText>
                    </SView>
                </SView>
            }}
        />
    }


    render() {
        return (
            <SPage   >
                <SHr height={30} />
                <Container >
                    <SView col={"xs-12"} card height={60} center>
                        <SView col={"xs-10"} center>
                            <SText bold>Eres el Nº 25 en la cola</SText>
                            <SHr height={10} />
                            <BarraCargando height={8} backgroundColor={STheme.color.primary} />
                        </SView>
                    </SView>
                    <SHr height={15} />
                    {this.cardCola()}

                    <SHr height={15} />
                </Container>
            </SPage >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(cola);