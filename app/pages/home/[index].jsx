import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, ScrollView, } from 'react-native';
import { Image } from 'expo-image';
import { useGlobalSearchParams, useRouter } from 'expo-router';
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
import BottomNavigation from '../../../components/button/BottomNavigation';


export default function App () {
    const router = useRouter()
    const [fontsLoaded] = useFonts()
    const [isConnected, setIsConnected] = useState(null)

    const params = useGlobalSearchParams()

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
                                <Text style={styles.belowHeaderText}>Juan Dela Cruz!</Text>

                                <View style={styles.statusContainer}>
                                    <Entypo 
                                        name={'briefcase'}
                                        size={20}
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
                        <TimeInOut 
                            clockedValue = { params.clockedValue == undefined ? 1 : params.clockedValue }
                            clockedStatus = { params.clockedStatus == undefined ? null : params.clockedStatus }
                            clockedDate = { params.clockedDate == undefined ? null : params.clockedDate }
                            clockedTime = { params.clockedTime == undefined ? null : params.clockedTime }
                        /> 
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
            </View>

            <BottomNavigation active={"home"} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },

    logOutButton: {
        alignItems: 'flex-end',
    },

    headerWrapper: {
        padding: 20,
        paddingTop: 5,
        height: 280,
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
        marginTop: 15,
        marginHorizontal: 10
    },

    userIcon: {
        width: 83,
        height: 83,
        borderWidth: 4,
        borderColor: COLORS.orange,
        borderRadius: 40,
        marginRight: 15
    },

    headerText: {
        fontFamily: 'Inter_800ExtraBold',
        letterSpacing: -.5,
        color: COLORS.clearWhite,
        fontSize: 24,

        textShadowColor: COLORS.tr_gray,
        textShadowOffset: {width: 1.5, height: 2},
        textShadowRadius: 17
    },

    belowHeaderText: {
        fontFamily: 'Inter_800ExtraBold',
        letterSpacing: -.5,
        color: COLORS.clearWhite,
        fontSize: 25,
        lineHeight: 26,

        textShadowColor: COLORS.tr_gray,
        textShadowOffset: {width: 1.5, height: 2},
        textShadowRadius: 17
    },

    statusContainer: {
        flexDirection: 'row',
        marginTop: 2,
        alignItems: 'center'
    },

    statusText: {
        color: COLORS.clearWhite,
        fontFamily: 'Inter_600SemiBold',
        marginLeft: 10,    
        fontSize: 15, 
    },

    timeClockText: {
        color: COLORS.clearWhite,
        fontSize: 17,
        paddingHorizontal: 10,
        marginTop: 15,
        fontFamily: 'Inter_700Bold'
    },

    timeInOutWrapper: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
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