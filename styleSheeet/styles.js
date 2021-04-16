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

const stylesScreens = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  text: {
    fontSize: responsiveFontSize(4),
    position: 'absolute',
    left: WIDTH / 7,
    top: HEIGHT / 40,
  },
});

const movieListStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  text: {
    fontSize: responsiveFontSize(4),
    position: 'absolute',
    left: WIDTH / 7,
    top: HEIGHT / 40,
    fontFamily: 'ElmessiriSemibold-2O74K',
  },
  text2: {
    fontSize: responsiveFontSize(2.3),
    textAlign: 'center',
    fontFamily: 'ElmessiriSemibold-2O74K',
    color: 'white',
  },
  text3: {
    fontSize: responsiveFontSize(3.3),
    color: 'white',
    //textAlign:'center',
    paddingTop: 10,
    marginLeft: 15,
    marginBottom: 1,
    fontFamily: 'ElmessiriSemibold-2O74K',
  },
  text4: {
    fontSize: responsiveFontSize(2.8),
    color: 'white',
    //textAlign:'center',
    paddingTop: 10,
    paddingBottom: 2,

    marginLeft: 15,
    marginBottom: 1,
    fontFamily: 'ElmessiriSemibold-2O74K',
  },
});

const topBar = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b5c51',
    paddingTop: 20,
    paddingHorizontal: 2,
  },
  item: {
    height: Dimensions.get('window').height / 3.5,
    width: Dimensions.get('window').width / 1.3,
    marginTop: 10,
    marginHorizontal: 5,
    padding: 8,
    backgroundColor: '#d4d6d5',
    fontSize: responsiveFontSize(2),
  },
  label: {
    backgroundColor: '#182920',
    color: '#cbd1d4',
    height: Dimensions.get('window').height / 10,
    fontSize: responsiveFontSize(2.7),
    paddingLeft: Dimensions.get('window').width / 20,
    paddingTop: Dimensions.get('window').height / 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesOverall: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 10,
    paddingTop: Dimensions.get('window').height / 90,
    paddingLeft: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    backgroundColor: 'white',
  },
  heading: {
    paddingLeft: 5,
    color: 'black',
    fontSize: responsiveFontSize(2.4),
  },
  endView: {
    height: Dimensions.get('window').height / 8.5,
  },
});

const stylesMenuButton = StyleSheet.create({
  menuIcon: {
    zIndex: 9,
    position: 'absolute',
    top: 40,
    left: '20',
  },
  menuPos: {
    position: 'absolute',
    top: HEIGHT / 24,
    left: WIDTH / 50,
  },
  searchPos: {
    position: 'absolute',
    top: HEIGHT / 24,
    left: WIDTH / 1.14,
    zIndex: 10,
  },
  searchPos2: {
    position: 'absolute',
    top: HEIGHT / 24,
    left: WIDTH / 1.12,
    zIndex: 10,
  },
  searchPos3: {
    position: 'absolute',
    top: HEIGHT / 24,
    left: WIDTH / 1.33,
    backgroundColor: 'white',
    zIndex: 10,
  },
  searchPos4: {
    // position: 'absolute',
    //top: HEIGHT / 24,
    //height:20,
    //  backgroundColor:'green',
    //  left: WIDTH / 1.12,
    paddingTop: 4,
    paddingLeft: 5,
    zIndex: 10,
  },
});

const stylesRectangle = StyleSheet.create({
  rectangle: {
    position: 'absolute',
    width: WIDTH,
    height: HEIGHT / 8,
    top: -12,
    left: 0,
  },
  rectangle2: {
    position: 'absolute',
    width: WIDTH,
    height: HEIGHT / 10,
    top: 1,
    left: 0,
    backgroundColor: 'white',
  },
  rectangle3: {
    position: 'absolute',
    width: WIDTH,
    height: HEIGHT / 10,
    top: 1,
    left: 0,
    backgroundColor: '#002a52',
  },
  color: {backgroundColor: 'white'},
});

