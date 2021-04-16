import React, {useState, useEffect} from 'react';

import {
  Dimensions,
  Image,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
} from 'react-native';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {movieListStyle} from '../../styleSheeet/styles';
import apiKey from '../apiKey/apiKey';
import axios from 'axios';
import MainScreen from '../MainScreen/MainScreen';
import * as Progress from 'react-native-progress';
function TVShowsInterface(props) {
  const [menuList, setMenuList] = useState([]);
  const [menuList2, setMenuList2] = useState([]);
  const [menuList3, setMenuList3] = useState([]);
  const [menuList4, setMenuList4] = useState([]);
  const [index, setIndex] = useState(0);
  const [topTvShows, settopTvShows] = useState([]);
  const [latestTvShows, setlatestTvShows] = useState([]);
  const [latestMovies, setlatestMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isEnabled, setIsEnabled] = useState(true);
  //
  const [i, setI] = useState(1);
  const [i2, setI2] = useState(1);

  useEffect(() => {
    //console.log('rps: ', props.screenNumber);
    if (props.screenNumber == 1) {
      whatsPopular();
    } else if (props.screenNumber == 2) {
      airingToday();
    } else if (props.screenNumber == 3) {
      topRatedMovies();
    } else if (props.screenNumber == 4) {
      ontheAir();
    }
  }, []);

  const whatsPopular = async () => {
    setLoading(true);
    if (menuList.length == 0) {
      try {
        const {data: responseJson} = await axios.get(
          'https://api.themoviedb.org/3/tv/popular?api_key=' +
            apiKey +
            '&language=en-US&page=1',
        );
        setMenuList(responseJson.results);
      } catch (ex) {
        console.error(ex);
      }
    }
    setLoading(false);
  };

  const ontheAir = async () => {
    setLoading(true);

    if (menuList2.length == 0) {
      try {
        const {data: responseJson} = await axios.get(
          'https://api.themoviedb.org/3/tv/on_the_air?api_key=' +
            apiKey +
            '&page=1',
        );
        setMenuList2(responseJson.results);
      } catch (ex) {
        console.error(ex);
      }
    }
    setLoading(false);
  };

  const topRatedMovies = async () => {
    setLoading(true);

    if (menuList3.length == 0) {
      try {
        const {data: responseJson} = await axios.get(
          'https://api.themoviedb.org/3/tv/top_rated?api_key=' +
            apiKey +
            '&language=en-US&page=1',
        );
        setMenuList3(responseJson.results);
      } catch (ex) {
        console.error(ex);
      }
    }
    setLoading(false);
  };

  const airingToday = async () => {
    setLoading(true);

    if (menuList4.length == 0) {
      try {
        const {data: responseJson} = await axios.get(
          'https://api.themoviedb.org/3/tv/airing_today?api_key=' +
            apiKey +
            '&page=1',
        );
        setMenuList4(responseJson.results);
      } catch (ex) {
        console.error(ex);
      }
    }
    setLoading(false);
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator color={'black'} />
      ) : (
        <FlatList
          style={{backgroundColor: '#00468c'}}
          horizontal={i === 5 ? true : true}
          keyExtractor={(item, index) => index.toString()}
          // scrollToIndex={index}
          data={
            props.screenNumber == 1
              ? menuList
              : props.screenNumber == 4
              ? menuList2
              : props.screenNumber == 3
              ? menuList3
              : props.screenNumber == 2
              ? menuList4
              : []
          }
          renderItem={({item, index}) => (
            <View
              key={index}
              style={{
                height: Dimensions.get('screen').height / 1.7,
                maxWidth: Dimensions.get('screen').width / 2,
                marginLeft: index == 0 ? 9 : 14,
                marginRight:
                  index ==
                  (props.screenNumber == 1
                    ? menuList
                    : props.screenNumber == 2
                    ? menuList2
                    : props.screenNumber == 3
                    ? menuList3
                    : menuList4
                  ).length -
                    1
                    ? 9
                    : 0,
                textAlign: 'center',
              }}>
              <TouchableOpacity
                style={{
                  //  borderRadius: 10,
                  padding: 11,
                  height: Dimensions.get('screen').height / 1.7,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                }}
                onPress={() => {
                  props.navigation.navigate('TvInfo', {
                    id: item.id,
                  });
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
                        'https://image.tmdb.org/t/p/original' +
                        item.poster_path,
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
                    {item.release_date
                      ? item.release_date
                      : item.first_air_date}
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

          // ListFooterComponent={renderFooter(Category.c_id)}
          //Adding Load More button as footer component
        />
      )}
    </View>
  );
}

export default TVShowsInterface;
