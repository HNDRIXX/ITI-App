import React from 'react'
import { View, Text, FlatList, ImageBackground, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'

import { COLORS, useFonts } from '../../constant'

export default function HeaderCard({ item, index }) {
    const [fontsLoaded] = useFonts()

    if (!fontsLoaded) { 
        return  <View>
            <ActivityIndicator color={COLORS.baseOrange} size={'large'} />
        </View>
    }

    return (
        <TouchableOpacity style={styles.container} >
            <ImageBackground 
                source={require('../../assets/img/mntn.jpg')} 
                key={index} style={styles.image} 
                imageStyle={{ borderRadius: 20 }}
            >
                <View style={styles.overlay} />

                <View style={styles.textWrapper}>
                    <Text style={styles.textData}>{item}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: { width: 50, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 7,
        margin: 10,
        marginLeft: 0,
        borderRadius: 20,
    },

    image: {
        width: 200,
        height: 400,
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
    },

    textWrapper: {
        position: 'absolute',
        bottom: 20,
        left: 20,
    },

    textData: {
        color: COLORS.white,
        fontFamily: 'DMSans_700Bold',
        fontSize: 22
    },


})