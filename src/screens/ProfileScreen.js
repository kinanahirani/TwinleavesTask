import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import CHeader from '../components/CHeader';

const ProfileScreen = () => {
  const userData = useSelector(state => state.user.data);

  console.log(userData);

  if (!userData || !userData.givenName || !userData.familyName) {
    return (
      <>
        <CHeader title={'Profile'} extraStyles={{backgroundColor: 'white'}} />
        <View style={styles.container}>
          <Text style={styles.errorText}>User data not available</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <CHeader title={'Profile'} extraStyles={{backgroundColor: 'white'}} />
      <View style={styles.container}>
        <Text style={styles.txt}>
          Name: {userData.givenName} {userData.familyName}
        </Text>
        <Text style={styles.txt}>Email: {userData.email}</Text>
        <Text style={styles.txt}>ID: {userData.id}</Text>
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  txt: {
    color: 'black',
    fontSize: 18,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
