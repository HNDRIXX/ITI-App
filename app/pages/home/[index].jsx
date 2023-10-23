import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, ScrollView, } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { COLORS, useFonts } from '../../../constant';
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Shadow } from 'react-native-shadow-2';
import { router, useLocalSearchParams } from 'expo-router';
import NetInfo from '@react-native-community/netinfo';

import HomeButton from '../../../components/button/HomeButton'
import TimeInOut from '../../../components/section/home/TimeInOut'
import Notification from '../../../components/section/Notification'
import ConnectionPrompt from '../../../components/prompt/connection';
import TimeOff from '../../../components/section/home/TimeOff';


export default function App () {
    const router = useRouter()
    const [fontsLoaded] = useFonts()
    const [isConnected, setIsConnected] = useState(null)
    const [clockStatus, setClockStatus] = useState(1)

    const params = useLocalSearchParams()
    const paramsClockStatus = params.index
    console.log(paramsClockStatus)

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
          setIsConnected(state.isConnected)
        })
    
        return () => { unsubscribe() }
    }, [])

    if(!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} color={COLORS.baseOrange} />                
            </View> 
        )
    }

    return (
        <View style={{flex: 1, backgroundColor: COLORS.powderBlue}}>
            {/* { isConnected === null ? 
                    <Text>Checking</Text> 
                : isConnected ? 
                    <ConnectionPrompt />
                : <Text>Not Connected</Text> 
            } */}

                <View style={styles.container}>
                    <StatusBar style="light"/>
                    
                    <View style={styles.headerWrapper}>
                        <View style={styles.headerButtonWrapper}>
                            {/* <TouchableOpacity
                                style={styles.logOutButton}
                                onPress={() => {
                                    Alert.alert(
                                        'Confirm Log-Out',
                                        'Are you sure you want to log-out?',
                                        [
                                            {
                                                text: 'Cancel',
                                                style: 'cancel',
                                            },
                                            {
                                                text: 'Logout',
                                                onPress: () => router.push(`/authentication/base/login`),
                                            },
                                        ],
                                        { cancelable: false }
                                    )
                                }}
                            >
                                <AntDesign 
                                    name="logout"
                                    size={20}
                                    color={COLORS.clearWhite}
                                />
                            </TouchableOpacity> */}

                            <TouchableOpacity
                                onPress={() => router.push('/access/navigation/drawer') }
                            >
                                <FontAwesome 
                                    name={'bars'}
                                    size={25}
                                    color={COLORS.clearWhite}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => router.push('/access/navigation/notification') }
                            >
                                <FontAwesome 
                                    name={'bell'}
                                    size={25}
                                    color={COLORS.clearWhite}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.headerContentWrapper}>
                            <Image 
                                style={styles.userIcon}
                                source={require('../../../assets/img/icons/profile.png')} 
                            />

                            <View>
                                <Text style={styles.headerText}>Hello,</Text>
                                <Text style={styles.belowHeaderText}>Lorem Ipsum!</Text>

                                <View style={styles.statusContainer}>
                                    <Entypo 
                                        name={'briefcase'}
                                        size={15}
                                        color={COLORS.clearWhite}
                                    />
                                    <Text style={styles.statusText}>Work Day</Text>
                                </View>
                            </View>
                        </View>

                        <Text style={styles.timeClockText}>Time Clock</Text>
                    </View>
                
                    
                    <Shadow
                        distance={20}
                        style={styles.timeInOutWrapper}
                    >
                        <View >
                            <TimeInOut 
                                clockStatus={clockStatus}
                                setClockStatus={setClockStatus}
                            />         
                        </View>
                    </Shadow>
                    

                <ScrollView
                    style={styles.bodyWrapper}
                > 
                    <View style={styles.menuContainer}>
                        <Text style={styles.mainTitle}>Menu</Text>
                        <HomeButton />
                    </View>
                    
                    <View style={styles.timeOffContainer}>
                        <Text style={styles.mainTitle}>Time Off</Text>
                        <TimeOff />
                    </View>
                </ScrollView>
                {/* <View style={styles.belowContainer}>
                    <Notification />
                    <View style={styles.hairline} />
                    
                    <HomeButton />
                </View> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logOutButton: {
        alignItems: 'flex-end',
    },

    headerWrapper: {
        padding: 20,
        paddingTop: 5,
        height: 270,
        backgroundColor: COLORS.powderBlue,
    },

    headerButtonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },

    headerContentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },

    userIcon: {
        width: 70,
        height: 70,
        borderWidth: 4,
        borderColor: COLORS.orange,
        borderRadius: 40,
        marginRight: 15
    },

    headerText: {
        fontFamily: 'Inter_800ExtraBold',
        letterSpacing: -.5,
        color: COLORS.clearWhite,
        fontSize: 18,
    },

    belowHeaderText: {
        fontFamily: 'Inter_800ExtraBold',
        letterSpacing: -.5,
        color: COLORS.white,
        fontSize: 20,
    },

    statusContainer: {
        flexDirection: 'row',
        marginTop: 5,
    },

    statusText: {
        color: COLORS.clearWhite,
        fontFamily: 'Inter_600SemiBold',
        marginLeft: 10,     
    },

    timeClockText: {
        color: COLORS.clearWhite,
        fontSize: 16,
        paddingHorizontal: 10,
        marginTop: 15,
        fontFamily: 'Inter_700Bold'
    },

    timeInOutWrapper: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 35,
        paddingBottom: 30,
        borderTopLeftRadius: 80,
        borderTopEndRadius: 80,
        backgroundColor: COLORS.white,
        width: '100%',
    },
   
    bodyWrapper: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
    },

    mainTitle: {
        paddingHorizontal: 10,
        fontSize: 17,
        color: COLORS.powderBlue,
        fontFamily: 'Inter_700Bold',
    },

    menuContainer: {
        flex: 1,
    },

    timeOffContainer: {
        flex: 1,
        marginTop: 20,
        paddingBottom: 20,
    }
})