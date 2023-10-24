import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,  } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';

import { COLORS } from '../../../../constant';

export default function PendingItem ({onPanel, item, index, newItem}) {
    return (
        <View style={styles.itemContainer} key={index}>
            <View style={styles.itemWrapper}>
                <View style={styles.dateRowWrapper}>
                    <Text style={styles.statusText}>{item.status}</Text>
                    <Text style={styles.currDateText}>{newItem.formattedDate}</Text>    
                </View>

                <View style={styles.bodyWrapper}>
                    <View style={styles.rowWrapper}>
                        <Text style={styles.boldText}>Applied Date/s: </Text>
                        <Text style={styles.valueText}>{item.appliedDate}</Text>
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
        marginBottom: 10,
        borderRadius: 20,
        // elevation: 10,
    },

    dateRowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.clearWhite,
        paddingHorizontal: 20,
    },

    rowWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    currDateText: {
        fontFamily: 'Inter_700Bold',
        color: COLORS.darkGray,
    },

    statusText: {
        fontFamily: 'Inter_700Bold',
        color: COLORS.darkGray,
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