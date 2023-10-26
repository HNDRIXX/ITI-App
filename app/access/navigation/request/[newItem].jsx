import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import { AntDesign, Entypo, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useGlobalSearchParams } from "expo-router";
import { router } from "expo-router";

import { COLORS } from "../../../../constant";
import { Shadow } from "react-native-shadow-2";

export default function COSRequest () {
    const params = useGlobalSearchParams()

    const item = JSON.parse(params.newItem || '{}')

    console.log(item.date + " : " +  item.status)

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.topHeader}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => router.push(`/pages/request/`)}
                >
                    <AntDesign name='arrowleft' size={30} color={COLORS.clearWhite} />
                </TouchableOpacity>

                <Text style={styles.textHeader}>Request Details</Text>
            </View>

            <Animatable.View
                animation={'fadeIn'}
                duration={1000}
                easing={'ease-in-out'}
                style={{ opacity: 1, flex: 1 }}
            >
                <View style={styles.topContent(item)}>
                    <Text style={styles.topText}>{item.formattedApplied}</Text>
                    
                    <View style={styles.rowWrapper}>
                        { item.status == "Filed" ? (
                            <FontAwesome5 
                                name="file-import" 
                                size={17} 
                                color={COLORS.clearWhite}
                                style={{ marginRight: 10 }}
                            />
                        ) : item.status == "Reviewed" ? (
                            <MaterialCommunityIcons 
                                name="file-find" 
                                size={20} 
                                color={COLORS.clearWhite} 
                                style={{ marginRight: 10 }}
                            />
                        ) : item.status == "Approved" ? (
                            <AntDesign
                                name="checkcircle"
                                size={17}
                                color={COLORS.clearWhite}
                                style={{ marginRight: 10 }}
                            />
                        ) : item.status == "Cancelled" ? (
                            <Entypo
                                name="circle-with-cross"
                                size={19}
                                color={COLORS.clearWhite}
                                style={{ marginRight: 10 }}
                            /> 
                        ) : ( null )}

                        <Text style={styles.topText}>{item.status}</Text>
                    </View>
                </View>

                <View style={styles.container}>
                    <Shadow style={styles.content}>
                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Type:</Text>
                            <Text style={styles.valueText}>{item.requestType}</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Document No:</Text>
                            <Text style={styles.valueText}>{item.documentNo}</Text>
                        </View>

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Date Filed:</Text>
                            <Text style={styles.valueText}>{item.formattedFiled}</Text>
                        </View>

                       { item.requestType == "Change of Schedule" ? (
                            <>
                                <View style={[ styles.rowWrapper, { marginTop: 20 } ]}>
                                    <Text style={styles.titleText}>Applied Date/s Filed:</Text>
                                    <Text style={styles.valueText}>{item.formattedApplied}</Text>
                                </View>

                                <View style={styles.rowWrapper}>
                                    <Text style={styles.titleText}>Reason:</Text>
                                    <Text style={styles.valueText}>{item.reason}</Text>
                                </View>
                            </>
                        ) : item.requestType == "Official Work" ? ( 
                            <>
                                <View style={[ styles.rowWrapper, { marginTop: 20 } ]}>
                                    <Text style={styles.titleText}>Official Work Date:</Text>
                                    <Text style={styles.valueText}>{item.formattedWorkDate}</Text>
                                </View>

                                <View style={styles.rowWrapper}>
                                    <Text style={styles.titleText}>Official Work Time:</Text>
                                    <Text style={styles.valueText}>{item.workTime}</Text>
                                </View>

                                <View style={styles.rowWrapper}>
                                    <Text style={styles.titleText}>Location:</Text>
                                    <Text style={styles.valueText}>{item.location}</Text>
                                </View>

                                <View style={styles.rowWrapper}>
                                    <Text style={styles.titleText}>Reason:</Text>
                                    <Text style={styles.valueText}>{item.reason}</Text>
                                </View>
                            </>
                        ) : ( null )}

                        <View style={styles.rowWrapper}>
                            <Text style={styles.titleText}>Attached File:</Text>
                            <Text style={styles.valueText}>-----</Text>
                        </View>

                        <View style={[styles.rowWrapper, { marginTop: 20 }]}>
                            <Text style={styles.titleText}>Status:</Text>

                            <View style={styles.statusWrapper}>
                                <Text style={[styles.valueText, { marginBottom: 10 }]}>Approved by {item.approvedBy} on September 17, 2023</Text>
                                <Text stye={styles.valueText}>Reviewed by {item.reviewedBy} on September 17, 2023</Text>
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
                COLORS.filed :
            item.status == "Reviewed" ?
                COLORS.purple :
            item.status == "Approved" ?
                COLORS.green :
            item.status == "Cancelled" ?
                COLORS.red
            : COLORS.tr_gray,

        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 15,
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
        color: COLORS.black,
    },

    statusWrapper: {
        width: '80%',
    }
})