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
                return <SView col={"xs-12"} card padding={10} row 
                onPress={()=>{SNavigation.navigate("/conductor/cola")}}>
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
                        <SHr height={60} />
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