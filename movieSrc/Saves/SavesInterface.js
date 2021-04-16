import React, {useState, useEffect, createRef} from 'react';

import {
  Dimensions,
  Image,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {categoriesStyling, movieListStyle} from '../../styleSheeet/styles';
import apiKey from '../apiKey/apiKey';
import axios from 'axios';
import ActionSheet from 'react-native-actions-sheet';
import MainScreen from '../MainScreen/MainScreen';
import * as Progress from 'react-native-progress';

const actionSheetRef = createRef();

function SavesInterface(props) {
  const [menuList, setMenuList] = useState([]);
  const [menuListb, setMenuListb] = useState([]);
  const [menuListc, setMenuListc] = useState([]);
  const [menuList2, setMenuList2] = useState([]);
  const [menuList2b, setMenuList2b] = useState([]);
  const [menuList2c, setMenuList2c] = useState([]);
  const [menuList3, setMenuList3] = useState([]);
  const [menuList4, setMenuList4] = useState([]);
  const [index, setIndex] = useState(0);
  const [topTvShows, settopTvShows] = useState([]);
  const [latestTvShows, setlatestTvShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isEnabled, setIsEnabled] = useState(true);
  //
  const [i, setI] = useState(1);
  const [i2, setI2] = useState(1);

  const [loadMore, setLoadMore] = useState(true);
  const [offset, setOffset] = useState(1);
  const [haveMore1, setHaveMore1] = useState(false);
  const [loading1, setLoading1] = useState(true);
  const [fetchingFromServer, setFetchingFromServer] = useState(false);

  const [loadMore2, setLoadMore2] = useState(true);
  const [offset2, setOffset2] = useState(1);
  const [haveMore2, setHaveMore2] = useState(false);
  const [loading2, setLoading2] = useState(true);
  const [fetchingFromServer2, setFetchingFromServer2] = useState(false);

  const [loadMore3, setLoadMore3] = useState(true);
  const [offset3, setOffset3] = useState(1);
  const [haveMore3, setHaveMore3] = useState(false);
  const [loading3, setLoading3] = useState(true);
  const [fetchingFromServer3, setFetchingFromServer3] = useState(false);

  let actionSheet;

  useEffect(() => {
    //console.log('rps: ', props.screenNumber);
    setMenuList([]);
    setMenuListb([]);
    setMenuListc([]);
    setMenuList2([]);
    setMenuList2b([]);
    setMenuList2c([]);
    if (props.screenNumber == 1) {
      if (props.enable == 1) {
        myMoviesNotWatched();
      } else if (props.enable == 2) {
        myMoviesWatched();
      } else if (props.enable == 3) {
        myMoviesMore();
      }
    } else if (props.screenNumber == 2) {
      if (props.enable == 1) {
        myTvShowsNotWatched();
      } else if (props.enable == 2) {
        myTvShowsWatched();
      } else if (props.enable == 3) {
        myTvShowsElse();
      }
    } else if (props.screenNumber == 3) {
      myPerson();
    }
  }, [offset, offset2, offset3, props.enable]);

  const myMoviesNotWatched = async () => {
    setLoading(true);
    try {
      const value = await AsyncStorage.getItem('loginkeysasa');
      const {data: responseJson} = await axios.get(
        'https://evening-refuge-96382.herokuapp.com/api/movies/getSavedNotWatchedMovies' +
          '?pageNumber=' +
          offset,
        {
          headers: {
            'x-auth-token': value,
          },
        },
      );
      console.log('people: ', responseJson);

      if (responseJson.length == 21) {
        setHaveMore1(true);
      } else {
        setHaveMore1(false);
      }
      setMenuList([...menuList, ...responseJson.slice(0 * 20, 1 * 20)]);
      setFetchingFromServer(false);
    } catch (ex) {
      console.error(ex);
    }

    setLoading(false);
  };

  const myMoviesWatched = async () => {
    setLoading(true);

    try {
      const value = await AsyncStorage.getItem('loginkeysasa');
      const {data: responseJson} = await axios.get(
        'https://evening-refuge-96382.herokuapp.com/api/movies/getSavedWatchedMovies' +
          '?pageNumber=' +
          offset,
        {
          headers: {
            'x-auth-token': value,
          },
        },
      );
      console.log('people: ', responseJson);

      if (responseJson.length == 21) {
        setHaveMore1(true);
      } else {
        setHaveMore1(false);
      }
      setMenuListb([...menuListb, ...responseJson.slice(0 * 20, 1 * 20)]);
      setFetchingFromServer(false);
    } catch (ex) {
      console.error(ex);
    }

    setLoading(false);
  };

  const myMoviesMore = async () => {
    setLoading(true);

    try {
      const value = await AsyncStorage.getItem('loginkeysasa');
      const {data: responseJson} = await axios.get(
        'https://evening-refuge-96382.herokuapp.com/api/movies/getSavedMoreMovies' +
          '?pageNumber=' +
          offset,
        {
          headers: {
            'x-auth-token': value,
          },
        },
      );
      console.log('people: ', responseJson);

      if (responseJson.length == 21) {
        setHaveMore1(true);
      } else {
        setHaveMore1(false);
      }
      setMenuListc([...menuListc, ...responseJson.slice(0 * 20, 1 * 20)]);
      setFetchingFromServer(false);
    } catch (ex) {
      console.error(ex);
    }

    setLoading(false);
  };

  const myTvShowsNotWatched = async () => {
    setLoading(true);

    try {
      const value = await AsyncStorage.getItem('loginkeysasa');
      const {data: responseJson} = await axios.get(
        'https://evening-refuge-96382.herokuapp.com/api/movies/getSavedNotWatchedTvShows' +
          '?pageNumber=' +
          offset2,
        {
          headers: {
            'x-auth-token': value,
          },
        },
      );
      console.log('people: ', responseJson);

      if (responseJson.length == 21) {
        setHaveMore2(true);
      } else {
        setHaveMore2(false);
      }
      setMenuList2([...menuList2, ...responseJson.slice(0 * 20, 1 * 20)]);
      setFetchingFromServer2(false);
      //setMenuList(responseJson.results);
    } catch (ex) {
      console.error(ex);
    }

    setLoading(false);
  };

  const myTvShowsWatched = async () => {
    setLoading(true);

    try {
      const value = await AsyncStorage.getItem('loginkeysasa');
      const {data: responseJson} = await axios.get(
        'https://evening-refuge-96382.herokuapp.com/api/movies/getSavedWatchedTvShows' +
          '?pageNumber=' +
          offset2,
        {
          headers: {
            'x-auth-token': value,
          },
        },
      );
      console.log('people: ', responseJson);

      if (responseJson.length == 21) {
        setHaveMore2(true);
      } else {
        setHaveMore2(false);
      }
      setMenuList2b([...menuList2b, ...responseJson.slice(0 * 20, 1 * 20)]);
      setFetchingFromServer2(false);
      //setMenuList(responseJson.results);
    } catch (ex) {
      console.error(ex);
    }

    setLoading(false);
  };

  const myTvShowsElse = async () => {
    setLoading(true);

    try {
      const value = await AsyncStorage.getItem('loginkeysasa');
      const {data: responseJson} = await axios.get(
        'https://evening-refuge-96382.herokuapp.com/api/movies/getSavedMoreTvShows' +
          '?pageNumber=' +
          offset2,
        {
          headers: {
            'x-auth-token': value,
          },
        },
      );
      console.log('people: ', responseJson);

      if (responseJson.length == 21) {
        setHaveMore2(true);
      } else {
        setHaveMore2(false);
      }
      setMenuList2c([...menuList2c, ...responseJson.slice(0 * 20, 1 * 20)]);
      setFetchingFromServer2(false);
      //setMenuList(responseJson.results);
    } catch (ex) {
      console.error(ex);
    }

    setLoading(false);
  };

  const myPerson = async () => {
    try {
      const value = await AsyncStorage.getItem('loginkeysasa');
      const {data: responseJson} = await axios.get(
        'https://evening-refuge-96382.herokuapp.com/api/movies/getSavedPersons' +
          '?pageNumber=' +
          offset3,
        {
          headers: {
            'x-auth-token': value,
          },
        },
      );
      console.log('people: ', responseJson);

      if (responseJson.length == 21) {
        setHaveMore3(true);
      } else {
        setHaveMore3(false);
      }
      setMenuList3([...menuList3, ...responseJson.slice(0 * 20, 1 * 20)]);
      setFetchingFromServer3(false);
      //setMenuList(responseJson.results);
    } catch (ex) {
      console.error(ex);
    }

    setLoading(false);
  };

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View
        style={{
          margin: 2,
          marginTop: offset == 1 || offset == 2 ? 10 : 55,
          alignItems: 'center',
          // backgroundColor: 'yellow',
          zIndex: 2,
          marginBottom: 310,
        }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['skyblue', '#001445']}
          style={{
            borderRadius: 5,
            width: Dimensions.get('screen').width / 1.02,
          }}>
          <TouchableOpacity
            style={categoriesStyling.loadMoreBtn}
            onPress={() => {
              if (
                props.screenNumber == 1 &&
                haveMore1 &&
                !(menuList.length === 0)
              ) {
                setFetchingFromServer(true);

                setOffset(offset + 1);

                setLoadMore(true);
              } else if (
                props.screenNumber == 2 &&
                haveMore2 &&
                !(menuList2.length === 0)
              ) {
                setFetchingFromServer2(true);

                setOffset2(offset2 + 1);

                setLoadMore2(true);
              } else if (
                props.screenNumber == 3 &&
                haveMore3 &&
                !(menuList3.length === 0)
              ) {
                setFetchingFromServer3(true);

                setOffset3(offset3 + 1);

                setLoadMore3(true);
              }
            }}>
            <View>
              {
                <Text style={{color: 'white'}}>
                  {props.screenNumber == 1
                    ? menuList.length == 0
                      ? 'Not Found!'
                      : haveMore1
                      ? 'Load More'
                      : 'Results End'
                    : props.screenNumber == 2
                    ? menuList2.length == 0
                      ? 'Not Found!'
                      : haveMore2
                      ? 'Load More'
                      : 'Results End'
                    : menuList3.length == 0
                    ? 'Not Found!'
                    : haveMore3
                    ? 'Load More'
                    : 'Results End'}
                </Text>
              }

              {props.screenNumber == 1 ? (
                fetchingFromServer && !(menuList.length === 0) ? (
                  <ActivityIndicator color={'skyblue'} />
                ) : null
              ) : props.screenNumber == 2 ? (
                fetchingFromServer2 && !(menuList2.length === 0) ? (
                  <ActivityIndicator color={'skyblue'} />
                ) : null
              ) : fetchingFromServer3 && !(menuList3.length === 0) ? (
                <ActivityIndicator color={'skyblue'} />
              ) : null}
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator size={'large'} color={'skyblue'} />
      ) : (
        <FlatList
          style={{backgroundColor: '#00468c'}}
          // horizontal={i === 5 ? true : true}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          // scrollToIndex={index}
          data={
            props.screenNumber == 1
              ? props.enable == 1
                ? menuList
                : props.enable == 2
                ? menuListb
                : menuListc
              : props.screenNumber == 2
              ? props.enable == 1
                ? menuList2
                : props.enable == 2
                ? menuList2b
                : menuList2c
              : menuList3
          }
          renderItem={({item, index}) => (
            <View
              key={index}
              style={{
                height: Dimensions.get('screen').height / 1.9,
                maxWidth: Dimensions.get('screen').width / 2,
                marginRight: index == menuList.length - 1 ? 9 : 0,
                textAlign: 'center',
              }}>
              <View
                style={{
                  //  borderRadius: 10,
                  padding: 11,
                  height: Dimensions.get('screen').height / 1.9,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                }}
                onPress={() => {
                  if (item.type == 'movie') {
                    // console.log('iii: ', item.id);
                    props.navigation.navigate('MovieInfo', {
                      id: item.id,
                    });
                  } else if (item.type == 'tvshow') {
                    // console.log('iii: ', item.id);
                    props.navigation.navigate('TvInfo', {
                      id: item.id,
                    });
                  }
                }}>
                <TouchableOpacity
                  onPress={() => {
                    actionSheetRef.current?.setModalVisible();
                  }}
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    zIndex: 1,
                    borderRadius: 50,

                    width: 20,
                    height: 50,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'rgba(255,255,255,1)',
                      textAlign: 'center',
                      fontSize: 10,
                      borderRadius: 50,
                      backgroundColor: 'rgba(255,255,255,0.7)',
                      width: 5,
                      height: 5,
                      margin: 3,
                      // marginTop: 5,
                      // textAlignVertical: 'center',
                    }}>
                    .
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(255,255,255,0.5)',
                      textAlign: 'center',
                      fontSize: 10,
                      borderRadius: 50,
                      backgroundColor: 'rgba(255,255,255,0.5)',
                      width: 5,
                      height: 5,
                      margin: 3,

                      // marginTop: 5,
                      // textAlignVertical: 'center',
                    }}>
                    .
                  </Text>
                  <Text
                    style={{
                      color: 'rgba(255,255,255,0.5)',
                      textAlign: 'center',
                      fontSize: 10,
                      borderRadius: 50,
                      backgroundColor: 'rgba(255,255,255,0.3)',
                      width: 5,
                      height: 5,
                      margin: 3,

                      // marginTop: 5,
                      // textAlignVertical: 'center',
                    }}>
                    .
                  </Text>
                </TouchableOpacity>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  <Image
                    style={{
                      backgroundColor: 'black',
                      height: Dimensions.get('screen').height / 2.8,
                      width: Dimensions.get('screen').width / 2.25,
                      borderRadius: 10,
                    }}
                    source={{
                      uri: 'https://image.tmdb.org/t/p/original' + item.image,
                    }}
                  />
                </View>

                <View
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    //  fontFamily: "font8",
                    marginTop: Dimensions.get('screen').height / 40,
                  }}>
                  <Text style={movieListStyle.text2}>
                    {item.headline ? item.headline : ''}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    borderRadius: 20,
                    //width: Dimensions.get('screen').width / ,
                    paddingVertical: 6,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    if (item.type == 'movie') {
                      console.log('iii: ', item.id);
                      props.navigation.navigate('MovieInfo', {
                        id: item.id,
                      });
                    } else if (item.type == 'tvshow') {
                      // console.log('iii: ', item.id);
                      props.navigation.navigate('TvInfo', {
                        id: item.id,
                      });
                    }
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: responsiveFontSize(1.7),
                      color: 'rgba(255,255,255,0.5)',
                    }}>
                    Checkout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListFooterComponent={renderFooter()}
          //Adding Load More button as footer component
        />
      )}

      <ActionSheet ref={actionSheetRef}>
        <View
          style={{
            height: Dimensions.get('screen').height / 4.5,
            backgroundColor: '#005363',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
          <Text
            style={{
              marginTop: 20,
              textAlign: 'center',
              fontSize: 16,
              fontFamily: 'ElmessiriSemibold-2O74K',
              color: 'white',
            }}>
            Options
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: '#610000',
              marginHorizontal: 20,
              borderRadius: 10,
              padding: 15,
              marginTop: 15,
            }}>
            <Text
              style={{
                //marginTop: 20,
                textAlign: 'center',
                fontSize: 16,
                fontFamily: 'ElmessiriSemibold-2O74K',
                color: 'white',
              }}>
              Remove this Save
            </Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>
    </View>
  );
}
//006f85

export default SavesInterface;
