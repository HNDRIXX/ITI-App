import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, BackHandler, ScrollView, ActivityIndicator, Redirect } from 'react-native';
import { Link } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Image } from 'expo-image';
import moment from 'moment';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { router, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { COLORS } from '../../../../constant';
import { Shadow } from 'react-native-shadow-2';
import SuccessTimeClock from '../../../../components/prompt/SuccessTimeClock';

export default function GeofenceIndex () {
  const [onLocation, setOnLocation] = useState(false)
  const [currTime, setCurrTime] = useState(new Date())
  const [isDisabled, setIsDisabled] = useState(true)
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = useState(false)
  const [clockedStatus, setClockedStatus] = useState('')
  const [clockedValue, setClockedValue] = useState(1)
  const [clockedTime, setClockedTime] = useState('')
  const [clockedDate, setClockedDate] = useState('')
  const [location, setLocation] = useState(null)
  const [currAddress, setCurrAddress] = useState("")
  const [mapRegion, setMapRegion] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  
  const currentTime = moment().format('hh:mm:ss A')
  const currentDate = moment().format('MMMM D, YYYY, dddd')

  var [date, setDate] = useState(new Date())

  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 14.643779,
    longitude: 121.026478,
  })

  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const params = useGlobalSearchParams()
  const paramsClockedValue = params.clockedValue

  console.log(paramsClockedValue)
  
  // const fetchLocationAndAddress = async () => {
  //   setIsLoading(true)
  //   const location = await Location.getCurrentPositionAsync({})
  //   setLocation(location);
  
  //   const { coords } = location
  //   const address = await Location.reverseGeocodeAsync({
  //     latitude: coords.latitude,
  //     longitude: coords.longitude,
  //   });
  
  //   setMapRegion({
  //     latitude: coords.latitude,
  //     longitude: coords.longitude,
  //     latitudeDelta: 0.001,
  //     longitudeDelta: 0.005,
  //   });
  
  //   const fullAddress = `${address[0].name} ${address[0].street}, ${address[0].city}, ${address[0].country}`
  //   setCurrAddress(fullAddress)
  
  //   setIsLoading(false)
  // }

  useEffect(() => {
      var timer = setInterval(() => setDate(new Date()), 1000)
      return function cleanup() {
      clearInterval(timer)
      }
  })

  const permissionLocation = async () => {
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
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
  
      try {
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
        setCurrAddress(fullAddress)
      } catch (error) {
        console.error("Error fetching location and address:", error)
      } finally {
        setIsLoading(false)
      }
    }
  
    fetchData()
  }, [])  
  
  
  const openCustomAlert = () => {
    setIsSuccessAlertVisible(true)

    setClockedDate(currentDate)
    setClockedTime(currentTime)
  }

  const closeCustomAlert = () => {
    setIsSuccessAlertVisible(false)
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

      { isLoading ? ( <ActivityIndicator size={'large'}/>) : (
        <>
          <View style={styles.container}>
            { onLocation ? (
              <View style={styles.locWrapper}>
                <View style={styles.locationPrompt}>
                  <View style={styles.locationPromptWrapper}>
                    <Ionicons name="warning" size={24} color="red" />
                    <Text style={styles.promptText}>Prompt</Text>
                  </View>

                  <Text style={styles.subPromptText}>Please turn on your location.</Text>

                  <TouchableOpacity style={styles.locationPromptBtn} onPress={permissionLocation}>
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
                <Text style={styles.timeText}>{date.toLocaleTimeString()}</Text>
              </View>

              { paramsClockedValue == 0 ? (
                <TouchableOpacity 
                  style={[ styles.clockOutBtn, isDisabled ? styles.disabledBtn : null  ]}
                  disabled={ isDisabled  ? true : false }
                  onPress={() => {
                    setClockedStatus("Clocked Out")
                    setClockedValue(1)
                    openCustomAlert()
                  }}
                >
                  <Ionicons
                    name='stopwatch'
                    size={22}
                    color={COLORS.clearWhite}
                  />

                  <Text style={styles.textClockIn}>Clock-Out</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity 
                  style={[ styles.clockInBtn, isDisabled ? styles.disabledBtn : null  ]}
                  disabled={ isDisabled  ? true : false }
                  onPress={() => {
                    setClockedStatus("Clocked In")
                    setClockedValue(0)
                    openCustomAlert()
                  }}
                >
                  <Ionicons
                    name='stopwatch'
                    size={22}
                    color={COLORS.clearWhite}
                  />

                  <Text style={styles.textClockIn}>Clock-In</Text>
                </TouchableOpacity>
              )}
            </Shadow> 
          </View>

          <SuccessTimeClock
            clockedTime={clockedTime}
            clockedDate={clockedDate}
            clockedStatus={clockedStatus}
            clockedValue={clockedValue}
            subText={currAddress}
            visible={isSuccessAlertVisible}
            onClose={closeCustomAlert}
          />
        </>
      )}
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

  promptText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: 'red',
    paddingLeft: 7,
  },

  subPromptText: {
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

  clockInBtn: {
    width: 170,
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: COLORS.orange,
    justifyContent: 'center',
    padding: 13,
    borderRadius: 8
  },

  clockOutBtn: {
    width: 170,
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: COLORS.powderBlue,
    justifyContent: 'center',
    padding: 13,
    borderRadius: 8
  },

  textClockIn: {
    color: COLORS.clearWhite,
    fontSize: 17,
    fontFamily: 'Inter_700Bold'
  },
})
