import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SIcon, SImage, SLoad, SMarker, SMath, SNavigation, SPage, SPopup, SText, STheme, SView, SMapView, SInput, SMapView2, SThread } from 'servisofts-component';
import { BottomNavigator, Container, FloatButtomTap, Gradient, TopBar } from '../../Components';

import SSocket, { setProps } from 'servisofts-socket';
import Pedido from '../../Components/Pedido';
import Model from '../../Model';
import Pasajero from '../../Components/Pasajero';
class index extends Component {

    constructor(props) {
        super(props)
        this.state = {
            region: {
                latitude: -17.7833276,
                longitude: -63.1821408,
            }
        };
        this.idruta = SNavigation.getParam("pk");
    }

    componentDidMount() {
        SSocket.sendPromise({
            component: "ruta",
            type: "getByKey",
            key: this.idruta,
        }).then(e => {
            console.log(e);
            // this.state.data = e.data[this.idruta];
            this.setState({ data: e.data[this.idruta] })
        }).catch(e => {
            console.error(e);
        })
        this.isRun = true;
        this.hilo();
    }

    // componentWillUnmount() {
    //     this.isRun = false;
    // }

    hilo() {
        if (!this.isRun) return;
        new SThread(5000, "hilo_rastreo", true).start(() => {
            if (!this.isRun) return;
            this.sync_location();
            this.hilo();

        })
    }

    sync_location() {
        if (!this.state?.usuario?.key) return;
        Model.background_location.Action.getByKeyAsync(this.state?.usuario?.key).then(r => {
            console.log("actualiza/repinta la ubicacion conductor", r);
            this.state.posicion_conductor = r.data;
            this.setState({ ...this.state });
        }).catch(r => {
            console.log(r)
        })
    }
    getMarkersParadas() {
        let paradas = Model.parada.Action.getAllBy({ key_ruta: this.idruta });
        if (!paradas) return null;
        return Object.values(paradas).map((parada, key) => {
            return <SMapView.SMarker width={50} height={50} latitude={parada.latitude} longitude={parada.longitude} >
                <SIcon name={"MarcadorMapa"} width={50} height={50} fill={STheme.color.primary} />
            </SMapView.SMarker>
        });
    }

    showMapa() {
        console.log("AQUIII")
        console.log(this.state.data)
        return <SView col={"xs-12"} flex center >
            <SMapView
                initialRegion={{
                    latitude: parseFloat(this.state.data?.latitude_ini),
                    longitude: parseFloat(this.state.data?.longitude_ini),
                    latitudeDelta: 0.0722,
                    longitudeDelta: 0.0421,
                }}
                preventCenter>
                <></>
                {this.getMarkersParadas()}
            </SMapView>
        </SView>
    }

    showCards() {
        return <SView height={200} style={{ backgroundColor: STheme.color.primary, borderTopLeftRadius: 16, borderTopRightRadius: 16, overflow: "hidden" }}>
            <Gradient style={{ overflow: 'hidden' }} />
            {/* <Pedido.BotonesEstado data={this.props.data} posicion_conductor={this.state?.posicion_conductor} /> */}


            <Pasajero.BotonesEstado data={this.state.data} />
        </SView>
    }


    render() {
        console.log("this.state.data")
        console.log(this.state.data)
        if (!this.state.data) return <SLoad />

        return <SPage disableScroll
            title={"Acércate a la ruta"}
        // hidden
        // footer={this.footer()}
        >
            <SView col={"xs-12"} flex height backgroundColor={STheme.color.card}   >
                <SView col={"xs-12"} flex>
                    {this.showMapa()}
                    {/* <FloatButtomTap onPress={() => {
                        this.sync_location();
                    }} /> */}
                </SView>
                {this.showCards()}
            </SView>

        </SPage>
    }


    // footer() {
    //     return <BottomNavigator url={"/pedidos"} />
    // }

}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);