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
  Spinner,
} from "@gluestack-ui/themed";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Dimensions, useColorScheme } from "react-native";

type AnyObj = Record<string, any>;

const MetodeBayar = () => {
  const screenHeight = Dimensions.get("window").height;
  const mode = useColorScheme();
  const [selected, setSelected] = useState<string | null>(null);
  const { invoice, from, activeTab } = useLocalSearchParams<{ invoice?: string }>();
  const { selectedTagihan } = useTagihanStore();

  const [saldoData, setSaldoData] = useState<number>(0);
  const [dataRekening, setDataRekening] = useState<any[]>([]);
  const [dataVa, setDataVa] = useState<any[]>([]);
  const [dataInvoice, setDataInvoice] = useState<AnyObj>({});
  const [selectedRekening, setSelectedRekening] = useState<any>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  console.log("tag",dataVa);
  

  const allowedCodes = ["bca", "bni", "bri", "bmi", "mandiri"];
  const vaItem = useMemo(
    () => dataVa.find((item: AnyObj) => item.code === "va"),
    [dataVa]
  );
  const vaChannels: any[] = useMemo(
    () =>
      vaItem?.channels?.filter((channel: AnyObj) =>
        allowedCodes.includes((channel.code || "").toLowerCase())
      ) || [],
    [vaItem]
  );

  const textColor = mode === "dark" ? "white" : "black";
  const dividerColor = mode === "dark" ? "#373A41" : colors.gray.light[300];

  const totalNominal = (selectedTagihan || []).reduce(
    (total: number, item: AnyObj) => total + parseInt(item.nominal || 0),
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

  // --- Redirect helper: arahkan sesuai metode jika pembayaran sudah ada ---
  const resolveVaFee = (bankCode: string) => {
    const ch = vaChannels.find(
      (c) => (c.code || "").toLowerCase() === bankCode.toLowerCase()
    );
    return ch?.transaction_fee?.actual_fee ?? 0;
  };

  const redirectByPembayaran = (inv: AnyObj) => {
    const pay: AnyObj = inv?.pembayaran_tagihan || inv?.pembayaran || {};

    if (!pay || Object.keys(pay).length === 0) return;

    const metode = String(pay.metode || "").toUpperCase();
    const bankCode = String(pay.nama_bank || pay.bank_code || "").toLowerCase();
    const nominal = pay.nominal ?? inv?.nominal ?? totalNominal ?? 0;

    if (metode === "SALDO") {
      router.push({
        pathname: "/bayarSaldo",
        params: {
          nominal,
          no_invoice: inv?.no_invoice,
        },
      });
      return;
    }

    if (metode === "VA" || metode === "VIRTUAL_ACCOUNT") {
      router.push({
        pathname: "/transferVa",
        params: {
          bank_code: bankCode,
          nama_bank: bankCode.toUpperCase(),
          nominal,
          no_invoice: inv?.no_invoice,
          va_fee: resolveVaFee(bankCode),
          no_rekening: pay.no_rekening,
        },
      });
      return;
    }

    if (metode === "TRANSFER_MANUAL") {
      router.push({
        pathname: "/transferNow",
        params: {
          nama_bank: (pay.nama_bank || "").toUpperCase(),
          no_rekening: pay.no_rekening || "",
          nama_rekening: pay.nama_rekening || "",
          nominal,
          no_invoice: inv?.no_invoice,
          from: from,
          activeTab: activeTab,
        },
      });
      return;
    }
  };

  // --- API calls ---
  const fetchDetail = async () => {
    try {
      const response = await apiService.myInvoiceDetail(invoice);
      const inv = response?.data?.invoice_tagihan || {};
      setDataInvoice(inv);
      // Auto-redirect jika pembayaran sudah ada
      redirectByPembayaran(inv);
    } catch (error) {
      setDataInvoice({});
      console.error("Failed to fetch detail:", error);
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
    const init = async () => {
      setLoading(true);
      await Promise.allSettled([
        fetchSaldo(),
        fetchRekening(),
        fetchVa(),
        fetchDetail(),
      ]);
      setLoading(false);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Handle Next berdasarkan pilihan user ---
  const handleNext = async () => {
    if (!selected) {
      alert("Silakan pilih metode pembayaran terlebih dahulu.");
      return;
    }

    if (!dataInvoice?.id) {
      alert("Invoice belum siap. Coba beberapa saat lagi.");
      return;
    }

    // SALDO
    if (selected === "saldo") {
      const params = {
        invoiceId: dataInvoice.id,
        metode: "SALDO",
      };

      try {
        // const response = await apiService.payment(params);
       
          router.push({
            pathname: "/bayarSaldo",
            params: {
              nominal: totalNominal || dataInvoice?.nominal || 0,
              no_invoice: dataInvoice.no_invoice,
            },
          });
      } catch (error) {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        console.error("Failed to fetch saldo:", error);
        return;
      }
    }

    // VA
    if (selected.endsWith("-va")) {
      const selectedBank = selected.replace("-va", "");
      const vaChannel = vaChannels.find((ch) => ch.code === selectedBank);

      console.log("va channel", vaChannel);
      

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

      console.log("param va",paramsVa);
      

      try {
        const response = await apiService.paymentVa(paramsVa);
        console.log("response",response);
        
        const vaNumber = response?.data?.pembayaran_tagihan || {};

        router.push({
          pathname: "/transferVa",
          params: {
            bank_code: vaNumber.nama_bank,
            nama_bank: String(vaNumber.nama_bank || "").toUpperCase(),
            nominal:
              vaNumber.nominal ?? totalNominal ?? dataInvoice?.nominal ?? 0,
            no_invoice: dataInvoice.no_invoice,
            va_fee: vaChannel.transaction_fee?.actual_fee || 0,
            no_rekening: vaNumber.no_rekening,
          },
        });
        return response;
      } catch (error) {
        setShowAlert(true);
        console.error("Failed to fetch VA:", error);
        setTimeout(() => setShowAlert(false), 3000);
        return;
      }
    }

    // TRANSFER MANUAL
    if (selected.startsWith("transfer-")) {
      const selectedBank = selected.replace("transfer-", "").toUpperCase();
      const rekeningDipilih = dataRekening.find(
        (rek) => (rek.nama_bank || "").toUpperCase() === selectedBank
      );

      if (!rekeningDipilih) {
        alert("Rekening tidak ditemukan.");
        return;
      }

      const paramsTransfer = {
        invoiceId: dataInvoice.id,
        metode: "TRANSFER_MANUAL",
        rekeningSekolahId: selectedRekening?.id,
      };

      try {
        await apiService.payment(paramsTransfer);
      } catch (error) {
        console.error("Failed to set transfer manual:", error);
        // tetap lanjut push agar user bisa lihat detail transfer
      }

      router.push({
        pathname: "/transferNow",
        params: {
          nama_bank: rekeningDipilih.nama_bank,
          no_rekening: rekeningDipilih.no_rekening,
          nama_rekening: rekeningDipilih.nama_rekening,
          nominal: totalNominal || dataInvoice?.nominal || 0,
          no_invoice: dataInvoice.no_invoice,
        },
      });
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Header data="Pilih Metode Bayar" />
          <VStack flex={1} px={16} py={20}>
            <VStack alignItems="center" mt={10}>
              <Spinner size="large" color={colors.primary} />
              <Text
                mt={8}
                fontFamily="Lato"
                color={mode === "dark" ? "white" : "black"}
              >
                Memuat data...
              </Text>
            </VStack>
          </VStack>
          <Divider />
          <HStack justifyContent="space-between" m={20} alignItems="center">
            <VStack>
              <Box
                height={14}
                width={120}
                bgColor={colors.gray.light[300]}
                borderRadius={6}
              />
              <Box
                height={16}
                width={160}
                bgColor={colors.gray.light[300]}
                borderRadius={6}
                mt={8}
              />
            </VStack>
            <Box
              height={40}
              width={120}
              bgColor={colors.gray.light[300]}
              borderRadius={10}
            />
          </HStack>
        </ScrollView>
      </SafeAreaView>
    );
  }

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
                <RadioGroup value={selected ?? ""}>
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
          {dataRekening.map((rek: AnyObj, index: number) => (
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
                  <RadioGroup value={selected ?? ""}>
                    <Radio
                      value={`transfer-${(rek.nama_bank || "").toLowerCase()}`}
                      size="md"
                      isChecked={
                        selected ===
                        `transfer-${(rek.nama_bank || "").toLowerCase()}`
                      }
                      onPress={() =>
                        handleRadioClick(
                          `transfer-${(rek.nama_bank || "").toLowerCase()}`,
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
          {vaChannels.map((channelItem: AnyObj, index: number) => (
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
                      {String(channelItem.code || "").toUpperCase()} VA
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

                    <RadioGroup value={selected ?? ""}>
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
    </SafeAreaView>
  );
};

export default MetodeBayar;
