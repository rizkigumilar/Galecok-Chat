import React, { Component } from 'react'
import { View, StyleSheet, StatusBar, TouchableHighlight, Image, TextInput } from 'react-native'
import { Text, Item, Icon, Header, Left, Body, Title, Label, Thumbnail } from 'native-base';
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
                    <TouchableOpacity activeOpacity={0.7} onPress={this.handleChoosePhoto}>
                        {this.state.avatar &&
                            (<Thumbnail source={{ uri: this.state.avatar.uri }} style={styles.avatar} />) ||
                            this.state.photo && (<Thumbnail source={{ uri: this.state.photo }} style={styles.avatar} />)
                        }
                        <Icon name="ios-create" type="Ionicons" style={styles.iconStyle} />
                    </TouchableOpacity>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={{ uri: 'https://png.pngtree.com/svg/20170602/user_circle_1048392.png' }} />
                        <TextInput style={styles.inputs}
                            placeholder="name"
                            keyboardType="default"
                            underlineColorAndroid='transparent'
                            onChangeText={(name) => this.setState({ name })}
                            value={this.state.name} />
                    </View>
                    <View style={styles.inputContainer}>
                        <Image style={styles.inputIcon} source={{ uri: 'http://icons.iconarchive.com/icons/mysitemyway/blue-jeans-social-media/256/mail-icon.png' }} />
                        <TextInput style={styles.inputs}
                            placeholder="Email"
                            keyboardType="email-address"
                            underlineColorAndroid='transparent'
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email} />
                    </View>
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
        borderRadius: 100 / 2,
        top: 60
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
        top: 60,
        left: 60
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 1
    },
    inputContainer: {
        backgroundColor: '#CCCCCC',
        borderRadius: 30,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        top: 60,
        left: 60
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
})