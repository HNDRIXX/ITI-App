import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

// import { Tabs } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";
// import { COLORS } from "../../constant";

// export default TabsLayout = () => {
//   return (
//     <Tabs screenOptions={({ route }) => ({
//       headerTitleAlign: 'center',
//       headerStatusBarHeight: 0,
//       headerStyle: {
//         backgroundColor: COLORS.powderBlue,
//       },

//       tabBarStyle: {
//         paddingTop: 5
//       },

//       headerShadowVisible: false,
//       tabBarIcon: ({ focused, color, size }) => {
//         let iconName

//         if (route.name === "home/[index]") {
//           iconName = focused
//             ? "ios-home"
//             : "ios-home-outline"
//         } else if (route.name === "calendar/index") {
//           iconName = focused ? 'ios-calendar' : 'ios-calendar-outline'
//         } else if (route.name === "profile/index") {
//           iconName = focused ? 'person-circle' : 'person-circle-outline'
//         } else if (route.name === "request/index") {
//           iconName = focused ? 'folder-open' : 'folder-open-outline'
//         }

//         return <Ionicons name={iconName} size={size} color={color} />
//       },
//       tabBarActiveTintColor: COLORS.lightOrange
//     })}>
//       <Tabs.Screen
//         name="home/[index]" 
//         options={{
//           title: "",
//           tabBarLabel: 'Home',
//         }}
      
//       />

//       <Tabs.Screen
//         name="calendar/index" 
//         options={{
//           title: "",
//           tabBarLabel: "Calendar",
//         }}
//       />

//       <Tabs.Screen
//         name="request/index" 
//         options={{
//           title: "",
//           tabBarLabel: "Request",
//         }}
//       />

//       <Tabs.Screen
//         name="profile/index"
//         options={{
//           title: "",
//           tabBarLabel: "Profile",
//         }}
//       />
//     </Tabs>
//   )
// }