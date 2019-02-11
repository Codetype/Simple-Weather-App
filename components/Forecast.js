import React, {Component} from 'react';
import { StyleSheet, ImageBackground, View, Text, FlatList, Image} from 'react-native';

const APIKey = '76c7a8c071248e3da783276f1bfcd97e';

const images = {
    iconClouds: require('../assets/backgroundImage/icon-cloud.png'),
};

function getNormalizeWeekDay(weekDay){
    switch(weekDay){
        case 0: return {key: 'Niedziela'};
        case 1: return {key: 'Poniedziałek'};
        case 2: return {key: 'Wtorek'};
        case 3: return {key: 'Środa'}; 
        case 4: return {key: 'Czwartek'}; 
        case 5: return {key: 'Piątek'}; 
        case 6: return {key: 'Sobota'};
    }
}

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
                        weekDaysArr.push(getNormalizeWeekDay(weekDay));
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