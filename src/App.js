import React from 'react';
import { Platform } from 'react-native';
import { SComponentContainer, SNavigation, SText, STheme } from 'servisofts-component';
import SSocket, { setProps } from 'servisofts-socket';
import Redux, { store } from './Redux';
import Config from "./Config";
import Assets from './Assets';
import Pages from './Pages';
import Firebase from './Firebase';
import DeviceKey from "./Firebase/DeviceKey"
import { NavBar, TopBar } from './Components';
import BackgroundImage from './Components/BackgroundImage';
import { version } from "../package.json"

setProps(Config.socket);
Firebase.init();
DeviceKey.init();
const App = (props) => {
    return <Redux>
        <SComponentContainer
            debug
            socket={SSocket}
            background={<BackgroundImage />}
            assets={Assets}
            inputs={Config.inputs}
            theme={{ themes: Config.theme, initialTheme: "default" }}
        >
            <SNavigation
                linking={{
                    prefixes: ["https://TlleBo.servisofts.com/app/", "http://TlleBo.servisofts.com/app/", 'TlleBo://app/'],
                    getInitialURL: () => {
                        Firebase.getInitialURL();
                    }
                }}
                props={{
                    navBar: TopBar,
                    title: 'TlleBo', pages: Pages
                }}
            />
            <SSocket
                store={store}
                identificarse={(props) => {
                    var usuario = props.state.usuarioReducer.usuarioLog;
                    // if(usuario){
                    //     Model.usuario.Action.syncUserLog();
                    // }
                    return {
                        data: usuario ? usuario : {},
                        deviceKey: DeviceKey.getKey(),
                        firebase: {
                            platform: Platform.OS,
                            token: DeviceKey.getKey(),
                            key_usuario: usuario?.key,
                            app: "client",
                            descripcion: Platform.select({
                                "web": `Web ${window.navigator.userAgent}`,
                                "android": `Android ${Platform?.constants?.Version}, ${Platform?.constants?.Manufacturer} ${Platform?.constants?.Brand} ${Platform?.constants?.Model}`,
                                "ios": `IOS ${Platform?.Version}, ${Platform?.constants?.systemName}`,
                            }),
                        }
                    };
                }}
            />
            <NavBar />
            <SText style={{ position: "absolute", bottom: 2, right: 2, }} fontSize={10} color={STheme.color.lightGray}>v{version}</SText>
        </SComponentContainer>
    </Redux>
}
export default App;