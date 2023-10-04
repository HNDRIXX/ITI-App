import { View, Text, StyleSheet } from "react-native";

import { COLORS } from "../../../constant";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export default function Dashboard () {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <FontAwesome 
                    name='plane'
                    size={50}
                    color={COLORS.lightGray}
                />

                <Text style={styles.textWrapper}>Text</Text>  
            </View>

            <View style={styles.wrapper}>
                <FontAwesome 
                    name='bar-chart'
                    size={50}
                    color={COLORS.lightGray}
                />

                <Text style={styles.textWrapper}>Text</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 200,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 5,
        paddingVertical: 12,
        backgroundColor: COLORS.clearWhite,
        borderRadius: 20,
    },

    wrapper: {
        flex: 1,
        borderColor: COLORS.tr_gray,
        borderWidth: 2,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },

    textWrapper: {
        color: COLORS.darkGray,
        fontFamily: 'Inter_600SemiBold',
    }
})