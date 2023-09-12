import React from "react";
import { Stack } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { View, Image, Text } from "react-native";
import { COLORS } from "../../constant";

export default function RootLayout() {
    return (
        <Drawer
            initialRouteName='Home' 
            screenOptions={{
                headerTitle: "",
                headerStyle: {
                    backgroundColor: COLORS.blue
                },
                headerTintColor: COLORS.white,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                drawerType: 'slide',
                drawerActiveTintColor: COLORS.blue,
                drawerInactiveTintColor: '#A8A8A8',
                drawerStyle: {
                    width: '70%',
                    backgroundColor: COLORS.white
                },
                drawerCloseAnimation: 'slide',
                headerShadowVisible: true,
            }}
        >
            <Drawer.Screen
                name="home/index"
                options={{
                    drawerLabel: "Home",
                    title: "Home",
                }}
            />
            <Drawer.Screen
                name="map/index"
                options={{
                    drawerLabel: "Location",
                    title: "Location",
                }}
            />
        </Drawer>
    );
}
