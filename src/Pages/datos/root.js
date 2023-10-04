import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SList, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import { Container } from '../../Components';
import SSocket from 'servisofts-socket'
import Model from '../../Model';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key_usuario = SNavigation.getParam("key_usuario");
        // this.key_usuario = Model.usuario.Action.getKey()
    }
    componentDidMount() {
        SSocket.sendPromise({
            component: "dato",
            type: "getAllDatos",
            key_rol: "d44194bf-cc69-410a-9be8-cd2878a74ed7",
            key_usuario: this.key_usuario,
        }).then(e => {
            this.setState({ data: e.data })
        })
    }

    handleOnPress = (obj) => {
        SNavigation.navigate("/datos/registro", {
            key_usuario: this.key_usuario,
            descripcion: obj.descripcion,
            observacion: obj.observacion,
            dato: obj.dato,
            tipo: obj.tipo,
            key: obj.key,
            onSucces: (e) => {
                this.componentDidMount();
            }


        });
    }
    renderItem = (obj) => {
        let color = STheme.color.card;
        let label = "Pendiente de registar"
        if (obj.dato) {
            color = STheme.color.warning
            label = "En proceso de verificación"
        }
        if (obj.key_usuario_verificador) {
            color = STheme.color.success
            label = "Verificado"
        }
        return <SView col={"xs-12"} card padding={12} onPress={this.handleOnPress.bind(this, obj)}>
            <SView row conl={"xs-12"} center>
                <SView width={16} height={16} borderRadius={50} backgroundColor={color} border={STheme.color.gray}>

                </SView>
                <SView width={8} />
                <SView flex>
                    <SText bold>{obj.descripcion}</SText>
                </SView>
            </SView>
        </SView>
    }
    render() {
        return (
            <SPage >
                <Container>
                    <SHr h={30} />
                    <SText bold fontSize={18}>{"Adjunta tus documentos"}</SText>
                    <SHr />
                    <SText fontSize={16}>{"Tus documentos serán verificados para que puedas hacer viajes."}</SText>
                    <SHr h={30} />
                    <SList
                        order={[{ key: "index", order: "asc" }]}
                        data={this.state.data}
                        space={16}
                        render={this.renderItem.bind(this)}
                    />
                </Container>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);