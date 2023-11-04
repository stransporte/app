
import React, { Component } from 'react';
import { SForm, SHr, SIcon, SNavigation, SPopup, SText, SView } from 'servisofts-component';
// import Model from '../../../Model';
import { Parent } from '../../../';
import CryptoJS from 'crypto-js';
import Model from '../../../Model';

export default class SectionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    submit() {
        this.form.submit();
    }
    fadeOut() {
        Animated.timing(this.animSize, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true
        }).start(() => {
            this.state.width = 0;
            this.setState({ isOpen: false, });
        });
    }
    render() {
        return (
            <SView col={"xs-12"} center>
                <SForm
                    ref={(ref) => { this.form = ref; }}
                    props={{
                        col: "xs-12",
                    }}
                    inputProps={{
                        separation: 16,
                    }}
                    inputs={{
                        telefono: {
                            placeholder: "Teléfono",
                            isRequired: true, autoCapitalize: "none", type: "phone", onKeyPress: (evt) => {
                                if (evt.key === "Enter") {
                                    this.form.focus("password");
                                }
                            },
                            // icon: <SIcon name={"InputEmail"} width={40} height={30} />
                        },
                        // password: {
                        //     placeholder: "Contraseña",
                        //     type: "password", isRequired: true, onKeyPress: (evt) => {
                        //         if (evt.key === "Enter") {
                        //             this.form.submit();
                        //         }
                        //     },
                        //     // icon: <SIcon name={"InputPassword"} width={40} height={30} />
                        // },
                    }}
                    loading={this.state.loading}
                    error={this.state.error}
                    onSubmit={(data) => {
                        if (data) {
                            data["telefono"] = data["telefono"];
                            console.log(data)

                            // let dataa = Model.cliente.Action.getByKey(data["telefono"]);
                            // console.log("dataa")
                            // console.log(dataa)

                            // Model.cliente.Action.getByKey(data["telefono"]).then((resp) => {
                            //     console.log("respuesta")
                            //     console.log(resp)
                            //     if (resp.data.estado != "exito") {
                            //         SPopup.alert("Erro!!");
                            //         this.setState({ loading: false, error: "Usuario eliminado" })

                            //         Model.usuario.Action.unlogin();
                            //         SNavigation.navigate("/login");
                            //         this.fadeOut();
                            //     } else {
                            //         SNavigation.reset("/")
                            //     }
                            // }).catch(e => {
                            //     console.error(e);
                            // })


                            Model.cliente.Action.registro({
                                data: data,
                                //key_usuario: Model.usuario.Action.getKey()
                            }).then((resp) => {
                                console.log("respuesta")
                                console.log(resp)
                                // Model.cliente.Action._dispatch({
                                //     component: "cliente",
                                //     type: "onRegistro",
                                //     key: resp.data.key,

                                // })
                                
                                SNavigation.replace("/pasajero", { telefono: data.telefono })
                            }).catch(e => {
                                console.error(e);
                            })

                            Model.cliente.Action.setCliente(data.telefono);
                            // Model.cliente.Action.loginByKey(data).then((resp) => {
                            //     if (resp.data.estado == "0") {
                            //         SPopup.alert("Usuario eliminado");
                            //         this.setState({ loading: false, error: "Usuario eliminado" })

                            //         Model.usuario.Action.unlogin();
                            //         SNavigation.navigate("/login");
                            //         this.fadeOut();
                            //     } else {
                            //         SNavigation.reset("/")
                            //     }

                            // }).catch((e) => {
                            //     this.setState({ loading: false, error: "Usuario o contraseña incorrectos." })
                            // })

                        }
                    }}
                />
            </SView >
        );
    }
}
