import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Picker} from '@react-native-community/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {changeLanguageStyling} from '../styleSheeet/screenStyles';
import { AsyncStorage } from 'react-native';
import store3 from '../redux/store3';
import App from '../App';


function changeLanguage(props) {
  const [language, setLanguage] = useState('');
  const [done, setDone] = useState(false);


  const langaugeSet=async ()=>{
    const value = await AsyncStorage.getItem('lang');
    console.log("lang set is: ",value);
    setLanguage(value);
  }

  if(!done){
    langaugeSet();
    setDone(true);
  }



  const setInStorage=async (lang)=>{
    console.log(lang);
    try{
      await AsyncStorage.setItem('lang', lang);


      App.updateMe2(lang);


      store3.dispatch({
        type: 'LANGUAGE',
        payload: {
          language: lang,
        },
      });



      props.navigation.reset({
        index: 0,
        routes: [
          {
            name: 
            
            'Search Saloons Near',
           // params: { someParam: 'Param1' },
          },
        ],
      });

    }catch(ex){
      console.log(ex);
    }
  }


  return (
    <View
      style={changeLanguageStyling.container}>
      <View
        style={changeLanguageStyling.languageButtonView}>
        <FontAwesome.Button
          name={'language'}
          size={Dimensions.get('window').height / 10}
          backgroundColor={'#edfeff'}
          style={changeLanguageStyling.languageIcon}
          color={'#211a00'}
          underlayColor="transparent"
        />
      </View>
      <View
        style={changeLanguageStyling.langHeadView}>
        <Text style={changeLanguageStyling.langhead}>
          {
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Language'
            ):(
              'زبان'
            )
          }
        </Text>
      </View>

      <View
        style={changeLanguageStyling.pickerView}>
        <Picker
          selectedValue={language}
          style={changeLanguageStyling.pickerView}
          onValueChange={(itemValue, itemIndex) => {
            setLanguage(itemValue);
            setInStorage(itemValue);
          }}>
          <Picker.Item label="English" value="English" />
          <Picker.Item label="Urdu" value="Urdu" />
        </Picker>
      </View>
    </View>
  );
}


export default changeLanguage;
