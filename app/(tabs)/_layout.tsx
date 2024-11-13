import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons, Octicons, SimpleLineIcons } from "@expo/vector-icons";
import colors from "@/src/config/colors";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarStyle: {
          backgroundColor: colorScheme === "dark" ? "black" : "white",
        },
        headerShown: false,
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
