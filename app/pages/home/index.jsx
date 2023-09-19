import React from 'react'
import { View, Text, ImageBackground, SafeAreaView, StyleSheet, FlatList, ActivityIndicator} from 'react-native'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { COLORS, useFonts } from '../../../constant'
import { StatusBar } from 'expo-status-bar'

import HomeButton from '../../../components/button/HomeButton'
import HeaderCard from '../../../components/card/HeaderCard'
import GridButton from '../../../components/button/GridButton'
import { loadAsync } from 'expo-font'

export default function App () {
    const router = useRouter()
    const [fontsLoaded] = useFonts()
    
    const data = ['Advanced', 'Manage', 'Utility', 'Offers']
    const list = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']

    if(!fontsLoaded) { 
        return <>
            <ActivityIndicator size={'large'} color={COLORS.baseOrange} />
        </>
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

            <View style={styles.imageContainer}>
                <Image 
                    source={require('../../../assets/img/mntn.jpg')}
                    style={styles.imageHeader}
                /> 
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

            {/* <GridButton 
                onPress={onPress}
            /> */}

            <View style={styles.homeButtonHeader}>
                <Text style={styles.homeButtonHeaderText}>On Task Access</Text>
            </View>

            <View style={{ flexGrow: 0 }}>
                <HomeButton />
            </View>

            <View style={styles.hairline} />

            <View style={styles.homeButtonHeader}>
                <Text style={styles.homeButtonHeaderText}>Display List</Text>
            </View>

            <FlatList 
                data={list}
                renderItem={({item, index}) => (
                    <View>
                        <View style={styles.itemContainer}>
                            <Image 
                                source={require('../../../assets/img/icons/item.png')}
                                style={{ width: 20, height: 30, marginRight: 20,}}
                            />

                            <Text style={{fontFamily: 'Montserrat_400Regular'}}>{item}</Text>
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 13,
        // backgroundColor: COLORS.orange
    },

    hairline: {
        marginVertical: 18,
        // marginHorizontal: 10,
        borderBottomColor: COLORS.gray,
        borderBottomWidth: StyleSheet.hairlineWidth, 
    },

    headerWrapper: {
        marginBottom: 10,
    },

    headerText: {
        fontFamily: 'Montserrat_800ExtraBold',
        letterSpacing: -1,
        color: COLORS.orange,
        fontSize: 33,
    },

    headerSubText: {
        fontFamily: 'Montserrat_500Medium_Italic'
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
        fontFamily: 'Montserrat_600SemiBold',
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
    },

    imageContainer: {
        marginBottom: 10,
    },

    imageHeader: {
        width: '100%', 
        height: 100,
        borderRadius: 15,
    },

    homeButtonHeader: {
        marginHorizontal: 5,
        marginVertical: 5
    },

    homeButtonHeaderText: {
        fontFamily: 'Montserrat_700Bold',
        color: COLORS.orange,
        letterSpacing: -.4,
    },

    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding: 20,
        marginVertical: 7,
        borderRadius: 10,
        elevation: 5,
        shadowColor: COLORS.blue,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset : { width: 1, height: 2},
    }
})