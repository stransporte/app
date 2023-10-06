import { SPage, SPageListProps } from 'servisofts-component';

import root from "./root"
import rutas from "./rutas"
import aviso_reserva from "./aviso_reserva"
import mapa_reserva from "./mapa_reserva"
// import recuperar from './recuperar';
// import recuperar_codigo from './recuperar_codigo';
// import recuperar_pass from './recuperar_pass';
export default SPage.combinePages("pasajero", {
    "": root,
    rutas,
    aviso_reserva,
    mapa_reserva
    // recuperar,
    // recuperar_codigo,
    // recuperar_pass

});