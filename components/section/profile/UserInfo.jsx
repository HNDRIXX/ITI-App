import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Image } from "expo-image";
import * as Animatable from 'react-native-animatable';

import { COLORS } from "../../../constant";

export default function UserInfo (onAnimate) {
    
    return (
        <Animatable.View
            animation={onAnimate ? 'fadeIn' : ''}
            easing={'ease-in-out'}
            duration={500}
            useNativeDriver
            style={[styles.bodyContainer, {opacity: onAnimate ? 1 : 0,}]}
        >
            <View style={styles.centerContent}>
                <Image
                    source={require('../../../assets/img/icons/user.png')}
                    style={styles.imageProfile}
                /> 

                <Text style={styles.nameText}>Lorem Ipsum</Text>
            </View>

            <View style={styles.textContext}> 
                <View style={styles.textWrapper}>
                    <Text style={styles.textTitle}>Title:</Text>
                    <Text style={styles.textSub}>Lorem Ipsum</Text>
                </View>

                <View style={styles.textWrapper}>
                    <Text style={styles.textTitle}>Title:</Text>
                    <Text style={styles.textSub}>Lorem Ipsum</Text>
                </View>
                
                <View style={styles.textWrapper}>
                    <Text style={styles.textTitle}>Title:</Text>
                    <Text style={styles.textSub}>Lorem Ipsum</Text>
                </View>

                <View style={styles.textWrapper}>
                    <Text style={styles.textTitle}>Title:</Text>
                    <Text style={styles.textSub}>Lorem Ipsum</Text>
                </View>
            </View>
        </Animatable.View>
    )
}

const styles = StyleSheet.create({ 
    centerContent: {  
        position: 'absolute',
        top: -60,
        alignItems: 'center',
        alignSelf: 'center',
    },
     
    imageProfile: {
        width: 140, height: 140,
        backgroundColor: COLORS.clearWhite,
        borderColor: COLORS.lightBlue,
        borderWidth: 6,
        borderRadius: 70
    },

    nameText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 22,
        color: COLORS.darkGray,
        padding: 10,
    },

    bodyContainer: {
        flex: 1,
        marginTop: 100,
        margin: 20,
        padding: 25,
        borderRadius: 15,
        backgroundColor: COLORS.clearWhite,
        // elevation: 7,
        // shadowColor: COLORS.blue,
        // shadowOpacity: 0.5,
        // shadowRadius: 3,
        // shadowOffset : { width: 1, height: 3},
    },

    textContext: {
        marginTop: 130,
    },

    textWrapper: {
        marginVertical: 15,
    },

    textTitle: { 
        fontFamily: 'Inter_400Regular',
        color: COLORS.tr_gray,
        fontSize: 13,
    },

    textSub: {
        fontFamily: 'Inter_500Medium',
        color: COLORS.darkGray,
        fontSize: 17,
    },

})