import React from "react"; // Import React
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constant"; // Fix the import statement for "constants"
import { router } from "expo-router";

export default function BottomNavigation({ active }) { // Destructure active as a prop

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.button}
                disabled={ active == "home" && true }
                onPress={() => router.replace(`pages/home/[index]`)}
            >
                { active == "home" ? (
                    <><Ionicons name="md-home" size={24} color={COLORS.orange} />
                    <Text style={[styles.activeText ]}>Home</Text></>
                ) : ( 
                    <><Ionicons name="md-home-outline" size={24} style={styles.icon} />
                    <Text style={styles.buttonText}>Home</Text></>
                )}
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button} 
                disabled={ active == "calendar" && true }
                onPress={() => router.replace(`pages/calendar/`)}
            >
                { active == "calendar" ? (
                    <><Ionicons name="md-calendar" size={24} color={COLORS.orange} />
                    <Text style={[styles.activeText ]}>Calendar</Text></>
                ) : ( 
                    <><Ionicons name="ios-calendar-outline" size={24} style={styles.icon} />
                    <Text style={styles.buttonText}>Calendar</Text></>
                )}
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button} 
                disabled={ active == "request" && true }
                onPress={() => router.replace(`pages/request/`)}
            >
                { active == "request" ? (
                    <><Ionicons name="folder-open" size={24} color={COLORS.orange} />
                    <Text style={[styles.activeText ]}>Request</Text></>
                ) : ( 
                    <><Ionicons name="folder-open-outline" size={24} style={styles.icon} />
                    <Text style={styles.buttonText}>Request</Text></>
                )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Ionicons name="person-circle-outline" size={24} style={styles.icon} />
                <Text style={styles.buttonText}>Profile</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        bottom: 0,
        backgroundColor: COLORS.clearWhite,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        gap: 50,
        padding: 5,
        elevation: 10,
        overflow: 'hidden',
    },

    button: {
        alignItems: 'center',
    },

    buttonText: {
        fontSize: 12,
        fontFamily: 'Inter_500Medium',
        color: COLORS.darkGray
    },

    activeText: {
        fontSize: 12,
        fontFamily: 'Inter_700Bold',
        color: COLORS.orange
    }
});
