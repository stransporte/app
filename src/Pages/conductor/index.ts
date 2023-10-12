import { SPage, SPageListProps } from 'servisofts-component';

import rutas from "./rutas"
import cola from "./cola"
import asientos from "./asientos"
import mapa_viaje from "./mapa_viaje"
export default SPage.combinePages("conductor", {
    // "": root,
    rutas,
    cola,
    asientos,
    mapa_viaje

});