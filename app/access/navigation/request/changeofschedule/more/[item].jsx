import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useGlobalSearchParams } from "expo-router";
import { router } from "expo-router";

import { COLORS } from "../../../../../../constant";
import { Shadow } from "react-native-shadow-2";

export default function COSRequest () {
    const params = useGlobalSearchParams()

    const item = JSON.parse(params.item || '{}')

    console.log(item.currDate)

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.topHeader}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => router.push(`/pages/request/`)}
                >
                    <AntDesign name='arrowleft' size={30} color={COLORS.clearWhite} />
                </TouchableOpacity>

                <Text style={styles.textHeader}>New Request</Text>
            </View>

            <Animatable.View
                animation={'fadeInUpBig'}
                duration={1000}
                easing={'ease-in-out'}
                style={{ opacity: 1, flex: 1 }}
            >
                <View style={styles.topContent(item)}>
                    <Text style={styles.topText}>{item.currDate}</Text>
                    
                    <View style={styles.rowWrapper}>
                        { item.status == "Cancelled" ? (
                            <Entypo
                                name="circle-with-cross"
                                size={19}
                                color={COLORS.clearWhite}
                                style={{ marginRight: 10 }}
                            /> 
                        ) : (
                            <AntDesign
                                name="checkcircle"
                                size={17}
                                color={COLORS.clearWhite}
                                style={{ marginRight: 10 }}
                            />
                        )}

                        <Text style={styles.topText}>{item.status}</Text>
                    </View>
                </View>

                <View style={styles.container}>
                    <Shadow style={styles.content}>
                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Type:</Text>
                            <Text style={styles.valueText}>Change of Schedule</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Document No:</Text>
                            <Text style={styles.valueText}>COS22307240207</Text>
                        </View>

                        <View style={[ styles.rowWrapper, { marginTop: 20 } ]}>
                            <Text style={styles.titleText}>Applied Date/s Filed:</Text>
                            <Text style={styles.valueText}>September 16, 2023</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Reason:</Text>
                            <Text style={styles.valueText}>----</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Attached File:</Text>
                            <Text style={styles.valueText}>-----</Text>
                        </View>

                        <View style={[styles.rowWrapper, { marginTop: 20 }]}>
                            <Text style={styles.titleText}>Status:</Text>

                            <View style={styles.statusWrapper}>
                                <Text style={styles.valueText}>Approved by Mark Sasama on September 17, 2023</Text>
                                <Text stye={styles.valueText}>Approved by Mark Sasama on September 17, 2023</Text>
                            </View>
                        </View>
                    </Shadow>
                </View>
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    backButton: {
        paddingHorizontal: 10,
    },

    topHeader: {
        padding: 1,
        paddingBottom: 10,
        paddingVertical: 40,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: COLORS.powderBlue,
    },
    
    textHeader: {
        color: COLORS.clearWhite,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        flex: 1,
        textAlign: 'center',
        marginRight: 50,
    },

    topContent: (item) => ({
        backgroundColor: 
            item.status == "Filed" ?
                COLORS.yellow :
            item.status == "Reviewed" ?
                COLORS.purple :
            item.status == "Approved" ?
                COLORS.green :
            item.status == "Cancelled" ?
                COLORS.red
            : COLORS.tr_gray,

        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 20,
    }),

    topText: {
        color: COLORS.clearWhite,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 15,
    },

    container: {
        marginHorizontal: 30,
        marginVertical: 20,
    },

    content: {
        padding: 20,
        borderRadius: 20,
    },

    rowWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    titleText: {
        fontFamily: 'Inter_600SemiBold',
        marginRight: 10,
    },

    valueText: {
        fontFamily: 'Inter_400Regular',
    },

    statusWrapper: {
        width: '80%',
    }
})