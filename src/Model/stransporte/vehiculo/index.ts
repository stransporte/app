import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "vehiculo"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "fecha_on": { type: "timestamp", },
        "fecha_edit": { type: "timestamp", },
        "estado": { type: "integer", },
        "key_usuario": { type: "text", fk: "usuario" },

        "marca": { type: "text", editable: true },
        "modelo": { type: "text", editable: true },
        "color": { type: "double", editable: true },
        // "filas": { type: "double", editable: true },
        // "asientos": { type: "double", editable: true },
        "tipo": { type: "text", editable: true },
        
    },
    image: {
        api: "root",
        name: "vehiculo"
    },
    Action,
    Reducer,
});