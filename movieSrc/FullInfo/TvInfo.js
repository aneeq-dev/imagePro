import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
  Image,
} from 'react-native';
import analyze from 'rgbaster';
import axios from 'axios';
import Movies from '../MovieLists/Movies';
import apiKey from '../apiKey/apiKey';
import FastImage from 'react-native-fast-image';
import SearchArea from '../SearchArea/SearchArea';
import {stylesMenuButton, categoriesStyling} from '../../styleSheeet/styles';
import {mainMapScreenStyling} from '../../styleSheeet/screenStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Progress from 'react-native-progress';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import not from '../../images/sideDrawerImage.jpg';
import Cast from './Cast';
import Recommendations from './Recommendations';

function TvInfo(props) {
  const [loading, setLoading] = useState(true);
  // const [query, setQuery] = useState(props.match.params.query);
  const [haveMore1, setHaveMore1] = useState(false);
  const [fetchingFromServer, setFetchingFromServer] = useState(false);
  const [category1serverData, setCategory1ServerData] = useState([]);
  const [category1Count, setCategory1Count] = useState(0);
  const [category2serverData, setCategory2ServerData] = useState([]);
  const [castData, setCastData] = useState([]);
  const [category2Count, setCategory2Count] = useState(0);
  const [colors, setColor] = useState('');
  const [col, setCol] = useState('white');
  const [videos, setVideos] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const [castisSearch, setCastIsSearch] = useState(true);
  const [recisSearch, setrecIsSearch] = useState(true);

  const [backdropImages, setbackdropImages] = useState([]);
  const [posterImages, setposterImages] = useState([]);

  const [backdrop_path, setbackdrop_path] = useState('');
  const [trailerID, setTrailerID] = useState('');
  const [isSelected, setSelected] = useState(false);
  const [keyis, setKey] = useState('');
  const [yes, setYes] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [similars, setSimilars] = useState(null);
  const [simisSearch, setSimIsSearch] = useState(true);

  useEffect(() => {
    setVideos([]);
    setCategory2ServerData([]);
    searchedItem();

    getVideos();
    // getImages();
  }, [props.route.params.id]);

  const searchCastData = async id => {
    setCastData([]);

    console.log('nnj: ', !(id == undefined));
    setCastIsSearch(true);
    let responseJson = null;
    let id2 = !(id == undefined) ? id.toString() : props.route.params.id;

    const {data: responseJson2} = await axios.get(
      'https://api.themoviedb.org/3/tv/' +
        id2 +
        '/credits' +
        '?api_key=' +
        apiKey,
    );
    responseJson = responseJson2;

    setCastData([responseJson]);

    setFetchingFromServer(false);
    setCastIsSearch(false);
    setLoading(false);
  };

  const searchedItem = async id => {
    //setCategory2ServerData([]);
    setLoading(true);
    let responseJson = null;
    let id2 = !(id == undefined) ? id.toString() : props.route.params.id;

    const {data: responseJson2} = await axios.get(
      'https://api.themoviedb.org/3/tv/' + id2 + '?api_key=' + apiKey,
    );
    responseJson = responseJson2;
    console.log('ressp: ', responseJson);

    setCategory2Count(1);
    setCategory2ServerData([responseJson]);

    setFetchingFromServer(false);
    setLoading(false);
    getRecommendations(id);
    getSimilar(id);
    searchCastData(id);
  };

  const getSimilar = async id => {
    setSimilars([]);
    setSimIsSearch(true);
    let id2 = !(id == undefined) ? id.toString() : props.route.params.id;
    try {
      const {data: responseJson} = await axios.get(
        'https://api.themoviedb.org/3/tv/' +
          id2 +
          '/similar?api_key=' +
          apiKey +
          '&page=1',
      );

      setSimilars(responseJson);
    } catch (ex) {
      ////console.log(ex);
    }

    setSimIsSearch(false);
    setLoading(false);
  };

  const getTime = actual => {
    let time = actual;
    var Hours = Math.floor(time / 60).toString();
    var minutes = (time % 60).toString();

    ////console.log(Hours);
    ////console.log(minutes);

    var tot = Hours.concat('h ' + minutes + 'm');
    return tot;
  };

  const getVideos = async () => {
    //console.log("bhjbh",saloon_id);
    //let responseJson = null;
    if (videos == null || videos.length == 0) {
    } else {
      videos.forEach((element, i) => {
        videos.pop();
      });
    }
    try {
      const {data: responseJson} = await axios.get(
        'https://api.themoviedb.org/3/tv/' +
          props.route.params.id +
          '/videos?api_key=' +
          apiKey +
          '&language=en-US',
      );
      console.log('resvid: ', responseJson);

      setVideos(responseJson.results);
    } catch (ex) {
      console.log(ex);
    }

    // setLoading(false);
  };

  const getRecommendations = async id => {
    setRecommendations([]);
    setrecIsSearch(true);
    let id2 = !(id == undefined) ? id.toString() : props.route.params.id;
    try {
      const {data: responseJson} = await axios.get(
        'https://api.themoviedb.org/3/tv/' +
          id2 +
          '/recommendations?api_key=' +
          apiKey +
          '&page=1',
      );

      setRecommendations(responseJson);
    } catch (ex) {
      ////console.log(ex);
    }

    setrecIsSearch(false);
    setLoading(false);
  };

  const updateDestinationInuptState = destination => {
    //this.setState({ destination });
    // this.onChangeDestinationDebounced(destination);
  };

  const changeData = id => {
    console.log('id: ', id);

    searchedItem(id);
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

      <View
        style={{
          marginTop: Dimensions.get('screen').height / 8.3,
        }}
      />
      {loading ? (
        <ActivityIndicator
          style={{marginTop: 10}}
          size={'large'}
          color={'skyblue'}
        />
      ) : category2serverData.length > 0 ? (
        <ScrollView style={{zIndex: -3}}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#2b1100', '#001445']}
            style={{}}>
            <Text
              style={{
                color: 'white',
                //  marginRight: 10,
                marginTop: 10,
                marginBottom: 10,
                fontSize: 18,
                fontFamily: 'ElmessiriSemibold-2O74K',
                textAlign: 'center',
                // fontStyle: 'italic',
              }}>
              &#8880;{' '}
              {category2serverData[0].tagline
                ? category2serverData[0].tagline
                : category2serverData[0].name + ' TV series '}
              &#8881;
            </Text>
          </LinearGradient>
          <FastImage
            source={{
              uri:
                'https://image.tmdb.org/t/p/original' +
                category2serverData[0].backdrop_path,
            }}
            style={{
              zIndex: -3,

              resizeMode: 'cover',
              justifyContent: 'center',
              height: Dimensions.get('screen').height / 3.04,
              width: Dimensions.get('screen').width,
              backgroundColor: 'yellow',
              //  marginTop: Dimensions.get('screen').height / 11,
            }}
          />
          <View>
            <View
              style={{
                // height: Dimensions.get('screen').height / 3,
                width: Dimensions.get('screen').width,
                //  marginBottom: 60,
                backgroundColor: 'rgba(43, 17, 0,0.75)',
                position: 'absolute',
                top: -Dimensions.get('screen').height / 3.03,

                flexDirection: 'row',
              }}>
              <FastImage
                source={{
                  uri:
                    'https://image.tmdb.org/t/p/original' +
                    category2serverData[0].poster_path,
                }}
                style={{
                  left: 0,
                  resizeMode: 'cover',
                  margin: 7,
                  height: Dimensions.get('screen').height / 3.3,
                  width: Dimensions.get('screen').width / 2.7,
                  // backgroundColor: 'yellow',
                  borderRadius: 10,
                }}
              />
              <View
                style={
                  {
                    //  backgroundColor: 'yellow',
                    //  borderStyle: 'solid',
                    //borderRightColor: 'gold',
                  }
                }>
                <Text
                  style={{
                    color: 'white',
                    //  marginRight: 10,
                    marginTop: 10,
                    fontSize: 17,
                    width: Dimensions.get('screen').width / 1.75,
                    fontFamily: 'ElmessiriSemibold-2O74K',
                  }}>
                  {category2serverData[0].name}
                </Text>
                <View
                  style={{
                    height: 0.5,
                    backgroundColor: 'rgba(255,255,255,1)',
                    width: Dimensions.get('screen').width / 1.75,

                    // marginHorizontal: 10,
                  }}
                />
                <Text
                  style={{
                    color: '#b3b3b3',
                    //  marginTop: ,
                    fontSize: 12,

                    fontFamily: 'ElmessiriSemibold-2O74K',
                  }}>
                  {category2serverData[0].release_date
                    ? category2serverData[0].release_date
                    : category2serverData[0].first_air_date}
                </Text>

                {category2serverData[0].tagline ? (
                  <Text
                    style={{
                      color: 'white',
                      marginTop: 10,
                      fontSize: 13,
                      fontFamily: 'ElmessiriSemibold-2O74K',
                      width: Dimensions.get('screen').width / 1.75,
                    }}>
                    &sdot; {category2serverData[0].tagline} &sdot;
                  </Text>
                ) : null}

                <Text
                  style={{
                    color: 'white',
                    marginTop: 10,
                    fontSize: 13,
                    fontFamily: 'ElmessiriSemibold-2O74K',
                  }}>
                  Popularity: {category2serverData[0].vote_average * 10 + '%'}
                </Text>
                <Progress.Bar
                  progress={(category2serverData[0].vote_average * 10) / 100}
                  width={Dimensions.get('screen').width / 2.2}
                />
                <Text
                  style={{
                    color: 'white',
                    marginTop: 10,
                    fontSize: 13,
                    fontFamily: 'ElmessiriSemibold-2O74K',
                    width: Dimensions.get('screen').width / 1.75,
                  }}>
                  {category2serverData[0].genres.map((item, i) => (
                    <Text>
                      {item.name}
                      {category2serverData[0].genres.length == i + 1
                        ? null
                        : ', '}
                    </Text>
                  ))}
                </Text>
                <View
                  style={{
                    height: 0.5,
                    backgroundColor: 'rgba(255,255,255,1)',
                    width: Dimensions.get('screen').width / 1.75,
                    // marginHorizontal: 10,
                  }}
                />
                <Text
                  style={{
                    color: 'white',
                    marginTop: 10,
                    fontSize: 13,
                    fontFamily: 'ElmessiriSemibold-2O74K',
                    width: Dimensions.get('screen').width / 1.75,
                  }}>
                  {category2serverData[0].production_countries[0]
                    ? '(' +
                      category2serverData[0].production_countries[0]
                        .iso_3166_1 +
                      ')'
                    : null}

                  {category2serverData[0].episode_run_time ? (
                    <Text>
                      &sdot; Episode Runtime :{' '}
                      {getTime(
                        category2serverData[0].episode_run_time[0]
                          ? category2serverData[0].episode_run_time[0]
                          : category2serverData[0].episode_run_time,
                      )}
                    </Text>
                  ) : null}
                </Text>
              </View>
            </View>
            {category2serverData[0].overview == null ||
            category2serverData[0].overview == '' ? null : (
              <View
                style={{
                  backgroundColor: 'rgba(39,39,61,1)',
                  marginTop: 10,

                  //  position: 'absolute',
                  // top: Dimensions.get('screen').height / 3.05,
                }}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#2b1100', '#001445']}>
                  <View
                    style={{
                      borderTopWidth: 0.5,
                      borderBottomWidth: 0.5,
                      borderStyle: 'solid',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'white',
                        paddingHorizontal: 10,
                        paddingTop: 10,
                        fontFamily: 'ElmessiriSemibold-2O74K',
                        textAlign: 'center',
                        borderBottomWidth: 0.5,
                      }}>
                      Overview
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'white',
                        paddingHorizontal: 10,
                        textAlign: 'center',
                        paddingBottom: 10,
                        paddingTop: 8,
                        fontFamily: 'ElmessiriSemibold-2O74K',
                      }}>
                      {category2serverData[0].overview}
                    </Text>
                  </View>
                </LinearGradient>
              </View>
            )}

            {videos == null ? null : videos.length == 0 ? null : (
              <View
                style={{
                  backgroundColor: 'rgba(39,39,61,1)',
                  //  position: 'absolute',
                  // top: Dimensions.get('screen').height / 3.05,
                }}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['black', '#2b1100']}
                  //  style={{borderRadius: 10}}
                >
                  <TouchableOpacity
                    style={{
                      width: Dimensions.get('screen').width,
                      height: Dimensions.get('screen').height / 11,
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      console.log('dd: ', videos);
                      if (videos == null) {
                      } else {
                        props.navigation.navigate('Video', {
                          // videoLink: videos[0].key, // login while change password
                          id: category2serverData[0].id,
                          screen: 2,
                        });
                      }
                    }}>
                    <View
                      style={{
                        color: 'rgba(255,255,255,0.9)',
                      }}>
                      <View
                        style={{
                          backgroundColor: '#27273d',
                          borderRadius: 50,
                          flexDirection: 'row',
                          marginTop: 9,
                          paddingHorizontal: 10,
                        }}>
                        <AntDesign
                          name={'caretright'}
                          size={17}
                          underlayColor="transparent"
                          onPress={() => {
                            // getVideos(cat.id);
                            //  //console.log("j", props);
                          }}
                          color={'white'}
                          style={{
                            height: Dimensions.get('screen').height / 23,
                            marginRight: 0,
                            paddingTop: 12,
                          }}
                          //  style={stylesAppFile.options}
                        />
                        <Text
                          style={{
                            fontSize: 15,
                            color: 'white',
                            margin: 10,
                          }}>
                          Play Teaser Trailer
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            )}
          </View>
          <View style={{}}>
            <Text
              style={{
                fontSize: 19,
                fontFamily: 'ElmessiriSemibold-2O74K',
                marginHorizontal: 15,
                marginTop: 15,
              }}>
              Series Cast
            </Text>
            <Cast data={castData} searching={castisSearch} />
          </View>
          <View>
            <Text
              style={{
                fontSize: 19,
                fontFamily: 'ElmessiriSemibold-2O74K',
                marginHorizontal: 15,
                marginTop: 15,
              }}>
              Similar Tv Shows
            </Text>
            <Recommendations
              navigation={props.navigation}
              data={similars}
              searching={simisSearch}
              changeData={changeData}
            />
          </View>

          <View>
            <Text
              style={{
                fontSize: 19,
                fontFamily: 'ElmessiriSemibold-2O74K',
                marginHorizontal: 15,
                marginTop: 15,
              }}>
              Recommendations
            </Text>
            <Recommendations
              navigation={props.navigation}
              data={recommendations}
              searching={recisSearch}
              changeData={changeData}
            />
          </View>
          <View
            style={{
              marginBottom: Dimensions.get('screen').height / 6,
            }}
          />
        </ScrollView>
      ) : null}
    </View>
  );
}

export default TvInfo;
