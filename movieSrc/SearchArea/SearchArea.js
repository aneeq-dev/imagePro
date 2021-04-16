import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Alert,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  AsyncStorage,
  AppState,
  Dimensions,
} from 'react-native';

import axios from 'axios';
import {styles, stylesRectangle} from '../../styleSheeet/styles';
import store3 from '../../redux/store3';
import App from '../../App';
import {Image} from 'react-native';
import * as Animatable from 'react-native-animatable';
import SearchList from './SearchList';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {BackHandler} from 'react-native';

export default class SearchArea extends Component {
  ///AnimationRef;
  AnimationRef2;

  constructor(props) {
    super(props);
    this.state = {
      destination: '',
      done: false,
      search: false,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    // console.log('back pressed');
    // console.log('can : ', this.props.navigation.canGoBack());
    if (this.props.navigation.canGoBack()) {
      this.props.navigation.goBack();
    } else {
      if (this.props.search) {
        this.props.setSearch();
      } else {
        BackHandler.exitApp();
        return true;
      }
    }

    return true;
  }

  componentDidMount() {
    //this.props.search.addEventListener("change", this._onPress);
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.search !== this.props.search) {
      this._onPress();
    }
  };

  // this.languageSetter();

  languageSetter = async () => {
    let value = await AsyncStorage.getItem('lang');
    console.log('lang set is: ', value);
    if (!value) {
      console.log('yes');
      value = 'English';
    }

    store3.dispatch({
      type: 'LANGUAGE',
      payload: {
        language: value,
      },
    });
    App.updateMe2(value);
  };

  k = () => {
    console.log('calling:2 ');

    if (!this.state.done) {
      console.log('calling: ');
      this.languageSetter();
      this.setState({done: true});
    }
  };

  // this.lang2();

  _onPress = () => {
    this.setState({search: this.props.search});
    // this.AnimationRef.fadeIn();
    this.AnimationRef2.fadeIn();
    console.log('ddd: ', this.props.search);
  };

  /* componentDidUpdate() {
         this._onPress();
     }
 */
  //کے قریب سیلون تلاش کریں

  render() {
    const fadeIn = {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    };
    return (
      this.k(),
      (
        <View style={styles.searchSpan}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#01083d', 'skyblue']}
            style={stylesRectangle.rectangle}
          />

          {this.props.search ? (
            <View style={stylesRectangle.rectangle3} />
          ) : (
            <View style={stylesRectangle.rectangle2} />
          )}

          {this.props.search ? (
            <TextInput
              editable={true}
              placeholder={
                !(store3.getState().length === 0)
                  ? store3.getState()[0].language === 'English'
                    ? this.props.disable
                      ? 'Please wait...'
                      : 'Search Movies, Tv Shows or Actors...'
                    : this.props.disable
                    ? 'انتظار کریں... '
                    : '   ...کے قریب سیلون تلاش کریں         '
                  : this.props.disable
                  ? 'Please wait...'
                  : 'Search Movies, Tv Shows or Actors...'
              }
              value={this.state.destination}
              // autoFocus={true}
              clearButtonMode="always"
              onChangeText={destination => {
                console.log(destination);
                this.setState({destination});
                this.props.updateDestCB(destination);

                //
              }}
              onSubmitEditing={() => {
                //
                this.props.navigation.goBack();
                this.state.destination == ''
                  ? null
                  : this.props.navigation.navigate('SearchedRes', {
                      query: this.state.destination,
                      to: 'movie',
                      screenNumber: 1,
                    });
              }}
              style={{
                height: Math.round(Dimensions.get('window').height) * 0.08,
                width: Math.round(Dimensions.get('window').width / 1.37),
                position: 'absolute',
                top: 0,
                left: 0,
                fontSize: responsiveFontSize(2),
                fontFamily: 'ElmessiriSemibold-2O74K',
                marginLeft: Math.round(Dimensions.get('window').width) * 0.14,
                marginTop: Math.round(Dimensions.get('window').height) * 0.013,
                paddingLeft: 15,
                borderRadius: 5,
                backgroundColor: '#EEEEEE',
                fontWeight: '200',
                //  zIndex:20
              }}
            />
          ) : null}

          <Animatable.View
            animation={fadeIn}
            ref={ref => (this.AnimationRef2 = ref)}>
            {!this.props.search ? (
              <View style={{flex: 1}}>
                <Image
                  source={require('../../images/logo.png')}
                  style={{
                    height: Dimensions.get('screen').height / 21.2,
                    width: Dimensions.get('screen').width / 3.3,
                    left: Dimensions.get('screen').width / 3,
                    top: Dimensions.get('screen').height / 38,
                  }}
                />
              </View>
            ) : null}
          </Animatable.View>

          {this.props.disable ? (
            <ActivityIndicator style={styles.act} />
          ) : (
            console.log()
          )}
          {this.props.search ? (
            <SearchList
              query={this.state.destination}
              navigation={this.props.navigation}
              isSearch={this.state.search}
            />
          ) : null}
        </View>
      )
    );
  }
}
