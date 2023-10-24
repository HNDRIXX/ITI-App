import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from 'expo-router';
import { router } from 'expo-router';
import moment from 'moment';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { COLORS } from "../../../constant"

export default function TimeInOutSection ({ clockedValue, clockedStatus, clockedDate, clockedTime }) {
    const [currTime, setCurrTime] = useState(new Date())
    var [date, setDate] = useState(new Date())

    useEffect(() => {
        var timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanup() {
        clearInterval(timer)
        }
    })

    const currentDate = moment().format('MMMM D, YYYY, dddd')

    const formattedClocked = moment(clockedDate, 'LL, dddd').format('MMMM DD')
    // useEffect(() => {
    //     setIsClockStatus(clockedValue)
    // }, [])

    return (
        <View style={styles.topBox}>
            <View style={styles.wrapperBox}>
                <Text style={styles.dateText}>{currentDate}</Text>
                <Text style={styles.timeText}>{date.toLocaleTimeString()}</Text>

                {/* Clocked Out: September 18 at 6:18:00 PM */}
                <Text style={styles.clockInOutText}>
                    {/* { clockedStatus }
                    { clockedDate != undefined && ( " : " + formattedClocked) }
                    { clockedTime != undefined && (" at " + clockedTime)} */}
                    Clocked Out: September 18 at 6:18:00 PM
                </Text>


                { clockedValue == 0 && (
                    <Link
                        style={styles.clockOutButton}
                        href={{
                            pathname: `/access/access/geofence/[geofence]`,
                            params: { clockedValue: clockedValue },
                        }}
                    >
                        <Ionicons
                            name='stopwatch'
                            size={25}
                            color={COLORS.clearWhite}
                        />

                        <Text style={styles.timeInOutText}>Clock-Out</Text>
                    </Link>
                )}
                
                { clockedValue == 1 && (
                    <Link
                        style={styles.clockInButton}
                        href={{
                            pathname: `/access/access/geofence/[geofence]`,
                            params: { clockedValue: clockedValue },
                        }} 
                    >
                        <Ionicons
                            name='stopwatch'
                            size={23}
                            color={COLORS.clearWhite}
                        />

                        <Text style={styles.timeInOutText}>Clock-In</Text>
                    </Link>
                )}
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

    clockInButton: {
        backgroundColor: COLORS.orange,
        padding: 13,
        width: 270,
        borderRadius: 10,
        marginTop: 10,
        flexDirection: 'row',
        textAlign: 'center',
    },

    clockOutButton: {
        backgroundColor: COLORS.powderBlue,
        padding: 13,
        width: 270,
        borderRadius: 10,
        marginTop: 10,
        flexDirection: 'row',
        textAlign: 'center',
    },

    timeInOutText: {
        textAlign: 'center',
        fontSize: 17,
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