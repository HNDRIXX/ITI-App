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

    const currentDate = new Date()
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    const formattedDate = currentDate.toLocaleDateString(undefined, options)

    const currentLabelDay = new Date()
    const dayOptions = { weekday: 'long' }
    const formattedDay = currentLabelDay.toLocaleDateString(undefined, dayOptions)

    const toggleSwitch = () => {
        setStatusPress((prevStatusPress) => !prevStatusPress)
    }

    const data = ['Advanced', 'Manage', 'Utility', 'Offers']
    const list = ['Sign In', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']

    if(!fontsLoaded) { 
        return <ActivityIndicator size={'large'} color={COLORS.baseOrange} />
    }

    const onPress = () => {
        let id = 1
        console.log("Trigger for Request (useEffect)")
        router.push(`/access/test`)
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
                    <Text style={styles.headerText}>Hello!</Text>
                    <Text style={styles.headerSubText}>Let's explore the app.</Text>
                </View>

                <TimeInOutButton />

                <View style={styles.hairline} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 13,
        // backgroundColor: COLORS.orange
    },

    hairline: {
        marginVertical: 18,
        // marginHorizontal: 10,
        borderBottomColor: COLORS.gray,
        borderBottomWidth: StyleSheet.hairlineWidth, 
    },

    headerWrapper: {
        marginBottom: 10,
    },

    headerText: {
        fontFamily: 'Inter_800ExtraBold',
        letterSpacing: -1,
        color: COLORS.orange,
        fontSize: 33,
    },

    headerSubText: {
        fontFamily: 'Inter_400Regular'
    }
})