import React, {useState, useRef} from 'react';
import {
  View,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import CHeader from '../components/CHeader.js';
import CButton from '../components/CButton.js';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../helpers/sizeHelpers.js';
import {useApi} from '../hooks/useApi.js';

const BarcodeScannerScreen = ({navigation}) => {
  const [flash, setFlash] = useState(false);
  const cameraRef = useRef(null);
  const {getProducts} = useApi();
  const [loading, setLoading] = useState(false);

  //IT WILL TAKE MUCH TIME TO FIND THE PRODUCTS SINCE WE ARE HITTING API TO FETCH FIRST 1000 PRODUCTS.
  // IF THE SCANNED BARCODE PRODUCT IS THERE IN THE 1000 FETCHED PRODUCTS THEN ONLY IT WILL REDIRECT.
  // IF I HAD AN API WHICH COULD DIRECTLY PROVIDE PRODUCT DETAILS FOR A GIVEN GTIN THEN WE WOULD HAVE ACHIEVED A BETTER PERFORMANCE
  const handleBarCodeRead = async ({data, type}) => {
    setLoading(true);
    try {
      const products = await getProducts(1, 1000);
      const filteredProducts = products.filter(
        product => product.gtin === data,
      );
      if (filteredProducts.length > 0) {
        navigation.navigate('ProductDetailsScreen', {
          id: filteredProducts[0].gtin,
          name: filteredProducts[0].name,
          category: filteredProducts[0].main_category,
          mrp: filteredProducts[0].mrp.mrp,
          discount: filteredProducts[0].discount,
        });
      } else {
        Alert.alert('Error', 'Product not found', [
          {
            text: 'OK',
            onPress: () => setProductNotFound(false),
          },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch product details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <CHeader title="Scan barcode" />
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
        />
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="white" />
          </View>
        )}
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
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
