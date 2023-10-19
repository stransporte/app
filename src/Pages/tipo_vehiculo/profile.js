import React from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import Model from '../../Model';
import item from './item';
import { TipoVehiculo } from '../../Components';
import { SHr, SView } from 'servisofts-component';

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
        console.log(this.data)
        console.log("kkk")
        return <SView col={"xs-12"}>
            <SHr height={16} />
            <TipoVehiculo.Tipo width={this.data.w} height={this.data.h} data={this.data}
                titulo="prueba"
                icon="Clientes" />
        </SView>
    }
}
export default connect(index);