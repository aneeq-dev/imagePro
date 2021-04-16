import React, {useState, useEffect, useRef} from 'react';
import {
  ActivityIndicator,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {View, Text} from 'react-native';
import axios from 'axios';
import apiKey from '../apiKey/apiKey';
import {
  categoriesStyling,
  styles,
  stylesMenuButton,
} from '../../styleSheeet/styles';
import not from '../../images/sideDrawerImage.jpg';

import SearchArea from './SearchArea';
import FastImage from 'react-native-fast-image';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {mainMapScreenStyling} from '../../styleSheeet/screenStyles';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {Image} from 'react-native';

import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

function SearchedResults(props) {
  const [active, setActive] = useState(
    props.route.params.screenNumber == 1 && props.route.params.to
      ? props.route.params.to == 'movie'
        ? 1
        : props.route.params.to == 'tv'
        ? 2
        : 3
      : 1,
  );
  const [ud2, setID] = useState(10);

  const [id, setID2] = useState(1);
  const [descActive, setDescActive] = useState(-1);

  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [loading4, setLoading4] = useState(true);
  const [loading5, setLoading5] = useState(true);
  const [loading6, setLoading6] = useState(true);

  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(props.route.params.query);
  const [haveMore1, setHaveMore1] = useState(false);
  const [haveMore2, setHaveMore2] = useState(false);
  const [haveMore3, setHaveMore3] = useState(false);
  const [haveMore4, setHaveMore4] = useState(false);
  const [haveMore5, setHaveMore5] = useState(false);
  const [haveMore6, setHaveMore6] = useState(false);
  const [fetchingFromServer, setFetchingFromServer] = useState(false);
  const [category1serverData, setCategory1ServerData] = useState([]);
  const [category1Count, setCategory1Count] = useState(0);

  const [category2serverData, setCategory2ServerData] = useState([]);
  const [category2Count, setCategory2Count] = useState(0);

  const [category3serverData, setCategory3ServerData] = useState([]);
  const [category3Count, setCategory3Count] = useState(0);

  const [category4serverData, setCategory4ServerData] = useState([]);
  const [category4Count, setCategory4Count] = useState(0);

  const [category5serverData, setCategory5ServerData] = useState([]);
  const [category5Count, setCategory5Count] = useState(0);

  const [category6serverData, setCategory6ServerData] = useState([]);
  const [category6Count, setCategory6Count] = useState(0);

  const [category7serverData, setCategory7ServerData] = useState([]);
  const [category7Count, setCategory7Count] = useState(0);

  const [loadMore, setLoadMore] = useState(true);
  const [offset, setOffset] = useState(1);
  const [offset2, setOffset2] = useState(1);
  const [offset3, setOffset3] = useState(1);
  const [offset4, setOffset4] = useState(1);
  const [offset5, setOffset5] = useState(1);
  const [offset6, setOffset6] = useState(1);
  const [offset7, setOffset7] = useState(1);
  const [okaytoShow, setOkayToShow] = useState(false);
  const [arraytoLoadAllUrls, setUrls] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const scrollRef = useRef();
  const [fontColor, setFontColor] = useState('black');

  console.log(
    'ssS: ',
    props.route.params.screenNumber,
    props.route.params.to,
    props.route.params.query,
  );
  useEffect(() => {
    if (props.route.params.screenNumber == 1) {
      load(true);
    } else {
      searchedItem();
    }
  }, [offset, query]);

  useEffect(() => {
    if (props.route.params.screenNumber == 1) {
      load2(true);
    }
  }, [offset2]);

  useEffect(() => {
    if (props.route.params.screenNumber == 1) {
      load3(true);
    }
  }, [offset3]);

  useEffect(() => {
    if (props.route.params.screenNumber == 1) {
      load6(true);
    }
  }, [offset6]);

  useEffect(() => {
    renderFooter(1);
  }, [active]);

  const searchedItem = async a => {
    let responseJson = null;

    if (props.route.params.mediatype == 'movie') {
      const {data: responseJson2} = await axios.get(
        'https://api.themoviedb.org/3/movie/' +
          props.route.params.id +
          '?api_key=' +
          apiKey,
      );
      responseJson = responseJson2;
    } else if (props.route.params.mediatype == 'tv') {
      const {data: responseJson2} = await axios.get(
        'https://api.themoviedb.org/3/tv/' +
          props.route.params.id +
          '?api_key=' +
          apiKey,
      );
      responseJson = responseJson2;
    }

    console.log('eee: ', responseJson);
    if (responseJson === 0) {
      // console.log("empty");
    } else {
      //  console.log("reed: ",responseJson.length);

      if (props.route.params.mediatype == 'movie') {
        //console.log(responseJson);
        setCategory1Count(1);
        setCategory1ServerData([...category1serverData, ...[responseJson]]);
      } else if (props.route.params.mediatype == 'tv') {
        //console.log(responseJson);
        setCategory2Count(1);
        setCategory2ServerData([...category2serverData, ...[responseJson]]);
      }
    }

    setLoading(false);
    setLoadMore(false);
    setFetchingFromServer(false);
    setLoading(false);
  };

  const load = async (a, j) => {
    if (loadMore || a) {
      let responseJson = null;
      const {data: responseJson2} = await axios.get(
        'https://api.themoviedb.org/3/search/movie?api_key=' +
          apiKey +
          '&page=' +
          offset +
          '&query=' +
          props.route.params.query,
      );

      responseJson = responseJson2;

      // console.log(responseJson);
      if (responseJson === 0) {
        // console.log("empty");
      } else {
        //  console.log('reed: ', responseJson);
        if (active == 1)
          if (responseJson.page < responseJson.total_pages) {
            setHaveMore1(true);
            console.log('yyeeesss');
          } else {
            setHaveMore1(false);
          }

        setCategory1ServerData([
          ...category1serverData,
          ...responseJson.results.slice(0 * 20, 1 * 20),
        ]);

        setCategory1Count(responseJson.total_results);
      }

      setLoading(false);
      setLoading1(false);
      setLoadMore(false);
      setFetchingFromServer(false);
    }
    setLoading(false);
  };

  const load2 = async a => {
    if (loadMore || a) {
      let responseJson = null;
      const {data: responseJson2} = await axios.get(
        'https://api.themoviedb.org/3/search/tv?api_key=' +
          apiKey +
          '&page=' +
          offset2 +
          '&query=' +
          props.route.params.query,
      );

      responseJson = responseJson2;

      //console.log(responseJson);
      if (responseJson === 0) {
        // console.log("empty");
      } else {
        //  console.log("reed: ",responseJson.length);
        if (active == 2)
          if (responseJson.page < responseJson.total_pages) {
            setHaveMore2(true);
            console.log('yyeeesss2');
          } else {
            setHaveMore2(false);
          }

        //console.log(responseJson);
        setCategory2ServerData([
          ...category2serverData,
          ...responseJson.results.slice(0 * 20, 1 * 20),
        ]);
        setCategory2Count(responseJson.total_results);
      }

      setLoading(false);
      setLoadMore(false);
      setLoading2(false);
      setFetchingFromServer(false);
    }
    setLoading(false);
  };

  const load3 = async a => {
    if (loadMore || a) {
      let responseJson = null;
      const {data: responseJson2} = await axios.get(
        'https://api.themoviedb.org/3/search/person?api_key=' +
          apiKey +
          '&page=' +
          offset3 +
          '&query=' +
          props.route.params.query,
      );

      responseJson = responseJson2;

      console.log('people: ', responseJson);
      if (responseJson === 0) {
        // console.log("empty");
      } else {
        //  console.log("reed: ",responseJson.length);
        if (active == 3)
          if (responseJson.page < responseJson.total_pages) {
            setHaveMore3(true);
            console.log('yyeeesss3');
          } else {
            setHaveMore3(false);
          }

        //console.log(responseJson);
        setCategory3ServerData([
          ...category3serverData,
          ...responseJson.results.slice(0 * 20, 1 * 20),
        ]);
        setCategory3Count(responseJson.total_results);
      }

      setLoading(false);
      setLoadMore(false);
      setLoading3(false);

      setFetchingFromServer(false);
    }
    setLoading(false);
  };

  const load6 = async a => {
    if (loadMore || a) {
      let responseJson = null;
      const {data: responseJson2} = await axios.get(
        'https://api.themoviedb.org/3/search/collection?api_key=' +
          apiKey +
          '&page=' +
          offset6 +
          '&query=' +
          query,
      );

      responseJson = responseJson2;

      //console.log(responseJson);
      if (responseJson === 0) {
        // console.log("empty");
      } else {
        //  console.log("reed: ",responseJson.length);

        if (active == 6)
          if (responseJson.page < responseJson.total_pages) {
            setHaveMore6(true);
            console.log('yyeeesss6');
          } else {
            setHaveMore6(false);
          }

        //console.log(responseJson);
        setCategory6ServerData([
          ...category6serverData,
          ...responseJson.results.slice(0 * 20, 1 * 20),
        ]);
        setCategory6Count(responseJson.total_results);
      }

      setLoading(false);
      setLoadMore(false);
      setLoading6(false);

      setFetchingFromServer(false);
    }
    setLoading(false);
  };

  const getConcatStringKnownFor = desc => {
    // console.log(desc);
    var tot = '';
    desc.forEach(element => {
      if (element.original_title) {
        tot = tot.concat(element.original_title);
        tot = tot.concat(', ');
      } else {
        tot = tot.concat(element.name);
        tot = tot.concat(', ');
      }
    });

    tot = tot.slice(0, tot.length - 2);

    return tot;
  };

  const updateDestinationInuptState = destination => {
    //this.setState({ destination });
    // this.onChangeDestinationDebounced(destination);
  };

  // iterate();

  const renderFooter = id => {
    return (
      //Footer View with Load More button

      <View
        style={{
          margin: 5,
          marginBottom:
            active == 1
              ? category1serverData.length == 0
                ? Dimensions.get('screen').height / 1
                : Dimensions.get('screen').height / 2.5
              : active == 2
              ? category2serverData.length == 0
                ? Dimensions.get('screen').height / 1
                : Dimensions.get('screen').height / 2.5
              : active == 3
              ? category3serverData.length == 0
                ? Dimensions.get('screen').height / 1
                : Dimensions.get('screen').height / 2.5
              : active == 4
              ? category6serverData.length == 0
                ? Dimensions.get('screen').height / 1
                : Dimensions.get('screen').height / 2.5
              : null,
        }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['skyblue', '#001445']}
          style={{borderRadius: 5}}>
          <TouchableOpacity
            style={categoriesStyling.loadMoreBtn}
            onPress={() => {
              if (
                (haveMore1 && !(category1serverData.length === 0)) ||
                !(category2serverData.length === 0) ||
                !(category3serverData.length === 0) ||
                !(category4serverData.length === 0) ||
                !(category5serverData.length === 0) ||
                !(category6serverData.length === 0) ||
                !(category7serverData.length === 0)
              ) {
                setFetchingFromServer(true);
                if (active == 1) {
                  setOffset(offset + 1);
                } else if (active == 2) {
                  setOffset2(offset2 + 1);
                } else if (active == 3) {
                  setOffset3(offset3 + 1);
                } else if (active == 4) {
                  setOffset6(offset6 + 1);
                }

                setLoadMore(true);
              }
            }}>
            <View>
              {active == 1 ? (
                <Text style={{color: 'white'}}>
                  {category1serverData.length == 0
                    ? 'Not Found!'
                    : haveMore1
                    ? 'Load More'
                    : 'Results End'}
                </Text>
              ) : null}

              {active == 2 ? (
                <Text style={{color: 'white'}}>
                  {category2serverData.length == 0
                    ? 'Not Found!'
                    : haveMore2
                    ? 'Load More'
                    : 'Results End'}
                </Text>
              ) : null}

              {active == 3 ? (
                <Text style={{color: 'white'}}>
                  {category3serverData.length == 0
                    ? 'Not Found!'
                    : haveMore3
                    ? 'Load More'
                    : 'Results End'}
                </Text>
              ) : null}

              {active == 4 ? (
                <Text style={{color: 'white'}}>
                  {category6serverData.length == 0
                    ? 'Not Found!'
                    : haveMore6
                    ? 'Load More'
                    : 'Results End'}
                </Text>
              ) : null}
              {fetchingFromServer &&
              !(
                (active == 1
                  ? category1serverData
                  : active == 2
                  ? category2serverData
                  : active == 3
                  ? category3serverData
                  : active == 4
                  ? category6serverData
                  : []
                ).length === 0
              ) ? (
                <ActivityIndicator color={fontColor} />
              ) : null}
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  };

  const onSwipeLeft = gestureState => {
    if (active < 5) {
      setActive(active + 1);
      console.log('You swiped left!', active);
      handleClick2(active, 2);
    }
  };
  const onSwipeRight = gestureState => {
    if (active > 1) {
      setActive(active - 1);
      console.log('You swiped ri!', active);
      handleClick2(active, 1);
    }
  };

  const handleClick2 = (number, i) => {
    console.log('s: ', number);
    if (scrollRef)
      if (number == 1) {
        scrollRef.current.scrollTo({
          x: 0,
          y: 0,
          animated: true,
        });
      } else if (number == 2 && i == 2) {
        scrollRef.current.scrollTo({
          x: 500,
          y: 0,
          animated: true,
        });
      } else if (number == 3 && i == 1) {
        scrollRef.current.scrollTo({
          x: -500,
          y: 0,
          animated: true,
        });
      }
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <View>
      <SearchArea
        updateDestCB={updateDestinationInuptState}
        disable={loading}
        navigation={props.navigation}
        search={isSearch}
      />

      <View style={stylesMenuButton.menuPos}>
        <FontAwesome5.Button
          name={'bars'}
          size={20}
          color={isSearch ? 'white' : 'black'}
          style={
            isSearch
              ? mainMapScreenStyling.barsicon2
              : mainMapScreenStyling.barsicon
          }
          backgroundColor={isSearch ? '#002a52' : 'white'}
          onPress={() => props.navigation.toggleDrawer()}
        />
      </View>

      {!isSearch ? (
        <View style={stylesMenuButton.searchPos3}>
          <Entypo.Button
            name={'user'}
            size={20}
            color={'#0234a6'}
            style={mainMapScreenStyling.barsicon}
            backgroundColor={'white'}
            onPress={() =>
              props.navigation.navigate('Setting', {
                screenNumber: 1,
              })
            }
          />
        </View>
      ) : null}

      {isSearch ? (
        <View style={stylesMenuButton.searchPos2}>
          <FontAwesome5.Button
            name={'long-arrow-alt-right'}
            size={20}
            color={'white'}
            style={mainMapScreenStyling.barsicon2}
            backgroundColor={'#002a52'}
            onPress={() => setIsSearch(!isSearch)}
          />
        </View>
      ) : (
        <View style={stylesMenuButton.searchPos}>
          <FontAwesome5.Button
            name={'search'}
            size={20}
            color={'#0234a6'}
            style={mainMapScreenStyling.barsicon}
            backgroundColor={'white'}
            onPress={() => setIsSearch(!isSearch)}
          />
        </View>
      )}

      <View style={{marginTop: Dimensions.get('screen').height / 8.2}} />

      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#01083d', 'skyblue']}>
        <ScrollView horizontal ref={scrollRef}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderRadius: 20,
                borderStyle: active == 1 ? 'solid' : null,
                borderColor: active == 1 ? 'white' : 'rgba(0,0,0,0)',
                borderWidth: 1,
                margin: 1,
              }}
              onPress={() => {
                setActive(1);
              }}>
              <Text
                style={{
                  marginRight: 10,
                  fontSize: 16,
                  fontFamily: 'ElmessiriSemibold-2O74K',
                  color: 'white',
                  //color: active == 1 ? '#00bf93' : 'white',
                }}>
                Movies
              </Text>

              {loading1 ? (
                <View
                  style={{
                    // color: active == 1 ? '#00bf93' : 'black',
                    // fontWeight: active == 1 ? 'bold' : 'normal',
                    backgroundColor: 'white',
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                    borderRadius: 10,
                  }}>
                  <ActivityIndicator color={'green'} size={15} />
                </View>
              ) : (
                <Text
                  style={{
                    // color: active == 1 ? '#00bf93' : 'black',
                    // fontWeight: active == 1 ? 'bold' : 'normal',
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderRadius: 10,
                  }}>
                  {category1Count}
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderRadius: 20,
                borderStyle: active == 2 ? 'solid' : null,
                borderColor: active == 2 ? 'white' : 'rgba(0,0,0,0)',
                borderWidth: 1,
                margin: 1,
              }}
              onPress={() => {
                setActive(2);
              }}>
              <Text
                style={{
                  marginRight: 10,
                  fontSize: 16,
                  fontFamily: 'ElmessiriSemibold-2O74K',
                  color: 'white',
                  // color: active == 2 ? 'yellow' : 'white',
                }}>
                TV Shows
              </Text>
              {loading2 ? (
                <View
                  style={{
                    // color: active == 1 ? '#00bf93' : 'black',
                    // fontWeight: active == 1 ? 'bold' : 'normal',
                    backgroundColor: 'white',
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                    borderRadius: 10,
                  }}>
                  <ActivityIndicator color={'green'} size={15} />
                </View>
              ) : (
                <Text
                  style={{
                    // color: active == 1 ? '#00bf93' : 'black',
                    // fontWeight: active == 1 ? 'bold' : 'normal',
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderRadius: 10,
                  }}>
                  {category2Count}
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderRadius: 20,
                borderStyle: active == 3 ? 'solid' : null,
                borderColor: active == 3 ? 'white' : 'rgba(0,0,0,0)',
                borderWidth: 1,
                margin: 1,
              }}
              onPress={() => {
                setActive(3);
              }}>
              <Text
                style={{
                  marginRight: 10,
                  fontSize: 16,
                  fontFamily: 'ElmessiriSemibold-2O74K',
                  color: 'white',
                  // color: active == 2 ? 'yellow' : 'white',
                }}>
                People
              </Text>
              {loading3 ? (
                <View
                  style={{
                    // color: active == 1 ? '#00bf93' : 'black',
                    // fontWeight: active == 1 ? 'bold' : 'normal',
                    backgroundColor: 'white',
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                    borderRadius: 10,
                  }}>
                  <ActivityIndicator color={'green'} size={15} />
                </View>
              ) : (
                <Text
                  style={{
                    // color: active == 1 ? '#00bf93' : 'black',
                    // fontWeight: active == 1 ? 'bold' : 'normal',
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderRadius: 10,
                  }}>
                  {category3Count}
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderRadius: 20,
                borderStyle: active == 4 ? 'solid' : null,
                borderColor: active == 4 ? 'white' : 'rgba(0,0,0,0)',
                borderWidth: 1,
                margin: 1,
              }}
              onPress={() => {
                setActive(4);
              }}>
              <Text
                style={{
                  marginRight: 10,
                  fontSize: 16,
                  fontFamily: 'ElmessiriSemibold-2O74K',
                  color: 'white',
                  // color: active == 2 ? 'yellow' : 'white',
                }}>
                Collections
              </Text>
              {loading6 ? (
                <View
                  style={{
                    // color: active == 1 ? '#00bf93' : 'black',
                    // fontWeight: active == 1 ? 'bold' : 'normal',
                    backgroundColor: 'white',
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                    borderRadius: 10,
                  }}>
                  <ActivityIndicator color={'green'} size={15} />
                </View>
              ) : (
                <Text
                  style={{
                    // color: active == 1 ? '#00bf93' : 'black',
                    // fontWeight: active == 1 ? 'bold' : 'normal',
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                    borderRadius: 10,
                  }}>
                  {category6Count}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>

      <GestureRecognizer
        onSwipeLeft={state => onSwipeLeft(state)}
        onSwipeRight={state => onSwipeRight(state)}
        config={config}>
        <FlatList
          style={{backgroundColor: 'rgba(0,0,0,0.1)'}}
          //horizontal={i === 5 ? true : true}
          keyExtractor={(item, index) => index.toString()}
          // numColumns={2}
          // scrollToIndex={index}
          data={
            active == 1
              ? category1serverData
              : active == 2
              ? category2serverData
              : active == 3
              ? category3serverData
              : category6serverData
          }
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (active == 1) {
                  props.navigation.navigate('MovieInfo', {
                    id: item.id,
                  });
                } else if (active == 2) {
                  props.navigation.navigate('TvInfo', {
                    id: item.id,
                  });
                }
              }}
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginHorizontal: 5,
                height: Dimensions.get('screen').height / 3.4,
              }}>
              {item.poster_path ? (
                <FastImage
                  source={{
                    uri:
                      'https://image.tmdb.org/t/p/original' + item.poster_path,
                  }}
                  style={{
                    backgroundColor: 'skyblue',
                    height: Dimensions.get('screen').height / 3.4,
                    width: '36%',
                    borderTopLeftRadius: 50,
                    borderBottomLeftRadius: 0,
                  }}
                />
              ) : item.backdrop_path ? (
                <FastImage
                  source={{
                    uri:
                      'https://image.tmdb.org/t/p/original' +
                      item.backdrop_path,
                  }}
                  style={{
                    backgroundColor: 'skyblue',
                    height: Dimensions.get('screen').height / 3.4,
                    width: '36%',
                    borderTopLeftRadius: 50,
                    borderBottomLeftRadius: 0,
                  }}
                />
              ) : item.profile_path ? (
                <FastImage
                  source={{
                    uri:
                      'https://image.tmdb.org/t/p/original' + item.profile_path,
                  }}
                  style={{
                    backgroundColor: 'skyblue',
                    height: Dimensions.get('screen').height / 3.4,
                    width: '36%',
                    borderTopLeftRadius: 50,
                    borderBottomLeftRadius: 0,
                  }}
                />
              ) : (
                <FastImage
                  source={not}
                  style={{
                    backgroundColor: 'skyblue',
                    height: Dimensions.get('screen').height / 3.4,
                    width: '36%',
                    borderTopLeftRadius: 50,
                    borderBottomLeftRadius: 0,
                  }}
                />
              )}

              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['white', 'skyblue']}
                style={{
                  width: '64%',

                  backgroundColor: 'blue',
                  // borderBottomRightRadius: 50,
                  borderTopRightRadius: 0,
                }}>
                <ScrollView>
                  <View style={{paddingBottom: 10}}>
                    <Text
                      style={{
                        marginRight: 10,
                        fontSize: 17,
                        fontFamily: 'ElmessiriSemibold-2O74K',
                        color: 'black',
                        paddingLeft: 10,
                        paddingTop: 6,
                      }}>
                      {item.original_title
                        ? item.original_title
                        : item.original_name
                        ? item.original_name
                        : item.name}
                    </Text>

                    <View style={categoriesStyling.separator2} />
                    <Text
                      style={{
                        // marginRight: 10,
                        fontSize: 13,
                        fontFamily: 'ElmessiriSemibold-2O74K',
                        color: 'grey',
                        paddingLeft: 10,
                        //paddingTop: 6,
                      }}>
                      {item.release_date
                        ? item.release_date
                        : item.first_air_date
                        ? item.first_air_date
                        : active == 3
                        ? 'Known for ' + item.known_for_department
                        : ''}
                    </Text>

                    {active == 3 ? (
                      <View>
                        <Text
                          style={{
                            marginTop: 5,
                            fontSize: 14,
                            fontFamily: 'ElmessiriSemibold-2O74K',
                            color: 'black',
                            paddingLeft: 10,
                          }}>
                          Best Movies &amp; TvShows:
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: 'ElmessiriSemibold-2O74K',
                            color: 'brown',
                            paddingLeft: 10,
                          }}>
                          {getConcatStringKnownFor(item.known_for)}
                        </Text>
                      </View>
                    ) : null}

                    {item.overview ? (
                      <View
                        style={{
                          paddingHorizontal: 10,
                          paddingTop: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: 'ElmessiriSemibold-2O74K',
                            color: 'black',
                          }}>
                          Overview
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: 'ElmessiriSemibold-2O74K',
                            color: '#303030',
                          }}>
                          {descActive == index
                            ? item.overview
                            : item.overview.slice(0, 100) + '... '}
                        </Text>
                        {descActive == index ? null : (
                          <View>
                            <TouchableOpacity onPress={() => setDescActive(i)}>
                              <Text
                                style={{
                                  marginBottom: -4,
                                  fontSize: 12,
                                  left: '70%',
                                  color: 'grey',
                                }}>
                                Read More
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    ) : null}
                  </View>
                </ScrollView>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['white', 'brown']}
                  style={{
                    //backgroundColor: 'blue',
                    // borderBottomRightRadius: 50,
                    borderBottomLeftRadius: 1,
                    borderTopLeftRadius: 1,
                  }}>
                  <View
                    style={{
                      // backgroundColor: 'yellow',
                      top: 0,
                    }}>
                    <Text style={{height: '2%'}} />
                  </View>
                </LinearGradient>
              </LinearGradient>
            </TouchableOpacity>
          )}
          ListFooterComponent={renderFooter()}
        />
      </GestureRecognizer>
    </View>
  );
}

export default SearchedResults;