const stylesAppFile = StyleSheet.create({
  drawerStyle: {
    backgroundColor: '#005363',
    width: 340,
  },

  initialScreen: {height: 140},

  userImage: {
    width: 320,
    height: 140,
    margin: 0,
    position: 'absolute',
    top: 0,
    left: 0,
  },

  gap: {
    width: 105,
    height: 105,
    borderRadius: 100 / 2,
    backgroundColor: 'skyblue',
    position: 'relative',
    top: 13,
    left: 25,
  },

  userImage2: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    position: 'absolute',
    top: 15,
    left: 27,
  },

  nameText: {
    position: 'absolute',
    top: 40,
    left: 140,
    color: 'white',
    fontSize: responsiveFontSize(1.8),
  },
  phoneText: {
    position: 'absolute',
    top: 75,
    left: 140,
    color: 'yellow',
    fontSize: responsiveFontSize(1.6),
  },
  options: {backgroundColor: '#005363'},

  rectangle2: {
    position: 'absolute',
    width: WIDTH,
    height: HEIGHT / 10,
    top: 1,
    left: 0,
    backgroundColor: 'white',
  },
});

const categoriesStyling = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#3b5c51',
    paddingTop: 20,
    paddingHorizontal: 2,
  },
  flatListStyle: {
    width: '100%',
  },
  discount: {fontSize: responsiveFontSize(1.8), backgroundColor: 'red'},
  flatListStyle2: {
    width: '100%',
    // paddingStart:Dimensions.get('window').width/12,
    elevation: 10,
  },
  flatListImage: {
    height: Dimensions.get('window').height / 4,
    width: Dimensions.get('window').width / 1.3,
  },
  fontView: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 40,
    width: 50,
    borderRadius: 50,
  },
  GenderIcon: {
    justifyContent: 'center',
    backgroundColor: '#00cad1',
    borderRadius: 50,
  },
  topCard: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 23,
    width: 90,
    borderRadius: 2,
    backgroundColor: 'red',
    fontSize: responsiveFontSize(2),
  },
  salonBackHeight: {
    height: Dimensions.get('window').height / 6.5,
  },
  gap: {height: Dimensions.get('screen').height},
  alignRowWise: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
  },
  alignColWise: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  alignViewRowWise: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backColor: {backgroundColor: '#105c43'},
  label: {
    backgroundColor: '#182920',
    color: '#cbd1d4',
    height: Dimensions.get('window').height / 10,
    width: Dimensions.get('window').width / 1,
    fontSize: responsiveFontSize(2.5),
    paddingLeft: Dimensions.get('window').width / 20,
    paddingTop: Dimensions.get('window').height / 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label2: {
    backgroundColor: '#182920',
    color: '#cbd1d4',
    height: Dimensions.get('window').height / 10,
    width: Dimensions.get('window').width / 1,
    fontSize: responsiveFontSize(2.5),
    paddingRight: Dimensions.get('window').width / 20,
    paddingTop: Dimensions.get('window').height / 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actIndicator: {marginLeft: 8},
  item: {
    height: Dimensions.get('window').height / 4,
    width: Dimensions.get('window').width / 1.3,
    marginTop: 6,
    marginHorizontal: 5,
    backgroundColor: '#d4d6d5',
    fontSize: responsiveFontSize(2),
  },
  item2: {
    height: Dimensions.get('window').height / 4,
    // width: (Dimensions.get("window").width)/1.3,
    marginTop: 6,
    marginHorizontal: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#d4d6d5',
    fontSize: responsiveFontSize(2.2),
  },

  separator: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  separator2: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
    marginHorizontal: 10,
  },
  text: {
    fontSize: responsiveFontSize(2),
    color: 'black',
  },
  footer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  loadMoreBtn: {
    // zIndex: -1,
    height: 50,
    padding: 10,
    // backgroundColor: 'skyblue',
    borderRadius: 4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
  },

  flatListContainer: {
    // height: (Dimensions.get("window").height)/1.4,
    paddingBottom: 20,
    width: Dimensions.get('window').width / 1,
  },
  salonInfoBack: {
    height: Dimensions.get('window').height / 3,
    width: Dimensions.get('window').width / 1.3,
    backgroundColor: '#a1a1a1',
    marginHorizontal: 5,
  },
  salonInfoBack2: {
    height: Dimensions.get('window').height / 3,
    width: Dimensions.get('window').width / 1.3,
    backgroundColor: '#a1a1a1',
    marginHorizontal: 5,
  },
  salonInfoFront: {
    height: Dimensions.get('window').height / 5.7,
    width: Dimensions.get('window').width / 1.33,
    backgroundColor: '#105c43',
    fontSize: responsiveFontSize(2),
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 3,
  },
  salonName: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'normal',
    textAlign: 'center',
    color: 'black',
    fontFamily: 'verdana',
  },
  salonPrice: {
    fontSize: responsiveFontSize(2),
    padding: 5,
    fontWeight: 'normal',
    textAlign: 'justify',
    color: '#afe3e1',
    fontFamily: 'verdana',
  },
  salonPriceMin: {
    color: '#57eba9',
    fontSize: responsiveFontSize(2),
  },
  salonServices: {
    paddingLeft: 5,
    color: '#00cad1',
    fontSize: responsiveFontSize(2),
  },
});

