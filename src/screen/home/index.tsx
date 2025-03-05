import React, { useState } from "react";
import colors from "@/src/config/colors";
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  VStack,
  Text,
  Box,
  HStack,
  Image,
  ScrollView,
  ImageBackground,
  SafeAreaView,
} from "@gluestack-ui/themed";
import { Dimensions, useColorScheme } from "react-native";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import MenuHome from "@/components/MenuHome";
import HomeCard from "@/components/HomeCard";

const Home = () => {
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth * 0.5;

  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;

  return (
    <>
      <SafeAreaView
        backgroundColor={mode === "dark" ? colors.box : "white"}
        height={screenHeight}
      >
        <ScrollView>
          <VStack mt={40} mx={16} space="md" mb={24}>
            <Image
              style={{ width: 50, height: 50, margin: 16 }}
              source={require("@/assets/images/LOGO.png")}
              alt="logo"
              mt="5%"
            />

            <Text
              fontSize={14}
              color={mode === "dark" ? "white" : colors.gray.light[400]}
            >
              Good Morning,
            </Text>
            <Text
              fontSize={18}
              fontWeight={"$bold"}
              color={mode === "dark" ? "white" : "black"}
            >
              Muhammad Roby
            </Text>
          </VStack>

          <HomeCard />

          <MenuHome />

          <Box
            borderRadius={10}
            bgColor="white"
            mt={20}
            mx={10}
            my={5}
            backgroundColor={mode === "dark" ? "black" : "#F5F5F5"}
          >
            <VStack space="md" m={20}>
              <HStack justifyContent="space-between">
                <Box
                  borderRadius={"$full"}
                  bgColor={colors.primary}
                  width={30}
                  height={30}
                  justifyContent="center"
                  alignItems="center"
                >
                  <MaterialCommunityIcons name="lock" size={20} color="white" />
                </Box>

                <MaterialCommunityIcons name="close" size={30} />
              </HStack>

              <HStack justifyContent="space-between" width={"auto"}>
                <VStack width={"70%"}>
                  <Text
                    fontWeight={"$bold"}
                    fontSize={15}
                    color={mode === "dark" ? "white" : "black"}
                  >
                    Ganti Kata Sandi Anda!
                  </Text>
                  <Text
                    fontSize={12}
                    color={mode === "dark" ? "white" : "black"}
                  >
                    Untuk keamanan akun anda, kami sarankan untuk mengganti kata
                    sandi secara berkala, minimal 4 bulan sekali.
                  </Text>
                </VStack>
                <Box>
                  <Image
                    size="xl"
                    source={require("@/assets/images/lock.png")}
                    alt="artikel"
                    borderRadius={10}
                    mt={"-10%"}
                  />
                </Box>
              </HStack>
            </VStack>
          </Box>

          <HStack mt={20} mx={20} justifyContent="space-between">
            <Text
              fontWeight={"$extrabold"}
              color={mode === "dark" ? "white" : "black"}
            >
              Artikel Terbaru
            </Text>

            <Text color={mode === "dark" ? "white" : "black"}>Lihat Semua</Text>
          </HStack>

          <HStack mb={50}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Box
                width={cardWidth}
                borderRadius={10}
                bgColor="white"
                mt={20}
                mx={10}
                my={5}
                backgroundColor={mode === "dark" ? "black" : "white"}
              >
                <VStack space="md" width="100%">
                  <Image
                    source={require("@/assets/images/artikel1.jpg")}
                    alt="artikel"
                    borderRadius={10}
                    width={cardWidth}
                  />
                  <VStack space="md" m={10}>
                    <Text
                      fontWeight={"$bold"}
                      fontSize={14}
                      color={mode === "dark" ? "white" : "black"}
                    >
                      Tesla Launching AI Robot
                    </Text>
                    <Text
                      fontSize={12}
                      color={mode === "dark" ? "white" : "black"}
                    >
                      Untuk keamanan akun anda, kami sarankan untuk mengganti
                      kata sandi secara berkala, minimal 4 bulan sekali.
                    </Text>
                  </VStack>
                </VStack>
              </Box>

              <Box
                width={cardWidth}
                borderRadius={10}
                bgColor="white"
                mt={20}
                mx={10}
                my={5}
                backgroundColor={mode === "dark" ? "black" : "white"}
              >
                <VStack space="md" width="100%">
                  <Image
                    source={require("@/assets/images/artikel1.jpg")}
                    alt="artikel"
                    borderRadius={10}
                    width={cardWidth}
                  />
                  <VStack space="md" m={10}>
                    <Text
                      fontWeight={"$bold"}
                      fontSize={14}
                      color={mode === "dark" ? "white" : "black"}
                    >
                      Tesla Launching AI Robot
                    </Text>
                    <Text
                      fontSize={12}
                      color={mode === "dark" ? "white" : "black"}
                    >
                      Untuk keamanan akun anda, kami sarankan untuk mengganti
                      kata sandi secara berkala, minimal 4 bulan sekali.
                    </Text>
                  </VStack>
                </VStack>
              </Box>
            </ScrollView>
          </HStack>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;
