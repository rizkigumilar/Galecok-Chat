import React, { Component } from 'react';
import { StatusBar, View, Text, TouchableHighlight, StyleSheet, AsyncStorage, Alert, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Fab, Icon } from 'native-base'
import { Auth, Database } from '../config';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import GetLocation from 'react-native-get-location';


export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mapRegion: null,
            latitude: 0,
            longitude: 0,
            users: []
        };
        this.user()
    }
    getCurrentPosition() {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                console.warn(location.latitude);

                let region = {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.00922 * 1.5,
                    longitudeDelta: 0.00421 * 1.5
                }

                this.setState({
                    mapRegion: region,
                    latitude: location.latitude,
                    longitude: location.longitude
                })
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
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
        console.log('data user bro', this.state.users)
        return (
            <ScrollView>
                <View>
                    <StatusBar backgroundColor='white' barStyle='dark-content' />
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        showsMyLocationButton={true}
                        showsIndoorLevelPicker={true}
                        showsUserLocation={true}
                        zoomControlEnabled={true}
                        showsCompass={true}
                        showsTraffic={true}
                        showsBuildings={true}
                        showsScale={true}
                        style={styles.map}
                        region={this.state.mapRegion}
                    >

                        {this.state.users.map((item) => {
                            console.warn(item)
                            return (<Marker
                                draggable
                                coordinate={{
                                    latitude: item.latitude || 0,
                                    longitude: item.longitude || 0
                                }}
                                title={item.name}
                                description={`${item.email}`}
                            >
                                <View>
                                    <Icon name='pin' type='Ionicons' style={{ color: 'steelblue', fontSize: 50 }} />
                                    <Image
                                        source={{ uri: item.photo }}
                                        style={{ width: 40, height: 40, borderRadius: 100 / 2 }} />
                                </View>
                            </Marker>)

                        })}
                    </MapView>
                    <Fab
                        position="bottomRight"
                        onPress={() => this.getCurrentPosition()}
                        style={{ marginVertical: 50, backgroundColor: 'white' }}

                    >
                        <Icon name="locate" type="Ionicons" style={{ color: 'steelblue' }} />
                    </Fab>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 1
    }
})

