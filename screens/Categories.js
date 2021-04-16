import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {topBar} from '../styleSheeet/styles';
import {categoriesStyling} from '../styleSheeet/screenStyles';
import {Dimensions} from 'react-native';
import {TextInput, ScrollView} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Categories1 from '../Categories/Categories1';
import store3 from '../redux/store3';

export default function Categories(props) {
  return (
    <View style={categoriesStyling.container}>
      <View style={topBar.categoriesOverall}>
        <FontAwesome5.Button
          name={'bars'}
          size={
            ((Dimensions.get('window').height / 10) *
              Dimensions.get('window').width) /
            10 /
            90
          }
          color={'black'}
          backgroundColor={'white'}
          style={topBar.iconStyle}
          onPress={() => props.navigation.toggleDrawer()}
        />
        <Text style={topBar.heading}>
          {
            (store3.getState().length===0 || store3.getState()[0].language==='English')?(
              'Browse Categories'
            ):(
              'قسموں کو براؤز کریں'
            )
          }
          </Text>
      </View>
      <ScrollView>
        <Categories1 navigation={props} />
        <View style={topBar.endView} />
      </ScrollView>
    </View>
  );
}
