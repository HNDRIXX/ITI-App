import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'

export default function CameraIndex () {
    const [hasPermission, setHasPermission] = useState(null)
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
    const [capturedImage, setCapturedImage] = useState(null)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()

            setHasPermission(status === 'granted')

            const imagePickerStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()

            if(imagePickerStatus.status !== 'granted') {
                alert('Need permission access!')
            }
        })()
    }, [])

    const takePicture = async () => {
        if(cameraRef) {
            const { uri } = await cameraRef.takePictureAsync()
            setCapturedImage(uri)
        }
    }

    return (
        <View style={styles.container}>
            <Camera
                style={{ flex: 1 }}
                type={cameraType}
                ref={(ref) => {
                    cameraRef = ref
                }}
            >
                <View>
                    <TouchableOpacity
                        style={{
                            flex: 0.1,
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                        }}

                        onPress={() => {
                            setCameraType(
                                cameraType === Camera.Constants.
                                Type.back 
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            )
                        }}
                    > 

                        <Text>
                            Flip
                        </Text>

                    </TouchableOpacity>
                </View>
            </Camera>

            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {capturedImage ? (
                    <Text>{capturedImage}</Text>
                ) : (<Text>Error</Text>)}

                <TouchableOpacity
                    onPress={takePicture}
                >
                    <Text style={{ fontSize: 20, marginBottom: 20 }}>Take Picture</Text>

                </TouchableOpacity>



            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})