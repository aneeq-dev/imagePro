import React, { useState, useEffect } from 'react';
import { AsyncStorage, View } from 'react-native';
import {StyleSheet, Text, FlatList, ActivityIndicator, TouchableOpacity, Image} from 'react-native';
import {Dimensions, Alert } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {saloonProfileStyling} from '../styleSheeet/screenStyles';
import store3 from '../redux/store3'

import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Deals from '../components/deals';
import { ScrollView } from 'react-native-gesture-handler';
import Menu from '../components/menu';
import Cart from '../components/Cart';
import DatePicker from '../components/DatePicker';
import RequestAppointment from '../components/RequestAppointment';
import Gallery2 from '../components/Gallery2';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Stylists from '../components/Stylists';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import ip from '../ipadd/ip';
import axios from 'axios';


//comment-dots
function saloonProfile(props) {


  

    var id =  props.route.params.id;
    const saloonName = props.route.params.name;
    const screenNumber = props.route.params.screenNumber;
    var app_id = props.route.params.app_id;
    //const salonName = props.navigation.pa('userName', 'NO-User'); 
    
    
    console.log(props);

    const [discount, setDiscount] = useState(30);
    const [loading, setLoading] = useState(30);
    const [saloondata,setSaloondata] = useState([]);
      

    const saloonInitialData = async ()=>{
      
       // let storestate = store.getState();
       console.log("mkm ",id);
        const {data:responseJson} = await axios.get('https://'+ip+'/api/saloon/getSaloonWRTid?id='+id);
        if(responseJson===0){
              console.log("no saloon data found");
        }
          else{
              setSaloondata(responseJson);  
        }
        //console.log(responseJson);
        setLoading(false)
      
    }

    saloonProfile.SetStateToLoad=()=>{
      setLoading(true);
    }
      
    saloonProfile.SetStateToUnLoad=()=>{
      setLoading(false);
    }

    const setDataUpdation = async ()=>{
        try{
          
          const value = await AsyncStorage.getItem('loginkeysasa');

          const {data:responseJson} = await axios.get('https://'+ip+'/api/appointments/getConfingAppointment?appointmentID='+app_id,{
            headers: {
              'x-auth-token': value,
            }
          });
          if(responseJson.length===0  || responseJson===0 || responseJson===undefined){
            // do nothing
          }
          else{
            console.log("mmmm: ",responseJson);
            var c = [{
              saloonOverallRating:responseJson[0].saloonID.saloonOverallRating,
              saloonGender:responseJson[0].saloonID.saloonGender,
              saloonBestImage:responseJson[0].saloonID.saloonBestImage,
              saloonDiscount:responseJson[0].saloonID.saloonDiscount,
              _id:responseJson[0].saloonID._id,
              saloonName:responseJson[0].saloonID.saloonName
            }]
            console.log("i: ",c);
            setSaloondata(c);
           // Deals.netCartOnlyForUpdate(responseJson[0].deals);


          }
      }
        catch(ex){
            console.log(ex.response.data);
        }
    }
    

    loading?(saloonInitialData()):(console.log());
        //console.log('store: ',store.getState());
    // if screen number is 2
   
    // then call this below method and setloading to true
    const updatingFromMyAppointment = ()=>{
      // 1- get following data wrt saloon id from db
      
          // saloon name
          // overall rating
          // gender
          // picture


      

      // set loading to false

    }

    (screenNumber===2 && loading)?(
      app_id=props.route.params.app_id,
      id= props.route.params.id,

      console.log(props.route.params.id),
      setDataUpdation()
     // Deals.setCartOnlyForUpdate()
    ):(
      null
    )


    saloonProfile.getSalonId=()=>{
      return id;
    };


    saloonProfile.goBack=()=>{
      props.navigation.goBack();
    };


    const genderAlert=(i)=>{
      if(i===0){
        Alert.alert(
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            "Men's Saloon"
          ):(
            'مردوں کا سیلون'
          )
          , 
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            "This saloon is only for mens. "
          ):(
            'یہ سیلون صرف مردوں کے لئے ہے۔'
          )
          
          , [{//style: "cancel"
                      }, { text: "OK", onPress: () => console.log("OK Pressed") }],{ cancelable: true });
      }else if(i===1){
        Alert.alert(
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            "Female's Saloon"
          ):(
            'خواتین کا سیلون'
          )
          , 
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            "This saloon is only for females. "
          ):(
            'یہ سیلون صرف خواتین کے لئے ہے'
          )
          , [{//style: "cancel"
                      }, { text: "OK", onPress: () => console.log("OK Pressed") }],{ cancelable: true })
      }
      else if(i===2){
        Alert.alert(
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            "Men's and Women's Saloon"
          ):(
            'مرد اور خواتین کا سیلون'
          )
          , 
          (store3.getState().length===0 || store3.getState()[0].language==='English')?(
            "This saloon is for both womens and mens. "
          ):(
            'یہ سیلون عورتوں اور مردوں دونوں کے لئے ہے'
          )
          
          , [{//style: "cancel"
          }, { text: "OK", onPress: () => console.log("OK Pressed") }],{ cancelable: true })
      }
    }

    const ratingAlert=(rating)=>{
      Alert.alert(
        
        (store3.getState().length===0 || store3.getState()[0].language==='English')?(
          "Saloon Rating"
        ):(
          'سیلون کی درجہ بندی'
        )
        , 
        (store3.getState().length===0 || store3.getState()[0].language==='English')?(
          "Overall Saloon Rating is "+rating+" stars. "
        ):(
          'مجموعی طور پر سیلون کی درجہ بندی ہے'+rating+'ستارے '
        )
         
      ,
      
       [{//style: "cancel"
        }, { text: "OK", onPress: () => console.log("OK Pressed") }],{ cancelable: true })
    }

    return (
      console.log("saloon: ",saloondata),
      (loading)?(<ActivityIndicator size="large" />):(
        !(saloondata.length===0)?(
  <View style={saloonProfileStyling.backColoract}>
  <ScrollView>


  <View style={saloonProfileStyling.topBarOverall}>
      <TouchableOpacity style={saloonProfileStyling.reviewsTouchable} onPress={()=>ratingAlert(saloondata[0].saloonOverallRating)}>  
        
        <View style={saloonProfileStyling.reviewsIcon}>
          <FontAwesome.Button 
            name={'star'} 
            backgroundColor={'#002426'}
            size={23} 
            color={'white'} 
            style={saloonProfileStyling.reviewsIconStyle}
          />
        </View>
        <Text style={saloonProfileStyling.salonPrice}> 
        {((store3.getState().length===0 || store3.getState()[0].language==='English'))?(
                    'Rating'):(
                      'درجہ بندی'
                    )}
        </Text>
      </TouchableOpacity>  

        <View style={saloonProfileStyling.galleryOverall} >
          <TouchableOpacity onPress={()=>{
              saloondata[0].saloonGender==='male'?(
                genderAlert(0)
              ):(
                saloondata[0].saloonGender==='female'?(
                  genderAlert(1)
                ):(
                  genderAlert(2)
                )
              )
          }}>
            <View style={saloonProfileStyling.galleryText}>
              <View>
                <Text style={saloonProfileStyling.salonPrice}>
                  {
                    saloondata[0].saloonGender==='male'?(
                      
                      ((store3.getState().length===0 || store3.getState()[0].language==='English'))?(
                        'For Mens'):(
                          "مردوں کے لئے"
                        )
                    ):(
                      saloondata[0].saloonGender==='female'?(
                      
                        ((store3.getState().length===0 || store3.getState()[0].language==='English'))?(
                          'For Females'):(
                            'خواتین کے لئے'
                          )
                      ):(
                        
                        ((store3.getState().length===0 || store3.getState()[0].language==='English'))?(
                          'For Mens & Females'):(
                            'مرد اور خواتین کے لئے'
                          )
                      )
                    )
                  }
                </Text>
              </View>
              <View>
                {saloondata[0].saloonGender==='male'?(
                  <Fontisto.Button 
                  name={'male'} 
                  backgroundColor={'#002426'}
                  size={23} 
                  color={'white'} 
                  style={saloonProfileStyling.galleryIcon}
                  />
                ):(
                  saloondata[0].saloonGender==='female'?(
                    <Fontisto.Button 
                      name={'female'} 
                      backgroundColor={'#002426'}
                      size={23} 
                      color={'white'} 
                      style={saloonProfileStyling.galleryIcon}
                      />
                  ):(
                    <Foundation.Button 
                      name={'male-female'} 
                      backgroundColor={'#002426'}
                      size={23} 
                      color={'white'} 
                      style={saloonProfileStyling.galleryIcon}
                      />
                  )
                )
              }
              </View>
            </View>
          </TouchableOpacity>  
        </View>
      </View>
      
          <View>
            <Image
            source={{
                uri: `${saloondata[0].saloonBestImage}`,
            }}
            style={saloonProfileStyling.flatListImage}/>   
          { 
            saloondata[0].saloonDiscount===0?(null):(
            <View style={saloonProfileStyling.topCard}> 

            {
              (store3.getState().length===0 || store3.getState()[0].language==='English')?(
                <Text style={saloonProfileStyling.disc}>
                  Upto {saloondata[0].saloonDiscount}% off
                </Text>
              ):(
                <Text style={saloonProfileStyling.disc}>
                   رعایت %{saloondata[0].saloonDiscount} تک
                </Text>
              )
            }                    

            </View>
            )
          }
          </View>

    
          <View style={saloonProfileStyling.topBarOverall}>
            <TouchableOpacity style={saloonProfileStyling.reviewsTouchable} onPress={()=> 
              props.navigation.navigate('Comments', {
                id2: saloondata[0]._id,
                screenNumber:2
              })
            }>  
              <View style={saloonProfileStyling.reviewsIcon}>
                <FontAwesome.Button 
                name={'commenting'} 
                backgroundColor={'#002426'}
                size={23} 
                color={'white'} 
                style={saloonProfileStyling.reviewsIconStyle}
                />
              </View>
              <Text style={saloonProfileStyling.salonPrice}>
                  {((store3.getState().length===0 || store3.getState()[0].language==='English'))?(
                    'Reviews'):(
                      'تبصرے'
                    )}
              </Text>
            </TouchableOpacity>  

            <View style={saloonProfileStyling.galleryOverall} >
              <TouchableOpacity onPress={()=> 
              props.navigation.navigate('Gallery', {
                id2: saloondata[0]._id
              })
            }
            >
                <View style={saloonProfileStyling.galleryText}>
                  <View>
                    <Text style={saloonProfileStyling.salonPrice}>
                    {((store3.getState().length===0 || store3.getState()[0].language==='English'))?(
                    'Gallery'):(
                      'سیلون کی تصاویر'
                    )}
                    </Text>
                  </View>
                    <View>
                      <FontAwesome.Button 
                      name={'photo'} 
                      size={23} 
                      backgroundColor={'#002426'}
                      color={'white'} 
                      style={saloonProfileStyling.galleryIcon}
                      />
                    </View>
                </View>
              </TouchableOpacity>  
            </View>
          </View>



          <View style={saloonProfileStyling.salonBackHeight}>
              <View style={saloonProfileStyling.alignRowWise}>
                  <Text style={saloonProfileStyling.salonName}>
                      {saloondata[0].saloonName.toUpperCase()}
                  </Text>                                
              </View>
          </View>

            
          
          <Deals id={id} screenNumber={screenNumber} app_id={app_id}/>
          <Menu id={saloondata[0]._id} screenNumber={screenNumber} app_id={app_id}/> 
          
          {console.log("scre: ",screenNumber)}
          <View>
            <Cart id={saloondata[0]._id} screenNumber={screenNumber} app_id={app_id}/>
          </View>         
          
          <View>
            <DatePicker id={saloondata[0]._id} screenNumber={screenNumber} app_id={app_id}/>
          </View>

          <Stylists id={saloondata[0]._id} screenNumber={screenNumber} app_id={app_id}/>

          <RequestAppointment id={saloondata[0]._id} screenNumber={screenNumber} app_id={app_id} nm={props.navigation}/>
          
          </ScrollView>

      
      </View>):(
          Alert.alert(
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              "No Saloon data found!"
            ):(
              'کوئی سیلون ڈیٹا نہیں ملا!'
            )
            , 
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              "We cannot load saloon data properly, please try again!"
            ):(
              'ہم سیلون ڈیٹا کو ٹھیک سے لوڈ نہیں کرسکتے ، براہ کرم دوبارہ کوشش کریں!'
            )
            
          , [{//style: "cancel"
          }, { text: "OK", onPress: () => console.log("OK Pressed") }],{ cancelable: true }),
          console.log(props),
          props.navigation.goBack(),
          null
      )
    )
    );
}


export default saloonProfile;