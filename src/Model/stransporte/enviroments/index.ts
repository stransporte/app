import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "enviroments"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "data": { type: "text", editable: true },
        "fecha_on": { type: "timestamp", label: "Fecha de registro" },
        "estado": { type: "integer" },
    },
    Action,
    Reducer,
});