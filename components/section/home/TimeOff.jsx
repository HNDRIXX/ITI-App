import { View, Text, StyleSheet } from "react-native";

import { COLORS } from "../../../constant";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

export default function TimeOff () {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.alignWrapper}>
                    <FontAwesome5 
                        name='umbrella-beach'
                        size={40}
                        color={COLORS.orange}
                        style={{paddingRight: 10}}
                    /> 

                    <View style={styles.textContent}>
                        <Text style={styles.totalText}>3.00</Text>
                        <Text style={styles.title}>Vacation Leave</Text>
                    </View>
                </View>
            </View>

            <View style={styles.wrapper}>
                <View style={styles.alignWrapper}>
                    <FontAwesome5 
                        name='briefcase-medical'
                        size={43}
                        color={COLORS.orange}
                        style={{paddingRight: 10}}
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
        marginVertical: 12,
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