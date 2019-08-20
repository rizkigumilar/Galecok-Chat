import React, { Component } from 'react'
import { View, ActivityIndicator } from 'react-native'
import firebase from 'firebase'

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uid: ''
        };
    }

    componentDidMount() {

        let firebaseConfig = {
            apiKey: "AIzaSyDwGGMrH1L6X3MfqaRJxbWdQbKjkd96o-o",
            authDomain: "galecokapps.firebaseapp.com",
            databaseURL: "https://galecokapps.firebaseio.com",
            projectId: "galecokapps",
            storageBucket: "",
            messagingSenderId: "594695007468",
            appId: "1:594695007468:web:ec3cbb7e3be7b44e"
        };
        // Initialize Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'App' : 'Auth')
        })
    }

    render() {
        return (
            <React.Fragment>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#5ba4e5" />
                </View>
            </React.Fragment>
        )
    }
}