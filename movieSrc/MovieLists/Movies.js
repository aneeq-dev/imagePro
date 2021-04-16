import axios from 'axios';
import React, {useEffect, useState, useRef} from 'react';
import {
  Dimensions,
  Image,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Switch,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {movieListStyle} from '../../styleSheeet/styles';
import apiKey from '../apiKey/apiKey';
import MainScreen from '../MainScreen/MainScreen';
import * as Progress from 'react-native-progress';
import * as Animatable from 'react-native-animatable';

function Movies(props) {
  const [menuList, setMenuList] = useState([]);
  const [menuList2, setMenuList2] = useState([]);
  const [menuList3, setMenuList3] = useState([]);
  const [popTvShows, setPopTvShows] = useState([]);
  const [topTvShows, settopTvShows] = useState([]);
  const [latestTvShows, setlatestTvShows] = useState([]);
  const [latestMovies, setlatestMovies] = useState([]);
  const [loading, setloading] = useState(true);

  const [isEnabled, setIsEnabled] = useState(true);
  //
  const [i, setI] = useState(1);
  const [i2, setI2] = useState(1);
  const AnimationRef = useRef(null);

  useEffect(() => {
    //console.log('rps: ', props.screenNumber);
    if (props.screenNumber == 1) {
      whatsPopular();
    } else if (props.screenNumber == 2) {
      getTrending();
    } else if (props.screenNumber == 4) {
      topRated();
    } else if (props.screenNumber == 5) {
      getlatestMovies();
    }
  }, []);

  /// Now Playing

  useEffect(() => {
    //console.log('mkmkmk', i);
    let menuList =
      props.screenNumber == 1
        ? menuList
        : props.screenNumber == 2
        ? menuList2
        : props.screenNumber == 4
        ? menuList3
        : menuList3;
    if (menuList && menuList.length > 0) {
      if (menuList[i].poster_path) {
        MainScreen.updateBack(
          'https://image.tmdb.org/t/p/original' + menuList[i].poster_path,
        );
      }
      setTimeout(() => {
        if (i == menuList.length - 1) {
          setI(0);
        } else {
          setI(i + 1);
        }
      }, 10000);
    }
  }, [i]);

  const getTrending = async () => {
    //console.log("bhjbh",saloon_id);
    setloading(true);
    if (menuList2.length == 0) {
      try {
        const {data: responseJson} = await axios.get(
          'https://api.themoviedb.org/3/trending/all/day?api_key=' + apiKey,
        );
        setMenuList2(responseJson.results);
        // console.log('eee:', responseJson.results);
        MainScreen.updateBack2(
          'https://image.tmdb.org/t/p/original' +
            responseJson.results[0].poster_path,
        );
        setTimeout(() => {
          setI2(2);
        }, 10000);
      } catch (ex) {
        console.error(ex);
      }
    }
    setloading(false);

    // setLoading(false);
  };

  const topRated = async () => {
    setloading(true);

    if (menuList3.length == 0) {
      try {
        const {data: responseJson2} = await axios.get(
          'https://api.themoviedb.org/3/movie/top_rated?api_key=' +
            apiKey +
            //   "&include_video=true" +
            '&page=' +
            1,
        );
        setMenuList3(responseJson2.results);
      } catch (ex) {
        console.error(ex);
      }
    }
    setloading(false);
  };

  const topRatedTvShows = async () => {
    setloading(true);

    if (topTvShows.length == 0) {
      try {
        const {data: responseJson2} = await axios.get(
          'https://api.themoviedb.org/3/tv/top_rated?api_key=' +
            apiKey +
            //   "&include_video=true" +
            '&page=' +
            1,
        );
        settopTvShows(responseJson2.results);
      } catch (ex) {
        console.error(ex);
      }
    }
    setloading(false);
  };

  const whatsPopular = async () => {
    setloading(true);

    if (menuList.length == 0) {
      try {
        const {data: responseJson} = await axios.get(
          'https://api.themoviedb.org/3/movie/popular?api_key=' +
            apiKey +
            '&language=en-US&page=1',
        );
        setMenuList(responseJson.results);
        MainScreen.updateBack(
          'https://image.tmdb.org/t/p/original' +
            responseJson.results[0].poster_path,
        );
        setTimeout(() => {
          setI(2);
        }, 10000);
      } catch (ex) {
        console.error(ex);
      }
    }
    setloading(false);
  };

  const whatsPopularTvShows = async () => {
    setloading(true);

    if (popTvShows.length == 0) {
      try {
        const {data: responseJson} = await axios.get(
          'https://api.themoviedb.org/3/tv/popular?api_key=' +
            apiKey +
            '&language=en-US&page=1',
        );
        setPopTvShows(responseJson.results);
        MainScreen.updateBack(
          'https://image.tmdb.org/t/p/original' +
            responseJson.results[0].poster_path,
        );
        setTimeout(() => {
          setI(2);
        }, 10000);
      } catch (ex) {
        console.error(ex);
      }
    }
    setloading(false);
  };

  const dateConverter = date => {
    var dat = date.toLocaleDateString();
    var res = dat.split('/');
    var a = res[0];
    if (a.length == 1) {
      a = '0'.concat(a);
    }
    var b = res[1];
    if (b.length == 1) {
      b = '0'.concat(b);
    }
    var c = res[2];
    var result = c.concat('-' + a);
    // 2021-02
    var result2 = result.concat('-' + b);
    console.log('re: ', result2);
    return result2;
  };

  const getlatestMovies = async () => {
    setloading(true);

    if (latestMovies.length == 0) {
      let date = new Date();
      console.log('da: ', date);
      try {
        const {data: responseJson} = await axios.get(
          'https://api.themoviedb.org/3/discover/movie?api_key=' +
            apiKey +
            '&sort_by=' +
            'primary_release_date.desc' +
            '&page=' +
            1 +
            '&vote_count.gte=' +
            100,
        );
        console.log('res:3: ', responseJson.results);
        setlatestMovies(responseJson.results);
        MainScreen.updateBack(
          'https://image.tmdb.org/t/p/original' +
            responseJson.results[0].poster_path,
        );
        setTimeout(() => {
          setI(2);
        }, 10000);
      } catch (ex) {
        console.error(ex);
      }
    }
    setloading(false);
  };

  const getlatestTvShows = async () => {
    setloading(true);

    if (latestTvShows.length == 0) {
      try {
        const {data: responseJson} = await axios.get(
          'https://api.themoviedb.org/3/discover/tv?api_key=' +
            apiKey +
            '&sort_by=' +
            'primary_release_date.desc' +
            '&page=' +
            1 +
            '&vote_count.gte=' +
            50,
        );
        setlatestTvShows(responseJson.results);
        MainScreen.updateBack(
          'https://image.tmdb.org/t/p/original' +
            responseJson.results[0].poster_path,
        );
        setTimeout(() => {
          setI(2);
        }, 10000);
      } catch (ex) {
        console.error(ex);
      }
    }
    setloading(false);
  };
  const fadeIn = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  };

  //
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    whatsPopularTvShows();
    topRatedTvShows();
    getlatestTvShows();
  };
  const disable = enOdis => {
    setIsEnabled(enOdis);
    whatsPopularTvShows();
    topRatedTvShows();
    getlatestTvShows();
  };
  /*
   <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#01083d', 'skyblue']}>
        <Text style={movieListStyle.text3}>
          {props.screenNumber == 1 ? 'Popular TV shows' : 'Trending'}
        </Text>
      </LinearGradient>
  */

  const footer = () => {
    return (
      <View
        style={{
          color: 'grey',
          marginBottom:
            props.screenNumber == 2
              ? Dimensions.get('screen').height / 2.5
              : Dimensions.get('screen').height / 1.38,
          //  alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.4)',
          borderRadius: 100,
          marginVertical: 10,
          marginHorizontal: 50,
        }}>
        <Text
          style={{textAlign: 'center', color: 'white', paddingVertical: 10}}>
          {loading ? (
            <ActivityIndicator color={'skyblue'} size={'large'} />
          ) : (
            'Results Ended'
          )}
        </Text>
      </View>
    );
  };

  //1- popular 4- top rated
  return (
    <View>
      {props.screenNumber == 1 ||
      props.screenNumber == 4 ||
      props.screenNumber == 5 ? (
        <Animatable.View animation={fadeIn} ref={AnimationRef}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['black', '#2b1100']}
            style={{
              marginTop: Dimensions.get('screen').height / 13,
              paddingVertical: 8,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <TouchableOpacity onPress={() => disable(false)}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#ad9600',
                    fontSize: 18,
                    fontFamily: 'ElmessiriSemibold-2O74K',
                    borderStyle: 'solid',
                    borderWidth: !isEnabled ? 1 : 0,
                    borderColor: 'yellow',
                    borderRadius: 10,
                    paddingHorizontal: 8,
                    paddingTop: 3,
                  }}>
                  TV Shows
                </Text>
              </TouchableOpacity>

              <Switch
                trackColor={{false: '#001f63', true: 'brown'}}
                thumbColor={'#ad9600'}
                ios_backgroundColor="grey"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{marginHorizontal: 5}}
              />
              <TouchableOpacity onPress={() => disable(true)}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#ad9600',
                    fontSize: 18,
                    fontFamily: 'ElmessiriSemibold-2O74K',
                    borderStyle: 'solid',
                    borderWidth: isEnabled ? 1 : 0,
                    borderColor: 'yellow',
                    borderRadius: 10,
                    paddingHorizontal: 8,
                    paddingTop: 3,
                  }}>
                  Movies
                </Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animatable.View>
      ) : null}

      <FlatList
        style={{backgroundColor: 'rgba(0,33,99,0.4)'}}
        //horizontal={i === 5 ? true : true}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        // scrollToIndex={index}
        data={
          props.screenNumber == 1
            ? isEnabled
              ? menuList
              : popTvShows
            : props.screenNumber == 2
            ? menuList2
            : props.screenNumber == 4
            ? isEnabled
              ? menuList3
              : topTvShows
            : props.screenNumber == 5
            ? isEnabled
              ? latestMovies
              : latestTvShows
            : []
        }
        renderItem={({item, index}) => (
          <View
            key={index}
            //className={"col-lg-2"}
            style={{
              //height: Dimensions.get('screen').height / 1.7,
              // marginRight: 2,
              maxWidth: Dimensions.get('screen').width / 2,
              // backgroundColor: 'yellow',
              textAlign: 'center',
              backgroundColor: 'rgba(0,29,62,0.3)',

              //   marginTop: 9,
              //borderRadius: 10
            }}>
            <TouchableOpacity
              style={{
                //  borderRadius: 10,
                padding: 11,
                // height: Dimensions.get('screen').height / 1.7,

                backgroundColor: 'rgba(0,0,0,0.5)',
              }}
              onPress={() => {
                if (props.screenNumber == 4 && isEnabled) {
                  props.navigation.navigate('MovieInfo', {
                    id: item.id,
                  });
                } else if (props.screenNumber == 1 && isEnabled) {
                  props.navigation.navigate('MovieInfo', {
                    id: item.id,
                  });
                } else if (props.screenNumber == 5 && isEnabled) {
                  props.navigation.navigate('MovieInfo', {
                    id: item.id,
                  });
                } else if (props.screenNumber == 4 && !isEnabled) {
                  props.navigation.navigate('TvInfo', {
                    id: item.id,
                  });
                } else if (props.screenNumber == 1 && !isEnabled) {
                  props.navigation.navigate('TvInfo', {
                    id: item.id,
                  });
                } else if (props.screenNumber == 5 && !isEnabled) {
                  props.navigation.navigate('TvInfo', {
                    id: item.id,
                  });
                } else if (item.media_type == 'movie') {
                  props.navigation.navigate('MovieInfo', {
                    id: item.id,
                  });
                } else if (item.media_type == 'tv') {
                  props.navigation.navigate('TvInfo', {
                    id: item.id,
                  });
                }
              }}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Image
                  style={{
                    backgroundColor: 'black',
                    height: Dimensions.get('screen').height / 2.8,
                    width: Dimensions.get('screen').width / 2.25,
                    borderRadius: 10,
                  }}
                  source={{
                    uri:
                      'https://image.tmdb.org/t/p/original' + item.poster_path,
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
                  {item.original_title
                    ? item.original_title
                    : item.original_name.length >= 15
                    ? item.original_title
                      ? item.original_title
                      : item.original_name
                    : item.original_title
                    ? item.original_title
                    : item.original_name}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: responsiveFontSize(1.7),
                    color: '#bdbdbd',
                  }}>
                  {item.release_date ? item.release_date : item.first_air_date}
                </Text>
              </View>

              <Text
                style={{
                  fontSize: responsiveFontSize(1.7),
                  color: '#bdbdbd',
                  marginTop: 5,
                }}>
                Rank: {item.vote_average * 10}%
              </Text>
              <Progress.Bar
                progress={(item.vote_average * 10) / 100}
                width={Dimensions.get('screen').width / 2.2}
              />
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={footer()}
      />
    </View>
  );
}

export default Movies;
