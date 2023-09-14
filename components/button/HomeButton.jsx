import React from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView, Platform} from 'react-native'
import { COLORS } from '../../constant'
import { useRouter, router } from 'expo-router'
import { Ionicons, SimpleLineIcons, MaterialCommunityIcons, FontAwesome5, FontAwesome, Entypo, AntDesign, MaterialIcons } from '@expo/vector-icons'

export default function HomeButton () {
  return (
    <ScrollView 
        contentContainerStyle={{ 
            justifyContent: 'center', 
        }}
        showsVerticalScrollIndicator={ Platform.OS == 'web' ? true : false }
    >
        <View style={styles.buttonWrapper}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.gridButton} 
                    onPress={() => router.push(`/access/home/profile`)}
                >
                    <MaterialIcons  name="face" size={75} style={styles.iconOverlay}/>

                    <View style={styles.textButtonWrapper}>
                        <Text style={styles.textButton}>Profile</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.gridButton}  
                    onPress={() => router.push(`/access/home/calendar`)}
                > 
                    <Ionicons name="ios-calendar" size={65} style={styles.iconOverlay} />

                    <View style={styles.textButtonWrapper}>
                        <Text style={styles.textButton}>Calendar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.buttonWrapper}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.gridButton}>
                    <Ionicons name="file-tray-sharp" size={70} style={styles.iconOverlay}/>

                    <View style={styles.textButtonWrapper}>
                        <Text style={styles.textButton}>Reports</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.gridButton}>
                    <Ionicons name="ios-time" size={75} color={COLORS.orange} style={styles.iconOverlay} />

                    <View style={styles.textButtonWrapper}>
                        <Text style={styles.textButton}>Time</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.hairline} />

        <View style={styles.partitionWrapper}>
            <Text style={styles.textPartition}>Section Partition</Text>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

    hairline: {
        paddingTop: 15,
        marginHorizontal: 10,
        borderBottomColor: COLORS.tr_gray,
        borderBottomWidth: StyleSheet.hairlineWidth, 
    },
    
    buttonWrapper: {
        flex: 1, 
        flexDirection: 'row',
        marginVertical: 4,
    }, 

    buttonContainer: {
        flex: 1,
    },

    gridButton: {
        borderRadius: 6,
        marginHorizontal: 4,
        height: 180,
        backgroundColor: COLORS.orange,
        elevation: 3,
        alignItems: 'center',
    },

    iconOverlay: {
        color: COLORS.clearWhite,
        marginTop: 35,
    },

    textButtonWrapper: {
        position: 'absolute',
        bottom: 15,
        left: 15,
    },

    textButton: {
        fontFamily: 'DMSans_700Bold',
        color: COLORS.white,
        fontSize: 17,
        lineHeight: 17,
        letterSpacing: -1
    },

    partitionWrapper: { 
        marginHorizontal: 4,
        marginVertical: 10,
    },

    textPartition : {
        fontFamily: 'DMSans_500Medium',
        color: COLORS.darkGray,
    },

    iconRow: {
        color: COLORS.clearWhite,
    },

    rowWrapper: { 
        
    },
    
    rowButton: {
        flex: 1,
        backgroundColor: COLORS.orange,
        padding: 25,
        borderRadius: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
    },

    buttonTextWrapper: {
        paddingLeft: 10,
        paddingTop: 5,
    }
})