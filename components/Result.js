import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Button} from 'react-native'

const styles = StyleSheet.create({
    results: {
        color: "#FFF",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
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
    container: {
        flex: 1,
    },
    details: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    cell: {
        display: 'flex',
        flexDirection: 'column',
        flexBasis: '50%',
        flex: 1,
    },
    detailsKey: {
        marginTop: 10,
        color: '#fff',
        fontSize: 12,
    },
    detailsValue: {
        color: '#fff',
        fontSize: 18,
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
        const {error, city, humidity, avgTemp, cloudiness, visibility, sunset, sunrise, pressure, wind, temp, weatherState} = this.props.weather;
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

                    
                    <View style={styles.details}>
                        <View style={styles.cell}>
                            <Text style={styles.detailsKey}>Wschód słońca</Text>
                            <Text style={styles.detailsValue}>{sunrise}</Text>

                            <Text style={styles.detailsKey}>Ciśnienie</Text>
                            <Text style={styles.detailsValue}>{pressure} hPa</Text>

                            <Text style={styles.detailsKey}>Wilgotność</Text>
                            <Text style={styles.detailsValue}>{humidity}%</Text>

                            <Text style={styles.detailsKey}>Widoczność</Text>
                            <Text style={styles.detailsValue}>{visibility} km</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.detailsKey}>Zachód słońca</Text>
                            <Text style={styles.detailsValue}>{sunset}</Text>

                            <Text style={styles.detailsKey}>Prędkośc wiatru</Text>
                            <Text style={styles.detailsValue}>{wind} m/s</Text>

                            <Text style={styles.detailsKey}>Zachmurzenie</Text>
                            <Text style={styles.detailsValue}>{cloudiness}%</Text>

                            <Text style={styles.detailsKey}>Średnia temperatura</Text>
                            <Text style={styles.detailsValue}>{avgTemp} °C</Text>
                        </View>
                    </View>
                    <Button onPress={() => this.props.navigation.navigate('ForecastScreen')} title="Forecast"/>
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