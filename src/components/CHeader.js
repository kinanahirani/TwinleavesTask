import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';

const CHeader = ({title, navigation}) => {
  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        height: verticalScale(50),
        flexDirection: 'row',
        backgroundColor: 'white',
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
        style={{padding: moderateScale(10), marginLeft: horizontalScale(5)}}>
        <Feather name="arrow-left" size={moderateScale(24)} color={'black'} />
      </TouchableOpacity>
      <Text
        style={{
          marginLeft: horizontalScale(10),
          fontSize: moderateScale(18),
          fontWeight: 'bold',
          color: 'black',
        }}>
        {title}
      </Text>
    </SafeAreaView>
  );
};

export default CHeader;

const styles = StyleSheet.create({});
