import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  _getuser() {
    fetch("https://rocket-api-fred.azurewebsites.net/api/users/" + this.state.email, {
      method: "GET"
    })
      .then(function (response) {
        if (response.status == 404) {
          Alert.alert("You need a valid email address");
        } else {
          return response.json();
        }
      })
      .then(responseJson => {
        list_user = JSON.stringify(responseJson);


        if (responseJson) {
          this.props.navigation.navigate("DefectiveElevatorsList");
        }


      });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.welcomeContainer}>
              <Image
                source={
                  __DEV__
                    ? require('../assets/images/R2.png')
                    : require('../assets/images/R2.png')
                }
                style={styles.welcomeImage}
              />
            </View>

            <View style={styles.getStartedContainer}>
              {this._maybeRenderDevelopmentModeWarning()}

              <Text style={styles.getStartedText}> Welcome to Rocket Elevator's Employee Portal </Text>

            </View>

            <TextInput
              style={styles.textInput}
              placeholder="Enter your employee email"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />

            <View>
              <TouchableOpacity onPress={() => this._getuser()} style={styles.buttonStyle}>
                <Text style={styles.login}>
                  LOG IN
              </Text>
              </TouchableOpacity>
            </View>



          </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );
      return (
        <Text style={styles.developmentModeText}>

        </Text>
      );

    } else {
      return (
        <Text style={styles.developmentModeText}>

        </Text>
      );
    }
  }

  _handleHelpPress = () => {
    Alert.alert("Please the head office");
  };
}

const styles = StyleSheet.create({
  buttonStyle: {
    width: '50%',
    height: 50,
    backgroundColor: 'rgb(191, 8, 22)',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'rgba(255, 255, 255, 1)',
    marginLeft: 80,
  },
  login: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 30,
    fontWeight: '100',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  developmentModeText: {
    marginBottom: 50,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 70,
    lineHeight: 19,
    textAlign: 'center',
  },
  textInput: {
    fontSize: 22,
    textAlign: 'center',
    borderWidth: .5,
    borderRadius: 2,
    borderColor: '#ddd',
    paddingTop: 10,
    paddingBottom: 10,
    color: '#000000',
    elevation: 1,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 30,
    marginBottom: 60,
  },  
  contentContainer: {
    paddingTop: 20,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
    marginTop: 40,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 20,
    color: '#acacac',
    lineHeight: 36,
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 40,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 19,
    fontWeight: '400',
    color: '#2e78b7',
  },
});