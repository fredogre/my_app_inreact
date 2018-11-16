import React from 'react';
import {
    StyleSheet,
    Image,
    View,
    Button,
    Text,
    Alert,
} from 'react-native';

export default class ElevatorDetails extends React.Component {
    constructor(props) {
        super(props);
        this._fetch = this._fetch.bind(this)

        this.state = {
            isLoading: true,
            elevatorID: null,
            elevatorStatus: "",
            defectiveElevatorsList: [],
        }
    }

    _fetch(){
        const { navigation } = this.props;
        var id = navigation.getParam('elevatorID');
        this.state.defectiveElevatorsList = navigation.getParam('elevatorList')
        
        fetch("https://rocket-api-fred.azurewebsites.net/api/elevators/" + id, {
            method: "GET"
        })
        .then(response => response.json())
        .then(responseJson => {
            this.setState({
                elevatorID: id,
                elevatorStatus: responseJson.status,
                isLoading: false,
                defectiveElevatorsList: responseJson.status
            });
        })
        
        .catch((error) => {
            console.log(error)
        })
    }


    componentDidMount() {
       this._fetch()
    }
    
    changeElevatorStatusHome = async (id) => {
        // const { navigation } = this.props; 
        if (this.state.elevatorStatus != 'Active') {
            let response = await fetch("https://rocket-api-fred.azurewebsites.net/api/elevators/" + id, {
                method: "PUT",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "status": "Active"
                })
            })
            if(response.status === 204){
                this.setState({ elevatorStatus: "Active" });  
            } else {
                Alert.alert('PROBLEM');
            }

        } else {
            this.props.navigation.navigate("DefectiveElevatorsList", {
                newDefectiveElevatorsList: this.newDefectiveElevatorsList
            });
        }
    }

    ButtonStyle() {
        if (this.state.elevatorStatus != 'Active')
            return 'red';
        else {
            return 'green';
        }
    }

    ButtonText() {
        if (this.state.elevatorStatus != 'Active')
            return 'Change Status to Operational';
        else {
            return 'Home';
        }
    }

    render() {
        return (
            <View style={styles.containerTotal}>
                <View style={styles.welcomeContainer}>
                    <Image source={require('../assets/images/R2.png')} style={styles.welcomeImage} />
                </View>                

                <View style={styles.firstButtom}>
                    <Button onPress={() => { }} title={"ID: " + this.state.elevatorID  + " - Status: " + this.state.elevatorStatus} style={styles.button} color={this.ButtonStyle()} />
                    
                </View>

                <Button title={this.ButtonText()} onPress={() => this.changeElevatorStatusHome(this.state.elevatorID)} />
            </View>

            
        )
    }
}

const styles = StyleSheet.create({
    firstButtom: {
        marginTop: 100,
        marginBottom: 80,        
    },
    containerTotal: {
        backgroundColor: '#FFFFFF',
        height: '100%',
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: '#FFFFFF'
    },
    welcomeImage: {
        width: 240,
        height: 80,
        resizeMode: 'contain',
        marginTop: 60,
        marginLeft: -10,
    },
    text: {
        fontSize: 17,
        color: 'rgb(255, 255, 255)',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 50,
    },
    button: {
        margin: 500,
    }
});
