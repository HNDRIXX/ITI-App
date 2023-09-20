import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, ActivityIndicator, TouchableOpacity, BackHandler } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { nightStyle, noonStyle, lateStyle } from '../../../components/styleMap';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, useFonts } from '../../../constant';
import * as Location from 'expo-location';
import { useNavigation, useIsFocused } from '@react-navigation/native';

export default function MapIndex () {
    const [onLocation, setOnLocation] = useState(false)

    const isFocused = useIsFocused()
    const navigation = useNavigation()

    const onOpenLoc = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') { return }

      try { const location = await Location.getCurrentPositionAsync({}) } 
      catch (error) { console.log(error) }
    }

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const isLocationEnabled = await Location.getProviderStatusAsync()

                !isLocationEnabled.locationServicesEnabled ? ( 
                  setOnLocation(true) ) : ( setOnLocation(false) )

            } catch (error) { console.error("Error checking location services:", error) }
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    // useEffect(() => {
    //   const backAction = () => {
    //     if (isFocused) {
    //         navigation.openDrawer()
    //         return true
    //     }
    //     return false
    //   }

    //   const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)

    //   return () => backHandler.remove()
    // }, [navigation, isFocused])

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

    // const handleMapPress = (event) => {
    //     const { latitude, longitude } = event.nativeEvent.coordinate;
    //     setMarkerCoordinate({ latitude, longitude });
    // };

    return (
        <View style={styles.container}>
            <MapView
                showsPointsOfInterest={true}
                showsMyLocationButton={true}
                style={{ flex: 1 }}
                region={mapRegion}
                showsUserLocation={true}
                followsUserLocation={true}
                customMapStyle={noonStyle}
                showsTraffic={true}
                showsBuildings={true}
                loadingEnabled={true}
                userInterfaceStyle='light'
                userLocationPriority='high'
                // onPress={handleMapPress}
            >
                <Marker
                    coordinate={markerCoordinate}
                    title={`Latitude: ${markerCoordinate.latitude.toFixed(6)}`}
                    description={`Longitude: ${markerCoordinate.longitude.toFixed(6)}`}
                >
                </Marker>
            </MapView>

            <View style={styles.floatContainer}>
                <Text style={styles.floatText}>Map</Text>
                <Text style={styles.floatSubText}>This is testing feature.</Text>
            </View>

            { onLocation ? (
                <View style={styles.locationPrompt}>
                    <View style={styles.locationPromptWrapper}>
                        <Ionicons name="warning" size={24} color="red" />
                        <Text style={styles.floatPromptText}>Location is OFF</Text>
                    </View>

                    <TouchableOpacity style={styles.locationPromptBtn} onPress={onOpenLoc}>
                        <Text style={styles.locationPromptBtnText}>Turn On</Text>
                    </TouchableOpacity>
                </View>
            ) : ( <></> )}
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  floatContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    elevation: 9, 
    backgroundColor: COLORS.white, 
    width: 300,
    borderRadius: 8, 
    shadowColor: 'black',
    padding: 10,
    paddingHorizontal: 15,
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.2, 
    shadowRadius: 2, 
  },

  floatText: {
    color: COLORS.orange,
    fontSize: 30,
    fontFamily: 'Montserrat_700Bold'
  },

  floatSubText: {
    color: COLORS.orange,
    fontSize: 13,
    fontFamily: 'Montserrat_500Medium_Italic'
  },
  
  locationPrompt: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: COLORS.clearWhite,
    alignSelf: 'center',
    elevation: 9,
    width: 300,
    borderRadius: 8, 
    shadowColor: 'black',
    padding: 10,
    paddingHorizontal: 15,
    shadowOffset: { width: 100, height: 100 },
    shadowOpacity: 0.2, 
    shadowRadius: 2, 
  },

  locationPromptWrapper: {
    flexDirection: 'row',
  },

  floatPromptText: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 20,
    color: 'red',
    paddingLeft: 7,
  },
  
  locationPromptBtn: {
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    padding: 5,
    marginTop: 10,
    borderRadius: 5,
  },

  locationPromptBtnText: {
    fontSize: 15,
    fontFamily: 'DMSans_700Bold',
    color: COLORS.white,
  }
});
