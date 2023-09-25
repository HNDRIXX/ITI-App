import { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { COLORS } from "../../../constant";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";

export default function SignInIndex () {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={styles.container}>
            <StatusBar style='dark' />

            <TouchableOpacity 
                style={styles.backBtn}
                onPress={() => router.back()}
            >
                <AntDesign name='arrowleft' size={23} color={COLORS.blue} />
            </TouchableOpacity>

            <View style={styles.inputContainer}>
                <Text style={styles.signInTitle}>Sign-In</Text>

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
                    style={styles.submitBtn}
                >
                    <Text style={styles.submitText}>SUBMIT</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.forgotBtn}
                    onPress={() => router.push(`/authentication/base/forgotPass`)}
                >
                    <Text style={styles.forgotText}>Forgot Password</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.clearWhite,
    },

    backBtn: {
        width: 50,
        height: 50,
        alignItems: 'center',
        marginTop: 40,
    },

    inputContainer: {
        margin: 10,
        padding: 20,
        flex: 1,
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },

    signInTitle: {
        fontFamily: 'Inter_800ExtraBold',
        fontSize: 43,
        color: COLORS.orange,
        marginBottom: 15,
    },

    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: COLORS.clearWhite,
        borderRadius: 30,
        marginBottom: 15,

        shadowColor: COLORS.tr_gray,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5, 
        shadowRadius: 5, 
    },

    iconInput: {
        borderRightWidth: 1,
        borderRightColor: COLORS.gray,
        padding: 10
    },

    textInput: {
        width: '100%',
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

    submitText: {
        color: COLORS.clearWhite,
        fontSize: 15,
        fontFamily: 'Inter_600SemiBold'
    },

    forgotBtn: {
        alignSelf: 'center',
        margin: 15,
    },

    forgotText: {
        color: COLORS.tr_gray,
        fontFamily: 'Inter_400Regular'
    }
})