import React, {useState, useRef, useEffect} from 'react';
// import all the components we are going to use
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  PanResponder,
  Animated,
} from 'react-native';
import Video from 'react-native-video';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesomei from 'react-native-vector-icons/FontAwesome';
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import {VideoPlayer, ProcessingManager} from 'react-native-video-processing';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import ViewShot from 'react-native-view-shot';
import {captureScreen} from 'react-native-view-shot';
import ImagePicker from 'react-native-image-crop-picker';
import CameraRoll from '@react-native-community/cameraroll';
import PhotoEditor from 'react-native-photo-editor';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Ionicons';

let CIRCLE_RADIUS = 36;

function Editor(props) {
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [duration2, setDuration2] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('content');
  const [minv, setMinv] = useState(0);
  const [maxv, setMaxv] = useState(0.1);
  const [img, setimg] = useState(null);
  const [crop, setcrop] = useState(false);

  const [x1, setx1] = useState(0.0);
  const [x2, setx2] = useState(0.0);
  const [y1, sety1] = useState(0.0);
  const [y2, sety2] = useState(0.0);

  const [pan, setPan] = useState(
    new Animated.ValueXY({
      x: -50.0,
      y: Dimensions.get('screen').height / 3,
    }),
  );
  const [pan2, setPan2] = useState(
    new Animated.ValueXY({
      x: Dimensions.get('screen').width / 1.2,
      y: Dimensions.get('screen').height / 3,
    }),
  );
  const [pan3, setPan3] = useState(
    new Animated.ValueXY({
      x: Dimensions.get('screen').width / 3,
      y: -30.0,
    }),
  );
  const [pan4, setPan4] = useState(
    new Animated.ValueXY({
      x: Dimensions.get('screen').width / 3,
      y: Dimensions.get('screen').height / 1.4,
    }),
  );

  const trim = source => {
    console.log('min: ', minv, maxv, source);
    const options = {
      startTime: minv,
      endTime: maxv,
      //  quality: VideoPlayer.Constants.quality.QUALITY_1280x720, // iOS only
      //  saveToCameraRoll: false, // default is false // iOS only
      // saveWithCurrentDate: false, // default is false // iOS only
    };
    ProcessingManager.trim(source, options) // like VideoPlayer trim options
      .then(data => {
        console.log('mm: ', data);

        props.navigation.navigate('     ', {
          datas: data,
        });
      });
  };

  const onSeek = seek => {
    //Handler for change in seekbar
    videoPlayer.current.seek(seek);
  };

  const onPaused = playerState => {
    //Handler for Video Pause
    console.log('pl: ', playerState);
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    //Handler for Replay

    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
    // setPaused(!paused);
    onPaused(0);

    onPaused(1);
    onPaused(0);

    onPaused(1);

    setPlayerState(PLAYER_STATES.PLAYING);
  };

  const onProgress = data => {
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = data => {
    setDuration(data.duration);
    //setDuration2(data.duration.toCeil());
    setIsLoading(false);
  };

  const onLoadStart = data => setIsLoading(true);

  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
    console.log('ed: ', PLAYER_STATES.ENDED);
  };

  const onError = () => alert('Oh! ', error);

  const exitFullScreen = () => {
    alert('Exit full screen');
  };

  const enterFullScreen = () => {};

  const onFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    if (screenType == 'content') setScreenType('cover');
    else setScreenType('content');
  };

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );

  const onSeeking = currentTime => setCurrentTime(currentTime);

  const onCapture = uri => {
    console.log('do something with ', uri);
  };

  const capture = () => {
    captureScreen({
      format: 'jpg',
      quality: 1,
    }).then(
      uri => {
        console.log('nn:', uri);
        setimg(uri);
        /* props.navigation.navigate('    ', {
          datas: uri,
        });*/

        PhotoEditor.Edit({
          path: '../../assets/noImage.png',
        });
      },
      error => console.error('Oops, snapshot failed', error),
    );
  };

  const compressVideo = (source, he, wi) => {
    console.log('mkm: ', source, he, wi);
    const options = {
      width: wi,
      height: he,
      bitrateMultiplier: 3,
      minimumBitrate: 300000,
      removeAudio: false, // default is false
    };
    ProcessingManager.compress(source, options) // like VideoPlayer compress options
      .then(data => {
        CameraRoll.save(data.source, {type: 'video'});
        alert('Video saved to local gallery!');
        console.log('hh: ', data);
      });
  };

  const openVideoCrop = () => {
    {
      /* captureScreen({
      format: 'jpg',
      quality: 0.8,
    }).then(
      uri => {
        console.log('nn:', uri);
        ImagePicker.openCropper({
          path: uri,
          width: 300,
          height: 400,
        }).then(image => {
          console.log(
            'kk: ',
            props.route.params.datas,
            image.cropRect.height,
            image.cropRect.width,
          );
          compressVideo(
            props.route.params.datas,
            image.cropRect.height,
            image.cropRect.width,
          );
        });
      },
      error => console.error('Oops, snapshot failed', error),
    );*/
    }
    setcrop(true);
  };

  let xx = -50.0;
  let yy = Dimensions.get('screen').height / 3;
  let end = -50;
  let ends = Dimensions.get('screen').width / 5;

  let panRes = PanResponder.create({
    //Step 2
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      pan.setValue({
        x:
          xx == 0 && gestureState.dx == 0
            ? gestureState.dx - gestureState.dx
            : gestureState.dx + xx,
        y: yy,
      });
    },
    onPanResponderRelease: (e, gesture) => {
      let m = xx + gesture.dx;
      m < end
        ? Animated.spring(
            //Step 1
            pan, //Step 2
            {
              toValue: {
                x: end,
                y: Dimensions.get('screen').height / 3,
              },
            }, //Step 3
          ).start()
        : m > ends
        ? Animated.spring(
            //Step 1
            pan, //Step 2
            {
              toValue: {
                x: ends,
                y: Dimensions.get('screen').height / 3,
              },
            }, //Step 3
          ).start()
        : (xx = xx + gesture.dx);
      m < end ? (xx = end) : m > ends ? (xx = ends) : null;
      yy = yy;
    },
  });

  let xx2 = Dimensions.get('screen').width / 1.2;
  let yy2 = Dimensions.get('screen').height / 3;
  let end2 = Dimensions.get('screen').width - 60;
  let ends2 = Dimensions.get('screen').width / 2;

  let panRes2 = PanResponder.create({
    //Step 2
    onStartShouldSetPanResponder: () => true,

    onPanResponderMove: (e, gestureState) => {
      pan2.setValue({
        x:
          xx2 == 0 && gestureState.dx == 0
            ? gestureState.dx - gestureState.dx
            : gestureState.dx + xx2,
        y: yy2,
      });
      console.log(end2, xx2 + gestureState.dx);
    },
    onPanResponderRelease: (e, gesture) => {
      let m = xx2 + gesture.dx;
      m > end2
        ? Animated.spring(
            //Step 1
            pan2, //Step 2
            {
              toValue: {
                x: end2,
                y: Dimensions.get('screen').height / 3,
              },
            }, //Step 3
          ).start()
        : m < ends2
        ? Animated.spring(
            //Step 1
            pan2, //Step 2
            {
              toValue: {
                x: ends2,
                y: Dimensions.get('screen').height / 3,
              },
            }, //Step 3
          ).start()
        : (xx2 = xx2 + gesture.dx);
      m > end2 ? (xx2 = end2) : m < ends2 ? (xx2 = ends2) : null;
      yy2 = yy2;
    },
  });

  let xx3 = Dimensions.get('screen').width / 3;
  let yy3 = -30.0;
  let end3 = Dimensions.get('window').height / 5;
  let end3s = -90.0;

  let panRes3 = PanResponder.create({
    //Step 2
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      pan3.setValue({
        x: xx3,
        y:
          yy3 + gestureState.dy > end3
            ? gestureState.dy - gestureState.dy + end3
            : yy3 + gestureState.dy,
      });
    },
    onPanResponderRelease: (e, gesture) => {
      let m = yy3 + gesture.dy;
      m > end3
        ? Animated.spring(
            //Step 1
            pan3, //Step 2
            {
              toValue: {
                x: Dimensions.get('screen').width / 3,
                y: end3,
              },
            }, //Step 3
          ).start()
        : m < end3s
        ? Animated.spring(
            //Step 1
            pan3, //Step 2
            {
              toValue: {
                x: Dimensions.get('screen').width / 3,
                y: end3s,
              },
            }, //Step 3
          ).start()
        : (yy3 = yy3 + gesture.dy);
      xx3 = xx3;

      m > end3 ? (yy3 = end3) : m < end3s ? (yy3 = end3s) : null;

      //  yy3 = yy3 + gesture.dy;
    },
  });

  let xx4 = Dimensions.get('screen').width / 3;
  let yy4 = Dimensions.get('screen').height / 1.4;
  let end4 = Dimensions.get('window').height - 100;
  let end4s = Dimensions.get('window').height / 2;

  let panRes4 = PanResponder.create({
    //Step 2
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      pan4.setValue({
        x: xx4,

        y:
          yy4 + gestureState.dy > end4
            ? gestureState.dy - gestureState.dy + end4
            : yy4 + gestureState.dy,
      });
    },
    onPanResponderRelease: (e, gesture) => {
      let m = yy4 + gesture.dy;
      m > end4
        ? Animated.spring(
            //Step 1
            pan4, //Step 2
            {
              toValue: {
                x: Dimensions.get('screen').width / 3,
                y: end4,
              },
            }, //Step 3
          ).start()
        : m < end4s
        ? Animated.spring(
            //Step 1
            pan4, //Step 2
            {
              toValue: {
                x: Dimensions.get('screen').width / 3,
                y: end4s,
              },
            }, //Step 3
          ).start()
        : (yy4 = yy4 + gesture.dy);

      xx4 = xx4;

      m > end4 ? (yy4 = end4) : m < end4s ? (yy4 = end4s) : null;
    },
  });

  const onCropDone = () => {
    let height = 0.0;
    let width = 0.0;

    console.log(
      '\nx1/y1 ',
      Math.abs(xx),
      yy,
      '\nx2,y2: ',
      xx2,
      yy2,
      '\nx3,y3: ',
      xx3,
      yy3,
      '\nx4,y4: ',
      xx4,
      yy4,
      '\n',
      xx2 - xx,
      '\n',
      yy4 - yy3,
      '\n\n',
    );

    height = yy4 - yy3;
    width = xx2 - xx;

    console.log('height/ width: ', height, width);

    compressVideo(props.route.params.datas, height, width);
    setcrop(false);
  };

  const renderDraggable = () => {
    return (
      <Animated.View
        {...panRes.panHandlers} //Step 1
        style={[
          {
            transform: pan.getTranslateTransform(),
          },
          styles.circle,
        ]}>
        <View
          style={{
            height: Dimensions.get('screen').height,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(144,144,0,0.2)',
          }}>
          <View
            style={{
              backgroundColor: 'grey',
              height: Dimensions.get('screen').height / 1.5,
              width: 10,
            }}>
            <Text />
          </View>
        </View>
      </Animated.View>
    );
  };

  const renderDraggable2 = () => {
    return (
      <Animated.View
        {...panRes2.panHandlers} //Step 1
        style={[
          {
            transform: pan2.getTranslateTransform(),
          },
          styles.circle,
        ]}>
        <View
          style={{
            height: Dimensions.get('screen').height,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(144,144,0,0.2)',
          }}>
          <View
            style={{
              backgroundColor: 'grey',
              height: Dimensions.get('screen').height / 1.5,
              width: 10,
            }}>
            <Text />
          </View>
        </View>
      </Animated.View>
    );
  };

  const renderDraggable3 = () => {
    return (
      <Animated.View
        {...panRes3.panHandlers} //Step 1
        style={[
          {
            transform: pan3.getTranslateTransform(),
          },
          styles.circle,
        ]}>
        <View
          style={{
            width: Dimensions.get('screen').width,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(144,144,0,0.2)',
          }}>
          <View
            style={{
              backgroundColor: 'grey',
              width: Dimensions.get('screen').width / 1.5,
              //width: 10,
              height: 10,
            }}>
            <Text />
          </View>
        </View>
      </Animated.View>
    );
  };

  const renderDraggable4 = () => {
    return (
      <Animated.View
        {...panRes4.panHandlers} //Step 1
        style={[
          {
            transform: pan4.getTranslateTransform(),
          },
          styles.circle,
        ]}>
        <View
          style={{
            width: Dimensions.get('screen').width,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(144,144,0,0.2)',
          }}>
          <View
            style={{
              backgroundColor: 'grey',
              width: Dimensions.get('screen').width / 1.5,
              //width: 10,
              height: 10,
            }}>
            <Text />
          </View>
        </View>
      </Animated.View>
    );
  };

  return (
    <View>
      <ViewShot onCapture={u => onCapture(u)} captureMode="mount">
        <Video
          onEnd={onEnd}
          onLoad={onLoad}
          onLoadStart={onLoadStart}
          onProgress={onProgress}
          paused={paused}
          ref={videoPlayer}
          resizeMode={screenType}
          onFullScreen={isFullScreen}
          source={{
            uri: props.route.params.datas,
          }}
          style={styles.mediaPlayer}
          volume={10}
        />

        {crop ? null : (
          <View
            style={{
              // backgroundColor: 'rgba(0,0,0,0)',
              bottom: 0,
              height: Dimensions.get('screen').height / 1.4,
            }}>
            <MediaControls
              duration={duration}
              isLoading={isLoading}
              fadeOutDelay={10000}
              mainColor="rgba(0,0,0,0.9)"
              onFullScreen={onFullScreen}
              onPaused={onPaused}
              onReplay={onReplay}
              onSeek={onSeek}
              onSeeking={onSeeking}
              playerState={playerState}
              progress={currentTime}
              toolbar={renderToolbar()}>
              <MediaControls.Toolbar>
                <View
                  style={{
                    position: 'absolute',
                    left: 60,
                    top: Dimensions.get('screen').height / 3.15,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      // setPhoto(false);
                      setMinv(minv == 0 ? 0 : minv - 0.01);
                    }}
                    style={{
                      height: 65,
                      width: 65,
                      backgroundColor: !true ? 'rgba(105, 77, 0,0.5)' : 'black',
                      borderRadius: 100,
                      // margin: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      transform: [{rotateY: '180deg'}],
                      //paddingTop: 2.5,
                    }}>
                    <FontAwesomei
                      name="scissors"
                      style={{
                        margin: 8,
                        fontSize: 23,
                        //  height: 22,
                        color: 'white',
                      }}
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    position: 'absolute',
                    right: 60,
                    top: Dimensions.get('screen').height / 3.15,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      // setPhoto(false);
                      setMaxv(maxv == duration ? duration : maxv + 0.01);
                    }}
                    style={{
                      height: 65,
                      width: 65,
                      backgroundColor: !true ? 'rgba(105, 77, 0,0.5)' : 'black',
                      borderRadius: 100,
                      // margin: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      //paddingTop: 2.5,
                    }}>
                    <FontAwesomei
                      name="scissors"
                      style={{
                        margin: 8,
                        fontSize: 23,
                        //  height: 22,
                        color: 'white',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </MediaControls.Toolbar>
            </MediaControls>
          </View>
        )}
      </ViewShot>

      {crop ? null : (
        <ScrollView
          style={{
            position: 'absolute',

            bottom: -Dimensions.get('screen').height / 27,
            left: Dimensions.get('screen').width / 24,
            width: Dimensions.get('screen').width,

            // textAlign: 'center',
            // top: 230,
            // left: 232,
            //  flexDirection: 'row',
            //  justifyContent: 'space-between',
            //  height: 118,

            //  backgroundColor: 'rgba(105, 77, 0,0.3)',
            //  justifyContent: 'center',
            // width: Dimensions.get('screen').width,
          }}>
          <MultiSlider
            isMarkersSeparated={true}
            enabledOne={true}
            enabledTwo={true}
            sliderLength={Dimensions.get('screen').width / 1.24}
            values={[minv, maxv]}
            step={0.01}
            showSteps={true}
            snapped={true}
            min={0}
            max={duration + 0.1}
            onValuesChange={v => {
              console.log(
                'values',
                v,
                ' duration:',
                duration,
                ' tofixed:',
                duration.toFixed(),
              );
              setMinv(v[0]);
              setMaxv(v[1]);
            }}
            onToggleOne={() => {
              console.log('fir');
            }}
            onToggleTwo={() => {
              console.log('sec');
            }}
          />
        </ScrollView>
      )}
      {crop ? null : (
        <View
          style={{
            position: 'absolute',

            // top: 230,
            // left: 232,
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 118,

            backgroundColor: 'rgba(105, 77, 0,0.3)',
            width: Dimensions.get('screen').width,
            zIndex: 11,
            // height: Dimensions.get('screen').height / 4,
          }}>
          <View
            style={{
              bottom: -Dimensions.get('screen').height / 6.5,
              left: -5,
              justifyContent: 'flex-start',

              //position: 'absolute',
              //left: -5,
              // top: 20,
            }}
          />
        </View>
      )}
      {crop ? null : (
        <View
          style={{
            position: 'absolute',

            bottom: -Dimensions.get('screen').height / 6.5,
            // top: 230,
            // left: 232,
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 118,

            backgroundColor: 'rgba(105, 77, 0,0.3)',
            justifyContent: 'center',
            width: Dimensions.get('screen').width,
            // height: Dimensions.get('screen').height / 4,
            zIndex: 10,
          }}>
          <View
            style={{
              position: 'absolute',
              bottom: 14,
              left: -5,
              justifyContent: 'flex-start',

              //position: 'absolute',
              //left: -5,
              // top: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                if (playerState == 0 || playerState == 1) {
                  onPaused(playerState == 0 ? 1 : 0);
                } else {
                  onReplay();
                  onReplay();
                }
              }}
              style={{
                height: 65,
                width: 65,
                backgroundColor: 'rgba(0,0,0,0.8)',
                borderRadius: 100,
                margin: 20,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 10,
                }}>
                {playerState == 0
                  ? 'Pause'
                  : playerState == 1
                  ? 'Play'
                  : 'Replay'}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              position: 'absolute',
              //  bottom: -50,
              //right: 32,
              top: 20,
              left: 90,
              //  width: 65,
              //padding: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                trim(props.route.params.datas);
              }}
              style={{
                height: 65,
                paddingTop: 15,

                backgroundColor: 'rgba(0,0,0,0.8)',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  fontSize: 14,
                  color: 'white',
                }}>
                Trim Selected Part {minv.toFixed(2)}-{maxv.toFixed(2)}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: 'absolute',
              right: 20,
              top: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                // setPhoto(false);
                openVideoCrop();
              }}
              style={{
                height: 65,
                width: 65,
                backgroundColor: !true
                  ? 'rgba(105, 77, 0,0.7)'
                  : 'rgba(0,0,0,0.9)',
                borderRadius: 100,
                // margin: 5,
                alignItems: 'center',
                justifyContent: 'center',
                //paddingTop: 2.5,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 10,
                }}>
                Crop
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: 'absolute',
              right: 32,
              top: -Dimensions.get('screen').height / 1.45,
              borderRadius: 200,
              backgroundColor: 'black',
            }}>
            <TouchableOpacity
              onPress={() => {
                capture();
              }}
              style={{
                // borderRadius: 100,
                // position: 'absolute',
                // top: 50,
                // zIndex: 10,
                //position: 'absolute',
                backgroundColor: 'rgba(105, 77, 0,0.0)',
                right: 0,
              }}>
              <Entypo.Button
                name={'pencil'}
                size={30}
                color={'white'}
                style={{
                  backgroundColor: 'black',
                  height: 65,
                  width: 65,
                  textAlign: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                  borderRadius: 100,
                  paddingLeft: 15,
                }}
                backgroundColor={'rgba(0,0,0,0)'}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {crop ? (
        <TouchableOpacity
          style={{
            // flex: 1,
            //position: 'absolute',
            right: -Dimensions.get('screen').width / 1.3,
            // bottom: 0,
            flexDirection: 'row',
          }}
          onPress={() => {
            onCropDone();
          }}>
          <Text
            style={{
              color: 'white',
              backgroundColor: 'grey',
              padding: 15,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}>
            Done
          </Text>
        </TouchableOpacity>
      ) : null}
      {crop ? renderDraggable() : null}
      {crop ? renderDraggable2() : null}
      {crop ? renderDraggable3() : null}
      {crop ? renderDraggable4() : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    position: 'absolute',
    // marginTop: Dimensions.get('screen').height / 2,
    // backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    bottom: 0,
  },
  mediaPlayer: {
    position: 'absolute',
    height: Dimensions.get('screen').height / 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    zIndex: 10,
    // backgroundColor: '#1abc9c',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width / 3.5,
    height: Dimensions.get('screen').height / 4.6,
    borderRadius: CIRCLE_RADIUS,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default Editor;
