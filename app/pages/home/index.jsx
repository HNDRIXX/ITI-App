import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { COLORS, useFonts } from '../../../constant'
import { StatusBar } from 'expo-status-bar'

import HomeButton from '../../../components/button/HomeButton'
import TimeInOutButton from '../../../components/button/TimeInOutButton'
import Notification from '../../../components/section/Notification'

export default function App () {
    const router = useRouter()
    const [fontsLoaded] = useFonts()
    const data = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']

    if(!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size={'large'} color={COLORS.baseOrange} />
            </View>
        )
    }

    return (
        <View 
            style={{
                flex: 1,
                backgroundColor: '#F7F7F7',
            }}
        >
            <View style={styles.container}>
                <StatusBar style="light"/>

                <View style={styles.headerWrapper}>
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
                </View>

                <View style={styles.boxWrapper}>
                    <View style={styles.box}>
                        <Text style={styles.boxNum}>1</Text>
                        <Text style={styles.boxTitle}>Vacation{'\n'}Leave</Text>
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.boxNum}>4</Text>
                        <Text style={styles.boxTitle}>Sick{'\n'}Leave</Text>
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.boxNum}>3</Text>
                        <Text style={styles.boxTitle}>Paid{'\n'}Hours</Text>
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.boxNum}>5</Text>
                        <Text style={styles.boxTitle}>Deducted{'\n'}Hours</Text>
                    </View>
                </View>

                <TimeInOutButton />
            </View>

            <View style={styles.belowContainer}>
                <Notification />

                {/* <View style={styles.hairline} /> */}
                <HomeButton />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    hairline: {
        borderBottomColor: COLORS.gray,
        borderBottomWidth: StyleSheet.hairlineWidth, 
    },

    headerWrapper: {
        height: 150,
        padding: 25,
        paddingTop: 10,
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

    boxWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 8,
        marginTop: -50,
    },

    // 1E1E1E

    box: {
        backgroundColor: COLORS.clearWhite,
        padding: 5,
        paddingBottom: 10,
        width: 80,
        height: 100,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',

        elevation: 9,
    },

    boxNum: {
        fontFamily: 'Inter_800ExtraBold',
        color: COLORS.orange,
        fontSize: 40
    },

    boxTitle: {
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.darkGray,
        fontSize: 10,
        lineHeight: 10,
        textAlign: 'center'
    },

    belowContainer: {
        margin: 13,
    }
})