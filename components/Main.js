import React, {Component} from 'react';
import { StyleSheet, Button, ImageBackground } from 'react-native';

import Application from './Application'

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      flex: 1,
    },
    imageBackground: {
      flex: 1,
    },
  });
  

export default class Main extends Component {
    render () {
      return (
        <ImageBackground source={require('../assets/backgroundImage/sky.png')} style={styles.imageBackground}>
          <Application />
          
        </ImageBackground>
        );
    }
}