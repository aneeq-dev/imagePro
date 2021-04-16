import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Alert,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {loginStyling} from '../styleSheeet/screenStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import joi from 'react-native-joi-validation';
import axios from 'axios';
import ip from '../ipadd/ip';
import {AsyncStorage} from 'react-native';
import store from '../redux/store';
import store2 from '../redux/store2';
import App from '../App';
import store3 from '../redux/store3';

function Login(props) {
  const [phone, setphone] = useState('+923');
  const [password, setPassword] = useState('');
  const [phoneOk, setPhoneOk] = useState(true);
  const [passwordOk, setPasswordOk] = useState(true);
  const [errors, setErrors] = useState('');

  const screenNumber = props.route.params.screenNumber;

  const validateInput = data => {
    // validating phone
    var schema = joi.object().keys({
      Phone: joi
        .string()
        .min(13)
        .max(13)
        .required()
        .regex(/[+]923[0-9]{2}(?!1234567)(?!1111111)(?!7654321)[0-9]{7}/),
    });
    const error = joi.validate({Phone: data}, schema);
    //console.log(error);
    // return error.error.details[0].message;
    if (error.error) {
      console.log(error.error.details[0].message);
      setPhoneOk(false);
      return false;
    } else {
      console.log('ok');
      setPhoneOk(true);
      return true;
    }
  };

  const validateInput2 = data => {
    // validating password
    var schema = joi.object().keys({
      Password: joi
        .string()
        .min(8)
        .max(200)
        .required(),
    });
    const error = joi.validate({Password: data}, schema);
    // return error.error.details[0].message;
    if (error.error) {
      console.log(error.error.details[0].message);
      setPasswordOk(false);
      return false;
    } else {
      console.log('ok');
      setPasswordOk(true);
      return true;
    }
  };

  const signin = async () => {
    console.log('store stata: ', store.getState());
    console.log('store stata: ', store2.getState());

    /*if((store2.getState())[0].logged){
            props.navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'Search Saloons Near',
                   // params: { someParam: 'Param1' },
                  },
                ],
              });
        }*/
    //console.log(validateInput());
    console.log();

    if (validateInput(phone) && validateInput2(password)) {
      console.log('yes its ok');

      // query for signing in and recieving promise
      var obj = {
        phoneNumber: phone,
        password: password,
      };

      try {
        const {data: responseJson} = await axios.post(
          'https://' + ip + '/api/auth/login',
          obj,
        );
        //console.log("res",responseJson);
        if (!responseJson) {
          // do nothing
          Alert.alert(
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Sign up Unsuccessful!'
            ):(
              'سائن اپ ناکام رہا!'
            )
            ,
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Sign up was not successful, please be sure the following\n1- Have active internet\n2- Correct Registration data'
            ):(
              'سائن اپ کامیاب نہیں تھا ، براہ کرم یقینی بنائیں کہ درج ذیل 1- فعال انٹرنیٹ 2- درست معلومات ہیں'
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
          console.log('nothing');
        } else {
          console.log('fff: ', responseJson);
          try {
            await AsyncStorage.setItem('loginkeysasa', responseJson);

            App.updateMe(responseJson);

            store2.dispatch({
              type: 'LOGGED IN',
              payload: {
                logged: true,
              },
            });
            //props.navigation.popToTop();
            /*props.navigation.reset({
                            index: 0,
                            routes: [
                              {
                                name: 'Search Saloons Near',
                               // params: { someParam: 'Param1' },
                              },
                            ],
                          });*/
          } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
          }

          if (screenNumber === 1) {
            // changing personal info
            Alert.alert(
              (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                'Login Successful'
              ):(
                'لاگ ان کامیاب'
              )
              ,
              (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                'You can proceed to Update Personal Info '
              ):(
                'آپ ذاتی معلومات کو اپ ڈیٹ کرنے کے لئے آگے بڑھ سکتے ہیں'
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
            props.navigation.navigate('Personal Info', {
              screenNumber: 1,
            });
          } else if (screenNumber === 2) {
            // actual login
            // query for signing in + on recieving promise
            Alert.alert(
              (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                'Login Successful'
              ):(
                'لاگ ان کامیاب رہا'
              )
              ,
              
              (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                'You can proceed to use the application '
              ):(
                'آپ ایپ کو استعمال کرنے کے لئے آگے بڑھ سکتے ہیں'
              ),
              [
                {
                  //style: "cancel"
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: true},
            );
            props.navigation.navigate('      ', {
              screenNumber: 1,
            });
          } else if (screenNumber === 3) {
            // actual login
            // query for signing in + on recieving promise
            Alert.alert(
              (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                'Login Successful'
              ):(
                'لاگ ان کامیاب رہا'
              ),
              (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                'You can proceed to Change Passwords '
              ):(
                'آپ پاس ورڈ تبدیل کرنے کے لئے آگے بڑھ سکتے ہیں'
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
            props.navigation.navigate('Passwords');
          } else if (screenNumber === 4) {
            // actual login
            // query for signing in + on recieving promise
            Alert.alert(
              (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                'Login Successful'
              ):(
                'لاگ ان کامیاب رہا'
              ),
              (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                'You can proceed to use the application '
              ):(
                'آپ ایپ کو استعمال کرنے کے لئے آگے بڑھ سکتے ہیں'
              ),
              [
                {
                  //style: "cancel"
                },
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ],
              {cancelable: true},
            );
            props.navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'Search Saloons Near',
                  // params: { someParam: 'Param1' },
                },
              ],
            });
          }
        }
      } catch (ex) {
        //console.log(ex.response.data);
        setErrors(ex.response.data);
      }

      console.log('sign in pressed');
    } else {
      console.log('no its not');
    }
  };

  return (
    <View style={loginStyling.mainContainer}>
      <View
        style={loginStyling.loginIcon}>
        <MaterialCommunityIcons.Button
          name={'login'}
          size={Dimensions.get('window').height / 7}
          backgroundColor={'white'}
          style={loginStyling.login}
          color={'#211a00'}
          underlayColor="transparent"
        />
      </View>

      <View
        style={loginStyling.mobileView}>
        <Text style={loginStyling.mobileText}>
        {
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            'Mobile Number'
          ):(
            'موبائل نمبر'
          )
        }
          
        </Text>
      </View>

      <View
        style={loginStyling.numericView}>
        <TextInput
          editable={true}
          placeholder={'+923910000000'}
          keyboardType={'numeric'}
          onChangeText={n => {
            // console.log(n);
            setphone(n);
            validateInput(n);
          }}
          value={phone}
          autoFocus={true}
          maxLength={13}
          clearButtonMode="always"
          style={{
            flex: 1,
            paddingLeft: 20,
            borderWidth: 1,
            borderRadius: 20,
            borderColor: phoneOk ? 'black' : 'red',
            justifyContent: 'flex-end',
          }}
        />
      </View>

      <View
        style={loginStyling.mobileView}>
        <Text style={loginStyling.mobileText}>
        {
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            'Password'
          ):(
            'پاس ورڈ'
          )
        }
        </Text>
      </View>

      <View
        style={loginStyling.numericView}>
        <TextInput
          editable={true}
          placeholder={
          
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Password...'
            ):(
              'پاس ورڈ'
            )
          
        }
          secureTextEntry={true}
          onChangeText={n => {
            setPassword(n);
            validateInput2(n);
          }}
          value={password}
          maxLength={200}
          clearButtonMode="always"
          style={{
            flex: 1,
            paddingLeft: 20,
            borderWidth: 1,
            borderRadius: 20,
            borderColor: passwordOk ? 'black' : 'red',
            justifyContent: 'flex-end',
          }}
        />
      </View>

      {errors ? (
        <View>
          <Text style={loginStyling.error}>
            {errors}
          </Text>
        </View>
      ) : null}

      <View
        style={loginStyling.signin}>
        <TouchableOpacity
          onPress={() => {
            signin();
          }}
          style={loginStyling.touchLogin}>
          <Text style={loginStyling.logintextbutton}>
          {(store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Log in'
            ):(
              'لاگ ان کریں'
              )}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}



export default Login;