const cartStyling = StyleSheet.create({
  containerBackColor: {backgroundColor: '#00cad1'},
  container: {
    backgroundColor: '#edfeff',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: Dimensions.get('window').width / 18,
    paddingBottom: Dimensions.get('window').height / 18,
    paddingTop: Dimensions.get('window').width / 7,
  },
  cartHead: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold',
    height: Dimensions.get('window').height / 16,
  },
  dealsCartOnlyForUpdate: {
    //flex: 1,
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    width: Dimensions.get('window').width / 1.9,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
  },
  dealsCartOnlyForUpdate2: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    //width: Dimensions.get('window').width / 1.3,
    justifyContent: 'space-evenly',
  },
  nameOfDeal: {
    flexDirection: 'row',
    paddingRight: 50,
    fontSize: responsiveFontSize(1.8),
  },
  nameOfDeal2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingLeft: 20,

    paddingRight: 50,
    fontSize: responsiveFontSize(1.8),
  },
  priceOfDeal: {fontSize: responsiveFontSize(1.8)},
  priceOfDeal2: {fontSize: responsiveFontSize(1.8), paddingRight: 20},

  screen2Deals: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'black',
    marginTop: Dimensions.get('window').height / 30,
  },
  screen2PriceText: {
    flexDirection: 'row',
    paddingRight: 50,
    fontWeight: 'bold',
    color: 'white',
    fontSize: responsiveFontSize(1.8),
  },
  price: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(1.8),
  },
});

const commentsStyling = StyleSheet.create({
  separator: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  container: {
    flex: 1,
    backgroundColor: '#d9fffb',
    paddingHorizontal: 2,
  },
  viewHeight: {flexDirection: 'row'},
  flatListStyle: {
    width: '100%',
    paddingTop: 5,
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
  },
  actIndicator: {marginLeft: 8},
  item: {
    height: Dimensions.get('window').height / 4,
    width: Dimensions.get('window').width / 1.3,
    marginTop: 6,
    marginHorizontal: 5,
    backgroundColor: '#d4d6d5',
    fontSize: responsiveFontSize(2),
  },
  appButtonContainer2: {
    elevation: 10,
    backgroundColor: '#cecfc0',
    paddingVertical: 10,
    paddingHorizontal: 12,
    flex: 1,
    alignItems: 'flex-start',
    marginVertical: Dimensions.get('window').height / 55,
  },
  appButtonText: {
    fontSize: responsiveFontSize(2),
    color: 'black',
    fontWeight: 'normal',
    textAlign: 'left',
  },
  renderContainer: {
    height: Dimensions.get('window').height / 20,
    backgroundColor: '#57eba9',
    paddingTop: Dimensions.get('window').height / 125,
  },
  renderItemText: {textAlign: 'center', textAlignVertical: 'center'},
  noReviewsFoundText: {
    textAlign: 'center',
    paddingTop: Dimensions.get('screen').height / 30,
  },
  gap: {height: Dimensions.get('screen').height / 40},
});

