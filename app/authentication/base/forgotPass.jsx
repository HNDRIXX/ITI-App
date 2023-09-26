import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { COLORS } from '../../../constant';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { MaterialIcons, AntDesign } from '@expo/vector-icons/build/Icons';

export default function forgotPasswordIndex () {
    const [email, setEmail] = useState('')

    return (
        <View style={styles.container}>
            <StatusBar style='dark' />

            <TouchableOpacity 
                style={styles.backBtn}
                onPress={() => router.back()}
            >
                <AntDesign name='arrowleft' size={28} color={COLORS.blue} />
            </TouchableOpacity>
            
            <View style={styles.wrapper}>
                <Text style={styles.forgotText}>Forgot Password</Text>
                <Text style={styles.subText}>Please enter your email below.</Text>

                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        placeholder="Email"
                        placeholderTextColor={COLORS.tr_gray}
                    />
                </View>

                <TouchableOpacity 
                    style={styles.submitBtn}
                    onPress={() => router.push(`/authentication/auth/verifyOTP`)}
                >
                    <Text style={styles.textBtn}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    backBtn: {
        width: 60,
        height: 60,
        alignItems: 'center',
        marginTop: 60,
    },

    wrapper: {
        flex: 1,
        margin: 30,
        marginTop: 0,
        justifyContent: 'center',
    },

    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: COLORS.clearWhite,
        borderRadius: 30,
        marginVertical: 20,

        shadowColor: COLORS.tr_gray,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5, 
        shadowRadius: 5, 
    },

    textInput: {
        width: '100%',
        fontFamily: 'Inter_400Regular'
    },

    forgotText: {
        fontFamily: 'Inter_800ExtraBold',
        color: COLORS.orange,
        fontSize: 43,
        lineHeight: 44,
    },

    subText: {
        fontFamily: 'Inter_400Regular',
        color: COLORS.darkGray
    },  

    submitBtn: {
        backgroundColor: COLORS.blue,
        alignItems: 'center',
        alignSelf: 'center',
        width: 200,
        padding: 15,
        borderRadius: 10,
        marginTop: 5,
    },

    textBtn: {
        color: COLORS.clearWhite,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 15,
    }
})