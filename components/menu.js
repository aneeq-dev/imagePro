import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from 'react-native';
import {Dimensions} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import CheckBox from '@react-native-community/checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Cart from './Cart';
import ip from '../ipadd/ip';
import axios from 'axios';
import {menuStyling} from '../styleSheeet/styles';
import saloonProfile from '../screens/saloonProfile';
import store3 from '../redux/store3';

function Menu(props) {

  const [services, setServices] = useState([]);

  const [servicesFromDB, setServicesFromDB] = useState([]);

  const [setse, setSe] = useState(true);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);
  const [set, setTr] = useState(false);
  const [ik, setik] = useState(0);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  //  Cart.updateme()

  const getServices = async () => {
    //console.log("bhjbh",props.id);
    try {
      const {data: responseJson} = await axios.get(
        'https://' + ip + '/api/services/getServices?saloonID=' + props.id,
      );
      if (!responseJson) {
        setLoading(false);

        // do nothing
        console.log('no services found');
      } else {
        // console.log(responseJson);
        // console.log(responseJson);
        responseJson.forEach(function(element, i) {
          element.id = i;
          var arr = [];

          //console.log("e:",element, i);
          var j = 0;
          while (!(element.Services.length === 0)) {
            var n = element.Services.splice(0, 1);
            n[0].id = j;
            n[0].p_id = i;
            n[0].isSelected = false;
            arr.push(n);
            j++;
          }
          for (var l in arr) {
            element.Services.push(arr[l][0]);
          }

          //element.services.Services=arr;
          // console.log(element.services.Services);
          // element.num = i;
          // console.log(i);
        });
        // console.log("nnnnn: ",responseJson);
        for (var j = 0; j < responseJson.length; j++) {
          //console.log("nnnnnkk: ",responseJson[j].Services);
        }

        setServices(responseJson);
      }
    } catch (ex) {
      console.error(ex);
    }

    //console.log("njknkjnjjj: ",deals);
  };

  const updatemem = () => {
    if (setse) {
      setSe(false);
    } else {
      setSe(true);
    }
  };

  const updateArrayWrtAddorRemove = () => {
    var i, k, j;
    for (i = 0; i < servicesFromDB.length; i++) {
      // for every service got from db
      for (j = 0; j < services.length; j++) {
        // for every service
        for (k = 0; k < services[j].Services.length; k++) {
          //  for every service's subservice
          if (
            servicesFromDB[i].p_id === services[j].Services[k].p_id &&
            servicesFromDB[i]._id === services[j].Services[k]._id
          ) {
            // remove from array
            var item = services[j].Services.splice(k, 1);
            // console.log(item[0],"\n");
            //adding(item[0]);

            services[j].Services.push(servicesFromDB[i]);
            var item2 = servicesFromDB[i];
            //Cart.AddItemsToArray(item2);
            // console.log("jnjnkjjn",servicesFromDB[i]);
            // checkboxtheItem(servicesFromDB[i]);
            //Cart.AddItemsToArray(servicesFromDB[i]);
          }
          // console.log("mmk");
        }
      }
    }
    setServices(services);
    updatemem();
    //setLoading(false);
  };

  useEffect(() => {
    updateArrayWrtAddorRemove(); // This is be executed when `loading` state changes
    Cart.updateme();
  }, [servicesFromDB]);

  Menu.getMenuCartonlyforupdate = () => {
    return servicesFromDB;
  };

  const getRegServices = async () => {
    try {
      const value = await AsyncStorage.getItem('loginkeysasa');

      const {data: responseJson} = await axios.get(
        'https://' +
          ip +
          '/api/appointments/getConfingAppointmentServices?appointmentID=' +
          props.app_id,
        {
          headers: {
            'x-auth-token': value,
          },
        },
      );
      if (responseJson.length === 0  || responseJson===0 || responseJson===undefined) {
        // do nothing
      } else {
        //console.log("mmmm: ",responseJson[0].deals);
        //console.log("i: ",c);

        //selectedDeals.push(responseJson[0].deals);
        // console.log("mi: ",responseJson);
        //;
        //console.log("mkmmk: ",c);
        setServicesFromDB(responseJson[0].services);
        // setTr(true);
        //   console.log('shmn: ',selectedDeals);
        // return responseJson[0].deals;
        // Deals.netCartOnlyForUpdate(responseJson[0].deals);
      }
    } catch (ex) {
      console.log(ex.response.data);
    }
  };
  Menu.getMenuCart = () => {
    return services;
  };
  {
    ik === 0 && props.screenNumber === 1 && loading
      ? (setik(1),
        //  console.log("calllll"),
        getServices(), // if screen number 1 then get the services from db,
        setLoading(false))

        // and set in services array
      : console.log();
  }

  {
    ik === 0 && props.screenNumber === 3 && loading
      ? (setik(1),
        //  console.log("calllll"),
        getServices(), // if screen number 1 then get the services from db,
        setLoading(false))

        // and set in services array
      : console.log();
  }
  {
    loading && !set && props.screenNumber === 4
      ? // set loading to true
        // setLoading(true),
        // saloonProfile.SetStateToLoad(),
        (setServicesFromDB([]),
        setServices([]),
        getServices(),
        // get saloon deals data wrt the saloon id
        // then fetch appointment wrt following appointment id -> props.app_id
        //getRegServices(),
        setTr(true),
        setLoading(false))
        // saloonProfile.SetStateToUnLoad()

        //  console.log("mkmjjjjj: ",appp),
        // console.log('shmnm: ',selectedDeals),

        // populate the data in the selectedDeals array (setSelectedDeals(data))

        // now in return function
        //updateArrayWrtAddorRemove()

        //  console.log('shn: ',selectedDeals)
        //console.log("need to call update")

        // setloading to false
      : console.log();
  }

  const checkboxtheItem = item2 => {
    // filter out the item in services array
    var item = services.filter(i => i.id === item2.p_id);
    //console.log("6:",item);
    // we got the item full as  primary service
    var subitem = item[0].Services.filter(j => j.id === item2.id);
    // we got subitem itself
    // console.log("itm & subitm: ");
    // console.log(item);
    // console.log(subitem[0]);
    // if it is selected or not

    subitem.isSelected
      ? checksIfExists2(subitem[0]) // then
      : // if not selected then select it and add to cart
        AddItemsToArray(subitem[0]);
    Cart.updateme();
    subitem[0].isSelected ? checkifFalse(subitem[0]) : checkifFalse(subitem[0]);
    //console.log(cart);
    //console.log(deals);*/
  };

  const checkboxtheItem2 = item2 => {
    // filter out the item in services array
    var item = services.filter(i => i.id === item2.p_id);
    //console.log("item:1 ",item);
    // we got the item full as  primary service
    var subitem = item[0].Services.filter(j => j.id === item2.id);
    // we got subitem itself
    // console.log("itm & subitm: ");
    // console.log(item);
    // console.log(subitem[0]);
    // if it is selected or not
    subitem.isSelected
      ? checksIfExists2(subitem[0]) // then
      : // if not selected then select it and add to cart
        AddItemsToArray(subitem[0]);
    subitem[0].isSelected ? checkifFalse(subitem[0]) : checkifFalse(subitem[0]);
    //console.log(cart);
    //console.log(deals);*/
  };

  const checkifFalse = item2 => {
    // filter item if present in deals array
    const item = services.filter(i => i.id === item2.p_id);
    //console.log("i: ",item);
    const subitem = item[0].Services.filter(i => i.id === item2.id);
    // check if it is selected, if selected make it deselect and vice versa
    subitem[0].isSelected
      ? (subitem[0].isSelected = false)
      : (subitem[0].isSelected = true);

    // filter items with not containing the item
    const arr = item[0].Services.filter(i => i.id != subitem[0].id);
    var i, fLen;
    fLen = item[0].Services.length;
    // pop all items
    for (i = 0; i < fLen; i++) {
      item[0].Services.pop(i);
    }
    // push items on to array without that item
    for (i = 0; i < arr.length; i++) {
      item[0].Services.push(arr[i]);
    }
    // push that item with value isSelected changed true or false
    item[0].Services.push(subitem[0]);
    //console.log("bjhbhj: ");
    // console.log(item[0].Services);
    //sort();
  };

  // if already exists then remove from cart
  const checksIfExists2 = it => {
    if (props.screenNumber === 2) {
      const arr = servicesFromDB.filter(i => i != it); // except the item
      //console.log("callllllled");
      var i, fLen;
      fLen = servicesFromDB.length;
      for (i = 0; i < fLen; i++) {
        servicesFromDB.pop(i);
      }
      for (i = 0; i < arr.length; i++) {
        servicesFromDB.push(arr[i]);
      }
      //Cart.RemoveItemFromArray(it);
    } else {
      const arr = cart.filter(i => i != it); // except the item
      var i, fLen;
      fLen = cart.length;
      for (i = 0; i < fLen; i++) {
        cart.pop(i);
      }
      for (i = 0; i < arr.length; i++) {
        cart.push(arr[i]);
      }
      Cart.RemoveServicesFromArray(it);
    }
  };

  const AddItemsToArray = item => {
    //console.log("ading");
    //Cart.updateme();
    //Adding Items To Array
    if (props.screenNumber === 2) {
      const checksIfExists = servicesFromDB.includes(item);
      //console.log(item);

      if (checksIfExists) {
        for (var i = 0; i < servicesFromDB.length; i++) {
          if (servicesFromDB[i].id === item.id) {
            //console.log("addedddd: ", item);
            servicesFromDB.splice(i, 1);
          }
        }
        //Cart.updateme();
      } else {
        //Cart.updateme();
        servicesFromDB.push(item);
      }
      Cart.updateme();
      // if already in cart then remove
      /*checksIfExists ? 
        (checksIfExists2(item))
        // else add it to cart
    : 
      (adding2(item))*/
    } else {
      const checksIfExists = cart.includes(item);
      // if already in cart then remove
      checksIfExists
        ? checksIfExists2(item)
        : // else add it to cart
          adding(item);
    }
  };
  Menu.getDealsCart = () => {
    return cart;
  };

  const adding = item => {
    cart.push(item);

    if (props.screenNumber === 2) {
      Cart.AddItemsToArray(item);
    } else {
      //console.log("Cart is: ",cart);
      Cart.AddServicesToArray(item);
    }
  };

  const adding2 = item => {
    servicesFromDB.push(item);
  };

  const sort = arraytoSort => {
    //console.log("mkm: ",arraytoSort);
    var holdsort = [];
    var kk = arraytoSort.length;
    for (i = 0; i < kk; i++) {
      var min = arraytoSort[0];
      var k = 0,
        j,
        i;
      for (j = 0; j < arraytoSort.length; j++) {
        //  console.log(arraytoSort[j]);

        if (arraytoSort[j].id < min.id) {
          min = arraytoSort[j];
          k = j;
        }
      }
      const arr2 = arraytoSort.filter(o => o.id != arraytoSort[k].id);
      var k, l, fLen2;
      fLen2 = arraytoSort.length;

      for (l = 0; l < fLen2; l++) {
        arraytoSort.pop(l);
      }
      for (l = 0; l < arr2.length; l++) {
        arraytoSort.push(arr2[l]);
      }
      holdsort.push(min);
    }

    for (l = 0; l < holdsort.length; l++) {
      arraytoSort.push(holdsort[l]);
    }
    // console.log("mkm2: ",arraytoSort);
  };

  const sortFullServices = () => {
    //console.log("mmm", services);
    sort(services);
    // console.log('done');
    var i;
    for (i = 0; i < services.length; i++) {
      // console.log("s",services[i].services.Services);

      //console.log("nnnnk: ",services[i]);

      sort(services[i].Services);

      //console.log("serviced menu: ");
      //console.log(services[i].services.Services);
    }
  };

  /*if(!set && props.screenNumber===2){
    setTr(true);
    updateArrayWrtAddorRemove();
  }
  */

  //console.log("nnnn:mkm: ",services);
  !loading && !(services.length === 0) ? sortFullServices() : console.log();

  return (
    <View style={menuStyling.mainContainer}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : services.length === 0 ? (
        console.log()
      ) : (
        <View>
          <Text style={menuStyling.label}>
          {
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Services Menu'
            ):(
              'سہولیات کا مینو'
            )
          }
          </Text>
          {services.map(service => (
            <View key={service.id} style={menuStyling.serView}>
              <View style={menuStyling.topBarOverall}>
                <View style={menuStyling.reviewsIcon}>
                  <Entypo.Button
                    name={'add-to-list'}
                    size={23}
                    color={'white'}
                    style={menuStyling.reviewsIconStyle}
                  />
                </View>
                <Text style={menuStyling.salonPrice3}>{service.name}</Text>

                <View style={menuStyling.galleryOverall}>
                  <View style={menuStyling.galleryText}>
                    <Text style={menuStyling.salonPrice}>
                      {
                        (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                          'Price'
                        ):(
                          'قیمت'
                        )
                      }
                    </Text>
                  </View>
                </View>

                <View style={menuStyling.bookOverall}>
                  <View style={menuStyling.galleryText}>
                    <Text style={menuStyling.salonPrice}>{
                        (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                          'Book'
                        ):(
                          'منتخب '
                        )
                      }</Text>
                  </View>
                </View>
              </View>
              {service.Services.map(subservices => (
                <TouchableOpacity
                  key={subservices.id}
                  style={menuStyling.checkbox}
                  onPress={nval => {
                    //console.log("subservice: ");
                    //console.log(subservices.p_id);
                    checkboxtheItem(subservices);
                    // updating gui
                    setToggleCheckBox(nval);
                  }}
                  activeOpacity={0.99}>
                  <View>
                    <Text style={menuStyling.salonPrice4}>{subservices.name}</Text>
                  </View>

                  <View style={menuStyling.galleryOverall}>
                    <View style={menuStyling.salonPrice2}>
                      {subservices.discount === 0 ? (
                        <Text style={menuStyling.salonPrice2}>
                          {subservices.price}
                        </Text>
                      ) : (
                        <Text style={menuStyling.salonPrice5}>
                          <Text
                            style={menuStyling.price}>
                            {subservices.price.toFixed(0)}
                          </Text>
                          <Text style={menuStyling.salonPrice2}>
                            {' '}
                            {(subservices.price -
                              (subservices.discount / 100) *
                                subservices.price).toFixed(0)}{' '}
                          </Text>
                        </Text>
                      )}
                    </View>
                  </View>

                  <View style={menuStyling.bookOverall2}>
                    <View style={menuStyling.galleryText}>
                      <Ionicons.Button
                        name={
                          subservices.isSelected
                            ? 'md-checkmark-circle-outline'
                            : 'add-circle-outline'
                        }
                        size={Dimensions.get('screen').height / 30}
                        backgroundColor={'#edfeff'}
                        color={subservices.isSelected ? 'red' : 'black'}
                        style={menuStyling.iconBackColor2}
                        onPress={nval => {
                          //  console.log("subservice: ");
                          //  console.log(subservices.p_id);
                          checkboxtheItem(subservices);
                          // updating gui
                          setToggleCheckBox(nval);
                        }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}


export default Menu;
