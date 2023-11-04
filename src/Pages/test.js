import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { SInput, SPage } from 'servisofts-component'

export default class test extends Component {
  render() {
    return <SPage title="Test">
        <SInput type='image' onChange={(e)=>{
            console.log(e)
        }}
        width={200}
        height={200}
        onChangeText={(e)=>{
            console.log(e)
        }}
        />
    </SPage>
  }
}