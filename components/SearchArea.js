import React, {Component} from 'react';
import {styles, stylesRectangle} from '../styleSheeet/styles';

import {
  View,
  Text,
  StyleSheet,
  Platform,
  Alert,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  AsyncStorage,
  Dimensions,
} from 'react-native';
import store3 from '../redux/store3';
import App from '../App';
import axios from "axios";
import ip from '../ipadd/ip';

export default class SearchArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: '',
      done:false
    };
  }




 // this.languageSetter();
  

  languageSetter=async ()=>{
    let value = await AsyncStorage.getItem('lang');
    console.log("lang set is: ",value);
    if(!value){
      console.log('yes');
      value='English';
    }

    
    store3.dispatch({
      type:'LANGUAGE',
      payload:{
        language:value
      }
    });
    App.updateMe2(value);
  }

  k=()=>{
    console.log("calling:2 ");

    if(!(this.state.done)){
      console.log("calling: ");
      this.languageSetter();
      this.setState({done:true});
    }
  }

 // this.lang2();


  //کے قریب سیلون تلاش کریں

  render() {
    
    return (
      this.k(),
      console.log("mk: ",store3.getState().length),
      <View style={styles.searchSpan}>
        <View style={stylesRectangle.rectangle} />
        <View style={stylesRectangle.rectangle2} />
        <TextInput
          editable={!this.props.disable}
          placeholder={
              (!(store3.getState().length===0))?(
                (store3.getState()[0].language)==='English'?(
                  this.props.disable ? 'Please wait...' : 'Search salons near to...'
                ):(
                  this.props.disable ? 'انتظار کریں... ' : '   ...کے قریب سیلون تلاش کریں         '
                ) 
              ):(
                this.props.disable ? 'Please wait...' : 'Search salons near to...'
              )                    
          }
          value={this.state.destination}
          autoFocus={this.props.disable ? false : true}
          clearButtonMode="always"
          onChangeText={destination => {
            console.log(destination);
            this.setState({destination});
            this.props.updateDestCB(destination);

            //
          }}
          style={styles.destinationInput}
        />
        {this.props.disable ? (
          <ActivityIndicator
            style={styles.act}
          />
        ) : (
          console.log()
        )}
      </View>
    );
  }
}
