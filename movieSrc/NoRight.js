import React from 'react';
import {View, Text, Dimensions} from 'react-native';

function NoRight(props) {
  return (
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
        You have no right to use this application. This is caused by the reason
        that, you are may be not liable to use this app, as application
        developer has stopped this application. Please contact the application
        developer for more details.
      </Text>
    </View>
  );
}

export default NoRight;
