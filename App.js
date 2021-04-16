import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import jwtDecode from 'jwt-decode';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {AsyncStorage, Image, Text, TextInput, View} from 'react-native';
import 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Comments from './components/Comments';
import Gallery2 from './components/Gallery2';
import rateMe from './components/rateMe';
import SearchedList from './components/SearchedList';
import DiscoverMovies from './movieSrc/Discover/DiscoverMovies';
import DiscoverPeople from './movieSrc/Discover/DiscoverPeople';
import DiscoverTvShows from './movieSrc/Discover/DiscoverTvShows';
import MovieInfo from './movieSrc/FullInfo/MovieInfo';
import TvInfo from './movieSrc/FullInfo/TvInfo';
import MainScreen from './movieSrc/MainScreen/MainScreen';
import MySaves from './movieSrc/Saves/MySaves';
import SearchedResults from './movieSrc/SearchArea/SearchedResults';
import Video from './movieSrc/Video';
import store2 from './redux/store2';
import store3 from './redux/store3';
import Categories from './screens/Categories';
import changeLanguage from './screens/changeLanguage';
import changePassword from './screens/changePassword';
import CallSupport from './screens/ContactUs';
import HowItWorks from './screens/HowItWorks';
import Login from './screens/Login';
import MainMapScreen from './screens/MainMapScreen';
import MyAppointments from './screens/MyAppointments';
import PersonalInfo from './screens/PersonalInfo';
import saloonProfile from './screens/saloonProfile';
import Settings from './screens/Settings';
import {stylesAppFile} from './styleSheeet/styles';

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
        name="Video"
        component={Video}
        options={{
          title: '  ', //Set Header Title
          headerStyle: {
            height: 0,
          },
        }}
        initialParams={{
          videoLink: '',
        }}
      />

      <Stack.Screen
        name="Setting"
        component={Settings}
        options={{
          title: '  ', //Set Header Title
          headerStyle: {
            height: 0,
          },
        }}
      />

      <Stack.Screen
        name="SearchedRes"
        component={SearchedResults}
        options={{
          title: '  ', //Set Header Title
          headerStyle: {
            height: 0,
          },
        }}
        initialParams={{
          videoLink: '',
        }}
      />

      <Stack.Screen
        name="SearchedList"
        component={SearchedList}
        options={{
          title: '  ', //Set Header Title
          headerStyle: {
            height: 0,
          },
        }}
      />

      <Stack.Screen
        name="MovieInfo"
        component={MovieInfo}
        options={{
          title: '  ', //Set Header Title
          headerStyle: {
            height: 0,
          },
        }}
      />

      <Stack.Screen
        name="TvInfo"
        component={TvInfo}
        options={{
          title: '  ', //Set Header Title
          headerStyle: {
            height: 0,
          },
        }}
      />

      <Stack.Screen
        name="Saloon Location"
        component={MainMapScreen}
        options={{
          title: !(store3.getState().length === 0)
            ? store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Saloon Location'
              : 'سیلون مقام'
            : 'Saloon Location',
          headerStyle: {
            // height:0
          },
        }}
        initialParams={{
          screenNumber: 2,
        }}
      />

      <Stack.Screen
        name="Profile"
        component={saloonProfile}
        options={{
          title: !(store3.getState().length === 0)
            ? store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Saloon Profile'
              : 'سیلون پروفائل'
            : 'Saloon Profile', //Set Header Title
        }}
      />

      <Stack.Screen
        name="Gallery"
        component={Gallery2}
        options={{
          title: !(store3.getState().length === 0)
            ? store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Gallery of Saloon'
              : 'سیلون کی گیلری'
            : 'Gallery of Saloon', //Set Header Title
        }}
      />

      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{
          title: !(store3.getState().length === 0)
            ? store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Reviews and comments'
              : 'جائزہ اور تبصرے'
            : 'Reviews and comments', //Set Header Title
        }}
      />

      <Stack.Screen
        name="Ratin"
        component={rateMe}
        options={{
          title: !(store3.getState().length === 0)
            ? store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Rate Saloon'
              : 'سیلون کی درجہ بندی کریں'
            : 'Rate saloon', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}

function firstScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Search Saloons Near">
      <Stack.Screen
        name=" "
        component={DiscoverMovies}
        options={{
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            height: 0,
          },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={saloonProfile}
        options={{
          title: !(store3.getState().length === 0)
            ? store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Saloon Profile'
              : 'سیلون پروفائل'
            : 'Saloon Profile', //Set Header Title
        }}
      />

      <Stack.Screen
        name="Gallery"
        component={Gallery2}
        options={{
          title: !(store3.getState().length === 0)
            ? store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Gallery of Saloon'
              : 'سیلون کی گیلری'
            : 'Gallery of Saloon', //Set Header Title
        }}
      />

      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{
          title: !(store3.getState().length === 0)
            ? store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Reviews and comments'
              : 'جائزہ اور تبصرے'
            : 'Reviews and comments', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}

function secondScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Saloons Near Me">
      <Stack.Screen
        name="Saloons Near Me"
        component={Video}
        options={{
          //  headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,

          title: ' ', //Set Header Title
          headerStyle: {
            height: 0,
          },
        }}
        initialParams={{
          lat: 0,
          long: 0,
          latdest: 0,
          longdest: 0,
          screenNumber: 0,
        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          //   headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,

          title: !(store3.getState().length === 0)
            ? store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Login'
              : 'لاگ ان کریں'
            : 'Login', //Set Header Title
        }}
        initialParams={{
          userID: 0,
        }}
      />

      <Stack.Screen
        name="Saloon Location"
        component={MainMapScreen}
        options={{
          title: !(store3.getState().length === 0)
            ? store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Saloon Location'
              : 'سیلون مقام'
            : 'Saloon Location',
          headerStyle: {
            // height:0
          },
        }}
        initialParams={{
          screenNumber: 2,
        }}
      />
    </Stack.Navigator>
  );
}

function MaleSaloonsScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Male Saloons Near Me">
      <Stack.Screen
        name="Male Saloons Near Me"
        component={SearchedList}
        options={{
          // headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,

          title: ' ', //Set Header Title
          headerStyle: {
            height: 0,
          },
        }}
        initialParams={{
          lat: 0,
          long: 0,
          latdest: 0,
          longdest: 0,
          screenNumber: 1,
        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          //   headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,

          title: !(store3.getState().length === 0)
            ? store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Login'
              : 'لاگ ان کریں'
            : 'Login', //Set Header Title
        }}
        initialParams={{
          userID: 0,
        }}
      />

      <Stack.Screen
        name="Saloon Location"
        component={MainMapScreen}
        options={{
          title: !(store3.getState().length === 0)
            ? store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Saloon Location'
              : 'سیلون مقام'
            : 'Saloon Location',
          headerStyle: {
            // height:0
          },
        }}
        initialParams={{
          screenNumber: 2,
        }}
      />
    </Stack.Navigator>
  );
}

function FemaleSaloonsScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Female Saloons Near Me">
      <Stack.Screen
        name="Female Saloons Near Me"
        component={SearchedList}
        options={{
          //  headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,

          title: '  ', //Set Header Title
          headerStyle: {
            height: 0,
          },
        }}
        initialParams={{
          lat: 0,
          long: 0,
          latdest: 0,
          longdest: 0,
          screenNumber: 2,
        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          //   headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,

          title: !(store3.getState().length === 0)
            ? store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Login'
              : 'لاگ ان کریں'
            : 'Login', //Set Header Title
        }}
        initialParams={{
          userID: 0,
        }}
      />

      <Stack.Screen
        name="Saloon Location"
        component={MainMapScreen}
        options={{
          title: !(store3.getState().length === 0)
            ? store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Saloon Location'
              : 'سیلون مقام'
            : 'Saloon Location',
          headerStyle: {
            // height:0
          },
        }}
        initialParams={{
          screenNumber: 2,
        }}
      />
    </Stack.Navigator>
  );
}

function MyAppointmentsScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="My Appointments">
      <Stack.Screen
        name="    "
        component={MyAppointments}
        options={{
          headerStyle: {
            height: 0,
          },
        }}
        initialParams={{
          userID: 0,
          screenNumber: 1,
        }}
      />

      <Stack.Screen
        name="Profile"
        component={saloonProfile}
        options={{
          title: !(store3.getState().length === 0)
            ? store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Saloon Profile'
              : 'سیلون پروفائل'
            : 'Saloon Profile', //Set Header Title
        }}
      />

      <Stack.Screen
        name="Ratin"
        component={rateMe}
        options={{
          title: !(store3.getState().length === 0)
            ? store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Rate Saloon'
              : 'سیلون کی درجہ بندی کریں'
            : 'Rate Saloon', //Set Header Title
        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          //   headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,

          title: !(store3.getState().length === 0)
            ? store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Login'
              : 'لاگ ان کریں'
            : 'Login', //Set Header Title
        }}
        initialParams={{
          userID: 0,
        }}
      />

      <Stack.Screen
        name="Saloon Location"
        component={MainMapScreen}
        options={{
          title: !(store3.getState().length === 0)
            ? store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Saloon Location'
              : 'سیلون مقام'
            : 'Saloon Location',
          headerStyle: {
            // height:0
          },
        }}
        initialParams={{
          screenNumber: 2,
        }}
      />
    </Stack.Navigator>
  );
}

function MyReviews({navigation}) {
  return (
    <Stack.Navigator initialRouteName="My Reviews">
      <Stack.Screen
        name="    "
        component={Comments}
        options={{
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          title: !(store3.getState().length === 0)
            ? store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'My Reviews and Comments'
              : 'جائزہ اور تبصرے'
            : 'My Reviews and Comments', //Set Header Title
        }}
        initialParams={{
          userID: 0,
          screenNumber: 1,
        }}
      />

      <Stack.Screen
        name="Profile"
        component={saloonProfile}
        options={{
          title: !(store3.getState().length === 0)
            ? store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Saloon Profile'
              : 'سیلون پروفائل'
            : 'Saloon Profile', //Set Header Title
        }}
      />

      <Stack.Screen
        name="Ratin"
        component={rateMe}
        options={{
          title: !(store3.getState().length === 0)
            ? store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Rate Saloon'
              : 'سیلون کی درجہ بندی کریں'
            : 'Rate Saloon', //Set Header Title
        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          //   headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,

          title: !(store3.getState().length === 0)
            ? store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Login'
              : 'لاگ ان کریں'
            : 'Login', //Set Header Title
        }}
        initialParams={{
          userID: 0,
        }}
      />

      <Stack.Screen
        name="Saloon Location"
        component={MainMapScreen}
        options={{
          title: !(store3.getState().length === 0)
            ? store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Saloon Location'
              : 'سیلون مقام'
            : 'Saloon Location',
          headerStyle: {
            // height:0
          },
        }}
        initialParams={{
          screenNumber: 2,
        }}
      />
    </Stack.Navigator>
  );
}

function SettingsScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen
        name="  "
        component={Settings}
        options={{
          //   headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            height: 0,
          },
        }}
        initialParams={{
          userID: 0,
        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          //   headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,

          title: !(store3.getState().length === 0)
            ? store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Login'
              : 'لاگ ان کریں'
            : 'Login', //Set Header Title
        }}
        initialParams={{
          userID: 0,
        }}
      />

      <Stack.Screen
        name="Personal Info"
        component={PersonalInfo}
        options={{
          //   headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,

          title: !(store3.getState().length === 0)
            ? store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Personal Info'
              : 'ذاتی معلومات'
            : 'Personal Info', //Set Header Title
        }}
        initialParams={{
          userID: 0,
        }}
      />

      <Stack.Screen
        name="Passwords"
        component={changePassword}
        options={{
          //   headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,

          title: !(store3.getState().length === 0)
            ? store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Change Password'
              : 'پاس ورڈ تبدیل کریں'
            : 'Change Password', //Set Header Title
        }}
        initialParams={{
          userID: 0,
        }}
      />

      <Stack.Screen
        name="Language"
        component={changeLanguage}
        options={{
          //   headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,

          title: !(store3.getState().length === 0)
            ? store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Change Language'
              : 'زبان تبدیل کریں'
            : 'Change Language', //Set Header Title
        }}
        initialParams={{
          userID: 0,
        }}
      />

      <Stack.Screen
        name="      "
        component={Settings}
        options={{
          //   headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} />,
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            height: 0,
          },
        }}
        initialParams={{
          userID: 0,
        }}
      />
    </Stack.Navigator>
  );
}

function HowItWorksScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="HowItWorks">
      <Stack.Screen
        name="     "
        component={HowItWorks}
        options={{
          headerStyle: {
            height: 0,
          },
        }}
        initialParams={{
          userID: 0,
        }}
      />
    </Stack.Navigator>
  );
}

function tvScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="tvshows">
      <Stack.Screen
        name="         "
        component={DiscoverTvShows}
        options={{
          headerStyle: {
            height: 0,
          },
        }}
        initialParams={{
          userID: 0,
        }}
      />
    </Stack.Navigator>
  );
}

function peopleScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="tvshows">
      <Stack.Screen
        name="          "
        component={DiscoverPeople}
        options={{
          headerStyle: {
            height: 0,
          },
        }}
        initialParams={{
          userID: 0,
        }}
      />
    </Stack.Navigator>
  );
}

function savesScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="tvshows">
      <Stack.Screen
        name="           "
        component={MySaves}
        options={{
          headerStyle: {
            height: 0,
          },
        }}
        initialParams={{
          userID: 0,
        }}
      />
    </Stack.Navigator>
  );
}

function CallSupportScreenStack({navigation}) {
  return (
    <Stack.Navigator initialRouteName="Call Support">
      <Stack.Screen
        name="      "
        component={CallSupport}
        options={{
          headerStyle: {
            height: 0,
          },
        }}
        initialParams={{
          userID: 0,
        }}
      />
    </Stack.Navigator>
  );
}

/*
function NotificationsScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName=
        "Notifications"
    >

      <Stack.Screen
        name="       "
        component={Notifications}
        options={{
         
          headerStyle: {
            height:0
          },
        }}
        initialParams={{
          userID: 0,
        }}
       />

      <Stack.Screen
        name="My Appointments"
        component={MyAppointments}
        options={{
         
          headerStyle: {
           // height:0
          },
        }}
        initialParams={{
          userID: 0,
          screenNumber: 2
        }}
       />

    <Stack.Screen
        name="Saloon Location"
        component={MainMapScreen}
        options={{
         
          headerStyle: {
          // height:0
          },
        }}
        initialParams={{
          
          screenNumber:2
          
       }}
    
       />
    
    </Stack.Navigator>
  );
}
<Drawer.Screen
name=" Notifications"
//options={{ drawerLabel: 'Second page Option' }}
component={NotificationsScreenStack}
options={{
  drawerLabel: 
  !(language==='')?(
    language==='English'?(
      'Notifications'
    ):(
    'اطلاعات'
    )
  ):('Notifications')
  ,
  drawerIcon: config => <FontAwesome.Button 
  name={'bell-o'} 
  underlayColor="transparent"

  size={23} 
  backgroundColor={'#a9ab72'}
  color={'black'} 
  style={stylesAppFile.options}
/>
 }}
/>*/

/**/

