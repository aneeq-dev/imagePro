import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Switch,
} from 'react-native';
import {mainMapScreenStyling} from '../../styleSheeet/screenStyles';
import {movieListStyle, stylesMenuButton} from '../../styleSheeet/styles';
import SearchArea from '../SearchArea/SearchArea';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions} from 'react-native';
import SavesInterface from './SavesInterface';

function MySaves(props) {
  const [isSearch, setIsSearch] = useState(false);
  const [active, setActive] = useState(1);

  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const scrollRef = useRef();
  const [isEnabled, setIsEnabled] = useState(1);

  const updateDestinationInuptState = destination => {
    //this.setState({ destination });
    // this.onChangeDestinationDebounced(destination);
  };

  const onSwipeLeft = gestureState => {
    if (active < 3) {
      setActive(active + 1);
      // console.log('You swiped left!', active);
      handleClick2(active, 2);
    }
  };
  const onSwipeRight = gestureState => {
    if (active > 1) {
      setActive(active - 1);
      //  console.log('You swiped ri!', active);
      handleClick2(active, 1);
    }
  };

  const handleClick2 = (number, i) => {
    //console.log('s: ', number);
    if (scrollRef)
      if (number == 1) {
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
      } else if (number == 2 && i == 2) {
        scrollRef.current.scrollTo({
          x: 200,
          y: 0,
          animated: true,
        });
      }
  };
  const setSearch = () => {
    setIsSearch(false);
  };

  const toggleSwitch = () => {};
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
                My Movies
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
                My Tv Shows
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
                My Persons
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{width: 20}} />
        </ScrollView>
      </LinearGradient>

      {active == 1 || active == 2 ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['black', '#2b1100']}
          style={{
            //  marginTop: Dimensions.get('screen').height / 13,
            paddingVertical: 8,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={() => setIsEnabled(1)}>
              <Text
                style={{
                  marginHorizontal: 10,
                  textAlign: 'center',
                  color: '#ad9600',
                  fontSize: 18,
                  fontFamily: 'ElmessiriSemibold-2O74K',
                  borderStyle: 'solid',
                  borderWidth: isEnabled == 1 ? 1 : 0,
                  borderColor: 'yellow',
                  borderRadius: 10,
                  paddingHorizontal: 8,
                  paddingTop: 3,
                }}>
                Unwatched
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsEnabled(2)}>
              <Text
                style={{
                  marginHorizontal: 10,

                  textAlign: 'center',
                  color: '#ad9600',
                  fontSize: 18,
                  fontFamily: 'ElmessiriSemibold-2O74K',
                  borderStyle: 'solid',
                  borderWidth: isEnabled == 2 ? 1 : 0,
                  borderColor: 'yellow',
                  borderRadius: 10,
                  paddingHorizontal: 8,
                  paddingTop: 3,
                }}>
                Watched
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsEnabled(3)}>
              <Text
                style={{
                  marginHorizontal: 10,

                  textAlign: 'center',
                  color: '#ad9600',
                  fontSize: 18,
                  fontFamily: 'ElmessiriSemibold-2O74K',
                  borderStyle: 'solid',
                  borderWidth: isEnabled == 3 ? 1 : 0,
                  borderColor: 'yellow',
                  borderRadius: 10,
                  paddingHorizontal: 8,
                  paddingTop: 3,
                }}>
                More
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      ) : null}
      <GestureRecognizer
        onSwipeLeft={state => onSwipeLeft(state)}
        onSwipeRight={state => onSwipeRight(state)}
        config={config}>
        {active == 1 ? (
          <View style={{zIndex: -2}}>
            <SavesInterface
              navigation={props.navigation}
              screenNumber={1}
              enable={isEnabled}
            />
          </View>
        ) : null}

        {active == 2 ? (
          <View style={{zIndex: -2}}>
            <SavesInterface
              navigation={props.navigation}
              screenNumber={2}
              enable={isEnabled}
            />
          </View>
        ) : null}

        {active == 3 ? (
          <View style={{zIndex: -2}}>
            <SavesInterface navigation={props.navigation} screenNumber={3} />
          </View>
        ) : null}
      </GestureRecognizer>
    </View>
  );
}

export default MySaves;
