import { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";

import { COLORS } from "../../../constant";

export default function SignInIndex () {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={styles.container}>
            <StatusBar style='dark' />

            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => setUsername(text)}
                        value={username}
                        placeholder="Username"
                        placeholderTextColor={COLORS.tr_gray}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry
                        placeholder="Password"
                        placeholderTextColor={COLORS.tr_gray}
                    />
                </View>

                <TouchableOpacity
                    style={styles.forgotBtn}
                    onPress={() => router.push(`/authentication/base/forgotPass`)}
                >
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.loginBtn}
                    onPress={() => router.push(`/pages/home/`)}
                >
                    <Text style={styles.loginText}>LOG IN</Text>
                </TouchableOpacity>

                <Text style={styles.textFooter}>Powered by{'\n'}Intellismart Technology Inc.</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.clearWhite,
    },

    inputContainer: {
        margin: 10,
        padding: 20,
        flex: 1,
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 20,
        backgroundColor: COLORS.clearWhite,
        borderRadius: 30,
        marginBottom: 15,

        elevation: 5,
        shadowColor: COLORS.darkGray,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5, 
        shadowRadius: 5, 
    },

    textInput: {
        width: '100%',
        fontFamily: 'Inter_400Regular',
        color: COLORS.darkGray
    },

    loginBtn: {
        backgroundColor: COLORS.orange,
        alignItems: 'center',
        alignSelf: 'center',
        width: 160,
        padding: 15,
        borderRadius: 50,
        marginTop: 100,

        elevation: 5,
        shadowColor: COLORS.darkGray,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5, 
        shadowRadius: 5, 
    },

    loginText: {
        color: COLORS.clearWhite,
        fontSize: 15,
        fontFamily: 'Inter_800ExtraBold'
    },

    forgotBtn: {
        alignSelf: 'center',
    },

    forgotText: {
        color: COLORS.darkGray,
        fontFamily: 'Inter_400Regular'
    },

    textFooter: {
        textAlign: 'center',
        position: 'absolute',
        color: COLORS.darkGray,
        fontFamily: 'Inter_400Regular',
        bottom: 30
    }
})