import DashedDivider from "@/components/dashedDivider";
import Header from "@/components/Header";
import colors from "@/src/config/colors";
import apiService from "@/src/service/apiService";
import { useUserStore } from "@/src/store/userStore";
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
  Toast,
  ToastTitle,
  ToastDescription,
} from "@gluestack-ui/themed";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState, useRef } from "react";
import { Dimensions, useColorScheme } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Clipboard from "expo-clipboard";
import ShareSheet from "@/components/ShareSheet";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";

const BayarInvoice = () => {
  const mode = useColorScheme();
  const isDark = mode === "dark";
  const screenHeight = Dimensions.get("window").height;
  const textColor = isDark ? "white" : "black";
  const bgColor = isDark ? "black" : "white";
  const [loading, setLoading] = useState(false);
  const { invoice, from, activeTab } = useLocalSearchParams();
  const [dataInvoice, setDataInvoice] = useState([]);
  const { user } = useUserStore();
  const [showActionsheet, setShowActionsheet] = useState(false);
  const toggleActionsheet = () => setShowActionsheet(!showActionsheet);
  const insets = useSafeAreaInsets();
  const [showShareSheet, setShowShareSheet] = useState(false);
  const viewShotRef = useRef<any>(null);

  console.log("bayar incoice:", useLocalSearchParams());
  // console.log("user:", user);
  

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID").format(value);

  const fetchDetailInvoice = async () => {
    setLoading(true);
    try {
      const response = await apiService.myInvoiceDetail(invoice);
      setDataInvoice(response.data.invoice_tagihan);
    } catch (error) {
      console.error("Error fetching invoice details:", error);
    }
    setLoading(false);
  };

  const copyToClipboard = async (text: string, label = "Teks") => {
    try {
      await Clipboard.setStringAsync(text);
      toast.show({
        placement: "bottom",
        render: ({ id }) => (
          <Toast
            nativeID={`toast-${id}`}
            action="success"
            variant="solid"
            mt={insets.top + 8}
            alignSelf="center"
          >
            <VStack space="xs">
              <ToastTitle>Disalin</ToastTitle>
              <ToastDescription>
                {label} telah disalin ke clipboard
              </ToastDescription>
            </VStack>
          </Toast>
        ),
      });
    } catch (e) {
      toast.show({
        placement: "bottom",
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} action="error" variant="solid">
            <VStack space="xs">
              <ToastTitle>Gagal</ToastTitle>
              <ToastDescription>
                Tidak dapat menyalin ke clipboard
              </ToastDescription>
            </VStack>
          </Toast>
        ),
      });
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


  useEffect(() => {
    fetchDetailInvoice();
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: bgColor }}
      height={screenHeight}
    >
      <ScrollView>
        <Header data={"Detail Invoice"} from={from} activeTab={activeTab}/>

        <VStack m={20} mt={20} space={"md"}>
          <ViewShot ref={viewShotRef} options={{ format: "png", quality: 0.9 }} style={{backgroundColor: "white", borderRadius: 16}}>
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
                  {dataInvoice?.no_invoice || ""}
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
                    Rp. {formatRupiah(dataInvoice?.pembayaran?.nominal) || "0"}
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
                    {dataInvoice?.pembayaran?.metode || ""}
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
                      <Feather name="download" size={20} color={colors.primary} />
                      <Text color={colors.primary}> Unduh</Text>
                    </HStack>
                  </TouchableOpacity>
                  <Text color={mode === "light" ? "#E9EAEB" : "#373A41"}>
                    {" "}
                    |{" "}
                  </Text>
                    <TouchableOpacity onPress={() => setShowShareSheet(true)}>
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

      <Actionsheet
        isOpen={showActionsheet}
        onClose={toggleActionsheet}
        zIndex={999}
        trapFocus={false}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent
          h="50%"
          zIndex={999}
          backgroundColor={bgColor}
          pb={insets.bottom + 12}
        >
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          <HStack
            justifyContent="space-between"
            mt={10}
            width="100%"
            alignItems="center"
          >
            <Text
              color={textColor}
              fontWeight="$bold"
              size="lg"
              mt={2}
              fontFamily="Lato"
            >
              Detail Transaksi
            </Text>

            {/* Badge invoice di ActionSheet — tap untuk copy */}
            <Badge
              size="md"
              variant="solid"
              borderRadius={12}
              bgColor={isDark ? colors.gray.dark[800] : colors.gray.light[200]}
              width="48%"
            >
              <TouchableOpacity
                onPress={() =>
                  copyToClipboard(
                    String(dataInvoice?.no_invoice || ""),
                    "Nomor invoice"
                  )
                }
                activeOpacity={0.7}
              >
                <HStack space="xs" alignItems="center" m={5}>
                  <Text
                    color={isDark ? "white" : "black"}
                    size="xs"
                    fontFamily="Lato"
                  >
                    {dataInvoice?.no_invoice || ""}
                  </Text>
                  <Ionicons
                    name="copy-outline"
                    size={18}
                    color={isDark ? "white" : "#373A41"}
                  />
                </HStack>
              </TouchableOpacity>
            </Badge>
          </HStack>

          <Divider mt={10} bgColor={"transparent"} />

          {/* Pengirim */}
          <Box
            borderRadius={10}
            bgColor={isDark ? colors.gray.dark[800] : colors.gray.light[200]}
            m={10}
            w="100%"
          >
            <Box bgColor={mode === "dark" ? "#22262F" : "white"}>
              <HStack space="md" m={5}>
                <Box
                  backgroundColor={colors.boxWarning}
                  borderRadius={8}
                  mt={10}
                >
                  <Feather
                    name="file-text"
                    size={20}
                    color="white"
                    style={{ margin: 5 }}
                  />
                </Box>
                <Text mt={10} color={textColor} fontFamily="Lato" mt={15}>
                  {dataInvoice?.no_invoice}
                </Text>
              </HStack>
            </Box>
            <Box m={5}>
              <HStack justifyContent="space-between" m={10}>
                <Text fontFamily="Lato">Total Tagihan</Text>
                <Text color={textColor} fontFamily="Lato">
                  Rp.
                  {Number(dataInvoice?.nominal || 0).toLocaleString("id-ID")}
                </Text>
              </HStack>
            </Box>
          </Box>

          <Divider bgColor={"transparent"} mt={10} />

          <HStack justifyContent="space-between" m={10} w="100%">
            <Text color={textColor} size="xs" fontFamily="Lato">
              Bank {dataInvoice?.pembayaran?.nama_bank || ""}
            </Text>
            <Text color={textColor} size="xs" fontFamily="Lato">
              {dataInvoice?.pembayaran?.metode || ""}
            </Text>
          </HStack>

          <HStack justifyContent="space-between" m={10} w="100%">
            <Text color={textColor} size="xs" fontFamily="Lato">
              Kode Unik
            </Text>
            <Text color={textColor} size="xs" fontFamily="Lato">
              Rp.122
            </Text>
          </HStack>

          <HStack justifyContent="space-between" m={10} w="100%">
            <Text color={textColor} size="xs" fontFamily="Lato">
              Total Transfer
            </Text>
            <Text color={textColor} size="xs" fontFamily="Lato">
              Rp.
              {Number(dataInvoice?.pembayaran?.nominal || 0).toLocaleString(
                "id-ID"
              )}
            </Text>
          </HStack>

          <Accordion
            width="100%"
            size="md"
            bgColor={mode === "dark" ? colors.box : "white"}
            type="single"
            isCollapsible={true}
            isDisabled={false}
          >
            <AccordionItem
              value="a"
              backgroundColor={mode === "dark" ? "#22262F" : "white"}
            >
              <AccordionHeader>
                <AccordionTrigger>
                  {({ isExpanded }) => {
                    return (
                      <>
                        <HStack justifyContent="space-between" mx={2}>
                          <HStack space="md">
                            <Box
                              borderWidth={1}
                              borderRadius={6}
                              borderColor={colors.border}
                              justifyContent="center"
                              alignContent="center"
                              backgroundColor={colors.boxWarning}
                              height={20}
                              width={20}
                            >
                              <MaterialCommunityIcons
                                name="text-box-outline"
                                size={16}
                                color={"white"}
                              />
                            </Box>

                            <Text
                              color={mode === "dark" ? "white" : "black"}
                              fontFamily="Lato"
                              fontSize={14}
                              fontWeight={"$semibold"}
                            >
                              Tagihan{" "}
                              {dataInvoice?.tagihan_users?.[0]?.no_tagihan}
                            </Text>
                          </HStack>
                        </HStack>
                        {isExpanded ? (
                          <AccordionIcon
                            as={ChevronUpIcon}
                            ml="$3"
                            color={mode === "dark" ? "white" : "black"}
                          />
                        ) : (
                          <AccordionIcon
                            as={ChevronDownIcon}
                            ml="$3"
                            color={mode === "dark" ? "white" : "black"}
                          />
                        )}
                      </>
                    );
                  }}
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <Box
                  borderWidth={1}
                  borderRadius={8}
                  borderColor={
                    mode === "dark" ? colors.border : colors.gray.light[200]
                  }
                  backgroundColor={mode === "dark" ? "black" : "white"}
                >
                  <VStack m={10} space="md">
                    <HStack justifyContent="space-between">
                      <Text
                        color={mode === "dark" ? "white" : "black"}
                        fontFamily="Lato"
                        fontSize={14}
                      >
                        Nama Tagihan
                      </Text>
                      <Text
                        color={mode === "dark" ? "white" : "black"}
                        fontFamily="Lato"
                        fontSize={14}
                        fontWeight={"$semibold"}
                      >
                        {dataInvoice?.tagihan_users?.[0]?.master_tagihan?.nama}
                      </Text>
                    </HStack>

                    <HStack justifyContent="space-between">
                      <Text
                        color={mode === "dark" ? "white" : "black"}
                        fontFamily="Lato"
                        fontSize={14}
                      >
                        Tanggal
                      </Text>
                      <Text
                        color={mode === "dark" ? "white" : "black"}
                        fontFamily="Lato"
                        fontSize={14}
                        fontWeight={"$semibold"}
                      >
                        {new Date(
                          dataInvoice?.tagihan_users?.[0]?.updated_at?.split(
                            " "
                          )[0]
                        ).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </Text>
                    </HStack>

                    <HStack justifyContent="space-between">
                      <Text
                        color={mode === "dark" ? "white" : "black"}
                        fontFamily="Lato"
                        fontSize={14}
                      >
                        Waktu
                      </Text>
                      <Text
                        color={mode === "dark" ? "white" : "black"}
                        fontFamily="Lato"
                        fontSize={14}
                        fontWeight={"$semibold"}
                      >
                        {dataInvoice?.tagihan_users?.[0]?.updated_at
                          ?.split(" ")[1]
                          ?.slice(0, 5)}
                      </Text>
                    </HStack>

                    <HStack justifyContent="space-between">
                      <Text
                        color={mode === "dark" ? "white" : "black"}
                        fontFamily="Lato"
                        fontSize={14}
                      >
                        Nominal Tertagih
                      </Text>
                      <Text
                        color={mode === "dark" ? "white" : "black"}
                        fontFamily="Lato"
                        fontSize={14}
                        fontWeight={"$semibold"}
                      >
                        Rp.{" "}
                        {formatRupiah(
                          dataInvoice?.tagihan_users?.[0]?.nominal ?? 0
                        )}
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </ActionsheetContent>
      </Actionsheet>

      <ShareSheet
        isOpen={showShareSheet}
        onClose={() => setShowShareSheet(false)}
        bgColor={bgColor}
        textColor={textColor}
        invoice={dataInvoice?.no_invoice}
        nominal={dataInvoice?.nominal}
      />
    </SafeAreaView>
  );
};

export default BayarInvoice;
