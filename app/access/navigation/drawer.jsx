import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";

import { COLORS } from "../../../constant";

export default function Drawer () {
    return (
        <>
            <View style={styles.container}>
                <View style={styles.topHeader}>
                    <TouchableOpacity 
                        style={styles.backButton} 
                        onPress={() => router.push(`/pages/home/`)}
                    >
                        <AntDesign name='arrowleft' size={30} color={COLORS.clearWhite} />
                    </TouchableOpacity>

                    <Text style={styles.textHeader}>HRDotNet</Text>
                </View>

                <View style={{marginTop: 20}}>
                    <TouchableOpacity
                        style={styles.button}
                    >
                        <Image 
                            source={require('../../../assets/img/icons/privacy.png')}
                            style={{ width: 35, height: 35 }}
                            contentFit="contain"
                        />

                        <Text style={styles.textButton}>Privacy Policy</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                    >
                        <Image 
                            source={require('../../../assets/img/icons/terms.png')}
                            style={{ width: 35, height: 35 }}
                            contentFit="contain"
                        />

                        <Text style={styles.textButton}>Terms and Condition</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                    >
                        <Image 
                            source={require('../../../assets/img/icons/info.png')}
                            style={{ width: 35, height: 35 }}
                            contentFit="contain"
                        />

                        <Text style={styles.textButton}>About Us</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.logOutButton}
                    onPress={() => router.push(`/authentication/base/login`)}
                >
                    <Text style={styles.logOutText}>LOG-OUT</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

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

    button: {
        padding: 20,
        backgroundColor: COLORS.clearWhite,
        marginHorizontal: 20,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        elevation: 5,
        shadowColor: COLORS.darkGray,
        shadowOpacity: 0.1,
        shadowRadius: 2,
        shadowOffset : { width: 1, height: 5},
    },

    textButton: {
        marginLeft: 20,
        fontSize: 16,
        fontFamily: 'Inter_500Medium'
    },

    logOutButton: {
        marginVertical: 60,
        backgroundColor: 'red',
        padding: 15,
        width: 200,
        alignSelf: 'center',
        borderRadius: 20,
    },

    logOutText: {
        fontFamily: 'Inter_700Bold',
        color: COLORS.clearWhite,
        textAlign: 'center',
    }
})