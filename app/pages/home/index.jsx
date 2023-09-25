import React from 'react'
import { View, Text, ImageBackground, SafeAreaView, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { COLORS, useFonts } from '../../../constant'
import { StatusBar } from 'expo-status-bar'

import HomeButton from '../../../components/button/HomeButton'
import { useState } from 'react'
import HeaderCard from '../../../components/card/HeaderCard'
import GridButton from '../../../components/button/GridButton'
import { loadAsync } from 'expo-font'
import { Entypo, MaterialCommunityIcons, EvilIcons } from '@expo/vector-icons'
import TimeInOutButton from '../../../components/button/TimeInOutButton'

export default function App () {
    const router = useRouter()
    const [fontsLoaded] = useFonts()
    const [statusPress, setStatusPress] = useState(true)

    if(!fontsLoaded) { 
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center'
            }}>
                <ActivityIndicator size={'large'} color={COLORS.baseOrange} />
            </View>
        )
    }

    return (
        <SafeAreaView 
            style={{
                flex: 1,
                backgroundColor: '#F7F7F7',
            }}
        >
            <View style={styles.container}>
                <StatusBar style="light"/>

                <View style={styles.headerWrapper}>
                    <View style={styles.headerTextWrapper}>
                        <Text style={styles.headerText}>Hello!</Text>
                    </View>
                    <Text style={styles.headerSubText}>Testing development</Text>
                </View>

                <TimeInOutButton />
            </View>

            <View style={styles.belowContainer}>
                <View style={styles.hairline} />
                
                <HomeButton />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 13,
    },

    hairline: {
        borderBottomColor: COLORS.gray,
        borderBottomWidth: StyleSheet.hairlineWidth, 
    },

    headerWrapper: {
        marginBottom: 10,
    },

    headerText: {
        fontFamily: 'Inter_800ExtraBold',
        letterSpacing: -.5,
        color: COLORS.orange,
        fontSize: 27,
    },

    headerSubText: {
        fontFamily: 'Inter_400Regular',
    },

    belowContainer: {
        margin: 13,
    }
})