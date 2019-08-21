import React, { Component } from 'react';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import { View, Text, AsyncStorage, Alert } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';
import { Database, Auth } from '../config';
import { withNavigation } from 'react-navigation';

class MenuBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            photo: '',
            fullname: '',
            userid: ''
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('userid', (err, result) => {
            if (result) {
                this.setState({ userid: result })
            }
        })
        AsyncStorage.getItem('email', (err, result) => {
            if (result) {
                this.setState({ email: result })
            }
        })

        AsyncStorage.getItem('name', (err, result) => {
            if (result) {
                this.setState({ name: result })
            }
        })

        AsyncStorage.getItem('photo', (err, result) => {
            if (result) {
                this.setState({ photo: result })
            }
        })
    }
    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

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

    showMenu = () => {
        this._menu.show();
    };

    render() {
        console.warn('data', this.state.email, this.state.name, this.state.photo, this.state.userid)
        return (
            <View style={{ flex: 1, bottom: 365, left: 350 }}>
                <Menu
                    ref={this.setMenuRef}
                    button={<Text onPress={this.showMenu}><Entypo name='menu' size={25} color={'white'} /></Text>}
                >
                    <MenuItem onPress={() => this.props.navigation.navigate('Profile', {
                        name: this.state.name,
                        email: this.state.email,
                        photo: this.state.photo
                    })}>Profile</MenuItem>
                    <MenuItem onPress={this.del}>Logout</MenuItem>
                </Menu>
            </View>
        );
    }
}

export default withNavigation(MenuBar);