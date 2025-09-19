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
  backTo?: string;   // fallback ke halaman tertentu
  replace?: boolean; // true = replace, false = push
};

export default function Header({ data, backTo, replace }: HeaderProps) {
  const theme = useColorScheme();
  const router = useRouter();

  const handleBack = () => {
    // kalau expo-router versi terbaru: ada canGoBack()
    if (router.canGoBack?.()) {
      router.back();
    } else if (backTo) {
      if (replace) {
        router.push(backTo);
      } else {
        router.push(backTo as any);
      }
    } else {
      // fallback terakhir → balik ke home
      router.replace("/");
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
