import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import LiveTrackingScreen from './screens/LiveTrackingScreen';

const navigator = createStackNavigator({
  map: LiveTrackingScreen
}, {
  initialRouteName: 'map',
  defaultNavigationOptions: {
    title: 'Order Location Tracking'
  }
});

var firebaseConfig = {
  apiKey: "AIzaSyCjWvauKhB-7i36JvK-roJ3WckHtoH9SGs",
  authDomain: "sg-fotex-hd-dev.firebaseapp.com",
  projectId: "sg-fotex-hd-dev",
  storageBucket: "sg-fotex-hd-dev.appspot.com",
  messagingSenderId: "166090563833",
  appId: "1:166090563833:web:1a9e9edba78df8ac258228"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
};


const App = createAppContainer(navigator);

export default () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <App>
        <SafeAreaProvider>
          <StatusBar />
        </SafeAreaProvider>
      </App>
    );

  }
};
