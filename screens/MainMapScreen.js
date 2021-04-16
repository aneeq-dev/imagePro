import React, {Component} from 'react';
import {styles, stylesMenuButton} from '../styleSheeet/styles';

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
  AsyncStorage,
} from 'react-native';
import MapView, {Polyline, Marker, Callout, Circle} from 'react-native-maps'; // remove PROVIDER_GOOGLE
import Geolocation from '@react-native-community/geolocation';
import {request, PERMISSIONS} from 'react-native-permissions';
import {Dimensions} from 'react-native';
import apiKey from '../google_api_key';
import ip from '../ipadd/ip';
import _ from 'lodash';
import SearchArea from '../components/SearchArea';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {mainMapScreenStyling} from '../styleSheeet/screenStyles';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import MapViewDirections from 'react-native-maps-directions';
import axios from 'axios';

import store from '../redux/store';
import store3 from '../redux/store3';
import {Keyboard} from 'react-native';

export default class MainMapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // change the following values to zero of latitude and longitude
      //latitude: 0,
     // longitude: 0,
       latitude:31.4504,
      longitude:73.1350,
      destlatitude: 0,
      loading: true,
      destlongitude: 0,
      error: null,
      isAlerted: false,
      destination: '',
      predictions: [],
      pointCoords: [],
      coordinates: [],
      nearby: [],
      screenHeight: Math.round(Dimensions.get('window').height),
    };
    this.map = null;
    this.coordinates = [];
    this.onChangeDestinationDebounced = _.debounce(
      this.onChangeDestination,
      1000,
    );
  }

  /*,
	  {
		latitude: 31.4504,
		longitude: 73.1350,
	}*/

  componentDidMount() {
    this.anyRateSaloons();
    this.requestLocationPermission();
  }

  getLat = () => {
    return this.state.latitude;
  };
  getLon = () => {
    return this.state.longitude;
  };

  anyRateSaloons = async () => {
    try {
      const value = await AsyncStorage.getItem('loginkeysasa');
      console.log(value);
      const {data: responseJson} = await axios.get(
        'https://' + ip + '/api/appointments/getAnyAppWithRateRequired',
        {
          headers: {
            'x-auth-token': value,
          },
        },
      );

      if (!responseJson) {
        console.log('empty');
      } else {
        // window.location.href= "/saloonRating/"+responseJson._id+"/"+responseJson.saloonID+"/"+"2";
        console.log(responseJson);
        try {
          this.props.navigation.navigate('Ratin', {
            app_id: responseJson._id,
            id: responseJson.saloonID,
          });
        } catch (e) {
          console.log(e);
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  saveLocation = (latitu, longitu) => {
    console.log(latitu, longitu);
    store.dispatch({
      type: 'USER_LOCATION',
      payload: {
        location: {
          latitude: latitu,
          longitude: longitu,
        },
      },
    });
  };

  /*CheckConnectivity = () => {
		// For Android devices
		if (Platform.OS === "android") {
		  NetInfo.isConnected.fetch().then(isConnected => {
			if (isConnected) {
			  Alert.alert("You are online!");
			} else {
			  Alert.alert("You are offline!");
			}
		  });
		} else {
		  // For iOS devices
		  NetInfo.isConnected.addEventListener(
			"connectionChange",
			this.handleFirstConnectivityChange
		  );
		}
	  };*/

  requestLocationPermission = async () => {
    //this.CheckConnectivity();
    if (Platform.OS === 'android') {
      var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('android');
      if (response === 'granted') {
        this.locateCurrentPosition();
      }
    }
  };

  fetchAndPopulateSaloons = async () => {
    try {
      const {data: responseJson} = await axios.get(
        'https://' +
          ip +
          '/api/saloon/getNearbySaloons?lat=' +
          this.state.latitude +
          '&lng=' +
          this.state.longitude,
      );
      if (responseJson === 0) {
        // do nothing
      } else {
        this.setState({nearby: responseJson});
      }
    } catch (ex) {
      console.log(ex.response.data);
    }
  };

  locateCurrentPosition = () => {
    this.setState({loading: true});
    Alert.alert(
      store3.getState().length === 0 ||
        store3.getState()[0].language === 'English'
        ? 'Locating your location...'
        : 'ہم آپ کا مقام ڈھونڈ رہے ہیں ...',
      store3.getState().length === 0 ||
        store3.getState()[0].language === 'English'
        ? 'Please wait while we are locating your location... '
        : 'براہ کرم انتظار کریں جب تک ہم آپ کا مقام ڈھونڈ رہے ہیں…',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: true},
    );
    //The working next statement.
    Geolocation.getCurrentPosition(
      position => {
        //Your code here
        // console.log(JSON.stringify(position));
        // console.log(this.props);

        let initialPosition = {
        	latitude: 31.5204,
				longitude: 74.3587,
				destlatitude:31.5204,
				destlongitude:74.3587,
				latitudeDelta: 0.09,
				longitudeDelta: 0.035
			  };/**/
        if (this.props.route.params.screenNumber === 1) {
          initialPosition = {
           /* latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            destlatitude: position.coords.latitude,
            destlongitude: position.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.055 */
            latitude: 31.5204,
            longitude: 74.3587,
            destlatitude:31.5204,
            destlongitude:74.3587,
					latitudeDelta: 0.09,
					longitudeDelta: 0.035,
          };
        } else {
          initialPosition = {
            /*	latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						destlatitude:position.coords.latitude,
						destlongitude:position.coords.longitude,
						latitudeDelta: 0.09,
						longitudeDelta: 0.035,*/
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            destlatitude: this.props.route.params.latitude,
            destlongitude: this.props.route.params.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.055,
          };
        }

        //console.log("herenjn ",initialPosition);

        if (this.props.route.params.screenNumber === 1) {
          this.setState({latitude: initialPosition.latitude});
          this.setState({longitude: initialPosition.longitude});
        } else {
          this.setState({latitude: initialPosition.latitude});
          this.setState({longitude: initialPosition.longitude});
          this.setState({destlatitude: this.props.route.params.latitude});
          this.setState({destlongitude: this.props.route.params.longitude});
        }
        this.fetchAndPopulateSaloons();

        //	setInitialpos(initialPosition);
        this.setState({loading: false});

        //	}
        //console.log(initialPosition);
        //lat = initialPosition.latitude;
        //long =  initialPosition.longitude;
        this.setState({initialPosition});
        this.saveLocation(this.state.latitude, this.state.longitude);
        // this.getRouteDirections();
        // this.setState({latitude:position.coords.latitude});
        //this.setState({longitude:position.coords.longitude});
      },
      error => {
        //Your error handling here
        error => Alert.alert(error.message);
      }, // {
      //	enableHighAccuracy: true,
      //	timeout:15000,
      //	maximumAge:10000
      //}
    );

    /*	this.setState({loading:true});
        Geolocation.getCurrentPosition(
        position => {
           //  console.log(JSON.stringify(position));

            let initialPosition ={
              latitude: position.coords.latitude,
			  longitude: position.coords.longitude,
			  destlatitude:position.coords.latitude,
			  destlongitude:position.coords.longitude,
              latitudeDelta: 0.09,
			  longitudeDelta: 0.035,
			}
			console.log("herenjn ",initialPosition);
			this.setState({loading:false});
			this.setState({latitude:initialPosition.latitude});
			this.setState({longitude:initialPosition.longitude});
		//	}
			//console.log(initialPosition);
			//lat = initialPosition.latitude;
			//long =  initialPosition.longitude;
            this.setState({initialPosition});
		   // this.getRouteDirections();
		  // this.setState({latitude:position.coords.latitude});
		   //this.setState({longitude:position.coords.longitude});
		},
        error => Alert.alert(error.message),
        {enableHighAccuracy:true,timeout:100000,maximumAge:10000}
        )*/
  };

  //uncomment when you have the billing account set up
  getRouteDirections = async (destinationPlaceId, destinationName) => {
    //console.log(destinationName);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${destinationName}&key=${apiKey}`,
      );
      const json = await response.json();

      /* console.log('njnj: ', JSON.stringify(json, null, 4));
      const json = {
        results: [
          {
            address_components: [
              {
                long_name: 'Lahore',
                short_name: 'Lahore',
                types: ['locality', 'political'],
              },
              {
                long_name: 'Lahore',
                short_name: 'Lahore',
                types: ['administrative_area_level_2', 'political'],
              },
              {
                long_name: 'Punjab',
                short_name: 'Punjab',
                types: ['administrative_area_level_1', 'political'],
              },
              {
                long_name: 'Pakistan',
                short_name: 'PK',
                types: ['country', 'political'],
              },
            ],
            formatted_address: 'Lahore, Punjab, Pakistan',
            geometry: {
              bounds: {
                northeast: {
                  lat: 31.69848649999999,
                  lng: 74.5532399,
                },
                southwest: {
                  lat: 31.2673942,
                  lng: 74.1155387,
                },
              },
              location: {
                lat: 31.5203696,
                lng: 74.35874729999999,
              },
              location_type: 'APPROXIMATE',
              viewport: {
                northeast: {
                  lat: 31.69848649999999,
                  lng: 74.5532399,
                },
                southwest: {
                  lat: 31.2673942,
                  lng: 74.1155387,
                },
              },
            },
            place_id: 'ChIJ2QeB5YMEGTkRYiR-zGy-OsI',
            types: ['locality', 'political'],
          },
        ],
        status: 'OK',
      };*/
      this.setState({destlatitude: json.results[0].geometry.location.lat});
      this.setState({destlongitude: json.results[0].geometry.location.lng});

      {
        this.props.navigation.navigate('SearchedList', {
          lat: this.state.latitude,
          long: this.state.longitude,
          latdest: this.state.destlatitude,
          longdest: this.state.destlongitude,
          screenNumber: 3,
          place: destinationName,
        });
      }

      //console.log(this.state.destlatitude);
    } catch (error) {
      console.log(error);
    }
    /*https://maps.googleapis.com/maps/api/geocode/json?address=faisalabad&key=AIzaSyAeeHtNQU4UeNd-mr9JgYjVG3bFN6IBD4c
		/*try{
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/directions/json?
				origin=${this.state.longitude},${this.state.latitude}
				&destination=place_id:${destinationPlaceId}
				&key=${apiKey}`
			);
			const json = await response.json();
			console.log(json);
			const points = PolyLine.decode(json.routes[0].overview_polyline.points);
			console.log(points);

			const pointCoords = points.map(point => {
				console.log("la: ",point[0]," lo: ",point[1]);
				return {latitude:point[0], longitude:point[1]}
			});
			console.log(pointCoords);

			this.setState({pointCoords, predictions:[], destination: destinationName});
			console.log(this.state.pointCoords);
			//Keyboard.dismiss();
			//this.map.fitToCoordinates(pointCoords);
		}catch(error){
			console.error(error);
		}*/

    this.setState({predictions: []});
  };

  async onChangeDestination(destination) {
    this.setState({destination});
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}
		&input=${destination}
		&location=${this.state.latitude},${this.state.longitude}
		&radius=2000`;
    try {
      const result = await fetch(apiUrl); // calling the api
      const json = await result.json(); // storing json data from result
      /* const json2 = [
        {
          description: 'Lahore, Pakistan',
          matched_substrings: [[Object]],
          place_id: 'ChIJ2QeB5YMEGTkRYiR-zGy-OsI',
          reference: 'ChIJ2QeB5YMEGTkRYiR-zGy-OsI',
          structured_formatting: {
            main_text: 'Lahore',
            main_text_matched_substrings: [Array],
            secondary_text: 'Pakistan',
          },
          terms: [[Object], [Object]],
          types: ['locality', 'political', 'geocode'],
        },
        {
          description:
            'Allama Iqbal International Airport, Airport Road, Cantt, Lahore, Pakistan',
          matched_substrings: [[Object]],
          place_id: 'ChIJ5z8s8n0PGTkRA2uqQNr_140',
          reference: 'ChIJ5z8s8n0PGTkRA2uqQNr_140',
          structured_formatting: {
            main_text: 'Allama Iqbal International Airport',
            main_text_matched_substrings: [Array],
            secondary_text: 'Airport Road, Cantt, Lahore, Pakistan',
          },
          terms: [[Object], [Object], [Object], [Object], [Object]],
          types: ['airport', 'point_of_interest', 'establishment'],
        },
        {
          description: 'Heathrow Airport (LHR), Longford, UK',
          matched_substrings: [[Object]],
          place_id: 'ChIJ6W3FzTRydkgRZ0H2Q1VT548',
          reference: 'ChIJ6W3FzTRydkgRZ0H2Q1VT548',
          structured_formatting: {
            main_text: 'Heathrow Airport (LHR)',
            main_text_matched_substrings: [Array],
            secondary_text: 'Longford, UK',
          },
          terms: [[Object], [Object], [Object]],
          types: ['airport', 'point_of_interest', 'establishment'],
        },
        {
          description:
            'Lhr multan motor way, Multan - Faisalabad Motorway, Khanewal, Pakistan',
          matched_substrings: [[Object]],
          place_id: 'ChIJzcX_-PJVIzkRY-1tGDqDRcg',
          reference: 'ChIJzcX_-PJVIzkRY-1tGDqDRcg',
          structured_formatting: {
            main_text: 'Lhr multan motor way',
            main_text_matched_substrings: [Array],
            secondary_text: 'Multan - Faisalabad Motorway, Khanewal, Pakistan',
          },
          terms: [[Object], [Object], [Object], [Object]],
          types: ['police', 'point_of_interest', 'establishment'],
        },
        {
          description:
            'STARS ACADEMY LAHORE, Faisalabad Campus, Suhail Abad Batala Colony, Faisalabad, Pakistan',
          matched_substrings: [[Object]],
          place_id: 'ChIJDYbNughoIjkRZ1ogt9beYDo',
          reference: 'ChIJDYbNughoIjkRZ1ogt9beYDo',
          structured_formatting: {
            main_text: 'STARS ACADEMY LAHORE, Faisalabad Campus',
            main_text_matched_substrings: [Array],
            secondary_text: 'Suhail Abad Batala Colony, Faisalabad, Pakistan',
          },
          terms: [[Object], [Object], [Object], [Object], [Object]],
          types: ['point_of_interest', 'establishment'],
        },
      ];*/
      console.log('njkn', json.predictions);
      this.setState({
        // setting up state prediction array to predictions returned from google api
        predictions: json.predictions,
        //.predictions
      });
      //console.log
    } catch (err) {
      console.log(err);
    }
  }

  /*{this.state.loading && !this.state.isAlerted
    ? Alert.alert(
        'Locating your location...',
        'Please wait while we are locating your location... ',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: true},
      ) && this.setState({isAlerted: true})
    : console.log()}*/

  updateDestinationInuptState = destination => {
    this.setState({destination});
    this.onChangeDestinationDebounced(destination);
  };

  render() {
    let marker = null;

    if (this.state.pointCoords.length > 1) {
      marker = (
        <Marker
          coordinate={this.state.pointCoords[this.state.pointCoords.length - 1]}
        />
      );
    }

    const predictions = this.state.predictions.map(prediction => (
      <TouchableHighlight
        onPress={() => {
          this.getRouteDirections(
            prediction.place_id,
            prediction.structured_formatting.main_text,
          );
        }}
        key={prediction.place_id}>
        <View style={styles.suggestions}>
          <Entypo.Button
            name={'location'}
            size={23}
            color={'black'}
            style={mainMapScreenStyling.locationIcon}
            backgroundColor={'#ebebeb'}
          />
          <Text style={mainMapScreenStyling.predictions}>
            {prediction.structured_formatting.main_text} {'\n'}
            <Text style={mainMapScreenStyling.predictionFont}>
              {prediction.structured_formatting.secondary_text}
            </Text>
          </Text>

          <View style={mainMapScreenStyling.gap} />
        </View>
      </TouchableHighlight>
    ));

    //  const origin = {latitude:lat, longitude: long};
    //const destination = {latitude: 31.5204, longitude: 74.3587};

    let coordinate0 = {
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    };
    let coordinate1 = {
      latitude: this.state.destlatitude,
      longitude: this.state.destlongitude,
    };
    let coordinate2 = [
      {latitude: this.state.latitude, longitude: this.state.longitude},
      {latitude: this.state.destlatitude, longitude: this.state.destlongitude},
    ];

    //console.log("coord0: ",coordinate0);
    // console.log("coord1: ",coordinate1);
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator
            size={'large'}
            style={mainMapScreenStyling.ActivityIndicator}
          />
        ) : (
          <MapView
            ref={ref => {
              this.map = ref;
            }}
            region={
              this.props.route.params.screenNumber === 2
                ? null
                : this.state.initialPosition
            }
            showsUserLocation
            //onLayout = {() => this.map.fitToCoordinates(coordinate2, { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: false })}
            style={
              this.props.route.params.screenNumber === 1
                ? styles.map
                : styles.map2
            }
            showsCompass>
            {coordinate1.latitude === 0 ||
            coordinate1.longitude === 0 ? null : ( //do nothing
              <Marker
                coordinate={{
                  latitude: coordinate1.latitude,
                  longitude: coordinate1.longitude,
                }}>
                <Callout>
                  <Text>Saloon Location</Text>
                </Callout>
              </Marker>
            )}

            <Circle
              center={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
              }}
              radius={3500}
              fillColor={'rgba(0,137,110,0.11)'}
              strokeWidth={3}
              lineCap={'round'}
              lineJoin={'round'}
              strokeColor={'green'}
            />

            {this.state.nearby.length === 0 ||
            this.props.route.params.screenNumber === 2
              ? console.log()
              : //,
                this.state.nearby.map(
                  saloon => (
                    console.log(saloon),
                    (
                      <Marker
                        coordinate={{
                          latitude: saloon.saloonAddress.saloonLat,
                          longitude: saloon.saloonAddress.saloonlng,
                        }}
                        onPress={() => {
                          //console.log(saloon);
                          //this.setState({loading:true});

                          this.props.navigation.navigate('Profile', {
                            app_id: 0,
                            id: saloon._id,
                            name: saloon.saloonName,
                            screenNumber: 1,
                          });

                          /*lat: this.state.latitude,
										long:this.state.longitude,
										latdest:this.state.destlatitude,
										longdest:this.state.destlongitude,
										screenNumber:3
									});*/
                        }}>
                        <Image
                          source={require('../images/scissors.png')}
                          style={mainMapScreenStyling.saloonIcon}
                        />
                      </Marker>
                    )
                  ),
                )}
            <Polyline
              coordinates={this.state.pointCoords}
              strokeWidth={2}
              strokeColor="red"
            />

            {coordinate0.latitude === 0 ||
            coordinate0.longitude === 0 ||
            (coordinate1.latitude === 0 || coordinate1.longitude === 0) ||
            coordinate0.latitude === coordinate1.latitude ||
            this.props.route.params.screenNumber === 1 ? (
              console.log()
            ) : (
              <MapViewDirections
                mode="WALKING"
                origin={coordinate0}
                destination={coordinate1}
                onError={errorMessage => {
                  console.log('GOT AN ERROR');
                }}
                onReady={() => {
                  this.map.fitToCoordinates(coordinate2, {
                    edgePadding: {
                      right: 10,
                      bottom: 10,
                      left: 10,
                      top: 10,
                    },
                  });
                }}
                region="Pakistan"
                apikey={apiKey}
                strokeWidth={3}
                strokeColor="red"
              />
            )}

            {marker}
          </MapView>
        )}
        {this.props.route.params.screenNumber === 1 ? (
          <SearchArea
            updateDestCB={this.updateDestinationInuptState}
            disable={this.state.loading}
          />
        ) : (
          console.log()
        )}

        {this.props.route.params.screenNumber === 1 ? (
          <View style={stylesMenuButton.menuPos}>
            <FontAwesome5.Button
              name={'bars'}
              size={23}
              color={'black'}
              style={mainMapScreenStyling.barsicon}
              backgroundColor={'white'}
              onPress={() => this.props.navigation.toggleDrawer()}
            />
          </View>
        ) : (
          console.log()
        )}

        <ScrollView
          onScroll={() => Keyboard.dismiss()}
          style={mainMapScreenStyling.pred}>
          {predictions}
        </ScrollView>
      </View>
    );
  }
}
