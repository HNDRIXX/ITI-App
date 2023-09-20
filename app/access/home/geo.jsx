import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View, TouchableOpacity, StyleSheet, SafeAreaView, Linking, Platform, Alert } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { noonStyle, lateStyle, nightStyle } from '../../../components/styleMap';
import { router } from 'expo-router';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location';

import { COLORS } from '../../../constant';

export default function Geo () {
    const [onLocation, setOnLocation] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [location, setLocation] = useState(null)
    const [isInsideGeofence, setIsInsideGeofence] = useState(true)

    const geofenceCoordinates = { latitude: 14.643690, longitude: 121.026510 }
    const geofenceRadius = 23
   
    useEffect(() => {
        let interval
        
        const requestLocationPermission = async () => {

            const { status } = await Location.requestForegroundPermissionsAsync()
        
            if (status === 'denied') {
                // console.log('Error')
                // Location.requestForegroundPermissionsAsync()
                Linking.openSettings()
            }
            
            try {
                const isLocationEnabled = await Location.getProviderStatusAsync()

                if (isLocationEnabled.locationServicesEnabled){
                    const currentLocation = await Location.getCurrentPositionAsync({})
                    setLocation(currentLocation)

                    const distance = calculateDistance(
                        currentLocation.coords.latitude,
                        currentLocation.coords.longitude,
                        geofenceCoordinates.latitude,
                        geofenceCoordinates.longitude
                    )

                    if (distance <= geofenceRadius) { setIsInsideGeofence(true) } 
                    else { setIsInsideGeofence(false) }
                    
                    setOnLocation(false)
                    setIsLoading(false)
                }else {
                    setIsLoading(true)
                    setOnLocation(true)
                }

            } catch (error) { console.error("Error checking location services:", error) }
        }

        requestLocationPermission()
        interval = setInterval(requestLocationPermission, 1000)

        return () => { clearInterval(interval) }
    }, [])

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371
        const differenceLat = deg(lat2 - lat1)
        const differenceLon = deg(lon2 - lon1)
        const a =
            Math.sin(differenceLat / 2) * Math.sin(differenceLat / 2) +
            Math.cos(deg(lat1)) * Math.cos(deg(lat2)) * Math.sin(differenceLon / 2) * Math.sin(differenceLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        const distance = R * c * 1000

        return distance
    }

    const deg = (deg) => { return deg * (Math.PI / 180) }

    const onOpenLoc = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync()
  
        if (status !== 'granted') { return }

        try { const location = await Location.getCurrentPositionAsync({}) } 
        catch (error) { console.log(error) }
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.topContainer}>
                <TouchableOpacity style={styles.backButton} onPress={ () => router.back() }>
                    <AntDesign name='back' size={30} color={COLORS.clearWhite} />
                </TouchableOpacity>
            </View>

            {!isLoading ? (
                <>
                    <MapView
                        style={{ flex: 1 }}
                        initialRegion={{
                            latitude: geofenceCoordinates.latitude,
                            longitude: geofenceCoordinates.longitude,
                            latitudeDelta: 0.0005,
                            longitudeDelta: 0.0005,
                        }}
                        customMapStyle={lateStyle}
                        provider={PROVIDER_GOOGLE}
                        showsBuildings={false}
                        showsTraffic={true}
                        showsUserLocation={true}
                        showsIndoors={false}
                        showsIndoorLevelPicker={false}
                        followsUserLocation={true}
                        loadingEnable={true}
                        showsMyLocationButton={true}
                        showsPointsOfInterest={true}
                        rotateEnabled={false}
                    >
                        {location && (
                            <>
                                <Circle
                                    center={{
                                        latitude: geofenceCoordinates.latitude,
                                        longitude: geofenceCoordinates.longitude,
                                    }}
                            
                                    radius={geofenceRadius}
                                    strokeWidth={2}
                                    strokeColor={COLORS.lightOrange}
                                    fillColor={'rgba(5, 45, 203, 0.27)'}
                                />

                                <Marker
                                    coordinate={{
                                        latitude: geofenceCoordinates.latitude,
                                        longitude: geofenceCoordinates.longitude,
                                    }}
                                    pinColor='#FF8000'
                                    title="Geofence"
                                />

                                <Marker
                                    coordinate={{
                                        latitude: location.coords.latitude,
                                        longitude: location.coords.longitude,
                                    }}
                                    pinColor='#007FFF'
                                    title="You"
                                />
                            </>
                        )}
                    </MapView>

                    <View style={styles.textContainer}>
                        {location ? (
                            <Text style={styles.coordText}>Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}</Text>
                        ) : (
                            <Text>Loading...</Text>
                        )}

                        {isInsideGeofence ? (
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.textStatus}>You are </Text>
                                <Text style={[styles.textStatus, {color: 'green'}]}>INSIDE</Text>
                                <Text style={styles.textStatus}> the geofence.</Text>
                            </View>
                        ) : (
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.textStatus}>You are </Text>
                                <Text style={[styles.textStatus, {color: 'red'}]}> OUTSIDE </Text>
                                <Text style={styles.textStatus}>the geofence.</Text>
                            </View>
                        )}
                    </View>
                </>
            ) : ( <View style={styles.loader}><ActivityIndicator size={'large'} color={COLORS.baseOrange} /></View> )}

            {onLocation ? (
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
    )
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    topContainer: {
        backgroundColor: COLORS.blue,
        paddingTop: 40,
        paddingBottom: 10,
    },

    backButton: {
        paddingHorizontal: 10,
    },

    bodyContainer: {
        margin: 13,
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
    },

    textContainer: {
        margin: 13,
        alignItems: 'center'
    },

    coordText: {
        fontFamily: 'DMSans_400Regular',
    },

    textStatus: {
        fontFamily: 'DMSans_700Bold',
        fontSize: 20,
    }
})
