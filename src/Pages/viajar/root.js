import React, { Component } from 'react';
import { SPage, SText } from 'servisofts-component';

export default class index extends Component {
    render() {
        return (
            <SPage title={'Que deceas hacer?'}>
                <SText>{'Comprar pasaje'}</SText>
                <SText>{'Pedir expreso'}</SText>
                <SText>{'Enviar encomiendas'}</SText>
            </SPage>
        );
    }
}
