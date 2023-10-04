import { SPage, SPageListProps } from 'servisofts-component';

import root from './root';
import ruta from "./ruta"

export default SPage.combinePages("viajar", {
    "": root,
    ruta
});
