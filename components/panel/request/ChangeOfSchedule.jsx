import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput } from "react-native";
import * as Animatable from 'react-native-animatable';
import { AntDesign, Entypo, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import moment from "moment/moment";

import { COLORS } from "../../../constant";
import { SearchAndNewRequest } from "../../use/SearchAndNewRequest";
import RequestItem from "../../use/request/RequestItem";
import { ScrollView } from "react-native-gesture-handler";

const data = [
    { 
        status: 'Filed',  
        appliedDate: '20231014',
        requestedSched: '7:00 AM - 4:00 PM',
        reason: '----',
        documentNo: 'COS',
        filedDate: '20230916',
        approvedBy: 'Mark Sasama',
        reviewedBy: 'Benjamin Peralta'
    },
    { 
        status: 'Reviewed', 
        appliedDate: '20230922',
        requestedSched: '7:00 AM - 4:00 PM',
        reason: '----',
        documentNo: 'JJJ',
        filedDate: '20230917',
        approvedBy: 'Mark Sasama',
        reviewedBy: 'Benjamin Peralta'
    },
    { 
        status: 'Approved',
        appliedDate: '20230923',
        requestedSched: '7:00 AM - 4:00 PM',
        reason: '----',
        documentNo: 'JJJ',
        filedDate: '20230918',
        approvedBy: 'Mark Sasama',
        reviewedBy: 'Benjamin Peralta'
    },
    { 
        status: 'Cancelled',
        appliedDate: '20230927',
        requestedSched: '7:00 AM - 4:00 PM',
        reason: '----',
        documentNo: 'JJJ',
        filedDate: '20230919',
        approvedBy: 'Mark Sasama',
        reviewedBy: 'Benjamin Peralta'
    },
    { 
        status: 'Cancelled',
        appliedDate: '202309302',
        requestedSched: '7:00 AM - 4:00 PM',
        reason: '----',
        documentNo: 'JJJ',
        filedDate: '20230920',
        approvedBy: 'Mark Sasama',
        reviewedBy: 'Benjamin Peralta'
    },
]

export default function ChangeOfSchedulePanel ( onAnimate ) {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [filterText, setFilterText] = useState('')

    var totalMismo = 0;
    const currentappliedDate = moment()
    const appliedDateThreshold = currentappliedDate.clone().subtract(7, 'days')

    const [newCount1, setNewCount1] = useState(0);
    const [newCount2, setNewCount2] = useState(0);

    const filteredData = data.filter((newItem) => {
            const formattedDate = formattedDateString(newItem.appliedDate)
            const itemAppliedDate = moment(formattedDate, 'MMMM DD YYYY')

            console.log(formattedDate)

            return (
                newItem.status.toLowerCase().includes(filterText.toLowerCase()) ||
                formattedDate.toLowerCase().includes(filterText.toLowerCase())
            )
        }
    )

    useEffect(() => {
        let count1 = 0
        let count2 = 0
    
        filteredData.forEach((item) => {
          const formattedDate = formattedDateString(item.appliedDate)
          const itemAppliedDate = moment(formattedDate, 'MMMM DD YYYY')
    
          if (!itemAppliedDate.isBefore(appliedDateThreshold)) {
            count1++
          }
    
          if (itemAppliedDate.isBefore(appliedDateThreshold)) {
            count2++
          }
        })
    
        setNewCount1(count1)
        setNewCount2(count2)
    }, [filteredData, appliedDateThreshold])

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
                    { newCount1 > 0 && (<Text style={styles.itemStatusText}>New</Text>) }

                    {filteredData.map((item, index) => {
                        const formattedApplied = formattedDateString(item.appliedDate)
                        const formattedFiled = formattedDateString(item.filedDate)
                        const itemAppliedDate = moment(formattedApplied, 'MMMM DD YYYY')

                        if (!itemAppliedDate.isBefore(appliedDateThreshold)) {
                            return (
                                <RequestItem 
                                    onPanel={0}
                                    item={item}
                                    index={index}
                                    newItem={{ ...item, formattedApplied: formattedApplied, formattedFiled: formattedFiled, requestType: "Change of Schedule"}}
                                    key={index}
                                    formattedApplied={formattedApplied}
                                />
                            )
                        }
                    })}

                    { newCount2 > 0 && (<Text style={styles.itemStatusText}>Earlier</Text>) }

                    {filteredData.map((item, index) => {
                        const formattedApplied = formattedDateString(item.appliedDate)
                        const formattedFiled = formattedDateString(item.filedDate)
                        const itemAppliedDate = moment(formattedApplied, 'MMMM DD YYYY')

                        if (itemAppliedDate.isBefore(appliedDateThreshold)) {
                            return (
                                <RequestItem 
                                    onPanel={0}
                                    item={item}
                                    index={index}
                                    newItem={{ ...item, formattedApplied: formattedApplied, formattedFiled: formattedFiled, requestType: "Change of Schedule" }}
                                    key={index}
                                    formattedApplied={formattedApplied}
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

const formattedDateString = (appliedDate) => {
    const year = appliedDate.substring(0, 4);
    const month = appliedDate.substring(4, 6);
    const day = appliedDate.substring(6);

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

  
    moreText: {
        fontSize: 12,
        color: COLORS.tr_gray,
        paddingTop: 10,
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