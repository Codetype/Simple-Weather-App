import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

import Application from './components/Application'

export default class App extends React.Component {
  render() {
    return (
      <ImageBackground source={require('./assets/backgroundImage/sky.png')} style={styles.imageBackground}>
        <Application />

      </ImageBackground>
    );
  }
}

const resizeMode = 'center';
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
});
