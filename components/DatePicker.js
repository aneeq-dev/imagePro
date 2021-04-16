import RNDateTimePicker from '@react-native-community/datetimepicker';
import {
  View,
  Button,
  ActivityIndicator,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert,
  AsyncStorage,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import RequestAppointment from './RequestAppointment';
import {DatePickerAndroid} from 'react-native';
import axios from 'axios';
import ip from '../ipadd/ip';
import {datePickerStyling} from '../styleSheeet/styles';
import store3 from '../redux/store3';


function DatePicker(props) {
  // const [datefrom, setDateFrom] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  const [isChecked, setIsChecked] = useState(true); // checking if on start date is set to one hour ahead
  const [isChecked2, setIsChecked2] = useState(true); // checking if on start time is set to 10 minutes ahead

  var currentDate = new Date();
  // console.log("current date: ");
  // console.log("current date: ",currentDate.getDate());

  var toTime = new Date();

  if (isChecked) {
    toTime.setDate(currentDate.getDate());
    toTime.setMonth(currentDate.getMonth());
    toTime.setFullYear(currentDate.getFullYear());
    toTime.setHours(currentDate.getHours() + 1);
    toTime.setMinutes(currentDate.getMinutes());
    setIsChecked(false);
  }

  var fTime = new Date();

  if (isChecked2) {
    fTime.setDate(currentDate.getDate());
    fTime.setMonth(currentDate.getMonth());
    fTime.setFullYear(currentDate.getFullYear());
    fTime.setHours(currentDate.getHours());
    fTime.setMinutes(currentDate.getMinutes() + 10);
    setIsChecked2(false);
  }

  const [date, setDate] = useState(new Date(fTime)); // setting default from time to 10 min ahead time
  const [date2, setDate2] = useState(new Date(toTime)); // setting default to time to 1 hour ahead time
  const [date3, setDate3] = useState(new Date(fTime)); // setting default to time to 1 hour ahead time
  const [date4, setDate4] = useState(new Date(toTime)); // setting default to time to 1 hour ahead time
  const [mode2, setMode2] = useState('date');
  const [show2, setShow2] = useState(false);
  const [setse, setSe] = useState(true);
  const [isDateSelected2, setIsDateSelected2] = useState(false);
  const [tr, settr] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isTimeSelected2, setIsTimeSelected2] = useState(false);
  const [isok, setIsOk] = useState(false);

  const [dateData, setDateData] = useState([]);
  const [m, setm] = useState(0);

  /* {
        todate:'2020-09-28T17:57:27.169Z',
        fromdate:'2020-09-28T17:57:27.169Z'
    }*/
  // console.log("date: ",date, " ", date2, " ", props.screenNumber);
  DatePicker.getcheck = () => {
    return isok;
  };

  const setRequestAppointment = () => {
    // console.log(date.toDateString());
    // console.log(date2.toTimeString());
    //  console.log("ininin: ",date.getDate(), date2.getDate())
    RequestAppointment.getDate(date, date2);
  };

  const setDateWRTApp = () => {
    // setDateData(dateData);
    //   console.log("dfdfff: ",dateData);
    if (dateData.length === 0) {
      //do nothinng
      // setLoading(false);
      setDateData(dateData);
      updateme();
    } else {
      var datefromdb = new Date(dateData[0].totiming);
      var datefromdbfrom = new Date(dateData[0].fromtiming);
      //console.log("bhjnjj ",datefromdb);

      updateme();
      //datefromdb.setDate(datefromdb.getDate());
      // console.log("bhjnjj ",datefromdb.getDate());

      setDate3(datefromdbfrom);
      //console.log(Date.now
      setDate4(datefromdb);
      //setRequestAppointment();
      //setDate2(dateData[0].todate);
      settr(false);
      //console.log(date, date2);

      /*setIsTimeSelected(true);
         setIsDateSelected(true);
        // setDate2(datefromdbfrom);
 
         setIsTimeSelected2(true);
         setIsDateSelected2(true);
         //*/
      // forceUpdate();
      setDateData(dateData);
    }
    //setDateData(dateData);
    setLoading(false);

    //   console.log("vhgvhgh",dateData[0].fromdate);
  };

  useEffect(
    () => {
      // console.log("calling:");
      if (dateData.length === 0) {
        //donthing
        //setRequestAppointment();
      }
    },
    [date],
    [date2],
  );

  useEffect(() => {
    // console.log("calling:");
    if (dateData.length === 0) {
      //donthing
      updateme();
    } else {
      setDateWRTApp();
    }
  }, [dateData]);

  const updateme = () => {
    if (setse) {
      setSe(false);
    } else {
      setSe(true);
    }
  };

  const getAppDate = async () => {
    try {
      const value = await AsyncStorage.getItem('loginkeysasa');

      const {data: responseJson} = await axios.get(
        'https://' +
          ip +
          '/api/appointments/getConfingAppointmentDates?appointmentID=' +
          props.app_id,
        {
          headers: {
            'x-auth-token': value,
          },
        },
      );
      if (responseJson.length === 0 || responseJson===undefined || responseJson===0) {
        // do nothing
        //console.log("nothing reture")
      } else {
        for (var i = 0; i < dateData.length; i++) {
          dateData.pop();
        }
        dateData.push(responseJson[0]);
        // console.log("mkmkkkkkk: ",dateData);

        setDateData(dateData);
        // updateme();
        /// setDateData(dateData);
        setLoading(false);
        //settr(false);
        //   console.log('shmn: ',selectedDeals);
        // return responseJson[0].deals;
        // Deals.netCartOnlyForUpdate(responseJson[0].deals);
      }
    } catch (ex) {
      console.log(ex.response.data);
    }
  };

  if (props.screenNumber === 4 && tr) {
    setDateData([]);
    // setLoading(true);
    getAppDate();
    // RequestAppointment.setme();
    setm(m + 1);
    //updateme();
    settr(false);
    //get data.todate and fromdate wrt app_id props.app_id -----------------------query

    // set in array dateData
    // setDateData(dateData);
  }
  if (props.screenNumber === 1 && tr && loading) {
    //getAppDate();
    setLoading(false);
    settr(false);
  }

  if (props.screenNumber === 3 && tr && loading) {
    //getAppDate();
    setLoading(false);
    settr(false);
  }

  var minTime = new Date();
  minTime.setHours(10);
  minTime.setMinutes(0);
  minTime.setMilliseconds(0);

  var maxTime = new Date();
  maxTime.setHours(22);
  maxTime.setMinutes(0);
  maxTime.setMilliseconds(0);

  var maxDate = new Date();
  maxDate.setDate(currentDate.getDate());
  maxDate.setMonth(currentDate.getMonth() + 5);
  maxDate.setFullYear(currentDate.getFullYear());

  var mm;

  const checkDateandTime = datefrom => {
    if (datefrom.getDate() === currentDate.getDate()) {
      // if today
      if (datefrom.getHours() < currentDate.getHours()) {
        // if hours is less than current hour
        //setIsDateandTimeOk(false);
        Alert.alert(
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            'Wrong hours selected'
          ):(
            'غلط گھنٹے منتخب ہوئے'
          )
          ,
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            'Please select an upcoming hour!'
          ):(
            'براہ کرم آنے والا گھنٹہ منتخب کریں!'
          )
          ,
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'), //style: "cancel"
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: true},
        );
        setIsOk(false);
        RequestAppointment.setme();
      } else if (datefrom.getHours() === currentDate.getHours()) {
        // if current hour
        if (datefrom.getMinutes() < currentDate.getMinutes()) {
          // if minutes are < current minute
          //setIsDateandTimeOk(false);
          Alert.alert(
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Wrong minutes selected'
            ):(
              'غلط منٹ منتخب ہوئے'
            )
            ,
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Please select upcoming minute!'
            ):(
              'براہ کرم آنے والا منٹ منتخب کریں!'
            )
            ,
            
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'), //style: "cancel"
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: true},
          );
          setIsOk(false);
          RequestAppointment.setme();
        }
      }
    } else {
      setIsOk(true);
      setRequestAppointment();
    }
    checkDateandTime2(date2);
    //setIsChecked(true);
  };
  //isChecked?(setIsChecked(false)):(checkDateandTime());

  const checkDateandTime2 = dateto => {
    console.log('checking 2: ', dateto, date, date2);
    if (dateto.getDate() === date.getDate()) {
      //
      if (dateto.getHours() < date.getHours()) {
        //setIsDateandTimeOk(false);
        Alert.alert(
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            'Keep some time within '
          ):(
          'کچھ وقت اندر رکھیں'
          )
          ,
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            'Please keep some time within To and From Hours!'
          ):(
            'براہ کرم اوقات میں کچھ وقت رکھیں!'
          )
          ,
          
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'), //style: "cancel"
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: true},
        );
        setIsOk(false);
        RequestAppointment.setme();
      } else if (dateto.getHours() === date.getHours()) {
        if (dateto.getMinutes() < date.getMinutes()) {
          //setIsDateandTimeOk(false);
          Alert.alert(
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Keep some time within '
            ):(
              'غلط منٹ منتخب ہوئے'
            )
            ,
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Please keep some time within To and From Minutes!'
            ):(
              'براہ کرم اوقات میں کچھ وقت رکھیں!'
            )
            
            ,
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'), //style: "cancel"
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: true},
          );
          setIsOk(false);
          RequestAppointment.setme();
        } else {
          setIsOk(true);
          setRequestAppointment();
        }
      } else {
        setIsOk(true);
        setRequestAppointment();
      }
    } else if (dateto.getDate() < date.getDate()) {
      Alert.alert(
        (store3.getState().length===0 || store3.getState()[0].language==='English')?(
          'Choose date again!'
        ):(
          'دوبارہ تاریخ کا انتخاب کریں!'
         )
        ,
        (store3.getState().length===0 || store3.getState()[0].language==='English')?(
          'Please select date again, such that To and From dates are equal or greater than each other '
        ):(
          'براہ کرم دوبارہ تاریخ منتخب کریں'
        )
        ,
        
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'), //style: "cancel"
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: true},
      );
      setIsOk(false);
      RequestAppointment.setme();
    } else if (dateto.getDate() === currentDate.getDate()) {
      if (dateto.getHours() < currentDate.getHours()) {
        //setIsDateandTimeOk(false);
        Alert.alert(
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            'Wrong hours selected'
          ):(
            'غلط گھنٹے منتخب ہوئے'
          )
          ,
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            'Please select an upcoming hour!'
          ):(
            'براہ کرم آنے والا گھنٹہ منتخب کریں!'
          ),
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'), //style: "cancel"
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: true},
        );
        setIsOk(false);
        RequestAppointment.setme();
      } else if (dateto.getHours() === currentDate.getHours()) {
        if (dateto.getMinutes() < currentDate.getMinutes()) {
          //setIsDateandTimeOk(false);
          Alert.alert(
            
          
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Wrong minutes selected'
            ):(
              'غلط منٹ منتخب ہوئے'
            )
            ,
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Please select upcoming minute'
            ):(
              'براہ کرم آنے والا منٹ منتخب کریں'
              ),
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'), //style: "cancel"
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: true},
          );
          setIsOk(false);
          RequestAppointment.setme();
        } else {
          setIsOk(true);
          setRequestAppointment();
        }
      }
    } else {
      setIsOk(true);

      setRequestAppointment();
    }
    /*  if(props.screenNumber===2){
            console.log("set");
            setDate2(dateto);
        }*/

    // console.log("is ok? ",isok);
    //setIsChecked(true);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');

    setDate(currentDate);

    setIsTimeSelected(true);
    checkDateandTime(selectedDate);
    checkDateandTime2(selectedDate);

    console.log('mkmkmkmkmmmkmmkmkmkm: ', props.screenNumber);
    if (props.screenNumber === 2) {
      setDate(selectedDate);
    }
    setRequestAppointment();
  };

  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate || date2;
    setShow2(Platform.OS === 'ios');
    setDate2(currentDate);

    setIsTimeSelected2(true);
    checkDateandTime(selectedDate);
    checkDateandTime2(selectedDate);
    if (props.screenNumber === 2) {
      setDate2(selectedDate);
    }
    setRequestAppointment();
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showMode2 = currentMode => {
    setShow2(true);
    setMode2(currentMode);
  };

  const showDatepicker = () => {
    setIsDateSelected(true);
    showMode('date');
  };

  const showDatepicker2 = () => {
    setIsDateSelected2(true);
    showMode2('date');
  };

  const showTimepicker = () => {
    setIsTimeSelected(true);
    showMode('time');
  };

  const showTimepicker2 = () => {
    setIsTimeSelected2(true);

    showMode2('time');
  };
  return loading ? (
    <ActivityIndicator size="large" />
  ) : (
    <View>
      <Text style={datePickerStyling.label}>
          {  
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Date and Time'
            ):(
              'تاریخ اور وقت'
            )
          }
      </Text>
      <Text
        style={datePickerStyling.infoText}>
          {  
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Just select the date and time here, within which you want to get schedule your appointment. By default, there is 50 minutes gap between to and from.'
            ):(
              'یہاں صرف تاریخ اور وقت منتخب کریں ، جس کے اندر آپ اپنی ملاقات کا نظام الاوقات حاصل کرنا چاہتے ہیں۔ پہلے سے طے شدہ حد میں 50 منٹ کا فرق ہوتا ہے'
            )
          }
        
      </Text>
      <Text
        style={datePickerStyling.fromText}>
        {  
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'From: '
            ):(
              'اس وقت سے'
            )
          }
      </Text>
      {props.screenNumber === 2 ? (
        <Text
          style={datePickerStyling.selectedTimings}>
          
          {  
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Selected From timings were'
            ):(
              'منتخب وقت تھا'
            )
          }
        </Text>
      ) : null}

      {props.screenNumber === 2 ? (
        <View>
        <View style={datePickerStyling.appButtonContainer2}>
          <Text style={datePickerStyling.appButtonText}>
            <Text style={datePickerStyling.color}>{  
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Dated: '
            ):(
              'تاریخ: '
            )
          } </Text> {date3.toDateString()}
          </Text>
          </View>
          <View style={datePickerStyling.appButtonContainer2}>
          <Text style={datePickerStyling.appButtonText}>
            
            <Text style={datePickerStyling.color}> {  
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Time: '
            ):(
              'وقت : '
            )
          }</Text>{' '}
            {date3.getHours() % 12 === 0
              ? 12 + ' '
              : (date3.getHours() % 12) + ' '}
          </Text>

          <Text style={datePickerStyling.appButtonText}>: </Text>

          <Text style={datePickerStyling.appButtonText}>
            {date3.getMinutes() >= 0 && date3.getMinutes() <= 9
              ? '0' + date3.getMinutes() + ' '
              : date3.getMinutes() + ''}{' '}
            : 00
          </Text>

          <Text style={datePickerStyling.appButtonText}>
            {date3.getHours() / 12 >= 1 ? ' PM' : ' AM'}
          </Text>
        </View>
        </View>
      ) : null}

      <View
        style={datePickerStyling.dateSelected}>
        <View style={datePickerStyling.row}>
          <View style={datePickerStyling.dim}>
            <TouchableOpacity
              onPress={showDatepicker}
              style={datePickerStyling.appButtonContainer}>
              <Text style={datePickerStyling.appButtonText}>
                {isDateSelected ? date.toDateString() : 
                
                 
                  (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                    'Select Date '
                  ):(
                    'تاریخ منتخب کریں'
                  )
                }
              </Text>
            </TouchableOpacity>
          </View>

          <View style={datePickerStyling.dim}>
            <TouchableOpacity onPress={showTimepicker}>
              <View>
                {isTimeSelected ? (
                  // console.log(date.toString()),
                  <View>
                    <View style={datePickerStyling.appButtonContainer2}>
                      <Text style={datePickerStyling.appButtonText}>
                        {date.getHours() % 12 === 0
                          ? 12 + ' '
                          : (date.getHours() % 12) + ' '}
                      </Text>

                      <Text style={datePickerStyling.appButtonText}>: </Text>

                      <Text style={datePickerStyling.appButtonText}>
                        {date.getMinutes() >= 0 && date.getMinutes() <= 9
                          ? '0' + date.getMinutes() + ' '
                          : date.getMinutes() + ''}{' '}
                        : 00
                      </Text>

                      <Text style={datePickerStyling.appButtonText}>
                        {date.getHours() / 12 >= 1 ? ' PM' : ' AM'}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={datePickerStyling.appButtonContainer2}>
                    <Text style={datePickerStyling.appButtonText}>
                    {(store3.getState().length===0 || store3.getState()[0].language==='English')?(
                        'Select Time'
                      ):(
                        'وقت منتخب کریں'
                      )}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {show && (
          <RNDateTimePicker
            value={date}
            mode={mode}
            is24Hour={false}
            display="default"
            onChange={onChange}
            minimumDate={new Date()}
          />
        )}
      </View>

      <Text
        style={datePickerStyling.fromText}>
        {  
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'To:'
            ):(
              'اس وقت تک'
            )
          }
      </Text>
      {props.screenNumber === 2 ? (
        <Text
          style={datePickerStyling.selectedTimings}>
          
          {  
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Selected To timings were'
            ):(
              'منتخب کردہ اوقات تھے'
            )
          }
        </Text>
      ) : null}

      {props.screenNumber === 2 ? (
        <View>
        <View style={datePickerStyling.appButtonContainer2}>
          <Text style={datePickerStyling.appButtonText}>
            <Text style={datePickerStyling.color}>{  
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Dated: '
            ):(
              'تاریخ: '
            )
          }</Text> {date4.toDateString()}{' '}
          </Text>
          </View>
          <View style={datePickerStyling.appButtonContainer2}>

          <Text style={datePickerStyling.appButtonText}>
            <Text style={datePickerStyling.color}>  {  
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Time: '
            ):(
              'وقت : '
            )
          } </Text>{' '}
            {date4.getHours() % 12 === 0
              ? 12 + ' '
              : (date4.getHours() % 12) + ' '}
          </Text>

          <Text style={datePickerStyling.appButtonText}>: </Text>

          <Text style={datePickerStyling.appButtonText}>
            {date4.getMinutes() >= 0 && date4.getMinutes() <= 9
              ? '0' + date4.getMinutes() + ' '
              : date4.getMinutes() + ''}{' '}
            : 00
          </Text>

          <Text style={datePickerStyling.appButtonText}>
            {date4.getHours() / 12 >= 1 ? ' PM' : ' AM'}
          </Text>
        </View>
        </View>
      ) : null}

      <View
        style={datePickerStyling.dateSelected}>
        <View style={datePickerStyling.row}>
          <View style={datePickerStyling.dim}>
            <TouchableOpacity
              onPress={showDatepicker2}
              style={datePickerStyling.appButtonContainer}>
              <Text style={datePickerStyling.appButtonText}>
                {isDateSelected2 ? date2.toDateString() : 
                (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                    'Select Date '
                  ):(
                    'تاریخ منتخب کریں'
                  )}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={datePickerStyling.dim}>
            <TouchableOpacity onPress={showTimepicker2}>
              <View>
                {isTimeSelected2 ? (
                  <View>
                    <View style={datePickerStyling.appButtonContainer2}>
                      <Text style={datePickerStyling.appButtonText}>
                        {date2.getHours() % 12 === 0
                          ? 12 + ' '
                          : (date2.getHours() % 12) + ' '}
                      </Text>

                      <Text style={datePickerStyling.appButtonText}>: </Text>

                      <Text style={datePickerStyling.appButtonText}>
                        {date2.getMinutes() >= 0 && date2.getMinutes() <= 9
                          ? '0' + date2.getMinutes() + ' '
                          : date2.getMinutes() + ''}
                        : 00
                      </Text>

                      <Text style={datePickerStyling.appButtonText}>
                        {date2.getHours() / 12 >= 1 ? ' PM' : ' AM'}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={datePickerStyling.appButtonContainer2}>
                    <Text style={datePickerStyling.appButtonText}>
                    {(store3.getState().length===0 || store3.getState()[0].language==='English')?(
                        'Select Time'
                      ):(
                        'وقت منتخب کریں'
                      )}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {show2 && (
          <RNDateTimePicker
            value={date2}
            mode={mode2}
            is24Hour={false}
            display="default"
            onChange={onChange2}
            minimumDate={new Date()}
          />
        )}
      </View>

      <Text
        style={datePickerStyling.infoText}>
          {(store3.getState().length===0 || store3.getState()[0].language==='English')?(
            'Note: You can request your appointment, for anytime you want. However, as soon as saloon owner accepts your request and schedule your appointment in any time slot, the appointment will be updated.'
          ):(
'نوٹ: آپ اپنی ملاقات کے لئے درخواست کرسکتے ہیں ، جب بھی آپ چاہیں۔ تاہم ، جیسے ہی سیلون مالک آپ کی درخواست کو قبول کرتا ہے اور کسی بھی وقت کی مقررہ میں آپ کی ملاقات کا شیڈول بناتا ہے ، اس تقرری کی تازہ کاری ہوجائے گی'
)}
        
      </Text>
    </View>
  );
}

export default DatePicker;
