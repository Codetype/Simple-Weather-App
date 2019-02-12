import React, {Component} from 'react';
import { StyleSheet, ImageBackground, View, Text, FlatList, Image} from 'react-native';

const APIKey = '76c7a8c071248e3da783276f1bfcd97e';

const images = {
    iconSun: require('../assets/backgroundImage/icon-sun.png'),
    iconClouds: require('../assets/backgroundImage/icon-cloud.png'),
    iconSnow: require('../assets/backgroundImage/icon-snow.png'),
    iconRain: require('../assets/backgroundImage/icon-rain.png'),
    iconFog: require('../assets/backgroundImage/icon-fog.png'),
    iconChangeable: require('../assets/backgroundImage/icon-changeable.png'),
}

function getNormalizeWeekDay(weekDay){
    switch(weekDay){
        case 0: return 'Niedziela';
        case 1: return 'Poniedziałek';
        case 2: return 'Wtorek';
        case 3: return 'Środa'; 
        case 4: return 'Czwartek'; 
        case 5: return 'Piątek'; 
        case 6: return 'Sobota';
    }
}

function getWeatherImage(weatherState) {
    switch(weatherState){
        case 'Clear':
            return images.iconSun;
        case 'Clouds': 
            return images.iconClouds;
        case 'Rain': 
            return images.iconRain;
        case 'Snow': 
            return images.iconSnow;
        case 'Drizzle':
            return images.iconRain;
        case 'Mist':
            return images.iconFog;
        default:
            return images.iconChangeable;
    }
}

export default class Forecast extends Component {
    constructor(){
        super();
    }

    state = {
        city: '',
        hourlyWeather: [],
        dailyWeather: [],
    }

    componentWillMount(){
        const cityName = this.props.navigation.getParam('name');
        const API = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}&units=metric`;

        fetch(API)
            .then(response => {
                if(response.ok){
                    return response;
                }
                throw Error("Fetch error")
            })
            .then(response => response.json())
            .then(data => {
                //daily weather forecast
                let dailyWeatherArr = [];
                let dayTemp = '', weatherSt = '', wkDay = '', nightTemp = ''; 
                let dayData = false, nightData = false; 


                data.list.forEach(element => {
                    let hour = new Date(element.dt*1000).getHours()-1;

                    if(hour == 12){
                        dayTemp = Math.round(element.main.temp);
                        weatherSt = getWeatherImage(element.weather[0].main);
                        dayData = true;
                    } else if (hour == 0){
                        let weekDay = new Date(element.dt*1000).getDay();
                        wkDay = getNormalizeWeekDay(weekDay);
                        nightTemp = Math.round(element.main.temp);
                        nightData = true;
                    } 
                    if(dayData && nightData){
                        dailyWeatherArr.push({
                            weekDay: wkDay,
                            weatherState: weatherSt,
                            dayTemperature: dayTemp,
                            nightTemperature: nightTemp, 
                        });
                        dayData = false, nightData = false;
                    }

                });

                //hourly weather forecast
                let hourlyWeatherArr = [];
                let numberOfElems = 7;
                hourlyWeatherArr.push({
                    hour: 'Teraz', 
                    temp: this.props.navigation.getParam('temp'),
                    main: getWeatherImage(this.props.navigation.getParam('main')),
                });

                data.list.forEach(element => {
                    if(numberOfElems >= 0){
                        hourlyWeatherArr.push({
                            hour: new Date(element.dt*1000).getHours()-1 + ':00', 
                            temp: Math.round(element.main.temp),
                            main: getWeatherImage(element.weather[0].main),
                        });
                        numberOfElems--;
                    }
                })

                this.setState(prevState => ({
                    city: cityName,
                    dailyWeather: dailyWeatherArr,
                    hourlyWeather: hourlyWeatherArr,
                    error: false,
                }))
            })
            .catch(err => {
                console.log(err);
                this.setState(prevState => ({
                    error: true,
                    city: prevState.city,
                }))
            });
    }

    render () {
      return (
        <ImageBackground source={require('../assets/backgroundImage/sky.png')} style={styles.imageBackground}>
            <View style={styles.results}><Text style={styles.cityName}>{this.state.city}</Text></View>

            <View style={styles.horizontalList}>
            <View style={styles.titleHeader}>
                <Text style={styles.title}>Szczegółowa prognoza godzinowa</Text>
            </View>
              <FlatList
                    data={this.state.hourlyWeather}
                    horizontal={true}
                    renderItem={({item, index}) => (
                    <View style={styles.horizontalItem}>
                        <Text style={styles.horizHeader}>{item.hour}</Text>
                        <Image resizeMode='contain' style={styles.weatherImage} source={item.main}/>
                        <Text style={styles.horizText} >{item.temp}</Text>
                    </View>
                    )}
                    keyExtractor={(item, index) => item.hour}
                />
            </View>
            <View style={styles.verticalList}>
                <View style={styles.titleHeader}>
                    <Text style={styles.title}>Prognoza na kolejne dni</Text>
                </View>
                <FlatList
                    data={this.state.dailyWeather}
                    renderItem={({item}) => (
                        <View style={styles.verticalItem}>
                            <Text style={styles.verText}>{item.weekDay}</Text>
                            <Image resizeMode='contain' style={styles.verImage} source={item.weatherState}/>
                            <View style={styles.temperatures}>
                                <Text style={styles.verSmallText}>{item.dayTemperature}</Text>
                                <Text style={styles.verSmallNightText}>{item.nightTemperature}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
        </ImageBackground> 
      );
    }
  }

  const styles = StyleSheet.create({
    imageBackground: {
      flex: 1,
    },
    verticalList: {
        flex: 1,
        position: 'static',
        top: 150,
        left: 10,
        width: '100%',
    },
    verticalItem: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        marginTop: 6,
    },
    verText: {
        color: '#fff',
        fontSize: 18,
        flex: 1,
    },
    verImage: {
        flex: 2,
        margin: 2,
        width: 20,
        height: 20,
    },
    temperatures: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    verSmallText: {
        color: '#fff',
        fontSize: 18,
        flex: 1,
    },
    verSmallNightText: {
        color: '#518494',
        fontSize: 18,
        flex: 1,
    },
    results: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cityName: {
        paddingTop: 20,
        paddingBottom: 10,
        fontSize: 32,
        fontWeight: '500',
        color: "#fff",
    },
    weatherImage: {
        margin: 2,
        width: 28,
        height: 28,
    },
    titleHeader: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#a6d9e9',
        paddingBottom: 6,
        marginBottom: 6,
    },
    title: {
        color: '#518494',
        
    },
    horizontalList: {
        position: 'absolute',
        top: 90,
        left: 10,
        alignItems: 'center',
        flexDirection: 'column',
        flex: 1,
        marginBottom: 20,
    },
    horizontalItem: {
        alignItems: 'center',
        paddingRight: 20,
    },
    horizHeader: {
        color: '#518494',
        fontSize: 14,
        marginBottom: 6,
    },
    horizText: {
        marginTop: 6,
        color: '#fff',
        fontSize: 18,
    },
});