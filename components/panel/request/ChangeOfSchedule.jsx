import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput } from "react-native";
import * as Animatable from 'react-native-animatable';
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

import { COLORS } from "../../../constant";
import { SearchAndNewRequest } from "../../use/SearchAndNewRequest";

// Filed, Reviewed, Approved, Cancelled (Denied)
const data = [
    { 
        status: 'Filed', 
        name: 'Listing 1', 
        currDate: 'Sept 18, 2023',
        requestedSched: '7:00 AM - 4:00 PM',
        reason: '----'
    },
    { 
        status: 'Reviewed', 
        name: 'Listing 2', 
        currDate: 'Sept 20, 2023',
        requestedSched: '7:00 AM - 4:00 PM',
        reason: '----'
    },
    { 
        status: 'Approved', 
        name: 'Listing 3', 
        currDate: 'Sept 22, 2023',
        requestedSched: '7:00 AM - 4:00 PM',
        reason: '----'
    },
    { 
        status: 'Cancelled', 
        name: 'Listing 4', 
        currDate: 'Sept 27, 2023',
        requestedSched: '7:00 AM - 4:00 PM',
        reason: '----'
    },
    { 
        status: 'Cancelled', 
        name: 'Listing 5', 
        currDate: 'Sept 30, 2023',
        requestedSched: '7:00 AM - 4:00 PM',
        reason: '----'
    },
]

export default function ChangeOfSchedulePanel ( onAnimate ) {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [filterText, setFilterText] = useState('')

    const filteredData = data.filter(item =>
        item.status.toLowerCase().includes(filterText.toLowerCase()) ||
        item.currDate.toLowerCase().includes(filterText.toLowerCase())
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
                <FlatList 
                    data={filteredData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => (
                        <View style={styles.itemContainer} key={index}>
                            <View style={styles.itemWrapper}>
                                <View style={styles.dateRowWrapper(item)}>
                                    <Text style={styles.currDateText}>{item.currDate}</Text>

                                    <View style={styles.rowWrapper}>
                                        { item.status == "Cancelled" ? (
                                            <Entypo
                                                name="circle-with-cross"
                                                size={19}
                                                color={COLORS.clearWhite}
                                            /> 
                                        ) : (
                                            <AntDesign
                                                name="checkcircle"
                                                size={17}
                                                color={COLORS.clearWhite}
                                            />
                                        )}

                                        <Text style={styles.statusText}>{item.status}</Text>
                                    </View>

                                </View>

                                <View style={styles.bodyWrapper}>
                                    <View style={styles.rowWrapper}>
                                        <Text style={styles.boldText}>Requested Schedule: </Text>
                                        <Text style={styles.valueText}>{item.requestedSched}</Text>
                                    </View>

                                    <View style={styles.reasonWrapper}>
                                        <View style={styles.rowWrapper}>
                                            <Text style={styles.boldText}>Reason: </Text>
                                            <Text style={styles.valueText}>{item.reason}</Text>
                                        </View>

                                        <TouchableOpacity
                                            onPress={() => router.push(`access/navigation/request/changeofschedule/more/${encodeURIComponent(JSON.stringify(item))}`)}
                                        >
                                            <Text style={styles.moreText}>More {'>'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}/>
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
            item.status == "Filed" ? COLORS.yellow :
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
        fontFamily: 'Inter_700Bold',
        color: COLORS.clearWhite,
    },

    statusText: {
        fontFamily: 'Inter_700Bold',
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

    moreText: {
        fontSize: 12,
        color: COLORS.tr_gray,
        paddingTop: 10,
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