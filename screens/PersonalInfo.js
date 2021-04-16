import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Dimensions, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {styles, stylesRectangle} from '../styleSheeet/styles';
import {Picker} from '@react-native-community/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity, RefreshControl, AsyncStorage} from 'react-native';
import {update} from 'lodash';
import joi from 'react-native-joi-validation';
import axios from 'axios';
import ip from '../ipadd/ip';
import App from '../App';
import {personalInfoStyling} from '../styleSheeet/screenStyles';
import store3 from '../redux/store3';

function PersonalInfo(props) {
  const screenNumber = props.route.params.screenNumber;

  const [firstName, setFirstName] = useState('');
  const [firstNameOk, setFirstNameOk] = useState(true);

  const [lastName, setLastName] = useState('');
  const [phoneNum, setPhoneNum] = useState('+923');
  const [phoneOk, setPhoneOk] = useState(true);

  const [gender, setGender] = useState('male');

  const [emailID, setEmailID] = useState('');
  const [emailIDok, setEmailIDok] = useState(true);

  const [password, setPass] = useState('');
  const [passwordOk, setPassOk] = useState(true);

  const [isShowed, setIsShowed] = useState(false);
  const [isShowed2, setIsShowed2] = useState(false);
  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState('');

  const [PersonalInfo, setPersonalInfo] = useState([]);

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
      // console.log("ok");
      setPhoneOk(true);
      return true;
    }
  };

  const validateInputEmail = data => {
    // validating phone
    if (data === '') {
      setEmailIDok(true);
      return true;
    } else {
      var schema = joi.object().keys({
        email: joi
          .string()
          .regex(
            /^$|^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
          ),
      });
      const error = joi.validate({email: data}, schema);

      if (error.error) {
        console.log(error.error.details[0].message);
        setEmailIDok(false);
        return false;
      } else {
        console.log('email ok');
        setEmailIDok(true);
        return true;
      }
    }
  };

  const validateInputName = data => {
    // validating phone
    var schema = joi.object().keys({
      name: joi
        .string()
        .min(4)
        .max(50)
        .required(),
    });
    const error = joi.validate({name: data}, schema);
    //console.log(error);
    // return error.error.details[0].message;
    if (error.error) {
      console.log(error.error.details[0].message);
      setFirstNameOk(false);
      return false;
    } else console.log('ok');
    setFirstNameOk(true);
    return true;
  };

  const validatePassword = data => {
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
      setPassOk(false);
      return false;
    } else {
      console.log('ok');
      setPassOk(true);
      return true;
    }
  };

  const populate = () => {
    console.log('personal info', PersonalInfo);
    if (PersonalInfo.length === 0) {
    } else {
      setFirstName(PersonalInfo[0].name);
      setPhoneNum(PersonalInfo[0].phoneNumber);
      setEmailID(PersonalInfo[0].email);
      setGender(PersonalInfo[0].gender);
      setPass('dummypassword');
    }
    //  setIsShowed2(true)
  };

  useEffect(() => {
    console.log(PersonalInfo);
    populate();
  }, [PersonalInfo]);

  const getCustomerData = async () => {
    setLoading(true);
    try {
      const value = await AsyncStorage.getItem('loginkeysasa');

      const {data: responseJson} = await axios.get(
        'https://' + ip + '/api/customers/getCustomerDataForChange',
        {
          headers: {
            'x-auth-token': value,
          },
        },
      );
      if (!responseJson) {
        // do nothing
        //console.log("s: ",responseJson)
      } else {
        console.log('rec:', responseJson);
        setPersonalInfo([responseJson]);
      }
    } catch (ex) {
      console.error(ex);
    }
    setLoading(false);
  };

  const _onRefresh = () => {
    setLoading(true);
    getCustomerData();
  };

  {
    screenNumber === 1
      ? !isShowed2
        ? //secure query for fetching user data from db
          (_onRefresh(), setIsShowed2(true))
        : console.log('dono')
      : !isShowed2
      ? (setLoading(false), setIsShowed2(true))
      : null;
  }

  const updateUser = async () => {
    // update query and on recieving promise
    //setPass("11111111");
    console.log('this');
    if (
      validateInput(phoneNum) &&
      validateInputEmail(emailID) &&
      validateInputName(firstName) &&
      validatePassword('password')
    ) {
      var obj = {
        name: firstName,
        gender: gender,
        phoneNumber: phoneNum,
        email: emailID,
        password: password,
      };

      try {
        const value = await AsyncStorage.getItem('loginkeysasa');

        const response = await axios.put(
          'https://' + ip + '/api/customers/updateCustomer',
          obj,
          {
            headers: {
              'x-auth-token': value,
            },
          },
        );
        //console.log("res: ",responseJson);
        console.log('response: ', response);
        const responseJson = response.data;

        if (!responseJson) {
          // do nothing

          Alert.alert(
            'Information Not Updated!',
            "Information cannot be updated, please be sure the following{'\n'}1- Have active internet connection{'\n'}2- Correct Updation data {'\n'}3- Login to your account",
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

          const header = response.headers['x-auth-token'];
          // console.log("header: ",header);
          try {
            await AsyncStorage.setItem('loginkeysasa', header);
          } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
          }

          App.updateMe(responseJson);

          //console.log("Appointment Updated: ",responseJson);
          Alert.alert(
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Information Updated Successfully!'
            ):(
              'معلومات کو کامیابی کے ساتھ اپ ڈیٹ کیا گیا'
            )
              ,
              (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                'Thank you for updating your information.'                        ):(
                  'اپنی معلومات کو اپ ڈیٹ کرنے کے لئے آپ کا شکریہ۔'
              ),
            
            
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
        //console.log(ex.response.data);
        setErrors(ex.response.data);
      }
    } else {
      console.log('not ok');
    }
  };

  const signUpUser = async () => {
    console.log(validateInput(phoneNum));
    //console.log("Sign Up query");
    // sign up query and on recieving promise
    if (
      validateInput(phoneNum) &&
      validateInputEmail(emailID) &&
      validateInputName(firstName) &&
      validatePassword(password)
    ) {
      var obj = {
        name: firstName,
        gender: gender,
        phoneNumber: phoneNum,
        email: emailID,
        password: password,
      };

      try {
        const response = await axios.post(
          'https://' + ip + '/api/customers/saveCustomer',
          obj,
        );
        //console.log();
        if (!response.data) {
          // do nothing
          Alert.alert(
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Sign up Unsuccessful!'
            ):(
              'سائن اپ ناکام رہا!'
            ),
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              "Sign up was not successful, please be sure the following{'\n'}1- Have active internet{'\n'}2- Correct Registration data"
            ):(
              'سائن اپ کامیاب نہیں تھا ، براہ کرم یقینی بنائیں کہ درج ذیل 1- آپ کے پاس فعال انٹرنیٹ 2- رجسٹریشن کا درست ڈیٹا ہے'
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
          //console.log("Appointment registered: ",responseJson);
          try {
            await AsyncStorage.setItem(
              'loginkeysasa',
              response.headers['x-auth-token'],
            );
          } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
          }

          Alert.alert(
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Sign Up Successful!'
            ):(
              'سائن اپ کامیاب رہا!'
           ),
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              "Please Login to start using application"
            ):(
              'درخواست کا استعمال شروع کرنے کے لئے براہ کرم لاگ ان کریں'
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
          props.navigation.navigate('Login', {
            screenNumber: 2,
          });
        }
      } catch (ex) {
        //console.log(ex.response.data);
        setErrors(ex.response.data);
      }
    } else {
      console.log('not ok');
    }
  };

  return (
    <ScrollView
      style={personalInfoStyling.scrollview}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={_onRefresh} />
      }>
      <View style={personalInfoStyling.userIcn}>
        <FontAwesome.Button
          name={'user'}
          size={Dimensions.get('window').height / 15}
          backgroundColor={'#edfeff'}
          style={personalInfoStyling.userIcn2}
          color={'#211a00'}
          underlayColor="transparent"
        />
      </View>
      <View style={personalInfoStyling.fullnameView}>
        <Text style={personalInfoStyling.fullnametext}>
          {
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Full Name *'
            ):(
              'پورا نام *'
            )
          }
          </Text>
      </View>

      <View style={personalInfoStyling.nameinputview}>
        <TextInput
          editable={true}
          placeholder={
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            'Enter Your Full Name...'
          ):(
            'اپنا پورا نام درج کریں...'
          )}
          onChangeText={f_name => {
            console.log(f_name);
            setFirstName(f_name);
            validateInputName(f_name);
            //
          }}
          defaultValue={PersonalInfo.length === 0 ? '' : PersonalInfo[0].name}
          value={firstName}
          autoFocus={true}
          maxLength={200}
          clearButtonMode="always"
          style={{
            flex: 1,
            paddingLeft: 20,
            borderWidth: 1,
            borderRadius: 20,
            borderColor: firstNameOk ? 'black' : 'red',
            justifyContent: 'flex-end',
          }}
        />
      </View>

      <View style={personalInfoStyling.mobilephoneview}>
        <FontAwesome.Button
          name={'mobile-phone'}
          size={Dimensions.get('window').height / 13}
          backgroundColor={'#edfeff'}
          style={personalInfoStyling.mobilephoneicn}
          color={'#211a00'}
          underlayColor="transparent"
        />
      </View>

      <View style={personalInfoStyling.fullnameView}>
        <Text style={personalInfoStyling.fullnametext}>
          {
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Phone Number *'
            ):(
              'فون نمبر *'
            )
          }
        </Text>
      </View>

      <View style={personalInfoStyling.phoneview}>
        <TextInput
          editable={screenNumber === 1 ? false : true}
          placeholder={'+923910000000'}
          value={phoneNum}
          maxLength={13}
          defaultValue={
            PersonalInfo.length === 0 ? '' : PersonalInfo[0].phoneNumber
          }
          clearButtonMode="always"
          keyboardType={'numeric'}
          onChangeText={phone_Num => {
            console.log(phone_Num);
            setPhoneNum(phone_Num);
            validateInput(phone_Num);
            //
          }}
          style={{
            flex: 1,
            paddingLeft: Dimensions.get('window').width / 20,
            borderWidth: 1,
            borderRadius: 20,
            borderColor: phoneOk ? 'black' : 'red',
            justifyContent: 'flex-end',
          }}
        />
      </View>

      <View style={personalInfoStyling.mobilephoneview}>
        <MaterialCommunityIcons.Button
          name={'gmail'}
          size={Dimensions.get('window').height / 15}
          backgroundColor={'#edfeff'}
          style={personalInfoStyling.userIcn2}
          color={'#211a00'}
          underlayColor="transparent"
        />
      </View>

      <View style={personalInfoStyling.fullnameView}>
        <Text style={personalInfoStyling.fullnametext}>
          {
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Email ID'
            ):(
              'ای میل کا پتہ'
            )
          }
        </Text>
      </View>

      <View style={personalInfoStyling.phoneview}>
        <TextInput
          editable={true}
          placeholder={
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            'Enter Email ID...'
          ):(
            'ای میل ID درج کریں '
          )}
          value={emailID}
          maxLength={90}
          defaultValue={PersonalInfo.length === 0 ? '' : PersonalInfo[0].email}
          clearButtonMode="always"
          onChangeText={em => {
            console.log(em);
            setEmailID(em);
            validateInputEmail(em);
            //
          }}
          style={{
            flex: 1,
            paddingLeft: Dimensions.get('window').width / 20,
            borderWidth: 1,
            borderRadius: 20,
            borderColor: emailIDok ? 'black' : 'red',
            justifyContent: 'flex-end',
          }}
        />
      </View>

      <View style={personalInfoStyling.mobilephoneview}>
        <MaterialCommunityIcons.Button
          name={'human-male-female'}
          size={Dimensions.get('window').height / 15}
          backgroundColor={'#edfeff'}
          style={personalInfoStyling.userIcn2}
          color={'#211a00'}
          underlayColor="transparent"
        />
      </View>

      <View style={personalInfoStyling.fullnameView}>
        <Text style={personalInfoStyling.fullnametext}>
        {
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            'Gender *'
          ):(
            'صنف *'
          )}
        </Text>
      </View>

      <View style={personalInfoStyling.picker}>
        <Picker
          selectedValue={gender}
          style={personalInfoStyling.pickerstyle}
          onValueChange={(itemValue, itemIndex) => {
            setGender(itemValue);
            console.log(gender);
          }}>
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
      </View>

      <View style={personalInfoStyling.mobilephoneview}>
        <MaterialCommunityIcons.Button
          name={'pencil-lock'}
          size={Dimensions.get('window').height / 15}
          backgroundColor={'#edfeff'}
          style={personalInfoStyling.userIcn2}
          color={'#211a00'}
          underlayColor="transparent"
        />
      </View>

      <View style={personalInfoStyling.fullnameView}>
        <Text style={personalInfoStyling.fullnametext}>
        {
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            'Password *'
          ):(
            'پاس ورڈ *'
          )}
          </Text>
      </View>

      <View style={personalInfoStyling.passview}>
        <TextInput
          editable={screenNumber === 1 ? false : true}
          placeholder={
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            'Enter Password...'
          ):(
            'پاس ورڈ درج کریں'
          )
          }
          value={password}
          maxLength={50}
          secureTextEntry={true}
          defaultValue={
            PersonalInfo.length === 0 ? '' : PersonalInfo[0].password
          }
          clearButtonMode="always"
          onChangeText={pass => {
            console.log(pass);
            setPass(pass);
            validatePassword(pass);
            //
          }}
          style={{
            flex: 1,
            paddingLeft: Dimensions.get('window').width / 20,
            borderWidth: 1,
            borderRadius: 20,
            borderColor: passwordOk ? 'black' : 'red',
            justifyContent: 'flex-end',
          }}
        />
      </View>

      {errors ? (
        <View>
          <Text style={personalInfoStyling.errortext}>{errors}</Text>
        </View>
      ) : null}

      <View style={personalInfoStyling.butonview}>
        <TouchableOpacity
          onPress={() => {
            screenNumber === 1 ? updateUser() : signUpUser();
          }}
          style={personalInfoStyling.touchv}>
          <Text style={personalInfoStyling.btntext}>
            {screenNumber === 1 ? 
            
              (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                'Update'
              ):(
                'اپ ڈیٹ'
              )
            : 
              (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                'Sign Up'
              ):(
                'سائن اپ'
              )
            }
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default PersonalInfo;
