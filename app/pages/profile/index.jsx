import { View, Text, StyleSheet, Dimensions, ImageBackground } from "react-native"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"
import { StatusBar } from "expo-status-bar"
import { COLORS } from "../../../constant"

const width = Dimensions.get('window').width

export default function ProfileIndex () {
    return (
        <View style={{ flex: 1 }}>
            <View>
                <View
                    style={styles.topView} 
                />

                <View style={styles.centerContent}>
                    <Image 
                        source={require('../../../assets/img/icons/profile.png')}
                        style={styles.imageProfile}
                    /> 

                    <Text style={styles.nameText}>Lorem Ipsum</Text>
                </View>
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.informationText}>Information</Text>

                <View style={styles.textWrapper}>
                    <Text style={styles.titleData}>ID</Text>
                    <Text style={styles.textData}>Lorem Ipsum</Text>
                </View>

                <View style={styles.textWrapper}>
                    <Text style={styles.titleData}>Position</Text>
                    <Text style={styles.textData}>Lorem Ipsum</Text>
                </View>

                <View style={styles.textWrapper}>
                    <Text style={styles.titleData}>Role</Text>
                    <Text style={styles.textData}>Lorem Ipsum</Text>
                </View>

                <View style={styles.textWrapper}>
                    <Text style={styles.titleData}>Account</Text>
                    <Text style={styles.textData}>Lorem Ipsum</Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    topView: {
        backgroundColor: COLORS.blue,
        marginTop: -170,
        height: 280,
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
    },

    centerContent: {
        position: 'absolute',
        top: 20,
        alignItems: 'center',
        alignSelf: 'center',
    },
     
    imageProfile: {
        width: 140, height: 140,
        borderColor: COLORS.lighterOrange,
        borderWidth: 6,
        borderRadius: 190
    },

    nameText: {
        fontFamily: 'Montserrat_500Medium',
        fontSize: 20,
        padding: 10,
    },

    informationText: {
        fontFamily: 'Montserrat_600SemiBold',
        color: COLORS.blue,
        fontSize: 17,
        marginBottom: 10,
    },

    textContainer: {
        marginVertical: 130,
        margin: 20,
        padding: 25,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        elevation: 5,
        shadowColor: COLORS.blue,
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowOffset : { width: 1, height: 3},
    },

    textWrapper: {
        marginVertical: 10,
    }, 

    titleData: {
        fontSize: 12,
        fontFamily: 'Montserrat_400Regular',
        letterSpacing: 0,
    },

    textData: {
        fontSize: 16,
        fontFamily: 'Montserrat_500Medium',
        color: COLORS.darkGray,
        letterSpacing: 0,
    }
})
