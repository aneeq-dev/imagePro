import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import jwtDecode from 'jwt-decode';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {AsyncStorage, Image, Text, TextInput, View} from 'react-native';
import 'react-native-gesture-handler';

import MainScreen from './movieSrc/MainScreen/MainScreen';

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
    </Stack.Navigator>
  );
}

function App({navigation}) {
  const [name, setName] = useState('');
  const [phone, setphone] = useState('');
  const [language, setLanguage] = useState('English');
  const [value, setValue] = useState('');
  const [i, setI] = useState(1);

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
