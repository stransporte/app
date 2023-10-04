import { SPage } from "servisofts-component";
import dato from "./dato";
import root from "./root";
export default SPage.combinePages("ajustes",
    {
        "": root,
        ...dato
    }
)