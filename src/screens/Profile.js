import React, { Component } from 'react'
import { View, Image, StatusBar, StyleSheet, AsyncStorage } from 'react-native'
import { Thumbnail, Button, Icon, Text } from 'native-base'

export class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            photo: ''
        }
    }

    componentDidMount() {
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
    render() {

        return (
            <View style={styles.root}>
                <StatusBar backgroundColor="#05A0E4" />
                <Image source={require('../assets/background.jpg')} resizeMode="stretch" style={styles.imgBackground} />

                <Thumbnail source={{ uri: this.props.navigation.getParam('photo') }} style={styles.avatar} />
                <View style={styles.profileData}>
                    <Text style={styles.txtFullname}>{this.props.navigation.getParam('name')}</Text>
                    <Text style={styles.txtEmail}>{this.props.navigation.getParam('email')}</Text>
                </View>
                <Button style={styles.btnEdit} onPress={() => this.props.navigation.navigate('EditProfile', {

                })}>
                    <Text>Edit Profile</Text><Icon name="ios-create" type="Ionicons" style={styles.iconStyle} />
                </Button>
            </View>
        )
    }
}

export default Profile

const styles = StyleSheet.create({
    iconStyle: {
        color: 'white',
        fontSize: 20,
    },
    btnEdit: {
        backgroundColor: '#05A0E4'
    },
    txtEmail: {
        color: 'white',
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
        marginBottom: 0,
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