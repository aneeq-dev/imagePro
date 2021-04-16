import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {mainMapScreenStyling} from '../../styleSheeet/screenStyles';
import {movieListStyle, stylesMenuButton} from '../../styleSheeet/styles';
import SearchArea from '../SearchArea/SearchArea';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MoviesInterface from './MoviesInterface';
import TVShowsInterface from './TVShowsInterface';
import PeopleInterface from './PeopleInterface';

function DiscoverPeople(props) {
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
          <Text style={movieListStyle.text4}>Popular People</Text>
        </LinearGradient>
        <PeopleInterface navigation={props.navigation} screenNumber={1} />
      </View>
      <View
        style={{
          height: 3,
          // backgroundColor: 'green',
        }}
      />
    </View>
  );
}

export default DiscoverPeople;
