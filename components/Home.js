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
    console.log(this.state.email);
    fetch("http://rocketapi.azure-api.net/api/users/" + this.state.email, {
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
        console.log(responseJson);
        list_user = JSON.stringify(responseJson);
        console.log(list_user);

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

              <Text style={styles.getStartedText}>Rocket Elevators </Text>

            </View>

            <TextInput
              style={styles.textInput}
              placeholder="Enter your email"
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
    width: '100%',
    height: 60,
    backgroundColor: 'rgba(33, 150, 243, 1)',
    fontSize: 22,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'rgba(255, 255, 255, 1)',
  },
  login: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: 22,
    fontWeight: '100',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
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
    color: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 65,
    marginBottom: 50,
  },  
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 200,
    height: 80,
    resizeMode: 'contain',
    marginTop: 20,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 22,
    color: '#acacac',
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 10,
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