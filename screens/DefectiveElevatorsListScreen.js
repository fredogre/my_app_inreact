import React from 'react';
import { StyleSheet, Text, View, Button, Modal, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      defectiveElevatorsList: []
    }
  }

  componentDidMount() {
    fetch("https://rocket-api-fred.azurewebsites.net/api/elevators/status", {
      method: "GET"
    })
      .then((response) => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          defectiveElevatorsList: responseJson.status
        })

      })

      .catch((error) => {
        console.log(error)
      });
  }
  
  getElevatorDetailsScreen = (id) => {
     return () => {
      this.props.navigation.navigate("ElevatorDetailsStack", {
        id: id
      })
     }
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
        return <TouchableOpacity style={styles.item} key={key} onPress={this.getElevatorDetailsScreen(val.id)}><Text style={styles.font_list}> {val.id}  -  {val.serialNumber}</Text></TouchableOpacity>
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