import React from 'react';
import {ActivityIndicator, Dimensions, FlatList} from 'react-native';
import {View, Text} from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import not from '../../images/sideDrawerImage.jpg';

function Cast(props) {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#2b1100', '#948000']}
      style={{
        //height: Dimensions.get('screen').height / 2.6,
        padding: 10,
        margin: 2,
        borderRadius: 5,
      }}>
      {props.searching ? (
        <ActivityIndicator color={'white'} />
      ) : props.data &&
        props.data[0] &&
        props.data[0].cast &&
        props.data[0].cast.length == 0 &&
        !props.searching ? (
        <Text
          style={{
            textAlign: 'center',
            color: 'gold',
          }}>
          Not Found!
        </Text>
      ) : (
        props.data &&
        props.data[0] &&
        props.data[0].cast && (
          <FlatList
            //style={{backgroundColor: 'rgba(0,33,99,0.4)'}}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            //numColumns={2}
            // scrollToIndex={index}
            data={props.data[0].cast}
            renderItem={({item, index}) => (
              <View
                key={index}
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
                        index == props.data[0].cast.length - 1 ? 15 : 0,
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
            )}
          />
        )
      )}
    </LinearGradient>
  );
}

/**
 * 
 *  <ScrollView horizontal={true}>
          {!(props.data.length == 0) &&
            props.data[0].cast.map((item, i) =>
              i < 9 ? (
                <View
                  key={i}
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
              ) : null,
            )}
        </ScrollView>
 */

/**
 * 
 *   <View key={i} style={{}}>
            {item.profile_path ? (
              <FastImage
                source={{
                  uri:
                    'https://image.tmdb.org/t/p/original' + item.profile_path,
                }}
                style={{
                  backgroundColor: 'skyblue',
                  height: Dimensions.get('screen').height / 3.4,
                  width: '36%',
                  // borderTopLeftRadius: 50,
                  //borderBottomLeftRadius: 0,
                  borderRadius: 10,
                }}
              />
            ) : (
              <FastImage
                source={not}
                style={{
                  backgroundColor: 'skyblue',
                  height: Dimensions.get('screen').height / 3.4,
                  width: '36%',
                  borderRadius: 10,
                }}
              />
            )}
          </View>
       
 * 
 */

export default Cast;
