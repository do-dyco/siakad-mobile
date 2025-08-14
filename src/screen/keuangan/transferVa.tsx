import CustomBadge from "@/components/CustomBadge";
import DashedDivider from "@/components/dashedDivider";
import Header from "@/components/Header";
import colors from "@/src/config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  SafeAreaView,
  ScrollView,
  VStack,
  Text,
  Box,
  HStack,
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
  Toast,
  ToastTitle,
  ToastDescription,
  useToast,
} from "@gluestack-ui/themed";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import apiService from "@/src/service/apiService";
import { useUserStore } from "@/src/store/userStore";

const TransferVa = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);
  const toast = useToast();
  const { nama_bank, no_rekening, nama_rekening, nominal, no_invoice } =
    useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const user = useUserStore((state) => state.user);
  const [dataInvoice, setDataInvoice] = useState<any>({});

  const handleClose = () => setShowActionsheet(false);
  const rawAmount =
    (nominal && nominal !== "0" ? nominal : dataInvoice.nominal) || "0";
  const amount = rawAmount.toString().replace(/\D/g, "").padStart(4, "0");
  const mainPart = amount.slice(0, -3);
  const lastThree = amount.slice(-3);
  const textColor = mode === "dark" ? "white" : "black";
  const bgColor = mode === "dark" ? colors.black : colors.white;

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  const fetchDetail = async () => {
    try {
      const response = await apiService.myInvoiceDetail(no_invoice);
      setDataInvoice(response.data.invoice_tagihan);
    } catch (error) {
      setDataInvoice({});
      console.error("Failed to fetch detail:", error);
    }
  };

  const handleBatalTransaksi = () => {
    setShowModal(false);

    router.push("/invoice");
  };

  // Function untuk copy ke clipboard dengan toast
  const copyToClipboard = async (text, label) => {
    try {
      await Clipboard.setStringAsync(text);
      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="success" variant="solid" mb={35}>
              <VStack space="xs">
                <ToastTitle>Berhasil</ToastTitle>
                <ToastDescription>
                  {label} telah disalin ke clipboard
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    } catch (error) {
      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="error" variant="solid">
              <VStack space="xs">
                <ToastTitle>Error</ToastTitle>
                <ToastDescription>Gagal menyalin ke clipboard</ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    }
  };

  const params = {
    invoiceId: dataInvoice.id,
    metode: "transfer",
    rekeningSekolahId: no_rekening,
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    try {
      const response = apiService.payment(params);
      router.push({
        pathname: "/statusTransaksi",
        params: {
          nominal: nominal,
          no_invoice: dataInvoice.no_invoice,
        },
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Gagal mengirim data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView flex={1} mb={35}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          backgroundColor={mode === "dark" ? "black" : "white"}
          height={screenHeight}
        >
          <Header data={"Transfer Sekarang"} />
          <VStack space="md" flex={1} m={10}>
            <Text fontFamily="Lato" color={textColor} size="lg">
              Transfer Bank
            </Text>
            <Text fontFamily="Lato" color={textColor}>
              Please Transfer to AL-FUADIYAH Bank Account
            </Text>

            <Box
              borderRadius={10}
              borderWidth={1}
              borderColor={
                mode === "dark" ? colors.border : colors.gray.light[200]
              }
            >
              <VStack space="md" m={10}>
                <HStack justifyContent="space-between">
                  <Text fontFamily="Lato" color={textColor}>
                    Transfer sebelum
                  </Text>
                  <CustomBadge variant="danger" label="05:59:59" />
                </HStack>
                <Text fontFamily="Lato" color={textColor}>
                  21 Okt 2024, 16:49
                </Text>
                <DashedDivider />

                <HStack space="md">
                  <Image
                    size="xs"
                    source={
                      nama_bank === "MANDIRI"
                        ? require("@/assets/images/bank/mandiri.png")
                        : require("@/assets/images/bank/bca.png")
                    }
                    alt="bank"
                    borderRadius={10}
                  />
                  <VStack>
                    <Text fontFamily="Lato" color={textColor}>
                      Bank {nama_bank} VA
                    </Text>
                    <Text fontFamily="Lato" color={textColor}>
                      {nama_rekening}
                    </Text>
                  </VStack>
                </HStack>

                <Box
                  borderWidth={1}
                  borderRadius={16}
                  borderColor="transparent"
                >
                  <HStack justifyContent="space-between" m={5}>
                    <Text fontFamily="Lato" mx={20} color={textColor}>
                      {no_rekening}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        copyToClipboard(no_rekening, "Nomor rekening")
                      }
                    >
                      <Text fontFamily="Lato" mx={20} color={colors.primary}>
                        Copy
                      </Text>
                    </TouchableOpacity>
                  </HStack>
                </Box>

                <Text fontFamily="Lato" color={textColor}>
                  Jumlah Transfer
                </Text>
                <Box
                  borderWidth={1}
                  borderRadius={16}
                  borderColor="transparent"
                >
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    m={5}
                  >
                    <HStack spacing={0} alignItems="center">
                      <Text fontFamily="Lato" fontSize="$md" color={textColor}>
                        Rp.{formatRupiah(Number(mainPart) || 0)}.
                      </Text>
                      <Text
                        fontFamily="Lato"
                        fontSize="$md"
                        color={textColor}
                        bg="#FDE68A"
                        px={1}
                        borderRadius={2}
                        ml={-0.5}
                      >
                        {lastThree}
                      </Text>
                    </HStack>
                    <TouchableOpacity
                      onPress={() =>
                        copyToClipboard(
                          `Rp.${formatRupiah(mainPart)}.${lastThree}`,
                          "Jumlah transfer"
                        )
                      }
                    >
                      <Text fontFamily="Lato" mx={20} color={colors.primary}>
                        Copy
                      </Text>
                    </TouchableOpacity>
                  </HStack>
                </Box>
              </VStack>
            </Box>

            <Box
              borderRadius={10}
              borderWidth={1}
              borderColor={
                mode === "dark" ? colors.gray.dark[700] : colors.gray.light[200]
              }
            ></Box>
          </VStack>
        </ScrollView>

        <Box bgColor={bgColor}>
          <VStack space="md" m={10}>
            <Center>
              <TouchableOpacity onPress={() => setShowModal(true)}>
                <Text
                  fontFamily="Lato"
                  fontWeight={"$bold"}
                  color={colors.primary}
                >
                  Batalkan Transaksi
                </Text>
              </TouchableOpacity>
            </Center>
            <Divider
              bgColor={mode === "dark" ? colors.border : colors.gray.light[200]}
            />
            <Text fontFamily="Lato" size="sm" color={textColor}>
              Setelah selesai mentransfer, silakan klik tombol di bawah ini jadi
              kami bisa mulai mengecek transfer-an Anda.
            </Text>
            <Button
              bgColor={colors.primary}
              borderRadius={10}
              mt={4}
              onPress={handleSubmit}
            >
              <Text fontFamily="Lato" color="white">
                Saya sudah selesai mentransfer
              </Text>
            </Button>
          </VStack>
        </Box>
      </SafeAreaView>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        finalFocusRef={ref}
      >
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg" color={textColor} fontFamily="Lato">
              Batalkan Transaksi?
            </Heading>
            <MaterialCommunityIcons name="close" size={25} color="#94979C" />
          </ModalHeader>
          <ModalBody>
            <Text fontFamily="Lato" color={textColor} size="xs">
              Jika Anda telah mentransfer uang, silakan hubungi admin untuk
              melakukan pengembalian uang.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={handleBatalTransaksi}
            >
              <Text fontFamily="Lato" color={textColor}>
                Ya, Batalkan
              </Text>
            </Button>
            <Button
              size="sm"
              action="positive"
              borderWidth="$0"
              onPress={() => setShowModal(false)}
              bgColor={colors.primary}
            >
              <ButtonText fontFamily="Lato">Tidak, kembali</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TransferVa;
