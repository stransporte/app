import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "tipo_vehiculo"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "key_usuario": { type: "text", fk: "usuario" },
        "fecha_on": { type: "timestamp", },
        "estado": { type: "integer", },

        "descripcion": { type: "text", editable: true },
        "observacion": { type: "text", editable: true },
        "w": { type: "integer", editable: true },
        "h": { type: "integer", editable: true },

    },
    image: {
        api: "root",
        name: "tipo_vehiculo"
    },
    Action,
    Reducer,
});