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
  Text,
} from "@gluestack-ui/themed";
import React from "react";
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

function Header({ data }: any) {
  const navigation = useNavigation<any>();
  const theme = useColorScheme();

  return (
    <>
      <Box backgroundColor={theme === "dark" ? "black" : "white"}>
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
        <Divider mt={10} bgColor="#3a3a3b" />
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
