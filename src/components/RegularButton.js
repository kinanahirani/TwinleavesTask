import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {moderateScale} from '../helpers/sizeHelpers';

const RegularButton = ({name, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 5,
      }}
      onPress={onPress}>
      <Feather name={name} size={moderateScale(18)} color={'black'} />
    </TouchableOpacity>
  );
};

export default RegularButton;

const styles = StyleSheet.create({});
