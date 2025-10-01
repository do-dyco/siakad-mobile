import { Tabs } from "expo-router";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons, Octicons, SimpleLineIcons } from "@expo/vector-icons";
import colors from "@/src/config/colors";
import { Platform, useWindowDimensions } from "react-native";
import Constants from 'expo-constants';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { width, height } = useWindowDimensions();

  // Determine if we should show the tab bar based on screen size
  const showTabBar = Platform.OS === 'web' || height > 414;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? "dark"].tabIconDefault,
        tabBarStyle: {
          backgroundColor: colorScheme === "light" ? "#FFFFFF" : "#000000",
          borderTopColor: colorScheme === "light" ? "#E5E5E5" : "#333333",
          display: showTabBar ? "flex" : "none",
        },
        headerShown: false,
        // Add Android-specific tab bar styling
        ...(Platform.OS === 'android' && {
          tabBarActiveBackgroundColor: colorScheme === "light" ? "#F5F5F5" : "#1A1A1A",
          tabBarInactiveBackgroundColor: colorScheme === "light" ? "#FFFFFF" : "#000000",
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Octicons
              name={"home"}
              color={focused ? colors.primary : color}
              size={25}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="akademik"
        options={{
          title: "Akademik",
          tabBarIcon: ({ color, focused }) => (
            <SimpleLineIcons
              name={"badge"}
              color={focused ? colors.primary : color}
              size={25}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="keuangan"
        options={{
          title: "Keuangan",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={"wallet-outline"}
              color={focused ? colors.primary : color}
              size={25}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="akun"
        options={{
          title: "Akun",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={"person-circle-outline"}
              color={focused ? colors.primary : color}
              size={32}
            />
          ),
        }}
      />
    </Tabs>
  );
}
