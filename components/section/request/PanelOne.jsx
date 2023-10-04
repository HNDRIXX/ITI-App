import { View, Text, StyleSheet, FlatList } from "react-native";

import { COLORS } from "../../../constant";

export default function PanelOne () {
    const data = [
        {name: 'Listing 1'},
        {name: 'Listing 2'},
        {name: 'Listing 3'},
        {name: 'Listing 4'},
        {name: 'Listing 5'},
        {name: 'Listing 6'},
        {name: 'Listing 7'},
    ]

    return (
        <View style={{ flex: 1}}>
            <Text style={styles.titleText}>Panel One</Text>

            <FlatList 
                data={data}
                renderItem={({item, index}) => (
                    <View style={styles.itemWrapper}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        <Text>Date: Lorem Ipsum</Text>
                        <Text>Sample: Lorem Ipsum</Text>
                    </View>
                )}
            />
        </View> 
    )
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 25,
        fontFamily: 'Inter_600SemiBold',
        padding: 10,
    },

    itemWrapper: {
        backgroundColor: COLORS.shadowGray,
        padding: 30,
        marginHorizontal: 10,
        margin: 5,
        borderRadius: 10,
    }
})