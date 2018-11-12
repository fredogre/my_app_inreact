import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  TouchableHighlight,
  ActivityIndicator,
  ScrollView
} from "react-native";

export default class ElevatorDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      defectiveElevatorsList: []
    };
  }

  componentDidMount() {
    return fetch("http://rocketapi.azure-api.net/api/elevators/status", {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          defectiveElevatorsList: responseJson
        });
      })

      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    } else {
      let defectiveElevatorsList = this.state.defectiveElevatorsList.map(
        (val, key) => {
          return (
            <TouchableHighlight
              key={key}
              onPress={() => this.setPickerValue(value.value)}
              style={styles.container}
            >
              <Text>
                {val.building_type}, {val.id}
              </Text>
            </TouchableHighlight>
          );
        }
      );
      return (
        <ScrollView>
          <View style={styles.container}>{defectiveElevatorsList}</View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  item: {
    flex: 1,
    alignSelf: "stretch",
    margin: 10,
    marginBottom: 100,
    alignItems: "flex-start",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  }
});
