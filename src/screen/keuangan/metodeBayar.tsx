import AlertCustom from "@/components/Alert";
import Header from "@/components/Header";
import colors from "@/src/config/colors";
import apiService from "@/src/service/apiService";
import { useTagihanStore } from "@/src/store/tagihanStore";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Box,
  HStack,
  SafeAreaView,
  ScrollView,
  VStack,
  Text,
  Divider,
  Radio,
  RadioIndicator,
  RadioGroup,
  RadioIcon,
  CircleIcon,
  Button,
  Image,
} from "@gluestack-ui/themed";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, useColorScheme } from "react-native";

const MetodeBayar = () => {
  const screenHeight = Dimensions.get("window").height;
  const mode = useColorScheme();
  const [selected, setSelected] = useState<string | null>(null);
  const { invoice } = useLocalSearchParams();
  const { selectedTagihan } = useTagihanStore();
  const [saldoData, setSaldoData] = useState(0);
  const [dataRekening, setDataRekening] = useState([]);
  const [dataVa, setDataVa] = useState([]);
  const [dataInvoice, setDataInvoice] = useState<any>({});
  const [selectedRekening, setSelectedRekening] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const allowedCodes = ["bca", "bni", "bri", "bmi", "mandiri"];
  const vaItem = dataVa.find((item) => item.code === "va");
  const vaChannels =
    vaItem?.channels?.filter((channel) =>
      allowedCodes.includes(channel.code)
    ) || [];

  const textColor = mode === "dark" ? "white" : "black";
  const dividerColor = mode === "dark" ? "#373A41" : colors.gray.light[300];

  const totalNominal = selectedTagihan.reduce(
    (total, item) => total + parseInt(item.nominal || 0),
    0
  );

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID").format(value);

  const handleRadioClick = (value: string, rekening?: any) => {
    setSelected((prev) => (prev === value ? null : value));
    if (rekening) {
      setSelectedRekening(rekening);
    } else if (!value.startsWith("transfer-")) {
      setSelectedRekening(null);
    }
  };

  const fetchDetail = async () => {
    try {
      const response = await apiService.myInvoiceDetail(invoice);
      setDataInvoice(response.data.invoice_tagihan);
    } catch (error) {
      setDataInvoice({});
      console.error("Failed to fetch detail:", error);
    }
  };

  const handleNext = async () => {
    if (!selected) {
      alert("Silakan pilih metode pembayaran terlebih dahulu.");
      return;
    }

    if (selected === "saldo") {
      const params = {
        invoiceId: dataInvoice.id,
        metode: "SALDO",
      };

      try {
        const response = await apiService.payment(params);
        if (response.data.success) {
          router.push({
            pathname: "/bayarSaldo",
            params: {
              nominal: totalNominal,
              no_invoice: dataInvoice.no_invoice,
            },
          });
        } else {
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
        }
        return;
      } catch (error) {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        console.error("Failed to fetch saldo:", error);
        return;
      }
    }

    if (selected && selected.endsWith("-va")) {
      const selectedBank = selected.replace("-va", "");
      const vaChannel = vaChannels.find((ch) => ch.code === selectedBank);

      if (!vaChannel) {
        alert("Virtual Account tidak ditemukan.");
        return;
      }

      const paramsVa = {
        bankType: "va",
        metode: "va",
        namaBank: vaChannel.code,
        invoiceId: dataInvoice.id,
      };

      try {
        const response = await apiService.paymentVa(paramsVa);
        const vaNumber = response.data.pembayaran_tagihan;
        router.push({
          pathname: "/transferVa",
          params: {
            bank_code: vaNumber.nama_bank,
            nama_bank: vaNumber.nama_bank.toUpperCase(),
            nominal: vaNumber.nominal,
            no_invoice: dataInvoice.no_invoice,
            va_fee: vaChannel.transaction_fee?.actual_fee || 0,
            no_rekening: vaNumber.no_rekening,
          },
        });
        return;
      } catch (error) {
        setShowAlert(true);
        console.error("Failed to fetch VA:", error);
        setTimeout(() => setShowAlert(false), 3000);
        return;
      }
    }

    // transfer bank
    if (selected.startsWith("transfer-")) {
      const selectedBank = selected.replace("transfer-", "").toUpperCase();
      const rekeningDipilih = dataRekening.find(
        (rek) => rek.nama_bank.toUpperCase() === selectedBank
      );

      const paramsTransfer = {
        invoiceId: dataInvoice.id,
        metode: "TRANSFER_MANUAL",
        rekeningSekolahId: selectedRekening?.id,
      };

      if (!rekeningDipilih) {
        alert("Rekening tidak ditemukan.");
        return;
      }

      try {
        const response = await apiService.payment(paramsTransfer);
        return response.data;
      } catch (error) {
        console.error("Failed to fetch saldo:", error);
      }

      router.push({
        pathname: "/transferNow",
        params: {
          nama_bank: rekeningDipilih.nama_bank,
          no_rekening: rekeningDipilih.no_rekening,
          nama_rekening: rekeningDipilih.nama_rekening,
          nominal: totalNominal,
          no_invoice: dataInvoice.no_invoice,
        },
      });
    }
  };

  const fetchSaldo = async () => {
    try {
      const response = await apiService.mySaldo();
      setSaldoData(response.data.saldo);
    } catch (error) {
      setSaldoData(0);
      console.error("Failed to fetch saldo:", error);
    }
  };

  const fetchRekening = async () => {
    try {
      const response = await apiService.rekening();
      setDataRekening(response.data.rekening_sekolah || []);
    } catch (error) {
      setDataRekening([]);
      console.error("Failed to fetch rekening:", error);
    }
  };

  const fetchVa = async () => {
    try {
      const response = await apiService.virtualAccount();
      setDataVa(response.data.payment_methods || []);
    } catch (error) {
      setDataVa([]);
      console.error("Failed to fetch virtual account:", error);
    }
  };

  useEffect(() => {
    fetchSaldo();
    fetchRekening();
    fetchVa();
    fetchDetail();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        backgroundColor={mode === "dark" ? "black" : "white"}
        height={screenHeight}
      >
        <Header data="Pilih Metode Bayar" />

        <VStack space="md" m={10} flex={1}>
          {/* Invoice Box */}
          <Box
            mt={20}
            borderRadius={10}
            borderWidth={1}
            borderColor={
              mode === "dark" ? colors.border : colors.gray.light[200]
            }
            overflow="hidden"
          >
            <Box p={10} backgroundColor={mode === "dark" ? "black" : "white"}>
              <HStack space="md" alignItems="center">
                <Box
                  height={30}
                  width={30}
                  borderRadius={10}
                  bgColor={colors.boxWarning}
                  justifyContent="center"
                  alignItems="center"
                >
                  <MaterialCommunityIcons
                    name="text-box-outline"
                    size={20}
                    color="white"
                  />
                </Box>
                <Text color={textColor} fontFamily="Lato">
                  {dataInvoice.no_invoice || ""}
                </Text>
              </HStack>
            </Box>

            <Divider bgColor={dividerColor} />

            <Box backgroundColor={colors.gray.light[300]} p={10}>
              <HStack justifyContent="space-between">
                <Text color="#94979C" fontFamily="Lato">
                  Total Tagihan
                </Text>
                <Text color={textColor} fontFamily="Lato">
                  Rp.{" "}
                  {Number(
                    totalNominal || dataInvoice?.nominal || 0
                  ).toLocaleString("id-ID")}
                </Text>
              </HStack>
            </Box>
          </Box>

          {/* Judul */}
          <Text color={textColor} mt={20} fontFamily="Lato" fontWeight="$bold">
            Metode Pembayaran
          </Text>

          {/* Metode Saldo */}
          <Box
            borderRadius={10}
            borderWidth={1}
            borderColor={
              mode === "dark" ? colors.border : colors.gray.light[200]
            }
            mx={10}
            bgColor="transparent"
          >
            <VStack space="md" m={10} mt={20}>
              <HStack justifyContent="space-between" alignItems="center">
                <HStack space="md" alignItems="center">
                  <Entypo name="wallet" size={20} color={colors.primary} />
                  <Text color={textColor} fontFamily="Lato">
                    Saldo
                  </Text>
                </HStack>
                <RadioGroup value={selected}>
                  <Radio
                    value="saldo"
                    size="md"
                    isChecked={selected === "saldo"}
                    onPress={() => handleRadioClick("saldo")}
                  >
                    <RadioIndicator mr="$2">
                      <RadioIcon as={CircleIcon} color={colors.primary} />
                    </RadioIndicator>
                  </Radio>
                </RadioGroup>
              </HStack>
              <Divider bgColor={dividerColor} />
              <Text
                color={textColor}
                fontFamily="Lato-Bold"
                style={{ marginLeft: 30 }}
              >
                Rp. {formatRupiah(saldoData)}
              </Text>
            </VStack>
          </Box>

          {/* Metode Transfer */}
          {dataRekening.map((rek, index) => (
            <Box
              key={index}
              borderRadius={10}
              borderWidth={1}
              borderColor={
                mode === "dark" ? colors.border : colors.gray.light[200]
              }
              mx={10}
              bgColor="transparent"
            >
              <VStack space="md" m={10} mt={20}>
                <HStack justifyContent="space-between" alignItems="center">
                  <HStack space="md" alignItems="center">
                    <Image
                      size="xs"
                      source={
                        rek.nama_bank === "MANDIRI"
                          ? require("@/assets/images/bank/mandiri.png")
                          : require("@/assets/images/bank/bca.png")
                      }
                      alt={rek.nama_bank}
                      borderRadius={10}
                      mt={"-5%"}
                    />
                    <Text color={textColor} fontFamily="Lato">
                      Transfer {rek.nama_bank}
                    </Text>
                  </HStack>
                  <RadioGroup value={selected}>
                    <Radio
                      value={`transfer-${rek.nama_bank.toLowerCase()}`}
                      size="md"
                      isChecked={
                        selected === `transfer-${rek.nama_bank.toLowerCase()}`
                      }
                      onPress={() =>
                        handleRadioClick(
                          `transfer-${rek.nama_bank.toLowerCase()}`,
                          rek
                        )
                      }
                    >
                      <RadioIndicator mr="$2">
                        <RadioIcon as={CircleIcon} color={colors.primary} />
                      </RadioIndicator>
                    </Radio>
                  </RadioGroup>
                </HStack>
                <Divider bgColor={dividerColor} />
                <Text color={textColor} fontFamily="Lato" fontSize={12}>
                  Mohon masukkan nominal beserta kode unik di halaman
                  selanjutnya ketika akan Transfer.
                </Text>
              </VStack>
            </Box>
          ))}

          {/* Metode VA */}
          {vaChannels.map((channelItem, index) => (
            <Box
              key={index}
              borderRadius={10}
              borderWidth={1}
              borderColor={
                mode === "dark" ? colors.border : colors.gray.light[200]
              }
              mx={10}
              bgColor="transparent"
            >
              <VStack space="md" px={10} py={20}>
                <HStack justifyContent="space-between" alignItems="center">
                  {/* Bank logo + Bank name */}
                  <HStack alignItems="center" space="md">
                    <Image
                      size="xs"
                      source={
                        channelItem.code === "bca"
                          ? require("@/assets/images/bank/bca.png")
                          : channelItem.code === "bni"
                          ? require("@/assets/images/bank/bni.png")
                          : channelItem.code === "bri"
                          ? require("@/assets/images/bank/bri.png")
                          : channelItem.code === "bmi"
                          ? require("@/assets/images/bank/bmi.png")
                          : require("@/assets/images/bank/mandiri.png")
                      }
                      alt={channelItem.code}
                      borderRadius={10}
                    />
                    <Text color={textColor} fontFamily="Lato" fontSize={14}>
                      {channelItem.code.toUpperCase()} VA
                    </Text>
                  </HStack>

                  {/* Fee + Radio Button */}
                  <HStack alignItems="center" space="md">
                    <Text color={textColor} fontFamily="Lato" fontSize={12}>
                      +VA fee Rp.{" "}
                      {channelItem.transaction_fee?.actual_fee?.toLocaleString(
                        "id-ID"
                      ) || "0"}
                    </Text>

                    <RadioGroup value={selected}>
                      <Radio
                        value={`${channelItem.code}-va`}
                        size="md"
                        isChecked={selected === `${channelItem.code}-va`}
                        onPress={() =>
                          handleRadioClick(`${channelItem.code}-va`)
                        }
                      >
                        <RadioIndicator mr="$2">
                          <RadioIcon as={CircleIcon} color={colors.primary} />
                        </RadioIndicator>
                      </Radio>
                    </RadioGroup>
                  </HStack>
                </HStack>
              </VStack>
            </Box>
          ))}
        </VStack>

        {/* Footer */}
        <Divider />
        <HStack justifyContent="space-between" m={20} alignItems="center">
          <VStack>
            <Text fontFamily="Lato">Total Transfer</Text>
            <Text color={textColor} fontWeight="$semibold" fontFamily="Lato">
              Rp.{" "}
              {Number(totalNominal || dataInvoice?.nominal || 0).toLocaleString(
                "id-ID"
              )}
            </Text>
          </VStack>
          <Button
            bgColor={colors.primary}
            borderRadius={10}
            mt={4}
            onPress={handleNext}
          >
            <Text color="white" fontFamily="Lato">
              Selanjutnya
            </Text>
          </Button>
        </HStack>
      </ScrollView>
      {showAlert && (
        <VStack mx={20} mt={20}>
          <AlertCustom
            boxBgColor={colors.error[500]}
            iconColor="white"
            title="Pembayaran Sudah ada"
            message="Selesaikan pembayaran dengan Virtual Account sebelumnya."
          />
        </VStack>
      )}
    </SafeAreaView>
  );
};

export default MetodeBayar;
