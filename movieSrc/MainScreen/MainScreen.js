import React, {useState, useEffect, useRef} from 'react';
import {
  showFloatingBubble,
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

import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();
function MainScreen(props) {
  const [active, setActive] = useState(2);
  const [photo, setPhoto] = useState(true);
  const [vid, setVid] = useState(null);
  const [img, setImg] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [orientation, setOrientation] = useState(0);
  const [col, setCol] = useState('brown');
  const [ch, setch] = useState(false);
  let cameraRef = null;
  useEffect(() => {
    requestPermission()
      .then(() => console.log('Permission Granted'))
      .catch(() => console.log('Permission is not granted'));

    initialize().then(() => console.log('Initialized the bubble mange'));

    permit();

    // Show Floating Bubble: x=10, y=10 position of the bubble
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
      : null;
  }, [ch]);

  useEffect(() => {
    isRecording
      ? setTimeout(() => {
          setCol(col == 'orange' ? 'brown' : 'orange');
        }, 1000)
      : null;
  }, [isRecording, col]);

  const PendingView = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Waiting</Text>
    </View>
  );

  DeviceEventEmitter.addListener('floating-bubble-press', e => {
    // What to do when user press the bubble
    //	console.log("Press Bubble")
    setch(!ch);
  });

  const [recordSecs, setrecordSecs] = useState(null);
  const [recordTime, setrecordTime] = useState(null);

  const onStartaudioRecord = async () => {
    setIsRecording(true);
    showIcon();
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener(e => {
      setrecordSecs(e.current_position);
      setrecordTime(audioRecorderPlayer.mmssss(Math.floor(e.current_position)));

      return;
    });
    console.log('res: ', result);
  };

  const onStopaudioRecord = async () => {
    setIsRecording(false);
    setch(false);
    try {
      removeIcon();

      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setrecordSecs(0);
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
    showFloatingBubble(10, 10).then(() => console.log('Floating Bubble Added'));
  };

  const removeIcon = () => {
    // Hide Floatin Bubble
    hideFloatingBubble().then(() => console.log('Floating Bubble Removed'));
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

  const stopVideo = async camera => {
    if (vid) {
    }
  };

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        //transform: [{rotate: '0deg'}],
      }}>
      {img ? (
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
              <View
                style={{
                  position: 'absolute',
                  left: 30,
                  top: 28,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setPhoto(true);
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
                  backgroundColor: col,
                  borderRadius: 100,
                  margin: 20,
                }}
              />
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
            </View>
          );
        }}
      </RNCamera>
      <View
        style={{
          position: 'absolute',
          bottom: 118,
          flexDirection: 'row',

          backgroundColor: 'rgba(105, 77, 0,0.3)',
          justifyContent: 'center',
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
    </View>
  );
}
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
});

export default MainScreen;
