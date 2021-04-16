import React, {useState, useEffect} from 'react';
import {mainMapScreenStyling} from '../../styleSheeet/screenStyles';
import {movieListStyle, stylesMenuButton} from '../../styleSheeet/styles';
import SearchArea from '../SearchArea/SearchArea';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Dimensions, View, Text} from 'react-native';
import MoviesInterface from './MoviesInterface';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
function DiscoverMovies(props) {
  const [isSearch, setIsSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const updateDestinationInuptState = destination => {
    //this.setState({ destination });
    // this.onChangeDestinationDebounced(destination);
  };
  const setSearch = () => {
    setIsSearch(false);
  };
  return (
    <ScrollView>
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
          backgroundColor={isSearch ? 'white' : '#002a52'}
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
          height: Dimensions.get('screen').height / 8.2,
          // backgroundColor: 'green',
        }}
      />
      <View style={{zIndex: -2}}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{marginBottom: 2}}
          colors={['#01083d', 'skyblue']}>
          <Text style={movieListStyle.text4}>Popular Movies</Text>
        </LinearGradient>
        <MoviesInterface navigation={props.navigation} screenNumber={1} />

        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{marginVertical: 2}}
          colors={['#01083d', 'skyblue']}>
          <Text style={movieListStyle.text4}>Top Rated Movies</Text>
        </LinearGradient>
        <MoviesInterface navigation={props.navigation} screenNumber={3} />

        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{marginVertical: 2}}
          colors={['#01083d', 'skyblue']}>
          <Text style={movieListStyle.text4}>Now Playing Movies</Text>
        </LinearGradient>
        <MoviesInterface navigation={props.navigation} screenNumber={2} />

        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#01083d', 'skyblue']}
          style={{marginVertical: 2}}>
          <Text style={movieListStyle.text4}>Upcoming Movies</Text>
        </LinearGradient>

        <MoviesInterface navigation={props.navigation} screenNumber={4} />
      </View>
      <View
        style={{
          height: 3,
          // backgroundColor: 'green',
        }}
      />
    </ScrollView>
  );
}

export default DiscoverMovies;
