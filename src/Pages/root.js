import React, { Component } from 'react';
import { SButtom, SHr, SIcon, SImage, SLoad, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import { MenuButtom, MenuPages } from 'servisofts-rn-roles_permisos';
import SSocket from "servisofts-socket"
import Model from '../Model';
import { connect } from 'react-redux';
class index extends Component {
    getIconProfile() {
        return <SView col={"xs-12"} height>
            <SView col={"xs-12"} height style={{
                // padding: 8
            }} >
                <SIcon name={"Perfil"} />
            </SView>
            <SImage
                src={SSocket.api.root + "usuario/" + Model.usuario.Action.getKey()}
                style={{ position: "absolute", resizeMode: "cover", borderWidth: 2, borderRadius: 12, borderColor: STheme.color.card, overflow: 'hidden', }}
            />
        </SView>
    }

    componentDidMount() {
        SSocket.sendPromise({
            component: "tipo_vehiculo",
            type: "getAll",
        }).then(e => {
            console.log("aquiiii");

            console.log(e);
            // this.setState({ data: e.data[0] })
        }).catch(e => {
            console.error(e);
        })
       
    }

    datosUser() {
        var dataUser = Model.usuario.Action.getUsuarioLog();
        if (!dataUser) return <SLoad />
        return <SView style={{ alignItems: "flex-end" }}>
            <SView
                style={{
                    backgroundColor: STheme.color.primary + "50",
                    padding: 6,
                    borderTopLeftRadius: 25,
                    borderBottomLeftRadius: 25,
                    borderTopRightRadius: 15,
                    borderBottomRightRadius: 15,
                    position: "relative", top: 0,
                    right: 10,
                }}
                width={165} row
            >
                <SView height={30} width={30}>
                    <SImage
                        src={SSocket.api.root + "usuario/" + Model.usuario.Action.getKey()}
                        style={{ position: "absolute", resizeMode: "cover", borderWidth: 2, borderRadius: 25, borderColor: STheme.color.card, overflow: 'hidden', }}
                    />
                </SView>
                <SView width={5} />
                <SView flex style={{ alignItems: "flex-end" }}>
                    <SText fontSize={12}>{dataUser?.Nombres}</SText>
                    <SText fontSize={10}>{dataUser?.Correo}</SText>
                </SView>
                <SView width={4} />
            </SView>
            <SView style={{ position: "absolute", top: 18 }}>
                <SIcon name='Cola' height={10} width={10} fill={STheme.color.primary + "50"} />
            </SView>
        </SView>
    }
    render() {
        if (!Model.usuario.Action.getKey()) {
            SNavigation.goBack();
            return <SLoad />
        }
        const user = Model.usuario.Action.getUsuarioLog();
        return <SPage preventBack hidden onRefresh={(resolve) => {
            Model.usuario.Action.syncUserLog();
            Model.usuarioPage.Action.CLEAR();
            if (resolve) resolve();
        }}  >
            <SHr height={10} />
            {this.datosUser()}
            <SHr height={8} />
            <SView col={"xs-12"} center height={100}>

                <SView width={200} flex>
                    <SIcon name={"LogoClear"} fill={STheme.color.primary} />
                </SView>
            </SView>
            <SHr height={8} />
            <SView col={"xs-12"} center>
                {/* <SText center fontSize={18}>BIENVENIDO AL SISTEMA ADMINISTRATIVO</SText> */}
                <SHr />
                <SText col={"xs-11"} fontSize={18} center>Para poder trabajar registra tus documentos en la pestaña Mis documentos.</SText>
            </SView>

            <SHr height={32} />
            <SView col={"xs-12"} flex >
                <MenuPages path={"/"} permiso={"page"}>
                    {/* <MenuButtom label={"Verificacion de conductores"} url={"/datos/pendiente_verificacion"} icon={<SIcon name="Add"/>} /> */}
                    <MenuButtom label={"Mis documentos"} url={"/datos"} params={{ key_usuario: Model.usuario.Action.getKey() }} icon={<SIcon name="AdmDocumentos" />} />
                    <MenuButtom label={"Mi perfil"} url={"/perfil"} icon={this.getIconProfile()} />
                    <MenuButtom label={"Iniciar viaje"} url={"/conductor/rutas"} icon={<SIcon name="AdmViajar" />} />
                    <MenuButtom label={"Publicaciones"} url={"/publicacion"} icon={<SIcon name="AdmPublicaciones" fill='#fff' />} />
                    {/* <MenuButtom label={"Vehículo"} url={"/vehiculo"} icon={<SIcon name="AdmPublicaciones" fill='#fff' />} /> */}
                </MenuPages>
            </SView>
            {/* <SHr height={100} /> */}
        </SPage>
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);