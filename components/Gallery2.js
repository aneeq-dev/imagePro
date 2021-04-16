import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import ip from '../ipadd/ip';
import {galleryStyles} from '../styleSheeet/styles';

function Gallery2(props) {
  const saloonID = props.route.params.id2;
  const [loading, setLoading] = useState(true);
  const [pics, setPics] = useState([]);
  

  
  const getImages = async () => {
    //props.id
    try {
      const {data: responseJson} = await axios.get(
        'https://' + ip + '/api/saloon/getImages?saloonID=' + saloonID,
      );
      if (responseJson.length === 0 || responseJson===0 || responseJson===undefined) {
        // do nothing
        setPics([]);
      } else {
        setPics(responseJson[0].saloonGallery);
        setLoading(false);
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  if (loading) {
    getImages();
  }

  return (
    <View>
      {!loading ? (
        <ScrollView>
          {pics.map((item, i) => (
            <View key={i}>
              <Image
                style={galleryStyles.galleryImages}
                source={{
                  uri: item,
                }}
              />
              <Text style={galleryStyles.textStyle} />
            </View>
          ))}
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
}



export default Gallery2;
