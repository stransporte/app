import React, { Component } from 'react'
import SSocket from 'servisofts-socket'
import { SImage, SLoad, SMapView, SMath, SNavigation, SPage, SPopup, STable2, SText, STheme, SView } from 'servisofts-component'
import { SelectEntreFechas } from '../../Components/Fechas'
import MarkerCircle from '../../Components/Marker/MarkerCircle';
export default class index extends Component {
    componentDidMount() {
        if (!SNavigation.getParam("idemp")) {
            SNavigation.goBack();
            SPopup.alert("Usted no tiene un idemp")
        }
    }
    getData({ fecha_inicio, fecha_fin }) {

        const request = {
            component: "tbcli",
            type: "getSinPedidos",
            fecha_inicio: fecha_inicio,
            fecha_fin: fecha_fin,
            idemp: SNavigation.getParam("idemp")
        }
        this.setState({ loading: true })
        SSocket.sendHttpAsync(SSocket.api.root + "api", request).then(e => {
            this.setState({ data: e.data, loading: false })
            console.log(e);
        }).catch(e => {
            this.setState({ loading: false, error: e?.error })
            console.error(e);
        })
    }

    renderMarker = ({ latitude, longitude, data }) => {
        console.log(SSocket.api.root + "/tbcli/" + data?.idcli + "");
        return <SMapView.SMarker latitude={latitude} longitude={longitude}  >
            <SView style={{
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 100,
                borderWidth: 2,
                borderColor: STheme.color.text,
                backgroundColor: STheme.color.card,
            }} onPress={() => {
                SNavigation.navigate("/tbcli/profile", { pk: data.idcli + "" })
            }}>
                <SView style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    borderRadius: 100,
                    overflow: "hidden",
                }}>
                    <SImage src={SSocket.api.root + "tbcli/" + data?.idcli + ""} style={{
                        resizeMode: "cover"
                    }} />
                </SView>
                <SView style={{
                    position: "absolute",
                    width: 30,
                    height: 30,
                    right: -10,
                    top: -10,
                    borderRadius: 100,
                    overflow: "hidden",
                    backgroundColor: STheme.color.danger,
                }} center>
                    <SText fontSize={14} color={STheme.color.white}>{data.cantidad}</SText>
                </SView>
            </SView>
        </SMapView.SMarker>
    }
    render_map() {
        if (this.state?.loading || !this.state?.data) return <SLoad />
        const arrLatLng = []
        this.state.data.map(o => {
            if (!o.clilat || !o.clilon) return;
            arrLatLng.push({ latitude: o.clilat, longitude: o.clilon, data: o })
        })
        if (!arrLatLng) return <SText>Eror</SText>
        if (!arrLatLng.length) return <SText>Eror</SText>
        return <SMapView ref={map => {
            if (map) this.map = map
            this.map.fitToCoordinates(arrLatLng, {})
        }}>
            <></>
            {arrLatLng.map(o => MarkerCircle({
                latitude: o.latitude,
                longitude: o.longitude,
                src: SSocket.api.root + "/tbcli/" + o.data?.idcli + "",
                cantidad: o.data?.cantidad,
                content: o.data?.clinom,
                onPress: () => SNavigation.navigate("/tbcli/profile", { pk: o.data.idcli + "" })
            }))}
        </SMapView>
    }
    render() {
        return (
            <SPage title="Clientes sin pedidos" disableScroll>
                <SelectEntreFechas onChange={e => this.getData(e)} />
                <SView flex>
                    {this.render_map()}
                </SView>
            </SPage>
        )
    }
}