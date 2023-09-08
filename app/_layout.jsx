import { Drawer } from "expo-router/drawer";
import { COLORS } from "../constant/theme";

export default function RootLayout() {
    return (
        <Drawer
            initialRouteName='Home' 
            screenOptions={{
                headerTitle: "",
                headerStyle: {
                backgroundColor: COLORS.orange
                },
                headerTintColor: COLORS.white,
                gestureEnabled: true,
                gestureDirection: 'horizontal',
                drawerType: 'slide',
                drawerActiveTintColor: COLORS.baseOrange,
                drawerInactiveTintColor: '#A8A8A8',
                drawerStyle: {
                width: '70%',
                backgroundColor: COLORS.white
            },
            drawerCloseAnimation: 'slide',
        }}
    >
        <Drawer.Screen
            name="index"
            options={{
                drawerLabel: "Home",
                title: "Home",
            }}
        />
        <Drawer.Screen
            name="pages/map/index"
            options={{
                drawerLabel: "Location",
                title: "Location",
            }}
        />
    </Drawer>
  );
}