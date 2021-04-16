import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,

    // justifyContent: 'flex-end',
    //  alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: HEIGHT / 8,
    left: WIDTH / 90,
  },
  act: {
    position: 'absolute',
    top: Dimensions.get('window').height / 30,
    right: Dimensions.get('window').width / 20,
  },
  map2: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: 0,
    left: WIDTH / 90,
  },
  destinationInput: {
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
  },
  searchTextStyle: {
    paddingTop: 3,
    fontFamily: 'ElmessiriSemibold-2O74K',
  },

  searchTag: {
    color: 'white',
    marginRight: 10,
    fontSize: 16,
    fontFamily: 'ElmessiriSemibold-2O74K',
  },
  searchSpan: {
    height: Math.round(Dimensions.get('window').height) * 0.105,
    width: Math.round(Dimensions.get('window').width),
    position: 'absolute',
    top: 12,
    left: 0,
    backgroundColor: '#F9F9F9',
    fontFamily: 'ElmessiriSemibold-2O74K',
  },
  suggestions: {
    width: Dimensions.get('window').width,
    //height:Dimensions.get('window').height/11,
    elevation: 10,
    backgroundColor: '#ebebeb',
    //paddingLeft: Dimensions.get('window').width/14,
    paddingRight: Dimensions.get('window').width / 14,
    flex: 1,
    flexDirection: 'row',
    fontSize: responsiveFontSize(2),
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
  },
});

export {styles};
