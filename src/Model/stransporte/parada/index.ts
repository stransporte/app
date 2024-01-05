import { SModel } from "servisofts-model";
import Action from "./Action";
import Reducer from "./Reducer";

export default new SModel<Action, Reducer>({
    info: {
        component: "parada"
    },
    Columns: {
        "key": { type: "text", pk: true },
        "key_ruta": { type: "text", fk: "ruta" },
        "fecha_on": { type: "timestamp", },
        "fecha_edit": { type: "timestamp", },
        "estado": { type: "integer", },
        "key_usuario": { type: "text", fk: "usuario" },
        "key_usuario_edit": { type: "text", fk: "usuario" },
        "descripcion": { type: "text", editable: true },
        "observacion": { type: "text", editable: true },
        "latitude": { type: "double", editable: true },
        "longitude": { type: "double", editable: true },
        "direccion": { type: "text", editable: true },

        // "key": { type: "text", pk: true },
        // "fecha_on": { type: "timestamp", },
        // "fecha_edit": { type: "timestamp", },
        // "estado": { type: "integer", },
        // "key_usuario": { type: "text", fk: "usuario" },
        // "descripcion": { type: "text", editable: true },
        // "observacion": { type: "text", editable: true },
        // "monto": { type: "double", editable: true },
        // "latitude_ini": { type: "double", editable: true },
        // "longitude_ini": { type: "double", editable: true },
        // "direccion_ini": { type: "text", editable: true },
        // "latitude_fin": { type: "double", editable: true },
        // "longitude_fin": { type: "double", editable: true },
        // "direccion_fin": { type: "text", editable: true },
       
    },
    image: {
        api: "root",
        name: "parada"
    },
    Action,
    Reducer,
});