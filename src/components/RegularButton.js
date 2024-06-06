import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';

const RegularButton = ({name, onPress, IconComp}) => {
  return (
    <TouchableOpacity
      style={{
        padding: moderateScale(10),
        marginTop: verticalScale(10),
        borderRadius: moderateScale(5),
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: horizontalScale(5),
      }}
      onPress={onPress}>
      <IconComp name={name} size={moderateScale(18)} color={'black'} />
    </TouchableOpacity>
  );
};

export default RegularButton;

const styles = StyleSheet.create({});
