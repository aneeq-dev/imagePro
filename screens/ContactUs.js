import React, {useState, useEffect} from 'react';
import {Linking} from 'react-native';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {styles, stylesMenuButton, topBar} from '../styleSheeet/styles';
import {
  contactUsStyling,
  mainMapScreenStyling,
} from '../styleSheeet/screenStyles';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import ip from '../ipadd/ip';
import store3 from '../redux/store3';
import {useRef} from 'react/cjs/react.development';
import SearchArea from '../movieSrc/SearchArea/SearchArea';

function ContactUs(props) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [Email, setEmail] = useState('');
  const [isShowed, setisShowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ref, setRef] = useState(true);

  const [isSearch, setIsSearch] = useState(false);
  const [count, setCount] = useState(0);

  const searchChanged = useRef(null);
  const setSearch = () => {
    setIsSearch(false);
  };

  const updateDestinationInuptState = destination => {
    //this.setState({ destination });
    // this.onChangeDestinationDebounced(destination);
  };

  const getContactInfo = async () => {
    try {
      const {data: responseJson} = await axios.get(
        'https://' + ip + '/api/category/getHelpData',
      );
      if (responseJson === 0 || responseJson === undefined) {
        Alert.alert(
          store3.getState().length === 0 ||
            store3.getState()[0].language === 'English'
            ? 'No Contact Info found!'
            : 'رابطہ کی کوئی معلومات نہیں ملی!',
          store3.getState().length === 0 ||
            store3.getState()[0].language === 'English'
            ? 'No contact info has found for now. Please check you have an active internet connection.'
            : 'ابھی تک کوئی رابطہ کی معلومات نہیں ملی ہے۔ براہ کرم چیک کریں کہ آپ کا ایک فعال انٹرنیٹ کنیکشن ہے۔',
          [
            {
              //style: "cancel"
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: true},
        );
        setPhoneNumber('');
        setEmail('');
      } else {
        console.log(responseJson);
        setPhoneNumber(responseJson.helpNo);
        setEmail(responseJson.helpEmail);
      }
    } catch (ex) {
      console.error(ex);
    }
    setRef(false);
  };

  !isShowed
    ? // query for getting number and email from db
      (getContactInfo(),
      setisShowed(true),
      setLoading(false),
      console.log('set'))
    : console.log('');

  const _onRefresh = () => {
    setRef(true);
    getContactInfo();
  };

  const makecall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  return (
    <View style={contactUsStyling.mainContainer}>
      <SearchArea
        updateDestCB={updateDestinationInuptState}
        //  disable={loading}
        navigation={props.navigation}
        search={isSearch}
        setSearch={setSearch}
      />

      <View style={stylesMenuButton.menuPos}>
        <FontAwesome5.Button
          name={'bars'}
          size={20}
          color={isSearch ? 'white' : 'black'}
          style={
            isSearch
              ? mainMapScreenStyling.barsicon2
              : mainMapScreenStyling.barsicon
          }
          backgroundColor={isSearch ? '#002a52' : 'white'}
          onPress={() => props.navigation.toggleDrawer()}
        />
      </View>

      {!isSearch ? (
        <View style={stylesMenuButton.searchPos3}>
          <Entypo.Button
            name={'user'}
            size={20}
            color={'#0234a6'}
            style={mainMapScreenStyling.barsicon}
            backgroundColor={'white'}
            onPress={() =>
              props.navigation.navigate('Setting', {
                screenNumber: 1,
              })
            }
          />
        </View>
      ) : null}

      {isSearch ? (
        <View style={stylesMenuButton.searchPos2}>
          <FontAwesome5.Button
            name={'long-arrow-alt-right'}
            size={20}
            color={'white'}
            style={mainMapScreenStyling.barsicon2}
            backgroundColor={'#002a52'}
            onPress={() => setIsSearch(!isSearch)}
          />
        </View>
      ) : (
        <View style={stylesMenuButton.searchPos}>
          <FontAwesome5.Button
            name={'search'}
            size={20}
            color={'#0234a6'}
            style={mainMapScreenStyling.barsicon}
            backgroundColor={'white'}
            onPress={() => setIsSearch(!isSearch)}
          />
        </View>
      )}

      <View
        style={{
          height: Dimensions.get('screen').height / 6,
        }}
      />
      <ScrollView
        style={{zIndex: -2}}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={_onRefresh} />
        }>
        <View style={contactUsStyling.telephoneIcon}>
          <Foundation.Button
            name={'mail'}
            size={Dimensions.get('window').height / 7}
            backgroundColor={'#edfeff'}
            color={'#211a00'}
            underlayColor="transparent"
          />
        </View>

        <Text style={contactUsStyling.emailText}>
          Drop your email at{'\n'}
          <Text style={contactUsStyling.emailText2}>"{Email}"</Text>
        </Text>
      </ScrollView>
    </View>
  );
}

export default ContactUs;
