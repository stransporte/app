import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SGradient, SHr, SIcon, SNavigation, SPage, STheme, SThread, SView } from 'servisofts-component';
import Model from '../Model';
import { Gradient } from '../Components';
import SSocket from 'servisofts-socket';
import PackageJSON from "../../package.json"

const versionToNumber = (v) => {
    const array = v.split("\.");
    const vl = 100;
    let vn = 0;
    for (let i = 0; i < array.length; i++) {
        const element = array[array.length - i - 1];
        const vp = Math.pow(vl, i);
        vn += (vp * element)
    }
    console.log(vn)
    return vn;
}

class index extends Component {
    state = {}
    componentDidMount() {
        this.run = true;
        new SThread(1500, "carga_hilo", false).start(() => {
            if (!this.run) return;
            if (Model.usuario.Action.getKey()) {
                SNavigation.replace("/root")
            } else {
                SNavigation.replace("/login")
                SNavigation.replace("/publicacion")
            }
        })

        SSocket.sendPromise({
            component: "enviroments",
            type: "getVersion",
        }).then(e => {
            const versionRequired = e.data
            if (versionToNumber(versionRequired) > versionToNumber(PackageJSON.version)) {
                SNavigation.replace("/version_required")
            }
        }).catch(e => {
            console.error(e)
        })
    }
    componentWillUnmount() {
        this.run = false;
    }
    renderFooter() {
        if (!this.state.layout) return null;
        var h = this.state.layout.width / 4.46
        return <SView col={"xs-12"} height={h} style={{
            position: "absolute",
            bottom: 0,
        }}>
            <SIcon name={"adornocarga"} />
        </SView>
    }
    render() {
        console.log(STheme.getTheme() + " TEMAAA")
        return (
            <SPage hidden disableScroll center>
                <SView col={"xs-12"} flex backgroundColor={STheme.color.primary} center onLayout={(evt) => {
                    this.setState({ layout: evt.nativeEvent.layout })
                }}>
                    <Gradient />
                    <SView col={"xs-6 sm-5 md-4 lg-3 xl-2 xxl-1.5"}>
                        <SIcon name={"LogoClear"} fill={STheme.getTheme() == "dark" ? STheme.color.black : STheme.color.white} />
                    </SView>
                    {/* {this.renderFooter()} */}
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);