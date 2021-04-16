import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
  RefreshControl,
  AsyncStorage,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {myAppointmentsStyling} from '../styleSheeet/screenStyles';

import {act} from 'react-test-renderer';
import {set} from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';

import {topBar} from '../styleSheeet/styles';
import {Rating, AirbnbRating} from 'react-native-ratings';
import axios from 'axios';
import ip from '../ipadd/ip';
import {StackActions} from '@react-navigation/native';
import store2 from '../redux/store2';
import store3 from '../redux/store3';

function MyAppointments(props) {
  const [loading, setLoading] = useState(true);
  const [ref, setRef] = useState(true);
  const [d, setD] = useState(false);
  const [registered, setRegistered] = useState(true);
  const [keyCh, setkeyCh] = useState(1);
  const [history, setHistory] = useState(false);
  const [RegisteredAppointments, setRegisteredAppointments] = useState([]);
  const [HistoryAppointments, setHistoryAppointments] = useState([]);
  const [m, setm] = useState([]);

  // will sort items wrt active or not
  function compare(a) {
    // console.log(a);
    if (a.status === 'Completed') return 1;
    if (a.status === 'Confirming' || a.status === 'Confirmed') return -1;
    return 0;
  }
  //console.log("hissss: ",HistoryAppointments.length);
  if (
    !(
      HistoryAppointments.length === 0 ||
      HistoryAppointments.length === undefined
    ) &&
    !loading
  ) {
    HistoryAppointments.sort(compare);
  } else if (HistoryAppointments.length === undefined) {
    setHistoryAppointments([]);
  }

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      _onRefresh();
    });
    return unsubscribe;
  }, [props.navigation]);

  const registeredQuery = async () => {
    setLoading(true);
    setRef(true);
    // frst clear out the array to zero item
    // here goes your query, fetching the registered appointments wrt to users id, registered are those which are
    // confirming and confirmed appointments,
    try {
      const value = await AsyncStorage.getItem('loginkeysasa');

      const {data: responseJson} = await axios.get(
        'https://' + ip + '/api/appointments/getRegAppointments',
        {
          headers: {
            'x-auth-token': value,
          },
        },
      );
      console.log('njn: ', responseJson);
      if (responseJson === 0 || responseJson === undefined) {
        Alert.alert(
          store3.getState().length === 0 ||
            store3.getState()[0].language === 'English'
            ? 'No registered appointments found!'
            : 'کوئی رجسٹرڈ ملاقاتیں نہیں ملیں!',
          store3.getState().length === 0 ||
            store3.getState()[0].language === 'English'
            ? 'We cannot find out any registered appointments for your account...'
            : 'ہم آپ کے اکاؤنٹ کے لئے کوئی رجسٹرڈ اپائنٹمنٹ نہیں ڈھونڈ سکتے ہیں۔',
          [
            {
              //style: "cancel"
            },
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
            },
          ],
          {cancelable: true},
        );
        setRegisteredAppointments([]);
        // do nothing
      } else {
        setRegisteredAppointments(responseJson);
      }
    } catch (ex) {
      console.log(ex.response.data);
    }
    setHistory(false);
    setRegistered(true);
    setRef(false);
    setLoading(false);
    //  console.log("presses")
  };

  if (loading && !d) {
    console.log('gh: ', store2.getState()[0].logged);
    if (store2.getState()[0].logged) {
      registeredQuery();
    } else {
      setLoading(false);

      props.navigation.navigate('Login', {
        screenNumber: 4, // login while change password
      });
    }
    setD(true);
  }

  const historyQuery = async () => {
    // setLoading(true);
    setRef(true);
    try {
      const value = await AsyncStorage.getItem('loginkeysasa');

      const {data: responseJson} = await axios.get(
        'https://' + ip + '/api/appointments/getHisAppointments',
        {
          headers: {
            'x-auth-token': value,
          },
        },
      );
      console.log('mmm: ', responseJson);
      if (responseJson === 0 || responseJson === undefined) {
        // do nothing
        //console.log("s: ",responseJson)
        Alert.alert(
          store3.getState().length === 0 ||
            store3.getState()[0].language === 'English'
            ? 'No registered appointments found!'
            : 'کوئی رجسٹرڈ ملاقاتیں نہیں ملیں!',
          store3.getState().length === 0 ||
            store3.getState()[0].language === 'English'
            ? 'We cannot find out any registered appointments for your account...'
            : 'ہم آپ کے اکاؤنٹ کے لئے کوئی رجسٹرڈ اپائنٹمنٹ نہیں ڈھونڈ سکتے ہیں۔',
          [
            {
              //style: "cancel"
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: true},
        );
        setHistoryAppointments([]);
      } else {
        setHistoryAppointments(responseJson);
      }
    } catch (ex) {
      console.log(ex.response.data);
    }
    // here goes your query, fetching the registered appointments wrt to users id, active as well as not active
    setRegistered(false);
    setHistory(true);
    setLoading(false);
    setRef(false);
  };

  /*   */

  const cancelApp = async appointmentID => {
    // OPTIMISTIC APPROACH - remove item from array
    //setLoading(true);
    var item;
    for (var i = 0; i < HistoryAppointments.length; i++) {
      if (HistoryAppointments[i]._id === appointmentID) {
        item = HistoryAppointments.splice(i, 1);
      }
    }
    for (var i = 0; i < RegisteredAppointments.length; i++) {
      if (RegisteredAppointments[i]._id === appointmentID) {
        item = RegisteredAppointments.splice(i, 1);
      }
    }

    setHistoryAppointments(HistoryAppointments);
    setRegisteredAppointments(RegisteredAppointments);
    setkeyCh(Math.random());
    //console.log(item); // keep record of removed item

    // here goes query for cancelling the appointment wrt to appointment id  and users id
    try {
      const value = await AsyncStorage.getItem('loginkeysasa');

      const {data: responseJson} = await axios.delete(
        'https://' +
          ip +
          '/api/appointments/deleteApp?appointmentID=' +
          appointmentID,
        {
          headers: {
            'x-auth-token': value,
          },
        },
      );

      if (responseJson.length === 0 || responseJson === undefined) {
        // do nothing

        //  console.log("nothing");
        Alert.alert(
          store3.getState().length === 0 ||
            store3.getState()[0].language === 'English'
            ? 'Appointment Not Cancelled!'
            : 'ملاقات منسوخ نہیں ہوئی!',
          store3.getState().length === 0 ||
            store3.getState()[0].language === 'English'
            ? "Appointment didn't cancelled successfully!"
            : 'ہم معذرت خواہ ہیں ملاقات منسوخ نہیں ہوئی!',
          [
            {
              //style: "cancel"
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: true},
        );
        if (registered) {
          if (store2.getState()[0].logged) {
            registeredQuery();
          } else {
            //setLoading(false);
            props.navigation.navigate('Login', {
              screenNumber: 4, // login while change password
            });
          }
        } else {
          {
            if (store2.getState()[0].logged) {
              historyQuery();
            } else {
              setLoading(false);

              props.navigation.navigate('Login', {
                screenNumber: 4, // login while change password
              });
            }
          }
        }

        //else alert appointment didnot cancelled successfully
        //and again add item to array

        setHistoryAppointments([...HistoryAppointments, ...item]);
        setRegisteredAppointments([...RegisteredAppointments, ...item]);
        // HistoryAppointments.push(item);
        //RegisteredAppointments.push(item);
        //console.log("itemmm: ",item);
        //setLoading(true);
      } else {
        // and alert appointment successfully
        Alert.alert(
          store3.getState().length === 0 ||
            store3.getState()[0].language === 'English'
            ? 'Appointment Cancelled!'
            : 'تقرری منسوخ کردی گئی ہے',
          store3.getState().length === 0 ||
            store3.getState()[0].language === 'English'
            ? 'Appointment has been cancelled.'
            : 'ملاقات کامیابی کے ساتھ منسوخ کردی گئی ہے',
          [
            {
              //style: "cancel"
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: true},
        );
      }
    } catch (ex) {
      console.log(ex.response.data);
    }
    // on recieving promise

    //console.log(HistoryAppointments);
    setLoading(false);
  };

  const cancelApp2 = async appointmentID => {
    // here goes query for cancelling the appointment wrt to appointment id  and users id
    try {
      const value = await AsyncStorage.getItem('loginkeysasa');
      const obj = {};
      const {data: responseJson} = await axios.put(
        'https://' +
          ip +
          '/api/appointments/cancelTheAppAfterConfirmCustomer?appointmentID=' +
          appointmentID,
        obj,
        {
          headers: {
            'x-auth-token': value,
          },
        },
      );

      if (responseJson.length === 0 || responseJson === undefined) {
        // do nothing
        Alert.alert(
          store3.getState().length === 0 ||
            store3.getState()[0].language === 'English'
            ? 'Appointment Not Cancelled!'
            : 'ملاقات منسوخ نہیں ہوئی!',
          store3.getState().length === 0 ||
            store3.getState()[0].language === 'English'
            ? "Appointment didn't cancelled successfully!"
            : 'ہم معذرت خواہ ہیں ملاقات منسوخ نہیں ہوئی!',
          [
            {
              //style: "cancel"
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: true},
        ); //  console.log("nothing");

        if (registered) {
          if (store2.getState()[0].logged) {
            registeredQuery();
          } else {
            //setLoading(false);
            props.navigation.navigate('Login', {
              screenNumber: 4, // login while change password
            });
          }
        } else {
          {
            if (store2.getState()[0].logged) {
              historyQuery();
            } else {
              setLoading(false);

              props.navigation.navigate('Login', {
                screenNumber: 4, // login while change password
              });
            }
          }
        }
      } else {
        Alert.alert(
          store3.getState().length === 0 ||
            store3.getState()[0].language === 'English'
            ? 'Appointment Cancelled!'
            : 'تقرری منسوخ کردی گئی ہے',
          store3.getState().length === 0 ||
            store3.getState()[0].language === 'English'
            ? 'Appointment has been cancelled.'
            : 'ملاقات کامیابی کے ساتھ منسوخ کردی گئی ہے',
          [
            {
              //style: "cancel"
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: true},
        );
        if (registered) {
          registeredQuery();
        } else {
          historyQuery();
        }
        //window.location.href = "/appointments/2";
      }
    } catch (ex) {
      console.log(ex.response.data);
    }
    // on recieving promise

    //console.log(HistoryAppointments);
    setLoading(false);
  };

  const _onRefresh = () => {
    setRef(true);
    if (registered) {
      //console.log(store2.getState()[0].logged);
      if (store2.getState()[0].logged) {
        registeredQuery().then(() => {
          setRef(false);
        });
      } else {
        //setLoading(false);
        props.navigation.navigate('Login', {
          screenNumber: 4, // login while change password
        });
      }
    } else {
      if (store2.getState()[0].logged) {
        historyQuery().then(() => {
          setRef(false);
        });
      } else {
        //setLoading(false);
        props.navigation.navigate('Login', {
          screenNumber: 4, // login while change password
        });
      }
    }
  };

  return (
    <View key={keyCh}>
      {props.route.params.screenNumber === 1 ? (
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

          <Text style={topBar.heading}>
            {store3.getState().length === 0 ||
            store3.getState()[0].language === 'English'
              ? 'My Appointments'
              : 'میری ملاقاتیں'}
          </Text>
        </View>
      ) : (
        console.log()
      )}
      <View style={myAppointmentsStyling.view}>
        <View>
          <View style={myAppointmentsStyling.regbutton}>
            {registered ? (
              <TouchableOpacity
                style={myAppointmentsStyling.regbuttontouch}
                onPress={() => {
                  if (store2.getState()[0].logged) {
                    registeredQuery();
                  } else {
                    setLoading(false);

                    props.navigation.navigate('Login', {
                      screenNumber: 4, // login while change password
                    });
                  }
                }}>
                <Text style={myAppointmentsStyling.appButtonText}>
                  {store3.getState().length === 0 ||
                  store3.getState()[0].language === 'English'
                    ? 'Registered'
                    : 'نئی ملاقاتیں'}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={myAppointmentsStyling.regbuttontouch2}
                onPress={() => {
                  if (store2.getState()[0].logged) {
                    registeredQuery();
                  } else {
                    setLoading(false);

                    props.navigation.navigate('Login', {
                      screenNumber: 4, // login while change password
                    });
                  }
                }}>
                <Text style={myAppointmentsStyling.appButtonText}>
                  {store3.getState().length === 0 ||
                  store3.getState()[0].language === 'English'
                    ? 'Registered'
                    : 'نئی ملاقاتیں'}
                </Text>
              </TouchableOpacity>
            )}
            {history ? (
              <TouchableOpacity
                style={myAppointmentsStyling.regbuttontouch}
                onPress={() => {
                  if (store2.getState()[0].logged) {
                    historyQuery();
                  } else {
                    setLoading(false);

                    props.navigation.navigate('Login', {
                      screenNumber: 4, // login while change password
                    });
                  }
                }}>
                <Text style={myAppointmentsStyling.appButtonText}>
                  {store3.getState().length === 0 ||
                  store3.getState()[0].language === 'English'
                    ? 'History'
                    : 'پچھلی ملاقاتیں'}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={myAppointmentsStyling.regbuttontouch2}>
                <Text
                  style={myAppointmentsStyling.appButtonText}
                  onPress={() => {
                    if (store2.getState()[0].logged) {
                      historyQuery();
                    } else {
                      setLoading(false);

                      props.navigation.navigate('Login', {
                        screenNumber: 4, // login while change password
                      });
                    }
                  }}>
                  {store3.getState().length === 0 ||
                  store3.getState()[0].language === 'English'
                    ? 'History'
                    : 'پچھلی ملاقاتیں'}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={myAppointmentsStyling.appButtonContainer2}>
              <Text style={myAppointmentsStyling.appButtonText}>History</Text>
            </TouchableOpacity>
          </View>
          <View style={myAppointmentsStyling.gap} />

          {registered ? (
            RegisteredAppointments.length === 0 ||
            RegisteredAppointments === undefined ? (
              <View>
                <Text style={myAppointmentsStyling.disclaim}>
                  {store3.getState().length === 0 ||
                  store3.getState()[0].language === 'English'
                    ? 'No Registered Appointments found!'
                    : 'کوئی نئی میٹنگ نہیں ملی!'}
                  {'\n\n'}
                  <Text style={myAppointmentsStyling.bad}>
                    {store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                      ? 'Note: Registered appointments includes Confirming and Confirmed Appointments Only!'
                      : 'نوٹ: رجسٹرڈ ملاقاتوں میں صرف تصدیق ہونے والی اور تصدیق شدہ ملاقاتیں شامل ہیں'}
                  </Text>
                </Text>
              </View>
            ) : null
          ) : HistoryAppointments.length === 0 ||
            HistoryAppointments === undefined ? (
            <View>
              <Text style={myAppointmentsStyling.disclaim}>
                {store3.getState().length === 0 ||
                store3.getState()[0].language === 'English'
                  ? 'No History Appointments found!'
                  : 'کوئی پچھلی ملاقاتیں نہیں مل پائیں!'}
                {'\n\n'}
                <Text style={myAppointmentsStyling.bad}>
                  {store3.getState().length === 0 ||
                  store3.getState()[0].language === 'English'
                    ? 'Note: History appointments includes all appointments you registered in past!'
                    : 'نوٹ: پچھلی ملاقاتوں میں وہ تمام ملاقاتیں شامل ہیں جو آپ نے ماضی میں رجسٹر کیں!'}
                </Text>
              </Text>
            </View>
          ) : null}
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={ref} onRefresh={_onRefresh} />
            }>
            {
              (loading
                ? //  <View style={{height:Dimensions.get('screen').height,backgroundColor:'white'}}>
                  //  <ActivityIndicator size="large" />
                  // </View>
                  null
                : console.log('histor: ', HistoryAppointments),
              (registered &&
              !(
                RegisteredAppointments.length === 0 ||
                RegisteredAppointments === undefined
              )
                ? RegisteredAppointments
                : !registered &&
                  !(
                    HistoryAppointments.length === 0 ||
                    HistoryAppointments === undefined
                  )
                ? HistoryAppointments
                : m
              ).map((appointment, i) =>
                appointment.saloonID === null ? null : (
                  <View style={myAppointmentsStyling.mainback}>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('Saloon Location', {
                          screenNumber: 2,
                          latitude:
                            appointment.saloonID.saloonAddress.saloonLat,
                          longitude:
                            appointment.saloonID.saloonAddress.saloonlng,
                        });
                      }}>
                      {console.log(appointment.saloonID, i)}
                      <Image
                        source={{
                          uri: appointment.saloonID.saloonBestImage,
                        }}
                        style={myAppointmentsStyling.flatListImage}
                      />
                      {appointment.status === 'Confirming' ? (
                        <MaterialCommunityIcons.Button
                          name={'progress-alert'}
                          size={25}
                          color={'#182920'}
                          style={myAppointmentsStyling.GenderIcon}>
                          <Text>
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Confirming your Appointment from Saloon.'
                              : 'ہم سیلون سے آپ کی ملاقات کی تصدیق کر رہے ہیں۔'}
                          </Text>
                        </MaterialCommunityIcons.Button>
                      ) : appointment.status === 'Confirmed' ? (
                        <MaterialIcons.Button
                          name={'done'}
                          size={25}
                          color={'white'}
                          backgroundColor={'lightgreen'}
                          style={myAppointmentsStyling.doneIcon}
                          // onPress={}
                        >
                          <Text style={myAppointmentsStyling.ok}>
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Appointment Confirmed by Saloon.'
                              : 'زبردست! سیلون سے ملاقات کی تصدیق ہوگئی ہے'}
                          </Text>
                        </MaterialIcons.Button>
                      ) : appointment.status === 'TimeUpdate' ? (
                        <MaterialCommunityIcons.Button
                          name={'timetable'}
                          size={25}
                          color={'black'}
                          backgroundColor={'lightgreen'}
                          style={myAppointmentsStyling.doneIcon2}
                          // onPress={}
                        >
                          <Text style={myAppointmentsStyling.ok2}>
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Time Updated and Confirmed by Saloon'
                              : 'وقت کی تازہ کاری اور سیلون کے ذریعہ تصدیق ہوگئی ہے'}
                          </Text>
                        </MaterialCommunityIcons.Button>
                      ) : appointment.status === 'NAN' ? (
                        <Entypo.Button
                          name={'circle-with-cross'}
                          size={25}
                          color={'black'}
                          backgroundColor={'white'}
                          style={myAppointmentsStyling.crossicon}>
                          <Text style={myAppointmentsStyling.ok2}>
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Time Passed'
                              : 'وقت گزر گیا'}
                          </Text>
                        </Entypo.Button>
                      ) : appointment.status === 'Cancelled' ? (
                        <Entypo.Button
                          name={'circle-with-cross'}
                          size={25}
                          color={'black'}
                          backgroundColor={'yellow'}
                          style={myAppointmentsStyling.crossicon2}>
                          <Text style={myAppointmentsStyling.ok2}>
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Appointment Cancelled by Saloon'
                              : 'سیلون کے ذریعہ تقرری منسوخ کردی گئی'}
                          </Text>
                        </Entypo.Button>
                      ) : appointment.status === 'Completed' ? (
                        <Ionicons.Button
                          name={'checkmark-done-circle'}
                          size={25}
                          color={'black'}
                          backgroundColor={'white'}
                          style={myAppointmentsStyling.doneiconcheck}>
                          <Text style={myAppointmentsStyling.ok2}>
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Appointment Completed'
                              : 'میٹنگ مکمل ہوئی'}
                          </Text>
                        </Ionicons.Button>
                      ) : appointment.status === 'Cust-Cancelled' ? (
                        <MaterialIcons.Button
                          name={'cancel'}
                          size={25}
                          color={'black'}
                          backgroundColor={'white'}
                          style={myAppointmentsStyling.doneIcon3}>
                          <Text style={myAppointmentsStyling.ok2}>
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Appointment Cancelled After Confirmation by You!'
                              : 'آپ کے ذریعہ تصدیق کے بعد تقرری منسوخ ہوگئی!'}
                          </Text>
                        </MaterialIcons.Button>
                      ) : appointment.status === 'Saloon-Cancelled' ? (
                        <MaterialCommunityIcons.Button
                          name={'table-cancel'}
                          size={25}
                          color={'black'}
                          backgroundColor={'white'}
                          style={myAppointmentsStyling.doneIcon4}>
                          <Text style={myAppointmentsStyling.ok2}>
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Appointment Cancelled After Confirmation by Saloon!'
                              : 'سیلون کی توثیق کے بعد تقرری منسوخ کردی گئی!'}
                          </Text>
                        </MaterialCommunityIcons.Button>
                      ) : appointment.status === 'Rescheduled' ? (
                        <MaterialIcons.Button
                          name={'schedule'}
                          size={25}
                          color={'black'}
                          backgroundColor={'white'}
                          style={myAppointmentsStyling.doneIcon5}>
                          <Text style={myAppointmentsStyling.ok2}>
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Appointment Rescheduled and Confirming!'
                              : 'تقرری کی میقات بندی اور تصدیق کی گئی!'}
                          </Text>
                        </MaterialIcons.Button>
                      ) : null}
                      <View style={myAppointmentsStyling.salonInfoBack}>
                        <View style={myAppointmentsStyling.salonBackHeight}>
                          <Text style={myAppointmentsStyling.salonServices3}>
                            {' '}
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Saloon Name:'
                              : 'سیلون کا نام: '}{' '}
                            <Text style={myAppointmentsStyling.salonServices5}>
                              {appointment.saloonID.saloonName.toUpperCase()}
                            </Text>
                          </Text>

                          <View style={myAppointmentsStyling.saloonrtingview}>
                            <Text style={myAppointmentsStyling.salonServices3}>
                              {' '}
                              {store3.getState().length === 0 ||
                              store3.getState()[0].language === 'English'
                                ? 'Saloon Rating: '
                                : 'سیلون کی درجہ بندی '}
                            </Text>
                            <Rating
                              type="star"
                              startingValue={
                                appointment.saloonID.saloonOverallRating
                              }
                              style={myAppointmentsStyling.ratingstyle}
                              ratingCount={5}
                              readonly={true}
                              imageSize={Dimensions.get('screen').height / 50}
                            />
                          </View>
                        </View>
                        {appointment.status === 'Confirming' ||
                        appointment.status === 'Rescheduled' ? (
                          <Text style={myAppointmentsStyling.salonServices2}>
                            {'\n'}
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Your selected date and time is:'
                              : ' آپ کی منتخب کردہ تاریخ اور وقت یہ ہے :'}
                            {'\n '}
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'From: '
                              : 'از:'}
                            <Text style={myAppointmentsStyling.salonServices4}>
                              Time:{' '}
                              {new Date(appointment.fromtiming).getHours() %
                                12 ===
                              0
                                ? 12 + ' '
                                : (new Date(appointment.fromtiming).getHours() %
                                    12) +
                                  ' '}
                              {store3.getState().length === 0 ||
                              store3.getState()[0].language === 'English'
                                ? ':'
                                : 'بج کر '}{' '}
                              {new Date(appointment.fromtiming).getMinutes() >=
                                0 &&
                              new Date(appointment.fromtiming).getMinutes() <= 9
                                ? '0' +
                                  new Date(
                                    appointment.fromtiming,
                                  ).getMinutes() +
                                  ' '
                                : new Date(
                                    appointment.fromtiming,
                                  ).getMinutes() + ''}
                              {store3.getState().length === 0 ||
                              store3.getState()[0].language === 'English'
                                ? ''
                                : ' منٹ پر'}
                              {new Date(appointment.fromtiming).getHours() /
                                12 >=
                              1
                                ? ' PM | '
                                : ' AM | '}
                              {store3.getState().length === 0 ||
                              store3.getState()[0].language === 'English'
                                ? 'Dated: '
                                : 'تاریخ: '}{' '}
                              {new Date(appointment.fromtiming).getDate()}-
                              {new Date(appointment.fromtiming).getMonth() + 1}-
                              {new Date(appointment.fromtiming).getFullYear()}{' '}
                              ('dd-mm-yyyy')
                            </Text>
                            {'\n'} {''}
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'To: '
                              : 'تا: '}
                            <Text style={myAppointmentsStyling.salonServices4}>
                              Time:{' '}
                              {new Date(appointment.totiming).getHours() %
                                12 ===
                              0
                                ? 12 + ' '
                                : (new Date(appointment.totiming).getHours() %
                                    12) +
                                  ' '}
                              :
                              {new Date(appointment.totiming).getMinutes() >=
                                0 &&
                              new Date(appointment.totiming).getMinutes() <= 9
                                ? '0' +
                                  new Date(appointment.totiming).getMinutes() +
                                  ' '
                                : new Date(appointment.totiming).getMinutes() +
                                  ''}
                              {new Date(appointment.totiming).getHours() / 12 >=
                              1
                                ? ' PM | '
                                : ' AM | '}
                              Dated: {new Date(appointment.totiming).getDate()}-
                              {new Date(appointment.totiming).getMonth() + 1}-
                              {new Date(appointment.totiming).getFullYear()}{' '}
                              ('dd-mm-yyyy')
                            </Text>
                            {'\n'}
                          </Text>
                        ) : appointment.status === 'Confirmed' ||
                          appointment.status === 'TimeUpdate' ? (
                          <Text style={myAppointmentsStyling.salonServices2}>
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Please reach saloon at: '
                              : ' برائے مہربانی اس وقت سیلون پہنچیں:'}{' '}
                            <Text style={myAppointmentsStyling.salonServices4}>
                              {store3.getState().length === 0 ||
                              store3.getState()[0].language === 'English'
                                ? 'Time: '
                                : 'وقت: '}{' '}
                              {new Date(appointment.completedDate).getHours() %
                                12 ===
                              0
                                ? 12 + ' '
                                : (new Date(
                                    appointment.completedDate,
                                  ).getHours() %
                                    12) +
                                  ' '}
                              {store3.getState().length === 0 ||
                              store3.getState()[0].language === 'English'
                                ? ':'
                                : 'بج کر '}
                              {new Date(
                                appointment.completedDate,
                              ).getMinutes() >= 0 &&
                              new Date(
                                appointment.completedDate,
                              ).getMinutes() <= 9
                                ? '0' +
                                  new Date(
                                    appointment.completedDate,
                                  ).getMinutes() +
                                  ' '
                                : new Date(
                                    appointment.completedDate,
                                  ).getMinutes() + ''}
                              {store3.getState().length === 0 ||
                              store3.getState()[0].language === 'English'
                                ? ''
                                : ' منٹ پر'}
                              {new Date(appointment.completedDate).getHours() /
                                12 >=
                              1
                                ? ' PM | '
                                : ' AM | '}
                              {store3.getState().length === 0 ||
                              store3.getState()[0].language === 'English'
                                ? 'Dated: '
                                : 'مورخہ: '}
                              {new Date(appointment.completedDate).getDate()}-
                              {new Date(appointment.completedDate).getMonth() +
                                1}
                              -
                              {new Date(
                                appointment.completedDate,
                              ).getFullYear()}{' '}
                              ('dd-mm-yyyy')
                            </Text>{' '}
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'to get the services'
                              : 'سہولیات حاصل کرنے کے لئے...'}
                          </Text>
                        ) : appointment.status === 'NAN' ? (
                          <Text style={myAppointmentsStyling.salonServices2}>
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Appointment Time has been Passed!'
                              : 'ملاقات کا وقت گزر چکا ہے'}
                          </Text>
                        ) : appointment.status === 'Completed' ? (
                          <Text style={myAppointmentsStyling.salonServices2}>
                            {' '}
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Your appointment had completed at: '
                              : 'آپ کی ملاقات اس تاریخ اور وقت پر مکمل ہوگئی ہے۔'}
                            <Text style={myAppointmentsStyling.salonServices}>
                              {store3.getState().length === 0 ||
                              store3.getState()[0].language === 'English'
                                ? 'Time: '
                                : 'وقت: '}{' '}
                              {new Date(appointment.completedDate).getHours() %
                                12 ===
                              0
                                ? 12 + ' '
                                : (new Date(
                                    appointment.completedDate,
                                  ).getHours() %
                                    12) +
                                  ' '}
                              {store3.getState().length === 0 ||
                              store3.getState()[0].language === 'English'
                                ? ':'
                                : 'بج کر '}
                              {new Date(
                                appointment.completedDate,
                              ).getMinutes() >= 0 &&
                              new Date(
                                appointment.completedDate,
                              ).getMinutes() <= 9
                                ? '0' +
                                  new Date(
                                    appointment.completedDate,
                                  ).getMinutes() +
                                  ' '
                                : new Date(
                                    appointment.completedDate,
                                  ).getMinutes() + ''}
                              {store3.getState().length === 0 ||
                              store3.getState()[0].language === 'English'
                                ? ''
                                : ' منٹ پر'}
                              {new Date(appointment.completedDate).getHours() /
                                12 >=
                              1
                                ? ' PM | '
                                : ' AM | '}
                              {store3.getState().length === 0 ||
                              store3.getState()[0].language === 'English'
                                ? 'Dated: '
                                : 'مورخہ: '}{' '}
                              {new Date(appointment.completedDate).getDate()}-
                              {new Date(appointment.completedDate).getMonth() +
                                1}
                              -
                              {new Date(
                                appointment.completedDate,
                              ).getFullYear()}{' '}
                              ('dd-mm-yyyy')
                            </Text>
                          </Text>
                        ) : null}
                        {appointment.status === 'Confirmed' ||
                        appointment.status === 'TimeUpdate' ? (
                          <Text style={myAppointmentsStyling.salonServices2}>
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Appointment secret code is: '
                              : 'تقرری کا کوڈ یہ ہے:'}
                            <Text style={myAppointmentsStyling.salonServices}>
                              {appointment.code}
                              {'   '}
                              {store3.getState().length === 0 ||
                              store3.getState()[0].language === 'English'
                                ? '(Tell this code to Saloon Owner)'
                                : '(آپ کی باری آنے پر سیلون کو مندرجہ بالا کوڈ بتائیں)'}
                            </Text>
                          </Text>
                        ) : null}
                        {!appointment.stylistID ? (
                          <Text style={myAppointmentsStyling.salonServices2}>
                            {'\n'}
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Stylist: '
                              : 'سٹائلسٹ:'}{' '}
                            <Text style={myAppointmentsStyling.salonServices4}>
                              {store3.getState().length === 0 ||
                              store3.getState()[0].language === 'English'
                                ? 'Any Stylist'
                                : 'کوئی بھی '}
                            </Text>
                          </Text>
                        ) : (
                          <Text style={myAppointmentsStyling.salonServices2}>
                            {'\n'}
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Stylist: '
                              : 'سٹائلسٹ:'}{' '}
                            <Text style={myAppointmentsStyling.salonServices4}>
                              {appointment.stylistID.stylistName}
                            </Text>
                          </Text>
                        )}
                        <View style={myAppointmentsStyling.regView}>
                          <Text style={myAppointmentsStyling.regtext}>
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Services Registered '
                              : 'سہولیات رجسٹرڈ'}
                          </Text>
                          {!(appointment.services.length === 0)
                            ? appointment.services.map(item => (
                                <View
                                  key={item._id}
                                  style={myAppointmentsStyling.services}>
                                  <Text
                                    style={myAppointmentsStyling.servicestext}>
                                    {item.name}
                                  </Text>
                                  <Text>
                                    {(
                                      item.price -
                                      item.price * (item.discount / 100)
                                    ).toFixed(0)}
                                  </Text>
                                </View>
                              ))
                            : null}
                          {// console.log("del: ",appointment.deals),
                          !(appointment.deals.length === 0)
                            ? appointment.deals.map(item => (
                                <View
                                  key={item._id}
                                  style={myAppointmentsStyling.services}>
                                  <Text
                                    style={myAppointmentsStyling.servicestext}>
                                    {item.saloonDealDetails.nameOfDeal}
                                  </Text>
                                  <Text
                                    style={myAppointmentsStyling.servicestext2}>
                                    {item.saloonDealDetails.priceOfDeal.toFixed()}
                                  </Text>
                                </View>
                              ))
                            : null}
                          <View style={myAppointmentsStyling.totalText}>
                            <Text style={myAppointmentsStyling.totalText2}>
                              {store3.getState().length === 0 ||
                              store3.getState()[0].language === 'English'
                                ? 'Total RS.'
                                : ':کل رقم'}{' '}
                            </Text>
                            <Text style={myAppointmentsStyling.totalText3}>
                              {appointment.total.toFixed(0)}
                            </Text>
                          </View>
                        </View>
                        <Text style={myAppointmentsStyling.dirText}>
                          {store3.getState().length === 0 ||
                          store3.getState()[0].language === 'English'
                            ? '*Tap once to get directions on map.'
                            : '* نقشہ پر ہدایات حاصل کرنے کے لئے ایک بار کلک کریں'}
                        </Text>

                        {appointment.status === 'Confirmed' ? (
                          <Text style={myAppointmentsStyling.dirText}>
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Alert! Once you cancelled this appointment after confirmation from saloon. Your rating will affect!'
                              : 'انتباہ! ایک بار سیلون سے تصدیق کے بعد آپ نے اس تقرری کو منسوخ کردیا۔ آپ کی درجہ بندی متاثر ہوگی!'}
                          </Text>
                        ) : appointment.status === 'TimeUpdate' ? (
                          <Text style={myAppointmentsStyling.dirText}>
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Alert! As this appointment was once confirmed by saloon so if you cancelled this appointment, your rating will be affected!'
                              : 'انتباہ! چونکہ اس ملاقات کی تصدیق ایک بار سیلون نے کی تھی لہذا اگر آپ نے اس تقرری کو منسوخ کردیا تو ، آپ کی درجہ بندی متاثر ہوگی!'}
                          </Text>
                        ) : null}

                        {appointment.status === 'Confirmed' ||
                        appointment.status === 'TimeUpdate' ? (
                          !appointment.updated ? null : (
                            <Text style={myAppointmentsStyling.dirText}>
                              {store3.getState().length === 0 ||
                              store3.getState()[0].language === 'English'
                                ? 'Appointment can be updated only once!'
                                : 'تقرری صرف ایک بار تازہ کاری کی جا سکتی ہے!'}
                            </Text>
                          )
                        ) : null}

                        {appointment.status === 'Confirming' ? (
                          <Text style={myAppointmentsStyling.dirText}>
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? '*Only Confirming Appointment can be updated or cancelled.'
                              : '* صرف تصدیق شدہ ملاقات کو اپ ڈیٹ یا منسوخ کیا جاسکتا ہے۔'}
                          </Text>
                        ) : (
                          console.log()
                        )}

                        {appointment.status === 'Rescheduled' ? (
                          <Text style={myAppointmentsStyling.dirText}>
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? '*Alert! As this appointment was once confirmed by saloon so if you cancelled this appointment, your rating will be affected!'
                              : '* انتباہ! چونکہ اس ملاقات کی تصدیق ایک بار سیلون نے کی تھی لہذا اگر آپ نے یہ تقرری منسوخ کردی تو آپ کی درجہ بندی متاثر ہوگی!'}
                          </Text>
                        ) : (
                          console.log()
                        )}
                      </View>
                    </TouchableOpacity>

                    {appointment.status === 'Confirming' ? (
                      <View style={myAppointmentsStyling.confirmView}>
                        <TouchableOpacity
                          onPress={() => {
                            props.navigation.navigate('Profile', {
                              app_id: appointment._id,
                              id: appointment.saloonID._id,

                              name: appointment.name,
                              screenNumber: 4,
                            }); //,console.log("ininmmmm: ",appointment.saloonID._id)
                          }}
                          style={myAppointmentsStyling.confirmtouch}>
                          <Text style={myAppointmentsStyling.update}>
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Update Appointment'
                              : 'میٹنگ کو اپ ڈیٹ کریں'}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={myAppointmentsStyling.cancelApp}
                          onPress={() => {
                            cancelApp(appointment._id);
                          }}>
                          <Text style={myAppointmentsStyling.cancelApptext}>
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Cancel Appointment'
                              : 'ملاقات منسوخ کریں'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : appointment.status === 'Completed' &&
                      !appointment.rated ? (
                      <View style={myAppointmentsStyling.confirmView}>
                        <TouchableOpacity
                          onPress={() => {
                            console.log('------>', appointment);
                            props.navigation.navigate('Ratin', {
                              app_id: appointment._id,
                              id: appointment.saloonID._id,

                              // name:appointment.name,
                              //screenNumber:2
                            }); //,console.log("ininmmmm: ",appointment.saloonID._id)
                          }}
                          style={myAppointmentsStyling.confirmtouch}>
                          <Text style={myAppointmentsStyling.update}>
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Rate Saloon'
                              : 'سیلون کا تبصرہ کریں'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : appointment.status === 'Confirmed' ||
                      appointment.status === 'TimeUpdate' ? (
                      <View style={myAppointmentsStyling.confirmView}>
                        {appointment.updated ? null : (
                          <TouchableOpacity
                            onPress={() => {
                              props.navigation.navigate('Profile', {
                                app_id: appointment._id,
                                id: appointment.saloonID._id,

                                name: appointment.name,
                                screenNumber: 3,
                              }); //,console.log("ininmmmm: ",appointment.saloonID._id)
                            }}
                            style={myAppointmentsStyling.confirmtouch}>
                            <Text style={myAppointmentsStyling.update}>
                              {store3.getState().length === 0 ||
                              store3.getState()[0].language === 'English'
                                ? 'Update Appointment'
                                : 'میٹنگ کو اپ ڈیٹ کریں'}
                            </Text>
                          </TouchableOpacity>
                        )}

                        <TouchableOpacity
                          style={myAppointmentsStyling.cancelApp}
                          onPress={() => {
                            cancelApp2(appointment._id);
                          }}>
                          <Text style={myAppointmentsStyling.cancelApptext}>
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Cancel Appointment'
                              : 'ملاقات منسوخ کریں'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : appointment.status === 'Saloon-Cancelled' &&
                      !appointment.rated ? (
                      <View style={myAppointmentsStyling.confirmView}>
                        <TouchableOpacity
                          onPress={() => {
                            console.log('------>', appointment);
                            props.navigation.navigate('Ratin', {
                              app_id: appointment._id,
                              id: appointment.saloonID._id,

                              // name:appointment.name,
                              //screenNumber:2
                            }); //,console.log("ininmmmm: ",appointment.saloonID._id)
                          }}
                          style={myAppointmentsStyling.confirmtouch}>
                          <Text style={myAppointmentsStyling.update}>
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Rate Saloon'
                              : 'سیلون کا تبصرہ کریں'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : appointment.status === 'Rescheduled' ? (
                      <View style={myAppointmentsStyling.confirmView}>
                        <TouchableOpacity
                          style={myAppointmentsStyling.cancelApp}
                          onPress={() => {
                            cancelApp2(appointment._id);
                          }}>
                          <Text style={myAppointmentsStyling.cancelApptext}>
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Cancel Appointment'
                              : 'ملاقات منسوخ کریں'}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : appointment.rated ? (
                      <View style={myAppointmentsStyling.confirmView}>
                        <View style={myAppointmentsStyling.confirmtouch2}>
                          <Text style={myAppointmentsStyling.cancelApptext}>
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English'
                              ? 'Rated!'
                              : 'تبصرہ ہو چکا'}
                          </Text>
                        </View>
                      </View>
                    ) : null}
                    <View style={myAppointmentsStyling.gap2} />
                  </View>
                ),
              ))
            }
            <View style={myAppointmentsStyling.gap3} />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

export default MyAppointments;
