import DashedDivider from "@/components/dashedDivider";
import Header from "@/components/Header";
import colors from "@/src/config/colors";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import {
  Box,
  SafeAreaView,
  ScrollView,
  VStack,
  Text,
  ImageBackground,
  Center,
  Divider,
  HStack,
  Badge,
  BadgeText,
} from "@gluestack-ui/themed";
import React from "react";
import { Dimensions, useColorScheme } from "react-native";

const BayarInvoice = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView
      backgroundColor={mode === "dark" ? "black" : "white"}
      height={screenHeight}
    >
      <ScrollView>
        <Header data={"Detail Invoice"} />

        <VStack m={20} mt={20} space={"md"}>
          <Box borderRadius={10} borderWidth={1} borderColor="#373A41">
            <Box borderTopRightRadius={10} borderTopLeftRadius={10}>
              <ImageBackground
                source={require("@/assets/images/paymentSuccess.png")}
                style={{
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  width: "auto",
                }}
                imageStyle={{
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                }}
              >
                <Text color="white" fontWeight={"$semibold"} m={15}>
                  Transaksi ID#TF25592952
                </Text>
              </ImageBackground>

              <VStack space="md" mt={10} mx={10}>
                <Center>
                  <Text color={mode === "dark" ? "white" : "black"}>
                    Transaksi Berhasil
                  </Text>

                  <Text size="sm">21 Okt 2024 10:37</Text>

                  <Text
                    color={mode === "dark" ? "white" : "black"}
                    size="2xl"
                    fontWeight={"$semibold"}
                  >
                    Rp100.000
                  </Text>
                </Center>
                <DashedDivider />

                <HStack justifyContent="space-between">
                  <Text color={mode === "dark" ? "white" : "black"}>
                    Pengirim
                  </Text>
                  <Text color={mode === "dark" ? "white" : "black"}>
                    Muhammad Roby
                  </Text>
                </HStack>

                <HStack justifyContent="space-between">
                  <Text color={mode === "dark" ? "white" : "black"}>
                    Transfer melalui
                  </Text>
                  <Text color={mode === "dark" ? "white" : "black"}>
                    Bank Mandiri
                  </Text>
                </HStack>

                <HStack justifyContent="space-between">
                  <Text color={mode === "dark" ? "white" : "black"}>
                    Penerima
                  </Text>
                  <Text color={mode === "dark" ? "white" : "black"}>
                    AL - FUADIYAH
                  </Text>
                </HStack>

                <HStack justifyContent="space-between" mx={20} mb={20}>
                  <HStack>
                    <Feather
                      name="download"
                      size={20}
                      color={mode === "dark" ? "white" : "black"}
                    />
                    <Text color={colors.primary}> Unduh</Text>
                  </HStack>
                  <Text> | </Text>
                  <HStack>
                    <Octicons
                      name="share-android"
                      size={20}
                      color={mode === "dark" ? "white" : "black"}
                    />
                    <Text color={colors.primary}> Bagikan</Text>
                  </HStack>
                </HStack>
              </VStack>
            </Box>
          </Box>

          <Box
            borderRadius={10}
            borderWidth={1}
            borderColor="transparent"
            bgColor="#13161B"
          >
            <HStack justifyContent="space-between" m={10}>
              <HStack>
                <MaterialCommunityIcons
                  name="text-box-outline"
                  size={20}
                  color={mode === "dark" ? "white" : "black"}
                />
                <Text color={mode === "dark" ? "white" : "black"}>
                  Detail Transaksi
                </Text>
              </HStack>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color={mode === "dark" ? "white" : "black"}
              />
            </HStack>
          </Box>

          <Box
            borderRadius={10}
            borderWidth={1}
            borderColor="transparent"
            bgColor="#13161B"
          >
            <HStack justifyContent="space-between" m={10}>
              <HStack>
                <MaterialCommunityIcons
                  name="help-circle-outline"
                  size={20}
                  color={mode === "dark" ? "white" : "black"}
                />
                <Text color={mode === "dark" ? "white" : "black"}>
                  Butuh Bantuan ?
                </Text>
              </HStack>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color={mode === "dark" ? "white" : "black"}
              />
            </HStack>
          </Box>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BayarInvoice;
