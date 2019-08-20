import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    createStackNavigator,
    createSwitchNavigator,
    createAppContainer,
    createBottomTabNavigator
} from 'react-navigation';

import HomeScreen from '../screens/Home';
import Maps from '../screens/Maps';
import Login from '../screens/Login';
import Register from '../screens/Register'
import AuthLoading from '../screens/Splash';
import MenuBar from '../components/MenuBar';

const HomeStack = createStackNavigator(
    {
        Home: { screen: HomeScreen },
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#05A0E4',
            },
            headerTintColor: 'white',
            headerTitle: 'Galecok',
            headerRight: <MenuBar />
        },
    }
);

const MapsStack = createStackNavigator(
    {
        Maps: { screen: Maps },
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#05A0E4',
            },
            headerTintColor: 'white',
            title: 'Maps',
        },
    }
);


const AppStack = createBottomTabNavigator(
    {
        Home: { screen: HomeStack },
        Maps: { screen: MapsStack }
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `ios-home`;
                } else if (routeName === 'Maps') {
                    iconName = `md-map`;
                }
                return <IconComponent name={iconName} size={25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: '#05A0E4',
            inactiveTintColor: 'gray',
        },
    }
);


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