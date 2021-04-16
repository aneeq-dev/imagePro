import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Text,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {movieListStyle} from '../../styleSheeet/styles';
import apiKey from '../apiKey/apiKey';
import {WebView} from 'react-native-webview';

function Trailers(props) {
  const [menuList, setMenuList] = useState([]);
  const [backdrop_path, setbackdrop_path] = useState('');
  const [keyis, setKey] = useState('');
  const [loading, setloading] = useState(true);

  useEffect(() => {
    getLatest();
  }, []);

  const getVideos = async id => {
    try {
      const {data: responseJson} = await axios.get(
        'https://api.themoviedb.org/3/movie/' +
          id +
          '/videos?api_key=' +
          apiKey +
          '&language=en-US',
      );
      //console.log('rr: ', responseJson);
      responseJson.results.forEach(element => {
        if (element.type == 'Trailer') {
          // Video.update(element.key);
          props.navigation.navigate('Video', {
            videoLink: element.key, // login while change password
          });
        }
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  const getLatest = async () => {
    setloading(true);
    try {
      const {data: responseJson} = await axios.get(
        'https://api.themoviedb.org/3/discover/movie?api_key=' +
          apiKey +
          '&language=en-US&vote_count.gte=' +
          100,
      );
      console.log('res: ', responseJson);
      setMenuList(responseJson.results);
    } catch (ex) {
      console.error(ex);
    }
    setloading(false);
  };

  const footer = () => {
    return (
      <View
        style={{
          color: 'grey',
          marginBottom: Dimensions.get('screen').height / 2.5,

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

  /**
   *   <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#01083d', 'skyblue']}
        style={
          {
            // marginTop: Dimensions.get('screen').height / 8.3,
          }
        }>
        <Text style={movieListStyle.text3}>Trailers</Text>
      </LinearGradient>
   */
  return (
    <View style={{}}>
      <FlatList
        style={{backgroundColor: 'rgba(0,29,62,0.8)'}}
        //horizontal={i === 5 ? true : true}
        keyExtractor={(item, index) => index.toString()}
        //numColumns={2}
        // scrollToIndex={index}
        data={menuList}
        renderItem={({item, index}) => (
          <View
            //className={"col-lg-2"}
            key={index}
            style={{
              textAlign: 'center',
              alignItems: 'center',
              marginBottom: 10,
              borderRadius: 10,
            }}>
            <View
              style={{
                padding: 11,
                backgroundColor: 'rgba(0,0,0,0.5)',
              }}
              onClick={() => {
                if (item.media_type == 'movie') {
                  window.location.href = '/movieitem/' + item.id;
                }
              }}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Image
                  style={{
                    backgroundColor: 'skyblue',
                    height: Dimensions.get('screen').height / 3.2,
                    width: Dimensions.get('screen').width / 1.1,
                    borderRadius: 10,
                  }}
                  source={{
                    uri: item.backdrop_path
                      ? 'https://image.tmdb.org/t/p/original/' +
                        item.backdrop_path
                      : 'https://image.tmdb.org/t/p/original/' +
                        item.poster_path,
                  }}
                />
              </View>

              <View
                style={{
                  display: 'flex',
                  position: 'absolute',
                  top: Dimensions.get('screen').height / 8.85,
                  left: Dimensions.get('screen').width / 2.67,
                  color: 'rgba(255,255,255,0.9)',
                  // borderRadius: 50
                  //   backgroundColor: 'yellow'
                }}
                // href="/video/play?key=R1v0uFms68U"
                data-site="YouTube"
                data-id="R1v0uFms68U"
                //data-title="The Walking Dead - Season 1 Trailer"
              >
                <View
                  style={{
                    //  height:Dimensions.get('screen').height/8,
                    //width:Dimensions.get('screen').width/4.6,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    borderRadius: 50,
                  }}>
                  <AntDesign
                    name={'caretright'}
                    size={45}
                    underlayColor="transparent"
                    // backgroundColor={'blue'}
                    onPress={() => {
                      getVideos(item.id);
                      //  //console.log("j", props);
                    }}
                    color={'white'}
                    style={{
                      // borderRadius: 50,
                      margin: 7,
                      height: Dimensions.get('screen').height / 10,
                      width: Dimensions.get('screen').width / 5.5,
                      //  backgroundColor:'yellow',
                      paddingLeft: 10,
                      paddingTop: 7,
                    }}
                    //  style={stylesAppFile.options}
                  />
                </View>
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
                width={Dimensions.get('screen').width / 1.1}
              />
            </View>
          </View>
        )}
        ListFooterComponent={footer()}
      />
    </View>
  );
}

export default Trailers;
