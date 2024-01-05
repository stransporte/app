import React from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation, SPopup, SText, SView } from 'servisofts-component';
import Model from '../../Model';

class index extends DPA.new {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "fecha_on", "fecha_edit", "estado", "key_usuario", "key_usuario_edit", "key_ruta"]
        });
        this.state = {}
    }

    $allowAccess() {
        return Model.usuarioPage.Action.getPermiso({ url: Parent.path, permiso: "new" })
    }
    handleSelect(key) {
        SNavigation.navigate("/mapa/select", {
            onSelect: (latlng) => {

                this.state[key] = latlng
                this.setState({ ...this.state })
            }
        })
    }
    $inputs() {
        var inp = super.$inputs();
        inp["observacion"].type = "textArea"

        inp["direccion"].value = this.state["ini"]?.direccion;
        inp["latitude"].value = this.state["ini"]?.latitude;
        inp["longitude"].value = this.state["ini"]?.longitude;
        inp["latitude"].onPress = this.handleSelect.bind(this, "ini")
        inp["longitude"].onPress = this.handleSelect.bind(this, "ini")

       
        return inp;
    }
    $onSubmit(data) {
        Parent.model.Action.registro({
            data: data,
            key_ruta: this.props.route.params.key_ruta,
            key_usuario: Model.usuario.Action.getKey()
        }).then((resp) => {
            this.$submitFile(resp.data.key);
            SNavigation.goBack();
        }).catch(e => {
            console.error(e);

        })
    }
    $footer() {
        return <SView col={"xs-12"}>
           <SText>{this.props.route.params.key_ruta}</SText>
            </SView>
    }
}

export default connect(index);