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
import {categoriesStyling, movieListStyle} from '../../styleSheeet/styles';
import apiKey from '../apiKey/apiKey';
import axios from 'axios';
import MainScreen from '../MainScreen/MainScreen';
import * as Progress from 'react-native-progress';

function PeopleInterface(props) {
  const [menuList, setMenuList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [loadMore, setLoadMore] = useState(true);
  const [offset, setOffset] = useState(1);
  const [haveMore1, setHaveMore1] = useState(false);
  const [loading1, setLoading1] = useState(true);
  const [fetchingFromServer, setFetchingFromServer] = useState(false);

  useEffect(() => {
    console.log('rps: ', props.screenNumber, offset);
    whatsPopular();
  }, [offset]);

  const whatsPopular = async () => {
    try {
      const {data: responseJson} = await axios.get(
        'https://api.themoviedb.org/3/person/popular?api_key=' +
          apiKey +
          '&language=en-US&page=' +
          offset,
      );
      console.log('people: ', responseJson);

      if (responseJson.page < responseJson.total_pages) {
        setHaveMore1(true);
        console.log('yyeeesss');
      } else {
        setHaveMore1(false);
      }

      setFetchingFromServer(false);
      setMenuList([...menuList, ...responseJson.results.slice(0 * 20, 1 * 20)]);

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
              if (haveMore1 && !(menuList.length === 0)) {
                setFetchingFromServer(true);

                setOffset(offset + 1);

                setLoadMore(true);
              }
            }}>
            <View>
              {
                <Text style={{color: 'white'}}>
                  {menuList.length == 0
                    ? 'Not Found!'
                    : haveMore1
                    ? 'Load More'
                    : 'Results End'}
                </Text>
              }

              {fetchingFromServer && !(menuList.length === 0) ? (
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
          data={menuList}
          renderItem={({item, index}) => (
            <View
              key={index}
              style={{
                marginBottom:
                  !(index == 0) && index % 19 == 0
                    ? Dimensions.get('screen').height / 11.3
                    : 10,
                height: Dimensions.get('screen').height / 2,
                maxWidth: Dimensions.get('screen').width / 2,
                marginRight: index == menuList.length - 1 ? 9 : 0,
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
                  props.navigation.navigate('MovieInfo', {
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
                        item.profile_path,
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
                    {item.name ? item.name : ''}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: responsiveFontSize(1.7),
                      color: '#bdbdbd',
                    }}>
                    {item.known_for_department ? item.known_for_department : ''}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          ListFooterComponent={renderFooter()}
          //Adding Load More button as footer component
        />
      )}
    </View>
  );
}

export default PeopleInterface;
