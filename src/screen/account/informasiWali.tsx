import Header from "@/components/Header";
import { EvilIcons } from "@expo/vector-icons";
import {
  SafeAreaView,
  Text,
  Box,
  HStack,
  VStack,
  ScrollView,
} from "@gluestack-ui/themed";
import React from "react";
import { Dimensions, useColorScheme } from "react-native";

const informasiWali = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;

  return (
    <ScrollView>
      <SafeAreaView
        backgroundColor={mode === "dark" ? "black" : "white"}
        height={screenHeight}
      >
        <Header data={"Informasi Wali"} />

        <Text
          mt={20}
          p={10}
          ml={10}
          color={mode === "dark" ? "#F7F7F7" : "black"}
        >
          Wali Kelas
        </Text>
        <Box
          mx={20}
          borderWidth={1}
          borderColor="transparent"
          borderRadius={10}
          bgColor={mode === "dark" ? "#22262F" : "white"}
          width={"80%"}
        >
          <VStack space="md">
            <HStack m={10} justifyContent="space-between">
              <VStack>
                <Text color={"#85888E"} size="xs">
                  Nama Wali
                </Text>
                <Text color={mode === "dark" ? "#F7F7F7" : "black"} size="sm">
                  Wiwit Pratiwi
                </Text>
              </VStack>
            </HStack>

            <HStack m={10} justifyContent="space-between">
              <VStack>
                <Text color={"#85888E"} size="xs">
                  Nomor Telepon
                </Text>
                <Text color={mode === "dark" ? "#F7F7F7" : "black"} size="sm">
                  08123456789
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </Box>

        <Text
          mt={20}
          p={10}
          ml={10}
          color={mode === "dark" ? "#F7F7F7" : "black"}
        >
          Wali Kamar
        </Text>
        <Box
          mx={20}
          borderWidth={1}
          borderColor="transparent"
          borderRadius={10}
          bgColor={mode === "dark" ? "#22262F" : "white"}
          width={"80%"}
        >
          <VStack space="md">
            <HStack m={10} justifyContent="space-between">
              <VStack>
                <Text color={"#85888E"} size="xs">
                  Nama Wali
                </Text>
                <Text color={mode === "dark" ? "#F7F7F7" : "black"} size="sm">
                  Dani Nurfadly
                </Text>
              </VStack>
            </HStack>

            <HStack m={10} justifyContent="space-between">
              <VStack>
                <Text color={"#85888E"} size="xs">
                  Nomor Telepon
                </Text>
                <Text color={mode === "dark" ? "#F7F7F7" : "black"} size="sm">
                  08123456789
                </Text>
              </VStack>
            </HStack>
          </VStack>
        </Box>
      </SafeAreaView>
    </ScrollView>
  );
};

export default informasiWali;
