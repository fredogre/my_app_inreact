import React from 'react';
import { StyleSheet, Text, View, Button, Modal, TouchableHighlight, ActivityIndicator, ScrollView } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      defectiveElevatorsList: []
    }
  }

  componentDidMount() {
    return fetch("http://rocketapi.azure-api.net/api/elevators/status", {
      method: "GET"
    })
      .then((response) => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          defectiveElevatorsList: responseJson
        })

      })

      .catch((error) => {
        console.log(error)
      });
  }

  getElevatorDetailsScreen() {
      this.props.navigation.navigate("ElevatorDetailsStack")
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    } else {
      let defectiveElevatorsList = this.state.defectiveElevatorsList.map((val, key) => {
        return <TouchableHighlight style={styles.item} key={key} onPress={() => this.getElevatorDetailsScreen()}><Text style={styles.font_list}> {val.id}  -  {val.building_type}  -  {val.status}</Text></TouchableHighlight>
      });
      return (
        <ScrollView>
          <View style={styles.container}>
            {defectiveElevatorsList}
          </View>
        </ScrollView>

      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  font_list: {
    fontSize: 22,
  },
});