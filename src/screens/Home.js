import React, { Component } from 'react';
import { StatusBar, View, Text, TouchableHighlight, StyleSheet, AsyncStorage, Alert, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Database, Auth } from '../config';




export default class Home extends Component {
    del = async () => {
        const userToken = await AsyncStorage.getItem('userid')
        console.warn(userToken)

        Database.ref('/user/' + userToken).update({ status: "Offline" })
        Auth.signOut().then(() => {
            Alert.alert(
                'Logout',
                'Logout success', [
                    { text: 'OK', onPress: () => this.props.navigation.navigate('Auth') }
                ]
            )
        }
        )
    }

    render() {

        return (
            <ScrollView>
                <View>
                    <StatusBar backgroundColor='white' barStyle='dark-content' />
                    <Text>Home</Text>
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