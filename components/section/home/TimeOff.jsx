import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";

import { COLORS } from "../../../constant";

export default function TimeOff () {
    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={[styles.button, { paddingHorizontal: 15, paddingVertical: 0 }]}
                onPress={() => router.push(`access/navigation/home/webuser/vacationleave`)}
            >
                <View style={styles.alignWrapper}>
                    <Image 
                        source={require('../../../assets/img/icons/vacation.png')}
                        style={{ width: 55, height: 55, marginRight: 10 }}
                        contentFit="contain"
                    />

                    <View style={styles.textContent}>
                        <Text style={styles.totalText}>3.00</Text>
                        <Text style={styles.title}>Vacation{'\n'}Leave</Text>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, { paddingHorizontal: 15, paddingVertical: 0 }]}
                onPress={() => router.push(`access/navigation/home/webuser/sickleave`)}
            >
                <View style={styles.alignWrapper}>
                    <Image 
                        source={require('../../../assets/img/icons/health.png')}
                        style={{ width: 50, height: 50, marginRight: 10, }}
                        contentFit="contain"
                    />

                    <View style={styles.textContent}>
                        <Text style={styles.totalText}>1.50</Text>
                        <Text style={styles.title}>Sick{'\n'}Leave</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: 150,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 5,
        marginTop: 10,
    },

    button: {
        flex: 1,
        backgroundColor: COLORS.clearWhite,
        elevation: 5,
        shadowColor: COLORS.black,
        shadowOpacity: 0.1,
        shadowRadius: 2,
        shadowOffset : { width: 1, height: 5},
        marginHorizontal: 6,
        flexDirection: 'row',
        borderRadius: 20,
        justifyContent: 'space-around',

    },

    textWrapper: {
        color: COLORS.black,
        fontFamily: 'Inter_600SemiBold',
    },

    alignWrapper: {
        padding: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },

    textContent: {
        // marginLeft: 20,
    },

    totalText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 20,
        textAlign: 'center'
    },

    title: {
        color: COLORS.black,
        fontSize: 12,
        lineHeight: 14,
        textAlign: 'center',
        fontFamily: 'Inter_500Medium',
    },
})