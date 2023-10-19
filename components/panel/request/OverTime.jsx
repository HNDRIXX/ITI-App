import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from "react-native";
import * as Animatable from 'react-native-animatable';
import { AntDesign, Entypo, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment/moment";

import { COLORS } from "../../../constant";
import { SearchAndNewRequest } from "../../use/SearchAndNewRequest";
import RequestItem from "../../use/request/RequestItem";

// Filed, Reviewed, Approved, Cancelled (Denied)
const data = [
    { 
        status: 'Approved',  
        date: '20230913',
        overTimeHours: '6:00 PM - 8:30 PM',
        reason: 'QA Testing'
    },
    { 
        status: 'Reviewed',
        date: '20230920',
        overTimeHours: '6:00 PM - 8:00 PM',
        reason: 'QA Testing'
    },
    { 
        status: 'Approved',
        date: '20230922',
        overTimeHours: '6:00 PM - 8:10 PM',
        reason: 'QA Testing'
    },
    { 
        status: 'Filed',
        date: '20230911',
        overTimeHours: '6:00 PM - 8:00 PM',
        reason: 'QA Testing'
    },
    { 
        status: 'Filed',
        date: '20230918',
        overTimeHours: '6:00 PM - 8:00 PM',
        reason: 'QA Testing'
    },
]

export default function OfficialWorkPanel ( onAnimate ) {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [filterText, setFilterText] = useState('')

    const currentDate = moment()
    const dateThreshold = currentDate.clone().subtract(7, 'days')

    const filteredData = data.filter((newItem) => {
            const formattedDate = formattedDateString(newItem.date)
            const itemDate = moment(formattedDate, 'MMMM DD YYYY')

            console.log(formattedDate)

            return (
                newItem.status.toLowerCase().includes(filterText.toLowerCase()) ||
                formattedDate.toLowerCase().includes(filterText.toLowerCase())
            )
        }
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

                    {filteredData.map((item, index) => {
                        const formattedDate = formattedDateString(item.date)
                        const itemDate = moment(formattedDate, 'MMMM DD YYYY')

                        if (!itemDate.isBefore(dateThreshold)) {
                            return (
                                <RequestItem 
                                    onPanel={2}
                                    item={item}
                                    index={index}
                                    newItem={{ ...item, formattedDate: formattedDate }}
                                    key={index}
                                    formattedDate={formattedDate}
                                />
                            )
                        }
                    })}

                    <Text style={styles.itemStatusText}>Earlier</Text>

                    {filteredData.map((item, index) => {
                        const formattedDate = formattedDateString(item.date)
                        const itemDate = moment(formattedDate, 'MMMM,DD YYYY')

                        if (itemDate.isBefore(dateThreshold)) {
                            return (
                                <RequestItem 
                                    onPanel={2}
                                    item={item}
                                    index={index}
                                    newItem={{ ...item, formattedDate: formattedDate }}
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
                    </View>
                </View>
            </Modal>
        </Animatable.View> 
    )
}

const formattedDateString = (date) => {
    const year = date.substring(0, 4);
    const month = date.substring(4, 6);
    const day = date.substring(6);

    return moment(`${month}-${day}-${year}`, 'MM-DD-YYYY').format('MMMM DD YYYY');
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