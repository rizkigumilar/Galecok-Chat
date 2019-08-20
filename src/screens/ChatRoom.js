import React, { Component } from 'react';
import { Platform, StyleSheet, View, StatusBar, Image, AsyncStorage, ImageBackground, FlatList, Dimensions } from 'react-native';
import { Container, Content, Header, Right, Body, Title, Subtitle, Icon, Item, Input, Button, Text, Footer, Left } from 'native-base';
import moment from 'moment';

import { Database, Auth } from '../config';

export default class ChatRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messagesList: [],
            textMessage: '',
            email: null,
            uid: null,
            idPerson: props.navigation.getParam('id'),
            foto: props.navigation.getParam('foto'),
            name: props.navigation.getParam('name'),
            status: props.navigation.getParam('status'),
        };


    }

    componentDidMount = async () => {
        const email = await AsyncStorage.getItem('user');
        this.setState({ email })
        const uid = await AsyncStorage.getItem('userid');
        this.setState({ uid });
        Database.ref('messages').child(this.state.uid).child(this.state.idPerson).on('child_added', (value) => {
            console.log(value);

            this.setState((prevData) => {
                return {
                    messagesList: [...prevData.messagesList, value.val()]
                }
            })
        })
    }

    send = async () => {
        if (this.state.textMessage != '') {
            let msgId = Database.ref('messages').child(this.state.uid).child(this.state.idPerson).push().key;
            console.log(msgId);

            let updates = {};
            let message = {
                message: this.state.textMessage,
                time: moment().format('DD/MM/YYYY HH:mm'),
                from: this.state.email
            }
            updates['messages/' + this.state.uid + '/' + this.state.idPerson + '/' + msgId] = message;
            updates['messages/' + this.state.idPerson + '/' + this.state.uid + '/' + msgId] = message;
            Database.ref().update(updates);
            this.setState({ textMessage: '' });
        }
    };

    renderMessage = ({ item }) => (
        <View style={{
            display: 'flex',
            flexDirection: 'column',
            width: '60%',
            alignSelf: item.from === this.state.email ? 'flex-end' : 'flex-start',
            backgroundColor: item.from === this.state.email ? '#CCCCCC' : '#05A0E4',
            borderRadius: 5,
            marginBottom: 10
        }}>
            <Text style={{ padding: 7, fontSize: 15 }}>{item.message}</Text>
            <Text style={{ textAlign: 'right', paddingRight: 5, fontSize: 10, color: "#4C4C4C" }}>{item.time}</Text>
        </View>
    );

    render() {
        const { height, width } = Dimensions.get('window');
        console.log("User Yang Login ", this.state.uid);
        console.log("User yang dichat", this.state.idPerson);

        return (
            <Container>
                <Header style={{ backgroundColor: '#05A0E4' }}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('Home')}
                        >
                            <Icon name="arrow-round-back" type="Ionicons" style={styles.iconStyle} />
                        </Button>
                    </Left>
                    <Right>
                        <Button transparent >
                            <Image source={{ uri: this.state.foto }} style={{ height: 35, width: 35, borderRadius: 100 / 2, right: 240 }} />
                        </Button>
                        <Title style={{ fontSize: 20, fontWeight: 'bold', right: 230, bottom: 15 }}>{this.state.name}</Title>
                        <Subtitle style={{ fontSize: 12.5, color: 'white', right: 273 }} numberOfLines={1}>{this.state.status}</Subtitle>
                    </Right>
                </Header>

                <StatusBar backgroundColor="#05A0E4" barStyle="light-content" />

                <Content>
                    <FlatList
                        style={{ padding: 10, height: height * 0.73 }}
                        data={this.state.messagesList}
                        renderItem={this.renderMessage}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </Content>

                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
                    <Item rounded style={{ backgroundColor: '#FFFFFF', paddingLeft: 10, paddingRight: 10, marginRight: 5, marginLeft: 5, marginBottom: 10, elevation: 3 }}>
                        <Input
                            placeholder='Ketik Pesan'
                            value={this.state.textMessage}
                            onChangeText={(textMessage) => this.setState({ textMessage })} />
                        <Button transparent onPress={this.send}>
                            <Image
                                source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLiVb7kivo5IeWGNU8An1p61BzXcY854FscXZJCmSYDkRgKExn2g" }}
                                style={{ height: 25, width: 35, right: 10 }} />
                        </Button>
                    </Item>
                </View>

            </Container>
        )
    }
}

const styles = StyleSheet.create({
    avatar: {
        width: 40,
        height: 40,
        borderColor: 'white',
        borderWidth: 1
    },
    iconStyle: {
        color: 'white',
        marginHorizontal: 10
    }
})
