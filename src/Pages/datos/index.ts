import { SPage } from 'servisofts-component';

import root from './root';
import registro from './registro';
import pendiente_verificacion from './pendiente_verificacion';
export const Parent = {
    name: "datos",
    path: "/datos"
}
export default SPage.combinePages(Parent.name, {
    "": root,
    registro,
    pendiente_verificacion

});