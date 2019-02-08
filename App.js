import React, {Component} from 'react';
import { StyleSheet, Button, ImageBackground } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Forecast from './components/Forecast';
import Main from './components/Main';

const AppNavigator = createStackNavigator({
  MainScreen: { screen: Main },
  ForecastScreen: { screen: Forecast }
});


export default createAppContainer(AppNavigator);
 