import colors from "@/src/config/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
      {/* Menu Grid */}
      <Box
        bgColor={mode === "dark" ? "black" : "white"}
        borderRadius={10}
        mx={10}
        my={5}
        p={5}
        mt={20}
      >
        <VStack space="xl">
          {/* Baris Atas */}
          <HStack flexWrap="wrap" justifyContent="flex-start" m={20}>
            {/* Absensi */}
            <VStack alignItems="center" width="25%">
              <TouchableOpacity onPress={() => router.push("/absensi")}>
                <Box
                  backgroundColor={mode === "dark" ? colors.box : "#F5F5F5"}
                  p={3}
                  borderRadius={8}
                  alignItems="center"
                >
                  <MaterialCommunityIcons
                    name="clipboard-check-outline"
                    size={20}
                    color={mode === "dark" ? "white" : "black"}
                    style={{ padding: 8 }}
                  />
                </Box>
                <Text
                  mt={8}
                  fontFamily="Lato-Bold"
                  fontSize={12}
                  textAlign="center"
                  color={mode === "dark" ? "white" : "black"}
                >
                  Absensi
                </Text>
              </TouchableOpacity>
            </VStack>

            {/* Tagihan */}
            <VStack alignItems="center" width="25%">
              <TouchableOpacity onPress={() => router.push("/tagihan")}>
                <Box
                  backgroundColor={mode === "dark" ? colors.box : "#F5F5F5"}
                  p={3}
                  borderRadius={8}
                  alignItems="center"
                >
                  <MaterialCommunityIcons
                    name="sack-percent"
                    size={20}
                    color={mode === "dark" ? "white" : "black"}
                    style={{ padding: 8 }}
                  />
                </Box>
                <Text
                  mt={8}
                  fontFamily="Lato-Bold"
                  fontSize={12}
                  textAlign="center"
                  color={mode === "dark" ? "white" : "black"}
                  flexWrap="wrap" // ✅ biar turun ke baris baru
                  numberOfLines={2} // ✅ maksimal 2 baris
                  ellipsizeMode="tail"
                >
                  Tagihan
                </Text>
              </TouchableOpacity>
            </VStack>

            {/* Invoice */}
            <VStack alignItems="center" width="25%">
              <TouchableOpacity onPress={() => router.push("/invoice")}>
                <Box
                  backgroundColor={mode === "dark" ? colors.box : "#F5F5F5"}
                  p={3}
                  borderRadius={8}
                  alignItems="center"
                >
                  <MaterialCommunityIcons
                    name="script-text-outline"
                    size={20}
                    color={mode === "dark" ? "white" : "black"}
                    style={{ padding: 8 }}
                  />
                </Box>
                <Text
                  mt={8}
                  fontFamily="Lato-Bold"
                  fontSize={12}
                  textAlign="center"
                  color={mode === "dark" ? "white" : "black"}
                >
                  Invoice
                </Text>
              </TouchableOpacity>
            </VStack>

            {/* Hafalan */}
            <VStack
              alignItems="center"
              flexBasis="25%"
              flexGrow={1}
              px={6}
              mb={12}
            >
              <TouchableOpacity onPress={() => router.push("/hafalan")}>
                <Box
                  backgroundColor={mode === "dark" ? colors.box : "#F5F5F5"}
                  p={3}
                  borderRadius={8}
                  alignItems="center"
                >
                  <MaterialCommunityIcons
                    name="clipboard-check-outline"
                    size={20}
                    color={mode === "dark" ? "white" : "black"}
                    style={{ padding: 8 }}
                  />
                </Box>
                <Text
                  mt={8}
                  fontFamily="Lato-Bold"
                  fontSize={12}
                  textAlign="center"
                  color={mode === "dark" ? "white" : "black"}
                  flexShrink={1}
                  flexWrap="wrap"
                >
                  Hafalan Al-Quran
                </Text>
              </TouchableOpacity>
            </VStack>
          </HStack>

          {/* Baris Bawah */}
          <HStack flexWrap="wrap" justifyContent="flex-start" m={20} mt={-10}>
            {/* Jadwal */}
            <VStack
              alignItems="center"
              flexBasis="25%"
              flexGrow={1}
              px={6}
              mb={12}
            >
              <TouchableOpacity onPress={() => router.push("/jadwalPelajaran")}>
                <Box
                  backgroundColor={mode === "dark" ? colors.box : "#F5F5F5"}
                  p={3}
                  borderRadius={8}
                  alignItems="center"
                >
                  <MaterialCommunityIcons
                    name="clipboard-check-outline"
                    size={20}
                    color={mode === "dark" ? "white" : "black"}
                    style={{ padding: 8 }}
                  />
                </Box>
                <Text
                  mt={8}
                  fontFamily="Lato-Bold"
                  fontSize={12}
                  textAlign="center"
                  color={mode === "dark" ? "white" : "black"}
                  flexShrink={1}
                  flexWrap="wrap"
                >
                  Jadwal Pelajaran
                </Text>
              </TouchableOpacity>
            </VStack>

            {/* Rangking */}
            <VStack
              alignItems="center"
              flexBasis="25%"
              flexGrow={1}
              px={6}
              mb={12}
            >
              <TouchableOpacity onPress={() => router.push("/rangking")}>
                <Box
                  backgroundColor={mode === "dark" ? colors.box : "#F5F5F5"}
                  p={3}
                  borderRadius={8}
                  alignItems="center"
                >
                  <MaterialCommunityIcons
                    name="clipboard-check-outline"
                    size={20}
                    color={mode === "dark" ? "white" : "black"}
                    style={{ padding: 8 }}
                  />
                </Box>
                <Text
                  mt={8}
                  fontFamily="Lato-Bold"
                  fontSize={12}
                  textAlign="center"
                  color={mode === "dark" ? "white" : "black"}
                  flexShrink={1}
                  flexWrap="wrap"
                >
                  Rangking
                </Text>
              </TouchableOpacity>
            </VStack>

            {/* Lihat Semua */}
            <VStack alignItems="center" width="25%">
              <TouchableOpacity onPress={handleClose}>
                <Box
                  backgroundColor={mode === "dark" ? colors.box : "#F5F5F5"}
                  p={3}
                  borderRadius={8}
                  alignItems="center"
                >
                  <MaterialCommunityIcons
                    name="dock-window"
                    size={20}
                    color={mode === "dark" ? "white" : "black"}
                    style={{ padding: 8 }}
                  />
                </Box>
                <Text
                  mt={8}
                  fontFamily="Lato-Bold"
                  fontSize={12}
                  textAlign="center"
                  color={mode === "dark" ? "white" : "black"}
                >
                  Lihat Semua
                </Text>
              </TouchableOpacity>
            </VStack>

            {/* Placeholder kosong */}
            <VStack alignItems="center" width="25%" />
          </HStack>
        </VStack>
      </Box>

      {/* Actionsheet - hanya sekali */}
      <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent
          flex={1}
          maxHeight={"70%"}
          backgroundColor={mode === "dark" ? "black" : "white"}
        >
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          <ScrollView
            style={{ width: "100%" }}
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            {/* Judul */}
            <Box alignItems="center" width={"95%"} borderRadius={10}>
              <Text
                color={mode === "dark" ? "white" : "black"}
                fontWeight={"bold"}
                fontSize={20}
                textAlign="left"
                width={"100%"}
              >
                All Menu
              </Text>
            </Box>

            {/* === KEUANGAN === */}
            <Box
              alignItems="flex-start"
              width={"95%"}
              backgroundColor={mode === "dark" ? colors.box : "white"}
              borderRadius={10}
              mt={20}
            >
              <VStack m={5} space="xl" width={"100%"}>
                <Text
                  color={mode === "dark" ? "white" : "black"}
                  fontWeight={"bold"}
                  fontSize={20}
                  textAlign="left"
                  width={"100%"}
                >
                  Keuangan
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    router.push("/tagihan");
                    handleClose();
                  }}
                >
                  <HStack mx={20} alignItems="center">
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
                    <Text
                      mx={20}
                      color={mode === "dark" ? "white" : "black"}
                      style={{ fontSize: 16 }}
                    >
                      Tagihan
                    </Text>
                  </HStack>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    handleClose();
                    router.push("/invoice");
                  }}
                >
                  <HStack mx={20} alignItems="center">
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
                    <Text
                      mx={20}
                      color={mode === "dark" ? "white" : "black"}
                      style={{ fontSize: 16 }}
                    >
                      Invoice
                    </Text>
                  </HStack>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleClose}>
                  <HStack mx={20} alignItems="center">
                    <Box
                      backgroundColor={mode === "dark" ? colors.box : "#F5F5F5"}
                      p={3}
                      borderRadius={8}
                    >
                      <MaterialCommunityIcons
                        name="hand-coin-outline"
                        size={25}
                        color={mode === "dark" ? "white" : "black"}
                      />
                    </Box>
                    <Text
                      mx={20}
                      color={mode === "dark" ? "white" : "black"}
                      style={{ fontSize: 16 }}
                    >
                      Pembayaran Mesin
                    </Text>
                  </HStack>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    router.push("/saldo");
                    handleClose();
                  }}
                >
                  <HStack mx={20} alignItems="center">
                    <Box
                      backgroundColor={mode === "dark" ? colors.box : "#F5F5F5"}
                      p={3}
                      borderRadius={8}
                    >
                      <Ionicons
                        name="wallet-outline"
                        size={25}
                        color={mode === "dark" ? "white" : "black"}
                      />
                    </Box>
                    <Text
                      mx={20}
                      color={mode === "dark" ? "white" : "black"}
                      style={{ fontSize: 16 }}
                    >
                      Saldo
                    </Text>
                  </HStack>
                </TouchableOpacity>
              </VStack>
            </Box>

            {/* === AKADEMIK === */}
            <Box
              alignItems="flex-start"
              width={"95%"}
              backgroundColor={mode === "dark" ? colors.box : "white"}
              borderRadius={10}
              mt={20}
            >
              <VStack m={5} space="lg" width={"100%"}>
                <Text
                  color={mode === "dark" ? "white" : "black"}
                  fontWeight={"bold"}
                  fontSize={20}
                  textAlign="left"
                  width={"100%"}
                >
                  Akademik
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    router.push("/jadwalPelajaran");
                    handleClose();
                  }}
                >
                  <HStack mx={20} alignItems="center">
                    <Box
                      backgroundColor={mode === "dark" ? colors.box : "#F5F5F5"}
                      p={3}
                      borderRadius={8}
                    >
                      <MaterialCommunityIcons
                        name="calendar-check-outline"
                        size={25}
                        color={mode === "dark" ? "white" : "black"}
                      />
                    </Box>
                    <Text
                      mx={20}
                      color={mode === "dark" ? "white" : "black"}
                      style={{ fontSize: 16 }}
                    >
                      Jadwal Pelajaran
                    </Text>
                  </HStack>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    router.push("/rangking");
                    handleClose();
                  }}
                >
                  <HStack mx={20} alignItems="center">
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
                    <Text
                      mx={20}
                      color={mode === "dark" ? "white" : "black"}
                      style={{ fontSize: 16 }}
                    >
                      Rangking
                    </Text>
                  </HStack>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleClose}>
                  <HStack mx={20} alignItems="center">
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
                    <Text
                      mx={20}
                      color={mode === "dark" ? "white" : "black"}
                      style={{ fontSize: 16 }}
                    >
                      Hafalan Al-Qur'an
                    </Text>
                  </HStack>
                </TouchableOpacity>
              </VStack>
            </Box>

            {/* === PENGASUHAN === */}
            <Box
              alignItems="flex-start"
              width={"95%"}
              backgroundColor={mode === "dark" ? colors.box : "white"}
              borderRadius={10}
              mt={20}
            >
              <VStack space="lg" m={5} width={"100%"}>
                <Text
                  color={mode === "dark" ? "white" : "black"}
                  fontSize={20}
                  fontWeight={"bold"}
                  textAlign="left"
                  width={"100%"}
                >
                  Pengasuhan
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    router.push("/absensi");
                    handleClose();
                  }}
                >
                  <HStack mx={20} alignItems="center">
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
                    <Text
                      mx={20}
                      color={mode === "dark" ? "white" : "black"}
                      style={{ fontSize: 16 }}
                    >
                      Absensi Biasa
                    </Text>
                  </HStack>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    router.push("/absensiHp");
                    handleClose();
                  }}
                >
                  <HStack mx={20} alignItems="center">
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
                    <Text
                      mx={20}
                      color={mode === "dark" ? "white" : "black"}
                      style={{ fontSize: 16 }}
                    >
                      Absensi HP
                    </Text>
                  </HStack>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    router.push("/pelanggaran");
                    handleClose();
                  }}
                >
                  <HStack mx={20} alignItems="center">
                    <Box
                      backgroundColor={mode === "dark" ? colors.box : "#F5F5F5"}
                      p={3}
                      borderRadius={8}
                    >
                      <Ionicons
                        name="warning-outline"
                        size={25}
                        color={mode === "dark" ? "white" : "black"}
                      />
                    </Box>
                    <Text
                      mx={20}
                      color={mode === "dark" ? "white" : "black"}
                      style={{ fontSize: 16 }}
                    >
                      Pelanggaran
                    </Text>
                  </HStack>
                </TouchableOpacity>
              </VStack>
            </Box>
          </ScrollView>
        </ActionsheetContent>
      </Actionsheet>
    </>
  );
};

export default MenuHome;
