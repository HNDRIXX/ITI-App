import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, BackHandler, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Image } from 'expo-image';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

import { lateStyle } from '../../../components/styleMap';
import { COLORS, useFonts } from '../../../constant';

export default function GeoIndex () {
  const [onLocation, setOnLocation] = useState(false)
  const [currTime, setCurrTime] = useState(new Date())
  const [isDisabled, setIsDisabled] = useState(true)
  const [location, setLocation] = useState("")

  const currDate = new Date()
  const dateOptions = { weekday: 'long' }
  const formattedDay = currDate.toLocaleDateString(undefined, dateOptions)

  const params = useLocalSearchParams()
  
  const imgUpload = params.geo.replace(/\^/g, '/')

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  }
    // const formattedTime = currDate.toLocaleTimeString(undefined, timeOptions)
    const onOpenLoc = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== 'granted') { return }

      try { const location = await Location.getCurrentPositionAsync({}) } 
      catch (error) { console.log(error) }
    }

    // useEffect(() => {
    //   const intervalId = setInterval(() => {
    //     setCurrTime(new Date())
    //   }, 1000)

    //   return () => clearInterval(intervalId)
    // }, [])

    useEffect(() => {
      (async () => {
        const locationStatus = await Location.requestForegroundPermissionsAsync()

        if (locationStatus.status === 'granted') {
          const currentLocation = await Location.getCurrentPositionAsync({})
          setLocation(currentLocation.coords)
        }
      })()
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
      }, 1000)

      return () => clearInterval(interval)
    }, [])

    const [mapRegion, setMapRegion] = useState({
      latitude: 14.643779,
      longitude: 121.026478,
      latitudeDelta: 0.001,
      longitudeDelta: 0.005,
    })

    const [markerCoordinate, setMarkerCoordinate] = useState({
      latitude: 14.643779,
      longitude: 121.026478,
    })

    return (
      <>
        <View style={styles.topContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.push(`/pages/home/`)}>
                <AntDesign name='arrowleft' size={30} color={COLORS.clearWhite} />
            </TouchableOpacity>
          </View>
            
            <ScrollView style={styles.container}>
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
                    showsPointsOfInterest
                    showsMyLocationButton
                    style={{ height: 300 }}
                    region={mapRegion}
                    showsUserLocation
                    followsUserLocation
                    customMapStyle={lateStyle}
                    showsTraffic
                    loadingEnabled
                    userInterfaceStyle='light'
                    userLocationPriority='high'
                    // onPress={handleMapPress}
                >
                    <Marker
                        coordinate={markerCoordinate}
                        title={`Latitude: ${markerCoordinate.latitude.toFixed(6)}`}
                        description={`Longitude: ${markerCoordinate.longitude.toFixed(6)}`}
                    />
                </MapView>

                { imgUpload && (
                  <>
                    <Image 
                      source={{ uri: imgUpload }}
                      style={styles.imgUpload}    
                    />
                    
                    <Text>Latitude: {location.latitude}</Text>
                    <Text>Longitude: {location.longitude}</Text>
                  </>
                )}

                <View style={styles.bottomContainer}>
                  {/* <Text style={styles.headText}>{formattedTime}</Text>
                  <Text style={styles.subText}>{formattedDay}</Text> */}
                  
                  <TouchableOpacity
                    style={styles.cameraBtn}
                    onPress={() => router.push(`/access/geo/camera`)}
                  >
                    <FontAwesome 
                      name='camera'
                      size={20}
                      color={COLORS.clearWhite}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.confirmBtn, isDisabled ? styles.disabledBtn : null ]}>
                      <Text style={styles.textConfirm}>CONFIRM</Text>
                  </TouchableOpacity>
                </View> 
            </ScrollView>
        </>
    )
}

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
    width: 200,
    marginTop: 15,
    backgroundColor: COLORS.blue,
    alignItems: 'center',
    padding: 13,
    borderRadius: 8
  },

  textConfirm: {
    color: COLORS.clearWhite,
    fontFamily: 'Inter_600SemiBold'
  },

  cameraBtn: {
    backgroundColor: COLORS.orange,
    padding: 15,
    width: 200,
    alignItems: 'center',
    borderRadius: 10,
  },

  imgUpload: {
    width: 200, 
    height: 200,
  }
})
