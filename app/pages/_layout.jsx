import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constant";

export default TabsLayout = () => {
  return (
    <Tabs screenOptions={({ route }) => ({
      headerTitleAlign: "center",
      headerStatusBarHeight: 0,
      headerStyle: {
        backgroundColor: COLORS.blue,
      },
      headerShadowVisible: false, 
      tabBarIcon: ({ focused, color, size }) => {
        let iconName

        if (route.name === "home/index") {
          iconName = focused
            ? "ios-home"
            : "ios-home-outline"
        } else if (route.name === "map/index") {
          iconName = focused ? 'ios-map' : 'ios-map-outline'
        } else if (route.name === "profile/index") {
          iconName = focused ? 'person-circle' : 'person-circle-outline'
        }

        return <Ionicons name={iconName} size={size} color={color} />
      },
      tabBarActiveTintColor: COLORS.lightOrange
    })}>
      <Tabs.Screen
        name="home/index" 
        options={{
          title: "",
          tabBarLabel: 'Home',
        }}
      />
      <Tabs.Screen
        name="map/index" 
        options={{
          title: "",
          tabBarLabel: "Map",
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "",
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  )
}