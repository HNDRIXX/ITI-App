import { View, Text, StyleSheet, Dimensions, ImageBackground, FlatList, TouchableOpacity} from "react-native"
import { Image } from "expo-image"
import { StatusBar } from "expo-status-bar"
import { router } from "expo-router"

import { COLORS } from "../../../../constant"
import { useState } from "react"
import Filed from "../../../../components/panel/home/pending/Filed"
import UserInfo from "../../../../components/section/profile/UserInfo"
import Payslip from "../../../../components/section/profile/Payslip"
import { AntDesign } from "@expo/vector-icons"
import PendingItem from "../../../../components/use/home/pending/FiledItem"

export default function PendingPage () {
    const [activePanel, setActivePanel] = useState(1)
    const [itemCount, setItemCount] = useState(0)

    const switchPanel = (panelNum) => {
        setActivePanel(panelNum)
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.topHeader}>
                <TouchableOpacity 
                    style={styles.backButton} 
                    onPress={() => router.push(`/pages/home/[home]`)}
                >
                    <AntDesign name='arrowleft' size={30} color={COLORS.clearWhite} />
                </TouchableOpacity>

                <Text style={styles.textHeader}>Pending</Text>
            </View>

            <View style={styles.btnHorizontal}>
                <TouchableOpacity
                    style={[ styles.button, activePanel ===  1  && styles.selectedButton ]}
                    onPress={() => switchPanel(1)}
                >
                    <Text style={[ styles.counterText, activePanel === 1 && styles.selectedCounter ]}>{itemCount}</Text>

                    <Text style={[ styles.buttonText, activePanel === 1 && styles.selectedTextButton ]}>Filed</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.button,
                        activePanel ===  2  && styles.selectedButton,
                    ]}
                    onPress={() => switchPanel(2)}
                >
                    <Text 
                        style={[
                            styles.buttonText,
                            activePanel === 2 && styles.selectedTextButton
                        ]}
                    >Loan</Text>
                </TouchableOpacity>

            </View>

            { activePanel === 1 && (
                <Filed
                    onAnimate={true}
                    itemCount={itemCount}
                    setItemCount={setItemCount}
                />
            )}

            { activePanel === 2 && (
                null
            )}
        </View>
    )
}


const styles = StyleSheet.create({
   
    backButton: {
        paddingHorizontal: 10,
    },

    topHeader: {
        padding: 1,
        paddingBottom: 10,
        paddingVertical: 50,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: COLORS.powderBlue,
    },
    
    textHeader: {
        color: COLORS.clearWhite,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
        flex: 1,
        textAlign: 'center',
        marginRight: 50,
    },

    btnHorizontal: {
        flexDirection: 'row',
        marginHorizontal: 10,
        borderBottomColor: COLORS.lighterOrange,
        borderBottomWidth: 2,
    },

    button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 15,
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
    },

    counterText: {
        backgroundColor: COLORS.clearWhite,
        color: COLORS.orange,
        marginRight: 10,
        fontSize: 15,
        fontFamily: 'Inter_700Bold',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        display: 'none',
    },
  
    buttonText: {
        color: COLORS.tr_gray,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 16,
    },
  
    selectedButton: {
        backgroundColor: COLORS.orange,
        elevation: 7,
        shadowColor: COLORS.darkGray,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: .2,
        shadowRadius: 10,
    },
  
    selectedTextButton: {
        color: COLORS.clearWhite,
        fontFamily: 'Inter_700Bold',
    },

    selectedCounter: {
        display: 'flex',
    }
})
