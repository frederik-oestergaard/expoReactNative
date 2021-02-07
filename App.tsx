import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  var config = {
    apiKey: "AIzaSyCjWvauKhB-7i36JvK-roJ3WckHtoH9SGs",
    authDomain: "sg-fotex-hd-dev.firebaseapp.com",
    projectId: "sg-fotex-hd-dev",
    storageBucket: "sg-fotex-hd-dev.appspot.com",
    messagingSenderId: "166090563833",
    appId: "1:166090563833:web:1a9e9edba78df8ac258228"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  } else {
    firebase.app(); // if already initialized, use that one
  };

  // Get a reference to the database service
  var database = firebase.database();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
