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
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
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

const TransferNow = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const toast = useToast();
  const { nama_bank, no_rekening, nama_rekening, nominal, no_invoice, activeTab, from } =
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

  const {} = useLocalSearchParams();
  console.log("From:", from, activeTab);

  // console.log("Data Invoice:", dataInvoice);

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

  const handleImageUpload = async (type: "camera" | "gallery" | "file") => {
    try {
      let fileUri = "";

      if (type === "camera") {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ["images"], // ✅ pakai string literal
          allowsEditing: true,
          quality: 1,
        });

        if (!result.canceled && result.assets?.length > 0) {
          fileUri = result.assets[0].uri;
        }
      } else if (type === "gallery") {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"], // ✅ pakai string literal
          allowsEditing: true,
          quality: 1,
        });

        if (!result.canceled && result.assets?.length > 0) {
          fileUri = result.assets[0].uri;
        }
      } else if (type === "file") {
        const result = await DocumentPicker.getDocumentAsync({
          type: ["image/*", "application/pdf"],
          copyToCacheDirectory: true,
        });

        // DocumentPicker sekarang pakai result.assets juga di versi baru
        if (!result.canceled && result.assets?.length > 0) {
          fileUri = result.assets[0].uri;
        }
      }

      if (fileUri) {
        const base64 = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        setUploadedImage({
          uri: fileUri,
          base64,
        });
      }
    } catch (error) {
      console.error("Gagal memilih file:", error);
    } finally {
      handleClose();
    }
  };

  // Function untuk delete gambar
  const handleDeleteImage = () => {
    setUploadedImage(null);
  };

  const handleBatalTransaksi = () => {
    setShowModal(false);

    if (from === "/tagihan") {
      router.push({
        pathname: "/tagihan",
        params: { activeTab: activeTab },
      });
      return;
    } else{

      router.push("/invoice");
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
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: mode === "dark" ? "black" : "white",
        }}
        edges={["top", "bottom"]}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, backgroundColor: mode === "dark" ? "black" : "white" }}
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
                      Bank {nama_bank}
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

                <HStack space="md" mt={10}>
                  <Ionicons
                    name="warning"
                    color="yellow"
                    size={14}
                    style={{ marginTop: 2 }}
                  />
                  <Text fontFamily="Lato" color={textColor} size="xs">
                    Pastikan jumlahnya benar untuk 3 angka terakhir
                  </Text>
                </HStack>
              </VStack>
            </Box>

            <Box
              borderRadius={10}
              borderWidth={1}
              borderColor={
                mode === "dark" ? colors.gray.dark[700] : colors.gray.light[200]
              }
            >
              <VStack m={10} space="md">
                <Text
                  fontFamily="Lato"
                  color={textColor}
                  fontWeight={"$semibold"}
                >
                  Upload bukti transfer (Optional)
                </Text>
                <Text fontFamily="Lato" color={textColor} size="xs">
                  Untuk mempercepat proses pengecekan silahkan upload bukti
                  transfer disini.
                </Text>

                {/* Conditional rendering berdasarkan apakah ada gambar yang diupload */}
                {uploadedImage ? (
                  // Tampilan ketika ada gambar yang diupload
                  <Box position="relative">
                    <Box
                      borderRadius={16}
                      overflow="hidden"
                      borderWidth={1}
                      borderColor={
                        mode === "dark"
                          ? colors.gray.dark[600]
                          : colors.gray.light[300]
                      }
                    >
                      <Image
                        source={{ uri: uploadedImage.uri }}
                        alt="Bukti Transfer"
                        width="100%"
                        height={200}
                        resizeMode="cover"
                      />
                    </Box>

                    {/* Delete button */}
                    <TouchableOpacity
                      onPress={handleDeleteImage}
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        backgroundColor: "#1F2937",
                        borderRadius: 20,
                        padding: 8,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="delete"
                        size={20}
                        color="white"
                      />
                    </TouchableOpacity>
                  </Box>
                ) : (
                  // Tampilan default untuk upload
                  <TouchableOpacity onPress={() => setShowActionsheet(true)}>
                    <Box
                      borderWidth={1}
                      borderRadius={16}
                      borderColor="transparent"
                    >
                      <HStack justifyContent="space-between" m={5}>
                        <HStack mx={10} alignItems="center">
                          <EvilIcons name="image" size={20} color={textColor} />
                          <Text fontFamily="Lato" mx={20} color={textColor}>
                            Upload Bukti Transfer
                          </Text>
                        </HStack>
                        <MaterialCommunityIcons
                          name="chevron-right"
                          size={20}
                          color={textColor}
                        />
                      </HStack>
                    </Box>
                  </TouchableOpacity>
                )}

                <Actionsheet
                  isOpen={showActionsheet}
                  onClose={handleClose}
                  zIndex={999}
                >
                  <ActionsheetBackdrop />
                  <ActionsheetContent h="$72" zIndex={999}>
                    <ActionsheetDragIndicatorWrapper>
                      <ActionsheetDragIndicator />
                    </ActionsheetDragIndicatorWrapper>

                    <ActionsheetItem
                      onPress={() => handleImageUpload("camera")}
                    >
                      <ActionsheetItemText>Ambil Foto</ActionsheetItemText>
                    </ActionsheetItem>

                    <ActionsheetItem
                      onPress={() => handleImageUpload("gallery")}
                    >
                      <ActionsheetItemText>
                        Pilih dari Galeri
                      </ActionsheetItemText>
                    </ActionsheetItem>

                    <ActionsheetItem onPress={() => handleImageUpload("file")}>
                      <ActionsheetItemText>Pilih File</ActionsheetItemText>
                    </ActionsheetItem>

                    <ActionsheetItem onPress={handleClose}>
                      <ActionsheetItemText color="$red500">
                        Batal
                      </ActionsheetItemText>
                    </ActionsheetItem>
                  </ActionsheetContent>
                </Actionsheet>
              </VStack>
            </Box>
          </VStack>
        </ScrollView>

        <Box bgColor={mode === "dark" ? "black" : "white"} position="absolute" bottom={0} width="100%" pb={20}>
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
        <ModalContent  bgColor={mode === "dark" ? "black" : "white"}>
          <ModalHeader>
            <Heading size="lg" color={textColor} fontFamily="Lato">
              Batalkan Transaksi?
            </Heading>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={{ position: "absolute", right: 15, top: 15 }}
            >
              <MaterialCommunityIcons name="close" size={25} color="#94979C" />
            </TouchableOpacity>
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

export default TransferNow;
