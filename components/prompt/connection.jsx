import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { COLORS } from "../../constant";

export default function ConnectionPrompt () {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <FontAwesome 
                    name="exclamation-triangle"
                    style={styles.icon}
                />

                <Text style={styles.title}>Unable to Access</Text>
                <Text style={styles.subTitle}>Check your connection or close the app and try again.</Text>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.tr_gray,
        position: 'absolute',
        zIndex: 1,
        width: '100%',
        height: '100%',
    },

    wrapper: {
        backgroundColor: COLORS.white,
        padding: 30,
        width: 300,
        borderRadius: 10,
        alignItems: 'center'
    },

    icon: {
        fontSize: 70,
        color: COLORS.tr_gray,
        paddingBottom: 10,
    },

    title: {
        fontSize: 25,
        fontFamily: 'Inter_600SemiBold',
    },

    subTitle: {
        fontSize: 13,
        paddingTop: 5,
        textAlign: 'center',
        fontFamily: 'Inter_300Light',
    }

})