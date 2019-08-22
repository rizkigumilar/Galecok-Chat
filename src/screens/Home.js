import React, { Component } from 'react';
import { View, StatusBar, FlatList, ActivityIndicator, Alert, Text, AsyncStorage, StyleSheet, Image } from 'react-native';
import { Container, Content, Body, ListItem, Left, Thumbnail, Header, Title } from 'native-base';
import Menubar from '../components/MenuBar'

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
        <ListItem avatar onPress={() => this.props.navigation.navigate('ChatRoom', {
            id: item.id, foto: item.photo, name: item.name, status: item.status, lat: item.latitude, long: item.logitude
        })}>
            <Left>
                <Thumbnail source={{ uri: item.photo }} />
            </Left>
            <Body style={{ marginLeft: 7 }}>
                <Text numberOfLines={1} style={{ fontWeight: 'bold' }} >{item.name}</Text>
                <Text note numberOfLines={1}>{item.status}</Text>
            </Body>
        </ListItem>
    )


    render() {
        return (
            <Container>
                <Image source={require('../assets/bottom.png')} resizeMode="stretch" style={styles.imgBackground} />
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
                <Menubar />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    imgBackground: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 1
    }

})