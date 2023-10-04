import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SButtom, SHr, SIcon, SImage, SLoad, SNavigation, SPage, SText, STheme, SView, SInput, SPopup } from 'servisofts-component';
// import { AccentBar, PButtom } from '../../Components';
import Model from '../../Model';
import { GeolocationMapSelect } from 'servisofts-rn-geolocation'
import Btn from '../../Components/PButtom';
// import PopupAutoCompleteDireccion from './profile/Components/PopupAutoCompleteDireccion';
// import PopupAutoCompleteDireccion from './Components/PopupAutoCompleteDireccion';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.pk = SNavigation.getParam("pk");

        this.callback = SNavigation.getParam("callback");
        this.onSelect = SNavigation.getParam("onSelect");
        this.obj = SNavigation.getParam("obj");
        this.callback2 = SNavigation.getParam("callback2");
        this.hiddeDescripcion = SNavigation.getParam("hiddeDescripcion");
        this.hiddeReferencia = SNavigation.getParam("hiddeReferencia");

        this.lat = SNavigation.getParam("lat");
        this.lon = SNavigation.getParam("lon");
        this.all = SNavigation.getAllParams()
    }

    getImput() {
        if (this.hiddeDescripcion) return null;
        return <SView col={"xs-12"} >
            <SInput fontSize={16} placeholder={"Nombre de la Ubicación"}
                isRequired={true}
                height={48}
            // ref={(ref) => { this.inpNombreUbicacion = ref }}
            />
        </SView>
    }

    getComponentBottom() {
        return <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"} height={280} row center>
            <SHr height={10} />
            <SView col={"xs-11"} center row border={'transparent'}>
                {/* {this.getImput()}
                <SHr height={5} /> */}
                <SView col={"xs-12"}>
                    {/* <SHr height={5} />
                    <SInput fontSize={16} placeholder={"Referencia"}
                        isRequired={true}
                        height={48}
                        ref={(ref) => { this.inpReferencia = ref }}
                    /> */}
                    <SHr height={5} />
                    <SInput
                        height={48}
                        style={{
                            backgroundColor: STheme.color.card,
                            fontSize: 14
                        }}
                        editable={false}
                        placeholder={"¡Busca una dirección!"}
                        value={this.state?.data?.direccion ? `${this.state?.data?.direccion.substring(0, 40)}${this.state?.data?.direccion.length > 40 ? "..." : ""}` : ""}
                        // value={this.state?.data?.direccion}

                        // onPress={() => {
                        //     SPopup.open({
                        //         key: "autocomplete",
                        //         content:
                        //             <PopupAutoCompleteDireccion region={this.state.data} callback={(resp) => {
                        //                 SPopup.close("autocomplete");
                        //                 this.state.data = resp;
                        //                 console.log(resp)
                        //                 this.map.getMap().animateToRegion({
                        //                     ...resp,
                        //                     latitudeDelta: 0.01,
                        //                     longitudeDelta: 0.01
                        //                 }, 1000);

                        //                 this.setState({ ...this.state });
                        //             }} />
                        //     });
                        // }}
                        iconR={<SIcon name={"SearchTapeke"} width={40} height={18} fill={STheme.color.primary} />}
                    />
                </SView>
            </SView>
            <SHr />
            {/* <SView col={"xs-12"} row center border={'transparent'}>
                <SView width={40} center>
                    <SIcon name={'LocationTapeke'} height={14} width={14} />
                </SView>
                <SView width={200} onPress={() => {
                    this.map.getMap().center();
                    // console.log("TODO: center map")
                }}>
                    <SText fontSize={15} bold>Utilizar mi ubicación actual</SText>
                </SView>
            </SView>
            <SHr /> */}
            <SView col={"xs-8.8"} row center border={'transparent'}  >
                <Btn loading={this.state.loading} fontSize={16} onPress={() => {
                    var descripcion = "";
                    var referencia = "";
                    if (this.all?.onSelect) {
                        this.all.onSelect(this.state?.data);
                        SNavigation.goBack();
                    }
                }}>ELEGIR ESTA UBICACIÓN</Btn>
            </SView>
            <SHr height={10} />
        </SView>
    }
    render() {
        return (
            <SPage center disableScroll>
                {/* <SText>Ubicación en Mapa</SText> */}
                {/* <SHr /> */}
                <GeolocationMapSelect
                    initialRegion={{
                        latitude: !!(this?.all?.lat) ? this?.all?.lat : -17.783799,
                        longitude: !!(this?.all?.lon) ? this?.all?.lon : -63.180,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1
                    }}
                    ref={(map) => this.map = map}
                    icon={<SIcon name="MarcadorMapa" width={25} height={40} />}
                    onChange={(evt) => {
                        this.setState({ data: evt })
                    }} />
                {this.getComponentBottom()}
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);