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
                    size={20}
                    color={mode === "dark" ? "white" : "black"}
                    style={{ padding: 8 }}
                  />
                </Box>
                <Text
                  mt={8}
                  fontFamily="Lato-Bold"
                  fontSize={12}
                  color={mode === "dark" ? "white" : "black"}
                  textAlign="center"
                >
                  Absensi
                </Text>
              </TouchableOpacity>
            </VStack>

            <VStack alignItems="center">
              <TouchableOpacity onPress={() => router.push("/tagihan")}>
                <Box
                  backgroundColor={mode === "dark" ? colors.box : "#F5F5F5"}
                  p={3}
                  borderRadius={8}
                >
                  <MaterialCommunityIcons
                    name="sack-percent"
                    size={20}
                    color={mode === "dark" ? "white" : "black"}
                    style={{ padding: 8 }}
                  />
                </Box>
                <Text
                  fontFamily="Lato-Bold"
                  fontSize={12}
                  mt={8}
                  color={mode === "dark" ? "white" : "black"}
                  textAlign="center"
                >
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
                    size={20}
                    color={mode === "dark" ? "white" : "black"}
                    style={{ padding: 8 }}
                  />
                </Box>
                <Text
                  mt={8}
                  fontFamily="Lato-Bold"
                  fontSize={12}
                  color={mode === "dark" ? "white" : "black"}
                  textAlign="center"
                >
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
                  size={20}
                  color={mode === "dark" ? "white" : "black"}
                  style={{ padding: 8 }}
                />
              </Box>
              <Text
                mt={8}
                fontFamily="Lato-Bold"
                fontSize={12}
                color={mode === "dark" ? "white" : "black"}
                textAlign="center"
              >
                Pengeluaran
              </Text>
            </VStack>
          </HStack>

          <HStack justifyContent="space-between" m={20} mt={-10}>
            <VStack alignItems="center">
              <Box
                backgroundColor={mode === "dark" ? colors.box : "#F5F5F5"}
                p={3}
                borderRadius={8}
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
                color={mode === "dark" ? "white" : "black"}
                textAlign="center"
              >
                Hafalan
              </Text>
              <Text
                fontFamily="Lato-Bold"
                fontSize={12}
                color={mode === "dark" ? "white" : "black"}
                textAlign="center"
              >
                Al-Quran
              </Text>
            </VStack>

            <VStack alignItems="center">
              <TouchableOpacity onPress={() => router.push("/jadwalPelajaran")}>
                <Box
                  backgroundColor={mode === "dark" ? colors.box : "#F5F5F5"}
                  p={3}
                  borderRadius={8}
                  justifyContent="center"
                  alignItems="center"
                >
                  <MaterialCommunityIcons
                    name="calendar-blank-outline"
                    size={20}
                    color={mode === "dark" ? "white" : "black"}
                    style={{ padding: 8 }}
                  />
                </Box>
                <Text
                  mt={8}
                  fontFamily="Lato-Bold"
                  fontSize={12}
                  color={mode === "dark" ? "white" : "black"}
                  textAlign="center"
                >
                  Jadwal
                </Text>
                <Text
                  fontFamily="Lato-Bold"
                  fontSize={12}
                  color={mode === "dark" ? "white" : "black"}
                  textAlign="center"
                >
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
                    size={20}
                    color={mode === "dark" ? "white" : "black"}
                    style={{ padding: 8 }}
                  />
                </Box>
                <Text
                  mt={8}
                  fontFamily="Lato-Bold"
                  fontSize={12}
                  color={mode === "dark" ? "white" : "black"}
                  textAlign="center"
                >
                  Rangking
                </Text>
              </TouchableOpacity>
            </VStack>

            <VStack alignItems="center">
              <TouchableOpacity onPress={handleClose}>
                <Box
                  backgroundColor={mode === "dark" ? colors.box : "#F5F5F5"}
                  ml={10}
                  p={3}
                  borderRadius={8}
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
                  color={mode === "dark" ? "white" : "black"}
                  textAlign="center"
                >
                  Lihat Semua
                </Text>
              </TouchableOpacity>
            </VStack>
          </HStack>
        </VStack>
      </Box>

      <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent
          maxHeight={"70%"}
          flex={1}
          zIndex={999}
          backgroundColor={mode === "dark" ? "black" : "white"}
        >
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          <ScrollView width={"95%"}>
            <Box alignItems="center" width={"95%"} borderRadius={10}>
              <Text
                color={mode === "dark" ? "white" : "black"}
                size="lg"
                fontWeight={"bold"}
                fontSize={20}
                textAlign="left"
                width={"100%"}
              >
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
              <VStack m={5} space="xl" width={"100%"}>
                <Text
                  size="md"
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
      <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
        <ActionsheetBackdrop />
        <ActionsheetContent
          maxHeight={"70%"}
          flex={1}
          zIndex={999}
          backgroundColor={mode === "dark" ? "black" : "white"}
        >
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          <ScrollView width={"95%"}>
            <Box alignItems="center" width={"95%"} borderRadius={10}>
              <Text
                color={mode === "dark" ? "white" : "black"}
                size="lg"
                fontWeight={"bold"}
                fontSize={20}
                textAlign="left"
                width={"100%"}
              >
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
              <VStack m={5} space="xl" width={"100%"}>
                <Text
                  size="md"
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
