import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SGradient, SHr, SIcon, SNavigation, SPage, SText, STheme, SThread, SView } from 'servisofts-component';
import { Container, Gradient } from '../../Components';

class inicio extends Component {
    state = {}

  
    render() {
        return (
            <SPage hidden disableScroll center >
                <SView col={"xs-12"} flex backgroundColor={STheme.color.primary} center onLayout={(evt) => {
                    this.setState({ layout: evt.nativeEvent.layout })
                }}>
                    <Gradient/>
                    <SHr height={30} />
                    <Container>
                        <SText fontSize={26} color={STheme.color.white} bold>¡Bienvenido a TLLEBO!</SText>
                        
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