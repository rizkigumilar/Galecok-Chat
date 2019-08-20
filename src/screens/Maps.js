import React, { Component } from 'react';
import { StatusBar, View, Text, TouchableHighlight, StyleSheet, AsyncStorage, Alert, Image } from 'react-native';
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
        console.log('data user bro', this.state.users)
        return (
            <ScrollView>
                <View>
                    <StatusBar backgroundColor='white' barStyle='dark-content' />
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        showsMyLocationButton={true}
                        showsIndoorLevelPicker={true}
                        // customMapStyle={styles.map}
                        style={{ flex: 1, height: 650, width: 400 }}
                        initialRegion={{
                            latitude: -7.7586432,
                            longitude: 110.3781322,
                            latitudeDelta: 0.0022,
                            longitudeDelta: 0.0021,
                        }}
                    >

                        {this.state.users.map((item) => {
                            console.warn(item)
                            return (<Marker
                                draggable
                                coordinate={{
                                    latitude: item.latitude,
                                    longitude: item.longitude
                                }}
                                title={item.name}
                                description={item.email}
                            ><Image
                                    source={{ uri: item.photo }}
                                    style={{ height: 30, width: 30 }} /></Marker>)

                        })}
                    </MapView>
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