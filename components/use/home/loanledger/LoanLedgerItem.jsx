import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,  } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';

import { COLORS } from '../../../../constant';

export default function LoanLedgerItem ({ newItem, index}) {
    return (
        <View style={styles.itemContainer} key={index}>
            <View style={styles.itemWrapper}>
                <View style={styles.dateRowWrapper(item)}>
                    <Text style={styles.currDateText}>{item}</Text>

                    <View style={styles.rowWrapper}>
                        { item.status == "Filed" ? (
                            <FontAwesome5 
                                name="file-import" 
                                size={17} 
                                color={COLORS.clearWhite}
                            />
                        ) : item.status == "Reviewed" ? (
                            <MaterialCommunityIcons 
                                name="file-find" 
                                size={20} 
                                color={COLORS.clearWhite} 
                            />
                        ) : item.status == "Approved" ? (
                            <AntDesign
                                name="checkcircle"
                                size={17}
                                color={COLORS.clearWhite}
                            />
                        ) : item.status == "Cancelled" ? (
                            <Entypo
                                name="circle-with-cross"
                                size={19}
                                color={COLORS.clearWhite}
                            /> 
                        ) : ( null )}

                        <Text style={styles.statusText}>{item.status}</Text>
                    </View>

                </View>

                <View style={styles.bodyWrapper}>
                    <View style={styles.rowWrapper}>
                        <Text style={styles.boldText}>
                            
                        </Text>
                        <Text style={styles.valueText}>
                            
                        </Text>
                    </View>

                    <View style={styles.reasonWrapper}>
                        <View style={styles.rowWrapper}>
                            <Text style={styles.boldText}>Reason: </Text>
                            <Text style={styles.valueText}>{item.reason}</Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => router.push(`access/navigation/request/${encodeURIComponent(JSON.stringify(newItem))}`)}
                        >
                            <Text style={styles.moreText}>More {'>'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({ 
    itemContainer: {
        backgroundColor: COLORS.clearWhite,
        marginHorizontal: 20,
        marginBottom: 25,
        borderRadius: 20,
        elevation: 2,
    },

    dateRowWrapper: (item)  => ({
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 
            item.status == "Approved" ? COLORS.green :
            item.status == "Reviewed" ? COLORS.purple :
            item.status == "Filed" ? COLORS.filed :
            item.status == "Cancelled" ? COLORS.red 
            : COLORS.orange
        ,
        paddingHorizontal: 20,
    }),

    rowWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    currDateText: {
        fontFamily: 'Inter_600SemiBold',
        color: COLORS.clearWhite,
    },

    statusText: {
        fontFamily: 'Inter_600SemiBold',
        paddingLeft: 10,
        color: COLORS.clearWhite,
    },

    bodyWrapper: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },

    reasonWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    boldText: {
        fontFamily: 'Inter_600SemiBold'
    },

    valueText: {
        fontFamily: 'Inter_400Regular',
    },

})