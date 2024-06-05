import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {horizontalScale, verticalScale} from '../helpers/sizeHelpers';

const SplashScreen = () => {
  let navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString !== null) {
          navigation.replace('ProductsScreen');
        } else {
          navigation.replace('LoginScreen');
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    setTimeout(fetchUserData, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../assets/images/logo.jpg')} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  img: {
    width: horizontalScale(130),
    height: verticalScale(130),
  },
});
