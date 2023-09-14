import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native'
import { COLORS } from '../../../constant'
import { AntDesign } from '@expo/vector-icons'
import { router } from 'expo-router'

function ProfilePage() {

    const onGoBack = () => {
        router.back()
    }    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <TouchableOpacity style={styles.backButton} onPress={onGoBack}>
                    <AntDesign name='back' size={30} color={COLORS.clearWhite} />
                </TouchableOpacity>
            </View>

            <View style={styles.bodyContainer}>
                <Text>Profile Page</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    topContainer: {
        backgroundColor: COLORS.blue,
        paddingTop: 40,
        paddingBottom: 10,
    },

    backButton: {
        paddingHorizontal: 10,
    },

    bodyContainer: {
        margin: 13,
    },
})

export default ProfilePage