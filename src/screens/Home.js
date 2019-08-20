import React, { Component } from 'react';
import { StatusBar, View, Text, TouchableHighlight, StyleSheet, AsyncStorage, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Auth, Database } from '../config';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
        this.user()
    }

    del = async () => {
        const userToken = await AsyncStorage.getItem('userid')
            .then(() => {
                this.setState({ isLogin: false })
                Database.ref('/user/' + userToken).update({ status: "Offline" })
                Alert.alert(
                    'Logout',
                    'Logout success', [
                        { text: 'OK', onPress: () => this.props.navigation.navigate('Auth') }
                    ]
                )
            })
    }
    user = async () => {
        Database.ref('/user').once('value', (result) => {
            let data = result.val();
            if (data !== null) {
                let users = Object.values(data);
                this.setState({
                    users
                })
            }
        });
    }

    render() {

        return (
            <ScrollView>
                <View>
                    <StatusBar backgroundColor='white' barStyle='dark-content' />
                    <Text>Home</Text>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        showsMyLocationButton={true}
                        showsIndoorLevelPicker={true}
                        // customMapStyle={styles.map}
                        style={{ flex: 1, height: 500, width: 500 }}
                        initialRegion={{
                            latitude: -7.7586432,
                            longitude: 110.3781322,
                            latitudeDelta: 0.0022,
                            longitudeDelta: 0.0021,
                        }}
                    >

                        {this.state.users.map((item) => {
                            return (<Marker
                                onPress={() => {
                                    this.props.navigation.navigate('chatList')
                                }}
                                draggable
                                coordinate={{
                                    latitude: item.latitude,
                                    longitude: item.longitude,
                                }}
                                title={item.name}
                                description={item.email}
                            ><Image
                                    source={{ uri: item.photo }}
                                    style={{ height: 30, width: 30 }} /></Marker>)

                        })}
                    </MapView>


                    <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.del}>
                        <Text style={styles.loginText}>Logout</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    },
})