import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from 'expo-router';

import { COLORS } from "../../../constant"

export default function TimeInOutSection () {
    const [currTime, setCurrTime] = useState(new Date())

    const currDate = new Date()
    const dateOptions = { weekday: 'long' }
    const formattedDay = currDate.toLocaleDateString(undefined, dateOptions)

    const timeOptions = { 
        hour: 'numeric', 
        minute: 'numeric',
        second: 'numeric', 
        hour12: true 
    }

    const formattedDate = currDate.toLocaleDateString(undefined, dateOptions)
    const formattedTime = currDate.toLocaleTimeString(undefined, timeOptions)

    const currDateSplit = formattedDay.split(', ')
    const day = currDateSplit[0]
    const date = currDateSplit[1]

    useEffect(() => {
        const intervalId = setInterval(() => {
          setCurrTime(new Date())
        }, 1000)

        return () => clearInterval(intervalId);
      }, [])
    
      const formatTime = (date) => {
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const seconds = date.getSeconds()
    
        return `${hours}:${minutes}:${seconds}`
    }

    return (
        <View style={styles.topBox}>
            <View style={styles.wrapperBox}>
                <Text style={styles.dateText}>{formattedDate}</Text>
                <Text style={styles.timeText}>{formattedTime}</Text>

                <TouchableOpacity
                    style={styles.timeInOutButton}
                    onPress={() => { router.push(`/access/access/geofence/${null}`)}}
                >
                    <Text style={styles.timeInOutText}>TIME-IN</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topBox: {
        backgroundColor: COLORS.clearWhite,
        padding: 20,
        marginTop: -100,
        bottom: -20,
        borderRadius: 10,
    },

    timeInOutButton: {
        backgroundColor: COLORS.orange,
        padding: 10,
        marginTop: 15,
        borderRadius: 10,
    },

    timeInOutText: {
        textAlign: 'center',
        color: COLORS.clearWhite,
        fontFamily: 'Inter_600SemiBold',
    },

    timeText: {
        fontFamily: 'Inter_700Bold', 
        fontSize: 27,
        textAlign: 'center',
        color: COLORS.darkGray,
    },

    dateText: {
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
        fontSize: 13,
    }
})