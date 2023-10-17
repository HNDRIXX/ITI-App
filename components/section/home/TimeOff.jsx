import { View, Text, StyleSheet } from "react-native";

import { COLORS } from "../../../constant";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";

export default function TimeOff () {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.alignWrapper}>
                    <Image 
                        source={require('../../../assets/img/icons/vacation.png')}
                        style={{ width: 50, height: 50 }}
                        contentFit="contain"
                    />

                    <View style={styles.textContent}>
                        <Text style={styles.totalText}>3.00</Text>
                        <Text style={styles.title}>Vacation Leave</Text>
                    </View>
                </View>
            </View>

            <View style={[styles.wrapper, { padding: 15 }]}>
                <View style={styles.alignWrapper}>
                    <Image 
                        source={require('../../../assets/img/icons/medicine.png')}
                        style={{ width: 39, height: 39, marginRight: 10, }}
                        contentFit="contain"
                    />

                    <View style={styles.textContent}>
                        <Text style={styles.totalText}>1.50</Text>
                        <Text style={styles.title}>Sick Leave</Text>
                    </View>
                </View>
            </View>
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

    wrapper: {
        flex: 1,
        backgroundColor: COLORS.clearWhite,
        // elevation: 5,
        // shadowColor: COLORS.darkGray,
        // shadowOpacity: 0.1,
        // shadowRadius: 2,
        // shadowOffset : { width: 1, height: 5},
        marginHorizontal: 6,
        flexDirection: 'row',
        borderRadius: 20,
        padding: 10,
        justifyContent: 'space-around',

    },

    textWrapper: {
        color: COLORS.darkGray,
        fontFamily: 'Inter_600SemiBold',
    },

    alignWrapper: {
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },

    textContent: {
        // marginLeft: 20,
    },

    totalText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 17,
        textAlign: 'center'
    },

    title: {
        color: COLORS.darkGray,
        fontSize: 10,
        textAlign: 'center',
        fontFamily: 'Inter_500Medium',
    },
})