const datePickerStyling = StyleSheet.create({
  // ...
  appButtonContainer: {
    elevation: 10,
    backgroundColor: '#00cad1',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonContainer2: {
    elevation: 10,
    backgroundColor: '#00cad1',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    flex: 1,
  },
  appButtonText: {
    fontSize: responsiveFontSize(1.6),
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  label: {
    marginTop: Dimensions.get('window').height / 100,
    marginBottom: Dimensions.get('window').height / 200,

    backgroundColor: '#182920',
    color: '#cbd1d4',
    height: Dimensions.get('window').height / 13,
    fontSize: responsiveFontSize(2),
    paddingTop: Dimensions.get('window').height / 70,
    paddingRight: Dimensions.get('window').width / 20,
    paddingLeft: Dimensions.get('window').width / 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: responsiveFontSize(1.5),
    color: '#00544b',
    backgroundColor: '#d9fffb',
    padding: Dimensions.get('window').height / 55,
  },
  fromText: {
    fontSize: responsiveFontSize(3),
    color: '#00544b',
    textAlign: 'center',
    backgroundColor: '#d9fffb',
    padding: Dimensions.get('window').height / 55,
  },
  selectedTimings: {
    fontSize: responsiveFontSize(2),
    color: '#00544b',
    textAlign: 'center',
    backgroundColor: '#d9fffb',
    padding: Dimensions.get('window').height / 55,
  },
  color: {color: 'black'},
  dateSelected: {
    backgroundColor: '#d9fffb',
    paddingVertical: Dimensions.get('window').height / 30,
    alignItems: 'center',
  },
  row: {flex: 1, flexDirection: 'row'},
  dim: {paddingRight: Dimensions.get('window').height / 30},
});

const dealsStyling = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b5c51',
    paddingHorizontal: 2,
  },
  flatListStyle: {
    width: '100%',
  },
  flatListImage: {
    height: Dimensions.get('window').height / 4,
    width: Dimensions.get('window').width / 1.3,
  },
  fontView: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 40,
    width: 50,
    borderRadius: 50,
  },
  GenderIcon: {
    justifyContent: 'center',
    backgroundColor: '#00cad1',
    borderRadius: 50,
  },
  topCard: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 23,
    width: 90,
    borderRadius: 2,
    backgroundColor: 'red',
  },
  iconBackColor: {
    backgroundColor: 'black',
  },
  salonBackHeight: {
    height: Dimensions.get('window').height / 6.5,
  },
  alignRowWise: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
  },
  alignColWise: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  alignViewRowWise: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backColor: {backgroundColor: '#105c43'},
  label: {
    backgroundColor: '#182920',
    color: '#cbd1d4',
    height: Dimensions.get('window').height / 13,
    width: Dimensions.get('window').width / 1,
    fontSize: responsiveFontSize(2),
    paddingTop: Dimensions.get('window').height / 70,
    paddingRight: Dimensions.get('window').width / 20,
    paddingLeft: Dimensions.get('window').width / 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actIndicator: {marginLeft: 8},
  item: {
    height: Dimensions.get('window').height / 4,
    width: Dimensions.get('window').width / 1.3,
    marginTop: 6,
    marginHorizontal: 5,
    backgroundColor: '#d4d6d5',
    fontSize: responsiveFontSize(2),
  },
  separator: {
    height: 0.5,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  text: {
    fontSize: responsiveFontSize(2),
    color: 'black',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
  },

  flatListContainer: {
    height: Dimensions.get('window').height / 2.3,
    width: Dimensions.get('window').width / 1,
  },
  salonInfoBack: {
    height: Dimensions.get('window').height / 3,
    width: Dimensions.get('window').width / 1.3,
    backgroundColor: '#b8e2e6',
    marginHorizontal: 5,
  },
  salonInfoFront: {
    height: Dimensions.get('window').height / 5.7,
    width: Dimensions.get('window').width / 1.33,
    backgroundColor: 'black',
    fontSize: responsiveFontSize(2),
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 3,
  },
  salonName: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'normal',
    textAlign: 'center',
    color: 'black',
    fontFamily: 'verdana',
  },
  salonPrice: {
    fontSize: responsiveFontSize(2),
    padding: 5,
    fontWeight: 'normal',
    textAlign: 'justify',
    color: '#afe3e1',
    fontFamily: 'verdana',
  },
  salonPrice2: {
    fontSize: responsiveFontSize(1.4),
    padding: 5,
    fontWeight: 'normal',
    textAlign: 'justify',
    color: '#afe3e1',
    fontFamily: 'verdana',
  },
  salonPrice3: {
    fontSize: responsiveFontSize(1.4),
    padding: 5,
    fontWeight: 'normal',
    textAlign: 'justify',
    color: '#afe3e1',
    backgroundColor: 'black',
    fontFamily: 'verdana',
  },
  salonPriceMin: {
    color: '#57eba9',
    fontSize: responsiveFontSize(2),
  },
  salonServices: {
    paddingLeft: 5,
    color: '#00cad1',
    fontSize: responsiveFontSize(2),
  },
});

