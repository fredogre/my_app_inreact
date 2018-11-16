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
    this.refresh = this.refresh.bind(this);

    this.state = {
      isLoading: true,
    }
  }
  
  refresh() {
    fetch("https://rocket-api-fred.azurewebsites.net/api/elevators/status", {
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

    return fetch("https://rocket-api-fred.azurewebsites.net/api/elevators/status", {
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
        elevatorList: this.state.elevatorList,
        callback: this.refresh

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
        if (val.status != "Active") { 
        return <TouchableHighlight style={styles.item} key={key} onPress={() => this.getElevatorDetailsScreen(val.id)}><Text style={styles.font_list}>  {val.id}  -  {val.serialNumber}</Text></TouchableHighlight>
      }});
      return (
        <ScrollView>
          <View style={styles.welcomeContainer}>

            <Image source={require('../assets/images/R2.png')} style={styles.welcomeImage}/>
          </View>
          <View>
          <TouchableOpacity onPress={() => this.refresh()} style={styles.buttonStyle}>
          
          <Text style={styles.logout}>
                ELEVATORS LIST UPDATE
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
    fontSize: 15,
    color : '#000',
  },
  buttonStyle: {
    width: '100%',
    height: 100,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: 'rgb(51, 102, 153)',
    fontSize: 22,
    justifyContent: 'center',
    alignItems: 'center',
    color : 'rgb(254, 252, 252)',
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
    color : 'rgb(254, 252, 252)',
    fontSize: 22,
    fontWeight: '100',
  }
});

// refresh() {
// fetch("http://rocketapi.azure-api.net/api/elevators/