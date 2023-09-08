import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { nightStyle, noonStyle } from '../../../components/styleMap';
import { COLORS, useFonts } from '../../../constant';
import * as Location from 'expo-location';


export default function MapIndex () {
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const isLocationEnabled = await Location.getProviderStatusAsync();

                if (!isLocationEnabled.locationServicesEnabled) {
                    Alert.alert(
                    'Location Services Disabled',
                    'Please enable location services to use this app.',
                    [
                        {
                        text: 'Okay',
                        onPress: async () => {
                            const { status } = await Location.requestForegroundPermissionsAsync();

                            if (status !== 'granted') {
                                setErrorMsg('Permission to access location was denied');
                                return;
                            }

                            try {
                                const location = await Location.getCurrentPositionAsync({});
                            } catch (error) {
                                setErrorMsg('Error getting location data');
                            }
                        },
                        },
                    ],
                    { cancelable: false }
                    );
                }
            } catch (error) { console.error("Error checking location services:", error) }
        }, 8000);

        return () => clearInterval(interval);
    }, []);
  
    const [mapRegion, setMapRegion] = useState({
        latitude: 14.643779,
        longitude: 121.026478,
        latitudeDelta: 0.001,
        longitudeDelta: 0.005,
    });

    const [markerCoordinate, setMarkerCoordinate] = useState({
        latitude: 14.643779,
        longitude: 121.026478,
    });

    const handleMapPress = (event) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setMarkerCoordinate({ latitude, longitude });
    };

    const [fontsLoaded] = useFonts()

    if(!fontsLoaded){ return null }
    
    return (
        <View style={styles.container}>
            <MapView
                style={{ flex: 1 }}
                region={mapRegion}
                showsUserLocation={true}
                showsMyLocationButton={true}
                customMapStyle={noonStyle}
                followsUserLocation={true}
                showsTraffic={true}
                showsBuildings={true}
                loadingEnabled={true}
                userLocationPriority='high'
                // onPress={handleMapPress}
            >
                <Marker
                    coordinate={markerCoordinate}
                    title={`Latitude: ${markerCoordinate.latitude.toFixed(6)}`}
                    description={`Longitude: ${markerCoordinate.longitude.toFixed(6)}`}
                />
            </MapView>

            <View style={styles.floatContainer}>
                <Text style={styles.floatText}>Map</Text>
                <Text style={styles.floatSubText}>This is testing feature.</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  floatContainer: {
    position: 'absolute',
    top: '1.5%',
    left: '3%',
    elevation: 9, 
    backgroundColor: COLORS.white, 
    width: 300,
    borderRadius: 8, 
    shadowColor: 'black',
    padding: 10,
    paddingHorizontal: 15,
    shadowOffset: { width: 100, height: 100 },
    shadowOpacity: 0.2, 
    shadowRadius: 2, 
  },

  floatText: {
    color: COLORS.baseOrange,
    fontSize: 30,
    fontFamily: 'DMSans_700Bold'
  },

  floatSubText: {
    color: COLORS.orange,
    fontSize: 13,
    fontFamily: 'DMSans_500Medium_Italic'
  }
});