const galleryStyles = StyleSheet.create({
  // ...
  galleryImages: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3.5,
  },
  textStyle: {height: 1},
});

const menuStyling = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#3b5c51',
    paddingTop: 20,
  },
  bottomBarOverall: {
    width: Dimensions.get('window').width,
    backgroundColor: '#105c43',
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBarOverall: {
    width: Dimensions.get('window').width,
    backgroundColor: '#002426',
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewsTouchable: {
    width: Dimensions.get('window').width / 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewsIcon: {
    left: -12,
  },
  reviewsIconStyle: {
    backgroundColor: '#002426',
    left: 9,
  },
  galleryOverall: {
    position: 'absolute',
    right: Dimensions.get('window').width / 4,
  },
  bookOverall: {
    position: 'absolute',
    right: Dimensions.get('window').width / 33,
  },
  bookOverall2: {
    position: 'absolute',
    right: Dimensions.get('window').width / 100,
  },

  galleryText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  galleryIcon: {
    backgroundColor: '#002426',
    color: '#002426',
  },
  alignViewRowWise: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  salonBackHeight: {
    height: Dimensions.get('window').height / 6.5,
    backgroundColor: '#105c43',
  },
  salonInfoBack: {
    height: Dimensions.get('window').height / 3,
    backgroundColor: '#a1a1a1',
  },
  salonInfoFront: {
    height: Dimensions.get('window').height / 5.7,
    width: Dimensions.get('window').width / 1,
    backgroundColor: '#105c43',
    fontSize: responsiveFontSize(2),
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  topCard: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 23,
    width: 90,
    borderRadius: 2,
    backgroundColor: 'red',
  },
  backColor: {backgroundColor: '#105c43'},

  alignRowWise: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
  },
  alignColWise: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  salonName: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'normal',
    textAlign: 'center',
    color: '#57eba9',
    fontFamily: 'verdana',
    paddingLeft: 20,
  },
  salonPrice: {
    fontSize: responsiveFontSize(2),
    padding: 5,
    fontWeight: 'normal',
    textAlign: 'justify',
    color: '#afe3e1',
    fontFamily: 'verdana',
  },
  salonPrice2: {
    fontSize: responsiveFontSize(2),
    padding: 5,
    fontWeight: 'normal',
    textAlign: 'justify',
    color: 'black',

    fontFamily: 'verdana',
  },
  salonPrice3: {
    fontSize: responsiveFontSize(2),
    padding: 5,
    fontWeight: 'normal',
    textAlign: 'justify',
    color: '#afe3e1',
    width: Dimensions.get('screen').width / 2.3,
    fontFamily: 'verdana',
  },
  salonPrice5: {
    fontSize: responsiveFontSize(2),
    // padding: 5,
    fontWeight: 'normal',
    textAlign: 'justify',
    color: 'black',
    right: -Dimensions.get('screen').width / 10.5,
    width: Dimensions.get('screen').width / 4.5,
    fontFamily: 'verdana',
  },
  salonPrice4: {
    fontSize: responsiveFontSize(2),
    padding: 5,
    fontWeight: 'normal',
    textAlign: 'justify',
    color: 'black',
    width: Dimensions.get('screen').width / 2,
    fontFamily: 'verdana',
  },
  iconBackColor2: {
    backgroundColor: '#edfeff',
  },
  salonPriceMin: {
    color: '#57eba9',
    fontSize: responsiveFontSize(2),
  },
  salonServices: {
    paddingLeft: 5,
    color: '#00cad1',
    fontSize: responsiveFontSize(2),
  },
  flatListImage: {
    height: Dimensions.get('window').height / 3.6,
  },
  fontView: {
    position: 'absolute',
    top: 0,
    right: -Dimensions.get('window').height / 35,
    height: 40,
    width: 70,
    borderRadius: 50,
  },
  GenderIcon: {
    justifyContent: 'center',
    backgroundColor: '#00cad1',
    borderRadius: 50,
  },
  label: {
    marginBottom: Dimensions.get('window').height / 200,
    backgroundColor: '#182920',
    color: '#cbd1d4',
    height: Dimensions.get('window').height / 13,
    width: Dimensions.get('window').width / 1,
    fontSize: responsiveFontSize(2),
    paddingTop: Dimensions.get('window').height / 70,
    paddingRight: Dimensions.get('window').width / 20,
    paddingLeft: Dimensions.get('window').width / 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainContainer: {paddingTop: Dimensions.get('window').height / 90},
  serView: {backgroundColor: '#edfeff'},
  checkbox: {flex: 1, flexDirection: 'row'},
  price: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: 'red',
  },
});

