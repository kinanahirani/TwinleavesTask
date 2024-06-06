// import {StyleSheet, Text, TouchableOpacity} from 'react-native';
// import React from 'react';
// import {Colors} from '../theme/colors';
// import {moderateScale, verticalScale} from '../helpers/sizeHelpers';

// //Custom button
// const CButton = ({title, extraStyles, onPress}) => {
//   return (
//     <TouchableOpacity
//       style={[styles.btn, extraStyles]}
//       onPress={onPress}
//       activeOpacity={0.7}>
//       <Text style={styles.btnText}>{title}</Text>
//     </TouchableOpacity>
//   );
// };

// export default CButton;

// const styles = StyleSheet.create({
//   btn: {
//     backgroundColor: Colors.BLACK,
//     height: verticalScale(50),
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: moderateScale(25),
//   },
//   btnText: {
//     fontSize: moderateScale(16),
//     color: Colors.WHITE,
//   },
// });

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import BarcodeScan from 'react-native-vector-icons/MaterialCommunityIcons';
import Share from 'react-native-vector-icons/FontAwesome';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers';

function CButton({
  title,
  onPress,
  iconName,
  iconLibrary,
  extraStyles,
  extraFontStyles,
  iconSize,
}) {
  const iconLibraryMap = {
    FontAwesome6: Icon,
    MaterialCommunityIcons: BarcodeScan,
    FontAwesome: Share,
  };

  const IconComponent = iconLibraryMap[iconLibrary];

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.customButton, extraStyles]}
      activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <IconComponent name={iconName} size={iconSize} color={'white'} />
      </View>
      <Text style={[styles.title, extraFontStyles]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = {
  customButton: {
    height: verticalScale(90),
    width: horizontalScale(180),
    backgroundColor: '#007bff',
    borderRadius: moderateScale(8),
    padding: moderateScale(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: moderateScale(10),
  },
  title: {
    fontSize: moderateScale(24),
    color: 'white',
    fontWeight: 'bold',
  },
};

export default CButton;
