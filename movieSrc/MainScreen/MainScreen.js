import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  Alert,
  TextInput,
  TouchableHighlight,
  Button,
  ActivityIndicator,
  ImageBackground,
  AsyncStorage,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Dimensions} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import axios from 'axios';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import {Keyboard} from 'react-native';
import {mainMapScreenStyling} from '../../styleSheeet/screenStyles';
import SearchArea from '../SearchArea/SearchArea';
import {styles, stylesMenuButton} from '../../styleSheeet/styles';
import Movies from '../MovieLists/Movies';
import Trailers from '../MovieLists/Trailers';
import * as Animatable from 'react-native-animatable';

function MainScreen(props) {
  const [loading, setloading] = useState(false);
  const [active, setActive] = useState(1);
  const [error, seterror] = useState(null);
  const [destination, setdestination] = useState('');
  const [backImg, setbackImg] = useState(
    'https://i.pinimg.com/originals/af/8d/63/af8d63a477078732b79ff9d9fc60873f.jpg',
  );
  const [backImg2, setbackImg2] = useState(
    'https://i.pinimg.com/originals/af/8d/63/af8d63a477078732b79ff9d9fc60873f.jpg',
  );
  const [screenHeight, setscreenHeight] = useState(
    Math.round(Dimensions.get('window').height),
  );
  const [isSearch, setIsSearch] = useState(false);
  const [count, setCount] = useState(0);

  const searchChanged = useRef(null);

  const scrollRef = useRef();

  const updateDestinationInuptState = async destination => {
    //this.setState({ destination });
    // this.onChangeDestinationDebounced(destination);
    const value = await AsyncStorage.getItem('loginkeysasa');
    console.log(value);
  };

  const setBack = img => {
    console.log('imhhh: ', img);
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
      if (number == 2 || number == 1) {
        scrollRef.current.scrollTo({
          x: 0,
          y: 0,
          animated: true,
        });
      } else if (number == 3 && i == 1) {
        scrollRef.current.scrollTo({
          x: -200,
          y: 0,
          animated: true,
        });
      } else if (number == 3 && i == 2) {
        scrollRef.current.scrollTo({
          x: 200,
          y: 0,
          animated: true,
        });
      } else {
        scrollRef.current.scrollTo({
          x: number * 100,
          y: 0,
          animated: true,
        });
      }
  };

  useEffect(() => {
    _onPress();
  }, [isSearch]);

  const _onPress = () => {
    if (searchChanged) {
      searchChanged.current?.fadeIn();
    }
  };

  MainScreen.updateBack = data => {
    setbackImg(data);
  };

  MainScreen.updateBack2 = data => {
    setbackImg2(data);
  };

  const setSearch = () => {
    setIsSearch(false);
  };

  const fadeIn = {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <View style={styles.container}>
      <View>
        <LinearGradient
          style={{
            marginTop: Dimensions.get('screen').height / 8.2,
          }}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#01083d', 'skyblue']}>
          <ScrollView horizontal ref={scrollRef}>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 3,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  marginLeft: 10,
                  paddingVertical: 3,
                  borderRadius: 20,
                  borderStyle: active == 1 ? 'solid' : null,
                  borderColor: active == 1 ? 'white' : 'rgba(0,0,0,0)',
                  borderWidth: 1,
                  //  margin: 1,
                }}
                onPress={() => {
                  setActive(1);
                }}>
                <Text
                  style={{
                    // marginRight: 10,
                    fontSize: 20,
                    fontFamily: 'ElmessiriSemibold-2O74K',
                    color: 'white',
                    //color: active == 1 ? '#00bf93' : 'white',
                  }}>
                  Trending
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  paddingVertical: 3,
                  borderRadius: 20,
                  borderStyle: active == 2 ? 'solid' : null,
                  borderColor: active == 2 ? 'white' : 'rgba(0,0,0,0)',
                  borderWidth: 1,
                  //  margin: 1,
                }}
                onPress={() => {
                  setActive(2);
                }}>
                <Text
                  style={{
                    //  marginRight: 10,
                    fontSize: 20,
                    fontFamily: 'ElmessiriSemibold-2O74K',
                    color: 'white',
                    // color: active == 2 ? 'yellow' : 'white',
                  }}>
                  Popular
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  paddingVertical: 3,
                  borderRadius: 20,
                  borderStyle: active == 3 ? 'solid' : null,
                  borderColor: active == 3 ? 'white' : 'rgba(0,0,0,0)',
                  borderWidth: 1,
                  // margin: 1,
                }}
                onPress={() => {
                  setActive(3);
                }}>
                <Text
                  style={{
                    //  marginRight: 10,
                    fontSize: 20,
                    fontFamily: 'ElmessiriSemibold-2O74K',
                    color: 'white',
                    // color: active == 2 ? 'yellow' : 'white',
                  }}>
                  Latest
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  paddingVertical: 3,
                  borderRadius: 20,
                  borderStyle: active == 4 ? 'solid' : null,
                  borderColor: active == 4 ? 'white' : 'rgba(0,0,0,0)',
                  borderWidth: 1,
                  // margin: 1,
                }}
                onPress={() => {
                  setActive(4);
                }}>
                <Text
                  style={{
                    // marginRight: 10,
                    fontSize: 20,
                    fontFamily: 'ElmessiriSemibold-2O74K',
                    color: 'white',
                    // color: active == 2 ? 'yellow' : 'white',
                  }}>
                  Top Rated
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 15,
                  paddingVertical: 3,
                  borderRadius: 20,
                  borderStyle: active == 5 ? 'solid' : null,
                  borderColor: active == 5 ? 'white' : 'rgba(0,0,0,0)',
                  borderWidth: 1,
                  // margin: 1,
                }}
                onPress={() => {
                  setActive(5);
                }}>
                <Text
                  style={{
                    //marginRight: 10,
                    fontSize: 20,
                    fontFamily: 'ElmessiriSemibold-2O74K',
                    color: 'white',
                    // color: active == 2 ? 'yellow' : 'white',
                  }}>
                  Trailers
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{width: 20}} />
          </ScrollView>
        </LinearGradient>

        <GestureRecognizer
          onSwipeLeft={state => onSwipeLeft(state)}
          onSwipeRight={state => onSwipeRight(state)}
          config={config}>
          {active == 1 ? (
            <ImageBackground
              source={{uri: backImg}}
              style={{
                resizeMode: 'repeat',
                justifyContent: 'center',
              }}>
              <Movies navigation={props.navigation} screenNumber={2} />
            </ImageBackground>
          ) : null}
          {active == 2 ? (
            <ImageBackground
              source={{uri: backImg}}
              style={{
                resizeMode: 'repeat',
                justifyContent: 'center',
              }}>
              <Movies navigation={props.navigation} screenNumber={1} />
            </ImageBackground>
          ) : null}

          {active == 5 ? (
            <ImageBackground
              source={{uri: backImg}}
              style={{
                resizeMode: 'cover',
                justifyContent: 'center',
              }}>
              <Trailers navigation={props.navigation} />
            </ImageBackground>
          ) : null}

          {active == 4 ? (
            <ImageBackground
              source={{uri: backImg}}
              style={{
                resizeMode: 'repeat',
                justifyContent: 'center',
              }}>
              <Movies navigation={props.navigation} screenNumber={4} />
            </ImageBackground>
          ) : null}

          {active == 3 ? (
            <ImageBackground
              source={{uri: backImg}}
              style={{
                resizeMode: 'repeat',
                justifyContent: 'center',
              }}>
              <Movies navigation={props.navigation} screenNumber={5} />
            </ImageBackground>
          ) : null}

          {/**
           *  */}
        </GestureRecognizer>
        <SearchArea
          updateDestCB={updateDestinationInuptState}
          disable={loading}
          navigation={props.navigation}
          search={isSearch}
          setSearch={setSearch}
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
      </View>
    </View>
  );
}

export default MainScreen;
