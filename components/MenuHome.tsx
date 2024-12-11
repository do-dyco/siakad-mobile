import colors from "@/src/config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Box,
  HStack,
  VStack,
  Text,
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
  ActionsheetItem,
  ActionsheetItemText,
  ScrollView,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";

const MenuHome = () => {
  const mode = useColorScheme();
  const [showActionsheet, setShowActionsheet] = useState(false);
  const handleClose = () => setShowActionsheet(!showActionsheet);

  return (
    <>
      <Box
        bgColor={mode === "dark" ? "black" : "white"}
        borderRadius={10}
        mx={10}
        my={5}
        p={5}
        mt={20}
      >
        <VStack space="xl">
          <HStack justifyContent="space-between" m={20}>
            <VStack alignItems="center">
              <TouchableOpacity onPress={() => router.push("/absensi")}>
                <Box
                  backgroundColor={mode === "dark" ? colors.box : "#F5F5F5"}
                  p={3}
                  borderRadius={8}
                >
                  <MaterialCommunityIcons
                    name="clipboard-check-outline"
                    size={25}
                    color={mode === "dark" ? "white" : "black"}
                  />
                </Box>
                <Text fontSize={10} color={mode === "dark" ? "white" : "black"}>
                  Absensi
                </Text>
              </TouchableOpacity>
            </VStack>
            <VStack alignItems="center">
              <Box
                backgroundColor={mode === "dark" ? colors.box : "#F5F5F5"}
                p={3}
                borderRadius={8}
              >
                <MaterialCommunityIcons
                  name="sack-percent"
                  size={25}
                  color={mode === "dark" ? "white" : "black"}
                />
              </Box>
              <TouchableOpacity onPress={() => router.push("/tagihan")}>
                <Text fontSize={10} color={mode === "dark" ? "white" : "black"}>
                  Tagihan
                </Text>
              </TouchableOpacity>
            </VStack>
            <VStack alignItems="center">
              <TouchableOpacity onPress={() => router.push("/invoice")}>
                <Box
                  backgroundColor={mode === "dark" ? colors.box : "#F5F5F5"}
                  p={3}
                  borderRadius={8}
                >
                  <MaterialCommunityIcons
                    name="script-text-outline"
                    size={25}
                    color={mode === "dark" ? "white" : "black"}
                  />
                </Box>
                <Text fontSize={10} color={mode === "dark" ? "white" : "black"}>
                  Invoice
                </Text>
              </TouchableOpacity>
            </VStack>
            <VStack alignItems="center">
              <Box
                backgroundColor={mode === "dark" ? colors.box : "#F5F5F5"}
                p={3}
                borderRadius={8}
              >
                <MaterialCommunityIcons
                  name="credit-card-outline"
                  size={25}
                  color={mode === "dark" ? "white" : "black"}
                />
              </Box>
              <Text fontSize={10} color={mode === "dark" ? "white" : "black"}>
                Pengeluaran
              </Text>
            </VStack>
          </HStack>

          <HStack justifyContent="space-between" m={20}>
            <VStack alignItems="center">
              <Box
                backgroundColor={mode === "dark" ? colors.box : "#F5F5F5"}
                p={3}
                borderRadius={8}
              >
                <MaterialCommunityIcons
                  name="clipboard-check-outline"
                  size={25}
                  color={mode === "dark" ? "white" : "black"}
                />
              </Box>
              <Text fontSize={10} color={mode === "dark" ? "white" : "black"}>
                Hafalan
              </Text>
              <Text fontSize={10} color={mode === "dark" ? "white" : "black"}>
                Al-Quran
              </Text>
            </VStack>
            <VStack alignItems="center">
              <TouchableOpacity onPress={() => router.push("/jadwalPelajaran")}>
                <Box
                  backgroundColor={mode === "dark" ? colors.box : "#F5F5F5"}
                  p={3}
                  borderRadius={8}
                  w={35}
                  justifyContent="center"
                  alignItems="center"
                >
                  <MaterialCommunityIcons
                    name="calendar-blank-outline"
                    size={25}
                    color={mode === "dark" ? "white" : "black"}
                  />
                </Box>
                <Text fontSize={10} color={mode === "dark" ? "white" : "black"}>
                  Jadwal
                </Text>
                <Text fontSize={10} color={mode === "dark" ? "white" : "black"}>
                  Pelajaran
                </Text>
              </TouchableOpacity>
            </VStack>
            <VStack alignItems="center">
              <TouchableOpacity onPress={() => router.push("/rangking")}>
                <Box
                  backgroundColor={mode === "dark" ? colors.box : "#F5F5F5"}
                  p={3}
                  borderRadius={8}
                >
                  <MaterialCommunityIcons
                    name="transfer-up"
                    size={25}
                    color={mode === "dark" ? "white" : "black"}
                  />
                </Box>
              </TouchableOpacity>
              <Text fontSize={10} color={mode === "dark" ? "white" : "black"}>
                Rangking
              </Text>
            </VStack>
            <VStack alignItems="center">
              <TouchableOpacity onPress={handleClose}>
                <Box
                  backgroundColor={mode === "dark" ? colors.box : "#F5F5F5"}
                  p={3}
                  borderRadius={8}
                >
                  <MaterialCommunityIcons
                    name="dock-window"
                    size={25}
                    color={mode === "dark" ? "white" : "black"}
                  />
                </Box>
              </TouchableOpacity>
              <Text fontSize={10} color={mode === "dark" ? "white" : "black"}>
                Lihat Semua
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </Box>
      <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
        <ActionsheetBackdrop />
        <ScrollView>
          <ActionsheetContent
            maxHeight={"98%"}
            zIndex={999}
            backgroundColor={mode === "dark" ? "black" : "white"}
          >
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>

            <ScrollView width={"95%"}>
              <Box alignItems="flex-start" width={"95%"} borderRadius={10}>
                <Text color={mode === "dark" ? "white" : "black"} size="lg">
                  All Menu
                </Text>
              </Box>
              <Box
                alignItems="flex-start"
                width={"95%"}
                backgroundColor={mode === "dark" ? colors.box : "white"}
                borderRadius={10}
                mt={20}
              >
                <VStack m={5} space="lg">
                  <Text
                    mx={10}
                    size="md"
                    color={mode === "dark" ? "white" : "black"}
                  >
                    Keuangan
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      router.push("/tagihan");
                      handleClose();
                    }}
                  >
                    <Text mx={20} color={mode === "dark" ? "white" : "black"}>
                      Tagihan
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleClose}>
                    <Text mx={20} color={mode === "dark" ? "white" : "black"}>
                      Pembayaran Tagihan
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleClose();
                      router.push("/invoice");
                    }}
                  >
                    <Text mx={20} color={mode === "dark" ? "white" : "black"}>
                      Invoice
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleClose}>
                    <Text mx={20} color={mode === "dark" ? "white" : "black"}>
                      Pembayaran Mesin
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      router.push("/saldo");
                      handleClose();
                    }}
                  >
                    <Text mx={20} color={mode === "dark" ? "white" : "black"}>
                      Saldo
                    </Text>
                  </TouchableOpacity>
                </VStack>
              </Box>

              <Box
                alignItems="flex-start"
                width={"95%"}
                backgroundColor={mode === "dark" ? colors.box : "white"}
                borderRadius={10}
                mt={20}
              >
                <VStack m={5} space="lg">
                  <Text mx={10} color={mode === "dark" ? "white" : "black"}>
                    Akademik
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      router.push("/jadwalPelajaran");
                      handleClose();
                    }}
                  >
                    <Text mx={20} color={mode === "dark" ? "white" : "black"}>
                      Jadwal Pelajaran
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      router.push("/rangking");
                      handleClose();
                    }}
                  >
                    <Text mx={20} color={mode === "dark" ? "white" : "black"}>
                      Rangking
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleClose}>
                    <Text mx={20} color={mode === "dark" ? "white" : "black"}>
                      Hafalan Al-Qur'an
                    </Text>
                  </TouchableOpacity>
                </VStack>
              </Box>

              <Box
                alignItems="flex-start"
                width={"95%"}
                backgroundColor={mode === "dark" ? colors.box : "white"}
                borderRadius={10}
                mt={20}
              >
                <VStack space="lg">
                  <TouchableOpacity onPress={handleClose}>
                    <Text mx={10} color={mode === "dark" ? "white" : "black"}>
                      Pengasuhan
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      router.push("/absensi");
                      handleClose();
                    }}
                  >
                    <Text mx={20} color={mode === "dark" ? "white" : "black"}>
                      Absensi Biasa
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      router.push("/absensiHp");
                      handleClose();
                    }}
                  >
                    <Text mx={20} color={mode === "dark" ? "white" : "black"}>
                      Absensi HP
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      router.push("/pelanggaran");
                      handleClose();
                    }}
                  >
                    <Text mx={20} color={mode === "dark" ? "white" : "black"}>
                      Pelanggaran
                    </Text>
                  </TouchableOpacity>
                </VStack>
              </Box>
            </ScrollView>
          </ActionsheetContent>
        </ScrollView>
      </Actionsheet>
    </>
  );
};

export default MenuHome;
