import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    results: {
        color: "#841584",
    },
    cityName: {
      paddingTop: 10,
      paddingBottom: 10,
      fontSize: 24,
      fontWeight: '500',
      justifyContent: 'center',
    },
});

export default class Result extends Component {
    constructor(){
        super();

    }
    
    render () {
        const {error, city, date, sunset, sunrise, pressure, wind, temp} = this.props.weather;
        let content = null;

        if(!error && city){
            content = (
                <View style={styles.results}>
                    <Text style={styles.cityName}>{city}</Text>
                    <Text>W dniu: {date}</Text>
                    <Text>Wschód słońca: {sunrise}</Text>
                    <Text>Zachód słońca: {sunset}</Text>
                    <Text>Temperatura: {temp} °C</Text>
                    <Text>Ciśnienie: {pressure} hPa</Text>
                    <Text>Prędkość wiatru: {wind} m/s</Text>
                </View>
            )
        }

        return (
            <View className="result">
                {error ? `Nie znaleziono: ${city}` : content}
            </View>
        )
    }
};