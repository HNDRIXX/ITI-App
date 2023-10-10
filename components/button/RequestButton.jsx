import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import { COLORS } from '../../constant';
import PanelOne from '../section/request/PanelOne';
import PanelTwo from '../section/request/PanelTwo';

export default function RequestButton() {
    const data = [
        { title: 'Panel One' },
        { title: 'Panel Two' },
        { title: 'Panel Three' },
        { title: 'Panel Four' },
        { title: 'Panel Five' },
        { title: 'Panel Six' },
    ];

    const [selectedButtonIndex, setSelectedButtonIndex] = useState(1)
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
                <PanelOne 
                    onAnimate={true}
                />
            )}

            { selectedButtonIndex == 1 && (
                <PanelTwo 
                    onAnimate={true}
                />
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: COLORS.orange,
        borderBottomWidth: 2,
        marginHorizontal: 10,
    },

    button: {
        width: 130,
        height: 40,
        backgroundColor: COLORS.tr_gray,
        shadowColor: COLORS.darkGray,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: .2,
        shadowRadius: 10,
        borderRadius: 20,
        margin: 13,
        marginLeft: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        color: COLORS.white,
        fontFamily: 'Inter_600SemiBold'
    },
    
    selectedButton: {
        backgroundColor: COLORS.orange,
    },

})