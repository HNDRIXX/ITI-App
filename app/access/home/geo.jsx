import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, ActivityIndicator, TouchableOpacity, BackHandler } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { nightStyle, noonStyle, lateStyle } from '../../../components/styleMap';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, useFonts } from '../../../constant';
import * as Location from 'expo-location';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function MapIndex () {
    const [onLocation, setOnLocation] = useState(false)
    const [currTime, setCurrTime] = useState(new Date())
    const [isDisabled, setIsDisabled] = useState(true)

    const currDate = new Date()
    const dateOptions = { weekday: 'long' }
    const formattedDay = currDate.toLocaleDateString(undefined, dateOptions)

    const timeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    }
    const formattedTime = currDate.toLocaleTimeString(undefined, timeOptions)

    const onOpenLoc = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') { return }

      try { const location = await Location.getCurrentPositionAsync({}) } 
      catch (error) { console.log(error) }
    }

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrTime(new Date())
      }, 1000)

      return () => clearInterval(intervalId);
    }, [])

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const isLocationEnabled = await Location.getProviderStatusAsync()

                if (!isLocationEnabled.locationServicesEnabled) {
                  setOnLocation(true)
                  setIsDisabled(true)
                } else {
                  setOnLocation(false)
                  setIsDisabled(false)
                }                

            } catch (error) { console.error("Error checking location services:", error) }
        }, 200)

        return () => clearInterval(interval)
    }, [])

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

    return (
        <>
          <View style={styles.topContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <AntDesign name='arrowleft' size={30} color={COLORS.clearWhite} />
            </TouchableOpacity>
          </View>
            
            <View style={styles.container}>
              { onLocation ? (
                    <View style={styles.locWrapper}>
                      <View style={styles.locationPrompt}>
                          <View style={styles.locationPromptWrapper}>
                              <Ionicons name="warning" size={24} color="red" />
                              <Text style={styles.floatPromptText}>Prompt</Text>
                          </View>

                          <Text style={styles.subFloatText}>Please turn on.</Text>

                          <TouchableOpacity style={styles.locationPromptBtn} onPress={onOpenLoc}>
                              <Text style={styles.locationPromptBtnText}>TURN ON</Text>
                          </TouchableOpacity>
                      </View>
                    </View>
                ) : ( <></> )}

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

                <View style={styles.bottomContainer}>
                  <Text style={styles.headText}>{formattedTime}</Text>
                  <Text style={styles.subText}>{formattedDay}</Text>

                  <TouchableOpacity style={[styles.confirmBtn, isDisabled ? styles.disabledBtn : null ]}>
                      <Text style={styles.textConfirm}>CONFIRM</Text>
                  </TouchableOpacity>
                </View> 
            </View>
        </>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topContainer: {
    backgroundColor: COLORS.blue,
    paddingTop: 40,
    paddingBottom: 10,
  },

  backButton: {
    paddingHorizontal: 10,
  },

  disabledBtn: {
      backgroundColor: 'gray',
      opacity: 0.3,
  },

  locWrapper: {
    flex: 1,
    zIndex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.tr_gray,
  },
  
  locationPrompt: {
    backgroundColor: COLORS.clearWhite,
    elevation: 9,
    width: 300,
    borderRadius: 8, 
    padding: 20,
    shadowColor: COLORS.darkGray,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4, 
    shadowRadius: 3, 
  },

  locationPromptWrapper: {
    flexDirection: 'row',
  },

  floatPromptText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: 'red',
    paddingLeft: 7,
  },

  subFloatText: {
    fontSize: 13,
    fontStyle: 'italic',
  },  
  
  locationPromptBtn: {
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    padding: 15,
    marginTop: 15,
    borderRadius: 5,
  },

  locationPromptBtnText: {
    fontSize: 15,
    fontFamily: 'Inter_700Bold',
    color: COLORS.white,
  },

  bottomContainer: {
    height: 160,
    padding: 20,
    justifyContent: 'ceneter',
    alignItems: 'center',
  },

  headText: {
    fontSize: 27,
    color: COLORS.darkGray,
    fontFamily: 'Inter_600SemiBold'
  },

  confirmBtn: {
    marginTop:30,
    width: '100%',
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    padding: 13,
    borderRadius: 8
  },

  textConfirm: {
    color: COLORS.clearWhite,
    fontFamily: 'Inter_600SemiBold'
  }


})
