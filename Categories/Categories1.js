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
import saloonProfile from '../screens/saloonProfile';
import {StackNavigator} from 'react-navigation';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {stylistsStyling} from '../styleSheeet/styles';

import {categoriesStyling} from '../styleSheeet/styles';
import axios from 'axios';
import ip from '../ipadd/ip';
import {set} from 'lodash';
import {ScrollView} from 'react-native';
import store3 from '../redux/store3';
import store from '../redux/store';

const IMAGE = require('../images/starm.png');

function Categories1(props) {
  const pageSize = 5;
  // data saved in this form in db in json, hardcoding the number of categories till fyp
  const [Categories, setCategories] = useState([
    {
      categoryName: "Men's Saloons",
      categoryName2: 'آپ کے قریب ، مردوں کے سیلون',
      c_id: '1',
    },
    {
      categoryName: "Women's Saloons",
      categoryName2: 'آپ کے قریب ، خواتین کے سیلون',
      c_id: '2',
    },
    {categoryName: 'Featured', categoryName2: 'نمایاں سیلون', c_id: '3'},
    {categoryName: 'SASA Best Deals', categoryName2: 'بہترین سودے', c_id: '4'},
    {categoryName: 'New on SASA', categoryName2: 'نئے سیلون', c_id: '5'},
    {categoryName: 'All Saloons', categoryName2: 'تمام سیلون', c_id: '6'},
  ]);

  const [category1serverData, setCategory1ServerData] = useState([]);
  const [category2serverData, setCategory2ServerData] = useState([]);
  const [category3serverData, setCategory3ServerData] = useState([]);
  const [category4serverData, setCategory4ServerData] = useState([]);
  const [category5serverData, setCategory5ServerData] = useState([]);
  const [category6serverData, setCategory6ServerData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [loading4, setLoading4] = useState(true);
  const [loading5, setLoading5] = useState(true);
  const [loading6, setLoading6] = useState(true);

  const [haveMore1, setHaveMore1] = useState(false);
  const [haveMore2, setHaveMore2] = useState(false);
  const [haveMore3, setHaveMore3] = useState(false);
  const [haveMore4, setHaveMore4] = useState(false);
  const [haveMore5, setHaveMore5] = useState(false);
  const [haveMore6, setHaveMore6] = useState(false);

  // const [serverData, setServerData] = useState([]);
  const [fetchingFromServer, setFetchingFromServer] = useState(false);
  const [fetchingFromServer2, setFetchingFromServer2] = useState(false);
  const [fetchingFromServer3, setFetchingFromServer3] = useState(false);
  const [fetchingFromServer4, setFetchingFromServer4] = useState(false);
  const [fetchingFromServer5, setFetchingFromServer5] = useState(false);
  const [fetchingFromServer6, setFetchingFromServer6] = useState(false);

  const [loadMore, setLoadMore] = useState(true);
  const [loadMore2, setLoadMore2] = useState(true);
  const [loadMore3, setLoadMore3] = useState(true);
  const [loadMore4, setLoadMore4] = useState(true);
  const [loadMore5, setLoadMore5] = useState(true);
  const [loadMore6, setLoadMore6] = useState(true);

  const [offset, setOffset] = useState(1);
  const [offset2, setOffset2] = useState(1);
  const [offset3, setOffset3] = useState(1);
  const [offset4, setOffset4] = useState(1);
  const [offset5, setOffset5] = useState(1);
  const [offset6, setOffset6] = useState(1);
  const [distance, setMaxDistance] = useState(50);

  // categories
  //saloon id
  //categories
  //category id:1, category name:mens saloon
  //category id:2, category name:womens saloon
  //category id:3, category name:featured saloon
  //category id:4, category name:New saloon
  //category id:5, category name:Best deals saloon

  // 1 -
  // firstly fetch the categories from db as representation is above -> Categories -> c_id, and categoryName
  // only 6 categories will be there only

  // 2 -
  // saloons are stored with category id
  // while fetching mens saloon, just get the saloons wrt category id from db of only 10 records
  // same for female saloon
  // featured - according to rating
  // best deals - calcuated by which have most discount
  // new saloons - by saloon date
  // all saloons - by random function

  // 3 -
  // then set the fetched data to the gui, by setCategory1ServerData

  // 4 -
  // data fetched will be like

  // category id
  // saloon id
  // minimum price // saved at run time by looping over the services and deals services' prices
  // saloon name
  // saloon rating
  // services // saloons best services asked by owner
  // saloon image // best saloon image
  // saloon gender
  // saloon discount // calculated when owner changed any discount on services
  // date created on

  useEffect(
    () => {
      load();
    },
    [offset, offset2, offset3, offset4, offset5, offset6],
    //  query for fetching category 2 server data
  );


  

  const load = async () => {
    {
      if (loadMore) {
        //  query for fetching category 1 server data
        const {data: responseJson} = await axios.get(
          'https://' +
            ip +
            '/api/saloon/browseMensSaloons?pageNumber=' +
            offset +
            '&lat=' +
            store.getState()[0].latitude +
            '&lng=' +
            store.getState()[0].longitude +
            '&dist=' +
            distance,
        );
        //  console.log(offset);
        //  console.log(responseJson);

        if (responseJson === 0) {
          console.log('empty');
        } else {
          //  console.log("reed: ",responseJson.length);
          if (responseJson.length === 6) {
            setHaveMore1(true);
          } else {
            setHaveMore1(false);
          }
          setCategory1ServerData([
            ...category1serverData,
            ...responseJson.slice(0 * 5, 1 * 5),
          ]);
        }
        // console.log({data});
        // setCategory1ServerData([...category1serverData, ...responseJson]);
        setLoading(false);
        setLoadMore(false);
        setFetchingFromServer(false);
      }

      if (loadMore2) {
        const {data: responseJson} = await axios.get(
          'https://' +
            ip +
            '/api/saloon/browseWomensSaloons?pageNumber=' +
            offset2 +
            '&lat=' +
            store.getState()[0].latitude +
            '&lng=' +
            store.getState()[0].longitude +
            '&dist=' +
            distance,
        );
        //console.log(offset);
        console.log('ghbhhbhjjjjjjjjjjjjjjj', responseJson);

        // console.log({data});
        if (responseJson === 0) {
          console.log('empty');
        } else {
          //console.log("reed: ",responseJson.length);
          if (responseJson.length === 6) {
            setHaveMore2(true);
          } else {
            setHaveMore2(false);
          }
          setCategory2ServerData([
            ...category2serverData,
            ...responseJson.slice(0 * 5, 1 * 5),
          ]);
        }
        setLoading2(false);
        setLoadMore2(false);
        setFetchingFromServer2(false);
        // query for 2nd category
      }

      if (loadMore3) {
        const {data: responseJson} = await axios.get(
          'https://' +
            ip +
            '/api/saloon/browseFeaturedSaloons?pageNumber=' +
            offset3 +
            '&lat=' +
            store.getState()[0].latitude +
            '&lng=' +
            store.getState()[0].longitude +
            '&dist=' +
            distance,
        );
        //console.log(offset);
        //  console.log(responseJson);

        if (responseJson === 0) {
          console.log('empty featured');
        } else {
          console.log('reed: ', responseJson.length);
          if (responseJson.length === 6) {
            setHaveMore3(true);
          } else {
            setHaveMore3(false);
          }
          setCategory3ServerData([
            ...category3serverData,
            ...responseJson.slice(0 * 5, 1 * 5),
          ]);
        }
        // console.log({data});
        //setCategory3ServerData([...category3serverData, ...responseJson]);
        setLoading3(false);
        setLoadMore3(false);
        setFetchingFromServer3(false);
      }

      if (loadMore4) {
        const {data: responseJson} = await axios.get(
          'https://' +
            ip +
            '/api/saloon/browseSaSaDealsSaloons?pageNumber=' +
            offset4 +
            '&lat=' +
            store.getState()[0].latitude +
            '&lng=' +
            store.getState()[0].longitude +
            '&dist=' +
            distance,
        );
        //console.log(offset);
        // console.log(responseJson);
        if (responseJson === 0) {
          console.log('empty');
        } else {
          // console.log("reed: ",responseJson.length);
          if (responseJson.length === 6) {
            setHaveMore4(true);
          } else {
            setHaveMore4(false);
          }
          setCategory4ServerData([
            ...category4serverData,
            ...responseJson.slice(0 * 5, 1 * 5),
          ]);
        }

        // console.log({data});
        setLoading4(false);
        setLoadMore4(false);
        setFetchingFromServer4(false);

        /*
      // query for 4th category
        fetch('https://jsonplaceholder.typicode.com/photos?offset=' + offset4)
        //Sending the currect offset with get request
        .then(response => response.json())
        .then(responseJson => {
        //Successful response from the API Call 
            console.log("did mount");
            console.log(offset4);
            //After the response increasing the offset for the next API call.
            setCategory4ServerData([...category4serverData, ...responseJson.slice((offset4-1)*10,(offset4)*10)]);
            setLoading4(false);
            setLoadMore4(false);
            setFetchingFromServer4(false);

        })
        .catch(error => {
            console.error(error);
      })*/
      }
      if (loadMore5) {
        const {data: responseJson} = await axios.get(
          'https://' +
            ip +
            '/api/saloon/browseNewNearSaloons?pageNumber=' +
            offset5 +
            '&lat=' +
            store.getState()[0].latitude +
            '&lng=' +
            store.getState()[0].longitude +
            '&dist=' +
            distance,
        );
        //console.log(offset);
        //  console.log(responseJson);

        // console.log({data});
        if (responseJson === 0) {
          console.log('empty');
        } else {
          //console.log("reed: ",responseJson.length);
          if (responseJson.length === 6) {
            setHaveMore5(true);
          } else {
            setHaveMore5(false);
          }
          setCategory5ServerData([
            ...category5serverData,
            ...responseJson.slice(0 * 5, 1 * 5),
          ]);
        }
        setLoading5(false);
        setLoadMore5(false);
        setFetchingFromServer5(false);
      }
      if (loadMore6) {
        const {data: responseJson} = await axios.get(
          'https://' +
            ip +
            '/api/saloon/browseAllSaloons?pageNumber=' +
            offset6 +
            '&lat=' +
            store.getState()[0].latitude +
            '&lng=' +
            store.getState()[0].longitude +
            '&dist=' +
            distance,
        );
        //console.log(offset);
        // console.log(responseJson);

        // console.log({data});
        if (responseJson === 0) {
          console.log('empty');
        } else {
          console.log('reed: ', responseJson.length);
          if (responseJson.length === 6) {
            setHaveMore6(true);
          } else {
            setHaveMore6(false);
          }
          setCategory6ServerData([
            ...category6serverData,
            ...responseJson.slice(0 * 5, 1 * 5),
          ]);
          //  setHaveMore6(responseJson);
        }
        setLoading6(false);
        setLoadMore6(false);
        setFetchingFromServer6(false);
      }
    }
  };

  renderFooter = id => {
    return (
      //Footer View with Load More button
      <View style={categoriesStyling.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            // setFetchingFromServer(true);
            if (
              id === '1' &&
              haveMore1 &&
              !(category1serverData.length === 0)
            ) {
              //   setLoading(true);
              setFetchingFromServer(true);
              setOffset(offset + 1);
              setLoadMore(true);
              console.log('increased 1', offset);
            } else if (
              id === '2' &&
              haveMore2 &&
              !(category2serverData.length === 0)
            ) {
              setFetchingFromServer2(true);
              setOffset2(offset2 + 1);
              setLoadMore2(true);
              console.log('increased 2', offset2);
            } else if (
              id === '3' &&
              haveMore3 &&
              !(category3serverData.length === 0)
            ) {
              setFetchingFromServer3(true);
              setOffset3(offset3 + 1);
              setLoadMore3(true);
              console.log('increased 3', offset3);
            } else if (
              id === '4' &&
              haveMore4 &&
              !(category4serverData.length === 0)
            ) {
              setFetchingFromServer4(true);
              setOffset4(offset4 + 1);
              setLoadMore4(true);
              console.log('increased 4', offset4);
            } else if (
              id === '5' &&
              haveMore5 &&
              !(category5serverData.length === 0)
            ) {
              setFetchingFromServer5(true);
              setOffset5(offset5 + 1);
              setLoadMore5(true);
              console.log('increased 5', offset5);
            } else if (
              id === '6' &&
              haveMore6 &&
              !(category6serverData.length === 0)
            ) {
              setFetchingFromServer6(true);
              setOffset6(offset6 + 1);
              setLoadMore6(true);
              console.log('increased 6', offset6);
            }
            //  loadMoreData()
          }}
          //On Click of button calling loadMoreData function to load more data
          style={categoriesStyling.loadMoreBtn}>
          {id === '1' ? (
            <View>
              <Text style={categoriesStyling.btnText}>
                {category1serverData.length === 0
                  ? store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                    ? 'No Saloons Found!'
                    : 'کوئی سیلون نہیں ملا'
                  : haveMore1
                  ? store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                    ? 'Load More'
                    : 'مزید لوڈ کریں'
                  : store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                  ? 'Results Ended'
                  : 'نتائج ختم ہوگئے'}
              </Text>
              {fetchingFromServer && !(category1serverData.length === 0) ? (
                <ActivityIndicator
                  color="white"
                  style={categoriesStyling.actIndicator}
                />
              ) : (
                console.log()
              )}
            </View>
          ) : id === '2' ? (
            <View>
              <Text style={categoriesStyling.btnText}>
                {category2serverData.length === 0
                  ? store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                    ? 'No Saloons Found!'
                    : 'کوئی سیلون نہیں ملا'
                  : haveMore2
                  ? store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                    ? 'Load More'
                    : 'مزید لوڈ کریں'
                  : store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                  ? 'Results Ended'
                  : 'نتائج ختم ہوگئے'}
              </Text>
              {fetchingFromServer2 && !(category2serverData.length === 0) ? (
                <ActivityIndicator
                  color="white"
                  style={categoriesStyling.actIndicator}
                />
              ) : (
                console.log()
              )}
            </View>
          ) : id === '3' ? (
            <View>
              <Text style={categoriesStyling.btnText}>
                {category3serverData.length === 0
                  ? store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                    ? 'No Saloons Found!'
                    : 'کوئی سیلون نہیں ملا'
                  : haveMore3
                  ? store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                    ? 'Load More'
                    : 'مزید لوڈ کریں'
                  : store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                  ? 'Results Ended'
                  : 'نتائج ختم ہوگئے'}
              </Text>
              {fetchingFromServer3 && !(category3serverData.length === 0) ? (
                <ActivityIndicator
                  color="white"
                  style={categoriesStyling.actIndicator}
                />
              ) : (
                console.log()
              )}
            </View>
          ) : id === '4' ? (
            <View>
              <Text style={categoriesStyling.btnText}>
                {category4serverData.length === 0
                  ? store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                    ? 'No Saloons Found!'
                    : 'کوئی سیلون نہیں ملا'
                  : haveMore4
                  ? store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                    ? 'Load More'
                    : 'مزید لوڈ کریں'
                  : store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                  ? 'Results Ended'
                  : 'نتائج ختم ہوگئے'}
              </Text>
              {fetchingFromServer4 && !(category4serverData.length === 0) ? (
                <ActivityIndicator
                  color="white"
                  style={categoriesStyling.actIndicator}
                />
              ) : (
                console.log()
              )}
            </View>
          ) : id === '5' ? (
            <View>
              <Text style={categoriesStyling.btnText}>
                {category5serverData.length === 0
                  ? store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                    ? 'No Saloons Found!'
                    : 'کوئی سیلون نہیں ملا'
                  : haveMore5
                  ? store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                    ? 'Load More'
                    : 'مزید لوڈ کریں'
                  : store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                  ? 'Results Ended'
                  : 'نتائج ختم ہوگئے'}
              </Text>
              {fetchingFromServer5 && !(category5serverData.length === 0) ? (
                <ActivityIndicator
                  color="white"
                  style={categoriesStyling.actIndicator}
                />
              ) : (
                console.log()
              )}
            </View>
          ) : id === '6' ? (
            <View>
              <Text style={categoriesStyling.btnText}>
                {category6serverData.length === 0 // if length is zero
                  ? store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                    ? 'No Saloons Found!'
                    : 'کوئی سیلون نہیں ملا'
                  : haveMore6 // else if no multiple of pagination found
                  ? store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                    ? 'Load More'
                    : 'مزید لوڈ کریں'
                  : store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                  ? 'Results Ended'
                  : 'نتائج ختم ہوگئے'}
              </Text>
              {fetchingFromServer6 && !(category6serverData.length === 0) ? (
                <ActivityIndicator
                  color="white"
                  style={categoriesStyling.actIndicator}
                />
              ) : (
                console.log()
              )}
            </View>
          ) : (
            console.log()
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={categoriesStyling.container}>
      {loading || loading2 || loading3 || loading4 || loading5 || loading6 ? (
        <View>
          <ActivityIndicator size="large" />
          <View style={categoriesStyling.gap} />
        </View>
      ) : (
        <ScrollView>
          <Text style={{color:"white",padding:15, fontSize:17}}>
            Showing categories of saloons near to the distance of <Text style={{color:"lightgreen"}}>50 km</Text>
          </Text>
          {Categories.map((Category, i) => (
            <ScrollView style={categoriesStyling.flatListContainer}>
              {store3.getState()[0].language === 'English' ? (
                <Text style={categoriesStyling.label}>
                  {Category.categoryName} - Near you
                </Text>
              ) : (
                <Text style={categoriesStyling.label2}>
                  {Category.categoryName2}
                </Text>
              )}
              <FlatList
                style={
                  i === 5
                    ? categoriesStyling.flatListStyle
                    : categoriesStyling.flatListStyle
                }
                horizontal={i === 5 ? true : true}
                keyExtractor={(item, index) => index.toString()}
                data={
                  i === 0
                    ? category1serverData
                    : i === 1
                    ? category2serverData
                    : i === 2
                    ? category3serverData
                    : i === 3
                    ? category4serverData
                    : i === 4
                    ? category5serverData
                    : category6serverData
                }
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigation.navigate('Profile', {
                        id: item._id,
                        name: item.saloonName,
                        app_id: 0,
                        screenNumber: 1,
                      })
                    }>
                    <View
                    //style={i===5?({paddingStart:Dimensions.get('window').width/12,}):(console.log())}
                    >
                      <View
                        style={
                          i === 5
                            ? categoriesStyling.item
                            : categoriesStyling.item
                        }>
                        <Image
                          source={{
                            uri: item.saloonBestImage,
                          }}
                          style={categoriesStyling.flatListImage}
                        />
                        <View style={categoriesStyling.fontView}>
                          {item.saloonGender === 'male' ? (
                            <Fontisto.Button
                              name={'male'}
                              size={25}
                              color={'#182920'}
                              style={categoriesStyling.GenderIcon}
                            />
                          ) : (
                            <Fontisto.Button
                              name={'female'}
                              size={25}
                              color={'#182920'}
                              style={categoriesStyling.GenderIcon}
                            />
                          )}
                        </View>
                        {item.saloonDiscount === 0 ? (
                          console.log()
                        ) : (
                          <View style={categoriesStyling.topCard}>
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English' ? (
                              <Text style={categoriesStyling.discount}>
                                Upto {item.saloonDiscount}% off
                              </Text>
                            ) : (
                              <Text style={categoriesStyling.discount}>
                                رعایت %{item.saloonDiscount} تک
                              </Text>
                            )}
                          </View>
                        )}
                      </View>

                      <View
                        style={
                          i === 5
                            ? categoriesStyling.salonInfoBack2
                            : categoriesStyling.salonInfoBack
                        }>
                        <View style={categoriesStyling.salonBackHeight}>
                          <View style={categoriesStyling.alignRowWise}>
                            <View style={categoriesStyling.alignColWise}>
                              <Text style={categoriesStyling.salonName}>
                                {item.saloonName}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={categoriesStyling.salonInfoFront}>
                          <View style={categoriesStyling.alignViewRowWise}>
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English' ? (
                              <Text style={categoriesStyling.salonPrice}>
                                Minimum Price: RS.{' '}
                                <Text style={categoriesStyling.salonPriceMin}>
                                  {item.saloonMinPrice}
                                </Text>
                              </Text>
                            ) : (
                              <Text style={categoriesStyling.salonPrice}>
                                کم سے کم قیمت RS.{' '}
                                <Text style={categoriesStyling.salonPriceMin}>
                                  {item.saloonMinPrice}
                                </Text>
                              </Text>
                            )}

                            <FontAwesome.Button
                              name={'dollar'}
                              size={17}
                              color={'yellow'}
                              style={categoriesStyling.backColor}
                            />
                          </View>

                          <View style={categoriesStyling.alignViewRowWise}>
                            {store3.getState().length === 0 ||
                            store3.getState()[0].language === 'English' ? (
                              <Text style={categoriesStyling.salonPrice}>
                                Rating:
                              </Text>
                            ) : (
                              <Text style={categoriesStyling.salonPrice}>
                                : درجہ بندی
                              </Text>
                            )}

                            <Rating
                              type="star"
                              //ratingImage={IMAGE}
                              startingValue={item.saloonOverallRating}
                              // ratingColor='yellow'
                              //  ratingBackgroundColor='black'
                              //tintColor='yellow'
                              reviewColor="green"
                              style={stylistsStyling.rating}
                              ratingCount={5}
                              readonly={true}
                              imageSize={Dimensions.get('screen').height / 44}
                            />
                          </View>

                          <Text style={categoriesStyling.salonServices}>
                            {item.saloonBestServices}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => (
                  <View style={categoriesStyling.separator} />
                )}
                ListFooterComponent={renderFooter(Category.c_id)}
                //Adding Load More button as footer component
              />
            </ScrollView>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

export default Categories1;
