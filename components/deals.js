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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {dealsStyling} from '../styleSheeet/styles';
import Cart from './Cart';
import Ionicons from 'react-native-vector-icons/Ionicons';
import store3 from '../redux/store3';
import ip from '../ipadd/ip';
import axios from 'axios';

function Deals(props) {
  //console.log("prps: ",props);

  const saloon_id = props.id;

  const [loading, setLoading] = useState(true);
  const [set, setTr] = useState(false);

  const [deals, setDeals] = useState([]);
  const [selectedDeals, setSelectedDeals] = useState([]);
  // {id:1, name:'Groomy Deal', price:500, Services:'Hair Cut, Massage & Shave', isSelected:true},
  // {id:2, name:'Beauty Deal', price:700, Services:'Hair Cut, Facial & Keratin Treatment' , isSelected:true},
  const [setse, setSe] = useState(true);

  const [cart, setCart] = useState([]);

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const getDeals = async () => {
    //console.log("bhjbh",saloon_id);
    try {
      const {data: responseJson} = await axios.get(
        'https://' + ip + '/api/deals/getDeals?saloonID=' + saloon_id,
      );
      if (responseJson === 0) {
        // do nothing
      } else {
        // console.log("llll: ",responseJson);
        responseJson.forEach(function(element, i) {
          element.num = i;
          // console.log(i);
        });
        setDeals(responseJson);
        setLoading(false);
      }
    } catch (ex) {
      console.error(ex);
    }
    //console.log("njknkjnjjj: ",deals);
  };

  //console.log("dealfhgv", props.id);
  const updateArrayWrtAddorRemove = () => {
    // filter out the item in deals array
    // we got selected deals
    // then instill isSelected to true in the array
    // then match the ids of deals in deals with selectedDeals
    // if matches then remove that deal from deals and push the deal into deals with isSelected to true
    //
    var i, k;
    console.log('selected deals: ', selectedDeals);

    var deal = selectedDeals;
    console.log('de: ', deal);
    deal.forEach(function(element, i) {
      element.isSelected = true;
      // console.log(i);
    });
    console.log('l: ', deal);
    setSelectedDeals(deal);

    for (i = 0; i < deals.length; i++) {
      for (k = 0; k < selectedDeals.length; k++) {
        //console.log("|||||||||per: ",deals[i]._id,selectedDeals[0].deals[k]._id);
        if (deals[i]._id === selectedDeals[k]._id) {
          console.log('|||||||||||||||||||per: ', deals[i], selectedDeals[k]);

          //console.log("is: ",deals[i].isSelected);
          console.log('isi: ', selectedDeals[k].isSelected);
          // remove from  deals array
          var item = deals.splice(i, 1);
          // and then add into deals
          deals.push(selectedDeals[k]);

          ///console.log("njnnnnnnnnn: ",selectedDeals[k]);
        }
      }
    }

    for (i = 0; i < selectedDeals.length; i++) {
      //AddItemsToArray(selectedDeals[i]);
    }

    //  setDeals(deals);
    setDeals(deals);
    updatemem();
    setLoading(false);
    console.log('after: ', deals);
  };

  useEffect(() => {
    updateArrayWrtAddorRemove(); // This is be executed when `loading` state changes
    Cart.updateme();
  }, [selectedDeals]);

  const getappps = async () => {
    try {
      const value = await AsyncStorage.getItem('loginkeysasa');

      const {data: responseJson} = await axios.get(
        'https://' +
          ip +
          '/api/appointments/getConfingAppointmentDeals?appointmentID=' +
          props.app_id,
        {
          headers: {
            'x-auth-token': value,
          },
        },
      );
      if (responseJson.length === 0 || responseJson===0 || responseJson===undefined) {
        // do nothing
      } else {
        //console.log("mmmm: ",responseJson[0].deals);
        //console.log("i: ",c);

        //selectedDeals.push(responseJson[0].deals);
        console.log('mi: ', responseJson);
        //;
        //console.log("mkmmk: ",c);
        setSelectedDeals(responseJson[0].deals);
        // setTr(true);
        //   console.log('shmn: ',selectedDeals);
        // return responseJson[0].deals;
        // Deals.netCartOnlyForUpdate(responseJson[0].deals);
      }
    } catch (ex) {
      console.log(ex.response.data);
    }
  };

  const updatemem = () => {
    if (setse) {
      setSe(false);
    } else {
      setSe(true);
    }
  };

  var appp = [];

  {
    loading && !set && props.screenNumber === 1
      ? (getDeals(), setTr(true), setLoading(false))
      : null;
  }

  {
    loading && !set && props.screenNumber === 4
      ? (getDeals(), setTr(true), setLoading(false))
      : null;
  }

  /*{
    loading && !set && selectedDeals.length === 0 && props.screenNumber === 2
      ? // set loading to true
        (setSelectedDeals([]),
        setDeals([]),
        getDeals(),
        // get saloon deals data wrt the saloon id
        props.screenNumber === 2 // (i.e. to update){
          ? // then fetch appointment wrt following appointment id -> props.app_id
            (
            //  updatemem(),
            setTr(true))
            //setLoading(false)

            //  console.log("mkmjjjjj: ",appp),
            // console.log('shmnm: ',selectedDeals),

            // populate the data in the selectedDeals array (setSelectedDeals(data))

            // now in return function
            //updateArrayWrtAddorRemove()

            //  console.log('shn: ',selectedDeals)
            //console.log("need to call update")
          : console.log())
        // setloading to false
      : console.log();
  }
*/
  {
    loading && !set && props.screenNumber === 3
      ? (getDeals(), setTr(true), setLoading(false))
      : null;
  }

  /*   if(!set && props.screenNumber===2){
      updateArrayWrtAddorRemove();
      setTr(true);
    }*/

  const checkboxtheItem = item2 => {
    // filter out the item in deals array
    var item = deals.filter(i => i._id === item2._id);
    //console.log("itemgot: ",item);
    // if it is selected or not
    item[0].isSelected
      ? checksIfExists2(item2) // then
      : // if not selected then select it and add to cart
        AddItemsToArray(item2);
    Cart.updateme();

    item[0].isSelected ? checkifFalse(item[0]) : checkifFalse(item[0]);
    //console.log(cart);
    //console.log(deals);
  };

  const checkifFalse = item2 => {
    // filter item if present in deals array
    const item = deals.filter(i => i.num === item2.num);
    // check if it is selected, if selected make it deselect and vice versa
    item[0].isSelected
      ? (item[0].isSelected = false)
      : (item[0].isSelected = true);

    // filter items with not containing the item
    const arr = deals.filter(i => i.num != item[0].num);
    var i, fLen;
    fLen = deals.length;
    // pop all items
    for (i = 0; i < fLen; i++) {
      deals.pop(i);
    }
    // push items on to array without that item
    for (i = 0; i < arr.length; i++) {
      deals.push(arr[i]);
    }
    // push that item with value isSelected changed true or false
    deals.push(item[0]);
    sort();
  };

  const sort = () => {
    //console.log(deals);
    var holdsort = [];
    var kk = deals.length; // for deals length
    //console.log("kk:",kk);
    for (i = 0; i < kk; i++) {
      // for every element in deals
      var min = deals[0]; // first is min
      var k = 0,
        j = 0,
        i;
      //console.log("njnnjn ",deals[i], min);
      for (j = 0; j < deals.length; j++) {
        // for every element in deals
        // console.log("this: ",deals[j]._id, min._id);
        if (deals[j].num < min.num) {
          min = deals[j];
          k = j;
        }
      }
      // we will get minimum here at end of i iteration
      // now filter deals without having that minimum id deal
      const arr2 = deals.filter(o => o.num != deals[k].num);
      // console.log("arr2: ",arr2);
      var k, l, fLen2;
      fLen2 = deals.length;

      // now remove all items from deals
      for (l = 0; l < fLen2; l++) {
        deals.pop(l);
      }
      //  console.log("deals are: ",deals);
      // now push all items
      for (l = 0; l < arr2.length; l++) {
        deals.push(arr2[l]);
      }
      //console.log("deals are 2: ",deals);

      holdsort.push(min);
      //console.log("holds: ",holdsort);
    }

    for (l = 0; l < holdsort.length; l++) {
      deals.push(holdsort[l]);
    }
    // console.log("deals are 3: ",deals);
  };

  Deals.getDealsCart = () => {
    return cart;
  };

  Deals.netCartOnlyForUpdate = dealsm => {
    // for setting up the update data for screen number 2
    //getDeals();
    /*console.log("g: ",dealsm);
    if(dealsm.length===0 || dealsm===undefined){
      // do nothing
    }else{
      dealsm.forEach(function (element,i) {
        element.isSelected = true;
       // console.log(i);
      });
      console.log("l: ", dealsm);
      setSelectedDeals(dealsm);
      updateArrayWrtAddorRemove();
    }*/
  };

  //just return the selected deals cart
  Deals.getDealsCartonlyforUpdate = () => {
    // console.log("h: ",selectedDeals);
    return selectedDeals;
  };

  // if already exists then remove from cart
  const checksIfExists2 = it => {
    if (props.screenNumber === 2) {
      const arr = selectedDeals.filter(i => i._id != it._id); // except the item
      //console.log("callllllled");
      var i, fLen;
      fLen = selectedDeals.length;
      for (i = 0; i < fLen; i++) {
        selectedDeals.pop(i);
      }
      for (i = 0; i < arr.length; i++) {
        selectedDeals.push(arr[i]);
      }
      //Cart.RemoveItemFromArray(it);
    } else {
      const arr = cart.filter(i => i != it);
      var i, fLen;
      fLen = cart.length;
      for (i = 0; i < fLen; i++) {
        cart.pop(i);
      }
      for (i = 0; i < arr.length; i++) {
        cart.push(arr[i]);
      }

      Cart.RemoveItemFromArray(it);
    }
  };

  const AddItemsToArray = item => {
    // console.log("sef: ",selectedDeals);

    if (props.screenNumber === 2) {
      var checksIfExists = false;
      // const checksIfExists = selectedDeals.includes(item);
      //console.log("----------------------exists: ",item);
      if (selectedDeals.length === 0) {
        // console.log("not exists");
        checksIfExists = false;
      } else {
        //console.log(" can exists:mkmkm");

        for (var i = 0; i < selectedDeals.length; i++) {
          // if exists
          //console.log(selectedDeals[i]._id, item._id);
          if (selectedDeals[i]._id === item._id) {
            // console.log("exists:mkmkm");
            checksIfExists = true;
          } else {
            //console.log("not exists");
            checksIfExists = false;
          }
        }
      }

      if (checksIfExists) {
        //console.log("yes");
        for (var i = 0; i < selectedDeals.length; i++) {
          //console.log("here: ",i);
          //console.log("ses: ",selectedDeals[i],selectedDeals.length, item);
          if (selectedDeals[i]._id === item._id) {
            //console.log("addedddd: ", item);
            selectedDeals.splice(i, 1);
          }
        }
        //Cart.updateme();
      } else {
        // console.log("no");
        selectedDeals.push(item);
      }
      Cart.updateme();
      // if already in cart then remove
      /*checksIfExists ? 
          (checksIfExists2(item))
          // else add it to cart
      : 
        (adding2(item))*/
    } else {
      //Adding Items To Array
      const checksIfExists = cart.includes(item);
      // if already in cart then remove
      checksIfExists
        ? checksIfExists2(item)
        : // else add it to cart
          adding(item);
    }
  };

  const adding = item => {
    cart.push(item);
    // console.log("hnjnjnj");
    Cart.AddItemsToArray(item);
  };

  sort();

  return (
    <View style={dealsStyling.container}>
      {loading && !(deals.length === 0) ? (
        <ActivityIndicator size="large" />
      ) : deals.length === 0 ? null : (
        <View style={dealsStyling.flatListContainer}>
          <Text style={dealsStyling.label}>
          {
              (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                'Saloon Deals'
              ):(
                'سیلون سودے'
              )
            }  
          </Text>
          <FlatList
            style={dealsStyling.flatListStyle}
            keyExtractor={(item, index) => index.toString()}
            data={deals}
            horizontal
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.99}
                onPress={nval => {
                  checkboxtheItem(item);
                  // updating gui
                  setToggleCheckBox(nval);
                }}
                //onPress={()=>
                //  props.navigation.navigation.navigate('Profile', {
                //       id: item.id,
                //      name: item.name
                //   }
                //   )}
              >
                <View>
                  <View style={dealsStyling.salonInfoBack}>
                    <View style={dealsStyling.salonBackHeight}>
                      <View style={dealsStyling.alignRowWise}>
                        <View style={dealsStyling.alignColWise}>
                          <Text style={dealsStyling.salonName}>
                            {item.saloonDealDetails.nameOfDeal.toUpperCase()}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={dealsStyling.salonInfoFront}>
                      <View style={dealsStyling.alignViewRowWise}>
                        <Text style={dealsStyling.salonPrice}>
                          {
                            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                              'Valued:'
                            ):(
                              'قیمت:  '
                            )
                          }
                           RS.{' '}
                          <Text style={dealsStyling.salonPriceMin}>
                            {item.saloonDealDetails.priceOfDeal.toFixed(0)}
                          </Text>
                        </Text>

                        <FontAwesome.Button
                          name={'dollar'}
                          size={17}
                          color={'yellow'}
                          backgroundColor={'black'}
                          style={dealsStyling.iconBackColor}
                        />
                      </View>

                      <View style={dealsStyling.alignViewRowWise}>
                        <Text style={dealsStyling.salonPrice}>
                          {
                            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                              'Add to cart'
                            ):(
                              'ٹوکری میں شامل کریں'
                            )
                          }
                        </Text>

                        <FontAwesome.Button
                          name={'cart-plus'}
                          backgroundColor={'black'}
                          size={17}
                          color={'yellow'}
                          style={dealsStyling.iconBackColor}
                        />

                        {
                          //<CheckBox
                          // disabled={false}
                          // value={toggleCheckBox}
                          // tintColors={'yellow'}
                          //  onValueChange={(newValue) => {
                          //     AddItemsToArray(item);
                          //     setCheckBox(newValue, item);
                          // }}/>
                        }

                        <Ionicons.Button
                          name={
                            item.isSelected
                              ? 'md-checkmark-circle-outline'
                              : 'add-circle-outline'
                          }
                          size={18}
                          color={item.isSelected ? 'red' : 'white'}
                          backgroundColor={'black'}
                          style={dealsStyling.iconBackColor}
                          onPress={nval => {
                            checkboxtheItem(item);
                            // updating gui
                            setToggleCheckBox(nval);
                          }}
                        />
                        {item.isSelected ? (
                          <Text style={dealsStyling.salonPrice}>
                            {
                              (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                                'Remove'
                              ):('')
                            }
                          </Text>
                        ) : (
                          <Text style={dealsStyling.salonPrice}>
                            {
                            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                              'Select'
                            ):(
                            ''
                           )
                          }
                          </Text>
                        )}

                        {
                          // value={this.state.value0}
                          //onValueChange={value =>
                          //  this.setState({
                          //  value0: value,
                          //  })
                          //
                        }
                      </View>

                      <Text style={dealsStyling.salonPrice3}>
                        {item.saloonDealDetails.servicesOfDeal}
                      </Text>

                      {
                        //   {services.map((item)=>(
                        // <View>
                        //    <Text key= {item.dealID} style={dealsStyling.salonServices}>{item.dealServices} + </Text>
                        //   </View>
                        // ))}
                      }
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={dealsStyling.separator} />}
            //Adding Load More button as footer component
          />
        </View>
      )}
    </View>
  );
}



export default Deals;
