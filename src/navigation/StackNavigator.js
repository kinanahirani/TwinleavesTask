import React, {useEffect, useState} from 'react';
import LoginScreen from '../screens/LoginScreen';
import {createStackNavigator} from '@react-navigation/stack';
import ProductsScreen from '../screens/ProductsScreen';
import SplashScreen from '../screens/SplashScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BarcodeScannerScreen from '../screens/BarcodeScannerScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen
        name="BarcodeScannerScreen"
        component={BarcodeScannerScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
