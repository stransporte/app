import React from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import Model from '../../Model';
import item from './item';
import { SHr, SIcon, SImage, SNavigation, SText, SView } from 'servisofts-component';
import { MenuButtom, MenuPages } from 'servisofts-rn-roles_permisos';

class index extends DPA.profile {
    constructor(props) {
        super(props, {
            Parent: Parent,
            item: item,
            excludes: [],

        });
    }
    $allowEdit() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "edit" })
    }
    $allowDelete() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "delete" })
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $getData() {
        return Parent.model.Action.getByKey(this.pk);
    }
    $footer() {
        // let detalle = Model.tbvd.Action.getAll({ idven: this.pk })
        // const productos = Model.tbprd.Action.getAll();
        // if (!detalle) return <SLoad />
        // if (!productos) return <SLoad />
        // return <SView col={"xs-12"}>
        //     <SList data={detalle} render={vd => {
        //         const producto = productos[vd.idprd]
        //         return <SView>
        //             <SText>{producto?.prdnom}</SText>
        //             <SText>Bs. {SMath.formatMoney(vd?.vdpre)}   X   {vd?.vdcan}</SText>
        //         </SView>
        //     }} />
        // </SView>
        return <SView col={"xs-12"}>
            <SHr height={20} />
            {/* <SView col={"xs-12"} onPress={() => {
                SNavigation.navigate("/parada", { key_ruta: this.pk })
            }} >
                <SView width={30} height={50} center>
                    <SImage source={require("../../Assets/img/parada.png")} style={{resizeMode: "cover",  width: "100%",
                height: "100%",}} />
                </SView>
                <SText>Paradas</SText>
            </SView> */}

            <MenuPages path={Parent.path + "/profile/"} permiso={"view"} params={{
                pk: this.pk
            }} >
                <MenuButtom url={"/parada"} params={{ pk: this.pk }}
                    icon={<SIcon name={"Parada"} />}  label={"Parada"}  />
            </MenuPages>
        </SView>
    }
}
export default connect(index);