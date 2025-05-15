import CustomBadge from "@/components/CustomBadge";
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
  Center,
  Image,
  Divider,
  Button,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Heading,
  ModalBody,
  ModalFooter,
  ButtonText,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Dimensions, TouchableOpacity, useColorScheme } from "react-native";

const TransferNow = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const [showModal, setShowModal] = useState(false);
  const ref = useRef();

  const textColor = mode === "dark" ? colors.textDark : colors.textLight;
  const bgColor = mode === "dark" ? colors.backgroundDark : colors.backgroundLight;

  return (
    <>
      <SafeAreaView flex={1}>
        <ScrollView  contentContainerStyle={{ flexGrow: 1 }}
        backgroundColor={mode === "dark" ? "black" : "white"}
        height={screenHeight}>
          <Header data={"Transfer Sekarang"} />
          <VStack space="md" flex={1} m={10}>
            <Text fontFamily="Lato" color={textColor} size="lg">Transfer Bank</Text>
            <Text fontFamily="Lato" color={textColor}>Please Transfer to AL-FUADIYAH Bank Account</Text>

            <Box borderRadius={10} borderWidth={1} borderColor="#373A41">
              <VStack space="md" m={10}>
                <HStack justifyContent="space-between">
                  <Text fontFamily="Lato" color={textColor}>Transfer sebelum</Text>
                  <CustomBadge variant="danger2" label="05:59:59"/>
                </HStack>
                <Text fontFamily="Lato" color={textColor}>21 Okt 2024, 16:49</Text>
                <DashedDivider />

                <HStack space="md">
                  <Image
                    size="xs"
                    source={require("@/assets/images/bank/mandiri.png")}
                    alt="bank"
                    borderRadius={10}
                  />
                  <VStack>
                    <Text fontFamily="Lato" color={textColor}>Bank Mandiri</Text>
                    <Text fontFamily="Lato" color={textColor}>AL-FUADIYAH</Text>
                  </VStack>
                </HStack>

                <Box borderWidth={1} borderRadius={16} borderColor="transparent" bgColor={mode === "dark" ? colors.gray.dark[700] : colors.gray.light[200]} >
                  <HStack justifyContent="space-between" m={5}>
                    <Text fontFamily="Lato" mx={20} color={textColor}>12365487</Text>
                    <Text fontFamily="Lato" mx={20} color={textColor}>Copy</Text>
                  </HStack>
                </Box>

                <Text fontFamily="Lato" color={textColor}>Jumlah Transfer</Text>
                <Box borderWidth={1} borderRadius={16} borderColor="transparent" bgColor={mode === "dark" ? colors.gray.dark[700] : colors.gray.light[200]}>
                  <HStack justifyContent="space-between"  m={5}>
                    <Text fontFamily="Lato" mx={20} color={textColor}>Rp.100.122</Text>
                    <Text fontFamily="Lato" mx={20} color={textColor}>Copy</Text>
                  </HStack>
                </Box>

                <HStack space="md" mt={10}>
                  <Ionicons name="warning" color="yellow" size={14} style={{ marginTop: 2 }} />
                  <Text fontFamily="Lato" color={textColor} size="xs">
                    Pastikan jumlahnya benar untuk 3 angka terakhir
                  </Text>
                </HStack>
              </VStack>
            </Box>

            <Box borderRadius={10} borderWidth={1} borderColor={mode === "dark" ? colors.gray.dark[700] : colors.gray.light[200]}>
              <VStack m={10} space="md">
                <Text fontFamily="Lato" color={textColor} fontWeight={"$semibold"}>
                  Upload bukti transfer (Optional)
                </Text>
                <Text fontFamily="Lato" color={textColor} size="xs">
                  Untuk mempercepat proses pengecekan silahkan upload bukti transfer disini.
                </Text>

                <Box borderWidth={1} borderRadius={16} borderColor="transparent" bgColor={mode === "dark" ? colors.gray.dark[700] : colors.gray.light[200]}>
                  <HStack justifyContent="space-between" m={5}>
                    <HStack mx={10} alignItems="center">
                      <EvilIcons name="image" size={20} color={textColor} />
                      <Text fontFamily="Lato" mx={20} color={textColor}>
                        Upload Bukti Transfer
                      </Text>
                    </HStack>
                    <MaterialCommunityIcons name="chevron-right" size={20} color={textColor} />
                  </HStack>
                </Box>
              </VStack>
            </Box>
          </VStack>
        </ScrollView>

        <Box bgColor={bgColor}>
          <VStack space="md" m={10}>
            <Center>
              <TouchableOpacity onPress={() => setShowModal(true)}>
                <Text fontFamily="Lato" fontWeight={"$bold"} color={colors.primary}>
                  Batalkan Transaksi
                </Text>
              </TouchableOpacity>
            </Center>
            <Divider bgColor={colors.border} />
            <Text fontFamily="Lato" size="sm" color={textColor}>
              Setelah selesai mentransfer, silakan klik tombol di bawah ini jadi kami bisa mulai mengecek transfer-an Anda.
            </Text>
            <Button
              bgColor={colors.primary}
              borderRadius={10}
              mt={4}
              onPress={() => router.push("/statusTransaksi")}
            >
              <Text fontFamily="Lato" color="white">Saya sudah selesai mentransfer</Text>
            </Button>
          </VStack>
        </Box>
      </SafeAreaView>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} finalFocusRef={ref}>
        <ModalBackdrop />
        <ModalContent backgroundColor={bgColor}>
          <ModalHeader>
            <Heading size="lg" color={textColor} fontFamily="Lato">Batalkan Transaksi?</Heading>
            <MaterialCommunityIcons name="close" size={25} color="#94979C" />
          </ModalHeader>
          <ModalBody>
            <Text fontFamily="Lato" color={textColor} size="xs">
              Jika Anda telah mentransfer uang, silakan hubungi admin untuk melakukan pengembalian uang.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" size="sm" action="secondary" mr="$3" onPress={() => setShowModal(false)}>
              <Text fontFamily="Lato" color={textColor}>Ya, Batalkan</Text>
            </Button>
            <Button size="sm" action="positive" borderWidth="$0" onPress={() => setShowModal(false)} bgColor={colors.primary}>
              <ButtonText fontFamily="Lato">Tidak, kembali</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TransferNow;
