import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    }
  }
  
  refresh() {
    fetch("http://rocketapi.azure-api.net/api/elevators/", {
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

  componentDidMount() {

    const { navigation } = this.props;
    this.state.defectiveElevatorsList = navigation.getParam('newDefectiveElevatorsList');

    return fetch("http://rocketapi.azure-api.net/api/elevators/", {
      method: "GET"
    })
      .then((response) => response.json())
      .then(responseJson => {
        
        this.setState({
          isLoading: false,
          defectiveElevatorsList: responseJson,
        })
      })

      .catch((error) => {
        console.log(error)
      });
  }

  getElevatorDetailsScreen(id) {
    this.props.navigation.navigate("ElevatorDetails", {
        elevatorID: id,
        elevatorList: this.state.elevatorList
    })
  }

  getHomeScreen() {
    this.props.navigation.navigate("Home");
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
        return <TouchableHighlight style={styles.item} key={key} onPress={() => this.getElevatorDetailsScreen(val.id)}><Text style={styles.font_list}>  {val.id}  -  {val.buildingType}</Text></TouchableHighlight>
      });
      return (
        <ScrollView>
          <View style={styles.welcomeContainer}>

            <Image source={require('../assets/images/R2.png')} style={styles.welcomeImage}/>
          </View>
          <View>
          <TouchableOpacity onPress={() => this.refresh()} style={styles.buttonStyle}>
          <Text style={styles.logout}>
                REFRESH THE LIST
              </Text>
          </TouchableOpacity>
          </View>
          <View style={styles.container}>
            {defectiveElevatorsList}
          </View>

          <View>
            <TouchableOpacity onPress={() => this.getHomeScreen()} style={styles.buttonStyle}>
              <Text style={styles.logout}>
                LOG OUT
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    color : '#000',
  },
  item: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: .25,
    borderBottomColor: '#eee'
  },
  font_list: {
    fontSize: 22,
    color : '#000',
  },
  buttonStyle: {
    width: '100%',
    height: 100,
    backgroundColor: 'rgba(33, 150, 243, 1)',
    fontSize: 22,
    justifyContent: 'center',
    alignItems: 'center',
    color : 'rgb(255, 255, 255)',
  },
  welcomeImage: {
    width: 175,
    height: 80,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',    
  },
  welcomeContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF', 
  },
  logout: {
    color : 'rgba(255, 255, 255, 1)',
    fontSize: 22,
    fontWeight: '100',
  }
});