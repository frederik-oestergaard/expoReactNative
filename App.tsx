import { StatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import LiveTrackingScreen from './screens/LiveTrackingScreen';
import { initializeFirebase } from './utils/initializeFirebase';

const navigator = createStackNavigator({
  map: LiveTrackingScreen
}, {
  initialRouteName: 'map',
  defaultNavigationOptions: {
    title: 'Order Location Tracking'
  }
});

initializeFirebase();

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
