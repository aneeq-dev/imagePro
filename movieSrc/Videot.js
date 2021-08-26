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
} from 'react-native';
//Import React Native Video to play video
import Video from 'react-native-video';
import Entypo from 'react-native-vector-icons/Entypo';
import CameraRoll from '@react-native-community/cameraroll';
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

function Videot(props) {
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
  const [m, setm] = useState(null);

  useEffect(() => {
    CameraRoll.save(props.route.params.datas, {type: 'video'});
    alert('Video saved to local gallery!');
  }, [m]);

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
  return (
    <View>
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

      <View
        style={{
          // backgroundColor: 'rgba(0,0,0,0)',
          bottom: 0,
          height: Dimensions.get('screen').height / 1.2,
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
      <Text
        style={{
          color: 'white',
          fontSize: 18,
          textAlign: 'center',
          padding: 20,
          backgroundColor: 'rgba(0,0,0,0.5)',
          margin: 2,
          borderRadius: 10,
        }}>
        Trimmed Video
      </Text>
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
    height: Dimensions.get('screen').height / 1.2,
    //top: 0,
    left: 0,
    bottom: 0,
    top: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
});

export default Videot;
