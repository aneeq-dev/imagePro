import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  Alert,
  FlatList,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import joi from 'react-native-joi-validation';
import {Rating, AirbnbRating} from 'react-native-ratings';

import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {head} from 'lodash';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

import {topBar, searchedlistStylist} from '../styleSheeet/styles';
import axios from 'axios';
import ip from '../ipadd/ip';

import Geolocation from '@react-native-community/geolocation';
import MainMapScreen from '../screens/MainMapScreen';
import store from '../redux/store';
import store2 from '../redux/store2';
import store3 from '../redux/store3';
import {set} from 'react-native-reanimated';
import {loginStyling, settingsStyling} from '../styleSheeet/screenStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TextInput} from 'react-native';

function SearchedList(props) {
  //console.log(props);
  const lat = props.route.params.lat;
  const long = props.route.params.long;
  const latdest = props.route.params.latdest;
  const longdest = props.route.params.longdest;
  const place = props.route.params.place;
  const screenNumber = props.route.params.screenNumber;

  const [searchedPlaces, setSearchedPlaces] = useState([
    //{name:'Saloon8', id:'1', latitude:31.553488067811358, longitude:74.3143129348755},
    //{name:'Saloon9', id:'2', latitude:31.553341786107907,longitude:74.31349754333498},
  ]);
  const [accountSettingsDisplay, setAccountSettingsDisplay] = useState(false);
  const [accountSettingsDisplay2, setAccountSettingsDisplay2] = useState(false);
  const [accountSettingsDisplay3, setAccountSettingsDisplay3] = useState(false);
  const [accountSettingsDisplay4, setAccountSettingsDisplay4] = useState(false);
  const [accountSettingsDisplay5, setAccountSettingsDisplay5] = useState(false);
  const [lati, setlati] = useState(0);
  const [longi, setlongi] = useState(0);
  const [loading, setLoading] = useState(true);
  const [d, setD] = useState(false);

  const [price, setPrice] = useState(0);
  const [price2, setPrice2] = useState(1000000);
  const [price5, setPrice5] = useState(0);
  const [price6, setPrice6] = useState(1000000);
  const [priceSet, setPriceok] = useState(true);
  const [priceSet2, setPriceok2] = useState(true);

  const [rating, setRating] = useState(0);

  const [discount1, setDiscount1] = useState(0);
  const [discount2, setDiscount2] = useState(100);
  const [discountset, discountSetok] = useState(true);

  const [search, setSearch] = useState('Lahore');
  const [search2, setSearch2] = useState('Lahore');
  const [services, setServices] = useState('');

  const [distance, setMaxDistance] = useState(10);
  const [distanceOk, setDistanceOk] = useState(true);

  const Alerrt = i => {
    if (i === 1) {
      Alert.alert(
        store3.getState().length === 0 ||
          store3.getState()[0].language === 'English'
          ? 'No Saloons found!'
          : 'کوئی سیلون نہیں ملا',
        store3.getState().length === 0 ||
          store3.getState()[0].language === 'English'
          ? 'No Saloons found near your selected location. '
          : 'آپ کے منتخب کردہ مقام کے قریب کوئی سیلون نہیں ملا',
        [
          {
            //style: "cancel"
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: true},
      );
    } else if (i === 2) {
      Alert.alert(
        store3.getState().length === 0 ||
          store3.getState()[0].language === 'English'
          ? 'No Male Saloons found!'
          : 'کوئی مرد سیلون نہیں ملا!',
        store3.getState().length === 0 ||
          store3.getState()[0].language === 'English'
          ? 'No Male Saloons found near your location. '
          : 'آپ کے مقام کے قریب کوئی مرد سیلون نہیں ملا۔',
        [
          {
            //style: "cancel"
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: true},
      );
    } else if (i === 3) {
      Alert.alert(
        store3.getState().length === 0 ||
          store3.getState()[0].language === 'English'
          ? 'No Female Saloons found!'
          : 'کوئی خاتون سیلون نہیں ملا!',
        store3.getState().length === 0 ||
          store3.getState()[0].language === 'English'
          ? 'No Female Saloons found near your location. '
          : 'آپ کے مقام کے قریب کوئی خواتین سیلون نہیں ملی۔',
        [
          {
            //style: "cancel"
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: true},
      );
    }
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      _onRefresh();
    });
    return unsubscribe;
  }, [props.navigation]);

  const nearestSaloons = async (latt, longg) => {
    console.log(latt, longg);
    const {data: responseJson} = await axios.get(
      'https://' +
        ip +
        '/api/saloon/getWrtAllFilters?lat=' +
        latt +
        '&lng=' +
        longg +
        "&min=" +
        price +
        "&max=" +
        price2 +
        "&rating=" +
        rating +
        "&string=" +
        services +
        "&min2=" +
        price5 +
        "&max2=" +
        price6 +
        "&discountmin=" +
        discount1 +
        "&discountmax=" +
        discount2+"&dist="+distance
    );
    if (responseJson === 0) {
      // if no saloons found
      Alerrt(1);
      setSearchedPlaces([]);
    } else {
      setSearchedPlaces(responseJson);
    }
    setLoading(false);
  };

  const nearestSaloonswrtlocation = async () => {
    let storestate = store.getState();

    const {data: responseJson} = await axios.get(
      'https://' +
        ip +
        '/api/saloon/getNearSaloonsNearTo?lat=' +
        storestate[0].latitude +
        '&lng=' +
        storestate[0].longitude +
        '&min=' +
        price +
        '&max=' +
        price2 +
        '&rating=' +
        rating +
        '&string=' +
        services +
        '&min2=' +
        price5 +
        '&max2=' +
        price6 +
        '&discountmin=' +
        discount1 +
        '&discountmax=' +
        discount2 +
        '&dist=' +
        distance,
    );
    if (responseJson === 0) {
      Alerrt(1);
      setSearchedPlaces([]);
    } else {
      setSearchedPlaces(responseJson);
    }
    setLoading(false);
  };

  const nearestMaleSaloonswrtlocation = async () => {
    let storestate = store.getState();
    //store.getState();

    const {data: responseJson} = await axios.get(
      'https://' +
        ip +
        '/api/saloon/getNearMalePrice?lat=' +
        storestate[0].latitude +
        '&lng=' +
        storestate[0].longitude +
        '&min=' +
        price +
        '&max=' +
        price2 +
        '&rating=' +
        rating +
        '&string=' +
        services +
        '&min2=' +
        price5 +
        '&max2=' +
        price6 +
        '&discountmin=' +
        discount1 +
        '&discountmax=' +
        discount2 +
        '&dist=' +
        distance,
    );
    console.log('mkmkkkklll: ', responseJson);
    if (responseJson === 0) {
      Alerrt(2);
      setSearchedPlaces([]);
    } else {
      setSearchedPlaces(responseJson);
    }
    setLoading(false);
  };

  const nearestFemaleSaloonswrtlocation = async () => {
    let storestate = store.getState();
    const {data: responseJson} = await axios.get(
      'https://' +
        ip +
        '/api/saloon/getNearFemalePrice?lat=' +
        storestate[0].latitude +
        '&lng=' +
        storestate[0].longitude +
        '&min=' +
        price +
        '&max=' +
        price2 +
        '&rating=' +
        rating +
        '&string=' +
        services +
        '&min2=' +
        price5 +
        '&max2=' +
        price6 +
        '&discountmin=' +
        discount1 +
        '&discountmax=' +
        discount2 +
        '&dist=' +
        distance,
    );
    if (responseJson === 0) {
      Alerrt(3);
      setSearchedPlaces([]);
    } else {
      setSearchedPlaces(responseJson);
    }
    setLoading(false);
  };

  const validate = (price, price2) => {
    var schema = joi.object().keys({
      a: joi.number().integer(),
      Phone: joi
        .number()
        .min(0)
        .max(9999999)
        .less(joi.ref('a')),
    });
    const error = joi.validate({Phone: price, a: price2}, schema);
    // console.log(error.error);
    //console.log(error);
    // return error.error.details[0].message;
    if (error.error) {
      setPriceok(false);
      return false;
    } else {
      var schema = joi.object().keys({
        Phone2: joi
          .number()
          .min(0)
          .max(9999999),
      });
      const error = joi.validate({Phone2: price2}, schema);
      if (error.error) {
        setPriceok(false);
        return false;
      } else {
        setPriceok(true);
        return true;
      }
    }
  };

  const validate2 = (price5, price6) => {
    // if(price===price2)

    var schema = joi.object().keys({
      a: joi.number().integer(),
      Phone: joi
        .number()
        .min(0)
        .max(9999999)
        .less(joi.ref('a')),
    });
    const error = joi.validate({Phone: price5, a: price6}, schema);
    console.log(error.error);
    //console.log(error);
    // return error.error.details[0].message;
    if (error.error) {
      setPriceok2(false);
      return false;
    } else {
      var schema = joi.object().keys({
        Phone2: joi
          .number()
          .min(0)
          .max(9999999),
      });
      const error = joi.validate({Phone2: price6}, schema);
      if (error.error) {
        setPriceok2(false);
        return false;
      } else {
        setPriceok2(true);
        return true;
      }
    }
    /*
    console.log(price5,price6);
    if (price5 > price6 || price5 < 0 || price6 < 0) {
      console.log(price5>price6);
      console.log(price5<0);
      console.log(price6<0);
      
      //ok
      setPriceok2(false);
      return false;
    } else {
      setPriceok2(true);
      return true;
    }*/
  };

  const validate3 = (discount1, discount2) => {
    var schema = joi.object().keys({
      a: joi.number().integer(),
      Phone: joi
        .number()
        .min(0)
        .max(100)
        .less(joi.ref('a')),
    });
    const error = joi.validate({Phone: discount1, a: discount2}, schema);
    console.log(error.error);
    //console.log(error);
    // return error.error.details[0].message;
    if (error.error) {
      discountSetok(false);
      return false;
    } else {
      var schema = joi.object().keys({
        Phone2: joi
          .number()
          .min(0)
          .max(100),
      });
      const error = joi.validate({Phone2: discount2}, schema);
      if (error.error) {
        discountSetok(false);
        return false;
      } else {
        discountSetok(true);
        return true;
      }
    } /*
    // if(price===price2)
    console.log(discount1, discount2);
    if (
      discount1 > discount2 ||
      discount1 < 0 ||
      discount2 < 0 ||
      discount1 > 100 ||
      discount2 > 100
    ) {
      //ok
      discountSetok(false);
      return false;
    } else {
      discountSetok(true);
      return true;
    }*/
  };

  const validate4 = data => {
    // validating phone
    var schema = joi.object().keys({
      distance: joi
        .number()
        .min(0)
        .max(50)
        .required(),
    });
    const error = joi.validate({distance: data}, schema);
    //console.log(error);
    // return error.error.details[0].message;
    if (error.error) {
      console.log(error.error.details[0].message);
      setDistanceOk(false);
      return false;
    } else {
      console.log('ok');
      setDistanceOk(true);
      return true;
    }
  };

  const ratingChanged = newRating => {
    setRating(newRating);
  };

  const getData = () => {
    if (
      validate() &&
      validate2(price5, price6) &&
      validate3(discount1, discount2)
    ) {
      if (screenNumber == 0) {
        setLoading(true);
        nearestSaloonswrtlocation().then(() => {
          setLoading(false);
        });
      } else if (screenNumber == 1) {
        if (!priceSet) {
          //
        } else {
          /*nearestMaleSaloonswrtlocation(31, 74).then(() => {
        setLoading(false);
        //setD(true);
      });*/
          nearestMaleSaloonswrtlocation();
        }
      } else if (screenNumber == 2) {
        /* nearestFemaleSaloonswrtlocation(31, 74).then(() => {
      setLoading(false);
      //setD(true);
    });*/
        nearestFemaleSaloonswrtlocation();
      } else if (screenNumber == 3) {
        nearestSaloons(latdest, longdest);
      } else {
        console.log('calin');

        //nearestSaloons();
      }
    }
  };

  const _onRefresh = () => {
    setLoading(true);
    if (screenNumber === 0) {
      nearestSaloonswrtlocation().then(() => {
        setLoading(false);
      });
    } else if (screenNumber === 1) {
      nearestMaleSaloonswrtlocation().then(() => {
        setLoading(false);
      });
    } else if (screenNumber === 2) {
      nearestFemaleSaloonswrtlocation().then(() => {
        setLoading(false);
      });
    } else if (screenNumber === 3) {
      nearestSaloons(latdest, longdest).then(() => {
        setLoading(false);
      });
    }
  };

  const accountSettingsDisplayer = () => {
    if (accountSettingsDisplay) {
      setAccountSettingsDisplay(false);
    } else {
      setAccountSettingsDisplay(true);
    }
  };

  const accountSettingsDisplayer2 = () => {
    if (accountSettingsDisplay2) {
      setAccountSettingsDisplay2(false);
    } else {
      setAccountSettingsDisplay2(true);
    }
  };

  const accountSettingsDisplayer3 = () => {
    if (accountSettingsDisplay3) {
      setAccountSettingsDisplay3(false);
    } else {
      setAccountSettingsDisplay3(true);
    }
  };

  const accountSettingsDisplayer4 = () => {
    if (accountSettingsDisplay4) {
      setAccountSettingsDisplay4(false);
    } else {
      setAccountSettingsDisplay4(true);
    }
  };

  const accountSettingsDisplayer5 = () => {
    if (accountSettingsDisplay5) {
      setAccountSettingsDisplay5(false);
    } else {
      setAccountSettingsDisplay5(true);
    }
  };

  if (loading && !d) {
    setLoading(true), _onRefresh(), setD(true);
  }

  return (
    <View style={searchedlistStylist.container}>
      <View style={topBar.categoriesOverall}>
        <FontAwesome5.Button
          name={'bars'}
          size={
            ((Dimensions.get('window').height / 10) *
              Dimensions.get('window').width) /
            10 /
            90
          }
          color={'black'}
          backgroundColor={'white'}
          style={topBar.iconStyle}
          onPress={() => props.navigation.toggleDrawer()}
        />

        {screenNumber === 0 ? (
          <Text style={topBar.heading}>
            {store3.getState().length === 0 ||
            store3.getState()[0].language === 'English'
              ? 'Near Saloons'
              : 'نزدیک سیلون '}
          </Text>
        ) : screenNumber === 1 ? (
          <Text style={topBar.heading}>
            {store3.getState().length === 0 ||
            store3.getState()[0].language === 'English'
              ? 'Male Saloons'
              : 'مردوں کے سیلون'}
          </Text>
        ) : screenNumber === 2 ? (
          <Text style={topBar.heading}>
            {store3.getState().length === 0 ||
            store3.getState()[0].language === 'English'
              ? 'Female Saloons'
              : 'خواتین کے سیلون'}
          </Text>
        ) : screenNumber === 3 ? (
          <Text style={topBar.heading}>
            {store3.getState().length === 0 ||
            store3.getState()[0].language === 'English'
              ? 'Nearest Saloons'
              : 'قریب ترین سیلون'}
          </Text>
        ) : (
          console.log('nothing call')
        )
        // setLoading(false) && console.log("Function call to function, here to call backend and search the nearest saloons w.r.t selected lat long (not wrt users location)...")
        }
      </View>

      {
        /*loading?(
            //<ActivityIndicator size="large" />
            null
            ):(*/
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={_onRefresh} />
          }>
          <View style={settingsStyling.margin2}>
            <View
              style={settingsStyling.settingshead}
              onPress={() => accountSettingsDisplayer()}>
              <Text>
                {store3.getState().length === 0 ||
                store3.getState()[0].language === 'English'
                  ? 'Filters'
                  : 'فلٹرز'}
              </Text>

              {accountSettingsDisplay ? (
                <FontAwesome.Button
                  name={'caret-up'}
                  size={23}
                  backgroundColor={'#88dba2'}
                  color={'#211a00'}
                  style={settingsStyling.caretup}
                  underlayColor="transparent"
                  onPress={() => {
                    accountSettingsDisplayer();
                  }}
                />
              ) : (
                <FontAwesome.Button
                  name={'caret-down'}
                  size={23}
                  backgroundColor={'#88dba2'}
                  color={'#211a00'}
                  style={settingsStyling.caretup}
                  underlayColor="transparent"
                  onPress={() => {
                    accountSettingsDisplayer();
                  }}
                />
              )}
            </View>

            {accountSettingsDisplay ? (
              <View>
                <View
                  style={settingsStyling.settingshead2}
                  onPress={() => accountSettingsDisplayer2()}>
                  <Text>
                    {store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                      ? 'Saloon Filters'
                      : 'سیلون فلٹرز'}
                  </Text>

                  {accountSettingsDisplay2 ? (
                    <FontAwesome.Button
                      name={'caret-up'}
                      size={23}
                      backgroundColor={'#88dba2'}
                      color={'#211a00'}
                      style={settingsStyling.caretup2}
                      underlayColor="transparent"
                      onPress={() => {
                        accountSettingsDisplayer2();
                      }}
                    />
                  ) : (
                    <FontAwesome.Button
                      name={'caret-down'}
                      size={23}
                      backgroundColor={'#88dba2'}
                      color={'#211a00'}
                      style={settingsStyling.caretup2}
                      underlayColor="transparent"
                      onPress={() => {
                        accountSettingsDisplayer2();
                      }}
                    />
                  )}
                </View>
                {accountSettingsDisplay2 ? (
                  <View>
                    <Text style={{color: 'white', padding: 5}}>
                      {store3.getState().length === 0 ||
                      store3.getState()[0].language === 'English'
                        ? ' Saloon Min Price between: '
                        : 'کے درمیان سیلون کم سے کم قیمت:'}
                    </Text>
                    <View style={loginStyling.numericView2}>
                      <View style={loginStyling.numericView3}>
                        <TextInput
                          editable={true}
                          placeholder={
                            store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Min Price'
                              : ' کم سے کم قیمت: '
                          }
                          onChangeText={n => {
                            setPrice(n);
                            validate(n, price2);
                          }}
                          keyboardType={'numeric'}
                          value={price}
                          maxLength={7}
                          clearButtonMode="always"
                          placeholderTextColor="grey"
                          style={{
                            flex: 1,
                            paddingLeft: 20,
                            borderWidth: 1,
                            borderRadius: 20,
                            color: 'white',
                            borderColor: priceSet ? 'white' : 'red',
                          }}
                        />
                      </View>

                      <Text
                        style={{
                          color: 'white',
                          padding: 5,
                          justifyContent: 'center',
                          height: Dimensions.get('window').height / 10,
                        }}>
                        {store3.getState().length === 0 ||
                        store3.getState()[0].language === 'English'
                          ? 'and'
                          : 'اور'}
                      </Text>

                      <View style={loginStyling.numericView4}>
                        <TextInput
                          editable={true}
                          placeholder={
                            store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Max Price'
                              : ' زیادہ سے زیادہ قیمت'
                          }
                          keyboardType={'numeric'}
                          onChangeText={n => {
                            // console.log(n);
                            setPrice2(n);
                            validate(price, n);
                          }}
                          value={price2}
                          maxLength={7}
                          clearButtonMode="always"
                          placeholderTextColor="grey"
                          style={{
                            flex: 1,
                            paddingLeft: 20,
                            borderWidth: 1,
                            borderRadius: 20,
                            color: 'white',
                            borderColor: priceSet ? 'white' : 'red',
                            justifyContent: 'flex-end',
                          }}
                        />
                      </View>
                    </View>
                    <View style={loginStyling.signin}>
                      <TouchableOpacity
                        onPress={() => {
                          getData();
                        }}
                        style={loginStyling.touchLogin2}>
                        <Text style={loginStyling.logintextbutton2}>
                          {store3.getState().length === 0 ||
                          store3.getState()[0].language === 'English'
                            ? 'Done'
                            : 'ٹھیک ہے'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}
                {accountSettingsDisplay2 ? (
                  <View
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: 'grey',
                      margin: 10,
                    }}
                  />
                ) : null}

                <View
                  style={settingsStyling.settingshead2}
                  onPress={() => accountSettingsDisplayer3()}>
                  <Text>
                    {store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                      ? 'Service Filters'
                      : 'سروس کے فلٹرز'}
                  </Text>

                  {accountSettingsDisplay3 ? (
                    <FontAwesome.Button
                      name={'caret-up'}
                      size={23}
                      backgroundColor={'#88dba2'}
                      color={'#211a00'}
                      style={settingsStyling.caretup2}
                      underlayColor="transparent"
                      onPress={() => {
                        accountSettingsDisplayer3();
                      }}
                    />
                  ) : (
                    <FontAwesome.Button
                      name={'caret-down'}
                      size={23}
                      backgroundColor={'#88dba2'}
                      color={'#211a00'}
                      style={settingsStyling.caretup2}
                      underlayColor="transparent"
                      onPress={() => {
                        accountSettingsDisplayer3();
                      }}
                    />
                  )}
                </View>

                {accountSettingsDisplay3 ? (
                  <View>
                    <Text style={{color: 'white', padding: 5}}>
                      {store3.getState().length === 0 ||
                      store3.getState()[0].language === 'English'
                        ? 'Saloon with service: '
                        : 'سیلون کی خدمت: '}
                    </Text>
                    <View style={loginStyling.numericView2}>
                      <TextInput
                        editable={true}
                        placeholder={
                          store3.getState().length === 0 ||
                          store3.getState()[0].language === 'English'
                            ? 'Any service you want...'
                            : 'جو بھی خدمت آپ چاہتے ہیں ...'
                        }
                        onChangeText={n => {
                          setServices(n);
                        }}
                        value={services}
                        maxLength={7}
                        clearButtonMode="always"
                        placeholderTextColor="grey"
                        style={{
                          flex: 1,
                          paddingLeft: 20,
                          borderWidth: 1,
                          borderRadius: 20,
                          color: 'white',
                          borderColor: 'white',
                        }}
                      />
                    </View>
                    {accountSettingsDisplay3 ? (
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: 'grey',
                          margin: 10,
                        }}
                      />
                    ) : null}
                    <Text style={{color: 'white', padding: 5}}>
                      {store3.getState().length === 0 ||
                      store3.getState()[0].language === 'English'
                        ? 'Service Price between'
                        : 'کے درمیان خدمت کی قیمت'}
                    </Text>

                    <View style={loginStyling.numericView2}>
                      <View style={loginStyling.numericView3}>
                        <TextInput
                          editable={true}
                          placeholder={
                            store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Min Price'
                              : ' کم سے کم قیمت: '
                          }
                          onChangeText={n => {
                            setPrice5(n);
                            validate2(n, price6);
                          }}
                          keyboardType={'numeric'}
                          value={price5}
                          maxLength={7}
                          clearButtonMode="always"
                          placeholderTextColor="grey"
                          style={{
                            flex: 1,
                            paddingLeft: 20,
                            borderWidth: 1,
                            borderRadius: 20,
                            color: 'white',
                            borderColor: priceSet2 ? 'white' : 'red',
                          }}
                        />
                      </View>

                      <Text
                        style={{
                          color: 'white',
                          padding: 5,
                          justifyContent: 'center',
                          height: Dimensions.get('window').height / 10,
                        }}>
                        {store3.getState().length === 0 ||
                        store3.getState()[0].language === 'English'
                          ? 'and'
                          : 'اور'}
                      </Text>

                      <View style={loginStyling.numericView4}>
                        <TextInput
                          editable={true}
                          placeholder={
                            store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Max Price'
                              : ' زیادہ سے زیادہ قیمت'
                          }
                          onChangeText={n => {
                            // console.log(n);
                            setPrice6(n);
                            validate2(price5, n);
                          }}
                          keyboardType={'numeric'}
                          value={price6}
                          maxLength={7}
                          clearButtonMode="always"
                          placeholderTextColor="grey"
                          style={{
                            flex: 1,
                            paddingLeft: 20,
                            borderWidth: 1,
                            borderRadius: 20,
                            color: 'white',
                            borderColor: priceSet2 ? 'white' : 'red',
                            justifyContent: 'flex-end',
                          }}
                        />
                      </View>
                    </View>
                    {accountSettingsDisplay3 ? (
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: 'grey',
                          margin: 10,
                        }}
                      />
                    ) : null}

                    <Text style={{color: 'white', padding: 5}}>
                      {store3.getState().length === 0 ||
                      store3.getState()[0].language === 'English'
                        ? 'Service Discount (in %) between '
                        : 'سروس ڈسکاؤنٹ (٪ میں) کے درمیان'}
                    </Text>

                    <View style={loginStyling.numericView2}>
                      <View style={loginStyling.numericView3}>
                        <TextInput
                          editable={true}
                          placeholder={
                            store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Min Discount'
                              : ' کم سے کم رعایت'
                          }
                          onChangeText={n => {
                            setDiscount1(n);
                            validate3(n, discount2);
                          }}
                          keyboardType={'numeric'}
                          value={discount1}
                          maxLength={3}
                          clearButtonMode="always"
                          placeholderTextColor="grey"
                          style={{
                            flex: 1,
                            paddingLeft: 20,
                            borderWidth: 1,
                            borderRadius: 20,
                            color: 'white',
                            borderColor: discountset ? 'white' : 'red',
                          }}
                        />
                      </View>

                      <Text
                        style={{
                          color: 'white',
                          padding: 5,
                          justifyContent: 'center',
                          height: Dimensions.get('window').height / 10,
                        }}>
                        {store3.getState().length === 0 ||
                        store3.getState()[0].language === 'English'
                          ? 'and'
                          : 'اور'}
                      </Text>

                      <View style={loginStyling.numericView4}>
                        <TextInput
                          editable={true}
                          placeholder={
                            store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Max Discount'
                              : ' زیادہ سے زیادہ رعایت'
                          }
                          onChangeText={n => {
                            // console.log(n);
                            setDiscount2(n);
                            validate3(discount1, n);
                          }}
                          keyboardType={'numeric'}
                          value={discount2}
                          maxLength={3}
                          clearButtonMode="always"
                          placeholderTextColor="grey"
                          style={{
                            flex: 1,
                            paddingLeft: 20,
                            borderWidth: 1,
                            borderRadius: 20,
                            color: 'white',
                            borderColor: discountset ? 'white' : 'red',
                            justifyContent: 'flex-end',
                          }}
                        />
                      </View>
                    </View>
                    {accountSettingsDisplay3 ? (
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: 'grey',
                          height: 10,
                          marginTop: 10,
                          marginLeft: 10,
                          marginRight: 10,
                        }}
                      />
                    ) : null}
                    <View style={loginStyling.signin}>
                      <TouchableOpacity
                        onPress={() => {
                          getData();
                        }}
                        style={loginStyling.touchLogin2}>
                        <Text style={loginStyling.logintextbutton2}>
                          {store3.getState().length === 0 ||
                          store3.getState()[0].language === 'English'
                            ? 'Done'
                            : 'ٹھیک ہے'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {accountSettingsDisplay3 ? (
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: 'grey',
                          margin: 10,
                        }}
                      />
                    ) : null}
                  </View>
                ) : null}

                <View
                  style={settingsStyling.settingshead2}
                  onPress={() => accountSettingsDisplayer4()}>
                  <Text>
                    {store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                      ? 'Rating Filter'
                      : 'درجہ بندی کا فلٹر'}
                  </Text>

                  {accountSettingsDisplay4 ? (
                    <FontAwesome.Button
                      name={'caret-up'}
                      size={23}
                      backgroundColor={'#88dba2'}
                      color={'#211a00'}
                      style={settingsStyling.caretup2}
                      underlayColor="transparent"
                      onPress={() => {
                        accountSettingsDisplayer4();
                      }}
                    />
                  ) : (
                    <FontAwesome.Button
                      name={'caret-down'}
                      size={23}
                      backgroundColor={'#88dba2'}
                      color={'#211a00'}
                      style={settingsStyling.caretup2}
                      underlayColor="transparent"
                      onPress={() => {
                        accountSettingsDisplayer4();
                      }}
                    />
                  )}
                </View>
                {accountSettingsDisplay4 ? (
                  <View>
                    {store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English' ? (
                      <Text style={{color: 'white', padding: 5}}>
                        Saloons with Rating of{' '}
                        <Text style={{color: 'lightgreen'}}>{rating}</Text>{' '}
                        stars and up!{' '}
                      </Text>
                    ) : (
                      <Text style={{color: 'white', padding: 5}}>
                        سیلون جن کی درجہ بندی ہے{' '}
                        <Text style={{color: 'lightgreen'}}>{rating}</Text>{' '}
                        ستارے اور اوپر{' '}
                      </Text>
                    )}

                    <View>
                      <Rating
                        type="star"
                        startingValue={0}
                        ratingCount={5}
                        readonly={false}
                        imageSize={30}
                        showRating
                        ratingTextColor="#105c43"
                        onFinishRating={n => ratingChanged(n)}
                      />
                    </View>
                    <View style={loginStyling.signin}>
                      <TouchableOpacity
                        onPress={() => {
                          getData();
                        }}
                        style={loginStyling.touchLogin2}>
                        <Text style={loginStyling.logintextbutton2}>
                          {store3.getState().length === 0 ||
                          store3.getState()[0].language === 'English'
                            ? 'Done'
                            : 'ٹھیک ہے'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {accountSettingsDisplay4 ? (
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: 'grey',
                          margin: 10,
                        }}
                      />
                    ) : null}
                  </View>
                ) : null}
                <View
                  style={settingsStyling.settingshead2}
                  onPress={() => accountSettingsDisplayer5()}>
                  <Text>
                    {store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                      ? 'Distance Filter'
                      : 'فاصلہ فلٹر'}
                  </Text>

                  {accountSettingsDisplay5 ? (
                    <FontAwesome.Button
                      name={'caret-up'}
                      size={23}
                      backgroundColor={'#88dba2'}
                      color={'#211a00'}
                      style={settingsStyling.caretup2}
                      underlayColor="transparent"
                      onPress={() => {
                        accountSettingsDisplayer5();
                      }}
                    />
                  ) : (
                    <FontAwesome.Button
                      name={'caret-down'}
                      size={23}
                      backgroundColor={'#88dba2'}
                      color={'#211a00'}
                      style={settingsStyling.caretup2}
                      underlayColor="transparent"
                      onPress={() => {
                        accountSettingsDisplayer5();
                      }}
                    />
                  )}
                </View>
                {accountSettingsDisplay5 ? (
                  <View>
                    <Text style={{color: 'white', padding: 5}}>
                      {store3.getState().length === 0 ||
                      store3.getState()[0].language === 'English'
                        ? 'Saloons near me with distance of '
                        : ' کے قریب میرے ساتھ سیلون'}
                      <Text style={{color: 'lightgreen'}}> {distance} km</Text>{' '}
                    </Text>
                    <View style={loginStyling.numericView2}>
                      <TextInput
                        editable={true}
                        placeholder={
                          store3.getState().length === 0 ||
                          store3.getState()[0].language === 'English'
                            ? 'Search Saloons near you with distance...'
                            : 'فاصلے کے ساتھ اپنے قریب سیلون تلاش کریں ...'
                        }
                        onChangeText={n => {
                          setMaxDistance(n);
                          validate4(n);
                        }}
                        value={distance}
                        maxLength={2}
                        clearButtonMode="always"
                        placeholderTextColor="grey"
                        style={{
                          flex: 1,
                          paddingLeft: 20,
                          borderWidth: 1,
                          borderRadius: 20,
                          color: 'white',
                          borderColor: distanceOk ? 'white' : 'red',
                        }}
                      />
                    </View>
                    <View style={loginStyling.signin}>
                      <TouchableOpacity
                        onPress={() => {
                          getData();
                        }}
                        style={loginStyling.touchLogin2}>
                        <Text style={loginStyling.logintextbutton2}>
                          {store3.getState().length === 0 ||
                          store3.getState()[0].language === 'English'
                            ? 'Done'
                            : 'ٹھیک ہے'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {accountSettingsDisplay5 ? (
                      <View
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: 'grey',
                          margin: 10,
                        }}
                      />
                    ) : null}
                  </View>
                ) : null}
              </View>
            ) : null}
          </View>

          {store3.getState().length === 0 ||
          store3.getState()[0].language === 'English' ? (
            <View style={{margin: 10, backgroundColor: 'grey', padding: 10}}>
              <Text style={{fontSize: 17}}>Filters Summary</Text>
              <Text>
                >Searching Near to:{' '}
                <Text style={{color: 'blue'}}>
                  {
                  place?place:'Near your location'
                  }</Text>
              </Text>
              <Text>
                >Saloon Min price: <Text style={{color: 'blue'}}>{price}</Text>
                {'\t'}- Saloon Max price:{' '}
                <Text style={{color: 'blue'}}>{price2}</Text>
              </Text>
              <Text>
                >Service Search tag:{' '}
                {services ? (
                  <Text style={{color: 'blue'}}>{services}</Text>
                ) : (
                  'no'
                )}{' '}
              </Text>
              <Text>
                {services ? (
                  <Text>
                    >Service Min Price:{' '}
                    <Text style={{color: 'blue'}}>{price5}</Text>
                    {'\t'}- Max Price:{' '}
                    <Text style={{color: 'blue'}}>{price6}</Text>
                  </Text>
                ) : null}
              </Text>
              <Text>
                >Discount on Service: Min{' '}
                <Text style={{color: 'blue'}}>{discount1}</Text>
                {'\t'}- Max Discount:{' '}
                <Text style={{color: 'blue'}}>{discount2}</Text>
              </Text>
              <Text>
                >Saloon Rating of <Text style={{color: 'blue'}}>{rating}</Text>{' '}
                and up!
              </Text>
              <Text>
                >Saloons around{' '}
                <Text style={{color: 'blue'}}>{distance} km</Text> of distance
                near location{' '}
              </Text>
            </View>
          ) : (
            <View style={{margin: 10, backgroundColor: 'grey', padding: 10}}>
              <Text style={{fontSize: 17}}>فلٹرز کا خلاصہ</Text>
              <Text>
                >ہم اس کے قریب تلاش کر رہے ہیں:{' '}
                <Text style={{color: 'blue'}}>آپ کے مقام کے قریب</Text>
              </Text>
              <Text>
                >سیلون کی کم سے کم قیمت:
                <Text style={{color: 'blue'}}>{price}</Text>
                {'\t'}- سیلون زیادہ سے زیادہ قیمت:{' '}
                <Text style={{color: 'blue'}}>{price2}</Text>
              </Text>
              <Text>
                >سروس تلاش ٹیگ:{' '}
                {services ? (
                  <Text style={{color: 'blue'}}>{services}</Text>
                ) : (
                  'کچھ نہیں'
                )}{' '}
              </Text>
              <Text>
                {services ? (
                  <Text>
                    >سروس کی کم سے کم قیمت:{' '}
                    <Text style={{color: 'blue'}}>{price5}</Text>
                    {'\t'}- زیادہ سے زیادہ قیمت:{' '}
                    <Text style={{color: 'blue'}}>{price6}</Text>
                  </Text>
                ) : null}
              </Text>
              <Text>
                >خدمت پر چھوٹ: کم سے کم{' '}
                <Text style={{color: 'blue'}}>{discount1}</Text>
                {'\t'}- زیادہ سے زیادہ چھوٹ:{' '}
                <Text style={{color: 'blue'}}>{discount2}</Text>
              </Text>
              <Text>
                >سیلون کی درجہ بندی{' '}
                <Text style={{color: 'blue'}}>{rating}</Text> اور اوپر
              </Text>
              <Text>
                >آس پاس سیلون<Text style={{color: 'blue'}}>{distance} km</Text>
                مقام کے قریب فاصلہ{' '}
              </Text>
            </View>
          )}

          {searchedPlaces.length === 0 ? (
            <View style={{padding: 10}}>
              {!priceSet || !priceSet2 ? (
                <Text style={searchedlistStylist.texcolor}>
                  {store3.getState().length === 0 ||
                  store3.getState()[0].language === 'English'
                    ? 'Enter Price filters correctly!'
                    : 'قیمت کے فلٹرز کو صحیح طریقے سے درج کریں!'}
                </Text>
              ) : null}
            </View>
          ) : null}
          {searchedPlaces.length === 0 ? (
            <View style={{padding: 10}}>
              <Text style={searchedlistStylist.texcolor}>
                {store3.getState().length === 0 ||
                store3.getState()[0].language === 'English'
                  ? 'No Saloons found!'
                  : 'کوئی سیلون نہیں ملا'}
              </Text>
            </View>
          ) : null}

          {searchedPlaces.map(salon => (
            <View>
              <TouchableOpacity
                style={searchedlistStylist.TouchableOpacity}
                onPress={() => {
                  props.navigation.navigate('Profile', {
                    app_id: 0,
                    id: salon._id,
                    name: salon.saloonName,
                    screenNumber: 1,
                  });
                }}>
                <View>
                  <View style={searchedlistStylist.saloonimage}>
                    <Image
                      style={searchedlistStylist.saloonimageactual}
                      source={{
                        uri: salon.saloonBestImage,
                      }}
                    />
                    {salon.saloonGender === 'male' ? (
                      <View style={searchedlistStylist.maleiconview}>
                        <Fontisto.Button
                          name={'male'}
                          size={25}
                          color={'#182920'}
                          style={searchedlistStylist.GenderIcon}
                        />
                        <Text>
                          {store3.getState().length === 0 ||
                          store3.getState()[0].language === 'English'
                            ? 'For Men'
                            : 'مردوں کے لئے'}
                        </Text>
                      </View>
                    ) : (
                      <View style={searchedlistStylist.maleiconview}>
                        <Fontisto.Button
                          name={'female'}
                          size={25}
                          color={'#182920'}
                          style={searchedlistStylist.GenderIcon}
                        />
                        <Text>
                          {store3.getState().length === 0 ||
                          store3.getState()[0].language === 'English'
                            ? 'For Women'
                            : 'خواتین کے لئے'}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text style={searchedlistStylist.salonServices2}>
                    {store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                      ? 'Saloon Name: '
                      : 'سیلون کا نام: '}
                    <Text style={searchedlistStylist.salonServices}>
                      {salon.saloonName}
                    </Text>
                  </Text>
                  <Text style={searchedlistStylist.salonServices2}>
                    {store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                      ? 'Services: '
                      : 'بہترین سہولیات: '}
                    <Text style={searchedlistStylist.salonServices}>
                      {salon.saloonBestServices}
                    </Text>
                  </Text>

                  <View style={searchedlistStylist.priceview}>
                    <Text style={searchedlistStylist.pricetext}>
                      {store3.getState().length === 0 ||
                      store3.getState()[0].language === 'English'
                        ? 'Minimum Price: '
                        : 'کم سے کم قیمت: '}
                      RS.{' '}
                      <Text style={searchedlistStylist.pricetext2}>
                        {salon.saloonMinPrice}
                      </Text>
                    </Text>

                    <Text style={searchedlistStylist.overallrating}>
                      {store3.getState().length === 0 ||
                      store3.getState()[0].language === 'English'
                        ? 'Rating: '
                        : 'درجہ بندی: '}{' '}
                      <Text style={searchedlistStylist.salonPriceMin}>
                        {salon.saloonOverallRating}
                      </Text>
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={searchedlistStylist.Viewm}>
                <TouchableOpacity
                  onPress={() => {
                    if (store2.getState()[0].logged) {
                      props.navigation.navigate('Saloon Location', {
                        screenNumber: 2,
                        latitude: salon.saloonAddress.saloonLat,
                        longitude: salon.saloonAddress.saloonlng,
                      });
                    } else {
                      // setLoading(false);

                      props.navigation.navigate('Login', {
                        screenNumber: 4, // login for usage
                      });
                    }
                  }}
                  style={searchedlistStylist.locationout}>
                  <Entypo.Button
                    name={'location'}
                    size={23}
                    color={'white'}
                    style={searchedlistStylist.locicon}
                    backgroundColor={'darkgreen'}
                  />
                  <Text style={searchedlistStylist.getD}>
                    {store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                      ? 'Get Directions'
                      : 'سمت حاصل کریں'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      }
    </View>
  );
}

export default SearchedList;
