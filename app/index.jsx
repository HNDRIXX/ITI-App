import React from 'react'
import { View, Text, ImageBackground, SafeAreaView, StyleSheet, FlatList, ActivityIndicator} from 'react-native'
import { Image } from 'expo-image'
import { COLORS, useFonts } from '../constant'

import HeaderCard from '../components/card/HeaderCard'

export default function App () {
    const [fontsLoaded] = useFonts()
    const data = ['Advanced', 'Manage', 'Utility', 'Offers']

    if(!fontsLoaded) { 
        return <View>
            <ActivityIndicator size={'large'} color={COLORS.baseOrange} />
        </View>
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerWrapper}>
                <Text style={styles.headerText}>Hello!</Text>
                <Text style={styles.headerSubText}>Let's explore the app.</Text>
            </View>

            <FlatList 
                data={data}
                renderItem={({ item, index }) => (
                    <HeaderCard 
                        item={item}
                        key={index}
                    />
                )}
                contentContainerStyle={{ columnGap: 7 }}
                style={{ flexGrow: 0, marginTop: 20, }}
                horizontal
            />

            <View>
                <Text style={styles.belowText}>........</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },

    headerWrapper: {

    },

    headerText: {
        fontFamily: 'DMSans_700Bold',
        letterSpacing: -1.7,
        color: COLORS.baseOrange,
        fontSize: 30,
    },

    headerSubText: {
        fontFamily: 'DMSans_500Medium_Italic'
    },

    belowText:{
        fontFamily: 'DMSans_700Bold',
        fontSize: 27,
    }
})