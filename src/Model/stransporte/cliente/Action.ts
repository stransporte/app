import { SStorage } from "servisofts-component";
import { SAction } from "servisofts-model";
export default class Action extends SAction {
    setState(data: any) {
        this._dispatch({
            ...this.model.info,
            type: "setState",
            ...data,
        });
    }
    getState() {
        return this._getReducer()
    }

    setCliente = (cliente: any) => {

        // this._dispatch({
        //     component: "cliente",
        //     type: "setCliente",
        //     data: cliente,
        // })

        SStorage.setItem("cliente", JSON.stringify(cliente));
    }

    getCliente() {
        var cliente;
        SStorage.getItem("cliente", (resp: any) => {
            if (!resp) return;
            cliente = JSON.parse(resp);
        });
        return cliente;
    }

}