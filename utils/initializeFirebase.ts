import firebase from 'firebase/app';
import 'firebase/firestore';

export const initializeFirebase = () => {
    if (!firebase.apps.length) {
      // Initialize Cloud Firestore through Firebase
      firebase.initializeApp({
        apiKey: 'AIzaSyCjWvauKhB-7i36JvK-roJ3WckHtoH9SGs',
        authDomain: 'sg-fotex-hd-dev.firebaseapp.com',
        projectId: 'sg-fotex-hd-dev',
        storageBucket: 'sg-fotex-hd-dev.appspot.com',
        messagingSenderId: '166090563833',
        appId: '1:166090563833:web:1a9e9edba78df8ac258228',
      });
    } else {
      firebase.app(); // if already initialized, use that one
    }
  };