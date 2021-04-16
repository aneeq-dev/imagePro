import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Alert,
  AsyncStorage,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Cart from './Cart';
import Menu from './menu';
import Deals from './deals';
import saloonProfile from '../screens/saloonProfile';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Stylists from './Stylists';
import {reqAppStyling} from '../styleSheeet/styles';
import DatePicker from './DatePicker';
import axios from 'axios';
import ip from '../ipadd/ip';
import store3 from '../redux/store3';

function RequestAppointment(props) {
  const [Date1, setDate1] = useState();
  const [Date2, setDate2] = useState();
  const [Date, setDate] = useState(false);
  const [cart, setCart] = useState(false);
  const [carttotal, setCartTotal] = useState(0);
  const [itemsincart, setitemsincart] = useState([]);
  //const [registered, setRegistered] = useState(true);
  //const [history, setHistory] = useState(false);

  RequestAppointment.getDate = (date, date2) => {
    console.log(Date1);
    setDate1(date);
    setDate2(date2);
    setDate(true);
  };

  const upda = async ob => {
    //console.log(" jjdndjnjneekj: ",ob);
    // console.log("props:", props);
    try {
      const value = await AsyncStorage.getItem('loginkeysasa');

      const {data: responseJson} = await axios.put(
        'https://' +
          ip +
          '/api/appointments/updateApp?appointmentID=' +
          props.app_id,
        ob,
        {
          headers: {
            'x-auth-token': value,
          },
        },
      );
      //  console.log("res: ",responseJson);

      if (responseJson.length === 0  || responseJson===0 || responseJson===undefined) {
        // do nothing

        Alert.alert(
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            'Appointment Not Updated!'
          ):(
            'میٹنگ کی تازہ کاری نہیں!'
          )
          ,
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            "Appointment cannot be updated, please be sure the following{'\n'}1- Have active internet connection{'\n'}2- Correct Appointment Updation data {'\n'}3- Login to your account"
          ):(
            'تقرری کی تازہ کاری نہیں ہوسکتی ہے ، براہ کرم یقینی بنائیں کہ درج ذیل 1- فعال انٹرنیٹ کنیکشن ہے 2- درست تقرری کی تازہ کاری کا ڈیٹا 3- اپنے اکاؤنٹ میں لاگ ان کریں'           
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
        console.log('Appointment Updated: ', responseJson);
        Alert.alert(
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            'Appointment Updated Successfully!'
          ):(
            'میٹنگ کی تازہ کاری !'
          )
          ,
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            "Thank you for updating the appointment. You can check all appointments in 'My Appointment' from left drawer."
          ):(
            'ملاقات کو اپ ڈیٹ کرنے کے لئے آپ کا شکریہ۔ آپ بائیں دراج سے میری ملاقات میں تمام تقرریوں کو چیک کرسکتے ہیں۔'           
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
        saloonProfile.goBack();
      }
    } catch (ex) {
      console.log(ex.response.data);
    }
  };

  const upda2 = async ob => {
    //console.log(" jjdndjnjneekj: ",ob);
    // console.log("props:", props);
    try {
      const value = await AsyncStorage.getItem('loginkeysasa');

      const {data: responseJson} = await axios.put(
        'https://' +
          ip +
          '/api/appointments/updateApp2?appointmentID=' +
          props.app_id,
        ob,
        {
          headers: {
            'x-auth-token': value,
          },
        },
      );
      //  console.log("res: ",responseJson);

      if (responseJson.length === 0  || responseJson===0 || responseJson===undefined) {
        // do nothing

        Alert.alert(
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            'Appointment Not Updated!'
          ):(
            'میٹنگ کی تازہ کاری نہیں!'
          )
          ,
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            "Appointment cannot be updated, please be sure the following{'\n'}1- Have active internet connection{'\n'}2- Correct Appointment Updation data {'\n'}3- Login to your account"
          ):(
            'تقرری کی تازہ کاری نہیں ہوسکتی ہے ، براہ کرم یقینی بنائیں کہ درج ذیل 1- فعال انٹرنیٹ کنیکشن ہے 2- درست تقرری کی تازہ کاری کا ڈیٹا 3- اپنے اکاؤنٹ میں لاگ ان کریں'           
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
        console.log('Appointment Updated: ', responseJson);
        Alert.alert(
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            'Appointment Updated Successfully!'
          ):(
            'میٹنگ کی تازہ کاری !'
          )
          ,
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            "Thank you for updating the appointment. You can check all appointments in 'My Appointment' from left drawer."
          ):(
            'ملاقات کو اپ ڈیٹ کرنے کے لئے آپ کا شکریہ۔ آپ بائیں دراج سے میری ملاقات میں تمام تقرریوں کو چیک کرسکتے ہیں۔'           
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
        saloonProfile.goBack();
      }
    } catch (ex) {
      console.log(ex.response.data);
    }
  };


  const checkData = async () => {
    let c = [];
    c = Menu.getMenuCart();
    // console.log("nnnnnnnnnnn: ",c);
    let d = [];
    d = Deals.getDealsCart();
    let t = false;
    if (c.length === 0 && d.length === 0) {
      t = false;
    } else {
      t = true;
    }

    if (!Date && !Cart.cartIsOkay() && !(props.screenNumber === 4)) {
      checkDateandCartAlert();
    } else if (Date && !Cart.cartIsOkay() && !(props.screenNumber === 4)) {
      checkCartAlert();
    } else if (!Date && Cart.cartIsOkay() && !(props.screenNumber === 4)) {
      checkDateAlert();
    } else if (!Date && !t && props.screenNumber === 4) {
      checkDateandCartAlert();
    } else if (Date && !t && props.screenNumber === 4) {
      checkCartAlert();
    } else if (!Date && cart && props.screenNumber === 4) {
      checkDateAlert();
    } else if (Date1 === undefined || Date2 === undefined) {
      console.log('mkmkmkmkmkmmkkkkkkkkkkkkkkkkk-----------------');
      checkDateAlert();
    } else {
      console.log(
        'yes you can request appointment... here query can be applied with saving data in db...',
      );
      // data will be saving an appointment
      // appointment will have data as follows:
      // date & time
      //console.log(Date1, " ", Date2, " ", DatePicker.getcheck());
      // cart array

      var dea = [];
      var ser = [];
      var tott = 0;

      if (props.screenNumber === 5) {
        // console.log("cart in menu services: ",Menu.getMenuCartonlyforupdate());
        // console.log("cart in deals services: ",Deals.getDealsCartonlyforUpdate());
        let c = [];
        var total = 0;
        c = Menu.getMenuCartonlyforupdate();
        for (var i = 0; i < c.length; i++) {
          total = total + c[i].price;
        }
        ser = Menu.getMenuCartonlyforupdate();
        console.log('mli: ', ser);
        dea = Deals.getDealsCartonlyforUpdate();
        console.log('mli1: ', dea);
        tott = total;
        console.log(total, c.length);
      } else {
        //console.log("cart in deals: ",Cart.getCart());
        // console.log("cart in menu: ",Cart.getserCart());
        // console.log(Cart.gettotal());
        ser = Cart.getserCart();
        dea = Cart.getCart();
        tott = Cart.gettotal();
      }
      // console.log("cart is in req: ",Cart.getCart());
      // saloon id
      //console.log("saloonID: ",saloonProfile.getSalonId());
      //console.log("customerID: 5f83dde2f425191b10b11b7e");
      //console.log("stylist ID: ",Stylists.GetStylist());
      // status: at start status will be confirming
      console.log('Confirming');
      //
      // carttotal
      //console.log(Stylists.GetStylist());
      var obj = {};
      if (!(Stylists.GetStylist() === 'Any')) {
        obj = {
          stylistID: Stylists.GetStylist(),
          deals: dea,
          services: ser,
          total: tott,
          fromtiming: Date1,
          totiming: Date2,
        };
      } else {
        obj = {
          // stylistID:Stylists.GetStylist(),
          deals: dea,
          services: ser,
          total: tott,
          totiming: Date2,
          fromtiming: Date1,
        };
      }

      if (props.screenNumber === 1) {
        // request app
        try {
          const value = await AsyncStorage.getItem('loginkeysasa');
          console.log('val: ', value);

          if (value === null) {
            props.nm.navigate('Login', {
              screenNumber: 4, // loginfor app use
            });
          } else {
            const {data: responseJson} = await axios.post(
              'https://' +
                ip +
                '/api/appointments/saveApp?saloonID=' +
                saloonProfile.getSalonId(),
              obj,
              {
                headers: {
                  'x-auth-token': value,
                },
              },
            );

            if (responseJson.length === 0 ) {
              // do nothing
              Alert.alert(
                (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                  'Appointment Not Registered!'
                ):(
                  'میٹنگ کی تازہ کاری نہیں!'
                )
                ,
                (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                  'Appointment cannot be registered, please be sure the following \n 1- Have active internet 2- Correct Appointment Registration data'
                ):(
                  'تقرری رجسٹریشن نہیں ہوسکتی ہے ، براہ کرم یقینی بنائیں کہ درج ذیل 1- فعال انٹرنیٹ 2- تقرری رجسٹریشن کے درست اعداد و شمار ہیں'           
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
              console.log('Appointment regstered: ', responseJson);
              Alert.alert(

                (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                  'Appointment Registered Successfully!'
                ):(
                  'تقرری کامیابی کے ساتھ رجسٹرڈ ہے'
                )
                ,
                (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                  "Thank you for registering the appointment. You can check all appointments in 'My Appointment' from left drawer."
                ):(
                  'ملاقات کے اندراج کے لئے آپ کا شکریہ۔ آپ میری تقرری میں بائیں دراج سے تمام تقرریوں کو چیک کرسکتے ہیں۔'           
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
              saloonProfile.goBack();
            }
          }
        } catch (ex) {
          console.log(ex.response.data);
        }
      } else if (props.screenNumber === 4) {
        upda(obj);
      }
      else if (props.screenNumber === 3) {
        upda2(obj);
      }
    }
  };

  RequestAppointment.setme = () => {
    setDate(false);
  };

  const checkDateandCartAlert = () => {
    Alert.alert(
      (store3.getState().length===0 || store3.getState()[0].language==='English')?(
        'Request Denied!'
      ):(
        'درخواست سے انکار کردیا گیا ہے'
      )

      ,
      (store3.getState().length===0 || store3.getState()[0].language==='English')?(
        'For scheduling appointment, please select Date section and select any of the deals or services... '
      ):(
        'شیڈولنگ ملاقات کے لئے ، براہ کرم تاریخ کا سیکشن منتخب کریں اور کسی بھی سودے یا خدمات کو منتخب کریں '
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
  };

  const checkDateAlert = () => {
    Alert.alert(
      (store3.getState().length===0 || store3.getState()[0].language==='English')?(
        'Request Denied!'
      ):(
        'درخواست سے انکار کردیا گیا ہے'
      ),
      (store3.getState().length===0 || store3.getState()[0].language==='English')?(
        'For scheduling appointment, please select Date section according to instructions... '
      ):(
        'شیڈولنگ ملاقات کے لئے ، براہ کرم ہدایات کے مطابق تاریخ کا سیکشن منتخب کریں'
      ),
      
      [
        {
          //style: "cancel"
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: true},
    );
  };

  const checkCartAlert = () => {
    Alert.alert(
      (store3.getState().length===0 || store3.getState()[0].language==='English')?(
        'Request Denied!'
      ):(
        'درخواست سے انکار کردیا گیا ہے'
      ),
      (store3.getState().length===0 || store3.getState()[0].language==='English')?(
        'For scheduling appointment, please select any deals or services... '
      ):(
        'شیڈولنگ ملاقات کے لئے ، براہ کرم کوئی سودے یا خدمات منتخب کریں '
      ),
      
      [
        {
          //style: "cancel"
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: true},
    );
  };

  const setCarti = () => {
    c = [];
    c = Cart.getCart();
    setitemsincart(c);
  };

  const setCarti2 = () => {
    let c = [];
    c = Menu.getMenuCartonlyforupdate();
    let d = [];
    d = Deals.getDealsCart();
    //console.log("c: ",c);
    // console.log("d: ",d);
    if (c || d) {
      setCart(true);
    } else {
      setCart(false);
    }
  };

  const requestApp = () => {
    setCarti();
    checkData();
  };

  const updateApp = () => {
    //setCarti2();
    checkData();
  };

  return (
    <View>
      <Text style={reqAppStyling.label}>
        {props.screenNumber === 4 || props.screenNumber === 3 
          ? (store3.getState().length===0 || store3.getState()[0].language==='English')?('Update Appointment'):('اپوائنٹمنٹ اپ ڈیٹ کریں')
          :  (store3.getState().length===0 || store3.getState()[0].language==='English')?('Request Appointment'):('تقرری کی درخواست کریں')}
      </Text>
      <Text
        style={reqAppStyling.hints}>
        {props.screenNumber === 4 || props.screenNumber === 3 
          ? 
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            'Update Appointment button will update your appointment.'
          
          ):(
          'اپ ڈیٹ اپوائنمنٹ کا بٹن آپ کی ملاقات کو اپ ڈیٹ  کرے گا۔'
          )
          : 
          
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            'Request Appointment button requests the saloon owner to schedule your appointment in the next best posible time (within your selected time).'
          
          ):(
            'تقرری کی درخواست کا بٹن سیلون مالک سے درخواست کرتا ہے کہ وہ اگلے بہترین ممکنہ وقت میں آپ کی ملاقات کا شیڈول کرے (آپ کے منتخب وقت کے اندر)'
          )
      }
      </Text>

      <View
        style={reqAppStyling.dim}>
        <Text> </Text>
      </View>
      <View style={reqAppStyling.appButtonContainer2}>
        {props.screenNumber === 4 ||  props.screenNumber === 3? (
          <TouchableOpacity
            onPress={() => {
              updateApp();
            }}>
            <Text style={reqAppStyling.appButtonText}>
            {
                (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                  'Update Appointment'
                ):(
                  'اپوائنٹمنٹ اپ ڈیٹ کریں'
                )
              }
              
              </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              requestApp();
            }}>
            <Text style={reqAppStyling.appButtonText}>
              {
                (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                  'Request Appointment'
                ):(
                  'تقرری کی درخواست کریں'
                )
              }
              
              
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View
        style={reqAppStyling.gap}>
        <Text> </Text>
      </View>
    </View>
  );
}


export default RequestAppointment;
