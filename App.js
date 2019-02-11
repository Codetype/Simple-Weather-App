import { createStackNavigator, createAppContainer } from 'react-navigation';

import Forecast from './components/Forecast';
import Weather from './components/Weather';
import Application from './components/Application';

const AppNavigator = createStackNavigator({
  AppScreen: { screen: Application },
  WeatherScreen: { screen: Weather },
  ForecastScreen: { screen: Forecast },
});


export default createAppContainer(AppNavigator);
 