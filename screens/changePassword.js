import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Alert,
  TextInput,
  RefreshControl,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import jwtDecode from 'jwt-decode';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import joi from 'react-native-joi-validation';
import axios from 'axios';
import ip from '../ipadd/ip';
import {changePasswordStyling} from '../styleSheeet/screenStyles';
import store3 from '../redux/store3';

function changePassword(props) {
  const [emailorPhone, setemailorPhone] = useState('+923');
  const [PhoneOK, setPhoneOk] = useState(true);

  const [password, setPassword] = useState('');
  const [passwordOk, setPasswordOk] = useState(true);

  const [newpassword, setNewPassword] = useState('');
  const [newpasswordOk, setNewPasswordOk] = useState(true);

  const [newpassword2, setNewPassword2] = useState('');
  const [newpassword2Ok, setNewPassword2Ok] = useState(true);

  const [isShowed2, setIsShowed2] = useState(false);
  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState('');

  const validateInput = data => {
    // validating phone
    data = data.toString();
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
      // console.log("ok");
      setPhoneOk(true);
      return true;
    }
  };

  const validatePassword = (data, i) => {
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
      if (i === 1) setPasswordOk(false);
      else if (i === 2) setNewPasswordOk(false);
      else if (i === 3) setNewPassword2Ok(false);
      return false;
    } else {
      console.log('ok');
      if (i === 1) {
        setPasswordOk(true);
        return true;
      } else if (i === 2) {
        setNewPasswordOk(true);
        return true;
      } else if (i === 3) {
        setNewPassword2Ok(true);
        return true;
      }
    }
  };

  const validateEquality = () => {
    if (newpassword === newpassword2) {
      return true;
    } else {
      setNewPasswordOk(false);
      setNewPassword2Ok(false);
      return false;
    }
  };

  // updateCustomerPassword

  const updatePassword = async () => {
    var obj = {
      phoneNumber: emailorPhone,
      oldPassword: password,
      newPassword: newpassword,
    };

    console.log(obj);

    try {
      const value = await AsyncStorage.getItem('loginkeysasa');

      const {data: responseJson} = await axios.put(
        'https://' + ip + '/api/customers/updateCustomerPassword',
        obj,
        {
          headers: {
            'x-auth-token': value,
          },
        },
      );
      //console.log("res: ",responseJson);
      console.log('response: ', responseJson);
      //  const responseJson=response.data;

      if (!responseJson) {
        // do nothing

        Alert.alert(
          
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Information Not Updated!'
            ):(
              'معلومات کو اپ ڈیٹ نہیں کیا جاسکتا'
            ),
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              "Information cannot be updated, please be sure the following{'\n'}1- Have active internet connection{'\n'}2- Correct Updation data {'\n'}3- Logged into your account" 
              ):(
              'معلومات کو اپ ڈیٹ نہیں کیا جاسکتا ، براہ کرم اس بات کا یقین کر لیں کہ درج ذیل 1- فعال انٹرنیٹ کنیکشن 2 ہے۔ تازہ کاری کا درست ڈیٹا 3- اپنے اکاؤنٹ میں لاگ ان کریں'
            ),
          
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
        console.log('res: ', responseJson);

        //const header = response.headers['x-auth-token'];
        // console.log("header: ",header);
        /* try {
                await AsyncStorage.setItem('loginkeysasa', header);
                } catch (error) {
                    console.log('AsyncStorage Error: ' + error.message);
                }
                App.updateMe(responseJson);
                */
        //console.log("Appointment Updated: ",responseJson);
        Alert.alert(
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            'Information Updated Successfully!'
          ):(
            'معلومات کو تازہ ترین کردیا گیا ہے!'
          )
          ,
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            'Thank you for updating your information.'
          ):(
            'اپنی معلومات کو اپ ڈیٹ کرنے کا شکریہ۔'
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

        //console.log("ininin: ",props);
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
    } catch (ex) {
      setErrors(ex.response.data);
      // setErrors(ex.response.data);
    }
  };

  const setCustomerMobileNum = async () => {
    const value = await AsyncStorage.getItem('loginkeysasa');
    console.log('value is: ', value);
    const customer = jwtDecode(value);
    setemailorPhone(customer.phoneNumber);
    setLoading(false);
  };

  const _onRefresh = () => {
    setLoading(true);
    setCustomerMobileNum();
  };

  {
    !isShowed2
      ? //secure query for fetching user data from db
        (_onRefresh(), setIsShowed2(true))
      : null;
  }

  const changepassword = () => {
    if (
      validateInput(emailorPhone) &&
      validatePassword(password, 1) &&
      validatePassword(newpassword, 2) &&
      validatePassword(newpassword2, 3) &&
      validateEquality()
    ) {
      // query for signing in and recieving promise
      updatePassword();
    } else {
      console.log('no ok');
    }
  };

  return (
    <View>
      <ScrollView
        style={changePasswordStyling.scrollview}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={_onRefresh} />
        }>
        <View style={changePasswordStyling.mainView} />
        <View style={changePasswordStyling.sheildiconview}>
          <MaterialCommunityIcons.Button
            name={'shield-edit'}
            size={Dimensions.get('window').height / 7}
            backgroundColor={'white'}
            style={changePasswordStyling.sheildicon}
            color={'#211a00'}
            underlayColor="transparent"
          />
        </View>

        <View style={changePasswordStyling.mobileHead}>
          <Text style={changePasswordStyling.mobileText}>
          {
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            'Mobile Number'
          ):(
            'موبائل نمبر'
          )
        }</Text>
        </View>

        <View
          style={changePasswordStyling.mobileInputView}>
          <TextInput
            editable={true}
            placeholder={'+923910000000'}
            onChangeText={n => {
              console.log(n);
              setemailorPhone(n);
              validateInput(n);
              //
            }}
            value={emailorPhone}
            autoFocus={true}
            keyboardType={'numeric'}
            maxLength={13}
            clearButtonMode="always"
            style={{
                flex: 1,
                paddingLeft: 20,
                borderWidth: 1,
                borderRadius: 20,
                borderColor: PhoneOK ? 'black' : 'red',
                justifyContent: 'flex-end',
            }}
          />
        </View>

        <View
          style={changePasswordStyling.mobileHead}>
          <Text style={changePasswordStyling.mobileText}>
            
            {
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            'Old Password'
          ):(
            'پرانا پاسورڈ'
          )
        }
          </Text>
        </View>

        <View
          style={changePasswordStyling.oldPasswordView}>
          <TextInput
            editable={true}
            placeholder={
              
              (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                'Enter Old Password...'
              ):(
              'پرانا پاس ورڈ درج کریں'
              )
            
            }
            secureTextEntry={true}
            onChangeText={n => {
              console.log(n);
              setPassword(n);
              validatePassword(n, 1);
              //
            }}
            value={password}
            maxLength={15}
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

        <View
          style={changePasswordStyling.mobileHead}>
          <Text style={changePasswordStyling.mobileText}>
            
            {
              
              (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                'New Password'
              ):(
              'نیا پاس ورڈ'
              )
            
            }
          </Text>
        </View>

        <View
          style={changePasswordStyling.oldPasswordView}>
          <TextInput
            editable={true}
            placeholder={
          
            
              
              (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                'Enter New Password...'
              ):(
              'نیا پاس ورڈ درج کریں'
              )
            
            }
            secureTextEntry={true}
            onChangeText={n => {
              console.log(n);
              setNewPassword(n);
              validatePassword(n, 2);
              //
            }}
            value={newpassword}
            maxLength={50}
            clearButtonMode="always"
            style={{
              flex: 1,
              paddingLeft: 20,
              borderWidth: 1,
              borderRadius: 20,
              borderColor: newpasswordOk ? 'black' : 'red',
              justifyContent: 'flex-end',
            }}
          />
        </View>

        <View
          style={changePasswordStyling.mobileHead}>
          <Text style={changePasswordStyling.mobileText}>
            
            {
              (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                'Re-type New Password'
              ):(
              'نیا پاس ورڈ دوبارہ ٹائپ کریں'
              )
            
            }
          </Text>
        </View>

        <View
          style={changePasswordStyling.oldPasswordView}>
          <TextInput
            editable={true}
            placeholder={
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Enter New Password Again...'
            ):(
            'دوبارہ نیا پاس ورڈ درج کریں'
            )
            }
            secureTextEntry={true}
            onChangeText={n => {
              console.log(n);
              setNewPassword2(n);
              validatePassword(n, 3);
              //
            }}
            value={newpassword2}
            maxLength={50}
            clearButtonMode="always"
            style={{
              flex: 1,
              paddingLeft: 20,
              borderWidth: 1,
              borderRadius: 20,
              borderColor: newpassword2Ok ? 'black' : 'red',
              justifyContent: 'flex-end',
            }}
          />
        </View>

        {errors ? (
          <View>
            <Text style={changePasswordStyling.errorText}>
              {errors}
            </Text>
          </View>
        ) : null}

        <View
          style={changePasswordStyling.changePasswordView}>
          <TouchableOpacity
            onPress={() => {
              changepassword();
            }}
            style={changePasswordStyling.touchableupdate}>
            <Text style={changePasswordStyling.updateText}>
            {
              (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                'Update'
              ):(
              'اپ ڈیٹ'
              )
            }
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}


export default changePassword;
