import React, {useState, useEffect, useRef} from 'react';
import apiKey from '../apiKey/apiKey';
import axios from 'axios';
import {View, Text, Dimensions, ActivityIndicator} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {stylesMenuButton} from '../../styleSheeet/styles';
import {mainMapScreenStyling} from '../../styleSheeet/screenStyles';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {TouchableOpacity} from 'react-native-gesture-handler';

function SearchList(props) {
  const [query, setQuery] = useState(props.query);

  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [response2, setResponse2] = useState([]);
  const AnimationRef = useRef(null);
  useEffect(() => {
    if (props.query == '') {
      getTrending();
    } else {
      getSearchResults(props.query);
    }

    // console.log("ddd: ",props.isSearch)
  }, [props.query]);

  const _onPress = () => {
    if (AnimationRef) {
      AnimationRef.current?.flipInX();
    }
  };

  useEffect(() => {
    _onPress();
  }, [loading]);

  const getSearchResults = async keyword => {
    //console.log("bhjbh",saloon_id);
    setLoading(true);
    try {
      const {data: responseJson} = await axios.get(
        'https://api.themoviedb.org/3/search/multi?api_key=' +
          apiKey +
          '&query=' +
          keyword +
          '&page=1',
      );
      console.log('ressss: ', responseJson);
      if (responseJson === 0) {
        // do nothing
      } else {
        // console.log("llll: ",responseJson);
        setResponse(responseJson.results);
      }
    } catch (ex) {
      console.error(ex);
    }

    setLoading(false);
  };

  const getTrending = async () => {
    console.log('bhjbh', query);
    setLoading(true);
    try {
      const {data: responseJson} = await axios.get(
        'https://api.themoviedb.org/3/trending/all/day?api_key=' + apiKey,
      );
      //  console.log("resmkknk: ", responseJson);
      if (responseJson === 0) {
        // do nothing
      } else {
        console.log('ree: ', responseJson);
        //  setLanguages(responseJson);

        //  await localStorage.setItem("trending", JSON.stringify(responseJson));
      }
      setResponse2(responseJson.results);
      setLoading(false);
      // let a = Menu(responseJson.results, selected);
    } catch (ex) {
      console.error(ex);
    }

    // setLoading(false);
  };

  return (
    <View
      style={{
        marginTop: Dimensions.get('screen').height / 9.8,
        //  zIndex:2000,
        // position: 'absolute',
      }}>
      <ScrollView
        style={{
          height: Dimensions.get('screen').height / 1.275,
        }}>
        {props.query == '' ? (
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#01083d', 'skyblue']}
            style={
              {
                // marginTop: Dimensions.get('screen').height / 8.3,
              }
            }>
            <Animatable.View ref={AnimationRef}>
              <Text
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingLeft: 10,
                  //backgroundColor: 'white',
                  color: 'white',
                  fontSize: responsiveFontSize(3.2),
                  fontFamily: 'ElmessiriSemibold-2O74K',
                }}>
                Trending Searches
              </Text>
            </Animatable.View>
          </LinearGradient>
        ) : null}

        {!(props.query == '') ? (
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#01083d', 'skyblue']}
            style={
              {
                // marginTop: Dimensions.get('screen').height / 8.3,
              }
            }>
            <Animatable.View ref={AnimationRef}>
              <Text
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingLeft: 10,
                  //backgroundColor: 'white',
                  color: 'white',
                  fontSize: responsiveFontSize(3.2),
                  fontFamily: 'ElmessiriSemibold-2O74K',
                }}>
                {loading ? 'Searching...' : 'Searched Results'}
              </Text>
            </Animatable.View>
          </LinearGradient>
        ) : null}

        {props.query == '' ? (
          loading ? (
            <ActivityIndicator
              size={'large'}
              color={'#0234a6'}
              style={{
                zIndex: 1,
                backgroundColor: 'white',
                borderStyle: 'solid',
                borderTopWidth: 1,
                paddingBottom: 10,
                paddingTop: 10,
              }}
            />
          ) : response2.length >= 1 ? (
            response2.map((item, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  props.navigation.goBack();
                  props.navigation.navigate('SearchedRes', {
                    // videoLink: element.key, // login while change password
                    query: item.original_title
                      ? item.original_title
                      : item.original_name
                      ? item.original_name
                      : item.name,
                    to: item.media_type,
                    screenNumber: 1,
                  });
                }}
                style={{
                  width: '100%',
                  //zIndex:,
                  borderStyle: 'solid',
                  borderTopWidth: 1,
                  //  paddingTop: 7,
                  // paddingBottom: 7,
                  backgroundColor: 'white',
                  // height: 200,
                  flexDirection: 'row',
                }}>
                {item.media_type == 'tv' ? (
                  <View style={stylesMenuButton.searchPos4}>
                    <MaterialIcons.Button
                      name={'tv'}
                      size={20}
                      color={'#0234a6'}
                      style={mainMapScreenStyling.barsicon}
                      backgroundColor={'yellow'}
                      onPress={() => setIsSearch(!isSearch)}
                    />
                  </View>
                ) : item.media_type == 'movie' ? (
                  <View style={stylesMenuButton.searchPos4}>
                    <MaterialIcons.Button
                      name={'local-movies'}
                      size={20}
                      color={'#0234a6'}
                      style={mainMapScreenStyling.barsicon}
                      backgroundColor={'yellow'}
                      onPress={() => setIsSearch(!isSearch)}
                    />
                  </View>
                ) : (
                  <View style={stylesMenuButton.searchPos4}>
                    <MaterialIcons.Button
                      name={'person-pin'}
                      size={20}
                      color={'#0234a6'}
                      style={mainMapScreenStyling.barsicon}
                      backgroundColor={'yellow'}
                      onPress={() => setIsSearch(!isSearch)}
                    />
                  </View>
                )}

                <View
                  style={{
                    paddingTop: 4,
                    paddingBottom: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2.1),
                      fontFamily: 'ElmessiriSemibold-2O74K',
                      textDecorationLine: 'underline',
                    }}>
                    {item.original_title
                      ? item.original_title
                      : item.original_name
                      ? item.original_name
                      : item.name}
                  </Text>

                  <Text
                    style={{
                      fontStyle: 'italic',
                      marginTop: -5,
                      marginBottom: 2,
                      fontSize: responsiveFontSize(1.7),
                    }}>
                    {'in '}
                    {item.media_type == 'tv'
                      ? 'TV Shows'
                      : item.media_type == 'movie'
                      ? 'Movies'
                      : 'Person'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : null
        ) : null}

        {!(props.query == '') ? (
          loading ? (
            <ActivityIndicator
              size={'large'}
              color={'#0234a6'}
              style={{
                backgroundColor: 'white',
                borderStyle: 'solid',
                borderTopWidth: 1,
                paddingBottom: 10,
                paddingTop: 10,
              }}
            />
          ) : response.length >= 1 ? (
            response.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={{
                  width: '100%',
                  borderStyle: 'solid',
                  borderTopWidth: 1,
                  //  paddingTop: 7,
                  // paddingBottom: 7,
                  backgroundColor: 'white',
                  // height: 200,
                  flexDirection: 'row',
                }}
                onPress={() => {
                  props.navigation.goBack();

                  props.navigation.navigate('SearchedRes', {
                    // videoLink: element.key, // login while change password
                    query: item.original_title
                      ? item.original_title
                      : item.original_name
                      ? item.original_name
                      : item.name,
                    to: item.media_type,
                    screenNumber: 1,
                  });
                }}>
                {item.media_type == 'tv' ? (
                  <View style={stylesMenuButton.searchPos4}>
                    <MaterialIcons.Button
                      name={'tv'}
                      size={20}
                      color={'#0234a6'}
                      style={mainMapScreenStyling.barsicon}
                      backgroundColor={'yellow'}
                      onPress={() => setIsSearch(!isSearch)}
                    />
                  </View>
                ) : item.media_type == 'movie' ? (
                  <View style={stylesMenuButton.searchPos4}>
                    <MaterialIcons.Button
                      name={'local-movies'}
                      size={20}
                      color={'#0234a6'}
                      style={mainMapScreenStyling.barsicon}
                      backgroundColor={'yellow'}
                      onPress={() => setIsSearch(!isSearch)}
                    />
                  </View>
                ) : (
                  <View style={stylesMenuButton.searchPos4}>
                    <MaterialIcons.Button
                      name={'person-pin'}
                      size={20}
                      color={'#0234a6'}
                      style={mainMapScreenStyling.barsicon}
                      backgroundColor={'yellow'}
                      onPress={() => setIsSearch(!isSearch)}
                    />
                  </View>
                )}

                <View
                  style={{
                    paddingTop: 4,
                    paddingBottom: 1,
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2.1),
                      fontFamily: 'ElmessiriSemibold-2O74K',
                      textDecorationLine: 'underline',
                    }}>
                    {item.original_title
                      ? item.original_title
                      : item.original_name
                      ? item.original_name
                      : item.name}
                  </Text>

                  <Text
                    style={{
                      fontStyle: 'italic',
                      marginTop: -5,
                      marginBottom: 2,
                      fontSize: responsiveFontSize(1.7),
                    }}>
                    {'in '}
                    {item.media_type == 'tv'
                      ? 'TV Shows'
                      : item.media_type == 'movie'
                      ? 'Movies'
                      : 'Person'}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : null
        ) : null}
      </ScrollView>
    </View>
  );
}

export default SearchList;
