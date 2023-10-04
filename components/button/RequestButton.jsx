import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import { COLORS } from '../../constant';
import PanelOne from '../section/request/PanelOne';

export default function RequestButton() {
    const data = [
        { title: 'Button 1' },
        { title: 'Button 2' },
        { title: 'Button 3' },
        { title: 'Button 4' },
        { title: 'Button 5' },
        { title: 'Button 6' },
    ];

    const [selectedButtonIndex, setSelectedButtonIndex] = useState(null)
    const [displayText, setDisplayText] = useState('')

    const handleButtonPress = (index, title) => {
        setSelectedButtonIndex(index)
        setDisplayText(`This is Button ${index}`)
    }

    return (
        <>
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={[
                                styles.button,
                                selectedButtonIndex === index && styles.selectedButton,
                            ]}
                            onPress={() => handleButtonPress(index, item.title)}
                        >
                            <Text style={styles.buttonText}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                    style={styles.buttonList}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            { selectedButtonIndex == 0 && (
                <PanelOne />
            )}

            { selectedButtonIndex == 1 && (
                <View>
                    <Text>Set Display</Text>
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        width: 130,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        color: COLORS.baseOrange,
        fontFamily: 'Inter_600SemiBold'
    },
    selectedButton: {
        borderBottomWidth: 3,
        borderColor: COLORS.blue,
    },

})