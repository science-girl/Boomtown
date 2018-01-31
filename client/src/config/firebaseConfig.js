import * as firebase from 'firebase';
import 'firebase/auth';

// Initialize firebase app
const config = {
    apiKey: 'AIzaSyB6fGRLoBax-WChiJF-893mOj60k7dklbE',
    authDomain: 'boomtown-e933c.firebaseapp.com',
    databaseURL: 'https://boomtown-e933c.firebaseio.com',
    projectId: 'boomtown-e933c',
    storageBucket: 'boomtown-e933c.appspot.com',
    messagingSenderId: '858540313336'
};
const firebaseApp = firebase.initializeApp(config);
const firebaseAuth = firebaseApp.auth();

export { firebaseApp, firebaseAuth };
