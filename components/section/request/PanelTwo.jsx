import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button } from "react-native";
import * as Animatable from 'react-native-animatable';

import { COLORS } from "../../../constant";

export default function PanelTwo ( onAnimate ) {
    const [isModalVisible, setIsModalVisible] = useState(false)

    const data = [
        {name: 'Panel Two 1'},
        {name: 'Panel Two 2'},
        {name: 'Panel Two 3'},
        {name: 'Panel Two 4'},
        {name: 'Panel Two 5'},
        {name: 'Panel Two 6'},
        {name: 'Panel Two 7'},
    ]

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible)
    }    

    return (
        <Animatable.View
            animation={onAnimate ? 'fadeIn' : ''}
            duration={600}
            style={[styles.bodyContainer, {opacity: onAnimate ? 1 : 0,}]}
        >
            <Text style={styles.titleText}>Panel Two</Text>

            <TouchableOpacity 
                style={styles.addBtn}
                onPress={toggleModal}
            >
                <Text style={styles.addText}>NEW REQUEST</Text>
            </TouchableOpacity>

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

            <Modal
                visible={isModalVisible}
                animationType="fade"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>This is a Modal</Text>

                        <TouchableOpacity 
                            style={styles.closeBtn}
                            onPress={toggleModal}
                        >
                            <Text style={styles.closeText}>CLOSE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </Animatable.View> 
    )
}

const styles = StyleSheet.create({
    bodyContainer: {
        flex: 1,
    },

    titleText: {
        fontSize: 25,
        fontFamily: 'Inter_600SemiBold',
        margin: 10,
    },

    itemWrapper: {
        backgroundColor: COLORS.clearWhite,
        padding: 30,
        marginHorizontal: 10,
        margin: 5,
        borderRadius: 10,
    },

    addBtn: {
        backgroundColor: COLORS.blue,
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 20,
    },

    addText: {
        color: COLORS.white,
        fontFamily: 'Inter_600SemiBold',
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
      
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },

    closeBtn: {
        backgroundColor: COLORS.blue,
        padding: 10,
        width: 100,
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 10,
    },

    closeText: {
        color: COLORS.white,
        fontFamily: 'Inter_500Medium',
    }
})