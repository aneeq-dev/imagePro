import React, { Component } from 'react';
import {View, Text} from 'react-native';
import { stylesMenuButton, stylesRectangle } from '../styleSheeet/styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class MenuButton extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <View>
        <View style={stylesRectangle.rectangle}/>
        <View style={stylesRectangle.rectangle2}/>
        <View style={{position:'absolute', left:2, top:20}}>
          <FontAwesome5.Button 
          name={'bars'} 
          size={35} 
          color={'black'} 
          style={stylesRectangle.color}
          onPress={()=>this.props.navigation.openDrawer()}
          />
        </View>
      </View>
    ); 
  }
}

