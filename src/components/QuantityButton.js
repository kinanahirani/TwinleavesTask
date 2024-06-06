import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {horizontalScale, verticalScale} from '../helpers/sizeHelpers';

const QuantityButton = ({onPress, title, btnStyles}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.quantityButton, btnStyles]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default QuantityButton;

const styles = StyleSheet.create({
  quantityButton: {
    backgroundColor: 'red',
    width: horizontalScale(50),
    height: verticalScale(40),
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
