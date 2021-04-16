import React from 'react';
import {ActivityIndicator, Dimensions, FlatList} from 'react-native';
import {View, Text} from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import not from '../../images/sideDrawerImage.jpg';

function Recommendations(props) {
  return (
    <View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#2b1100', '#948000']}
        style={{
          //height: Dimensions.get('screen').height / 2.6,
          padding: 10,
          paddingBottom: 15,
          paddingTop: 15,
          margin: 1,
          borderRadius: 1,
        }}>
        {props.searching ? (
          <ActivityIndicator color={'white'} />
        ) : props.data &&
          props.data.results &&
          props.data.results.length == 0 &&
          !props.searching ? (
          <Text
            style={{
              textAlign: 'center',
              color: 'gold',
            }}>
            Not Found!
          </Text>
        ) : props.data && !(props.data.results == null) ? (
          <FlatList
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            data={props.data.results}
            renderItem={({item, index}) => (
              <TouchableOpacity
                key={index}
                style={{
                  maxWidth: Dimensions.get('screen').width / 1.25,
                  marginLeft: 15,
                }}
                onPress={() => {
                  props.changeData(item.id);
                }}>
                {item.backdrop_path ? (
                  <View
                    style={{
                      height: Dimensions.get('screen').height / 3.8,
                      width: Dimensions.get('screen').width / 1.25,
                      marginRight:
                        index == props.data.results.length - 1 ? 15 : 0,
                    }}>
                    <FastImage
                      source={{
                        uri:
                          'https://image.tmdb.org/t/p/original' +
                          item.backdrop_path,
                      }}
                      style={{
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        height: Dimensions.get('screen').height / 3.8,
                        width: Dimensions.get('screen').width / 1.25,
                      }}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      height: Dimensions.get('screen').height / 3.55,
                      width: Dimensions.get('screen').width / 1.25,
                    }}>
                    <FastImage
                      source={not}
                      style={{
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        height: Dimensions.get('screen').height / 3.55,
                        width: Dimensions.get('screen').width / 1.25,
                      }}
                    />
                  </View>
                )}
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['black', '#2b1100']}
                  style={{
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 8,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 15,
                      color: '#ad9600',
                      fontFamily: 'ElmessiriSemibold-2O74K',
                      width: Dimensions.get('screen').width / 3,
                    }}>
                    {item.original_title ? item.original_title : item.name}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 15,
                      color: '#ad9600',
                      fontFamily: 'ElmessiriSemibold-2O74K',
                    }}>
                    Popularity: {item.vote_average * 10 + '%'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          />
        ) : null}
      </LinearGradient>
    </View>
  );
}

export default Recommendations;

/**
 *   <View>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#2b1100', '#948000']}
          style={{
            //height: Dimensions.get('screen').height / 2.6,
            padding: 10,
            margin: 5,
            borderRadius: 20,
          }}>
          {props.searching ? (
            <ActivityIndicator color={'white'} />
          ) : (
            <ScrollView horizontal={true}>
              {!(props.data.length == 0) &&
                props.data[0].cast.map((item, i) => (
                  <View
                    style={{
                      maxWidth: Dimensions.get('screen').width / 2.8,
                      //backgroundColor: 'green',
                      marginLeft: 15,
                    }}>
                    {item.profile_path ? (
                      <View
                        style={{
                          height: Dimensions.get('screen').height / 3.297,
                          width: Dimensions.get('screen').width / 2.8,
                          // backgroundColor: 'green',
                          marginRight:
                            i == props.data[0].cast.length - 1 ? 15 : 0,
                        }}>
                        <FastImage
                          source={{
                            uri:
                              'https://image.tmdb.org/t/p/original' +
                              item.profile_path,
                          }}
                          style={{
                            borderRadius: 10,
                            height: Dimensions.get('screen').height / 3.3,
                            width: Dimensions.get('screen').width / 2.8,
                          }}
                        />
                      </View>
                    ) : (
                      <View
                        style={{
                          height: Dimensions.get('screen').height / 3.297,
                          width: Dimensions.get('screen').width / 2.8,
                          // backgroundColor: 'green',
                        }}>
                        <FastImage
                          source={not}
                          style={{
                            borderRadius: 10,

                            height: Dimensions.get('screen').height / 3.3,
                            width: Dimensions.get('screen').width / 2.8,
                          }}
                        />
                      </View>
                    )}
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 15,
                        color: '#ad9600',
                        fontFamily: 'ElmessiriSemibold-2O74K',
                      }}>
                      {item.name}
                    </Text>
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      colors={['black', '#2b1100']}
                      style={{borderRadius: 10}}>
                      <View
                        style={
                          {
                            //  backgroundColor: 'grey',
                          }
                        }>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: '#948000',
                          }}>
                          as
                        </Text>
                        <View
                          style={{
                            height: 0.5,
                            backgroundColor: '#948000',
                          }}
                        />
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 13,
                            color: '#948000',
                            fontFamily: 'ElmessiriSemibold-2O74K',
                            paddingHorizontal: 5,
                            paddingVertical: 3,
                          }}>
                          {item.character}
                        </Text>
                      </View>
                    </LinearGradient>
                  </View>
                ))}
            </ScrollView>
          )}
        </LinearGradient>
      </View>
    
 */
