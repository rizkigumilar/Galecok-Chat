import React, { Component } from 'react'
import { View, StyleSheet, StatusBar, TouchableHighlight } from 'react-native'
import { Text, Item, Icon, Input, Header, Left, Body, Title, Label, Thumbnail } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker'

export default class EditProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            photo: this.props.navigation.getParam('photo'),
            avatar: null,
            name: this.props.navigation.getParam('name')
        }
    }

    handleChoosePhoto = () => {
        const options = {
            noData: true,
        }

        ImagePicker.showImagePicker(options, response => {
            if (response.uri) {
                this.setState({ avatar: response })
            }
        })
    }
    render() {
        const { avatar, name, photo } = this.state
        return (
            <View>
                <StatusBar translucent={false} backgroundColor="transparent" />
                <Header style={{ backgroundColor: '#05A0E4' }}>
                    <Left>
                        <Icon name="arrow-round-back" type="Ionicons" style={{ color: 'white' }} />
                    </Left>
                    <Body>
                        <Title>Edit Profile</Title>
                    </Body>
                </Header>
                <View>
                    <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} >
                        <Text style={styles.loginText}>Save</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    iconStyle: {
        position: 'absolute',
        top: 65,
        color: '#05A0E4',
        left: 65
    },
    avatar: {
        borderColor: '#05A0E4',
        borderWidth: 2,
        width: 290,
        height: 290,
        borderRadius: 100 / 2
    },
    formInput: {
        width: 300,
        marginHorizontal: 10,
        marginVertical: 60
    },
    textInput: {
        color: 'black'
    },
    icon: {
        color: 'black',
        marginBottom: 30
    },
    root: {
        flex: 1,
        marginVertical: 10,
        alignItems: 'center',
        alignSelf: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        width: 250,
        borderRadius: 30,
        top: 60
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    },
})