import { View, Text, StyleSheet } from "react-native";

import { COLORS } from "../../../constant";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

export default function Dashboard () {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.valueText}>10</Text>

                <View style={styles.alignWrapper}>
                    <FontAwesome 
                        name='plane'
                        size={40}
                        color={COLORS.lightGray}
                    /> 

                    <Text style={styles.title}>Title</Text>
                </View>
            </View>

            <View style={styles.wrapper}>
                <Text style={styles.valueText}>5</Text>
                
                <View style={styles.alignWrapper}>
                    <FontAwesome 
                        name='bar-chart'
                        size={40}
                        color={COLORS.lightGray}
                    />

                    <Text style={styles.title}>Title</Text>
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
        paddingVertical: 12,
        backgroundColor: COLORS.clearWhite,
        borderRadius: 20,
        marginHorizontal: 10,
    },

    wrapper: {
        flex: 1,
        height: 150,
        borderColor: COLORS.lightGray,
        borderWidth: 2,
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },

    textWrapper: {
        color: COLORS.darkGray,
        fontFamily: 'Inter_600SemiBold',
    },

    alignWrapper: {
        marginLeft: 30,
    },

    valueText: {
        fontFamily: 'Inter_700Bold',
        color: COLORS.orange,
        fontSize: 40,
    },

    title: {
        textAlign: 'center',
        fontFamily: 'Inter_400Regular',
        marginTop: 10,
    },

})