import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SImage, SList, SList2, SLoad, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import { Btn, Container, Link } from '../../Components';
import SSocket from 'servisofts-socket'
import Model from '../../Model';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.params = SNavigation.getAllParams();
    }


    getVerificar() {

        const { key, key_usuario, fecha_verificacion, dato, key_usuario_verificador } = this.params;

        if (!dato) return null;

        let permiso = Model.usuarioPage.Action.getPermiso({ url: "/datos", permiso: "verificar", loading: "" });
        if (!permiso) {
            if (fecha_verificacion) {
                return <SText color={STheme.color.success}>El dato fue verificado en la fecha {fecha_verificacion} </SText>
            }
            return <>
                <SHr h={50} />
                <SLoad type='bar' color={STheme.color.warning} />
                <SText center color={STheme.color.warning}>Los datos estan siendo verificados. Esta accion puede demorar varios días.</SText>
            </>
        }

        if (fecha_verificacion) {
            return <SView>
                <SText color={STheme.color.success}>Hola admin, El dato fue verificado en la fecha {fecha_verificacion} por el usuario </SText>
                <Link src={"/usuario/profile"} params={{ pk: key_usuario_verificador }}>{key_usuario_verificador}</Link>
            </SView>
        }
        return <SView col={"xs-12"}>
            <SHr h={100} />
            <SText fontSize={12} color={STheme.color.gray} justify>Esta sección solo puede ser vista por un administrador, antes de verificar el dato revise detalladamente que cumpla las normas y las políticas de la applicación.</SText>
            <SHr />
            <Btn padding={8} onPress={() => {
                SPopup.confirm({
                    title: "¿Está seguro de verificar el documento?",
                    message: "Al verificar el dato del usuario usted asumirá la responsabilidad de la veracidad del documento.",
                    onPress: () => {
                        this.setState({ loading: true })
                        SSocket.sendPromise({
                            component: "usuario_dato",
                            type: "verificar",
                            key_usuario: key_usuario,
                            observacion: "",
                            key_dato: key,
                            key_usuario_verificador: Model.usuario.Action.getKey(),
                        }, 3000).then(e => {
                            if (this.params.onSucces) {
                                this.params.onSucces(e);
                            }
                            SNavigation.goBack();
                            this.setState({ loading: false })
                        }).catch(e => {
                            this.setState({ loading: false })
                        })
                    }
                })
            }}>VERIFICAR</Btn>
        </SView>
    }
    getFoto(defaultValue) {
        return < SView card col={"xs-12"}>
            <SImage source={{ uri: SSocket.api.root + "document/" + key_usuario + "/" + defaultValue }} />
        </SView>
    }
    render() {
        const { key, tipo, observacion, descripcion, key_usuario, dato, fecha_verificacion, key_usuario_dato } = this.params;
        console.log(this.params)
        let defaultValue = dato
        let arr = [defaultValue];
        if (tipo == "files") {
            if (defaultValue) {
                defaultValue = JSON.parse(dato);
            }
            if (defaultValue) {
                arr = [...defaultValue];
            }
        }
        // let defaultValue = JSON.parse(dato);

        console.log(defaultValue);

        return (
            <SPage >
                <Container >
                    <SHr />
                    <SText bold fontSize={18}>{descripcion} </SText>
                    <SHr />
                    <SText >{observacion} </SText>
                    {fecha_verificacion ?
                        <SView col={"xs-12"} center >
                            <SHr h={20} />
                            <SList2
                                // horizontal
                                center
                                space={10}
                                data={arr}
                                render={(data) => {
                                    return <SView col={"xs-12 sm-5 md-5 lg-5 xl-5 xxl-5"} height={150} card style={{ padding: 5 }}>
                                        <SImage enablePreview src={SSocket.api.root + "document/" + key_usuario + "/" + key + "/" + data} style={{
                                            width: "100%",
                                            height: "100%",
                                            resizeMode: "contain"
                                        }} />
                                    </SView>
                                }}
                            />

                        </SView>
                        :
                        <>

                            <SForm
                                ref={ref => this.form = ref}
                                inputs={{
                                    [key]: { type: tipo, defaultValue: defaultValue, filePath: SSocket.api.root + "document/" + key_usuario + "/" },
                                }}
                                onSubmitName={"GUARDAR"}
                                loading={this.state.loading}
                                onSubmit={(values) => {
                                    this.setState({ loading: true });
                                    this.form.uploadFiles2(SSocket.api.root + "upload/document/" + key_usuario + "/").then(e => {
                                        let value = values[key];
                                        if (Array.isArray(value)) {
                                            if (value.length <= 0) {
                                                value = ""
                                            }
                                        }
                                        SSocket.sendPromise({
                                            component: "usuario_dato",
                                            type: "registro",
                                            key_usuario: key_usuario,
                                            data: {
                                                key_usuario_perfil: key_usuario,
                                                key_dato: key,
                                                descripcion: value
                                            }
                                        }).then((e) => {
                                            this.setState({ loading: false });
                                            if (this.params.onSucces) {
                                                this.params.onSucces(e);
                                            }
                                            SNavigation.goBack();
                                        }).catch(e => {
                                            this.setState({ loading: false });
                                        })

                                    }).catch(e => {
                                        this.setState({ loading: false });
                                        console.error(e);
                                    })
                                }}
                            />

                        </>
                    }
                    <SHr h={20} />
                    {key_usuario_dato ? <Link color={STheme.color.danger} onPress={() => {
                        SPopup.confirm({
                            title: "¿Está seguro de eliminar el documento?",
                            message: "TODO.",
                            onPress: () => {
                                this.setState({ loading: true })
                                SSocket.sendPromise({
                                    component: "usuario_dato",
                                    type: "editar",
                                    data: {
                                        key: key_usuario_dato,
                                        dato: "",
                                        fecha_verificacion: null,
                                        estado: 0,
                                    },
                                    key_usuario_verificador: Model.usuario.Action.getKey(),
                                }, 3000).then(e => {
                                    if (this.params.onSucces) {
                                        this.params.onSucces(e);
                                    }
                                    SNavigation.goBack();
                                    this.setState({ loading: false })
                                }).catch(e => {
                                    this.setState({ loading: false })
                                })
                            }
                        })
                    }}>Eliminar</Link>
                        : null}
                    <SHr h={20} />
                    {this.getVerificar()}
                    <SHr />

                </Container>
            </SPage >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);