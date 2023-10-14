import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SImage, SLoad, SNavigation, SPage, STable2, SText } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import Model from '../../Model';
import { Btn, Link } from '../../Components';
import { Linking } from 'react-native';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        SSocket.sendPromise({
            component: "dato",
            type: "getPendientesVerificacion",
            key_rol: "d44194bf-cc69-410a-9be8-cd2878a74ed7",
        }).then(e => {
            this.setState({ data: e.data })
        }).catch(e => {
            this.setState({ error: e })
        })
    }
    render() {
        const usuarios = Model.usuario.Action.getAll();
        let enviroments = Model.enviroments.Action.getAll();
        if (!this.state?.data || !usuarios || !enviroments) return <SLoad />

        return (
            <SPage title={'Datos pendientes de verificacion'} disableScroll>
                <STable2
                    header={[
                        { key: "index", width: 50 },
                        { key: "key_usuario-foto", label: "Foto", width: 80, component: (k) => <SImage src={SSocket.api.root + "usuario/" + k} /> },
                        { key: "key_usuario", label: "Usuario", width: 200, render: (k) => `${usuarios[k].Nombres} ${usuarios[k].Apellidos}` },
                        {
                            key: "key_usuario-telefono", label: "Telefono", width: 120, render: (k) => `${usuarios[k].Telefono}`, component: (e) => <Link onPress={() => {
                                const message = enviroments?.wathsapp?.data;
                                Linking.openURL(`whatsapp://send?text=${encodeURIComponent(message)}&phone=` + e)
                            }}>{e}</Link>
                        },
                        // { key: "key_usuario-tel", label: "Telefono", width: 150, render: (k) => `${usuarios[k].Telefono}` },
                        { key: "docs-cantidad", label: "# Documentos", center: true, width: 100, render: (k) => `${Object.values(k).length}` },
                        { key: "docs-cantidad-pendiente", order: "desc", label: "Pendientes", center: true, width: 100, render: (k) => `${Object.values(k).filter(a => !a.fecha_verificacion).length}` },
                        { key: "key_usuario-verperfil", label: "Ver perfil", width: 100, component: (k) => <Link onPress={() => SNavigation.navigate("/usuario/profile", { pk: k })}>Perfil</Link> },
                        { key: "key_usuario-verdato", label: "Ver", width: 100, component: (k) => <Link onPress={() => SNavigation.navigate("/datos", { key_usuario: k })}>Documentos</Link> },
                    ]}
                    data={this.state.data} />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);