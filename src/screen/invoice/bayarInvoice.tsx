import DashedDivider from "@/components/dashedDivider";
import Header from "@/components/Header";
import colors from "@/src/config/colors";
import apiService from "@/src/service/apiService";
import { useAuthStore } from "@/src/store/authStore";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import {
  Box,
  ScrollView,
  VStack,
  Text,
  ImageBackground,
  Center,
  Divider,
  HStack,
  Badge,
  BadgeText,
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
  AccordionContent,
  AccordionItem,
  Accordion,
  AccordionTrigger,
  AccordionHeader,
  AccordionIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState, useRef } from "react";
import { Dimensions, useColorScheme } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Clipboard from "expo-clipboard";
import ViewShot, { captureRef } from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const BayarInvoice = () => {
  const mode = useColorScheme();
  const isDark = mode === "dark";
  const screenHeight = Dimensions.get("window").height;
  const textColor = isDark ? "white" : "black";
  const bgColor = isDark ? "black" : "white";
  const [loading, setLoading] = useState(false);
  const { invoice, from, activeTab, nominal, no_invoice, metode } =
    useLocalSearchParams();
  const [dataInvoice, setDataInvoice] = useState([]);
  const { user } = useAuthStore();
  const [showActionsheet, setShowActionsheet] = useState(false);
  const toggleActionsheet = () => setShowActionsheet(!showActionsheet);
  const insets = useSafeAreaInsets();
  const viewShotRef = useRef<any>(null);
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [alertData, setAlertData] = useState({
    isOpen: false,
    type: "success" as "success" | "error",
    title: "",
    message: "",
  });

  console.log("data invoice:", dataInvoice);

  const handleOpenShareSheet = async () => {
    try {
      const uri = await viewShotRef.current.capture();

      // Check if expo-sharing is available
      if (await Sharing.isAvailableAsync()) {
        // Use expo-sharing to share the captured image directly
        const fileName = `invoice_${
          dataInvoice?.no_invoice || no_invoice || "tidak_diketahui"
        }.png`;
        const newUri = `${FileSystem.documentDirectory}${fileName}`;

        await FileSystem.copyAsync({
          from: uri,
          to: newUri,
        });

        await Sharing.shareAsync(newUri, {
          mimeType: "image/png",
          dialogTitle: "Bagikan Invoice",
          UTI: "public.png",
        });
      } else {
        // Fallback to Share API if expo-sharing is not available
        const { Share } = await import("react-native");
        const shareData = {
          title: "Bagikan Invoice",
          message: `📄 Invoice Pembayaran Anda\n\nInvoice: ${
            dataInvoice?.no_invoice || no_invoice || "-"
          }\nTotal: Rp. ${Number(
            dataInvoice?.pembayaran?.nominal || nominal || 0,
          ).toLocaleString("id-ID")}`,
          url: uri, // hasil ViewShot (file://...)
        };

        const result = await Share.share(shareData);

        if (result.action === Share.sharedAction) {
          console.log("Berhasil dibagikan");
        } else if (result.action === Share.dismissedAction) {
          console.log("Dibatalkan pengguna");
        }
      }
    } catch (e) {
      console.error("Gagal share invoice:", e);
      setAlertData({
        isOpen: true,
        type: "error",
        title: "Gagal Membagikan",
        message: "Tidak dapat membagikan invoice. Silakan coba lagi.",
      });
    }
  };

  console.log("bayar incoice:", useLocalSearchParams());
  console.log("no_invoice:", dataInvoice);
  // console.log("user:", user);

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID").format(value);

  const fetchDetailInvoice = async () => {
    setLoading(true);
    try {
      const response = await apiService.myInvoiceDetail(invoice || no_invoice);
      setDataInvoice(response.data.invoice_tagihan);
    } catch (error) {
      console.error("Error fetching invoice details:", error);
    }
    setLoading(false);
  };

  const handleCloseAlert = () => setAlertData({ ...alertData, isOpen: false });

  const copyToClipboard = async (text: string, label = "Teks") => {
    try {
      await Clipboard.setStringAsync(text);
      setAlertData({
        isOpen: true,
        type: "success",
        title: "Berhasil Disalin",
        message: `${label} telah disalin ke clipboard.`,
      });
      setTimeout(() => handleCloseAlert(), 2000); // auto close
    } catch (e) {
      setAlertData({
        isOpen: true,
        type: "error",
        title: "Gagal Menyalin",
        message: "Tidak dapat menyalin ke clipboard.",
      });
      setTimeout(() => handleCloseAlert(), 2500);
    }
  };

  const handleDownload = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      const fileUri = FileSystem.documentDirectory + "invoice.png";

      await FileSystem.copyAsync({ from: uri, to: fileUri });

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Izin penyimpanan ditolak");
        return;
      }
      await MediaLibrary.saveToLibraryAsync(fileUri);
      alert("Invoice berhasil disimpan di galeri");
    } catch (e) {
      console.error("Gagal unduh invoice:", e);
      alert("Gagal menyimpan invoice");
    }
  };

  const captureInvoice = async () => {
    try {
      const uri = await captureRef(viewShotRef, {
        format: "png",
        quality: 0.9,
        result: "tmpfile", // ✅ menghasilkan file:// URI
      });
      setImageUri(uri);
      setIsSheetOpen(true);
    } catch (e) {
      console.error("Gagal menangkap invoice:", e);
    }
  };

  useEffect(() => {
    fetchDetailInvoice();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: bgColor }}
      height={screenHeight}
    >
      <ScrollView>
        <Header data={"Detail Invoice"} from={from} activeTab={activeTab} />

        <VStack m={20} mt={20} space={"md"}>
          <ViewShot
            ref={viewShotRef}
            options={{ format: "png", quality: 0.9 }}
            style={{
              backgroundColor: isDark ? "black" : "white",
              borderRadius: 16,
            }}
          >
            <Box borderRadius={16} borderWidth={1} borderColor="#373A41">
              <Box borderTopRightRadius={10} borderTopLeftRadius={10}>
                <ImageBackground
                  source={require("@/assets/images/paymentSuccess.png")}
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
                  <Text
                    color="white"
                    fontWeight={"$semibold"}
                    m={15}
                    fontFamily="Lato"
                    fontSize={16}
                  >
                    {dataInvoice?.no_invoice || no_invoice}
                  </Text>
                </ImageBackground>

                <VStack space="md" mt={10} mx={10}>
                  <Center>
                    <Text
                      color={mode === "dark" ? "white" : "black"}
                      fontFamily="Lato"
                      fontSize={16}
                      fontWeight={"$semibold"}
                    >
                      Transaksi Berhasil
                    </Text>

                    <Text size="sm" fontFamily="Lato" fontSize={12}>
                      {dataInvoice?.created_at || ""}
                    </Text>

                    <Text
                      color={mode === "dark" ? "white" : "black"}
                      size="2xl"
                      mt={10}
                      fontWeight={"$bold"}
                      fontFamily="Lato"
                      fontSize={24}
                    >
                      Rp.{" "}
                      {formatRupiah(
                        dataInvoice?.pembayaran?.nominal || nominal,
                      ) || "0"}
                    </Text>
                  </Center>
                  <DashedDivider />

                  <HStack justifyContent="space-between">
                    <Text
                      color={mode === "dark" ? "white" : "black"}
                      fontFamily="Lato"
                      fontSize={14}
                    >
                      Pengirim
                    </Text>
                    <Text
                      color={mode === "dark" ? "white" : "black"}
                      fontFamily="Lato"
                      fontSize={14}
                      fontWeight={"$semibold"}
                    >
                      {user?.username || ""}
                    </Text>
                  </HStack>

                  <HStack justifyContent="space-between">
                    <Text
                      color={mode === "dark" ? "white" : "black"}
                      fontFamily="Lato"
                      fontSize={14}
                    >
                      Transfer melalui
                    </Text>
                    <Text
                      color={mode === "dark" ? "white" : "black"}
                      fontFamily="Lato"
                      fontSize={14}
                      fontWeight={"$semibold"}
                    >
                      {dataInvoice?.pembayaran?.metode || "Saldo"}
                    </Text>
                  </HStack>

                  <HStack justifyContent="space-between">
                    <Text
                      color={mode === "dark" ? "white" : "black"}
                      fontFamily="Lato"
                      fontSize={14}
                    >
                      Penerima
                    </Text>
                    <Text
                      color={mode === "dark" ? "white" : "black"}
                      fontFamily="Lato"
                      fontSize={16}
                      fontWeight={"$semibold"}
                    >
                      {dataInvoice?.profil_sekolah?.nama_sekolah || ""}
                    </Text>
                  </HStack>

                  <HStack
                    justifyContent="space-between"
                    mx={20}
                    mb={20}
                    space="md"
                  >
                    <TouchableOpacity onPress={handleDownload}>
                      <HStack space="md">
                        <Feather
                          name="download"
                          size={20}
                          color={colors.primary}
                        />
                        <Text color={colors.primary}> Unduh</Text>
                      </HStack>
                    </TouchableOpacity>
                    <Text color={mode === "light" ? "#E9EAEB" : "#373A41"}>
                      {" "}
                      |{" "}
                    </Text>
                    <TouchableOpacity onPress={handleOpenShareSheet}>
                      <HStack space="md">
                        <Octicons
                          name="share-android"
                          size={20}
                          color={colors.primary}
                        />
                        <Text color={colors.primary}> Bagikan</Text>
                      </HStack>
                    </TouchableOpacity>
                  </HStack>
                </VStack>
              </Box>
            </Box>
          </ViewShot>

          <TouchableOpacity onPress={toggleActionsheet}>
            <Box
              borderRadius={10}
              borderWidth={1}
              borderColor={
                mode === "dark" ? colors.border : colors.gray.light[200]
              }
              bgColor={
                mode === "dark" ? colors.gray.dark[900] : colors.gray.light[25]
              }
            >
              <HStack justifyContent="space-between" m={10}>
                <HStack>
                  <MaterialCommunityIcons
                    name="text-box-outline"
                    size={20}
                    color={mode === "dark" ? "white" : "black"}
                  />
                  <Text
                    color={mode === "dark" ? "white" : "black"}
                    fontFamily="Lato"
                    fontSize={16}
                    fontWeight={"$semibold"}
                  >
                    {" "}
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
          </TouchableOpacity>

          <Box
            borderRadius={10}
            borderWidth={1}
            borderColor={
              mode === "dark" ? colors.border : colors.gray.light[200]
            }
            bgColor={
              mode === "dark" ? colors.gray.dark[900] : colors.gray.light[25]
            }
          >
            <HStack justifyContent="space-between" m={10}>
              <HStack>
                <MaterialCommunityIcons
                  name="help-circle-outline"
                  size={20}
                  color={mode === "dark" ? "white" : "black"}
                  fontFamily="Lato"
                  fontSize={14}
                />
                <Text
                  color={mode === "dark" ? "white" : "black"}
                  fontFamily="Lato"
                  fontSize={16}
                  fontWeight={"$semibold"}
                >
                  {" "}
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
        </VStack>
      </ScrollView>

      <AlertDialog isOpen={alertData.isOpen} onClose={handleCloseAlert}>
        <AlertDialogBackdrop />
        <AlertDialogContent mt={16}>
          <AlertDialogBody mt={16}>
            <HStack justifyContent="space-between" alignItems="center">
              <HStack alignItems="center" space="md">
                <Box bgColor={"#000000"} p={2} borderRadius={"$full"}>
                  <Ionicons
                    name={alertData.type === "success" ? "checkmark" : "alert"}
                    size={18}
                    color="white"
                  />
                </Box>
                <Text fontSize={14} fontFamily="Lato-Bold" ml={8}>
                  {alertData.title}
                </Text>
              </HStack>
            </HStack>

            <Text fontSize={12} fontFamily="Lato" mt={2} ml={40} mb={16}>
              {alertData.message}
            </Text>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </SafeAreaView>
  );
};

export default BayarInvoice;
