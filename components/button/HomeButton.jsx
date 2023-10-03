import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform} from 'react-native'
import { router } from 'expo-router'
import { Image } from 'expo-image'

import { COLORS } from '../../constant'
import HomeButtonLoader from '../loader/HomeButtonLoader'

export default function HomeButton () {
    const [isLoading, setIsLoading] = useState(false)

    // useEffect(() => {
    //     setTimeout(() => {
    //         setIsLoading(false)
    //     }, 2000)
    // }, [])

    return (
        <ScrollView 
            contentContainerStyle={{ 
                justifyContent: 'center', 
            }}
            scrollEnabled={false}
            showsVerticalScrollIndicator={ Platform.OS == 'web' ? true : false }
        >     
            { isLoading ? (
                <HomeButtonLoader />
            ) : ( 
                <>
                    <View style={styles.buttonWrapper}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={styles.gridButton}
                                onPress={() => router.push(`/access/home/`)}
                            >
                                {/* <Image source={require('../../assets/img/icons/map.png')} style={styles.iconOverlay} /> */}

                                <View style={styles.textButtonWrapper}>
                                    <Text style={styles.textButton}>Button</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.gridButton}>
                                {/* <Image source={require('../../assets/img/icons/clock.png')} style={styles.iconOverlay} /> */}

                                <View style={styles.textButtonWrapper}>
                                    <Text style={styles.textButton}>Button</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )}
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
        marginVertical: 5,
        marginHorizontal: 0,
    }, 

    buttonContainer: {
        flex: 1,
    },

    gridButton: {
        borderRadius: 10,
        marginHorizontal: 5,
        // height: 30,
        backgroundColor: COLORS.white,
        elevation: 5,
        shadowColor: COLORS.tr_gray,
        shadowOpacity: 0.1,
        shadowRadius: 2,
        shadowOffset : { width: 1, height: 5},
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },

    iconOverlay: {
        width: 32,
        height: 32,
    },

    textButtonWrapper: {

    },

    textButton: {
        fontFamily: 'Montserrat_500Medium',
        color: COLORS.darkGray,
        fontSize: 12,
        lineHeight: 17,
        letterSpacing: -.5,
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