const rateStyling = StyleSheet.create({
  container: {
    backgroundColor: '#cecfc0',
    paddingTop: Dimensions.get('window').height / 125,
  },
  head: {
    margin: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: responsiveFontSize(3),
  },
  comment: {margin: 10},
  textinput: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: Dimensions.get('screen').height / 4,
    margin: 5,
  },

  errors: {textAlign: 'justify', margin: 20, color: 'red'},
  ratebutton: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
  },
  ratebuttonactual: {
    height: Dimensions.get('window').height / 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 90,
    width: Dimensions.get('window').width / 1.4,
    borderWidth: 1,
    marginBottom: 6,
    backgroundColor: 'black',
    marginTop: Dimensions.get('window').height / 20,
    elevation: 20,
  },
  btntext: {fontSize: responsiveFontSize(2), color: 'white'},
});

const reqAppStyling = StyleSheet.create({
  // ...

  appButtonContainer2: {
    backgroundColor: 'black',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignContent: 'center',
    elevation: 10,
  },
  appButtonText: {
    fontSize: responsiveFontSize(2),
    height: Dimensions.get('window').height / 15,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    textTransform: 'uppercase',
  },
  label: {
    marginTop: Dimensions.get('window').height / 100,
    marginBottom: Dimensions.get('window').height / 200,
    backgroundColor: '#182920',
    color: '#cbd1d4',
    height: Dimensions.get('window').height / 13,
    fontSize: responsiveFontSize(2.5),
    paddingTop: Dimensions.get('window').height / 70,
    paddingRight: Dimensions.get('window').width / 20,
    paddingLeft: Dimensions.get('window').width / 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hints: {
    fontSize: responsiveFontSize(1.9),
    color: '#00544b',
    backgroundColor: '#d9fffb',
    padding: Dimensions.get('window').height / 55,
  },
  dim: {
    height: Dimensions.get('window').height / 25,
    backgroundColor: '#d9fffb',
  },
  gap: {
    height: Dimensions.get('window').height / 15,
    backgroundColor: '#d9fffb',
  },
});

const searchedlistStylist = StyleSheet.create({
  salonPrice: {
    fontSize: responsiveFontSize(2),
    padding: 5,
    fontWeight: 'normal',
    textAlign: 'justify',
    color: '#002426',
    fontFamily: 'verdana',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: '#002426',
  },
  salonServices: {
    paddingLeft: 5,
    color: '#0000c4',
    fontSize: responsiveFontSize(1.9),
  },
  texcolor: {color: 'white'},
  salonServices2: {
    paddingLeft: 5,
    color: '#002426',
    fontSize: responsiveFontSize(2.2),
    margin: 5,
  },
  TouchableOpacity: {
    backgroundColor: '#d9fffb',
    width: Dimensions.get('window').width / 1.05,
    borderRadius: 10,
    marginBottom: 10,
  },
  GenderIcon: {
    justifyContent: 'center',
    backgroundColor: '#00cad1',
    borderRadius: 0,
  },
  salonPriceMin: {
    color: 'brown',
    fontSize: responsiveFontSize(2.2),
  },
  saloonimage: {flexDirection: 'row', alignContent: 'center'},
  saloonimageactual: {
    width: Dimensions.get('window').width / 1.5,
    height: Dimensions.get('window').height / 5.5,
    borderRadius: 10,
    margin: 2,
  },
  maleiconview: {flex: 1, alignItems: 'flex-end', padding: 5},
  priceview: {flexDirection: 'row', alignItems: 'center'},
  pricetext: {
    flexDirection: 'row',
    paddingLeft: 5,
    color: '#002426',
    fontSize: responsiveFontSize(2.4),
    alignItems: 'flex-start',
  },
  pricetext2: {color: 'brown', fontSize: 17},
  overallrating: {
    flex: 1,
    fontSize: responsiveFontSize(2.4),
    paddingLeft: Dimensions.get('window').width / 10,
    padding: 5,
    fontWeight: 'normal',
    textAlign: 'justify',
    color: '#002426',
    fontFamily: 'verdana',
    alignItems: 'flex-end',
  },
  Viewm: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -Dimensions.get('screen').height / 60,
    marginBottom: Dimensions.get('screen').height / 30,
  },
  locationout: {
    height: Dimensions.get('window').height / 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: Dimensions.get('window').width / 1.06,
    borderWidth: 1,
    // marginBottom:6,
    backgroundColor: 'darkgreen',
    //marginTop:Dimensions.get('window').height/20,
    elevation: 5,
  },
  locicon: {backgroundColor: 'darkgreen'},
  getD: {fontSize: responsiveFontSize(2.3), color: 'white'},
});

