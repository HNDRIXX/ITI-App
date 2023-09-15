import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native'
import { COLORS } from '../../../constant'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { router } from 'expo-router'

function ProfilePage() {
    const onGoBack = () => { router.back() }    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <TouchableOpacity style={styles.backButton} onPress={onGoBack}>
                    <AntDesign name='back' size={30} color={COLORS.clearWhite} />
                </TouchableOpacity>
            </View>

            <View style={styles.bodyContainer}>
                <View style={styles.profileImgContainer}>
                    <FontAwesome name='user-circle' size={120} color={COLORS.blue} />
                </View>

                <View style={styles.detailContainer}>
                    <View style={styles.detailWrapper}>
                        <Text style={styles.detailTitle}>Name</Text>
                        <Text style={styles.detailData}>Lorem Ipsum</Text>
                    </View>

                    <View style={styles.detailWrapper}>
                        <Text style={styles.detailTitle}>Position</Text>
                        <Text style={styles.detailData}>Lorem Ipsum</Text>
                    </View>

                    <View style={styles.detailWrapper}>
                        <Text style={styles.detailTitle}>Role</Text>
                        <Text style={styles.detailData}>Lorem Ipsum</Text>
                    </View>
                </View>
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
        marginTop: 50,
        flex: 1,
    },

    profileImgContainer: {
        verticalAlign: 'middle', alignSelf: 'center', alignItems: 'center', justifyContent: 'center',
        padding: 20
    },

    detailWrapper: {
        marginBottom: 10
    },

    detailTitle: {
        fontFamily: 'DMSans_700Bold',
        color: COLORS.baseOrange,
        fontSize: 20
    },

    detailData: {
        fontFamily: 'DMSans_400Regular',

    }
})

export default ProfilePage