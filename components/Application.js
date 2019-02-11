import React, {Component} from 'react';
import {View, ImageBackground, Alert, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {Asset, AppLoading} from 'expo'

import Form from './Form';

export default class Application extends Component {
    state = {
        value: "",
        isReady: false,
    }

    handleInputChange = (name) => {
        this.setState({
            value: name,
        })
    }

    handleEmptyInput = (e) => {
        e.preventDefault();
        Alert.alert('Wpisz nazwę miasta.');
    }

    handleCitySubmit = (e) => {
        e.preventDefault();
        this.props.navigation.navigate('WeatherScreen', {name: this.state.value})
    }
    
      render() {
        if (!this.state.isReady) {
          return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />  
                <AppLoading
                startAsync={this._cacheResourcesAsync}
                onFinish={() => this.setState({ isReady: true })}
                onError={console.warn}
                />
            </View>
          );
        }
        else{
            return (
            <ImageBackground source={require("../assets/backgroundImage/sky.png")} style={styles.imageBackground}>
                <View style={styles.app}>
                    <Form 
                        value={this.state.value} 
                        change={this.handleInputChange}
                        submit={this.state.value ? this.handleCitySubmit : this.handleEmptyInput}
                    />
                </View>
            </ImageBackground>
            );
        };
      }
    
      async _cacheResourcesAsync() {
        const images = [
          require('../assets/backgroundImage/sky.png'),
          require('../assets/backgroundImage/icon-sun.png'),
          require('../assets/backgroundImage/icon-rain.png'),
          require('../assets/backgroundImage/icon-snow.png'),
          require('../assets/backgroundImage/icon-fog.png'),
          require('../assets/backgroundImage/icon-changeable.png'),
          require('../assets/backgroundImage/icon-cloud.png'),
        ];
    
        const cacheImages = images.map((image) => {
          return Asset.fromModule(image).downloadAsync();
        });
        return Promise.all(cacheImages)
    
      }

}

const styles = StyleSheet.create({
    app: {
        marginTop: 10,
        padding: 10,
    },
    imageBackground: {
        flex: 1,
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});
