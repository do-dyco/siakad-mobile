/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  Box,
  Center,
  Divider,
  HStack,
  Heading,
  StatusBar,
  Text,
  View,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";

import { useColorScheme } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

function Header({ data }: any) {
  const theme = useColorScheme();

  return (
    <>
      <View
        style={{
          backgroundColor: theme === "dark" ? "black" : "white",
          
        }}
      >
        <StatusBar
          barStyle={theme === "dark" ? "light-content" : "dark-content"}
          backgroundColor={theme === "dark" ? "black" : "white"}
        />
      </View>
      <Box backgroundColor={theme === "dark" ? "black" : "white"} mt={30}>
        <TouchableOpacity onPress={() => router.back()}>
          <HStack m={5}>
            <MaterialIcons
              name="chevron-left"
              color={theme === "dark" ? "white" : "black"}
              size={30}
            />
            <Center flex={1} mr={20}>
              <Text
                color={theme === "dark" ? "white" : "black"}
                size="sm"
                mr={20}
              >
                {data}
              </Text>
            </Center>
          </HStack>
        </TouchableOpacity>
        <Divider mt={10} bgColor="transparent" />
      </Box>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 0,
  },
});

export default Header;
