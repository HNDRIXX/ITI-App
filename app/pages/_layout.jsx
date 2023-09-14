import { useState, useEffect, useRef } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomSidebarMenu from '../../components/sidebar/CustomSidebarMenu'
import { COLORS, useFonts } from '../../constant';
import 'react-native-gesture-handler'
import { ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

import HomePage from '../../app/pages/home/index';
import MapPage from '../../app/pages/map/index'
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';


function HomeScreenStack() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Home" component={HomePage} />
        </Stack.Navigator>
    )
}

function MapScreenStack() {
    return (
        <Stack.Navigator
            initialRouteName="Map"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Map" component={MapPage} />
        </Stack.Navigator>
    )
}

export default function Layout() {
  return (
    <>
      <NavigationContainer independent={true}>
        <Drawer.Navigator
            screenOptions={{
                headerTitle: "",
                headerStyle: {
                    backgroundColor: COLORS.blue
                },
                headerTintColor: COLORS.white,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                drawerType: 'slide',
                drawerActiveTintColor: COLORS.lightBlue,
                drawerInactiveTintColor: '#A8A8A8',
                drawerStyle: {
                    width: '70%',
                    backgroundColor: COLORS.white,
                },
                drawerCloseAnimation: 'slide',
                headerShadowVisible: true,
            }}
            
            drawerContent={props => <CustomSidebarMenu {...props} />}
        >
            <Drawer.Screen
                name="HomeScreen"
                options={{
                    drawerLabel: 'Home',
                    title: 'Home',
                    drawerIcon: ({focused, size}) => (
                        <Ionicons
                            name="ios-home"
                            size={size}
                            color={focused ? COLORS.lightBlue : COLORS.gray}
                        />
                    ),
                }}
                component={HomeScreenStack}
            />

            <Drawer.Screen
                name="MapScreen"
                options={{ 
                    drawerLabel: 'Map', 
                    title: 'Map',
                    drawerIcon: ({focused, size}) => (
                        <FontAwesome
                            name="map"
                            size={size}
                            color={focused ? COLORS.lightBlue : COLORS.gray}
                        />
                    ),
                }}
                component={MapScreenStack}
            />


        </Drawer.Navigator>
      </NavigationContainer>
    </>
  )
}
