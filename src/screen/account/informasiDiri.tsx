import Header from "@/components/Header";
import {
  Entypo,
  EvilIcons,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  Center,
  SafeAreaView,
  Text,
  Image,
  Box,
  HStack,
  VStack,
  ScrollView,
} from "@gluestack-ui/themed";
import React from "react";
import { Dimensions, useColorScheme } from "react-native";

const informasiDiri = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;

  return (
    <ScrollView>
      <SafeAreaView
        backgroundColor={mode === "dark" ? "black" : "white"}
        height={screenHeight}
      >
        <Header data={"Informasi Diri"} />

        <Center mt={20}>
          <Image
            size="sm"
            borderRadius={10}
            source={{
              uri: "../../../assets/images/user.png",
            }}
          />
          <Box mt={10} p={2} backgroundColor="#22262F" borderRadius={10}>
            <HStack space="xs">
              <EvilIcons
                name="camera"
                size={25}
                color={mode === "dark" ? "white" : "black"}
              />
              <Text color={mode === "dark" ? "white" : "black"}>
                Pasang / Ganti foto
              </Text>
            </HStack>
          </Box>
        </Center>

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
              <VStack>
                <Text color={mode === "dark" ? "#F7F7F7" : "black"} size="sm">
                  Nama Lengkap
                </Text>
                <Text color={"#85888E"} size="xs">
                  Muhammad Robby
                </Text>
              </VStack>
              <Text color={mode === "dark" ? "#F7F7F7" : "black"} size="sm">
                Edit
              </Text>
            </HStack>

            <HStack m={10} justifyContent="space-between">
              <VStack>
                <Text color={mode === "dark" ? "#F7F7F7" : "black"} size="sm">
                  Email
                </Text>
                <Text color={"#85888E"} size="xs">
                  muhammad.robby@gmail.com
                </Text>
              </VStack>
              <Text color={mode === "dark" ? "#F7F7F7" : "black"} size="sm">
                Edit
              </Text>
            </HStack>

            <HStack m={10} justifyContent="space-between">
              <VStack>
                <Text color={mode === "dark" ? "#F7F7F7" : "black"} size="sm">
                  Nomor Handphone
                </Text>
                <Text color={"#85888E"} size="xs">
                  +628123456789
                </Text>
              </VStack>
              <Text color={mode === "dark" ? "#F7F7F7" : "black"} size="sm">
                Edit
              </Text>
            </HStack>

            <HStack m={10} justifyContent="space-between">
              <VStack>
                <Text color={mode === "dark" ? "#F7F7F7" : "black"} size="sm">
                  Jenis Kelamin
                </Text>
                <Text color={"#85888E"} size="xs">
                  +628123456789
                </Text>
              </VStack>
              <Text color={mode === "dark" ? "#F7F7F7" : "black"} size="sm">
                Edit
              </Text>
            </HStack>

            <HStack m={10} justifyContent="space-between">
              <VStack>
                <Text color={mode === "dark" ? "#F7F7F7" : "black"} size="sm">
                  Alamat
                </Text>
                <Text color={"#85888E"} size="xs" width={"80%"}>
                  Perum Abc Cengkareng, Jakarta Barat (123456)
                </Text>
              </VStack>
              <Text color={mode === "dark" ? "#F7F7F7" : "black"} size="sm">
                Edit
              </Text>
            </HStack>

            <HStack m={10} justifyContent="space-between">
              <VStack>
                <Text color={mode === "dark" ? "#F7F7F7" : "black"} size="sm">
                  Kontak Darurat
                </Text>
                <Text color={"#85888E"} size="xs">
                  +628123456789
                </Text>
              </VStack>
              <Text color={mode === "dark" ? "#F7F7F7" : "black"} size="sm">
                Edit
              </Text>
            </HStack>
          </VStack>
        </Box>
      </SafeAreaView>
    </ScrollView>
  );
};

export default informasiDiri;
