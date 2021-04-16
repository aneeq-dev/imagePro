import React, {useState, useEffect, useRef} from 'react';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {styles, stylesMenuButton, topBar} from '../styleSheeet/styles';
import {
  mainMapScreenStyling,
  settingsStyling,
} from '../styleSheeet/screenStyles';
import {AsyncStorage} from 'react-native';
import store2 from '../redux/store2';
import store3 from '../redux/store3';
import jwtDecode from 'jwt-decode';
import App from '../App';
import SearchArea from '../movieSrc/SearchArea/SearchArea';

function Settings(props) {
  const [accountSettingsDisplay, setAccountSettingsDisplay] = useState(false);
  const [accountSettingsDisplay2, setAccountSettingsDisplay2] = useState(false);
  const [accountSettingsDisplay3, setAccountSettingsDisplay3] = useState(false);
  const [logiN, setLogiN] = useState(false);
  const [signUP, setSignUP] = useState(false);
  const [switchoff, setSwitchOff] = useState(false);
  const [showed, setShowed] = useState(false);
  const [i, seti] = useState(1);

  const [isSearch, setIsSearch] = useState(false);
  const [count, setCount] = useState(0);

  const searchChanged = useRef(null);

  // if not login or not sign up -> show both options -> sign up and login
  // if not login -> change personal info navigate to 'login screen'
  // if login -> show logout option - dont show login and sign up screen

  const screenNumber = props.route.params.screenNumber;

  useEffect(() => {
    store2.getState()[0].logged
      ? (setSwitchOff(true), setShowed(true))
      : (setSwitchOff(false), setShowed(true));
  });

  {
    !showed ? (screenNumber === 1 ? null : null) : null;
  }

  const signUp = () => {
    props.navigation.navigate('Personal Info', {
      screenNumber: 2,
    });
  };

  const login = () => {
    props.navigation.navigate('Login', {
      screenNumber: 2, // actual login selecting from menu
    });
  };
  const login2 = () => {
    props.navigation.navigate('Login', {
      screenNumber: 1, // login while sign up
    });
  };

  const logout = async () => {
    console.log('Logout pressed');

    try {
      const value = await AsyncStorage.setItem('loginkeysasa', '');

      //const customer = jwtDecode(value);
      store2.dispatch({
        type: 'LOGGED IN',
        payload: {
          logged: false,
        },
      });

      App.updateMe();

      props.navigation.navigate('Login', {
        screenNumber: 2,
      });
      /*props.navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'Search Saloons Near',
                   // params: { someParam: 'Param1' },
                  },
                ],
              });
*/
      setSwitchOff(false);
      // console.log("Logout pressed8889");

      //seti(i+1);
    } catch (err) {
      console.error(err);
    }
  };

  const personalinfo = () => {
    props.navigation.navigate('Personal Info', {
      screenNumber: 1,
    });
  };

  const changelang = () => {
    props.navigation.navigate('Language');
  };

  const changepass = () => {
    if (!logiN) {
      props.navigation.navigate('Login', {
        screenNumber: 3, // login while change password
      });
    } else {
      props.navigation.navigate('Passwords');
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

  const setSearch = () => {
    setIsSearch(false);
  };

  const updateDestinationInuptState = destination => {
    //this.setState({ destination });
    // this.onChangeDestinationDebounced(destination);
  };
  return (
    <View style={settingsStyling.container}>
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
          height: Dimensions.get('screen').height / 8,
        }}
      />
      <ScrollView
        style={{
          zIndex: -2,
        }}>
        <View
          style={{
            height: Dimensions.get('window').height / 10,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingHorizontal: Dimensions.get('window').width / 20,
            backgroundColor: '#008199',
            borderRadius: 10,
            elevation: 5,
            //\ marginBottom: 5,
            margin: 5,
          }}
          onPress={() => accountSettingsDisplayer()}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'ElmessiriSemibold-2O74K',
              color: 'white',
            }}>
            {store3.getState().length === 0 ||
            store3.getState()[0].language === 'English'
              ? 'Account Settings'
              : 'اکاؤنٹ کی ترتیبات'}
          </Text>

          {accountSettingsDisplay ? (
            <FontAwesome.Button
              name={'caret-up'}
              size={23}
              backgroundColor={'#008199'}
              color={'white'}
              style={{
                backgroundColor: '#008199',
              }}
              underlayColor="transparent"
              onPress={() => {
                accountSettingsDisplayer();
              }}
            />
          ) : (
            <FontAwesome.Button
              name={'caret-down'}
              size={23}
              backgroundColor={'#008199'}
              color={'white'}
              style={{
                backgroundColor: '#008199',
              }}
              underlayColor="transparent"
              onPress={() => {
                accountSettingsDisplayer();
              }}
            />
          )}
        </View>

        {accountSettingsDisplay ? (
          <View>
            <TouchableOpacity
              onPress={
                !logiN // if not login then goto login else go to personal info (2nd case)
                  ? () => login2()
                  : () => personalinfo()
              }
              style={settingsStyling.personalinfotouch}>
              <FontAwesome.Button
                name={'edit'}
                size={23}
                backgroundColor={'#0076a8'}
                color={'white'}
                style={settingsStyling.personalicn}
                underlayColor="transparent"
              />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'ElmessiriSemibold-2O74K',
                  color: 'white',
                }}>
                {store3.getState().length === 0 ||
                store3.getState()[0].language === 'English'
                  ? 'Change Personal Info'
                  : 'ذاتی معلومات کو تبدیل کریں'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          console.log('cannot')
        )}

        <View
          style={{
            height: Dimensions.get('window').height / 10,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingHorizontal: Dimensions.get('window').width / 20,
            backgroundColor: '#008199',
            elevation: 5,
            borderRadius: 10,
            // marginBottom: 5,
            margin: 5,
          }}
          onPress={() => accountSettingsDisplayer2()}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'ElmessiriSemibold-2O74K',
              color: 'white',
            }}>
            {store3.getState().length === 0 ||
            store3.getState()[0].language === 'English'
              ? 'Security and Login'
              : 'سیکیورٹی اور لاگ ان'}
          </Text>

          {accountSettingsDisplay2 ? (
            <FontAwesome.Button
              name={'caret-up'}
              size={23}
              backgroundColor={'#008199'}
              color={'white'}
              style={{backgroundColor: '#008199'}}
              underlayColor="transparent"
              onPress={() => {
                accountSettingsDisplayer2();
              }}
            />
          ) : (
            <FontAwesome.Button
              name={'caret-down'}
              size={23}
              backgroundColor={'#008199'}
              color={'white'}
              style={{backgroundColor: '#008199'}}
              underlayColor="transparent"
              onPress={() => {
                accountSettingsDisplayer2();
              }}
            />
          )}
        </View>

        {accountSettingsDisplay2 ? (
          <View>
            {
              // if not login nor sign up then show both options (1st case)
              // switchoff => signup and login => false
              (console.log('rend: ', store2.getState()[0].logged),
              !store2.getState()[0].logged && !switchoff ? ( //
                <TouchableOpacity
                  onPress={() => signUp()}
                  style={settingsStyling.personalinfotouch}>
                  <FontAwesome.Button
                    name={'user-plus'}
                    size={23}
                    backgroundColor={'#005363'}
                    color={'white'}
                    style={settingsStyling.personalicn}
                    underlayColor="transparent"
                  />

                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'ElmessiriSemibold-2O74K',
                      color: 'white',
                    }}>
                    {store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                      ? 'Sign up'
                      : 'سائن اپ'}
                  </Text>
                </TouchableOpacity>
              ) : null)
            }

            {!store2.getState()[0].logged && !switchoff ? ( // if not logged =false & not switched off = false
              <TouchableOpacity
                onPress={() => login()}
                style={settingsStyling.personalinfotouch}>
                <FontAwesome.Button
                  name={'sign-in'}
                  size={23}
                  backgroundColor={'#005363'}
                  color={'white'}
                  style={settingsStyling.personalicn}
                  underlayColor="transparent"
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'ElmessiriSemibold-2O74K',
                    color: 'white',
                  }}>
                  {store3.getState().length === 0 ||
                  store3.getState()[0].language === 'English'
                    ? 'Login'
                    : 'لاگ ان کریں'}
                </Text>
              </TouchableOpacity>
            ) : (
              console.log('show logout button')
            )}

            {store2.getState()[0].logged && switchoff ? (
              //   if login
              // and switched off
              <TouchableOpacity
                onPress={() => logout()}
                style={settingsStyling.personalinfotouch}>
                <FontAwesome.Button
                  name={'sign-out'}
                  size={23}
                  backgroundColor={'#005363'}
                  color={'white'}
                  style={settingsStyling.personalicn}
                  underlayColor="transparent"
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'ElmessiriSemibold-2O74K',
                    color: 'white',
                  }}>
                  {store3.getState().length === 0 ||
                  store3.getState()[0].language === 'English'
                    ? 'Logout'
                    : 'لاگ آوٹ'}
                </Text>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              onPress={() => changepass()}
              style={settingsStyling.personalinfotouch}>
              <FontAwesome.Button
                name={'unlock-alt'}
                size={23}
                backgroundColor={'#005363'}
                color={'white'}
                style={settingsStyling.personalicn}
                underlayColor="transparent"
              />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'ElmessiriSemibold-2O74K',
                  color: 'white',
                }}>
                {store3.getState().length === 0 ||
                store3.getState()[0].language === 'English'
                  ? 'Change Passwords'
                  : 'پاس ورڈ تبدیل کریں'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          console.log('nothing')
        )}

        <View style={settingsStyling.gap} />
      </ScrollView>
    </View>
  );
}

export default Settings;
