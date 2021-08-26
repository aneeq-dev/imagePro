import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import jwtDecode from 'jwt-decode';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  AsyncStorage,
  Image,
  PermissionsAndroid,
  Text,
  TextInput,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import ImageEditor from './movieSrc/ImageEditor';
import Editor from './movieSrc/MainScreen/Editor';
import PushNotification from 'react-native-push-notification';

import MainScreen from './movieSrc/MainScreen/MainScreen';
import NoRight from './movieSrc/NoRight';
import Videot from './movieSrc/Videot';
import FullScreenOverlay from './movieSrc/FullScreenOverlay';

console.disableYellowBox = true;
console.reportErrorsAsExceptions = false;

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const NavigationDrawerStructure = props => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  if (Text.defaultProps == null) {
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
  }

  TextInput.defaultProps = {allowFontScaling: false};

  return <View />;
};

function initialScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Search Saloons Near">
      <Stack.Screen
        name=" "
        component={MainScreen}
        options={{
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            height: 0,
          },
        }}
        initialParams={{
          screenNumber: 1,
        }}
      />
      <Stack.Screen
        name="  "
        component={Editor}
        options={{
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            height: 0,
          },
        }}
        initialParams={{
          datas: 1,
        }}
      />

      <Stack.Screen
        name="Fullscreen"
        component={FullScreenOverlay}
        options={{
          header: () => null,
        }}
        initialParams={{
          datas: 1,
        }}
      />

      <Stack.Screen
        name="   "
        component={NoRight}
        options={{
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            height: 0,
          },
        }}
        initialParams={{
          datas: 1,
        }}
      />

      <Stack.Screen
        name="    "
        component={ImageEditor}
        options={{
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            height: 0,
          },
        }}
        initialParams={{
          datas: 1,
        }}
      />

      <Stack.Screen
        name="     "
        component={Videot}
        options={{
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            height: 0,
          },
        }}
        initialParams={{
          datas: 1,
        }}
      />
    </Stack.Navigator>
  );
}

function App({navigation}) {
  const [name, setName] = useState('');
  const [phone, setphone] = useState('');
  const [language, setLanguage] = useState('English');
  const [value, setValue] = useState('');
  const [i, setI] = useState(1);

  useEffect(() => {
    permissions();
  }, []);

  const permissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      const granted2 = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );

      console.log('snj', granted, granted2);
      if (granted === 'granted' && granted2 === 'granted') {
        setI(i + 1);
        console.log('use');
        MainScreen.update();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  /* PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
      console.log('TOKEN:', token);
    },
    onNotification: function(notification) {
      console.log('NOTIFICATION:', notification);
    },
    onAction: function(notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);
    },
    popInitialNotification: true,
    requestPermissions: true,
  });*/

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: 'grey',
          itemStyle: {marginVertical: 0},
          labelStyle: {
            color: 'white',
          },
        }}
        drawerStyle={{
          backgroundColor: 'black',
          width: 340,
        }}>
        <Drawer.Screen
          name="Home"
          // options={{ drawerLabel: 'First page Option' }}
          component={initialScreenStack}
          options={{
            contentOptions: {
              labelStyle: {
                // fontFamily: 'SomeFont',
                color: 'white',
              },
            },
            drawerLabel: 'Home',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
