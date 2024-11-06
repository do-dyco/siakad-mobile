import Header from "@/components/Header";
import colors from "@/src/config/colors";
import {
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import {
  Center,
  SafeAreaView,
  Text,
  Box,
  HStack,
  VStack,
  ScrollView,
  Button,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import React from "react";
import { Dimensions, TouchableOpacity, useColorScheme } from "react-native";

const pengaturanAkun = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;

  return (
    <ScrollView>
      <SafeAreaView
        backgroundColor={mode === "dark" ? "black" : "white"}
        height={screenHeight}
      >
        <Header data={"Pengaturan akun & aplikasi"} />

        <VStack space="md">
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
                <TouchableOpacity onPress={() => router.push("/keamananAkun")}>
                  <HStack justifyContent="space-around" mx={5} space="md">
                    <MaterialCommunityIcons
                      name="lock"
                      size={20}
                      color={mode === "dark" ? "#F7F7F7" : "black"}
                    />
                    <VStack>
                      <Text
                        color={mode === "dark" ? "#F7F7F7" : "black"}
                        size="sm"
                      >
                        Keamanan akun
                      </Text>
                      <Text color={"#85888E"} size="xs">
                        Kontrol keamanan akunmu
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

              <HStack m={10} justifyContent="space-between">
                <HStack mx={5} space="md">
                  <MaterialCommunityIcons
                    name="cog-outline"
                    size={20}
                    color={mode === "dark" ? "#F7F7F7" : "black"}
                  />
                  <VStack>
                    <Text
                      color={mode === "dark" ? "#F7F7F7" : "black"}
                      size="sm"
                    >
                      Pilihan Bahasa
                    </Text>
                    <Text color={"#85888E"} size="xs">
                      Pilih mau pakai bahasa apa di aplikasi
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

              <HStack m={10} justifyContent="space-between">
                <HStack justifyContent="space-around" mx={5} space="md">
                  <MaterialCommunityIcons
                    name="picture-in-picture-bottom-right-outline"
                    size={20}
                    color={mode === "dark" ? "#F7F7F7" : "black"}
                  />
                  <VStack>
                    <Text
                      color={mode === "dark" ? "#F7F7F7" : "black"}
                      size="sm"
                    >
                      Ganti Tampilan
                    </Text>
                    <Text color={"#85888E"} size="xs">
                      Atur tampilan sesuai selera kamu, kamu
                    </Text>
                    <Text color={"#85888E"} size="xs">
                      bisa pilih light atau dark
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

              <HStack m={10} justifyContent="space-between">
                <HStack mx={5} space="md">
                  <FontAwesome5
                    name="trash-alt"
                    size={20}
                    color={mode === "dark" ? "#F7F7F7" : "black"}
                  />
                  <VStack>
                    <Text
                      color={mode === "dark" ? "#F7F7F7" : "black"}
                      size="sm"
                    >
                      Hapus Akun
                    </Text>
                    <Text color={"#85888E"} size="xs">
                      Hapus akun kamu, cek bagaimana cara
                    </Text>
                    <Text color={"#85888E"} size="xs">
                      menghapusnya disini
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

          <Center>
            <Text>Version 1.0</Text>
          </Center>

          <Button
            size="md"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            bgColor={colors.danger}
            borderRadius={10}
            mt={20}
            mx={30}
            onPress={() => router.push("/(tabs)")}
          >
            <HStack space="md">
              <SimpleLineIcons name="logout" size={20} color={"white"} />
              <Text color="#ffffff">Keluar Akun</Text>
            </HStack>
          </Button>
        </VStack>
      </SafeAreaView>
    </ScrollView>
  );
};

export default pengaturanAkun;
