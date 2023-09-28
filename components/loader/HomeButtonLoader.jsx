import { View, Text, StyleSheet } from "react-native"; 
import { Skeleton } from "@rneui/themed";
import { COLORS, useFonts } from "../../constant";

function SkeletonButton() {
    return (
      <View style={styles.buttonContainer}>
        <Skeleton 
            style={styles.gridButton} 
            skeletonStyle={{ backgroundColor: COLORS.lightGray}}
            shimmerColors={['#e0e0e0', '#d0d0d0', '#e0e0e0']}
        />
      </View>
    )
  }
  
export default function HomeButtonLoader() {
    const numberOfButtons = 4
  
    return (
      <View style={{flex: 1}}>
        <View style={styles.buttonWrapper}>
            {Array.from({ length: numberOfButtons }).map((_, index) => (
            <SkeletonButton key={index} />
            ))}
        </View>

        {/* <View style={styles.buttonWrapper}>
            {Array.from({ length: numberOfButtons }).map((_, index) => (
            <SkeletonButton key={index} />
            ))}
        </View> */}
      </View>
    )
}

const styles = StyleSheet.create({ 
    buttonWrapper: {
        flex: 1, 
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 0,
    }, 

    buttonContainer: {
        flex: 1,
        marginHorizontal: 5,
    },

    gridButton: {
        borderRadius: 10,
        height: 100,
        elevation: 5,
        shadowColor: COLORS.tr_gray,
        shadowOpacity: 0.5,
        shadowRadius: 15 ,
        shadowOffset : { width: 1, height: 5},
        alignItems: 'center',
        justifyContent: 'center',
    },

})
