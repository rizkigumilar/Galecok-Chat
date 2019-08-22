import React, { Component } from 'react'
import { View, Image, StatusBar, StyleSheet } from 'react-native'
import { Thumbnail, Button, Icon, Text } from 'native-base'

export class ProfileFriends extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.navigation.getParam('id'),
            photo: props.navigation.getParam('photo'),
            foto: props.navigation.getParam('foto'),
            name: props.navigation.getParam('name'),
            email: props.navigation.getParam('email'),
            lat: props.navigation.getParam('lat'),
            long: props.navigation.getParam('long'),
        }
    }
    render() {
        return (
            <View style={styles.root}>
                <StatusBar translucent={true} backgroundColor="transparent" />
                <Image source={require('../assets/background.jpg')} resizeMode="stretch" style={styles.imgBackground} />

                <Thumbnail source={{ uri: this.state.foto || this.state.photo }} style={styles.avatar} />
                <View style={styles.profileData}>
                    <Text style={styles.txtFullname}>{this.state.name}</Text>
                    <Text style={styles.txtData}>{this.state.email}</Text>
                </View>
                <Button style={styles.btnLike} onPress={() => this.props.navigation.goBack()}>
                    <Text style={{ textAlign: 'center', width: '100%' }}>Back</Text>
                </Button>
            </View>
        )
    }
}

export default ProfileFriends

const styles = StyleSheet.create({
    iconStyle: {
        color: 'white',
        fontSize: 15,
    },
    btnLike: {
        backgroundColor: '#05A0E4',
        width: 160
    },
    btnChat: {
        backgroundColor: '#05A0E4',
        top: 10,
        width: 160
    },
    txtData: {
        color: '#05A0E4',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18
    },
    txtFullname: {
        color: '#05A0E4',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 24
    },
    profileData: {
        marginVertical: 20
    },
    avatar: {
        borderColor: 'white',
        borderWidth: 2,
        width: 90,
        height: 90,
        borderRadius: 100 / 2
    },
    root: {
        flex: 1,
        backgroundColor: 'black',
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        opacity: 1
    }
})