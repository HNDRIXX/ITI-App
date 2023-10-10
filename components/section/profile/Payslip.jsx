import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable';

import { COLORS } from "../../../constant";

export default function Payslip ( onAnimate ) {
    return (
        <Animatable.View
            animation={onAnimate ? 'fadeIn' : ''}
            easing={'ease-in-out'}
            duration={500}
            useNativeDriver
            style={[styles.container, {opacity: onAnimate ? 1 : 0,}]}
        >
            <View style={styles.topContainer}>
                <FontAwesome
                    name="ticket"
                    size={30}
                    color={COLORS.clearWhite}
                />

                <View>
                    <Text style={styles.payslipTitle}>Payslip</Text>
                </View>
            </View>

            <View style={styles.bodyContainer}>
                <Text>Text Container</Text>
            </View>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    topContainer: {
        backgroundColor: COLORS.blue,
        margin: 15,
        marginBottom: 5,
        padding: 20,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    payslipTitle: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: 'Inter_700Bold'
    },

    bodyContainer: {
        flex: 1,
        margin: 15,
        marginTop: 10,
        borderRadius: 20,
        padding: 20,
        backgroundColor: COLORS.clearWhite,
        // elevation: 3,
        // shadowOpacity: 0.5,
        // shadowRadius: 3,
        // shadowOffset : { width: 1, height: 3},
    }
})