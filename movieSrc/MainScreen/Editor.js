import React, {useState, useRef} from 'react';
// import all the components we are going to use
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
//Import React Native Video to play video
import Video from 'react-native-video';
import Entypo from 'react-native-vector-icons/Entypo';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
//Media Controls to control Play/Pause/Seek and full screen
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import {VideoPlayer, ProcessingManager} from 'react-native-video-processing';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Trimmer} from 'react-native-video-processing';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CustomSliderMarkerLeft from '@ptomasroos/react-native-multi-slider';
import CustomSliderMarkerRight from '@ptomasroos/react-native-multi-slider';
import ViewShot from 'react-native-view-shot';
import {captureScreen} from 'react-native-view-shot';
import Draggable from 'react-native-draggable';

function Editor(props) {
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [duration2, setDuration2] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('content');
  const [col, setCol] = useState('brown');
  const [minv, setMinv] = useState(0);
  const [maxv, setMaxv] = useState(0.1);
  const [img, setimg] = useState(null);
  const [initx, setinitx] = useState(70);
  const [inity, setinity] = useState(70);

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
    setIsFullScreen(isFullScreen);
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
      quality: 0.8,
    }).then(
      uri => {
        console.log('nn:', uri);
        setimg(uri);
        props.navigation.navigate('    ', {
          datas: uri,
        });
      },
      error => console.error('Oops, snapshot failed', error),
    );
  };

  console.log('ss: ', duration, duration2);
  return (
    <View>
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
        </ViewShot>

        <View
          style={{
            // backgroundColor: 'rgba(0,0,0,0)',
            bottom: 0,
            height: Dimensions.get('screen').height / 1.4,
          }}>
          <MediaControls
            duration={duration}
            isLoading={isLoading}
            mainColor="rgba(0,0,0,0.9)"
            onFullScreen={onFullScreen}
            onPaused={onPaused}
            onReplay={onReplay}
            onSeek={onSeek}
            onSeeking={onSeeking}
            playerState={playerState}
            progress={currentTime}
            toolbar={renderToolbar()}
          />
        </View>
      </View>
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
      <View
        style={{
          position: 'absolute',

          bottom: -Dimensions.get('screen').height / 6.7,
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
            top: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              // setPhoto(false);
              setMinv(minv == 0 ? 0 : minv - 0.01);
            }}
            style={{
              height: 65,
              width: 65,
              backgroundColor: !true
                ? 'rgba(105, 77, 0,0.5)'
                : 'rgba(0,0,0,0.6)',
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
              Left {'\n'}-0.01 second
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            right: 190,
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
              backgroundColor: 'lavender',
              borderRadius: 100,
              margin: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
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
            right: 122,
            top: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              // setPhoto(false);
              setMaxv(maxv == duration ? duration : maxv + 0.01);
            }}
            style={{
              height: 65,
              width: 65,
              backgroundColor: !true
                ? 'rgba(105, 77, 0,0.5)'
                : 'rgba(0,0,0,0.6)',
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
              Right {'\n'}+0.01 second
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            position: 'absolute',
            right: 32,
            top: 20,
            borderRadius: 30,
            backgroundColor: 'grey',
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
      <View
        style={{
          position: 'absolute',
          bottom: -Dimensions.get('screen').height / 5.2,
          left: Dimensions.get('screen').width / 5,
          display: 'flex',
          // alignItems: 'center',
          // justifyContent: 'center',
          //padding: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            trim(props.route.params.datas);
          }}
          style={{
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderRadius: 5,
          }}>
          <Text
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              fontSize: 18,
              color: 'white',
            }}>
            Trim Selected Part {minv.toFixed(2)}-{maxv.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
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
    height: Dimensions.get('screen').height / 1.4,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

export default Editor;
