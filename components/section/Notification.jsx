import { View, Text, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import { Entypo } from "@expo/vector-icons";

import { COLORS } from "../../constant";

export default function Notification () {
    const data = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']

    return (
        <View style={styles.container}>
            <Text style={styles.notifTitle}>Notification</Text>

            <FlatList 
                data={data}
                renderItem={({item, index}) => (
                    <TouchableOpacity style={styles.notifItem}>
                        <Entypo name='megaphone' style={styles.notifIcon}/>
                        <Text style={styles.notifText}>{item}</Text>
                    </TouchableOpacity>
                )}
                style={styles.notifList}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 180,
    },

    notifIcon: {
        fontSize: 20,
        color: COLORS.blue,
        marginRight: 10
    },

    notifTitle: {
        fontSize: 17,
        paddingVertical: 5,
        color: COLORS.orange,
        fontFamily: 'Inter_700Bold',
    },

    notifList : {
        backgroundColor: COLORS.clearWhite,
        padding: 10,
        borderRadius: 10,
        elevation: 2,
    },

    notifItem: {
        backgroundColor: COLORS.shadowGray,
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10,
        borderRadius: 7,
    },

    notifText: {
        color: COLORS.darkGray,
        fontSize: 12,
        fontFamily: 'Inter_400Regular',
    }

})