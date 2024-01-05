import React from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from "."
import Model from '../../Model';
import item from './item';
import { SNavigation } from 'servisofts-component';
// import item from './item';

class index extends DPA.list {
    constructor(props) {
        super(props, {
            Parent: Parent,
            title: "Lista de " + Parent.name,
            // item: item,
            //excludes: ['usest','iniciales','modpreven','idcentro','suctod','usultsuc','verval','selcob','autcred','pcpred','facauto','uimpr'],
            onRefresh: (resolve) => {
                Parent.model.Action.CLEAR();
                resolve();
            }
        });
    }
    $allowNew() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" });
    }

    onNew() {
        SNavigation.navigate("/parada/new", {
            key_ruta: this.props.route.params.key_ruta
            
        });
    }
    $allowTable() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "table" });
    }
    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "ver" })
    }
    $filter(data) {
        console.log(data)
        console.log(this.props.route.params.key_ruta)
        // return data.estado != "0" 
        return data.estado != "0" && data.key_ruta == this.props.route.params.key_ruta
    }
    $getData() {
        return Parent.model.Action.getAll();
    }
    
}
export default connect(index);