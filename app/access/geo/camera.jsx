import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import moment from 'moment';
import { Image } from 'expo-image';
import { router } from 'expo-router';

import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS } from '../../../constant';

export default function CameraAccess () {
    const [hasPermission, setHasPermission] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [userImage, setUserImage] = useState("")
    const [location, setLocation] = useState(null)
    const [dateTime, setDateTime] = useState(null)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === 'granted')

            const locationStatus = await Location.requestForegroundPermissionsAsync()

            if (locationStatus.status === 'granted') {
                const currentLocation = await Location.getCurrentPositionAsync({})
                setLocation(currentLocation.coords)
            }
        })()
    }, [])

    const takePicture = async () => {
        if(cameraRef) {
            const photo = await cameraRef.takePictureAsync()
            setUserImage(photo.uri)

            const currentDateTime = moment().format('MMMM  Do YYYY, h:mm:ss a')
            setDateTime(currentDateTime)

            const imgPath = photo.uri.replace(/\//g, '^')

            router.push(`/access/home/${imgPath}`)
        }
    }

    return (
        <View style={styles.container}>
            <Camera 
                style={styles.camera}
                type={type}
                ref={(ref) => {
                    cameraRef = ref
                }}
            >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
                            )
                        }}
                    >
                        <MaterialCommunityIcons name="axis-z-rotate-clockwise" size={32} color={COLORS.clearWhite} />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={takePicture}
                    >
                        <MaterialCommunityIcons 
                            name={'camera'}
                            size={30}
                            color={COLORS.clearWhite}
                        />
                    </TouchableOpacity>
                </View>


                {userImage && (
                    <View style={{ flex: 1 }}>
                    <Image source={{ uri: userImage }} style={{ flex: 1 }} />
                        {console.log(userImage)}
                    </View>
                )}
            </Camera>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    camera: {
        flex: 1
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        flex: 1,
        padding: 30,
    },

    button: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },

    text: {
        fontSize: 18,
        color: COLORS.clearWhite,
        margin: 10,
    }
})