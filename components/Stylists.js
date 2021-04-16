import React, {useState, useEffect} from 'react';
import {AsyncStorage, View} from 'react-native';
import {
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Dimensions} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {stylistsStyling} from '../styleSheeet/styles';
import axios from 'axios';
import ip from '../ipadd/ip';
import store from '../redux/store';
import store3 from '../redux/store3';

function Stylists(props) {
  const PickerItem = Picker.Item;

  const [stylist, setStylist] = useState('Any');
  //const [stylistID, setStylistID] = useState('0');

  const [loading, setLoading] = useState(true);
  const [isgot, setIsgot] = useState(false);

  const [Stylistss, setStylists] = useState([]);

  const [selectedStylist, setSelectedStylist] = useState([]);

  useEffect(() => {
    if (props.screenNumber === 2) {
      getRegStylist(); // This is be executed when `loading` state changes
    }
    // Cart.updateme();
  }, [Stylistss]);

  const getStylistsl = async () => {
    //props.id
    try {
      // console.log("in h: ",props.id);
      const {data: responseJson} = await axios.get(
        'https://' +
          ip +
          '/api/stylist/getStylistwrtSaloonID?saloonID=' +
          props.id,
      );
      if (responseJson.length === 0 || responseJson===0 || responseJson===undefined) {
        // do nothing
        setStylists([]);
      } else {
        //  console.log("m: ",responseJson);

        setStylists(responseJson);
      }
      setLoading(false);

    } catch (ex) {
      console.error(ex);
    }
  };

  if (loading && (props.screenNumber === 1 || props.screenNumber === 3 ) ) {
    getStylistsl();
  }

  const getRegStylist = async () => {
    try {
      //  console.log("app: ",props.app_id);

      const value = await AsyncStorage.getItem('loginkeysasa');

      const {data: responseJson} = await axios.get(
        'https://' +
          ip +
          '/api/appointments/getConfingAppointmentStylist?appointmentID=' +
          props.app_id,
        {
          headers: {
            'x-auth-token': value,
          },
        },
      );
      // console.log("mkkkksbhs: ",responseJson);
      if (responseJson[0].length === 0) {
        // do nothing
      } else if (responseJson[0].stylistID === undefined) {
        // if nothing found
        // set here any stylist
        //  console.log("any stylist here");
        setStylist('Any');

        setSelectedStylist('Any');
      } else {
        // setServicesFromDB(responseJson[0].services);
        // console.log("bvbvbb: ",Stylistss);
        for (var i = 0; i < Stylistss.length; i++) {
          if (Stylistss[i]._id === responseJson[0].stylistID._id) {
            //  console.log("matched");
            setStylist(responseJson[0].stylistID._id);
            var stylistn = [
              {
                _id: responseJson[0].stylistID._id,
                stylistName: responseJson[0].stylistID.stylistName,
                rating: responseJson[0].stylistID._id,
              },
            ];

            // setSelectedStylist(stylistn);
          } else {
            //console.log("not matched");
          }
        }
      }
    } catch (ex) {
      console.log(ex.response.data);
    }
  };

  if (props.screenNumber === 4 && !isgot) {
    setLoading(true);
    setSelectedStylist([]);
    getStylistsl();
    //getRegStylist();
    // get data from db which client is selected wrt appointment number
    // and set to selectedStylist
    // also get the whole other stylists data as well wrt saloon id
    // on getting promise
    /*  var stylistn = [{id:1, 
            stylistName:'Stylist 1', 
            rating:5}];*/

    setIsgot(true);
    setLoading(false);
  }

  Stylists.GetStylist = () => {
    // console.log("ggggggggg: ",stylist);
    return stylist;
  };

  //console.log(stylist);
  return (
  
    <View>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          
          <Text style={stylistsStyling.label}>
          {
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Saloon Stylists'
            ):(
              'سیلون کارکنان'
            )
          }
          </Text>

          <Text
            style={stylistsStyling.hint}>
            {
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Select any stylist you want to be get serviced by!'
            ):(
              'اس کارکن کو منتخب کریں جس سے آپ خدمت حاصل کرنا چاہتے ہیں'
            )
          }
          </Text>
          <View
            style={stylistsStyling.listOfSaloonstext}>
              {
                (Stylistss.length===0)?(
                  null
                ):(
                  <Text>
                    {
                      (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                        'List of saloon stylists'
                      ):(
                        'سیلون کارکنان کی فہرست'
                      )
                    }
                  </Text>
                )
              }
          </View>

          {
        (Stylistss===undefined)?(null):(
          
          Stylistss.map(st => (
            <View
              style={stylistsStyling.stylistsview}>
              <Text
                style={stylistsStyling.stylistname}>
                {st.stylistName}
              </Text>

              <Rating
                type="star"
                startingValue={st.stylistRating}
                style={stylistsStyling.rating}
                ratingCount={5}
                readonly={true}
                imageSize={Dimensions.get('screen').height / 50}
              />
            </View>
          )))}
          <View
            style={stylistsStyling.selectStylisthint}>
            <Text>
            {
              (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                'Select Stylist below'
              ):(
                'ذیل میں کارکن منتخب کریں'
              )
            }
            </Text>
          </View>
          <View style={stylistsStyling.back}>
            <Picker
              selectedValue={stylist}
              style={stylistsStyling.height}
              onValueChange={(itemValue, itemIndex) => {
                setStylist(itemValue);
                // console.log("nnn: ",itemValue);
                // console.log("st: ",stylist);
              }}>
              {Stylistss.map(st => (
                <PickerItem label={st.stylistName} value={st._id.toString()}>
                  <Text> m</Text>
                </PickerItem>
              ))}

              <PickerItem label="Any Stylist" value="Any" />
            </Picker>
          </View>
        </View>
      )}
    </View>
  );
}



export default Stylists;
