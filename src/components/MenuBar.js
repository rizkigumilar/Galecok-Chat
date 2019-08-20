import React, { Component } from 'react';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { View, Text, AsyncStorage, Alert } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';
import { Database, Auth } from '../config';
import { withNavigation } from 'react-navigation';

class MenuBar extends Component {
    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    del = async () => {
        const userToken = await AsyncStorage.getItem('userid')
            .then(() => {
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
            )
    }

    showMenu = () => {
        this._menu.show();
    };

    render() {
        return (
            <View style={{ right: 20 }}>
                <Menu
                    ref={this.setMenuRef}
                    button={<Text onPress={this.showMenu}><Entypo name='dots-three-vertical' size={25} color={'white'} /></Text>}
                >
                    <MenuItem onPress={this.del}>Logout</MenuItem>
                </Menu>
            </View>
        );
    }
}

export default withNavigation(MenuBar);