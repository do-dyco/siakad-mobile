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
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import React from "react";
import { Dimensions, useColorScheme } from "react-native";

const TransferNow = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView flex={1}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        backgroundColor={mode === "dark" ? "black" : "white"}
        height={screenHeight}
      >
        <Header data={"Transfer Sekarang"} />
        <VStack space="md" flex={1} m={10}>
          <Text color={mode === "dark" ? "white" : "black"} size="lg">
            Transfer Bank
          </Text>
          <Text color={mode === "dark" ? "white" : "black"}>
            Please Transfer to AL-FUADIYAH Bank Account
          </Text>

          <Box borderRadius={10} borderWidth={1} borderColor="#373A41">
            <VStack space="md" m={10}>
              <HStack justifyContent="space-between">
                <Text color={mode === "dark" ? "white" : "black"}>
                  Transfer sebelum
                </Text>

                <Badge
                  size="md"
                  variant="solid"
                  borderRadius={12}
                  action="error"
                  width={"30%"}
                >
                  <Center>
                    <BadgeText>05:59:49</BadgeText>
                  </Center>
                </Badge>
              </HStack>
              <Text>21 Okt 2024, 16:49</Text>
              <DashedDivider />

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

              <Box borderWidth={1} borderRadius={16} borderColor="transparent">
                <HStack justifyContent="space-between" bgColor={colors.box}>
                  <Text mx={20} color={mode === "dark" ? "white" : "black"}>
                    12365487
                  </Text>
                  <Text mx={20} color={mode === "dark" ? "white" : "black"}>
                    Copy
                  </Text>
                </HStack>
              </Box>
              <Text color={mode === "dark" ? "white" : "black"}>
                Jumlah Transfer
              </Text>
              <Box borderWidth={1} borderRadius={16} borderColor="transparent">
                <HStack justifyContent="space-between" bgColor={colors.box}>
                  <Text mx={20} color={mode === "dark" ? "white" : "black"}>
                    Rp.100.122
                  </Text>
                  <Text mx={20} color={mode === "dark" ? "white" : "black"}>
                    Copy
                  </Text>
                </HStack>
              </Box>

              <HStack space="md" mt={10}>
                <Ionicons
                  name="warning"
                  color="yellow"
                  size={14}
                  style={{ marginTop: 2 }}
                />
                <Text color={mode === "dark" ? "white" : "black"} size="xs">
                  Pastikan jumlahnya benar untuk 3 angka terakhir
                </Text>
              </HStack>
            </VStack>
          </Box>

          <Box borderRadius={10} borderWidth={1} borderColor="#373A41">
            <VStack m={10} space="md">
              <Text
                color={mode === "dark" ? "white" : "black"}
                fontWeight={"$semibold"}
              >
                Upload bukti transfer (Optional)
              </Text>
              <Text color={mode === "dark" ? "white" : "black"} size="xs">
                Untuk mempercepat proses pengecekan silahkan upload bukti
                transfer disini.
              </Text>

              <Box borderWidth={1} borderRadius={16} borderColor="transparent">
                <HStack justifyContent="space-between" bgColor={colors.box}>
                  <HStack mx={10}>
                    <EvilIcons
                      name="image"
                      size={20}
                      color={mode === "dark" ? "white" : "black"}
                    />
                    <Text mx={20} color={mode === "dark" ? "white" : "black"}>
                      Upload Bukti Transfer
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
          </Box>
        </VStack>
      </ScrollView>
      <Box bgColor={mode === "dark" ? "black" : "white"}>
        <VStack space="md" m={10}>
          <Center>
            <Text fontWeight={"$bold"} color={colors.primary}>
              Batalkan Transaksi
            </Text>
          </Center>
          <Divider bgColor={colors.border} />
          <Text size="sm" color={mode === "dark" ? "white" : "black"}>
            Setelah selesai mentransfer, silakan klik tombol di bawah ini jadi
            kami bisa mulai mengecek transfer-an Anda.
          </Text>
          <Button
            bgColor={colors.primary}
            borderRadius={10}
            mt={4}
            onPress={() => router.push("/statusTransaksi")}
          >
            <Text color="white">Saya sudah selesai mentransfer</Text>
          </Button>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default TransferNow;
