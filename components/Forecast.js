import React, {Component} from 'react';
import { StyleSheet, Button, ImageBackground, View, Text} from 'react-native';

export default class Forecast extends Component {
    render () {
      return (
        <View>
          <Text>This forecast for 5 days!</Text>
          <Button onPress={() => this.props.navigation.navigate('MainScreen')} title="Main"/>
        </View>    
      );
    }
  }