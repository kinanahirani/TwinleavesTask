import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {BUTTON_TITLE, GOOGLE_AUTH} from '../constants/constants';
import {useNavigation} from '@react-navigation/native';
import CButton from '../components/CButton';
import {Colors} from '../theme/colors';

GoogleSignin.configure({
  webClientId: GOOGLE_AUTH.CLIENT_ID,
});

const LoginScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        console.log('Successfully signed in');
        console.log(userInfo, '..userInfo');
        // navigation.navigate('SignUpScreen', {data: userInfo.user});
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Error(googleSignIn): ', error);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('Error(googleSignIn): ', error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Error(googleSignIn): ', error);
        // play services not available or outdated
      } else {
        console.log('Error(googleSignIn): ', JSON.stringify(error, null, 2));
        // some other error happened
      }
    }
  };

  return (
    <CButton
      title={BUTTON_TITLE.GOOGLE}
      extraStyles={styles.googleBtn}
      onPress={() => handleGoogleSignIn({navigation})}
    />
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  googleBtn: {
    width: '48%',
    backgroundColor: Colors.PALE_RED,
  },
});
