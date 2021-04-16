import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  RefreshControl,
  AsyncStorage,
} from 'react-native';
import {styles, topBar} from '../styleSheeet/styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import ip from '../ipadd/ip';
import {notificationsStyling} from '../styleSheeet/screenStyles';
import store3 from '../redux/store3';

function Notifications(props) {
  const [notifications, setNotifications] = useState([]);
  const [ref, setRef] = useState(true);
  const [loading, setLoading] = useState(true);

  const getNotifictions = async () => {
    try {
      const value = await AsyncStorage.getItem('loginkeysasa');
      if (value === null) {
        props.navigation.navigate('Login', {
          screenNumber: 4, // loginfor app use
        });
      } else {
        const {data: responseJson} = await axios.get(
          'https://' +
            ip +
            '/api/notifications/getNotificationsWRTcustomer',
          {
            headers: {
              'x-auth-token': value,
            },
          },
        );
        if (responseJson === 0 || responseJson === undefined) {
          Alert.alert(
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'No notifications found!'
            ):(
              'کوئی اطلاعات نہیں ملیں!'
            )
              ,
              (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                'No notification has found for now. Check back later for latest updates.'                        ):(
                  'ابھی تک کوئی اطلاع موصول نہیں ہوئی ہے۔ تازہ کاری کے لئے بعد میں دوبارہ چیک کریں۔ '
              )
            
            ,
            [
              {
                //style: "cancel"
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: true},
          );
          setNotifications([]);
        } else {
          console.log(responseJson);
          setNotifications(responseJson);
        }
      }
    } catch (ex) {
      console.log(ex);
    }
    setRef(false);
  };

  notifications && loading
    ? //get notifications from db wrt customer id
      (getNotifictions(), setLoading(false))
    : console.log('');

  const _onRefresh = () => {
    setRef(true);
    getNotifictions();
  };

  return (
    <View
      style={notificationsStyling.container}>
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
      
        {<Text style={topBar.heading}>
          {
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Notifications'
            ):(
              'اطلاعات'
            )
          }
        </Text>}
      </View>
      {
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={ref} onRefresh={_onRefresh} />
          }>
          {notifications.length === 0 ? (
            <Text style={notificationsStyling.noHint}>
              
              {
                (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                  'No notifictions found!'
                ):(
                  'کوئی اطلاع نہیں ملی!'
                )
              }
            </Text>
          ) : (
            notifications.map(notification =>
              notification.eligible ? (
                <TouchableOpacity
                  style={notificationsStyling.myApps}
                  onPress={() => {
                    notification.type === 'appointment'
                      ? props.navigation.navigate('My Appointments', {
                          screenNumber: 2,
                        })
                      : console.log();
                  }}>
                  <View
                    style={notificationsStyling.gap}
                  />

                  <View style={notificationsStyling.arrange}>
                    {notification.eligible ? (
                      <View>
                        <View
                          style={notificationsStyling.nameview}>
                          <Text
                            style={notificationsStyling.text}>
                            {notification.name}
                          </Text>
                        </View>
                        <Text
                          style={notificationsStyling.description}>
                          {notification.description}

                          {notification.type === 'appointment' ? (
                            <Text style={notificationsStyling.section}>
                              {' '}
                              {'\n\n'}
                              
                              {
                                (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                                  '*Tap once to go to the "My Appointments" Section. '
                                ):(
                                  '* "میری میٹنگز" سیکشن میں جانے کے لئے ایک بار کلک کریں۔'
                                )
                              }
                            </Text>
                          ) : null}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  <View
                    style={notificationsStyling.heightGap}
                  />
                </TouchableOpacity>
              ) : (
                console.log()
              ),
            )
          )}
        </ScrollView>
      }
    </View>
  );
}



export default Notifications;
