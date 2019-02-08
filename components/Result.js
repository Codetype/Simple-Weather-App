import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native'

const styles = StyleSheet.create({
    results: {
        color: "#FFF",
        justifyContent: 'center',
        alignItems: 'center',
    },
    cityName: {
      paddingTop: 10,
      paddingBottom: 10,
      fontSize: 32,
      fontWeight: '500',
      color: "#fff",
    },
    temperature: {
        color: "#fff",
        fontSize: 40,
        fontWeight: '300',
    },
    mainWeather: {
        color: '#fff',
    },
    errorMessage: {
        marginTop: 10,
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    weatherImage: {
        width: 100,
        height: 100,
    },
});

const images = {
    iconSun: require('../assets/backgroundImage/icon-sun.png'),
    iconClouds: require('../assets/backgroundImage/icon-cloud.png'),
    iconSnow: require('../assets/backgroundImage/icon-snow.png'),
    iconRain: require('../assets/backgroundImage/icon-rain.png'),
    
}

export default class Result extends Component {
    constructor(){
        super();

    }
    
    render () {
        const {error, city, date, sunset, sunrise, pressure, wind, temp, weatherState} = this.props.weather;
        let content = null;
        let weatherImage = null;
        let mainWeather = '';

        switch(weatherState){
            case 'Clear':
                mainWeather = 'Słonecznie';
                weatherImage = images.iconSun;
                break;
            case 'Clouds': 
                mainWeather = 'Pochmurnie';
                weatherImage = images.iconClouds;
                break;
            case 'Rain': 
                mainWeather = 'Opady deszczu';
                weatherImage = images.iconRain;
                break;
            case 'Snow': 
                mainWeather = 'Opady śniegu';
                weatherImage = images.iconSnow;
                break;
            case 'Drizzle':
                mainWeather = 'Mżawka';
                weatherImage = images.iconRain;
                break;
            default:
                mainWeather = 'Zmienna';
                break;
        }

        if(!error && city){
            content = (
                <View>
                    <View style={styles.results}>
                        <Text style={styles.cityName}>{city}</Text>
                        <Image resizeMode='center' style={styles.weatherImage} source={weatherImage}/>
                        <Text style={styles.mainWeather}>{mainWeather}</Text>
                        <Text style={styles.temperature}>{temp} °C</Text>
                    </View>
                    <View>
                        <Text>W dniu: {date}</Text>
                        <Text>Wschód słońca: {sunrise}</Text>
                        <Text>Zachód słońca: {sunset}</Text>
                        <Text>Ciśnienie: {pressure} hPa</Text>
                        <Text>Prędkość wiatru: {wind} m/s</Text>
                    </View>
                </View>
            )
        }

        return (
            <View className="result">
                {error ? <Text style={styles.errorMessage}>Nie znaleziono: {city}</Text> : content}
            </View>
        )
    }
};