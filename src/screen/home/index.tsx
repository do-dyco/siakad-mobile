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
} from "@gluestack-ui/themed";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";

const Home = () => {
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth * 0.5;
  const [showActionsheet, setShowActionsheet] = useState(false);
  const handleClose = () => setShowActionsheet(!showActionsheet);
  return (
    <>
      <ScrollView>
        <VStack mt={40} mx={10} space="md">
          <Image
            style={{ width: 50, height: 50, margin: 20 }}
            source={require("@/assets/images/LOGO.png")}
            alt="logo"
            mt="5%"
          />

          <Text fontSize={14}>Good Morning,</Text>
          <Text fontSize={18} fontWeight={"$bold"}>
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
                <HStack m={10} justifyContent="space-between" mr="10%" mb={40}>
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
                    <MaterialIcons name="add-box" size={25} color={"white"} />
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

        <Box bgColor="#FFFFFF" borderRadius={10} mx={10} my={5} p={5} mt={20}>
          <VStack space="xl">
            <HStack justifyContent="space-between" m={20}>
              <VStack alignItems="center">
                <Box backgroundColor="#F5F5F5" p={3} borderRadius={8}>
                  <MaterialCommunityIcons
                    name="clipboard-check-outline"
                    size={25}
                  />
                </Box>
                <Text fontSize={10}>Absensi</Text>
              </VStack>
              <VStack alignItems="center">
                <Box backgroundColor="#F5F5F5" p={3} borderRadius={8}>
                  <MaterialCommunityIcons name="sack-percent" size={25} />
                </Box>
                <Text fontSize={10}>Tagihan</Text>
              </VStack>
              <VStack alignItems="center">
                <Box backgroundColor="#F5F5F5" p={3} borderRadius={8}>
                  <MaterialCommunityIcons
                    name="script-text-outline"
                    size={25}
                  />
                </Box>
                <Text fontSize={10}>Invoice</Text>
              </VStack>
              <VStack alignItems="center">
                <Box backgroundColor="#F5F5F5" p={3} borderRadius={8}>
                  <MaterialCommunityIcons
                    name="credit-card-outline"
                    size={25}
                  />
                </Box>
                <Text fontSize={10}>Pengeluaran</Text>
              </VStack>
            </HStack>

            <HStack justifyContent="space-between" m={20}>
              <VStack alignItems="center">
                <Box backgroundColor="#F5F5F5" p={3} borderRadius={8}>
                  <MaterialCommunityIcons
                    name="clipboard-check-outline"
                    size={25}
                  />
                </Box>
                <Text fontSize={10}>Hafalan</Text>
                <Text fontSize={10}>Al-Quran</Text>
              </VStack>
              <VStack alignItems="center">
                <Box backgroundColor="#F5F5F5" p={3} borderRadius={8}>
                  <MaterialCommunityIcons
                    name="calendar-blank-outline"
                    size={25}
                  />
                </Box>
                <Text fontSize={10}>Jadwal</Text>
                <Text fontSize={10}>Pelajaran</Text>
              </VStack>
              <VStack alignItems="center">
                <Box backgroundColor="#F5F5F5" p={3} borderRadius={8}>
                  <MaterialCommunityIcons name="transfer-up" size={25} />
                </Box>
                <Text fontSize={10}>Rangking</Text>
              </VStack>
              <VStack alignItems="center">
                <TouchableOpacity onPress={handleClose}>
                  <Box backgroundColor="#F5F5F5" p={3} borderRadius={8}>
                    <MaterialCommunityIcons name="dock-window" size={25} />
                  </Box>
                </TouchableOpacity>
                <Text fontSize={10}>Lihat Semua</Text>
              </VStack>
            </HStack>
          </VStack>
        </Box>

        <Box borderRadius={10} bgColor="white" mt={20} mx={10} my={5}>
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
                <Text fontWeight={"$bold"} fontSize={15}>
                  Ganti Kata Sandi Anda!
                </Text>
                <Text fontSize={12}>
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
          <Text fontWeight={"$extrabold"}>Artikel Terbaru</Text>

          <Text>Lihat Semua</Text>
        </HStack>

        <HStack>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Box
              width={cardWidth}
              borderRadius={10}
              bgColor="white"
              mt={20}
              mx={10}
              my={5}
              mb={20}
            >
              <VStack space="md" width="100%">
                <Image
                  source={require("@/assets/images/artikel1.jpg")}
                  alt="artikel"
                  borderRadius={10}
                  width={cardWidth}
                />
                <VStack space="md" m={10}>
                  <Text fontWeight={"$bold"} fontSize={14}>
                    Tesla Launching AI Robot
                  </Text>
                  <Text fontSize={12}>
                    Untuk keamanan akun anda, kami sarankan untuk mengganti kata
                    sandi secara berkala, minimal 4 bulan sekali.
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
              mb={20}
            >
              <VStack space="md" width="100%">
                <Image
                  source={require("@/assets/images/artikel1.jpg")}
                  alt="artikel"
                  borderRadius={10}
                  width={cardWidth}
                />
                <VStack space="md" m={10}>
                  <Text fontWeight={"$bold"} fontSize={14}>
                    Tesla Launching AI Robots
                  </Text>
                  <Text fontSize={12}>
                    Untuk keamanan akun anda, kami sarankan untuk mengganti kata
                    sandi secara berkala, minimal 4 bulan sekali.
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
            <ActionsheetContent maxHeight={"100%"} zIndex={999}>
              <ActionsheetDragIndicatorWrapper>
                <ActionsheetDragIndicator />
              </ActionsheetDragIndicatorWrapper>

              <ActionsheetItem>
                <Text fontWeight={"$extrabold"}>All Menu</Text>
              </ActionsheetItem>
              <ActionsheetItem>
                <Text fontWeight={"$extrabold"} mx={10}>
                  Keuangan
                </Text>
              </ActionsheetItem>
              <ActionsheetItem onPress={handleClose}>
                <ActionsheetItemText mx={20}>Tagihan</ActionsheetItemText>
              </ActionsheetItem>
              <ActionsheetItem onPress={handleClose}>
                <ActionsheetItemText mx={20}>
                  Pembayaran Tagihan
                </ActionsheetItemText>
              </ActionsheetItem>
              <ActionsheetItem onPress={handleClose}>
                <ActionsheetItemText mx={20}>Invoice</ActionsheetItemText>
              </ActionsheetItem>
              <ActionsheetItem onPress={handleClose}>
                <ActionsheetItemText mx={20}>
                  Pembayaran Mesin
                </ActionsheetItemText>
              </ActionsheetItem>
              <ActionsheetItem onPress={handleClose}>
                <ActionsheetItemText mx={20}>Saldo</ActionsheetItemText>
              </ActionsheetItem>

              <ActionsheetItem>
                <Text fontWeight={"$extrabold"} mx={10}>
                  Akademik
                </Text>
              </ActionsheetItem>
              <ActionsheetItem onPress={handleClose}>
                <ActionsheetItemText mx={20}>
                  Jadwal Pelajaran
                </ActionsheetItemText>
              </ActionsheetItem>
              <ActionsheetItem onPress={handleClose}>
                <ActionsheetItemText mx={20}>Rangking</ActionsheetItemText>
              </ActionsheetItem>
              <ActionsheetItem onPress={handleClose}>
                <ActionsheetItemText mx={20}>
                  Hafalan Al-Qur'an
                </ActionsheetItemText>
              </ActionsheetItem>

              <ActionsheetItem onPress={handleClose}>
                <Text fontWeight={"$extrabold"} mx={10}>
                  Pengasuhan
                </Text>
              </ActionsheetItem>
              <ActionsheetItem onPress={handleClose}>
                <ActionsheetItemText mx={20}>Absensi Biasa</ActionsheetItemText>
              </ActionsheetItem>
              <ActionsheetItem onPress={handleClose}>
                <ActionsheetItemText mx={20}>Absensi HP</ActionsheetItemText>
              </ActionsheetItem>
              <ActionsheetItem onPress={handleClose}>
                <ActionsheetItemText mx={20}>Pelanggaran</ActionsheetItemText>
              </ActionsheetItem>
            </ActionsheetContent>
          </ScrollView>
        </Actionsheet>
      </ScrollView>
    </>
  );
};

export default Home;
