import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, BackHandler, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Image } from 'expo-image';
import moment from 'moment';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { COLORS } from '../../../../constant';
import { Shadow } from 'react-native-shadow-2';
import SuccessTimeClock from '../../../../components/prompt/SuccessTimeClock';

export default function GeofenceIndex () {
  const [onLocation, setOnLocation] = useState(false)
  const [currTime, setCurrTime] = useState(new Date())
  const [isDisabled, setIsDisabled] = useState(true)
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false)
  const [clockedTime, setClockedTime] = useState('')
  const [clockedDate, setClockedDate] = useState('')
  const [location, setLocation] = useState(null)
  const [currAddress, setCurrAddress] = useState('')
  const [mapRegion, setMapRegion] = useState({})

  const params = useLocalSearchParams()
  const clockStatus = params.geofence

  const currentTime = moment().format('hh:mm:ss A')
  const currentDate = moment().format('MMMM D, YYYY, dddd')

  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 14.643779,
    longitude: 121.026478,
  })

  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const fetchLocationAndAddress = async () => {
    const location = await Location.getCurrentPositionAsync({})
      setLocation(location)
  
      const { coords } = location
      const address = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      })

      setMapRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.005,
      })

      const fullAddress = `${address[0].name} ${address[0].street}, ${address[0].city}, ${address[0].country}`
      setCurrAddress("null")
  }

  const onOpenLoc = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync()
  
    if (status !== 'granted') {
      return
    }
  
    try {
      const location = await Location.getCurrentPositionAsync({})
      fetchLocationAndAddress()
    } catch (error) {
      console.log(error)
    }
  }
  

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setCurrTime(new Date())
  //   }, 1000)

  //   return () => clearInterval(intervalId)
  // }, [])

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        fetchLocationAndAddress()

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
  
  const openCustomAlert = () => {
    fetchLocationAndAddress()
    setIsSuccessAlertVisible(true)

    setClockedDate(currentDate)
    setClockedTime(currentTime)
  }

  const closeCustomAlert = () => {
    setIsSuccessAlertVisible(false)
    clockStatus = 0
    router.push(`/pages/home/${clockStatus}`)
  }

  return (
    <>
      <View style={styles.topHeader}>
          <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => router.push(`/pages/home/[index]`)}
          >
              <AntDesign name='arrowleft' size={30} color={COLORS.clearWhite} />
          </TouchableOpacity>

          <Text style={styles.textHeader}>Time Clock</Text>
      </View>

      <View style={styles.container}>
        { onLocation ? (
          <View style={styles.locWrapper}>
            <View style={styles.locationPrompt}>
              <View style={styles.locationPromptWrapper}>
                <Ionicons name="warning" size={24} color="red" />
                <Text style={styles.floatPromptText}>Prompt</Text>
              </View>

              <Text style={styles.subFloatText}>Please turn on your location.</Text>

              <TouchableOpacity style={styles.locationPromptBtn} onPress={onOpenLoc}>
                <Text style={styles.locationPromptBtnText}>TURN ON</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : ( null )}

        <MapView
          showsPointsOfInterest
          showsMyLocationButton
          style={{ flex: 1, height: 'auto' }}
          region={mapRegion}
          showsUserLocation
          followsUserLocation
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
        
        <Shadow style={styles.bottomContainer}>

          <View style={styles.dateTimeWrapper}>
            <Text style={styles.dateText}>{currentDate}</Text>
            <Text style={styles.timeText}>{currentTime}</Text>
          </View>

          <TouchableOpacity 
            style={[
              styles.confirmBtn, 
              isDisabled && location == "" && currAddress == ""
                ? styles.disabledBtn 
                : null 
            ]}

            disabled={
              isDisabled && location == "" && currAddress == ""
              ? true : false
            }

            onPress={openCustomAlert}
          >
            <Ionicons
              name='stopwatch'
              size={25}
              color={COLORS.clearWhite}
            />

            <Text style={styles.textClockIn}>Clock-In</Text>
          </TouchableOpacity>
        </Shadow> 
      </View>

      <SuccessTimeClock
        clockedTime={clockedTime}
        clockedDate={clockedDate}
        clockedStatus={"Clocked-In"}
        subText={currAddress}
        visible={isSuccessAlertVisible}
        onClose={closeCustomAlert}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  backButton: {
      paddingHorizontal: 10,
  },

  topHeader: {
      padding: 1,
      paddingBottom: 10,
      paddingVertical: 50,
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: COLORS.powderBlue,
  },

  textHeader: {
      color: COLORS.clearWhite,
      fontFamily: 'Inter_600SemiBold',
      fontSize: 18,
      flex: 1,
      textAlign: 'center',
      marginRight: 50,
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
    backgroundColor: COLORS.powderBlue,
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
    width: '100%',
    backgroundColor: COLORS.clearWhite,
    padding: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },

  dateTimeWrapper: {
    alignItems: 'center',
  },

  dateText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium'
  },

  timeText: {
    fontSize: 25,
    fontFamily: 'Inter_700Bold'
  },

  confirmBtn: {
    width: 170,
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: COLORS.orange,
    justifyContent: 'center',
    padding: 13,
    borderRadius: 8
  },

  textClockIn: {
    color: COLORS.clearWhite,
    fontSize: 17,
    paddingLeft: 10,
    fontFamily: 'Inter_600SemiBold'
  },
})
