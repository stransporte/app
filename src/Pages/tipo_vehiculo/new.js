import React from 'react';
import DPA, { connect } from 'servisofts-page';
import { Parent } from '.';
import { SNavigation, SPopup } from 'servisofts-component';
import Model from '../../Model';

class index extends DPA.new {
    constructor(props) {
        super(props, {
            Parent: Parent,
            excludes: ["key", "fecha_on", "fecha_edit", "estado", "key_usuario"]
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
        // inp["observacion"].type = "textArea"
        // inp["monto"].type = "money"

        inp["direccion_ini"].value = this.state["ini"]?.direccion;
        inp["latitude_ini"].value = this.state["ini"]?.latitude;
        inp["longitude_ini"].value = this.state["ini"]?.longitude;
        inp["latitude_ini"].onPress = this.handleSelect.bind(this, "ini")
        inp["longitude_ini"].onPress = this.handleSelect.bind(this, "ini")

        inp["direccion_fin"].value = this.state["fin"]?.direccion;
        inp["latitude_fin"].value = this.state["fin"]?.latitude;
        inp["longitude_fin"].value = this.state["fin"]?.longitude;
        inp["latitude_fin"].onPress = this.handleSelect.bind(this, "fin")
        inp["longitude_fin"].onPress = this.handleSelect.bind(this, "fin")

        return inp;
    }
    $onSubmit(data) {
        Parent.model.Action.registro({
            data: data,
            key_usuario: Model.usuario.Action.getKey()
        }).then((resp) => {
            this.$submitFile(resp.data.key);
            SNavigation.goBack();
        }).catch(e => {
            console.error(e);

        })
    }
}

export default connect(index);