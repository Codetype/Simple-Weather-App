import React, {Component} from 'react';
import { StyleSheet, ImageBackground, View, Text, FlatList, Image} from 'react-native';

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      flex: 1,
    },
    imageBackground: {
      flex: 1,
    },
    h1: {
        color: '#fff',
        fontSize: 18,
        marginTop: 10,
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
        flexBasis: '35%',
        flex: 1,
    },
    smallCell: {
        alignItems: 'right',
        justifyContent: 'right',
        display: 'flex',
        flexDirection: 'column',
        flexBasis: '15%',
        flex: 1,
    },
    cityName: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 32,
        fontWeight: '500',
        color: "#fff",
    },
    weatherImage: {
        marginTop: 12,
        width: 20,
        height: 20,
    }
});
const APIKey = '76c7a8c071248e3da783276f1bfcd97e';

const images = {
    iconClouds: require('../assets/backgroundImage/icon-cloud.png'),
};

export default class Forecast extends Component {
    constructor(){
        super();
    }

    state = {
        city: '',
        weekDays: [],
        dayTemperatures: [],
        nightTemperatures: [],
    }
    
    componentWillMount(){
        const cityName = this.props.navigation.getParam('name');
        
        const API = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKey}&units=metric`;
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
                let dayTempArr = [];
                let nightTempArr = [];
                let weekDaysArr = []; 
                data.list.forEach(element => {
                    let hour = new Date(element.dt*1000).getHours();
                    if(hour == 13){
                        dayTempArr.push({key: Math.round(element.main.temp)});
                    } else if (hour == 1){
                        let weekDay = new Date(element.dt*1000).getDay();
                        switch(weekDay){
                            case 0: weekDaysArr.push({key: 'Niedziela'}); break;
                            case 1: weekDaysArr.push({key: 'Poniedziałek'}); break;
                            case 2: weekDaysArr.push({key: 'Wtorek'}); break;
                            case 3: weekDaysArr.push({key: 'Środa'}); break;
                            case 4: weekDaysArr.push({key: 'Czwartek'}); break;
                            case 5: weekDaysArr.push({key: 'Piątek'}); break;
                            case 6: weekDaysArr.push({key: 'Sobota'}); break;
                        }
                        nightTempArr.push({key: Math.round(element.main.temp)});
                    }
                });
                this.setState(prevState => ({
                    city: cityName,
                    dayTemperatures: dayTempArr,
                    nightTemperatures: nightTempArr,
                    weekDays: weekDaysArr,
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
      const weatherImage = images.iconClouds;
      return (
        <ImageBackground source={require('../assets/backgroundImage/sky.png')} style={styles.imageBackground}>
            <Text style={styles.cityName}>{this.state.city}</Text>
            <View style={styles.details}>
                <View style={styles.cell}>
                    <FlatList
                        data={this.state.weekDays}
                        renderItem={({item}) => <Text style={styles.h1} >{item.key}</Text>}
                    />
                </View>
                <View style={styles.cell}>
                    <Image resizeMode='center' style={styles.weatherImage} source={weatherImage}/>
                    <Image resizeMode='center' style={styles.weatherImage} source={weatherImage}/>
                    <Image resizeMode='center' style={styles.weatherImage} source={weatherImage}/>
                    <Image resizeMode='center' style={styles.weatherImage} source={weatherImage}/>
                    <Image resizeMode='center' style={styles.weatherImage} source={weatherImage}/>
                </View>
                <View style={styles.smallCell}>
                    <FlatList
                        data={this.state.dayTemperatures}
                        renderItem={({item}) => <Text style={styles.h1} >{item.key}</Text>}
                    />
                </View>
                <View style={styles.smallCell}>                
                    <FlatList
                        data={this.state.nightTemperatures}
                        renderItem={({item}) => <Text style={styles.h1} >{item.key}</Text>}
                    />
                </View>
            </View>

        </ImageBackground> 
      );
    }
  }
