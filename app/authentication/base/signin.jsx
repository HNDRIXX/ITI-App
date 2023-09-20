import { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { COLORS } from "../../../constant";

export default function SignIn () {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View>
            <ImageBackground 
                source={require('../../../assets/img/gradient.png')}
                style={{ width: '100%', height: 400 }}
            />

            <View style={styles.inputContainer}>
                <Text style={styles.signInTitle}>Sign In</Text>

                <View style={styles.inputWrapper}>
                    <FontAwesome5 
                        name='user-alt' 
                        size={20} 
                        color={COLORS.lightOrange} 
                        style={styles.iconInput}
                    />

                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => setUsername(text)}
                        value={username}
                        placeholder="Enter Username"
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <FontAwesome5 
                        name='key' 
                        size={20} 
                        color={COLORS.lightOrange} 
                        style={styles.iconInput}
                    />

                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry
                        placeholder="Enter Username"
                    />
                </View>

                <TouchableOpacity style={styles.submitBtn}>
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    inputContainer: {
        margin: 20,
        backgroundColor: COLORS.white,
        elevation: 4,
        padding: 20,
        borderRadius: 10,

        shadowColor: COLORS.tr_gray,
        shadowOpacity: 0.4,
        shadowOffset: { width: 1, height: 2 },
        shadowRadius: 3,
    },

    signInTitle: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 40,
        marginBottom: 20,
        color: COLORS.lightOrange
    },

    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        padding: 2,
        borderColor: COLORS.gray,
        borderRadius: 10,
        marginBottom: 10,

    },

    iconInput: {
        borderRightWidth: 1,
        borderRightColor: COLORS.gray,
        padding: 10
    },

    textInput: {
        padding: 10,
        width: '100%',
        fontFamily: 'Montserrat_500Medium'
    },

    submitBtn: {
        backgroundColor: COLORS.blue,
    },

    submitText: {
        color: COLORS.clearWhite
    }
})