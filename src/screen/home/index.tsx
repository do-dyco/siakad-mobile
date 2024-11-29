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
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
  ActionsheetItem,
  ActionsheetItemText,
  SafeAreaView,
} from "@gluestack-ui/themed";
import { Dimensions, useColorScheme } from "react-native";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

const Home = () => {
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth * 0.5;
  const [showActionsheet, setShowActionsheet] = useState(false);
  const handleClose = () => setShowActionsheet(!showActionsheet);
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;

  return (
    <>
      <SafeAreaView
        backgroundColor={mode === "dark" ? colors.box : "white"}
        height={screenHeight}
      >
        <ScrollView>
          <VStack mt={40} mx={10} space="md">
            <Image
              style={{ width: 50, height: 50, margin: 20 }}
              source={require("@/assets/images/LOGO.png")}
              alt="logo"
              mt="5%"
            />

            <Text fontSize={14}>Good Morning,</Text>
            <Text
              fontSize={18}
              fontWeight={"$bold"}
              color={mode === "dark" ? "white" : "black"}
            >
              Muhammad Roby
            </Text>
          </VStack>

          <VStack mx={10} my={5} mt={20}>
            <Box
              borderTopLeftRadius={16}
              borderTopRightRadius={16}
              borderWidth={1}
              borderColor="transparent"
            >
              <ImageBackground
                source={require("@/assets/images/One.png")}
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
                <VStack>
                  <Text m={10} fontSize={12} color="white">
                    Total Saldo Anda
                  </Text>
                  <HStack
                    m={10}
                    justifyContent="space-between"
                    mr="10%"
                    mb={40}
                  >
                    <HStack space="md">
                      <Text fontWeight={"$bold"} color={"white"}>
                        Rp.104.589.000
                      </Text>
                      <Entypo name="eye-with-line" size={25} color={"white"} />
                    </HStack>

                    <HStack space="md">
                      <Text fontWeight={"$bold"} color="white">
                        |
                      </Text>
                      <TouchableOpacity onPress={() => router.push("/topUp")}>
                        <MaterialIcons
                          name="add-box"
                          size={25}
                          color={"white"}
                        />
                      </TouchableOpacity>
                    </HStack>
                  </HStack>
                </VStack>
              </ImageBackground>
            </Box>
            <Box
              borderRadius={10}
              borderWidth={1}
              backgroundColor="#506A7A"
              height={50}
              mt={20}
              borderColor="transparent"
            >
              <HStack justifyContent="space-between" mx={20} my={3} mt={10}>
                <Text color="#ffffff">Detail</Text>
                <AntDesign name="arrowright" size={20} color="white" />
              </HStack>
            </Box>
          </VStack>

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
                    <Text
                      fontSize={10}
                      color={mode === "dark" ? "white" : "black"}
                    >
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
                    <Text
                      fontSize={10}
                      color={mode === "dark" ? "white" : "black"}
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
                        size={25}
                        color={mode === "dark" ? "white" : "black"}
                      />
                    </Box>
                    <Text
                      fontSize={10}
                      color={mode === "dark" ? "white" : "black"}
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
                      size={25}
                      color={mode === "dark" ? "white" : "black"}
                    />
                  </Box>
                  <Text
                    fontSize={10}
                    color={mode === "dark" ? "white" : "black"}
                  >
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
                  <Text
                    fontSize={10}
                    color={mode === "dark" ? "white" : "black"}
                  >
                    Hafalan
                  </Text>
                  <Text
                    fontSize={10}
                    color={mode === "dark" ? "white" : "black"}
                  >
                    Al-Quran
                  </Text>
                </VStack>
                <VStack alignItems="center">
                  <TouchableOpacity
                    onPress={() => router.push("/jadwalPelajaran")}
                  >
                    <Box
                      backgroundColor={mode === "dark" ? colors.box : "#F5F5F5"}
                      p={3}
                      borderRadius={8}
                    >
                      <MaterialCommunityIcons
                        name="calendar-blank-outline"
                        size={25}
                        color={mode === "dark" ? "white" : "black"}
                      />
                    </Box>
                    <Text
                      fontSize={10}
                      color={mode === "dark" ? "white" : "black"}
                    >
                      Jadwal
                    </Text>
                    <Text
                      fontSize={10}
                      color={mode === "dark" ? "white" : "black"}
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
                        size={25}
                        color={mode === "dark" ? "white" : "black"}
                      />
                    </Box>
                  </TouchableOpacity>
                  <Text
                    fontSize={10}
                    color={mode === "dark" ? "white" : "black"}
                  >
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
                  <Text
                    fontSize={10}
                    color={mode === "dark" ? "white" : "black"}
                  >
                    Lihat Semua
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </Box>

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

          <Actionsheet
            isOpen={showActionsheet}
            onClose={handleClose}
            zIndex={999}
          >
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
                        <Text
                          mx={20}
                          color={mode === "dark" ? "white" : "black"}
                        >
                          Tagihan
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleClose}>
                        <Text
                          mx={20}
                          color={mode === "dark" ? "white" : "black"}
                        >
                          Pembayaran Tagihan
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          handleClose();
                          router.push("/invoice");
                        }}
                      >
                        <Text
                          mx={20}
                          color={mode === "dark" ? "white" : "black"}
                        >
                          Invoice
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleClose}>
                        <Text
                          mx={20}
                          color={mode === "dark" ? "white" : "black"}
                        >
                          Pembayaran Mesin
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          router.push("/saldo");
                          handleClose();
                        }}
                      >
                        <Text
                          mx={20}
                          color={mode === "dark" ? "white" : "black"}
                        >
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
                        <Text
                          mx={20}
                          color={mode === "dark" ? "white" : "black"}
                        >
                          Jadwal Pelajaran
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          router.push("/rangking");
                          handleClose();
                        }}
                      >
                        <Text
                          mx={20}
                          color={mode === "dark" ? "white" : "black"}
                        >
                          Rangking
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handleClose}>
                        <Text
                          mx={20}
                          color={mode === "dark" ? "white" : "black"}
                        >
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
                        <Text
                          mx={10}
                          color={mode === "dark" ? "white" : "black"}
                        >
                          Pengasuhan
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          router.push("/absensi");
                          handleClose();
                        }}
                      >
                        <Text
                          mx={20}
                          color={mode === "dark" ? "white" : "black"}
                        >
                          Absensi Biasa
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          router.push("/absensiHp");
                          handleClose();
                        }}
                      >
                        <Text
                          mx={20}
                          color={mode === "dark" ? "white" : "black"}
                        >
                          Absensi HP
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          router.push("/pelanggaran");
                          handleClose();
                        }}
                      >
                        <Text
                          mx={20}
                          color={mode === "dark" ? "white" : "black"}
                        >
                          Pelanggaran
                        </Text>
                      </TouchableOpacity>
                    </VStack>
                  </Box>
                </ScrollView>
              </ActionsheetContent>
            </ScrollView>
          </Actionsheet>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;
