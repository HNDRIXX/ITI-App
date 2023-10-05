import { View, Text, StyleSheet, Dimensions, ImageBackground, FlatList, TouchableOpacity} from "react-native"
import { Image } from "expo-image"
import { StatusBar } from "expo-status-bar"
import { COLORS } from "../../../constant"
import { useState } from "react"
import UserInfo from "../../../components/section/profile/UserInfo"

const width = Dimensions.get('window').width

export default function ProfileIndex () {
    const data = [{title: 'Button 1'}, {title: 'Button 2'}]
    const [activePanel, setActivePanel] = useState(1)

    const switchPanel = (panelNum) => {
        setActivePanel(panelNum)
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.topHeader}>
                <Text style={styles.textHeader}>Profile</Text>
            </View>

            <View style={styles.btnHorizontal}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => switchPanel(1)}
                >
                    <Text style={styles.buttonText}>Information</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => switchPanel(2)}
                >
                    <Text style={styles.buttonText}>Payslip</Text>
                </TouchableOpacity>
            </View>

            { activePanel === 1 && (
                <UserInfo />
            )}

            { activePanel === 2 && (
                <></>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    
    topHeader: {
        padding: 3,
        paddingBottom: 10,
        alignItems: 'center',
        backgroundColor: COLORS.blue,
    },

    textHeader: {
        color: COLORS.clearWhite,
        fontFamily: 'Inter_600SemiBold',
        fontSize: 18,
    },

    btnHorizontal: {
        flexDirection: 'row',
        marginHorizontal: 10,
        borderBottomColor: COLORS.orange,
        borderBottomWidth: 3,
    },

    button: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: COLORS.orange,
        margin: 15,
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
    },

    buttonText: {
        color: COLORS.white,
        fontFamily: 'Inter_600SemiBold',
    },
})
