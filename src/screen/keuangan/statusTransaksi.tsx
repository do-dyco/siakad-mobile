import DashedDivider from "@/components/dashedDivider";
import Header from "@/components/Header";
import colors from "@/src/config/colors";
import {
  EvilIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  SafeAreaView,
  ScrollView,
  VStack,
  Text,
  Box,
  HStack,
  Badge,
  BadgeText,
  Center,
  Image,
  Divider,
  Button,
  Avatar,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import React from "react";
import { Dimensions, useColorScheme } from "react-native";

const StatusTransaksi = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView flex={1}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        backgroundColor={mode === "dark" ? "black" : "white"}
        height={screenHeight}
      >
        <Header data={"Status Transaksi"} />
        <VStack space="md" flex={1} m={10}>
          <Box borderRadius={10} borderWidth={1} borderColor="#373A41">
            <VStack space="md" m={10}>
              <HStack justifyContent="center" space="xs">
                <Avatar bgColor="#065F46" size="sm" borderRadius="$full">
                  <MaterialCommunityIcons
                    name="check"
                    size={18}
                    color={colors.primary}
                  />
                </Avatar>
                <Divider width={"25%"} mt={15} bgColor="#13161B" />

                <Avatar bgColor="#065F46" size="sm" borderRadius="$full">
                  <MaterialCommunityIcons
                    name="text-box-search-outline"
                    size={18}
                    color={colors.primary}
                  />
                </Avatar>
                <Divider width={"25%"} mt={15} bgColor="#13161B" />

                <Avatar bgColor="#22262F" size="sm" borderRadius="$full">
                  <Ionicons name="send" size={18} color={"#717680"} />
                </Avatar>
              </HStack>
              <DashedDivider />

              <HStack justifyContent="space-between">
                <Text mx={20} color={mode === "dark" ? "white" : "black"}>
                  Sedang Mengecek
                </Text>
                <Badge
                  size="md"
                  variant="solid"
                  borderRadius={12}
                  bgColor="#22262F"
                  width={"30%"}
                >
                  <HStack space="xs">
                    <Text color="white" size="xs">
                      TF25592952
                    </Text>

                    <Ionicons name="copy-outline" size={20} color={"#373A41"} />
                  </HStack>
                </Badge>
              </HStack>

              <HStack space="md">
                <Image
                  size="xs"
                  source={require("@/assets/images/bank/mandiri.png")}
                  alt="artikel"
                  borderRadius={10}
                />
                <VStack>
                  <Text color={mode === "dark" ? "white" : "black"}>
                    Bank Mandiri
                  </Text>
                  <Text color={mode === "dark" ? "white" : "black"}>
                    AL-FUADIYAH
                  </Text>
                </VStack>
              </HStack>

              <Text color={mode === "dark" ? "white" : "black"}>
                Jumlah Transfer
              </Text>
              <Box
                borderWidth={1}
                borderRadius={10}
                borderColor="transparent"
                bgColor={colors.box}
              >
                <HStack justifyContent="space-between" p={10}>
                  <Text mx={20} color={mode === "dark" ? "white" : "black"}>
                    Rp.100.122
                  </Text>
                  <Text mx={20} color={mode === "dark" ? "white" : "black"}>
                    Copy
                  </Text>
                </HStack>
              </Box>

              <DashedDivider />
              <Text>Hari ini, 21 Okt 2024</Text>
              <Text color={mode === "dark" ? "white" : "black"} size="sm">
                Admin sedang mengecek transaksi Anda, mohon untuk menunggu.
              </Text>
              <Text
                color={mode === "dark" ? "white" : "black"}
                fontWeight={"$bold"}
                size="xl"
              >
                09:59
              </Text>
            </VStack>
          </Box>

          <Box
            borderRadius={10}
            borderWidth={1}
            borderColor="transparent"
            bgColor="#13161B"
          >
            <HStack justifyContent="space-between" m={10}>
              <HStack space="md">
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
              <HStack space="md">
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
          <Center>
            <Text color={colors.primary}>Batalkan Transaksi</Text>
          </Center>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StatusTransaksi;
