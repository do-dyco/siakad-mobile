import React, { useEffect, useState } from "react";
import { Dimensions, TouchableOpacity, useColorScheme } from "react-native";
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
  Avatar,
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
  Button,
  Toast,
  ToastTitle,
  ToastDescription,
  useToast,
  AccordionContent,
  AccordionItem,
  Accordion,
  AccordionTrigger,
  AccordionHeader,
  AccordionIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@gluestack-ui/themed";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import DashedDivider from "@/components/dashedDivider";
import Header from "@/components/Header";
import colors from "@/src/config/colors";
import { router, useLocalSearchParams } from "expo-router";
import apiService from "@/src/service/apiService";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const StatusTransaksi = () => {
  const mode = useColorScheme();
  const isDark = mode === "dark";
  const screenHeight = Dimensions.get("window").height;
  const [showActionsheet, setShowActionsheet] = useState(false);
  const toggleActionsheet = () => setShowActionsheet(!showActionsheet);
  const textColor = isDark ? "white" : "black";
  const bgColor = isDark ? "black" : "white";
  const { nama_bank, nama_rekening, nominal, no_invoice } =
    useLocalSearchParams();
  const [dataInvoice, setDataInvoice] = useState<any>({});
  const toast = useToast();
  const insets = useSafeAreaInsets();

  const dividerColor = isDark ? "#2A2F37" : "#E5E7EB";
  const activeAvatarBg = isDark ? "#065F46" : "#ffffff";
  const activeIconColor = isDark ? "#FFFFFF" : "#10B981";
  const inactiveAvatarBg = isDark ? "#22262F" : "#F3F4F6";
  const inactiveIconColor = isDark ? "#717680" : "#6B7280";

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID").format(value);

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

  const fetchDetail = async () => {
    try {
      const response = await apiService.myInvoiceDetail(no_invoice);
      setDataInvoice(response.data.invoice_tagihan);
    } catch (error) {
      setDataInvoice({});
      console.error("Failed to fetch detail:", error);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  return (
    <SafeAreaView flex={1}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        backgroundColor={bgColor}
        height={screenHeight}
      >
        <Header data="Status Transaksi" />

        <VStack space="md" flex={1} m={10}>
          {/* Status Box */}
          <Box
            borderRadius={10}
            borderWidth={1}
            borderColor={isDark ? colors.border : colors.gray.light[200]}
          >
            <VStack space="md" m={10}>
              {/* Status Icon */}
              <HStack justifyContent="center" space="xs" alignItems="center">
                {/* Step 1 (aktif) */}
                <Avatar bgColor={activeAvatarBg} size="sm" borderRadius="$full">
                  <MaterialCommunityIcons
                    name="check"
                    size={18}
                    color={activeIconColor}
                  />
                </Avatar>

                <Divider
                  width="25%"
                  alignSelf="center"
                  bgColor={dividerColor}
                />

                {/* Step 2 (aktif) */}
                <Avatar bgColor={activeAvatarBg} size="sm" borderRadius="$full">
                  <MaterialCommunityIcons
                    name="text-box-search-outline"
                    size={18}
                    color={activeIconColor}
                  />
                </Avatar>

                <Divider
                  width="25%"
                  alignSelf="center"
                  bgColor={dividerColor}
                />

                {/* Step 3 (belum aktif) */}
                <Avatar
                  bgColor={inactiveAvatarBg}
                  size="sm"
                  borderRadius="$full"
                >
                  <Ionicons name="send" size={18} color={inactiveIconColor} />
                </Avatar>
              </HStack>

              <DashedDivider />

              <HStack justifyContent="space-between" alignItems="center">
                <Text mx={20} color={textColor} fontFamily="Lato">
                  Sedang Mengecek
                </Text>

                {/* Badge nomor invoice — tap untuk copy */}
                <Badge
                  size="md"
                  variant="solid"
                  borderRadius={12}
                  bgColor={
                    isDark ? colors.gray.dark[800] : colors.gray.light[200]
                  }
                  width="50%"
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
                    <HStack space="xs" m={5} alignItems="center">
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

              {/* Bank Info */}
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

              {/* Jumlah Transfer */}
              <Text color={textColor} fontFamily="Lato">
                Jumlah Transfer
              </Text>
              <Box
                borderWidth={1}
                borderRadius={10}
                borderColor={isDark ? colors.border : colors.gray.light[200]}
                bgColor={
                  isDark ? colors.gray.dark[800] : colors.gray.light[200]
                }
              >
                <HStack
                  justifyContent="space-between"
                  p={10}
                  alignItems="center"
                >
                  <Text mx={20} color={textColor} fontFamily="Lato">
                    Rp.
                    {Number(
                      nominal && nominal !== "0"
                        ? nominal
                        : dataInvoice?.nominal || 0
                    ).toLocaleString("id-ID")}
                    .
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      copyToClipboard(
                        String(
                          Number(
                            nominal && nominal !== "0"
                              ? nominal
                              : dataInvoice?.nominal || 0
                          ).toLocaleString("id-ID")
                        ),
                        "Jumlah transfer"
                      )
                    }
                    activeOpacity={0.7}
                  >
                    <Text mx={20} color={textColor} fontFamily="Lato">
                      Copy
                    </Text>
                  </TouchableOpacity>
                </HStack>
              </Box>

              <DashedDivider />
              <Text fontFamily="Lato">Hari ini, 21 Okt 2024</Text>
              <Text color={textColor} size="sm" fontFamily="Lato">
                Admin sedang mengecek transaksi Anda, mohon untuk menunggu.
              </Text>
              <Text
                color={textColor}
                fontWeight="$bold"
                size="xl"
                fontFamily="Lato"
              >
                09:59
              </Text>
            </VStack>
          </Box>

          {/* Detail Transaksi */}
          <TouchableOpacity onPress={toggleActionsheet}>
            <Box
              borderRadius={10}
              bgColor={isDark ? colors.gray.dark[800] : colors.gray.light[200]}
            >
              <HStack justifyContent="space-between" m={10}>
                <HStack space="md">
                  <MaterialCommunityIcons
                    name="text-box-outline"
                    size={20}
                    color={textColor}
                  />
                  <Text color={textColor} fontFamily="Lato">
                    Detail Transaksi
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

          {/* Bantuan */}
          <Box
            borderRadius={10}
            bgColor={isDark ? colors.gray.dark[800] : colors.gray.light[200]}
          >
            <HStack justifyContent="space-between" m={10}>
              <HStack space="md">
                <MaterialCommunityIcons
                  name="help-circle-outline"
                  size={20}
                  color={textColor}
                />
                <Text color={textColor} fontFamily="Lato">
                  Butuh Bantuan ?
                </Text>
              </HStack>
              <MaterialCommunityIcons
                name="chevron-right"
                size={20}
                color={textColor}
              />
            </HStack>
          </Box>

          {/* Batalkan Transaksi */}
          <VStack mt={20}>
            <Center>
              <TouchableOpacity onPress={() => router.push("/(tabs)")}>
                <Text color={colors.primary} fontFamily="Lato">
                  Kembali ke Tagihan
                </Text>
              </TouchableOpacity>
            </Center>
          </VStack>
        </VStack>
      </ScrollView>

      {/* ActionSheet Detail Transaksi */}
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
              width="45%"
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
                  {Number(
                    nominal && nominal !== "0"
                      ? nominal
                      : dataInvoice?.nominal || 0
                  ).toLocaleString("id-ID")}
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
              {Number(
                nominal && nominal !== "0" ? nominal : dataInvoice?.nominal || 0
              ).toLocaleString("id-ID")}
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
    </SafeAreaView>
  );
};

export default StatusTransaksi;
