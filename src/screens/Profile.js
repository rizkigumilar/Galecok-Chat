import React, { Component } from 'react';
import { StatusBar, View, Text, } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
export default class Profile extends Component {
    render() {
        return (
            <ScrollView>
                <View>
                    <StatusBar backgroundColor='white' barStyle='light-content' />
                    <Text>Profile</Text>
                </View>
            </ScrollView>
        );
    }
}