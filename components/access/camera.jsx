import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { COLORS } from "../../constant";
import { router } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function CameraIndex () {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <TouchabilityOpacity
                    style={styles.cameraBtn}
                    onPress={() => router.push(`/access/geo/camera`)}
                >
                    <FontAwesome 
                        name='camera'
                        size={20}
                        color={COLORS.blue}
                    />

                </TouchabilityOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})