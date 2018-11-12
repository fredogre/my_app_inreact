import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Home from './components/Home';
import DefectiveElevatorsList from './components/DefectiveElevatorsList';
import ElevatorDetails from './components/ElevatorDetails';

import {createStackNavigator} from 'react-navigation'

const RootStack = createStackNavigator({
  Home: Home,
  DefectiveElevatorsList: DefectiveElevatorsList,
  ElevatorDetails: ElevatorDetails,

})

export default class App extends React.Component {
  render() {
    return <RootStack/>;
  }


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
