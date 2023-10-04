import React, { Component } from 'react';
import { SPage, SText } from 'servisofts-component';

export default class index extends Component {
    render() {
        return (
            <SPage title={'A donde vas?'}>
                <SText>{'Santa Cruz - Montero'}</SText>
                <SText>{'Montero - Santa Cruz'}</SText>
            </SPage>
        );
    }
}
