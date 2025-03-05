import colors from "@/src/config/colors";
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  Avatar,
  AvatarFallbackText,
  Box,
  Center,
  HStack,
  ImageBackground,
  SafeAreaView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import React from "react";
import { Dimensions, TouchableOpacity, useColorScheme } from "react-native";

const account = () => {
  const mode = useColorScheme();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  return (
    <SafeAreaView
      backgroundColor={mode === "dark" ? "black" : "white"}
      height={screenHeight}
    >
      <Box position="relative" bgColor={colors.primary} height={"20%"}>
        <Center>
          <Text color="white" mt={"20%"}>
            Pengaturan Akun
          </Text>
        </Center>
      </Box>

      <Center>
        <Box
          bgColor={mode === "dark" ? "#22262F" : "white"}
          mt={"-30%"}
          my={20}
          width={"80%"}
          borderTopLeftRadius={10}
          borderTopRightRadius={10}
        >
          <HStack space="md" mx={20} mt={10}>
            <Avatar>
              <AvatarFallbackText> Muhammad Robby</AvatarFallbackText>
            </Avatar>
            <VStack>
              <Text
                fontSize={14}
                fontWeight={"$bold"}
                color={mode === "dark" ? "#F7F7F7" : "black"}
              >
                Muhammad Robby
              </Text>
              <Text fontSize={12} color={"#85888E"}>
                muhammad.robby@gmail.com
              </Text>
            </VStack>
          </HStack>
        </Box>
        <Box
          bgColor={colors.primary}
          my={20}
          width={"80%"}
          mt={"-5%"}
          borderBottomLeftRadius={10}
          borderBottomRightRadius={10}
          height={"25%"}
        >
          <TouchableOpacity onPress={() => router.push("/informasiDiri")}>
            <HStack space="md" mx={20} justifyContent="space-between" mt={12}>
              <Text fontSize={14} fontWeight={"$bold"} color={"#F7F7F7"}>
                Edit informasi diri
              </Text>
              <Entypo
                name={"chevron-right"}
                size={20}
                color={"white"}
                mt={10}
              />
            </HStack>
          </TouchableOpacity>
        </Box>
      </Center>

      <Box
        mx={40}
        mt={"-20%"}
        borderWidth={1}
        borderColor="transparent"
        borderRadius={10}
        bgColor={mode === "dark" ? "#22262F" : "white"}
        width={"80%"}
      >
        <HStack justifyContent="space-around" m={15}>
          <VStack>
            <Text ml={6} color={"#85888E"}>
              Kelas
            </Text>
            <Text color={mode === "dark" ? "#F7F7F7" : "black"}>12 - A</Text>
          </VStack>
          <Text mt={20} color={mode === "dark" ? "#F7F7F7" : "black"}>
            {" "}
            |{" "}
          </Text>
          <VStack>
            <Text color={"#85888E"}>Nomor Kamar</Text>
            <Center>
              <Text color={mode === "dark" ? "#F7F7F7" : "black"}>10 - N</Text>
            </Center>
          </VStack>
        </HStack>
      </Box>

      <Box
        mx={40}
        borderWidth={1}
        borderColor="transparent"
        borderRadius={10}
        bgColor={mode === "dark" ? "#22262F" : "white"}
        mt={20}
        width={"80%"}
      >
        <VStack space="md">
          <HStack m={10} justifyContent="space-between">
            <TouchableOpacity onPress={() => router.push("/informasiWali")}>
              <HStack justifyContent="space-around" mx={5} space="md">
                <FontAwesome
                  name="users"
                  size={20}
                  color={mode === "dark" ? "#F7F7F7" : "black"}
                />
                <VStack>
                  <Text color={mode === "dark" ? "#F7F7F7" : "black"} size="sm">
                    Informasi Wali
                  </Text>
                  <Text color={"#85888E"} size="xs">
                    Cek wali kelas dan wali kamar mu
                  </Text>
                </VStack>
              </HStack>
            </TouchableOpacity>
            <Entypo
              name={"chevron-right"}
              size={25}
              color={"#85888E"}
              mt={10}
            />
          </HStack>

          <TouchableOpacity onPress={() => router.push("/pengaturanAkun")}>
            <HStack m={10} justifyContent="space-between">
              <HStack mx={5} space="md">
                <MaterialCommunityIcons
                  name="cog-outline"
                  size={20}
                  color={mode === "dark" ? "#F7F7F7" : "black"}
                />
                <VStack>
                  <Text color={mode === "dark" ? "#F7F7F7" : "black"} size="sm">
                    Pengaturan akun
                  </Text>
                  <Text color={"#85888E"} size="xs">
                    Kontrol pengaturan akun,
                  </Text>
                  <Text color={"#85888E"} size="xs">
                    {" "}
                    bahasa, tampilan dan lainnya.
                  </Text>
                </VStack>
              </HStack>
              <Entypo
                name={"chevron-right"}
                size={25}
                color={"#85888E"}
                mt={10}
              />
            </HStack>
          </TouchableOpacity>

          <HStack m={10} justifyContent="space-between">
            <HStack justifyContent="space-around" mx={5} space="md">
              <MaterialCommunityIcons
                name="shield-check-outline"
                size={20}
                color={mode === "dark" ? "#F7F7F7" : "black"}
              />
              <VStack>
                <Text color={mode === "dark" ? "#F7F7F7" : "black"} size="sm">
                  Kebijakan Privasi
                </Text>
                <Text color={"#85888E"} size="xs">
                  Kebijakan menggunakan aplikasi
                </Text>
              </VStack>
            </HStack>
            <Entypo
              name={"chevron-right"}
              size={25}
              color={"#85888E"}
              mt={10}
            />
          </HStack>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default account;