const stylistsStyling = StyleSheet.create({
  // ...

  appButtonContainer2: {
    elevation: 10,
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignContent: 'center',
  },
  appButtonText: {
    fontSize: responsiveFontSize(2),
    height: Dimensions.get('window').height / 15,
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    textTransform: 'uppercase',
  },
  label: {
    marginTop: Dimensions.get('window').height / 100,
    marginBottom: Dimensions.get('window').height / 200,
    backgroundColor: '#182920',
    color: '#cbd1d4',
    height: Dimensions.get('window').height / 13,
    fontSize: responsiveFontSize(2),
    paddingTop: Dimensions.get('window').height / 70,
    paddingRight: Dimensions.get('window').width / 20,
    paddingLeft: Dimensions.get('window').width / 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hint: {
    fontSize: responsiveFontSize(1.8),
    color: '#00544b',
    backgroundColor: '#d9fffb',
    padding: Dimensions.get('window').height / 55,
  },
  listOfSaloonstext: {
    height: Dimensions.get('screen').height / 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stylistsview: {flex: 1, flexDirection: 'row', backgroundColor: '#026604'},
  stylistname: {
    flex: 1,
    justifyContent: 'flex-start',
    color: 'white',
    alignItems: 'flex-start',
    textAlign: 'center',
    margin: Dimensions.get('screen').height / 90,
  },
  rating: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'center',
    margin: Dimensions.get('screen').height / 90,
    color: '#b8e2e6',
  },
  selectStylisthint: {
    height: Dimensions.get('screen').height / 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {backgroundColor: '#00cad1'},
  height: {
    height: Dimensions.get('window').height / 10,
  },
});

export {
  styles,
  stylesScreens,
  stylesMenuButton,
  stylesRectangle,
  topBar,
  categoriesStyling,
  stylesAppFile,
  cartStyling,
  commentsStyling,
  datePickerStyling,
  dealsStyling,
  galleryStyles,
  menuStyling,
  rateStyling,
  reqAppStyling,
  searchedlistStylist,
  stylistsStyling,
  movieListStyle,
};
