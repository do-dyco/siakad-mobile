import {
  Input,
  InputField,
  VStack,
  Text,
  Box,
  Image,
  SafeAreaView,
  HStack,
  Divider,
  Center,
} from "@gluestack-ui/themed";
import colors from "@/src/config/colors";
import { useRouter } from "expo-router";
import { Dimensions, TouchableOpacity, useColorScheme } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import SaldoBox from "@/components/SaldoBox";
import { PieChart } from "react-native-gifted-charts";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import SkeletonList from "@/components/SkeletonList";
import { useEffect, useState } from "react";
import CustomBadge from "@/components/CustomBadge";
import apiService from "@/src/service/apiService";
import { useUserStore } from "@/src/store/userStore";

export default function Keuangan() {
  const router = useRouter();
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  const [loading, setLoading] = useState(false);
  const [saldoData, setSaldoData] = useState(0);
  const [riwayatTransaksi, setRiwayatTransaksi] = useState([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [length, setLength] = useState(10);
  const user = useUserStore((state) => state.user);

  const data = [
    { value: 45, color: "#10B981" },
    { value: 20, color: "#6172F3" },
    { value: 35, color: "#EF4444" },
  ];

  const params = {
    search: search,
    start: 1,
    length: length,
    userId: user?.id,
    startDate: startDate,
    endDate: endDate,
    status: status,
  };

  const fetchSaldo = async () => {
    try {
      const response = await apiService.mySaldo();
      setSaldoData(response.data || 0);
    } catch (error) {
      setSaldoData(0);
      console.error("Failed to fetch saldo:", error);
    }
  };

  const fetchRiwayatTransaksi = async () => {
    setLoading(true);
    try {
      const response = await apiService.riwayatTransakasi(params);
      let transactionData = [];
      let category = "Uang Masuk";

      if (
        response?.data?.pembayaran_tagihans &&
        Array.isArray(response.data.pembayaran_tagihans) &&
        response.data.pembayaran_tagihans.length > 0
      ) {
        transactionData = response.data.pembayaran_tagihans;
        category = "Uang Keluar";
      } else if (Array.isArray(response?.data)) {
        transactionData = response.data;
        category = "Uang Masuk";
      }

      const processedData = transactionData.map((trx) => ({
        ...trx,
        category,
      }));

      setRiwayatTransaksi(processedData);
    } catch (error) {
      console.error("Failed to fetch riwayat transaksi:", error);
      setRiwayatTransaksi([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchSaldo();
    }
  }, [user]);

  useEffect(() => {
    if (user?.id) {
      fetchRiwayatTransaksi();
    }
  }, [search, startDate, endDate, status, user]);

  const renderTransactionItem = (item, index) => {
    if (item.transactions && Array.isArray(item.transactions)) {
      return (
        <Box mt={20} key={index}>
          <Text size="xs" color={"#94979C"}>
            {item.date}
          </Text>
          {item.transactions.map((trx, trxIndex) => (
            <TouchableOpacity
              key={trx.id || trxIndex}
              onPress={() => router.push("/detailTransaksi")}
            >
              <Box
                borderRadius={10}
                borderWidth={1}
                borderColor={mode === "dark" ? "#373A41" : "#E0E0E0"}
                mt={10}
                height={92}
              >
                <HStack justifyContent="space-between" m={10}>
                  <HStack space="md">
                    <Box
                      borderRadius={8}
                      backgroundColor={
                        trx.category === "Uang Masuk" ? "#10B981" : "#EF4444"
                      }
                      justifyContent="center"
                      alignItems="center"
                      height={30}
                      width={30}
                    >
                      <MaterialCommunityIcons
                        name={
                          trx.category === "Uang Masuk"
                            ? "arrow-down-circle"
                            : "arrow-up-circle"
                        }
                        size={20}
                        color="white"
                      />
                    </Box>
                    <VStack space="sm">
                      <Text color={mode === "dark" ? "white" : "black"}>
                        Pembayaran Tagihan
                      </Text>
                      <Text color="#94979C">
                        {trx.created_at
                          ? new Date(trx.created_at).toLocaleTimeString(
                              "id-ID",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )
                          : "00:00"}
                      </Text>
                      <Text color="#94979C" fontSize={12}>
                        {trx.metode?.toUpperCase()} -{" "}
                        {trx.nama_bank?.toUpperCase()}
                      </Text>
                    </VStack>
                  </HStack>
                  <VStack space="sm" alignItems="flex-end">
                    <Text color={mode === "dark" ? "white" : "black"}>
                      {trx.category === "Uang Masuk"
                        ? `+ Rp. ${(trx.nominal || 0).toLocaleString("id-ID")}`
                        : `- Rp. ${(trx.nominal || 0).toLocaleString("id-ID")}`}
                    </Text>
                    <CustomBadge
                      variant={
                        trx.category === "Uang Masuk" ? "success" : "danger"
                      }
                      label={trx.category}
                    />
                  </VStack>
                </HStack>
              </Box>
            </TouchableOpacity>
          ))}
        </Box>
      );
    } else {
      const trx = item;
      const displayDate = trx.created_at
        ? new Date(trx.created_at).toLocaleDateString("id-ID")
        : new Date().toLocaleDateString("id-ID");

      return (
        <Box mt={20} key={index}>
          <Text size="xs" color={"#94979C"}>
            {displayDate}
          </Text>
          <TouchableOpacity onPress={() => router.push("/detailTransaksi")}>
            <Box
              borderRadius={10}
              borderWidth={1}
              borderColor={mode === "dark" ? "#373A41" : "#E0E0E0"}
              mt={10}
              height={92}
            >
              <HStack justifyContent="space-between" m={10}>
                <HStack space="md">
                  <Box
                    borderRadius={8}
                    backgroundColor={
                      trx.category === "Uang Masuk" ? "#10B981" : "#EF4444"
                    }
                    justifyContent="center"
                    alignItems="center"
                    height={30}
                    width={30}
                  >
                    <MaterialCommunityIcons
                      name={
                        trx.category === "Uang Masuk"
                          ? "arrow-down-circle"
                          : "arrow-up-circle"
                      }
                      size={20}
                      color="white"
                    />
                  </Box>
                  <VStack space="sm">
                    <Text color={mode === "dark" ? "white" : "black"}>
                      Pembayaran Tagihan
                    </Text>
                    <Text color="#94979C">
                      {trx.created_at
                        ? new Date(trx.created_at).toLocaleTimeString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "00:00"}
                    </Text>
                    <Text color="#94979C" fontSize={12}>
                      {trx.metode?.toUpperCase()} -{" "}
                      {trx.nama_bank?.toUpperCase()}
                    </Text>
                  </VStack>
                </HStack>
                <VStack space="sm" alignItems="flex-end">
                  <Text color={mode === "dark" ? "white" : "black"}>
                    {trx.category === "Uang Masuk"
                      ? `+ Rp. ${(trx.nominal || 0).toLocaleString("id-ID")}`
                      : `- Rp. ${(trx.nominal || 0).toLocaleString("id-ID")}`}
                  </Text>
                  <CustomBadge
                    variant={
                      trx.category === "Uang Masuk" ? "success" : "danger"
                    }
                    label={trx.category}
                  />
                </VStack>
              </HStack>
            </Box>
          </TouchableOpacity>
        </Box>
      );
    }
  };

  return (
    <SafeAreaView
      backgroundColor={mode === "dark" ? "black" : "white"}
      height={screenHeight}
      style={{ flex: 1, paddingBottom: 20 }} // ✅ padding bawah
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }} // ✅ konsisten di semua device
        showsVerticalScrollIndicator={false}
      >
        {/* Header dengan Background Melengkung */}
        <Box
          position="relative"
          width={screenWidth}
          height={screenHeight / 3}
          borderBottomLeftRadius={20}
          borderBottomRightRadius={20}
          overflow="hidden"
        >
          <Image
            alt="Background Keuangan"
            source={
              mode === "dark"
                ? require("../../assets/images/Akademik & Keuangan/BackgroundKeuangan_Dark.png")
                : require("../../assets/images/Akademik & Keuangan/BackgroundKeuangan_Light.png")
            }
            resizeMode="cover"
            style={{
              width: screenWidth,
              height: screenHeight / 3 - 30,
            }}
          />
          <Box
            position="absolute"
            top={48}
            left={0}
            right={0}
            zIndex={1}
            mt={20}
          >
            <SaldoBox data={saldoData} />
          </Box>
        </Box>

        {/* Ringkasan Keuangan */}
        <VStack space="md" mt={20} mx={10}>
          <Text
            fontSize={18}
            fontFamily="Lato-Bold"
            color={mode === "dark" ? "white" : "black"}
          >
            Ringkasan keuangan
          </Text>
          <HStack justifyContent="space-around">
            <PieChart
              data={data}
              donut
              innerCircleColor={mode === "dark" ? "black" : "white"}
              innerRadius={40}
              radius={70}
            />
            <VStack space="md">
              <HStack space="md">
                <Box
                  backgroundColor="#10B981"
                  height={20}
                  width={20}
                  borderRadius={5}
                />
                <VStack>
                  <Text
                    fontSize={14}
                    fontFamily="Lato-Bold"
                    color={mode === "dark" ? "white" : "black"}
                  >
                    Rp 10.000.500
                  </Text>
                  <Text
                    fontSize={14}
                    fontFamily="Lato"
                    color={mode === "dark" ? "white" : "black"}
                  >
                    Uang Masuk
                  </Text>
                </VStack>
              </HStack>
              <HStack space="md">
                <Box
                  backgroundColor="#6172F3"
                  height={20}
                  width={20}
                  borderRadius={5}
                />
                <VStack>
                  <Text
                    fontSize={14}
                    fontFamily="Lato-Bold"
                    color={mode === "dark" ? "white" : "black"}
                  >
                    Rp 500.000
                  </Text>
                  <Text
                    fontSize={14}
                    fontFamily="Lato"
                    color={mode === "dark" ? "white" : "black"}
                  >
                    Tarik Tunai
                  </Text>
                </VStack>
              </HStack>
              <HStack space="md">
                <Box
                  backgroundColor="#EF4444"
                  height={20}
                  width={20}
                  borderRadius={5}
                />
                <VStack>
                  <Text
                    fontSize={14}
                    fontFamily="Lato-Bold"
                    color={mode === "dark" ? "white" : "black"}
                  >
                    Rp 7.600.000
                  </Text>
                  <Text
                    fontSize={14}
                    fontFamily="Lato"
                    color={mode === "dark" ? "white" : "black"}
                  >
                    Uang Keluar
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </HStack>
        </VStack>

        {/* Input dan Filter */}
        <Divider bgColor={"transparent"} mt={10} h={10} />
        <HStack mt={15} space="md" m={5} alignItems="center">
          <Input
            variant="rounded"
            width="85%"
            borderColor="transparent"
            backgroundColor={
              mode === "dark" ? "#13161B" : colors.gray.light[50]
            }
          >
            <InputField
              placeholder="Cari transaksi disini"
              value={search}
              onChangeText={setSearch}
            />
          </Input>

          <TouchableOpacity>
            <Box
              backgroundColor="transparent"
              borderWidth={1}
              borderColor={mode === "dark" ? "#373A41" : "#E0E0E0"}
              borderRadius={100}
              p={2}
            >
              <Ionicons
                name="filter"
                size={25}
                color={mode === "dark" ? "white" : "black"}
                style={{ margin: 0 }}
              />
            </Box>
          </TouchableOpacity>
        </HStack>

        {/* Riwayat Transaksi */}
        <HStack justifyContent="space-between" m={20} mt={10}>
          <Text
            fontSize={18}
            fontFamily="Lato-Bold"
            color={mode === "dark" ? "white" : "black"}
          >
            Riwayat Transaksi
          </Text>
          <Text
            fontSize={14}
            fontFamily="Lato"
            color={mode === "dark" ? "white" : "black"}
          >
            Lihat Detail
          </Text>
        </HStack>

        <VStack space="md" mx={10}>
          {loading ? (
            <SkeletonList />
          ) : riwayatTransaksi.length === 0 ? (
            <Box justifyContent="center" mt={screenHeight / 6}>
              <Center>
                <Octicons
                  name="checklist"
                  size={30}
                  color={mode === "dark" ? "white" : "black"}
                />
                <Text
                  fontWeight={"$bold"}
                  color={mode === "dark" ? "white" : "black"}
                >
                  Belum ada data transaksi
                </Text>
                <Text size="xs" color={"#94979C"}>
                  Jika Anda sudah memiliki transaksi, transaksi tersebut akan
                </Text>
                <Text size="xs" color={"#94979C"}>
                  muncul disini.
                </Text>
              </Center>
            </Box>
          ) : (
            riwayatTransaksi.map((item, index) =>
              renderTransactionItem(item, index)
            )
          )}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
