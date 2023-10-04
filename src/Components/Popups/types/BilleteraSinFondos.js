import React, { Component } from 'react';
import { SForm, SGradient, SHr, SImage, SLoad, SMath, SNavigation, SPage, SPopup, SStorage, SText, STheme, SView, SIcon } from 'servisofts-component';

type PropsType = {

}

export default class BilleteraSinFondos extends Component<PropsType> {
    static POPUP_CODE = "POPUP_BILLETERA SIN FONDO";
    static open(props: PropsType) {
        SPopup.open({
            key: this.POPUP_CODE,
            content: <BilleteraSinFondos {...props} />
        })
    }
    static close() {
        SPopup.close(this.POPUP_CODE)
    }
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    render() {
        return <SView width={362} height={290} center row style={{ borderRadius: 8 }} withoutFeedback backgroundColor={STheme.color.background}   >
            <SHr height={15} />
            <SView col={"xs-12"} height={35} center style={{ borderBottomWidth: 1, borderColor: STheme.color.primary }}>
                <SText color={STheme.color.darkGray} style={{ fontSize: 20 }} bold center >Billetera sin fondos</SText>
            </SView>
            <SHr height={15} />
            <SView col={"xs-11"} center row>
                <SView col={"xs-11"} center >
                    <SIcon height={100} name='BilleteraVacio'></SIcon>
                </SView>
                <SView col={"xs-11"} center>
                    <SHr height={8} />
                    <SText fontSize={14} color={STheme.color.primary}  >No tiene fondo suficiente en su billetera Tapeke.</SText>
                </SView>
            </SView>
            <SView col={"xs-12"} center>
                <SHr height={15} />
                <SView width={140} height={44} center backgroundColor={STheme.color.primary} style={{ borderRadius: 8 }}
                    onPress={() => {
                        // var data = ParentBilletera.Actions.getByKeyCliente(this.props.state.usuarioReducer.usuarioLog.key, this.props);
                        // if (!data) return <SLoad />;
                        // var montoTotal = 0;
                        // data.map((obj) => { montoTotal += obj.monto; })
                        SNavigation.navigate('/billetera')
                        BilleteraSinFondos.close();
                    }}  >
                    <SText fontSize={14} color={STheme.color.white} bold>Cargar crédito</SText>
                </SView>
                <SHr height={15} />
            </SView>
        </SView>
    }
}