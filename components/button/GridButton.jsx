import React from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet, ScrollView, Platform} from 'react-native'
import { COLORS } from '../../constant'
import { Ionicons, SimpleLineIcons, MaterialCommunityIcons, FontAwesome5, FontAwesome, Entypo, AntDesign } from '@expo/vector-icons'


function GridButton({ onPress }) {
  return (
    <ScrollView 
        contentContainerStyle={{ 
            justifyContent: 'center', 
        }}
        showsVerticalScrollIndicator={ Platform.OS == 'web' ? true : false }
    >
        <View style={styles.buttonWrapper}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.gridButton} onPress={onPress}>
                    <SimpleLineIcons name="plane" size={75} style={styles.iconOverlay}/>

                    <View style={styles.textButtonWrapper}>
                        <Text style={styles.textButton}>Vacation</Text>
                        <Text style={styles.textButton}>Leave</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.gridButton} disabled={true}>
                    <MaterialCommunityIcons name="emoticon-sick-outline" size={75} style={styles.iconOverlay} />

                    <View style={styles.textButtonWrapper}>
                        <Text style={styles.textButton}>Sick</Text>
                        <Text style={styles.textButton}>Leave</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.buttonWrapper}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.gridButton} disabled={true}>
                    <FontAwesome name="money" size={75} style={styles.iconOverlay}/>

                    <View style={styles.textButtonWrapper}>
                        <Text style={styles.textButton}>Paid</Text>
                        <Text style={styles.textButton}>Hours</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.gridButton} onPress={onPress}>
                    <Entypo name="clock" size={75} color={COLORS.orange} style={styles.iconOverlay} />

                    <View style={styles.textButtonWrapper}>
                        <Text style={styles.textButton}>Deductions</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.hairline} />

        <View style={styles.partitionWrapper}>
            <Text style={styles.textPartition}>Pending Applications for Approval</Text>
        </View>

        <View style={styles.rowWrapper}>
            <TouchableOpacity style={styles.rowButton} onPress={onPress}>
                <Entypo name="clock" size={30} color={COLORS.orange} style={styles.iconRow} />

                <View style={styles.buttonTextWrapper}>
                    <Text style={styles.textButton}>Overtime</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rowButton} onPress={onPress}>
                <AntDesign name="file-markdown" size={30} color={COLORS.orange} style={styles.iconRow} />

                <View style={styles.buttonTextWrapper}>
                    <Text style={styles.textButton}>Missed Logs</Text>
                </View>
            </TouchableOpacity>
        </View>
        
        <View style={styles.rowWrapper}>
            <TouchableOpacity style={styles.rowButton}>
                <Ionicons name="calendar-outline" size={30} color={COLORS.orange} style={styles.iconRow}/>

                <View style={styles.buttonTextWrapper}>
                    <Text style={styles.textButton}>Official Work</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rowButton}>
                <FontAwesome name="files-o" size={30} color={COLORS.orange} style={styles.iconRow} />

                <View style={styles.buttonTextWrapper}>
                    <Text style={styles.textButton}>Lorem Ipsum</Text>
                </View>
            </TouchableOpacity>
        </View>

        <View style={styles.rowWrapper}>
            <TouchableOpacity style={styles.rowButton}>
                <MaterialCommunityIcons name="exit-run" size={30} color={COLORS.orange} style={styles.iconRow}/>

                <View style={styles.buttonTextWrapper}>
                    <Text style={styles.textButton}>Lorem Ipsum</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.rowButton}>
                <FontAwesome name="calendar-check-o" size={30} color={COLORS.orange} style={styles.iconRow} />

                <View style={styles.buttonTextWrapper}>
                    <Text style={styles.textButton}>Lorem Ipsum</Text>
                </View>
            </TouchableOpacity>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

    hairline: {
        paddingTop: 15,
        marginHorizontal: 10,
        borderBottomColor: COLORS.tr_gray,
        borderBottomWidth: StyleSheet.hairlineWidth, 
    },
    
    buttonWrapper: {
        flex: 1, 
        flexDirection: 'row',
        marginVertical: 4,
    }, 

    buttonContainer: {
        flex: 1,
    },

    gridButton: {
        borderRadius: 6,
        marginHorizontal: 4,
        height: 200,
        backgroundColor: COLORS.orange,
        elevation: 3,
        alignItems: 'center',
    },

    iconOverlay: {
        color: COLORS.clearWhite,
        marginTop: 40,
    },

    textButtonWrapper: {
        position: 'absolute',
        bottom: 20,
        left: 20,
    },

    textButton: {
        fontFamily: 'DMSans_700Bold',
        color: COLORS.white,
        fontSize: 17,
        lineHeight: 17,
        letterSpacing: -1
    },

    partitionWrapper: { 
        marginHorizontal: 4,
        marginVertical: 10,
    },

    textPartition : {
        fontFamily: 'DMSans_500Medium',
        color: COLORS.darkGray,
    },

    iconRow: {
        color: COLORS.clearWhite,
    },

    rowWrapper: { 
        
    },
    
    rowButton: {
        flex: 1,
        backgroundColor: COLORS.orange,
        padding: 25,
        borderRadius: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
    },

    buttonTextWrapper: {
        paddingLeft: 10,
        paddingTop: 5,
    }
})

export default GridButton