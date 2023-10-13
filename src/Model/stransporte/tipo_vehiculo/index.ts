import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "tipo_vehiculo"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "fecha_on": { type: "timestamp", },
        "estado": { type: "integer", },
        
        "Nombre": { type: "text", editable: true },
        "nroFilas": { type: "text", editable: true },
        "nroAsientos": { type: "double", editable: true },
      
    },
    image: {
        api: "root",
        name: "tipo_vehiculo"
    },
    Action,
    Reducer,
});