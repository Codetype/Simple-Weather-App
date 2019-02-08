import React, {Component} from 'react';
import {View, Text, Alert, StyleSheet, Image} from 'react-native';

import Form from './Form';
import Result from './Result';

const APIKey = '0acfd1be658e5166ac341f8bd1cc2a0d';

const styles = StyleSheet.create({
    app: {
      marginTop: 40,
      padding: 10,
    },
});

function getNormalizeTime(rawDatetime) {
    var hours = new Date(rawDatetime*1000).getHours();
    var minutes = new Date(rawDatetime*1000).getMinutes();
    minutes < 10 ? minutes = '0'+minutes : minutes; 
    return hours + ':' + minutes;
}

export default class Application extends Component {
    state = {
        value: "",
        city: "",
        sunrise: "",
        sunset: "",
        temp: "",
        pressure: "",
        wind: "",
        weatherState: "",
        humidity: "",
        visibility: "",
        avgTemp: "",
        cloudiness: "",
        error: false,
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
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIKey}&units=metric`;
    
        fetch(API)
            .then(response => {
                if(response.ok){
                    return response;
                }
                throw Error("Fetch error")
            })
            .then(response => response.json())
            .then(data => {
                this.setState(prevState => ({
                    city: this.state.value,
                    sunrise: getNormalizeTime(data.sys.sunrise),
                    sunset: getNormalizeTime(data.sys.sunset),
                    temp: Math.round(data.main.temp),
                    pressure: data.main.pressure,
                    wind: data.wind.speed,
                    weatherState: data.weather[0].main,
                    humidity: data.main.humidity,
                    visibility: data.visibility/1000,
                    avgTemp: Math.round((data.main.temp_max + data.main.temp_min)/2),
                    cloudiness: data.clouds.all,
                    error: false,
                }))
            })
            .catch(err => {
                console.log(err);
                this.setState(prevState => ({
                    error: true,
                    city: prevState.value,
                }))
            });
    }
    
    render() {
        return (
            <View style={styles.app}>
                <Form 
                    value={this.state.value} 
                    change={this.handleInputChange}
                    submit={this.state.value ? this.handleCitySubmit : this.handleEmptyInput}
                />
                <Result weather={this.state}/>
            </View>
        );
      }
}
