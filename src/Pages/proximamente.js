import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SPage, SText, STheme, SView } from 'servisofts-component';
import { Container } from '../Components';
import BottomBarra from '../Components/BottomBarra';
class proximamente extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        // initialize state if needed
    }

    componentDidMount() {
        // code to run after component mounts
    }

    componentWillUnmount() {
        // code to run before component unmounts
    }

    render() {
        return (
            <SPage center disableScroll footer={<BottomBarra url={"/login"} title={'¿Qué deseas hacer?'} />}>
                {/* <SText>{"Bienvenido al sitio oficial de"}</SText> */}
                <Container>
                    <SView col={"xs-12"} center backgroundColor={STheme.color.primary + "30"} style={{padding:25}}>
                        <SView col={"xs-12"} center backgroundColor={STheme.color.primary } style={{padding:15, borderWidth:5, borderColor:STheme.color.white, borderRadius:20}}>                            <SText color={STheme.color.white} fontSize={25} bold>{"¡PRÓXIMAMENTE!"}</SText>
                            <SHr h={16} />
                            <SText color={STheme.color.white} center fontSize={18}>{"Estamos trabajando para brindarte una mejor experiencia"}</SText>
                            <SHr/>
                            <SIcon name='Prox' width={80} height={80}/>
                        </SView>
                    </SView>
                </Container>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(proximamente);
