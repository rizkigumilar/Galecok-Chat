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
import ChatRoom from '../screens/ChatRoom';
import Profile from '../screens/Profile'
import EditProfile from '../screens/EditProfile'
import FriendProfile from '../screens/FriendProfile';

const HomeStack = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                header: null
            }
        },
        ChatRoom: {
            screen: ChatRoom,
            navigationOptions: {
                header: null
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                header: null
            }
        },
        FriendProfile: {
            screen: FriendProfile,
            navigationOptions: {
                header: null
            }
        },
        EditProfile: {
            screen: EditProfile,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarVisible: navigation.state.routes[navigation.state.index].routeName === 'ChatRoom' ? false : true
        }),
    }
);

const MapsStack = createStackNavigator(
    {
        Maps: { screen: Maps },
        FriendProfile: {
            screen: FriendProfile,
            navigationOptions: {
                header: null
            }
        },
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
        Chat: { screen: HomeStack },
        Maps: { screen: MapsStack },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === 'Chat') {
                    iconName = `ios-chatbubbles`;
                } else if (routeName === 'Maps') {
                    iconName = `ios-compass`;
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