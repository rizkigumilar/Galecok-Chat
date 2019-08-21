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
import ChatRoom from '../screens/ChatRoom';
import Profile from '../screens/Profile'

const HomeStack = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                header: null
            }
        },
        Chat: {
            screen: ChatRoom,
            navigationOptions: {
                header: null
            }
        },
        Profile: {
            screen: Profile
        }
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarVisible: navigation.state.routes[navigation.state.index].routeName === 'Chat' ? false : true
        }),
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
            title: 'Galecok Apps',
        },
    }
);


const AppStack = createBottomTabNavigator(
    {
        Home: { screen: HomeStack },
        Maps: { screen: MapsStack },
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