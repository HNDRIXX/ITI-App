import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { COLORS, useFonts } from '../../../constant';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import NetInfo from '@react-native-community/netinfo';

import HomeButton from '../../../components/button/HomeButton'
import TimeInOut from '../../../components/section/home/TimeInOut'
import Notification from '../../../components/section/Notification'
import ConnectionPrompt from '../../../components/prompt/connection';

export default function App () {
    const router = useRouter()
    const [fontsLoaded] = useFonts()
    const [isConnected, setIsConnected] = useState(null)

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
        <>
            {/* { isConnected === null ? 
                    <Text>Checking</Text> 
                : isConnected ? 
                    <ConnectionPrompt />
                : <Text>Not Connected</Text> 
            } */}

            <View 
                style={{
                    flex: 1,
                    backgroundColor: '#F7F7F7',
                }}
            >
                <View style={styles.container}>
                    <StatusBar style="light"/>
                    
                    <View style={styles.headerWrapper}>

                    <TouchableOpacity
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
                            );
                        }}
                    >
                        <AntDesign 
                            name="logout"
                            size={20}
                            color={COLORS.clearWhite}
                        />
                    </TouchableOpacity>

                        <View style={styles.headerContentWrapper}>
                            <Image 
                                style={styles.userIcon}
                                source={require('../../../assets/img/icons/profile.png')} 
                            />

                            <View>
                                <Text style={styles.headerText}>Hello,</Text>
                                <Text style={styles.belowHeaderText}>Lorem Ipsum!</Text>
                            </View>
                        </View>

                        <TimeInOut />
                    </View>
                </View>

                <View style={styles.belowContainer}>
                    {/* <Notification /> */}

                    {/* <View style={styles.hairline} /> */}
                    
                    <HomeButton />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logOutButton: {
        alignItems: 'flex-end',
    },

    hairline: {
        borderBottomColor: COLORS.gray,
        borderBottomWidth: StyleSheet.hairlineWidth, 
    },

    headerWrapper: {
        padding: 10,
        paddingTop: 5,
        // justifyContent: 'center',
        backgroundColor: COLORS.blue,
    },

    headerContentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    userIcon: {
        width: 70,
        height: 70,
        borderWidth: 4,
        borderColor: COLORS.clearWhite,
        borderRadius: 35,
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
        color: COLORS.lighterOrange,
        fontSize: 28,
        lineHeight: 30,
    },

    topBox: {
        backgroundColor: COLORS.clearWhite,
        padding: 20,
        marginTop: 20,
        borderRadius: 10,
    },

    timeInOutButton: {
        backgroundColor: COLORS.orange,
        padding: 10,
        borderRadius: 10,
    },

    timeInOutText: {
        textAlign: 'center',
        color: COLORS.clearWhite,
        fontFamily: 'Inter_600SemiBold',
    },
    // 1E1E1E

    belowContainer: {
        margin: 13,
    }
})