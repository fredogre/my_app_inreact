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
    const { navigation } = this.props;
    var id = navigation.getParam("id");
    console.log(id)

    return fetch("https://rocket-api-fred.azurewebsites.net/api/elevators/status" + id, {
      method: "GET"
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          elevatorID: id,
          elevatorStatus: responseJson,
          isLoading: false,
          defectiveElevatorsList: responseJson.status
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
      let elevatorStatus = this.state.elevatorStatus(
        (val, key) => {
          return (
            <TouchableHighlight
              key={key}
              onPress={() => this.setPickerValue(val.ID, val.status)}
              style={styles.container}
            >
              <Text>
                {elevatorStatus}, {this.state.elevatorID}
              </Text>
            </TouchableHighlight>
          );
        }
      );
      return (
        <ScrollView>
          <View style={styles.container}>{this.state.elevatorStatus}</View>
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
