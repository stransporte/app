import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SImage, SLoad, SNavigation, SPage, STable2, SText } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import Model from '../../Model';
import { Btn } from '../../Components';
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
        })
    }
    render() {
        const usuarios = Model.usuario.Action.getAll();
        if (!this.state?.data || !usuarios) return <SLoad />

        return (
            <SPage title={'index'} disableScroll>
                <STable2
                    header={[
                        { key: "index", width: 50 },
                        { key: "key_usuario-foto", label: "Foto", width: 80, component: (k) => <SImage src={SSocket.api.root + "usuario/" + k} /> },
                        { key: "key_usuario", label: "Usuario", width: 200, render: (k) => `${usuarios[k].Nombres} ${usuarios[k].Apellidos}` },
                        // { key: "key_usuario-tel", label: "Telefono", width: 150, render: (k) => `${usuarios[k].Telefono}` },
                        { key: "docs-cantidad", label: "Pendientes", center: true, width: 100, render: (k) => `${Object.values(k).length}` },
                        { key: "key_usuario-verperfil", label: "Ver perfil", width: 150, component: (k) => <Btn onPress={() => SNavigation.navigate("/usuario/profile", { pk: k })}>VER PERFIL</Btn> },
                        { key: "key_usuario-verdato", label: "Ver", width: 150, component: (k) => <Btn onPress={() => SNavigation.navigate("/datos", { key_usuario: k })}>VER DOCS</Btn> },
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