import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SGradient, SHr, SIcon, SImage, SNavigation, SPage, SText, STheme, SThread, SView } from 'servisofts-component';
import { Container, Gradient, PButtom } from '../../Components';
import BarraCargando from '../../Components/BarraCargando';

class asientos extends Component {
    state = {}


    render() {
        return (
            <SPage   >
                <SHr height={30} />
                <Container >
                    <SView col={"xs-12"}  height={60} center>
                        <PButtom
                            onPress={() => {
                                SNavigation.navigate("/conductor/mapa_viaje")
                            }}
                        >Iniciar viaje</PButtom>
                    </SView>
                    <SHr height={15} />
                    <SView col={"xs-12"}  style={{alignItems: "center" , justifyContent:"center", alignContent:"center"}} >
                        <SView  width={300} height={660}>
                            <SIcon name={"MascaraTrufi"} width={300} height={660} fill={STheme.color.primary} style={{ zIndex: 999, position: "absolute" }} />
                            <SImage src={require('../../Assets/img/trufi.png')} style={{
                                width: "100%",
                                height: "100%",
                                resizeMode: "cover"
                            }} />

                        </SView>
                        <SHr height={15} />
                        <SView  center width={300} height={660}>
                            <SIcon name={"MascaraTrufi"} width={300} height={660} fill={"#003253"} style={{ zIndex: 999, position: "absolute" }} />
                            <SImage src={require('../../Assets/img/trufi.png')} style={{
                                width: "100%",
                                height: "100%",
                                resizeMode: "cover"
                            }} />
                        </SView>
                    </SView>
                    <SHr height={15} />
                </Container>
            </SPage >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(asientos);