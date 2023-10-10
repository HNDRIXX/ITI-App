import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Platform} from 'react-native'
import { router } from 'expo-router'
import { Image } from 'expo-image'
import { Ionicons, Foundation } from '@expo/vector-icons'

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

        <View style={styles.container}>     
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
                                <Ionicons 
                                    name={'ios-calendar'}
                                    size={40}
                                    color={COLORS.orange}
                                />
                            </TouchableOpacity>

                            <Text style={styles.textButton}>Timesheet</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={styles.gridButton}
                                onPress={() => router.push(`/access/home/`)}
                            >
                                <Foundation 
                                    name={'book'}
                                    size={45}
                                    color={COLORS.orange}
                                />
                            </TouchableOpacity>

                            <Text style={styles.textButton}>Ledger</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={styles.gridButton}
                                onPress={() => router.push(`/access/home/`)}
                            >
                                
                            </TouchableOpacity>

                            <Text style={styles.textButton}></Text>
                        </View>
                    </View>

                    <View style={styles.buttonWrapper}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={styles.gridButton}
                                onPress={() => router.push(`/access/home/`)}
                            >
                                
                            </TouchableOpacity>

                            <Text style={styles.textButton}></Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={styles.gridButton}
                                onPress={() => router.push(`/access/home/`)}
                            >
                              
                            </TouchableOpacity>

                            <Text style={styles.textButton}></Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={styles.gridButton}
                                onPress={() => router.push(`/access/home/`)}
                            >
                               
                            </TouchableOpacity>

                            <Text style={styles.textButton}></Text>
                        </View>
                    </View>
                </>
            )}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    buttonWrapper: {
        flexDirection: 'row',
        marginHorizontal: 10,
    }, 

    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },

    gridButton: {
        borderRadius: 10,
        marginHorizontal: 10,
        backgroundColor: COLORS.clearWhite,
        elevation: 5,
        shadowColor: COLORS.darkGray,
        shadowOpacity: 0.1,
        shadowRadius: 2,
        shadowOffset : { width: 1, height: 5},
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
    },

    textButton: {
        fontFamily: 'Inter_500Medium',
        color: COLORS.darkGray,
        paddingTop: 5,
        fontSize: 13,
        textAlign: 'center'
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