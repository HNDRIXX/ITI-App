import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { COLORS } from "../../constant"
import { router } from 'expo-router';


export default function TimeInOutButton () {
    const [currTime, setCurrTime] = useState(new Date())

    const currDate = new Date()
    const dateOptions = { weekday: 'long' }
    const formattedDay = currDate.toLocaleDateString(undefined, dateOptions)

    const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }

    const formattedDate = currDate.toLocaleDateString(undefined, dateOptions)
    const formattedTime = currDate.toLocaleTimeString(undefined, timeOptions)

    const currDateSplit = formattedDay.split(', ')
    const day = currDateSplit[0]
    const date = currDateSplit[1]

    // Time Function
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
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => router.push(`/access/home/geo`)}
            >
                <EvilIcons 
                    name='pointer'
                    size={120} 
                    color={COLORS.clearWhite}
                />

                <Text style={styles.textButton}>CLOCK-IN</Text>
            </TouchableOpacity>

            <View style={styles.textWrapper}>
                <Text style={styles.timeText}>{formattedTime}</Text>
                <Text style={styles.dateText}>{formattedDate}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        width: 220,
        height: 220,
        borderRadius: 120,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.orange,
        
        elevation: 20,
        shadowColor: COLORS.blue,
        shadowOpacity: 0.9,
        shadowRadius: 5,
        shadowOffset : { width: 1, height: 2},
    },

    textWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },

    textButton: {
        color: COLORS.white,
        fontSize: 15,
        fontFamily: 'Inter_600SemiBold',
    },

    timeText: {
        fontFamily: 'Inter_700Bold', 
        fontSize: 30,
        color: COLORS.darkGray,
    },
    
    dayText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 17,
    },

    dateText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
    }
})