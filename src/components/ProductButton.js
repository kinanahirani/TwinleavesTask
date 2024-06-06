import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {moderateScale} from '../helpers/sizeHelpers';

const ProductButton = ({title, onPress, buttonStyle, textStyle}) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProductButton;
