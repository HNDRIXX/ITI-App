import React from 'react'
import { View, Text, ImageBackground, SafeAreaView, StyleSheet, FlatList, ActivityIndicator} from 'react-native'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { COLORS, useFonts } from '../../../constant'
import { StatusBar } from 'expo-status-bar'

import HeaderCard from '../../../components/card/HeaderCard'
import GridButton from '../../../components/button/GridButton'

export default function App () {
    const router = useRouter()
    const [fontsLoaded] = useFonts()
    
    const data = ['Advanced', 'Manage', 'Utility', 'Offers']
    const list = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']

    if(!fontsLoaded) { 
        return <View>
            <ActivityIndicator size={'large'} color={COLORS.baseOrange} />
        </View>
    }

    const onPress = () => {
        let id = 1

        console.log("Trigger for Request (useEffect)")
        router.push(`/access/test`)
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light"/>

            <View style={styles.headerWrapper}>
                <Text style={styles.headerText}>Hello!</Text>
                <Text style={styles.headerSubText}>Let's explore the app.</Text>
            </View>

            {/* <FlatList 
                data={data}
                renderItem={({ item, index }) => (
                    <HeaderCard 
                        item={item}
                        key={index}
                    />
                )}
                contentContainerStyle={{ columnGap: 0 }}
                style={{ flexGrow: 0, marginTop: 20, }}
                horizontal
            />

            <View style={styles.belowWrapper}>
                <View style={styles.belowHeader}>
                    <Text style={styles.belowText}>Lorem Ipsum</Text>
                    <Text style={styles.belowSubText}>Lorem Ipsum</Text>
                </View>

                <>
                    <FlatList 
                        data={list}
                        contentContainerStyle={{ rowGap: 10}}
                        renderItem={({ item }) => (
                            <View style={styles.itemWrapper}>
                                <Text style={styles.itemText}>{item}</Text>
                            </View>
                        )}
                    />
                </>
            </View> */}

            <GridButton 
                onPress={onPress}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 13,
    },

    headerWrapper: {
        marginBottom: 10,
    },

    headerText: {
        fontFamily: 'DMSans_700Bold',
        letterSpacing: -1.7,
        color: COLORS.baseOrange,
        fontSize: 33,
    },

    headerSubText: {
        fontFamily: 'DMSans_500Medium_Italic'
    },
    
    belowHeader: { paddingBottom: 20 },

    belowWrapper: {
        flex: 1,
        borderColor: COLORS.blue,
        borderRadius: 20,
        borderWidth: 3,
        padding: 15,
        marginTop: 10
    },

    belowText:{
        fontFamily: 'DMSans_700Bold',
        color: COLORS.baseOrange,
        fontSize: 27,
    },

    belowSubText: {
        fontFamily: 'DMSans_500Medium_Italic',
    },

    itemWrapper: {
        backgroundColor: COLORS.orange,
        height: 100,
        borderRadius: 10,
        padding: 15,
    },

    itemText: {
        color: COLORS.white,
        fontSize: 20,
        fontFamily: 'DMSans_700Bold'
    }
})