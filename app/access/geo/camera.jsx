import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Camera } from 'expo-camera';
import { Image } from 'expo-image';
import { router, Redirect } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS } from '../../../constant';

export default function CameraAccess () {
    const [hasPermission, setHasPermission] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [userImage, setUserImage] = useState("")
    const [imgPath, setImgPath] = useState('')
    const [isBack, setIsBack] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        (async () => {     
            const { status } = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    }, [])

    const takePicture = async () => {
        if(cameraRef) {
            const photo = await cameraRef.takePictureAsync()
            setUserImage(photo.uri)

            const img = photo.uri.replace(/\//g, '^')
            setImgPath(img)
            setIsLoading(false)
        }
    }

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
      
        if (!result.canceled) {
            const selectedAsset = result.assets[0]
            setUserImage(selectedAsset.uri)
        
            const img = selectedAsset.uri.replace(/\//g, '^')
            setImgPath(img)
            setIsLoading(true)
        }
    }

    return (
        <>
            { isBack && (<Redirect href={`/access/home/${imgPath}`}/>) }  
        
            { imgPath !== '' ? (
                    <View style={{ flex: 1 }}>
                        <Image 
                            source={{ uri: userImage }} 
                            style={{ flex: 1 }} 
                            contentFit='contain'
                        />

                        <View style={styles.btnWrapper}>
                            <TouchableOpacity
                                style={styles.doneBtn}
                                onPress={() => setIsBack(true)}
                            >
                                <FontAwesome 
                                    name={'check'}
                                    size={27}
                                    color={COLORS.clearWhite}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.deleteBtn}
                                onPress={() => setImgPath('')}
                            >
                                <FontAwesome 
                                    name={'trash'}
                                    size={27}
                                    color={COLORS.clearWhite}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <>
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
                                    <MaterialCommunityIcons 
                                        name="axis-z-rotate-clockwise" 
                                        size={40} 
                                        color={COLORS.clearWhite} 
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={styles.button}
                                    onPress={takePicture}
                                >
                                    <FontAwesome 
                                        name={'circle'}
                                        size={90}
                                        color={COLORS.clearWhite}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={pickImage}
                                >
                                    <MaterialCommunityIcons 
                                        name={'image'}
                                        size={40}
                                        color={COLORS.clearWhite}
                                    />    
                                </TouchableOpacity>
                            </View>
                        </Camera>
                    </>
                )
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    camera: {
        flex: 1,
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.darkGray,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        padding: 30,
    },

    button: {
        alignSelf: 'center',
        backgroundColor: 'transparent',
        verticalAlign: 'middle',
    },

    text: {
        fontSize: 18,
        color: COLORS.clearWhite,
        margin: 10,
    },

    btnWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    doneBtn: {
        width: 200,
        margin: 10,
        backgroundColor: 'green',
        alignItems: 'center',
        padding: 17,
        borderRadius: 10,
    },

    deleteBtn: {
        width: 200,
        margin: 10,
        backgroundColor: 'red',
        alignItems: 'center',
        padding: 17,
        borderRadius: 10,
    },

    textBtn: {
        width: 200,
        fontFamily: 'Inter_600SemiBold',
        textAlign: 'center',
        fontSize: 17,
    },
})