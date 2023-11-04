import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "cliente"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "fecha_on": { type: "timestamp", },
        "fecha_edit": { type: "timestamp", },
        "estado": { type: "integer", },
        "key_usuario": { type: "text", fk: "usuario" },
        "descripcion": { type: "text", editable: true },
        "observacion": { type: "text", editable: true },
        "telefono": { type: "text", editable: true },
    },
    image: {
        api: "root",
        name: "cliente"
    },
    Action,
    Reducer,
});