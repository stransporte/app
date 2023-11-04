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
        this._dispatch({
            component: "cliente",
            type: "setCliente",
            data: cliente,
        })
    }

}