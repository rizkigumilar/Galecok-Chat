import Firebase from 'firebase';
// import {
// 	FIREBASE_API_KEY,
// 	FIREBASE_AUTH_DOMAIN,
// 	FIREBASE_DATABASE_URL,
// 	FIREBASE_PROJECT_ID,
// 	FIREBASE_MESSAGING_SENDER_ID,
// 	FIREBASE_APP_ID } 
// from 'react-native-dotenv';

let config = {
    apiKey: "AIzaSyDwGGMrH1L6X3MfqaRJxbWdQbKjkd96o-o",
    authDomain: "galecokapps.firebaseapp.com",
    databaseURL: "https://galecokapps.firebaseio.com",
    projectId: "galecokapps",
    storageBucket: "",
    messagingSenderId: "594695007468",
    appId: "com.galecok"
};

let app = Firebase.initializeApp(config);

export const Database = app.database();
export const Auth = app.auth();
