import React, {useState, useEffect, useRef} from 'react';
import {
  showFloatingBubble,
  showFloatingBubble2,
  hideFloatingBubble,
  requestPermission,
  initialize,
} from 'react-native-floating-bubble';

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
  ImageBackground,
  PanResponder,
  Animated,
  AsyncStorage,
  TouchableOpacity,
  DeviceEventEmitter,
  PermissionsAndroid,
} from 'react-native';
import {Dimensions} from 'react-native';
import {styles} from '../../styleSheeet/styles';
import {RNCamera} from 'react-native-camera';
import Orientation from 'react-native-orientation';
import RecordScreen from 'react-native-record-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Ionicons';

//import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import SoundRecorder from 'react-native-sound-recorder';
import axios from 'axios';
import Draggable from 'react-native-draggable';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import PushNotification from 'react-native-push-notification';

function MainScreen(props) {
  const [active, setActive] = useState(2);
  const [photo, setPhoto] = useState(true);
  const [vid, setVid] = useState(null);
  const [img, setImg] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [orientation, setOrientation] = useState(0);
  const [col, setCol] = useState('brown');
  const [ch, setch] = useState(false);
  const [initx, setinitx] = useState(10);
  const [inity, setinity] = useState(70);
  const [floatingBubble, setFloatingBubble] = useState(false);
  const [tr, settr] = useState(false);
  const [pan, setPan] = useState(new Animated.ValueXY());
  const [x, setx] = useState({x: 0, y: 0});
  const [y, sety] = useState(0);
  const [xP, setPX] = useState(false);
  const [istrue, setIstrue] = useState(false);

  let cameraRef = null;
  useEffect(() => {
    requestPermission()
      .then(() => console.log('Permission Granted'))
      .catch(() => console.log('Permission is not granted'));

    initialize().then(() => console.log('Initialized the bubble mange'));

    permit();

    // Show Floating Bubble: x=10, y=10 position of the bubble
  }, []);
  var cc = false;

  useEffect(() => {
    active == 3
      ? isRecording
        ? (stopRecordingScreen(), console.log('1'))
        : (recordScreen(), console.log('2'))
      : active == 2
      ? photo
        ? (console.log('6'), takePicture(cameraRef))
        : isRecording
        ? takeVideo(cameraRef, false)
        : takeVideo(cameraRef, true)
      : active == 1
      ? isRecording
        ? (onStopaudioRecord(), console.log('3'))
        : (onStartaudioRecord(), console.log('4', isRecording))
      : null;
  }, [ch]);

  useEffect(() => {
    PushNotification.configure({
      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('REMOTE NOTIFICATION ==>', notification); // process the notification here

        setch(!ch);
        setPX(!xP);
      },

      // Android only: GCM or FCM Sender ID
      senderID: '256218572662',
      popInitialNotification: true,
      requestPermissions: true,
    });
    // reg();
  }, []);

  useEffect(() => {
    PushNotification.configure({
      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('REMOTE NOTIFICATION ==>', notification); // process the notification here

        setch(!ch);
        setPX(!xP);
      },

      // Android only: GCM or FCM Sender ID
      senderID: '256218572662',
      popInitialNotification: true,
      requestPermissions: true,
    });
    // reg();
  }, [isRecording]);

  useEffect(() => {
    myMoviesNotWatched();
  }, []);

  const permit = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the storage');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  };
  /* useEffect(() => {
    orientation == 0
      ? (Orientation.lockToPortrait(), setActive(active))
      : orientation == 1
      ? (Orientation.lockToLandscapeLeft(), setActive(active))
      : orientation == 3
      ? (Orientation.lockToLandscapeRight(), setActive(active))
      : null;
  }, [orientation]);
*/

  useEffect(() => {
    /* isRecording
      ? setTimeout(() => {
          setCol(col == 'orange' ? 'brown' : 'orange');
        }, 1000)
      : null;*/
    if (istrue && isRecording && (active == 1 || active == 2)) {
      PushNotification.localNotification({
        //... You can use all the options from localNotifications
        id: '123',
        channelId: '123', // (required)
        title: 'Recording', // (optional)
        message: 'Press to Stop Recording.', // (required)
        subText: 'Stop Here',
        //actions: ['StopRecording'],
      });
      PushNotification.cancelLocalNotifications({id: '123'});
      // PushNotification.removeAllDeliveredNotifications();
    } else {
      setIstrue(true);
    }

    if (!isRecording) {
      PushNotification.removeAllDeliveredNotifications();
      // setch(!ch);
    }
  }, [isRecording, col]);

  PushNotification.createChannel({
    channelId: '123', // (required)
    channelName: 'My channel', // (required)
  });

  const reg = () => {
    // Register all the valid actions for notifications here and add the action handler for each action
  };

  const PendingView = () => (
    <View
      style={{
        flex: 1,
        //backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Waiting</Text>
    </View>
  );

  const handleStopFloating = () => {
    active == 3
      ? isRecording
        ? stopRecordingScreen()
        : recordScreen()
      : active == 2
      ? photo
        ? takePicture(cameraRef)
        : isRecording
        ? takeVideo(cameraRef, false)
        : takeVideo(cameraRef, true)
      : active == 1
      ? isRecording
        ? onStopaudioRecord()
        : onStartaudioRecord()
      : null;
  };

  DeviceEventEmitter.addListener('floating-bubble-press2', e => {
    // What to do when user press the bubble
    console.log('Press Bubble1');
    //setch(!ch);
  });

  DeviceEventEmitter.addListener('floating-bubble-press', e => {
    // What to do when user press the bubble
    console.log('Press Bubble0');
    // setch(!ch);
  });

  const [isOk, setIsOk] = useState(true);

  const onStartaudioRecord = async () => {
    setIsRecording(true);
    showIcon();
    //showIcon();
    SoundRecorder.start(SoundRecorder.PATH_CACHE + '/test.mp4').then(
      function() {
        console.log('started recording');
      },
    );
  };

  const myMoviesNotWatched = async () => {
    //  setLoading(true);
    try {
      //   const value = await AsyncStorage.getItem('loginkeysasa');
      const {data: responseJson} = await axios.get(
        'https://evening-refuge-96382.herokuapp.com/api/movies/getstatus',
      );
      console.log('people: ', responseJson.status);
      if (responseJson.status == 'false') {
        console.log('tyy:');
        setIsOk(false);
        props.navigation.navigate('   ');
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  const onStopaudioRecord = async () => {
    //  setch(false);
    try {
      removeIcon();
      setIsRecording(false);

      SoundRecorder.stop().then(function(result) {
        console.log('stopped recording, audio file saved at: ' + result.path);
        if (result.path) {
          props.navigation.navigate('  ', {
            datas: result.path,
          });
        }
      });
    } catch (ex) {
      console.log(ex);
    }

    // console.log('on st:', result);
  };

  const takePicture = async camera => {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    console.log(data.uri);

    setImg(data.uri);
  };

  const takeVideo = async (camera, i) => {
    let data = null;
    // setch(false);
    if (i == true) {
      setIsRecording(true);
      showIcon();
      const options = {
        quality: 0.5,
        base64: true,
        //  orientation: 'landscapeLeft',
      };
      data = await camera.recordAsync(options);
      // setVid(data);
      if (data.uri) {
        props.navigation.navigate('  ', {
          datas: data.uri,
        });
      }
      console.log('ddd:', data);
    } else {
      await camera.stopRecording();
      removeIcon();
      // setVid(data);
      // console.log('kmn: ', vid);
      setIsRecording(false);
      console.log('nnj: ', data);
    }
    //  eslint-disable-next-line
    //  console.log(data.uri);
  };

  const showIcon = () => {
    // showFloatingBubble(10, 10).then(() => console.log('Floating Bubble Added'));

    setFloatingBubble(true);
    // showFloatingBubble(20, 10).then(() => console.log('Floating Bubble Added'));
    showFloatingBubble(20, 10, 1).then(() =>
      console.log('Floating Bubble Added 2'),
    );
    showFloatingBubble(20, 10, 0).then(() =>
      console.log('Floating Bubble Added 1'),
    );
  };

  const removeIcon = () => {
    // Hide Floatin Bubble
    hideFloatingBubble().then(() => console.log('Floating Bubble Removed'));
    setFloatingBubble(false);
  };

  const recordScreen = () => {
    setIsRecording(true);
    showIcon();
    RecordScreen.startRecording().catch(error => console.error(error));
  };

  const stopRecordingScreen = async () => {
    // recording stop
    setIsRecording(false);
    setch(false);

    removeIcon();
    const res = await RecordScreen.stopRecording().catch(error =>
      console.warn(error),
    );

    if (res) {
      const url = res.result.outputURL;
      console.log('uuu:', url);
      props.navigation.navigate('  ', {
        datas: url,
      });
    }
  };

  MainScreen.update = () => {
    settr(true);
    // needed   to update
  };

  let xx = 0.0;
  let yy = 0.0;
  let end = Dimensions.get('window').height - 120;

  let panRes = PanResponder.create({
    //Step 2
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      pan.setValue({
        x:
          xx == 0 && gestureState.dx == 0
            ? gestureState.dx - gestureState.dx
            : gestureState.dx + xx,
        y:
          yy + gestureState.dy > end
            ? gestureState.dy - gestureState.dy + end
            : yy + gestureState.dy,
      });

      console.log(
        'oop: ',
        yy + gestureState.dy > end,
        yy + gestureState.dy,
        ' ',
        end,
      );
    },
    onPanResponderRelease: (e, gesture) => {
      let n = Dimensions.get('window').width / 2;
      if (gesture.dx < n) {
        // pan.setValue({ x: (gesture.dx-gesture.dx), y:pan.y });
        xx = 0 - 23;
      } else {
        xx = Dimensions.get('screen').width - 90;
        //pan.setValue({ x: (gesture.dx-gesture.dx)+xx, y:pan.y });
      }
      console.log('geture: ', gesture.dy);
      Animated.spring(
        //Step 1
        pan, //Step 2
        {
          toValue: {
            x: xx,
            y:
              yy + gesture.dy > end
                ? gesture.dy - gesture.dy + end - 70
                : yy + gesture.dy,
          },
        }, //Step 3
      ).start();

      yy = yy + gesture.dy;
    },
  });

  const renderDraggable = () => {
    return (
      <Animated.View
        {...panRes.panHandlers} //Step 1
        style={[
          {
            transform: pan.getTranslateTransform(),
          },
          stylesm.circle,
        ]}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Fullscreen')}
          style={{
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderStyle: 'solid',
            borderWidth: 2,
            height: 70,
            width: 70,
            borderRadius: 200,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 5,
          }}>
          <EntypoIcon
            name="dots-three-vertical"
            style={stylesm.actionButtonIcon}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <EntypoIcon
            name="circle"
            style={{
              fontSize: 20,
              marginRight: 70,
              height: 22,
              color: 'rgba(0,0,0,0.2)',
            }}
          />
          <EntypoIcon
            name="circle"
            style={{
              fontSize: 20,
              height: 22,
              color: 'rgba(0,0,0,0.2)',
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log('2');
            handleStopFloating();
          }}
          style={{
            backgroundColor: 'rgba(156, 0, 23,0.7)',
            height: 70,
            borderStyle: 'solid',
            borderWidth: 2,
            width: 70,
            borderRadius: 200,
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 5,
          }}>
          <Icon name="md-stop" style={stylesm.actionButtonIcon} />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: !isOk ? 'green' : null,
        //transform: [{rotate: '0deg'}],
      }}>
      {isOk && img ? (
        <View
          style={{
            position: 'absolute',
            zIndex: 2,
          }}>
          <Image
            source={{uri: img}}
            style={{
              margin: 5,
              backgroundColor: 'yellow',
              height: Dimensions.get('screen').height / 6.8,
              width: Dimensions.get('screen').width / 5,
            }}
          />
        </View>
      ) : null}
      {isOk && tr ? (
        <RNCamera
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            //transform: [{rotate: '90deg'}],
          }}
          type={
            orientation == 0
              ? RNCamera.Constants.Type.back
              : RNCamera.Constants.Type.front
          }
          // flashMode={RNCamera.Constants.FlashMode.on}
          //  captureAudio={true}
          orientation={RNCamera.Constants.Orientation.auto}
          playSoundOnCapture={true}
          playSoundOnRecord={true}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}>
          {({camera, status, recordAudioPermissionStatus}) => {
            if (status !== 'READY') return <PendingView />;
            cameraRef = camera;
            return (
              <View
                style={{
                  position: 'absolute',

                  bottom: 0,
                  // top: 230,
                  // left: 232,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  height: 118,

                  backgroundColor: 'rgba(105, 77, 0,0.3)',
                  justifyContent: 'center',
                  width: Dimensions.get('screen').width,
                  // height: Dimensions.get('screen').height / 4,
                }}>
                {active == 2 ? (
                  <View
                    style={{
                      position: 'absolute',
                      left: 30,
                      top: 28,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setPhoto(true);
                        settr(true);
                      }}
                      style={{
                        height: 20,
                        width: 70,
                        backgroundColor: photo
                          ? 'rgba(105, 77, 0,0.5)'
                          : 'rgba(0,0,0,0.6)',
                        borderRadius: 20,
                        // margin: 5,
                        marginBottom: 6,
                        paddingTop: 2.5,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: 'white',
                          fontSize: 10,
                        }}>
                        Photo
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setPhoto(false);
                        settr(true);
                      }}
                      style={{
                        height: 20,
                        width: 70,
                        backgroundColor: !photo
                          ? 'rgba(105, 77, 0,0.5)'
                          : 'rgba(0,0,0,0.6)',
                        borderRadius: 20,
                        // margin: 5,
                        marginBottom: 6,
                        paddingTop: 2.5,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: 'white',
                          fontSize: 10,
                        }}>
                        Video
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
                <TouchableOpacity
                  onPress={() =>
                    active == 3
                      ? isRecording
                        ? stopRecordingScreen()
                        : recordScreen()
                      : active == 2
                      ? photo
                        ? takePicture(camera)
                        : isRecording
                        ? takeVideo(camera, false)
                        : takeVideo(camera, true)
                      : active == 1
                      ? isRecording
                        ? onStopaudioRecord()
                        : onStartaudioRecord()
                      : null
                  }
                  style={{
                    height: 65,
                    width: 65,
                    backgroundColor: isRecording ? 'rgba(0,0,0,0.5)' : 'brown',
                    borderRadius: 100,
                    margin: 20,
                  }}
                />
                {active == 2 ? (
                  <View
                    style={{
                      position: 'absolute',
                      right: 30,
                      top: 32,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setOrientation(
                          orientation == 0
                            ? orientation + 1
                            : orientation == 1
                            ? orientation - 1
                            : null,
                        );
                      }}
                      style={{
                        height: 40,
                        width: 70,
                        backgroundColor: 'rgba(105, 77, 0,0.5)',

                        borderRadius: 20,
                        // margin: 5,
                        marginBottom: 6,
                        padding: 5,
                        paddingTop: 12.5,
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: 'white',
                          fontSize: 10,
                        }}>
                        Rotate
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            );
          }}
        </RNCamera>
      ) : null}

      {isOk && !tr ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.6)',
            marginHorizontal: 50,
            padding: 20,
            borderRadius: 20,

            top: Dimensions.get('screen').height / 1.8,
          }}>
          <Text
            style={{
              fontSize: 17,
              color: 'white',
            }}>
            Please activate any of the following{' '}
          </Text>
        </View>
      ) : null}
      {isOk ? (
        <View
          style={{
            position: 'absolute',
            bottom: 118,
            flexDirection: 'row',
            // top: Dimensions.get('screen').height / 1,
            // zIndex: 2,
            width: Dimensions.get('screen').width,
            backgroundColor: 'rgba(105, 77, 0,0.3)',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            // justifyContent: 'center',
            //  backgroundColor: 'rgba(0,0,0,0.4)',
            // height: Dimensions.get('screen').height / 4,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor:
                active == 1 ? 'rgba(209, 153, 0,0.6)' : 'rgba(105, 77, 0,0.7)',
              paddingVertical: 15,
              height: 52,
              //   width: 130,
            }}
            onPress={() => {
              setActive(1);
              alert('Voice Recorder Activated!');
              settr(true);
            }}>
            <Text
              style={{
                marginHorizontal: 41,
                fontWeight: 'bold',
              }}>
              VOICE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor:
                active == 2 ? 'rgba(209, 153, 0,0.6)' : 'rgba(105, 77, 0,0.7)',
              paddingVertical: 15,
              height: 52,
              //  width: 130,
            }}
            onPress={() => {
              alert('Camera Activated!');
              settr(true);

              setActive(2);
            }}>
            <Text
              style={{
                marginHorizontal: 41,
                fontWeight: 'bold',
              }}>
              VIDEO
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor:
                active == 3 ? 'rgba(209, 153, 0,0.6)' : 'rgba(105, 77, 0,0.7)',
              paddingVertical: 15,
              height: 52,
              //  width: 140,
            }}
            onPress={() => {
              setActive(3);
              settr(true);

              alert('Screen Recorder Activated!');
            }}>
            <Text
              style={{
                marginHorizontal: 41,
                fontWeight: 'bold',
              }}>
              SCREEN
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {!isOk ? (
        <View>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              textAlignVertical: 'center',
              marginTop: Dimensions.get('screen').height / 3,
            }}>
            You have no right to use this application. This is caused by the
            reason that, you are may be not liable to use this app, as
            application developer has stopped this application. Please contact
            the application developer for more details.
          </Text>
        </View>
      ) : null}

      {floatingBubble ? (
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderRadius: 20,
            right: 0,
            margin: 20,
            paddingHorizontal: 10,
            paddingVertical: 3,
          }}>
          <Text style={{color: 'white'}}>Recording</Text>
        </View>
      ) : null}
      {floatingBubble ? renderDraggable() : null}
    </View>
  );
}

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get('window');
const stylesm = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    transform: [{rotate: '0deg'}],
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    color: '#fff',
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
});

export default MainScreen;
