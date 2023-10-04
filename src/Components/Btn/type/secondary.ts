import { STheme } from "servisofts-component";
import { ButtomType } from "..";

const index = (): ButtomType => {
    return {
        viewProps: {
            height: 40,
            center: true,
            borderRadius: 8,
            style: {
                borderWidth: 1,
                borderColor: STheme.color.secondary
            }
        },
        textProps: {
            color: STheme.color.secondary,
            fontSize: 18,
            // bold: true,
            // width: "100%",
            // style: {
            //     flex: 1,
            // },
        }
    }
}
export default index;