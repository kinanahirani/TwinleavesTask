// import React, {useState, useRef} from 'react';
// import {View, Dimensions, Text, SafeAreaView, StyleSheet} from 'react-native';
// import {RNCamera} from 'react-native-camera';
// import CHeader from '../components/CHeader.js';
// import CButton from '../components/CButton.js';
// import {
//   horizontalScale,
//   moderateScale,
//   verticalScale,
// } from '../helpers/sizeHelpers.js';
// // import CModal from '../components/CModal.js';

// const BarcodeScannerScreen = ({navigation}) => {
//   const [barValue, setBarValue] = useState('');
//   const [barType, setBarType] = useState('');
//   const [flash, setFlash] = useState(false);
//   const [showDialog, setShowDialog] = useState(false);

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <CHeader title="Scan barcode" navigation={navigation} />
//       <SafeAreaView style={styles.container}>
//         <RNCamera
//           ref={ref => {
//             this.camera = ref;
//           }}
//           captureAudio={false}
//           autoFocus={RNCamera.Constants.AutoFocus.on}
//           defaultTouchToFocus
//           flashMode={
//             flash
//               ? RNCamera.Constants.FlashMode.torch
//               : RNCamera.Constants.FlashMode.off
//           }
//           mirrorImage={false}
//           // onBarCodeRead={readBarcode}
//           onGoogleVisionBarcodesDetected={({barcodes}) => {
//             console.log(barcodes, barcodes.length);
//             if (barcodes.length > 0) {
//               setBarValue(barcodes[0].data);
//               setBarType(barcodes[0].format);
//               setShowDialog(true);
//             }
//           }}
//           style={{
//             flex: 1,
//             justifyContent: 'flex-end',
//             alignItems: 'center',
//             height: Dimensions.get('window').height,
//             width: Dimensions.get('window').width,
//           }}
//           type={RNCamera.Constants.Type.back}
//           androidCameraPermissionOptions={{
//             title: 'Permission to use camera',
//             message: 'We need your permission to use your camera',
//             buttonPositive: 'Ok',
//             buttonNegative: 'Cancel',
//           }}
//           androidRecordAudioPermissionOptions={{
//             title: 'Permission to use audio recording',
//             message: 'We need your permission to use your audio',
//             buttonPositive: 'Ok',
//             buttonNegative: 'Cancel',
//           }}
//           onMountError={err => console.log(err, '...err')}
//         />
//         <CButton
//           title={`Flash ${flash ? 'OFF' : 'ON'}`}
//           iconName="flash"
//           iconLibrary="MaterialCommunityIcons"
//           onPress={() => setFlash(!flash)}
//           extraStyles={{
//             height: verticalScale(50),
//             borderRadius: moderateScale(25),
//             width: horizontalScale(200),
//             marginVertical: verticalScale(20),
//           }}
//           extraFontStyles={{fontSize: moderateScale(18)}}
//           iconSize={moderateScale(25)}
//         />
//         {/* <CModal
//           onOutsidePress={() => setShowDialog(!showDialog)}
//           showModal={showDialog}
//           title="Scanned Barcode:"
//           subText={`Data: ${barValue}\nFormat: ${barType}`}
//           button="Scan Again"
//         /> */}
//       </SafeAreaView>
//     </SafeAreaView>
//   );
// };

// export default BarcodeScannerScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'white',
//   },
//   iconButtonHomeContainer: {marginRight: horizontalScale(10)},
//   iconButtonHome: {
//     type: 'material-community',
//     size: moderateScale(50),
//     color: 'white',
//   },
//   titleButtonHome: {
//     fontWeight: '700',
//     fontSize: moderateScale(25),
//   },
//   buttonHome: {
//     backgroundColor: '#0C8E4E',
//     borderColor: 'transparent',
//     borderWidth: 0,
//     borderRadius: moderateScale(30),
//     height: verticalScale(100),
//   },
//   buttonHomeContainer: {
//     width: horizontalScale(200),
//     marginHorizontal: horizontalScale(50),
//     marginVertical: verticalScale(20),
//   },
// });

import React, {useState, useRef} from 'react';
import {View, Dimensions, SafeAreaView, StyleSheet, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import CHeader from '../components/CHeader.js';
import CButton from '../components/CButton.js';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers.js';

const BarcodeScannerScreen = ({navigation}) => {
  const [flash, setFlash] = useState(false);
  const cameraRef = useRef(null);

  const handleBarCodeRead = ({data, type}) => {
    Alert.alert('Barcode Detected', `Data: ${data}\nType: ${type}`);
    navigation.navigate('ProductDetailsScreen', {barcode: data});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <CHeader title="Scan barcode" navigation={navigation} />
      <SafeAreaView style={styles.container}>
        <RNCamera
          ref={cameraRef}
          captureAudio={false}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          flashMode={
            flash
              ? RNCamera.Constants.FlashMode.torch
              : RNCamera.Constants.FlashMode.off
          }
          onBarCodeRead={handleBarCodeRead}
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onMountError={err => console.log(err, '...err')}
        />
        <CButton
          title={`Flash ${flash ? 'OFF' : 'ON'}`}
          iconName="flash"
          iconLibrary="MaterialCommunityIcons"
          onPress={() => setFlash(!flash)}
          extraStyles={{
            height: verticalScale(50),
            borderRadius: moderateScale(25),
            width: horizontalScale(200),
            marginVertical: verticalScale(20),
          }}
          extraFontStyles={{fontSize: moderateScale(18)}}
          iconSize={moderateScale(25)}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default BarcodeScannerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
});
