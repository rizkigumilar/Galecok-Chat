import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer,
} from 'react-navigation';

import HomeScreen from '../screens/Home';
import Maps from '../screens/Maps';
import ProfileScreen from '../screens/Profile';
import Login from '../screens/Login';
import Register from '../screens/Register'
import AuthLoading from '../screens/Splash';


const AppStack = createStackNavigator({
    Home: HomeScreen,
    Maps: Maps,
    Profile: ProfileScreen,
    Login: Login,
    Register: Register
});

const AuthStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    Register: Register
});

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoading,
        App: AppStack,
        Auth: AuthStack
    },
    {
        initialRouteName: 'AuthLoading',
    }
));