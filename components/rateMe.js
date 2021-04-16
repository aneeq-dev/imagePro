import React, {useState, useEffect} from 'react';
import {Alert, AsyncStorage, View} from 'react-native';
import {
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {Dimensions} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Rating, AirbnbRating} from 'react-native-ratings';
import axios from 'axios';
import ip from '../ipadd/ip';
import {ScrollView} from 'react-native';
import joi from 'react-native-joi-validation';
import {rateStyling} from '../styleSheeet/styles';
import store3 from '../redux/store3';

function rateMe(props) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState('');
  const [commentok, setCommentOk] = useState(true);
  const [name, setSaloonName] = useState("");

  const RateQuery = async () => {
    console.log(props.route.params.app_id);
    if (validateInput(comment)) {
      try {
        let obj = {
          comment: comment,
          rating: rating,
        };

        const value = await AsyncStorage.getItem('loginkeysasa');

        const {data: responseJson} = await axios.post(
          'https://' +
            ip +
            '/api/reviews/saveReview?saloonID=' +
            props.route.params.id +
            '&appointmentID=' +
            props.route.params.app_id,
          obj,
          {
            headers: {
              'x-auth-token': value,
            },
          },
        );

        console.log(responseJson);

        if (!responseJson) {
          // do nothing
          Alert.alert(
            store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Review Not Registered!'
              : 'تبصرہ رجسٹر نہیں ہوا',
            store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? "Review cannot be registered, please be sure the following{'\n'}1- Have active internet{'\n'}2- Correct Review Registration data"
              : 'جائزہ رجسٹر نہیں ہوسکتا ، براہ کرم یقینی بنائیں کہ درج ذیل 1- فعال انٹرنیٹ 2- جائزے کے اندراج کو درست کریں',
            [
              {
                //style: "cancel"
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: true},
          );
          console.log('nothing');
        } else {
          console.log('Review regstered: ', responseJson);
          Alert.alert(
            store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Review Registered Successfully!'
              : 'جائزہ کامیابی کے ساتھ درج کیا گیا ہے!',
            store3.getState().length === 0 ||
              store3.getState()[0].language === 'English'
              ? 'Thank you for reviewing the Saloon.'
              : 'سیلون کا جائزہ لینے کے لئے آپ کا شکریہ۔',

            [
              {
                //style: "cancel"
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: true},
          );

          //console.log("ininin: ",props);
          props.navigation.goBack();
        }
      } catch (ex) {
        setErrors(ex.response.data);
        console.log(ex.response.data);
      }
    }
  };

  const GetSaloonInfo = async () => {
    // console.log(props.route.params.app_id);
    //if (validateInput(comment)) {
    try {
      const value = await AsyncStorage.getItem("loginkeysasa");

      const { data: responseJson } = await axios.get(
        'https://' +ip +
          "/api/appointments/getSaloonInfoWrtAppID?app_id=" +
          props.route.params.app_id,
        {
          headers: {
            "x-auth-token": value,
          },
        }
      );

      console.log(responseJson);

      if (!responseJson) {
        // do nothing
      } else {
        console.log("Review regstered: ", responseJson);
        setSaloonName(responseJson.saloonID.saloonName);
      }
    } catch (ex) {
     // setErrors(ex.response.data);
      console.log(ex);
    }
  };

  useEffect(() => {
    GetSaloonInfo();
  });

  const validateInput = data => {
    // validating phone
    var schema = joi.object().keys({
      comment: joi
        .string()
        .min(10)
        .max(200),
    });
    const error = joi.validate({comment: data}, schema);
    //console.log(error);
    // return error.error.details[0].message;
    if (error.error) {
      setErrors(error.error.details[0].message);
      setCommentOk(false);
      return false;
    } else {
      console.log('ok');
      setErrors('');
      setCommentOk(true);
      return true;
    }
  };

  return (
    <ScrollView>
      <View style={rateStyling.container}>
        <Text style={rateStyling.head}>
          {store3.getState().length === 0 ||
          store3.getState()[0].language === 'English'
            ? 'Saloon Review Menu'
            : 'سیلون تبصرہ مینو'}{' '}
        </Text>
      </View>
      <Text style={{padding: 15, fontSize: 16, backgroundColor: 'skyblue'}}>
        How was your appointment you scheduled with{" "}
        <Text style={{color: 'blue'}}>{name.toUpperCase()}</Text>? We want to hear from
        you...
      </Text>
      <View>
        <Rating
          type="star"
          startingValue={0}
          ratingCount={5}
          readonly={false}
          imageSize={30}
          showRating
          ratingTextColor="#105c43"
          onFinishRating={n => setRating(n)}
        />
      </View>

      <Text style={rateStyling.comment}>
        {store3.getState().length === 0 ||
        store3.getState()[0].language === 'English'
          ? 'Comment: '
          : 'تبصرہ: '}
      </Text>
      <View style={rateStyling.textinput}>
        <TextInput
          editable={true}
          placeholder={'Comment'}
          onChangeText={n => {
            // console.log(n);
            setComment(n);
            validateInput(n);
          }}
          value={comment}
          autoFocus={true}
          multiline={true}
          maxLength={200}
          clearButtonMode="always"
          style={{
            flex: 1,
            paddingLeft: 20,
            borderWidth: 1,
            borderRadius: 20,
            textAlignVertical: 'top',
            margin: 10,
            height: Dimensions.get('screen').height / 4,
            borderColor: commentok ? 'black' : 'red',
            justifyContent: 'flex-end',
          }}
        />
      </View>
      {errors ? (
        <View>
          <Text style={rateStyling.errors}>{errors}</Text>
        </View>
      ) : null}

      <View style={rateStyling.ratebutton}>
        <TouchableOpacity
          onPress={() => {
            RateQuery();
          }}
          style={rateStyling.ratebuttonactual}>
          <Text style={rateStyling.btntext}>
            {store3.getState().length === 0 ||
            store3.getState()[0].language === 'English'
              ? 'Rate'
              : 'ٹھیک ہے'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default rateMe;
