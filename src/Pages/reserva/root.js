import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SGradient, SHr, SIcon, SImage, SNavigation, SPage, SText, STheme, SThread, SView } from 'servisofts-component';
import { Container, Gradient } from '../../Components';
import BarraCargando from '../../Components/BarraCargando';
import Canvas from './Components/Canvas';

class inicio extends Component {
    state = {}


    render() {
        return (
            <SPage   >
                <SHr height={30} />
                <Container >
                    <SView col={"xs-12"} card height={60} center>
                        <SView col={"xs-10"} center>
                            <SText bold>31 personas en cola</SText>
                            <SHr height={10} />
                            <BarraCargando height={8} backgroundColor={STheme.color.primary} />
                        </SView>
                    </SView>
                    <SHr height={15} />
                    <SView col={"xs-12"} center >
                        <SView col={"xs-11"} center width={300} height={660}>
                            <SIcon name={"MascaraTrufi"} width={300} height={660} fill={STheme.color.primary} style={{ zIndex: 999, position: "absolute" }} />
                            <SImage src={require('../../Assets/img/trufi.png')} style={{
                                width: "100%",
                                height: "100%",
                                resizeMode: "cover"
                            }} />

                        </SView>
                        <SHr height={15} />
                        <SView col={"xs-11"} center width={300} height={660}>
                            <SIcon name={"MascaraTrufi"} width={300} height={660} fill={"#003253"} style={{ zIndex: 999, position: "absolute" }} />
                            <SImage src={require('../../Assets/img/trufi.png')} style={{
                                width: "100%",
                                height: "100%",
                                resizeMode: "cover"
                            }} />
                        </SView>
                    </SView>
                    {/* <SView col={"xs-12"} center height >
                        <Canvas
                            img={"../../Assets/img/trufi.png'"}
                            onClick={(evt, ref) => {
                            }}
                            paint={(ref) => {
                            }} />
                    </SView> */}
                    <SHr height={15} />
                </Container>
            </SPage >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(inicio);