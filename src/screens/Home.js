import React, { Component } from 'react';
import { View, StatusBar, FlatList, ActivityIndicator, Alert, Text, AsyncStorage } from 'react-native';
import { Container, Content, Body, ListItem, Left, Thumbnail, Header, Title } from 'native-base';
import Menu, { MenuItem } from 'react-native-material-menu';
import Entypo from 'react-native-vector-icons/dist/Entypo';

import { Database, Auth } from '../config'

export default class ChatList extends Component {
    state = {
        users: [],
        refreshing: false,
        uid: null,
    }

    componentWillMount = async () => {
        const uid = await AsyncStorage.getItem('userid')
        this.setState({ uid });
        // console.log()
        this.setState({ refreshing: true });
        Database.ref('user').on('child_added', (data) => {
            let person = data.val();
            person.id = data.key;
            if (person.id != this.state.uid) {
                this.setState((prevData) => {
                    return {
                        users: [...prevData.users, person]
                    }
                })
                this.setState({ refreshing: false });
            }
        })
    }

    _renderItem = ({ item }) => (
        <ListItem avatar onPress={() => this.props.navigation.navigate('Chat', {
            id: item.id, foto: item.photo, name: item.name, status: item.status
        })}>
            <Left>
                <Thumbnail source={{ uri: item.photo }} />
            </Left>
            <Body style={{ marginLeft: 7 }}>
                <Text numberOfLines={1} style={{ fontWeight: 'bold' }}>{item.name}</Text>
                <Text note numberOfLines={1}>{item.status}</Text>
            </Body>
        </ListItem>
    )
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
        console.log(Auth);
        return (
            <Container>
                <Header style={{ backgroundColor: '#05A0E4' }}>
                    <Body>
                        <Title style={{ left: 20 }}>Galecok</Title>
                    </Body>
                </Header>
                <Content>

                    <StatusBar backgroundColor="#05A0E4" barStyle="light-content" />

                    {
                        this.state.refreshing == true ?
                            <ActivityIndicator size="large" color="#05A0E4" style={{ marginTop: 10 }} />
                            :
                            (
                                <View style={{ flex: 1 }}>
                                    <FlatList
                                        data={this.state.users}
                                        renderItem={this._renderItem}
                                        keyExtractor={(item) => item.id}
                                    />
                                </View>
                            )
                    }

                </Content>
                <View style={{ flex: 1, bottom: 365, left: 350 }}>
                    <Menu
                        ref={this.setMenuRef}
                        button={<Text onPress={this.showMenu}><Entypo name='menu' size={25} color={'white'} /></Text>}
                    >
                        <MenuItem onPress={() => this.props.navigation.navigate('Profile')}>Profile</MenuItem>
                        <MenuItem onPress={this.del}>Logout</MenuItem>
                    </Menu>
                </View>
            </Container>
        )
    }
}