import React, {useEffect} from 'react';
import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import PhotoEditor from 'react-native-photo-editor';
function ImageEditor(props) {
  useEffect(() => {
    PhotoEditor.Edit({
      path: props.route.params.datas.slice(8),
    });
  }, []);

  console.log('mmm: ', props.route.params.datas.slice(8));
  return (
    <View>
      {props.route.params.datas ? (
        <View
          style={{
            // position: 'absolute',
            // right: 0,
            //  top: 30,
            marginTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: props.route.params.datas}}
            style={{
              height: Dimensions.get('screen').height / 1.5,
              width: Dimensions.get('screen').width / 1.05,
            }}
          />
          <TouchableOpacity
            onPress={() =>
              PhotoEditor.Edit({
                path: props.route.params.datas.slice(8),
              })
            }
            style={{
              marginTop: 50,
              backgroundColor: 'rgba(105, 77, 0,0.9)',
              paddingHorizontal: 50,
              paddingVertical: 20,
              borderRadius: 5,
            }}>
            <Text style={{color: 'white'}}>Open in Editor</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

export default ImageEditor;
