/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Box, HStack, StatusBar, Text } from "@gluestack-ui/themed";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type HeaderProps = {
  data?: string;
  backTo?: string;
  replace?: boolean;
  activeTab?: string;
};

export default function Header({ data, backTo, replace, activeTab }: HeaderProps) {
  const theme = useColorScheme();
  const router = useRouter();

  const tabParam = activeTab
    ? String(Array.isArray(activeTab) ? activeTab[0] : activeTab)
    : undefined;

  const handleBack = () => {
    if (backTo) {
      const nav = {
        pathname: backTo,
        params: tabParam ? { activeTab: tabParam } : {},
      };
      console.log("Back nav to:", nav);
      replace ? router.replace(nav as any) : router.push(nav as any);
    } else if (router.canGoBack?.()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  return (
    <>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={theme === "dark" ? "black" : "white"}
      />

      <Box
        backgroundColor={theme === "dark" ? "black" : "white"}
        mt={30}
        style={styles.headerBox}
      >
        <HStack alignItems="center" justifyContent="center" position="relative" m={5}>
          <TouchableOpacity
            onPress={handleBack}
            style={{ position: "absolute", left: 0 }}
          >
            <MaterialIcons
              name="chevron-left"
              color={theme === "dark" ? "white" : "black"}
              size={30}
            />
          </TouchableOpacity>

          <Text
            color={theme === "dark" ? "white" : "black"}
            size="sm"
            fontWeight="bold"
            numberOfLines={1}
          >
            {data}
          </Text>
        </HStack>
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  headerBox: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd",
  },
});
