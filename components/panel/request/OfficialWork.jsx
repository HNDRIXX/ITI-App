import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from "react-native";
import * as Animatable from 'react-native-animatable';
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import moment from "moment";

import { COLORS } from "../../../constant";
import RequestItem from "../../use/request/RequestItem";
import { SearchAndNewRequest } from "../../use/SearchAndNewRequest";

// Filed, Reviewed, Approved, Cancelled (Denied)
const data = [
    { 
        status: 'Reviewed',
        date: '20231018',
        location: 'Sofitel Philippine Plaza, Manila',
        reason: 'Client Meeting'
    },
    { 
        status: 'Reviewed',
        date: '20230930',
        location: '2138 Roxas Blvd, Manila',
        reason: 'Client Meeting'
    },
    { 
        status: 'Cancelled',
        date: '20231001',
        location: 'Sofitel Philippine Plaza, Manila',
        reason: 'Client Meeting'
    },
    { 
        status: 'Approved',
        date: '20230902',
        location: 'Sofitel Philippine Plaza, Manila',
        reason: 'Client Meeting'
    },
    { 
        status: 'Filed',
        date: '20231030',
        location: 'Sofitel Philippine Plaza, Manila',
        reason: 'Client Meeting'
    },
]

export default function OfficialWorkPanel ( onAnimate ) {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [filterText, setFilterText] = useState('')

    const currentDate = moment()
    const dateThreshold = currentDate.clone().subtract(7, 'days')

    const filteredData = data.filter(item =>
        item.status.toLowerCase().includes(filterText.toLowerCase()) ||
        item.date.toLowerCase().includes(filterText.toLowerCase())
    )

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible)
    }    

    return (
        <Animatable.View
            animation={onAnimate ? 'fadeIn' : ''}
            duration={600}
            style={[styles.bodyContainer, {opacity: onAnimate ? 1 : 0,}]}
        >
            <SearchAndNewRequest 
                filterText={filterText}
                setFilterText={setFilterText}
                toggleModal={toggleModal}
            />

            { filteredData.length > 0 ? (
                <ScrollView>
                    <Text style={styles.itemStatusText}>New</Text>

                    {data.map((item, index) => {
                        const year = item.date.substring(0, 4)
                        const month = item.date.substring(4, 6)
                        const day = item.date.substring(6)

                        const formattedDate = moment(`${month}-${day}-${year}`, 'MM-DD-YYYY').format('MMMM DD YYYY')

                        const newItem = {
                            ...item,
                            formattedDate: formattedDate,
                        }

                        const itemDate = moment(formattedDate, 'MMM DD, YYYY')

                        if (!itemDate.isBefore(dateThreshold)) {
                            return (
                                <RequestItem 
                                    onPanel={1}
                                    item={item}
                                    index={index}
                                    newItem={newItem}
                                    key={index}
                                    formattedDate={formattedDate}
                                />
                            )
                        }
                    })}

                    <Text style={styles.itemStatusText}>Earlier</Text>

                    {data.map((item, index) => {
                        const year = item.date.substring(0, 4)
                        const month = item.date.substring(4, 6)
                        const day = item.date.substring(6)

                        const formattedDate = moment(`${month}-${day}-${year}`, 'MM-DD-YYYY').format('MMMM DD YYYY')

                        const newItem = {
                            ...item,
                            formattedDate: formattedDate,
                        }

                        const itemDate = moment(formattedDate, 'MMM DD, YYYY')

                        if (itemDate.isBefore(dateThreshold)) {
                            return (
                                <RequestItem 
                                    onPanel={1}
                                    item={item}
                                    index={index}
                                    newItem={newItem}
                                    key={index}
                                    formattedDate={formattedDate}
                                />
                            )
                        }
                    })}
                </ScrollView>
            ) : ( 
                <View style={styles.noSearchWrapper}>
                    <AntDesign
                        name="search1"
                        size={55}
                        color={COLORS.darkGray}
                        style={{ padding: 20 }}
                    />
                    <Text>No Search Found.</Text>
                </View>
            )}
            

            <Modal
                visible={isModalVisible}
                animationType="fade"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity 
                            style={styles.closeBtn}
                            onPress={toggleModal}
                        >
                            <AntDesign
                                name={'close'}
                                size={20}
                                color={COLORS.blue}
                            />
                        </TouchableOpacity>

                        <Text>This is a Modal</Text>

                        {/* <TouchableOpacity 
                            style={styles.closeBtn}
                            onPress={toggleModal}
                        >
                            <Text style={styles.closeText}>CLOSE</Text>
                        </TouchableOpacity> */}
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

    itemStatusText: {
        fontFamily: 'Inter_500Medium',
        color: COLORS.darkGray,
        padding: 10,
        fontSize: 18,
        marginHorizontal: 15
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
        padding: 10,
        width: 100,
        alignSelf: 'flex-end',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 10,
    },

    closeText: {
        color: COLORS.white,
        fontFamily: 'Inter_500Medium',
    },

    noSearchWrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})