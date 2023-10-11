import { SPage, SPageListProps } from 'servisofts-component';

import root from './root';
// import carga from "./carga"
export const Parent = {
  name: "reserva",
  path: "/reserva"
}

export default SPage.combinePages(Parent.name, {
  // "": carga,
  "": root,

});
