import React from 'react';
import StackNavigator from './StackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import store from '../redux/store';
import {Provider} from 'react-redux';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <StackNavigator />
      </Provider>
    </NavigationContainer>
  );
};

export default AppNavigator;
