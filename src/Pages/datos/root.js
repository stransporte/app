import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SInput, SList, SLoad, SNavigation, SNotification, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import { Container, Link } from '../../Components';
import SSocket from 'servisofts-socket'
import Model from '../../Model';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key_usuario = SNavigation.getParam("key_usuario");
        if (!this.key_usuario) {
            SNavigation.goBack();
        }
        // this.key_usuario = Model.usuario.Action.getKey()
    }
    componentDidMount() {
        if (!this.key_usuario) return null;
        SSocket.sendPromise({
            component: "dato",
            type: "getAllDatos",
            key_rol: "d44194bf-cc69-410a-9be8-cd2878a74ed7",
            key_usuario: this.key_usuario,
        }).then(e => {
            this.setState({ data: e.data })
        })

        SSocket.sendPromise({
            component: "usuario_verificado",
            type: "getByKeyUsuario",
            key_usuario: this.key_usuario
        }).then(e => {
            this.setState({ usuario_verificado: e.data })
        }).catch(e => {
            console.error(e);
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
            key_usuario_verificador: obj.key_usuario_verificador,
            fecha_verificacion: obj.fecha_verificacion,
            key_usuario_dato: obj.key_usuario_dato,
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


    obsinput: SInput
    renderVirify = () => {
        let permiso = Model.usuarioPage.Action.getPermiso({ url: "/datos", permiso: "verificar", loading: "" });
        if (!this?.state?.usuario_verificado) return <SLoad />
        if (!permiso) {

            if (this?.state?.usuario_verificado.key) {
                return <SView>
                    <SText>Ya estas verificado</SText>
                </SView>
            } else {
                return <SView>
                    <SText>Aun no estas verificado, adjunta tus documentos y espera la aprobacion.</SText>
                </SView>
            }
        }

        if (this?.state?.usuario_verificado.key) {
            const { key_usuario_admin, fecha_on, observacion } = this.state.usuario_verificado
            return <SView>
                <SText color={STheme.color.success}>El usuario fue verificado en la fecha {fecha_on} por el administrador </SText>
                <Link src={"/usuario/profile"} params={{ pk: key_usuario_admin }}>{key_usuario_admin}</Link>
                <SHr />
                <SText bold>Observación: {observacion}</SText>
                <SHr />

                <Link onPress={() => {
                    SPopup.confirm({
                        title: "¿Seguro que quieres quitar la verificación al usuario?",
                        onPress: async () => {

                            SSocket.sendPromise({
                                component: "usuario_verificado",
                                type: "editar",
                                key_usuario: Model.usuario.Action.getKey(),
                                data: {
                                    ...this.state.usuario_verificado,
                                    estado: 0,
                                }
                            }).then(e => {
                                this.setState({
                                    usuario_verificado: {}
                                })
                            }).catch(e => {
                                SNotification.send({
                                    title: "Error al quitar la verificación del usuario.",
                                    body: e?.error,
                                    color: STheme.color.danger,
                                    time: 5000,
                                })
                            })
                        }
                    })
                }} color={STheme.color.danger}>{"Quitar verificación"}</Link>
                {/* <SText>Observacion: {observacion}</SText> */}
            </SView>
        }
        return <SView col={"xs-12"}>
            <SHr h={1} color={STheme.color.gray} />
            <SHr />
            <SText bold>HABILITA AL CONDUCTOR</SText>
            <SText fontSize={12} color={STheme.color.warning} >Una vez tengas los documentos verificados, puedes habilitar al conductor para que pueda iniciar sus viajes.</SText>
            <SHr />
            <SInput
                ref={ref => this.obsinput = ref}
                type='textArea'
                placeholder={"Escribe aquí la observación"}
            />
            <SHr />
            <Link onPress={() => {
                const obs = this.obsinput.getValue();
                if (!obs) {
                    SNotification.send({
                        title: "Verificación de usuario",
                        body: "La observación no puede ser vacía.",
                        color: STheme.color.danger,
                        time: 5000,
                    })
                    return null;
                }
                SSocket.sendPromise({
                    component: "usuario_verificado",
                    type: "registro",
                    key_usuario: Model.usuario.Action.getKey(),
                    data: {
                        key_usuario: this.key_usuario,
                        observacion: obs

                    }
                }).then(e => {
                    this.setState({ usuario_verificado: e.data })
                }).catch(e => {
                    SNotification.send({
                        title: "Error al verificar usuario.",
                        body: e?.error,
                        color: STheme.color.danger,
                        time: 5000,
                    })
                })
            }}>HABILITAR</Link>
        </SView>
    }
    render() {
        return (
            <SPage onRefresh={(resolve) => {
                this.componentDidMount();
                if (resolve) resolve();
            }}>
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
                    <SHr h={30} />
                    {this.renderVirify()}
                </Container>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);