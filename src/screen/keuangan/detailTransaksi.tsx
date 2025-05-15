import CustomBadge from "@/components/CustomBadge";
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
  HStack,
} from "@gluestack-ui/themed";
import React from "react";
import { Dimensions, useColorScheme } from "react-native";

const DetailTransaksi = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView
      backgroundColor={mode === "dark" ? "black" : "white"}
      height={screenHeight}
    >
      <ScrollView>
        <Header data={"Detail Transaksi"} />

        <VStack m={20} mt={20} space={"md"}>
          <Box borderRadius={10} borderWidth={1} borderColor={mode === 'dark' ? colors.border : colors.gray.light[200]} mb={20}>
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
                <Text color="white" m={15} fontFamily="Lato" fontWeight={"$bold"}>
                  Transaksi ID#TF25592952
                </Text>
              </ImageBackground>

              <VStack space="md" mt={10} mx={10}>
                <Center>
                  <Text color={mode === "dark" ? "white" : "black"} fontFamily="Lato" fontWeight={"$bold"} fontSize={16} mt={10}>
                    Transaksi Berhasil
                  </Text>

                  <Text color={mode === "dark" ? "white" : "black"} fontFamily="Lato" fontSize={12} mt={10}>21 Okt 2024 10:37</Text>

                  <Text
                    color={mode === "dark" ? "white" : "black"}
                    fontSize={24}
                    fontWeight={"$bold"}
                    fontFamily="Lato"
                    mt={10}
                  >
                    Rp100.000
                  </Text>
                </Center>
                <DashedDivider />

                <Text
                  color={mode === "dark" ? "white" : "black"}
                  fontWeight={"$bold"}
                  fontFamily="Lato" 
                  fontSize={16}
                >
                  Rincian Transaksi
                </Text>

                <HStack justifyContent="space-between">
                  <Text color={mode === "dark" ? "white" : "black"} 
                  fontFamily="Lato" 
                  fontSize={14}>
                    ID Transaksi
                  </Text>
                  <Text color={mode === "dark" ? "white" : "black"}
                  fontFamily="Lato" 
                  fontSize={14}>
                    TF25592952
                  </Text>
                </HStack>

                <HStack justifyContent="space-between">
                  <Text color={mode === "dark" ? "white" : "black"}
                  fontFamily="Lato" 
                  fontSize={14}>
                    Status
                  </Text>
                  
                  <CustomBadge variant="success" label="Dana Masuk" />
                  
                </HStack>

                <HStack justifyContent="space-between">
                  <Text color={mode === "dark" ? "white" : "black"} 
                  fontFamily="Lato" 
                  fontSize={14}>
                    Tipe Transaksi
                  </Text>
                  <HStack space="md">
                    <Box
                      borderRadius={8}
                      backgroundColor={colors.primary}
                    >
                      <Ionicons
                        name="wallet"
                        size={12}
                        color="white"
                        style={{ margin: 8 }}
                      />
                    </Box>
                    <Text color={mode === "dark" ? "white" : "black"}
                    fontFamily="Lato" 
                    fontSize={14} mt={4}>
                      Top Up
                    </Text>
                  </HStack>
                </HStack>
                <DashedDivider />

                <HStack justifyContent="space-between">
                  <Text color={mode === "dark" ? "white" : "black"}
                  fontFamily="Lato" 
                  fontSize={14}>
                    Pengirim
                  </Text>
                  <Text color={mode === "dark" ? "white" : "black"}
                  fontFamily="Lato" 
                  fontSize={14}>
                    Muhammad Roby
                  </Text>
                </HStack>

                <HStack justifyContent="space-between">
                  <Text color={mode === "dark" ? "white" : "black"}
                  fontFamily="Lato" 
                  fontSize={14}>
                    Transfer melalui
                  </Text>
                  <Text color={mode === "dark" ? "white" : "black"}
                  fontFamily="Lato" 
                  fontSize={14}>
                    Bank Mandiri
                  </Text>
                </HStack>

                <HStack justifyContent="space-between">
                  <Text color={mode === "dark" ? "white" : "black"}
                  fontFamily="Lato" 
                  fontSize={14}>
                    Penerima
                  </Text>
                  <Text color={mode === "dark" ? "white" : "black"}
                  fontFamily="Lato" 
                  fontSize={14}>
                    AL - FUADIYAH
                  </Text>
                </HStack>

                <HStack justifyContent="space-between" mx={20} mb={20} mt={20}>
                  <HStack space="md">
                    <Feather
                      name="download"
                      size={20}
                      color={colors.primary}
                    />
                    <Text color={colors.primary}
                    fontFamily="Lato" 
                    fontSize={16}> Unduh</Text>
                  </HStack>
                  <Text> | </Text>
                  <HStack space="md">
                    <Octicons
                      name="share-android"
                      size={20}
                      color={colors.primary}
                    />
                    <Text color={colors.primary} fontFamily="Lato" fontSize={16}> Bagikan</Text>
                  </HStack>
                </HStack>
              </VStack>
            </Box>
          </Box>

          <Box
            borderRadius={10}
            borderWidth={1}
            borderColor="transparent"
            bgColor={mode === "dark" ?  colors.gray.dark[900] : colors.gray.light[100]}
          >
            <HStack justifyContent="space-between" m={10}>
              <HStack>
                <MaterialCommunityIcons
                  name="text-box-outline"
                  size={20}
                  color={mode === "dark" ? "white" : "black"}
                />
                <Text color={mode === "dark" ? "white" : "black"} fontFamily="Lato" fontSize={16} fontWeight={"$semibold"}>
                  {" "}Detail Transaksi
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
            bgColor={mode === "dark" ?  colors.gray.dark[900] : colors.gray.light[100]}
          >
            <HStack justifyContent="space-between" m={10}>
              <HStack>
                <MaterialCommunityIcons
                  name="help-circle-outline"
                  size={20}
                  color={mode === "dark" ? "white" : "black"} fontFamily="Lato" 
                  fontSize={14}
                />
                <Text color={mode === "dark" ? "white" : "black"}fontFamily="Lato" fontSize={16} fontWeight={"$semibold"}>
                  {" "}Butuh Bantuan ?
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

export default DetailTransaksi;
