import firebase from 'firebase';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import TrackingMap from '../components/TrackingMap';

export default function LiveTrackingScreen() {
  const COLLECTION = "tracking";
  const ORDER_ID = "9002"
  useEffect(() => {
    
    const getGeoData = async () => {
      await firebase
        .firestore()
        .collection(COLLECTION)
        .doc(ORDER_ID)
        .onSnapshot((doc) => {
          if (doc) {
            const data = doc.data();
            const newLatitude = data?.geo?.latitude;
            const newLongitude = data?.geo?.longitude;
            const newExpectedArrival = new Date(data?.expectedArrival?.seconds* 1000 - new Date().getTimezoneOffset()*60000 ).toISOString()
            
            console.log("Coords: ",newLatitude, newLongitude);
            setMarker({
              latlng: {
                latitude: newLatitude,
                longitude: newLongitude,
              },
              title: "Your order",
              description: `Expected arrival: ${newExpectedArrival }`,
            })
          }
        });
    };
    getGeoData();
  }, [])

  const [marker, setMarker] = useState(
    {
      latlng: {
        latitude: 55.6760968,
        longitude: 12.5683371,
      },
      title: "",
      description: "...",
    });

  return (
    <View style={styles.container}>
      <TrackingMap marker={marker} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});