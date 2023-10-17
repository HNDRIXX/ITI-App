import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from 'expo-router';

import { Entypo } from '@expo/vector-icons';
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

                <Text style={styles.clockInOutText}>Clocked Out: September 18 at 6:18:00 PM</Text>

                <TouchableOpacity
                    style={styles.timeInOutButton}
                    onPress={() => { router.push(`/access/access/geofence/${null}`)}}
                >
                    <Entypo
                        name={'clock'}
                        size={20}
                        color={COLORS.clearWhite}
                    />
                    <Text style={styles.timeInOutText}>Clock-In</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    topBox: {
        backgroundColor: COLORS.clearWhite,
        padding: 20,
        marginTop: -110,
        bottom: -20,
        borderRadius: 20,
        borderColor: COLORS.orange,
        borderWidth: 2,
    },

    timeInOutButton: {
        backgroundColor: COLORS.orange,
        padding: 13,
        width: 270,
        borderRadius: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
    },

    timeInOutText: {
        textAlign: 'center',
        fontSize: 17,
        marginLeft: 10,
        color: COLORS.clearWhite,
        fontFamily: 'Inter_700Bold',
    },

    timeText: {
        fontFamily: 'Inter_700Bold', 
        fontSize: 23,
        textAlign: 'center',
        color: COLORS.darkGray,
    },

    dateText: {
        fontFamily: 'Inter_400Regular',
        textAlign: 'center',
        fontSize: 11,
    },

    clockInOutText: {
        color: COLORS.darkGray,
        fontSize: 12,
        textAlign: 'center'
    }
})