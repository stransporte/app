import { SPage } from "servisofts-component";

import root from "./root";
import test from "./test"
import conductores from "./conductores"
import rastreo from "./rastreo"
import select from "./select";
export default SPage.combinePages("mapa",
    {
        "": root,
        test,
        conductores,
        rastreo,
        select
    }
)