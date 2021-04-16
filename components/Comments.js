import React, {useState, useEffect} from 'react';
import {AsyncStorage, View} from 'react-native';
import {
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Dimensions} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {commentsStyling} from '../styleSheeet/styles';
import axios from 'axios';
import ip from '../ipadd/ip';
import store3 from '../redux/store3';

function Comments(props) {
  const [loading, setLoading] = useState(true);
  const [serverData, setServerData] = useState([]);
  const [fetchingFromServer, setFetchingFromServer] = useState(false);
  const [offset, setOffset] = useState(1);
  const [loadMore, setLoadMore] = useState(true);
  const [haveMore1, setHaveMore1] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(
    () => {
      if (props.route.params.screenNumber == 1) {
        if (check()) {
          userInitData();
          load();
        } else {
          props.navigation.navigate('Login', {
            screenNumber: 4, // login for usage
          });
        }
      } else {
        load2();
      }
    },
    [offset],
    //  query for fetching category 2 server data
  );

  const check = async () => {
    if (await AsyncStorage.getItem('loginkeysasa')) {
      return true;
    } else {
      return false;
    }
  };

  const userInitData = async () => {
    // let storestate = store.getState();
    //console.log("mkm ",id);
    if (await AsyncStorage.getItem('loginkeysasa')) {
      const {data: responseJson} = await axios.get(
        'https://' + ip + '/api/customers/getCustomerDataForChange3',
        {
          headers: {
            'x-auth-token': await AsyncStorage.getItem('loginkeysasa'),
          },
        },
      );
      if (!responseJson) {
        console.log('no saloon data found');
      } else {
        console.log('dnkknd: ', responseJson);
        //setSaloondata(responseJson);
        setRating(responseJson.customerOverallRating);
        setLoading(false);
      }
    } else {
      //do no
    }
    //console.log(responseJson);
    // setLoading(false);
  };

  console.log('props i got: ', props.route.params.screenNumber);

  const load2 = async () => {
    {
      if (loadMore && props.route.params.screenNumber == 2) {
        //customer id store in redux store

        const value = await AsyncStorage.getItem('loginkeysasa');
        try {
          //  query for fetching category 1 server data
          const {data: responseJson} = await axios.get(
            'https://' +
              ip +
              '/api/reviews/getReviews?saloonID=' +
              props.route.params.id2 +
              '&pageNumber=' +
              offset,
            {
              headers: {
                'x-auth-token': value,
              },
            },
          );

          //  console.log(offset);
          console.log('response: ', responseJson);

          if (responseJson === 0) {
            console.log('empty');
          } else {
            //  console.log("reed: ",responseJson.length);
            if (responseJson.length === 6) {
              setHaveMore1(true);
            } else {
              setHaveMore1(false);
            }
            setServerData([...serverData, ...responseJson.slice(0 * 5, 1 * 5)]);
          }
        } catch (ex) {
          console.log(ex);
        }
        // console.log({data});
        // setCategory1ServerData([...category1serverData, ...responseJson]);
        setLoading(false);
        setLoadMore(false);
        setFetchingFromServer(false);
      }
    }
  };

  const load = async () => {
    {
      if (loadMore && props.route.params.screenNumber == 1) {
        //customer id store in redux store

        const value = await AsyncStorage.getItem('loginkeysasa');
        try {
          //  query for fetching category 1 server data
          const {data: responseJson} = await axios.get(
            'https://' +
              ip +
              '/api/reviews/getReviewsOfCustomerwrtAuth?' +
              'pageNumber=' +
              offset,
            {
              headers: {
                'x-auth-token': value,
              },
            },
          );

          //  console.log(offset);
          console.log('response: ', responseJson);

          if (responseJson === 0) {
            console.log('empty');
          } else {
            //  console.log("reed: ",responseJson.length);
            if (responseJson.length === 6) {
              setHaveMore1(true);
            } else {
              setHaveMore1(false);
            }
            setServerData([...serverData, ...responseJson.slice(0 * 5, 1 * 5)]);
          }
        } catch (ex) {
          console.log(ex);
        }
        // console.log({data});
        // setCategory1ServerData([...category1serverData, ...responseJson]);
        setLoading(false);
        setLoadMore(false);
        setFetchingFromServer(false);
      }
    }
  };

  renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={commentsStyling.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            if (haveMore1 && !(serverData.length === 0)) {
              //   setLoading(true);
              setFetchingFromServer(true);
              setOffset(offset + 1);
              setLoadMore(true);
            }

            //  loadMoreData()
          }}
          //On Click of button calling loadMoreData function to load more data
          style={commentsStyling.loadMoreBtn}
          //{{setOffset(offset+1)}}
        >
          <View style={commentsStyling.viewHeight}>
            <Text style={commentsStyling.btnText}>
              {serverData.length === 0
                ? store3.getState().length === 0 ||
                  store3.getState()[0].language === 'English'
                  ? 'No Reviews Found!'
                  : 'کوئی تبصرہ نہیں ملا'
                : haveMore1
                ? store3.getState().length === 0 ||
                  store3.getState()[0].language === 'English'
                  ? 'Load More'
                  : 'مزید لوڈ کریں'
                : store3.getState().length === 0 ||
                  store3.getState()[0].language === 'English'
                ? 'Results Ended'
                : 'نتائج ختم'}
            </Text>
            {fetchingFromServer && !(serverData.length === 0) ? (
              <ActivityIndicator
                color="white"
                style={commentsStyling.actIndicator}
              />
            ) : null}
          </View>
        </TouchableOpacity>
        <View style={commentsStyling.gap} />
        <View style={{height: Dimensions.get('screen').height / 10}} />
      </View>
    );
  };

  return (
    <View style={commentsStyling.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : !(serverData.length === 0) ? (
        <View>
          {props.route.params.screenNumber == 1 ? (
            <View style={{backgroundColor: '#cecfc0'}}>
              <Text style={{fontSize: 17, padding: 10, textAlign: 'center'}}>
                {store3.getState().length === 0 ||
                store3.getState()[0].language === 'English'
                  ? 'Your rating is ' + rating + ' stars!'
                  : 'آپ کی درجہ بندی ہے' + rating}
              </Text>
              <Rating
                type="star"
                startingValue={rating}
                ratingCount={5}
                readonly={true}
                imageSize={30}
                ratingTextColor="#105c43"
              />
            </View>
          ) : null}

          <FlatList
            style={commentsStyling.flatListStyle}
            keyExtractor={(item, index) => index.toString()}
            data={serverData}
            renderItem={({item, index}) => (
              <View>
                <View style={commentsStyling.renderContainer}>
                  {store3.getState().length === 0 ||
                  store3.getState()[0].language === 'English' ? (
                    <Text style={commentsStyling.renderItemText}>
                      {props.route.params.screenNumber == 2
                        ? item.customerID.name.toUpperCase()
                        : item.saloonID.saloonName.toUpperCase()}{' '}
                      reviewed{' '}
                      {props.route.params.screenNumber == 1 ? 'you' : null}
                    </Text>
                  ) : (
                    <Text style={commentsStyling.renderItemText}>
                      کی طرف سے جائزہ لیا گیا{' '}
                      {props.route.params.screenNumber == 2
                        ? item.customerID.name.toUpperCase()
                        : item.saloonID.saloonName.toUpperCase()}{' '}
                    </Text>
                  )}
                </View>
                <View>
                  <Rating
                    type="star"
                    startingValue={item.rating}
                    ratingCount={5}
                    readonly={true}
                    imageSize={30}
                    showRating
                    ratingTextColor="#105c43"
                  />
                </View>

                <View style={commentsStyling.appButtonContainer2}>
                  <Text style={commentsStyling.appButtonText}>
                    {store3.getState().length === 0 ||
                    store3.getState()[0].language === 'English'
                      ? 'Comment:'
                      : 'تبصرہ : '}
                  </Text>
                  <Text style={commentsStyling.appButtonText}>
                    {item.comment}
                  </Text>
                </View>
              </View>
            )}
            ItemSeparatorComponent={() => (
              <View style={commentsStyling.separator} />
            )}
            ListFooterComponent={renderFooter()}
          />
        </View>
      ) : (
        <View>
          <Text style={commentsStyling.noReviewsFoundText}>
            {' '}
            {store3.getState().length === 0 ||
            store3.getState()[0].language === 'English'
              ? 'No reviews found!'
              : 'کوئی تبصرہ نہیں ملا!'}
          </Text>
        </View>
      )}
    </View>
  );
}

export default Comments;
