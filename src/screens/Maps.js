import React, { Component } from 'react';
import { StatusBar, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
export default class Maps extends Component {
    render() {
        return (
            <ScrollView>
                <View>
                    <StatusBar backgroundColor='white' barStyle='dark-content' />
                    <Text>Maps</Text>
                </View>
            </ScrollView>
        );
    }
}