function App({navigation}) {
  const [name, setName] = useState('');
  const [phone, setphone] = useState('');
  const [language, setLanguage] = useState('English');
  const [value, setValue] = useState('');
  const [i, setI] = useState(1);

  App.updateMe = data => {
    setValue(data);
    console.log('ijmkkm: ', store3.getState());
    setI(i + 1);
  };

  App.updateMe2 = data => {
    //  setValue(data);
    setLanguage(data);
    //  console.log("ijmkkm: ",store3.getState());
    setI(i + 1);
  };

  const misc = async () => {
    try {
      // if there is token
      const value = await AsyncStorage.getItem('loginkeysasa');
      const customer = jwtDecode(value);
      setName(customer.name);
      setphone(customer.phoneNumber);
      console.log('calllhuh', customer);
      store2.dispatch({
        type: 'LOGGED IN',
        payload: {
          logged: true,
        },
      });
    } catch (ex) {
      console.log('calllhuh');
      store2.dispatch({
        type: 'LOGGED IN',
        payload: {
          logged: false,
        },
      });
    }
  };

  useEffect(
    () => {
      misc();
    },
    [i],
    [value],
  );

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#01083d',
          itemStyle: {marginVertical: 0},
          labelStyle: {
            color: 'white',
          },
        }}
        drawerStyle={stylesAppFile.drawerStyle}>
        <Drawer.Screen
          name=" "
          component={initialScreenStack}
          options={{
            drawerIcon: config => (
              <View
                style={{
                  height: 150,
                }}>
                <Image
                  source={require('./images/backgr.jpg')}
                  style={{
                    borderRadius: 10,
                    width: 305,
                    height: 150,
                    margin: 0,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                />

                <View style={stylesAppFile.gap} />

                <Image
                  source={require('./images/userimage.jpg')}
                  style={stylesAppFile.userImage2}
                />
                {
                  //name===''?'Not Logged In':name
                }
                <Text style={stylesAppFile.nameText}>
                  {store2.getState()[0] === undefined
                    ? null
                    : store2.getState()[0].logged
                    ? name
                    : 'Not Logged In'}
                </Text>

                <Text style={stylesAppFile.phoneText}>
                  {store2.getState()[0] === undefined
                    ? null
                    : store2.getState()[0].logged
                    ? phone
                    : 'Please Log In from Settings Bar'}
                </Text>
              </View>
            ),
          }}
        />

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
            drawerIcon: config => (
              <MaterialIcons.Button
                name={'home'}
                size={23}
                color={'white'}
                style={stylesAppFile.options}
                backgroundColor={'#005363'}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Movies"
          // options={{ drawerLabel: 'First page Option' }}
          component={firstScreenStack}
          options={{
            contentOptions: {
              labelStyle: {
                // fontFamily: 'SomeFont',
                color: 'white',
              },
            },
            drawerLabel: 'Discover Movies',
            drawerIcon: config => (
              <MaterialIcons.Button
                name={'local-movies'}
                size={23}
                color={'white'}
                style={stylesAppFile.options}
                backgroundColor={'#005363'}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Tvshows"
          // options={{ drawerLabel: 'First page Option' }}
          component={tvScreenStack}
          options={{
            contentOptions: {
              labelStyle: {
                // fontFamily: 'SomeFont',
                color: 'white',
              },
            },
            drawerLabel: 'Discover TV Shows',
            drawerIcon: config => (
              <MaterialIcons.Button
                name={'tv'}
                underlayColor="transparent"
                backgroundColor={'#005363'}
                size={23}
                color={'white'}
                style={stylesAppFile.options}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="People"
          // options={{ drawerLabel: 'First page Option' }}
          component={peopleScreenStack}
          options={{
            contentOptions: {
              labelStyle: {
                // fontFamily: 'SomeFont',
                color: 'white',
              },
            },
            drawerLabel: 'Discover People',
            drawerIcon: config => (
              <MaterialIcons.Button
                name={'person-pin'}
                underlayColor="transparent"
                backgroundColor={'#005363'}
                size={23}
                color={'white'}
                style={stylesAppFile.options}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Browse Categories"
          // options={{ drawerLabel: 'First page Option' }}
          component={savesScreenStack}
          options={{
            contentOptions: {
              labelStyle: {
                // fontFamily: 'SomeFont',
                color: 'white',
              },
            },
            drawerLabel: 'My Saves',
            drawerIcon: config => (
              <Entypo.Button
                name={'documents'}
                backgroundColor={'#005363'}
                size={23}
                color={'white'}
                underlayColor="transparent"
                style={stylesAppFile.options}
              />
            ),
          }}
        />

        <Drawer.Screen
          name=" Contact Us"
          //options={{ drawerLabel: 'Second page Option' }}
          component={CallSupportScreenStack}
          options={{
            drawerLabel: !(language === '')
              ? language === 'English'
                ? 'Contact Us'
                : 'ہم سے رابطہ کریں'
              : 'Contact Us',
            drawerIcon: config => (
              <Foundation.Button
                name={'telephone'}
                underlayColor="transparent"
                size={23}
                backgroundColor={'#005363'}
                color={'white'}
                style={stylesAppFile.options}
              />
            ),
          }}
        />

        <Drawer.Screen
          name=" Settings"
          //options={{ drawerLabel: 'Second page Option' }}
          component={SettingsScreenStack}
          options={{
            drawerLabel: !(language === '')
              ? language === 'English'
                ? 'Settings'
                : 'ترتیبات'
              : 'Settings',
            drawerIcon: config => (
              <AntDesign.Button
                name={'setting'}
                underlayColor="transparent"
                size={23}
                backgroundColor={'#005363'}
                color={'white'}
                style={stylesAppFile.options}
              />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
