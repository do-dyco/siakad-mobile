/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {
  Box,
  Center,
  Divider,
  HStack,
  StatusBar,
  Text,
  View,
} from "@gluestack-ui/themed";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type HeaderProps = {
  data?: string;
  backTo?: string;
  replace?: boolean;
};

export default function Header({ data, backTo, replace }: HeaderProps) {
  const theme = useColorScheme();
  const router = useRouter();

  const handleBack = () => {
    if (backTo) {
      if (replace) {
        router.replace(backTo);
      } else {
        router.push(backTo as any);
      }
    } else {
      router.back();
    }
  };

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
        <TouchableOpacity onPress={handleBack}>
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
                numberOfLines={1}
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
