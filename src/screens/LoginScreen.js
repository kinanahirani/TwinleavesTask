import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {BUTTON_TITLE, GOOGLE_AUTH} from '../constants/constants';
import {useNavigation} from '@react-navigation/native';
import CButton from '../components/CButton';
import {Colors} from '../theme/colors';
import {moderateScale} from '../helpers/sizeHelpers';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData} from '../redux/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

GoogleSignin.configure({
  webClientId: GOOGLE_AUTH.CLIENT_ID,
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        await AsyncStorage.setItem('userData', userInfo.user.name);
        dispatch(setUserData(userInfo.user));
        navigation.replace('ProductsScreen');
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Error(googleSignIn1): ', error);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('Error(googleSignIn2): ', error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Error(googleSignIn3): ', error);
        // play services not available or outdated
      } else {
        console.log('Error(googleSignIn4): ', JSON.stringify(error, null, 2));
        // some other error happened
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontWeight: '500',
          color: 'black',
          marginBottom: 10,
          fontSize: moderateScale(15),
        }}>
        Please Login via Google!
      </Text>
      <CButton
        title={BUTTON_TITLE.GOOGLE}
        extraStyles={styles.googleBtn}
        onPress={() => handleGoogleSignIn({navigation})}
      />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleBtn: {
    width: '48%',
    backgroundColor: Colors.PALE_RED,
  },
});
