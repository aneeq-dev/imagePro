import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';
import {ActivityIndicator, View, Text, TouchableOpacity} from 'react-native';
import axios from 'axios';
import apiKey from './apiKey/apiKey';

function Video(props) {
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.route.params.screen == 1) {
      getVideos();
    } else {
      getVideos2();
    }
  }, []);

  const getVideos = async () => {
    setLoading(true);
    try {
      const {data: responseJson} = await axios.get(
        'https://api.themoviedb.org/3/movie/' +
          props.route.params.id +
          '/videos?api_key=' +
          apiKey +
          '&language=en-US',
      );
      console.log('resnkjjk: : ', responseJson);
      setVideos(responseJson.results);
    } catch (ex) {
      console.log(ex);
    }
    setLoading(false);
  };

  const getVideos2 = async () => {
    setLoading(true);
    try {
      const {data: responseJson} = await axios.get(
        'https://api.themoviedb.org/3/tv/' +
          props.route.params.id +
          '/videos?api_key=' +
          apiKey +
          '&language=en-US',
      );
      console.log('resnkjjk: : ', responseJson);
      setVideos(responseJson.results);
    } catch (ex) {
      console.log(ex);
    }
    setLoading(false);
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      {loading ? (
        <ActivityIndicator size={'large'} color={'skyblue'} />
      ) : videos == null || videos.length == 0 ? (
        <View
          style={{
            backgroundColor: 'black',
          }}>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 20,
              color: 'white',
              paddingBottom: 20,
            }}>
            Sorry the Trailer or Teaser requested was not found!
          </Text>
          <TouchableOpacity
            style={{
              //backgroundColor: 'grey',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Text
              style={{
                backgroundColor: 'grey',
                color: 'white',
                width: 100,
                textAlign: 'center',
                paddingVertical: 10,
                borderRadius: 10,

                margin: 10,
              }}>
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <WebView
          style={{
            marginTop: Platform.OS == 'ios' ? 20 : 0,
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{
            uri: 'https://www.youtube.com/watch?v=' + videos[0].key,
          }}
        />
      )}
    </View>
  );
}

export default Video;
