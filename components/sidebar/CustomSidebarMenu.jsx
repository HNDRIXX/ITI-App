
import React, {useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, StyleSheet, Image, Text, Linking, ImageBackground, ActivityIndicator, TouchableOpacity, Animated, } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import { COLORS, useFonts } from '../../constant';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const CustomSidebarMenu = (props) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const dropdownHeight = useRef(new Animated.Value(0)).current
  const router = useRouter()

  const [fontsLoaded] = useFonts()

  if (!fontsLoaded) { 
    return <>
      <ActivityIndicator size={'large'} color={COLORS.baseOrange} />
    </>
  }

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);

    Animated.timing(dropdownHeight, {
      toValue: isDropdownOpen ? 0 : 100,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <>
        <Image
          source={require('../../assets/img/gradient.png')} 
          style={styles.topHeaderImage}
        />
      </>

      <View style={styles.textHeaderContainer}>
        <Text style={styles.textHeader}>Application</Text>
        <Text style={styles.subTextHeader}>Lorem Ipsum Dolor</Text>
      </View>

      <DrawerContentScrollView {...props} style={{ paddingTop: 0 }}>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={toggleDropdown}
          >
            <Text style={styles.dropdownButtonText}>Dropdown</Text>
            <Entypo
              name={isDropdownOpen ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={COLORS.blue}
            />
          </TouchableOpacity>

          <Animated.View style={{ ...styles.dropdownContent, height: dropdownHeight }}>
            <DrawerItemList {...props}/>
          </Animated.View>
      </DrawerContentScrollView>

      <Text
        style={{
          fontSize: 13,
          fontFamily: 'DMSans_500Medium_Italic',
          textAlign: 'center',
          color: 'grey'
        }}
      >
        Prototype Only {'(Patrick)'}
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topHeaderImage: {
    width: '100%',
    height: 170,
    alignSelf: 'center',
    resizeMode: 'cover',
  },

  textHeaderContainer: {
    marginVertical: 20,
    marginHorizontal: 15,
  },

  textHeader: {
    fontFamily: 'DMSans_700Bold',
    color: COLORS.darkBlue,
    fontSize: 20,
  },

  subTextHeader: {
    fontFamily: 'DMSans_400Regular_Italic',
    fontSize: 12,
  },

  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 1,
  },

  dropdownButtonText: {
    fontSize: 16,
    marginRight: 10,
  },

  dropdownContent: {
    overflow: 'hidden',
  },

  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 1,
  }
});

export default CustomSidebarMenu;