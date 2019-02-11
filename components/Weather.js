import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native'

const images = {
    iconSun: require('../assets/backgroundImage/icon-sun.png'),
    iconClouds: require('../assets/backgroundImage/icon-cloud.png'),
    iconSnow: require('../assets/backgroundImage/icon-snow.png'),
    iconRain: require('../assets/backgroundImage/icon-rain.png'),
    iconFog: require('../assets/backgroundImage/icon-fog.png'),
    iconChangeable: require('../assets/backgroundImage/icon-changeable.png'),
}

function getNormalizeTime(rawDatetime) {
    var hours = new Date(rawDatetime*1000).getHours();
    var minutes = new Date(rawDatetime*1000).getMinutes();
    minutes < 10 ? minutes = '0'+minutes : minutes; 
    return hours + ':' + minutes;
}

const APIKey = '76c7a8c071248e3da783276f1bfcd97e';

export default class Weather extends Component {
    constructor(){
        super();
    }

    state = {
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
    
    componentWillMount(){


        const cityName = this.props.navigation.getParam('name');
        console.log(cityName);
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=metric`;
        console.log(API);
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
                    city: cityName,
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
                //console.l og(err);
                this.setState(prevState => ({
                    error: true,
                    city: prevState.value,
                }))
            });
    }

    render () {
        let content = null;
        let weatherImage = null;
        let mainWeather = '';

        switch(this.state.weatherState){
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
            case 'Mist':
                mainWeather = 'Zamglenie';
                weatherImage = images.iconFog;
                break;
            default:
                mainWeather = 'Zmienna';
                weatherImage = images.iconChangeable;
                break;
        }


        console.log(this.state.error + ' ' + this.state.city);
        if(!this.state.error && this.state.city){
            content = (
                <View styles={styles.app}>
                    <View style={styles.results}>
                        <Text style={styles.cityName}>{this.state.city}</Text>
                        <Image resizeMode='contain' style={styles.weatherImage} source={weatherImage}/>
                        <Text style={styles.mainWeather}>{this.state.mainWeather}</Text>
                        <Text style={styles.temperature}>{this.state.temp} °C</Text>
                    </View>

                    
                    <View style={styles.details}>
                        <View style={styles.cell}>
                            <Text style={styles.detailsKey}>Wschód słońca</Text>
                            <Text style={styles.detailsValue}>{this.state.sunrise}</Text>

                            <Text style={styles.detailsKey}>Ciśnienie</Text>
                            <Text style={styles.detailsValue}>{this.state.pressure} hPa</Text>

                            <Text style={styles.detailsKey}>Wilgotność</Text>
                            <Text style={styles.detailsValue}>{this.state.humidity}%</Text>

                            <Text style={styles.detailsKey}>Widoczność</Text>
                            <Text style={styles.detailsValue}>{this.state.visibility} km</Text>
                        </View>
                        <View style={styles.cell}>
                            <Text style={styles.detailsKey}>Zachód słońca</Text>
                            <Text style={styles.detailsValue}>{this.state.sunset}</Text>

                            <Text style={styles.detailsKey}>Prędkośc wiatru</Text>
                            <Text style={styles.detailsValue}>{this.state.wind} m/s</Text>

                            <Text style={styles.detailsKey}>Zachmurzenie</Text>
                            <Text style={styles.detailsValue}>{this.state.cloudiness}%</Text>

                            <Text style={styles.detailsKey}>Średnia temperatura</Text>
                            <Text style={styles.detailsValue}>{this.state.avgTemp} °C</Text>
                        </View>
                    </View>
                   
                </View>
            )
        }

        return (
            <ImageBackground source={require('../assets/backgroundImage/sky.png')} style={styles.imageBackground}>
                {!this.state.error ? content : <Text style={styles.errorMessage}>Nie znaleziono: {this.state.city}</Text>}
            </ImageBackground>
        )
    }
};

//{this.state.error ? content : <Text style={styles.errorMessage}>Nie znaleziono: {this.state.city}</Text>}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
    },
    app: {
        marginTop: 10,
        padding: 10,
    },
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
    details: {
        padding: 10,
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