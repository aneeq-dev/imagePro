import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

function FullScreenOverlay(props) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}
        style={{
          padding: 10,
          backgroundColor: 'red',
          position: 'absolute',
          paddingHorizontal: 15,
          right: 0,
          top: 0,
        }}>
        <Entypo
          name="cross"
          style={{
            margin: 2,
            fontSize: 18,
            color: 'white',
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

export default FullScreenOverlay;
