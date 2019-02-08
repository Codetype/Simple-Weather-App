import { createStackNavigator, createAppContainer } from 'react-navigation';

import Forecast from './components/Forecast';
import Application from './components/Application';

const AppNavigator = createStackNavigator({
  AppScreen: { screen: Application },
  ForecastScreen: { screen: Forecast }
});


export default createAppContainer(AppNavigator);
 