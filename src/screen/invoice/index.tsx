import CustomBadge from "@/components/CustomBadge";
import DashedDivider from "@/components/dashedDivider";
import NoData from "@/components/NoData";
import colors from "@/src/config/colors";
import apiService from "@/src/service/apiService";
import { useUserStore } from "@/src/store/userStore";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  Box,
  Center,
  Divider,
  HStack,
  Input,
  InputField,
  SafeAreaView,
  ScrollView,
  Spinner, // ⟵ tambah ini
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import React, { useEffect, useState, useRef } from "react";
import {
  Dimensions,
  RefreshControl,
  TouchableOpacity,
  useColorScheme,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

const Invoice = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const user = useUserStore((state) => state.user);
  const [length, setLength] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  // Hindari memproses event scroll berulang-ulang saat sudah dekat bawah
  const reachedEndRef = useRef(false);

  const baseParams = {
    search: "",
    start: 1,
    length, // gunakan state
    startDate: "",
    endDate: "",
    orderBy: [
      {
        column: 1,
        asc: false,
      },
    ],
  };

  const handleScroll = ({
    nativeEvent,
  }: {
    nativeEvent: NativeSyntheticEvent<NativeScrollEvent>["nativeEvent"];
  }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isCloseToBottom && !isLoading && !reachedEndRef.current) {
      reachedEndRef.current = true; // lock sementara sampai fetch selesai
      setLength((prev) => prev + 10);
    }
    if (!isCloseToBottom) {
      // reset lock ketika tidak lagi di bawah
      reachedEndRef.current = false;
    }
  };

  const handleRefresh = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const newParams = {
        ...baseParams,
        length: 10, // reset pagination
      };
      const response = await apiService.myInvoice(newParams);
      setData(response.data?.invoice_tagihans || []);
      setLength(10); // kembali ke 10
    } catch (error) {
      console.error("Refresh error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      // kirim length terbaru
      const newParams = { ...baseParams, length };
      const response = await apiService.myInvoice(newParams);
      const newData = response.data?.invoice_tagihans || [];

      // Jika API mengembalikan data kumulatif (1..length), cukup replace
      // Kalau API mengembalikan hanya batch terbaru, bisa di-append.
      // Di sini aman pakai replace untuk cegah duplikasi.
      setData(newData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatRupiah = (value: number | string) => {
    const number = typeof value === "string" ? parseFloat(value) : value;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number || 0);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length]);

  return (
    <SafeAreaView>
      <ScrollView
        backgroundColor={mode === "dark" ? "black" : "white"}
        height={screenHeight}
        onScroll={handleScroll}
        scrollEventThrottle={16} // ⟵ lebih responsif
        contentContainerStyle={{ paddingBottom: 48 }} // ⟵ jarak bawah +48
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
      >
        <Box backgroundColor={mode === "dark" ? "black" : "white"} mt={30}>
          {/* Header */}
          <TouchableOpacity onPress={() => router.push("/(tabs)")}>
            <HStack m={5}>
              <MaterialIcons
                name="chevron-left"
                color={mode === "dark" ? "white" : "black"}
                size={30}
              />
              <Center flex={1} mr={20}>
                <Text
                  color={mode === "dark" ? "white" : "black"}
                  size="sm"
                  mr={20}
                >
                  Invoice
                </Text>
              </Center>
            </HStack>
          </TouchableOpacity>

          {/* Search and Filter */}
          <HStack mt={15} space="md" m={5}>
            <Input
              variant="rounded"
              width={"85%"}
              borderColor={"transparent"}
              backgroundColor={
                mode === "dark" ? colors.gray.dark[800] : colors.gray.light[200]
              }
            >
              <InputField placeholder="Cari transaksi disini" />
            </Input>

            <TouchableOpacity onPress={() => setShowActionsheet(true)}>
              <Box
                borderRadius={"$full"}
                backgroundColor={
                  mode === "light"
                    ? colors.gray.light[200]
                    : colors.gray.dark[800]
                }
                borderWidth={1}
                borderColor={colors.border}
              >
                <Ionicons
                  name="filter"
                  size={25}
                  color={mode === "dark" ? "white" : "black"}
                  style={{ margin: 8 }}
                />
              </Box>
            </TouchableOpacity>
          </HStack>
          <Divider mt={20} bgColor={colors.gray.light[200]} />
        </Box>

        {/* Invoice List */}
        <VStack mx={10}>
          {!data || data.length === 0 ? (
            <NoData
              title="Belum ada data Invoice"
              desc="Jika anda sudah memiliki Invoice, invoice tersebut akan muncul disini."
              icon=""
            />
          ) : (
            data.map((item: any, index: number) => (
              <React.Fragment key={item.no_invoice ?? index}>
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/detailInvoice",
                      params: { noInvoice: item.no_invoice },
                    })
                  }
                >
                  <Box
                    borderWidth={1}
                    borderRadius={10}
                    borderColor={
                      mode === "dark" ? colors.border : colors.gray.light[200]
                    }
                    mb={20}
                    mt={20}
                  >
                    <Box
                      borderTopRightRadius={10}
                      borderTopLeftRadius={10}
                      bgColor={
                        mode === "light" ? colors.gray.light[200] : colors.box
                      }
                    >
                      <HStack justifyContent="space-between" m={10}>
                        <HStack space="md">
                          <Box
                            borderRadius={8}
                            borderWidth={1}
                            borderColor="transparent"
                            bgColor={colors.boxWarning}
                            height={25}
                            width={25}
                            alignItems="center"
                            justifyContent="center"
                          >
                            <MaterialCommunityIcons
                              name="text-box-outline"
                              size={20}
                              color={"white"}
                            />
                          </Box>
                          <Text
                            color={mode === "dark" ? "white" : "black"}
                            fontSize={14}
                            fontFamily="Lato"
                            fontWeight={"$semibold"}
                            mt={4}
                          >
                            Invoice
                          </Text>
                        </HStack>
                        <Text
                          color={mode === "dark" ? "white" : "black"}
                          fontSize={14}
                          fontFamily="Lato"
                          fontWeight={"$semibold"}
                        >
                          {item.no_invoice}
                        </Text>
                      </HStack>
                    </Box>

                    <HStack justifyContent="space-between" mt={10} m={10}>
                      <VStack space="md">
                        <Text
                          color={mode === "dark" ? "white" : "black"}
                          fontSize={14}
                          fontFamily="Lato"
                          fontWeight={"$semibold"}
                        >
                          Bayar Sebelum
                        </Text>
                        <Text
                          fontSize={14}
                          fontFamily="Lato"
                          fontWeight={"$semibold"}
                        >
                          {item.created_at}
                        </Text>
                      </VStack>
                      <CustomBadge
                        variant={item.status === "PAID" ? "success" : "danger"}
                        label={item.status}
                      />
                    </HStack>

                    <DashedDivider />
                    <VStack mx={10} mt={10} mb={10}>
                      <HStack justifyContent="space-between" mt={10}>
                        <Text
                          color={mode === "dark" ? "white" : "black"}
                          fontSize={14}
                          fontFamily="Lato"
                          fontWeight={"$semibold"}
                        >
                          Nominal Tertagih
                        </Text>
                        <Text
                          color={mode === "dark" ? "white" : "black"}
                          fontSize={14}
                          fontFamily="Lato"
                          fontWeight={"$semibold"}
                        >
                          {formatRupiah(item.nominal)}
                        </Text>
                      </HStack>
                    </VStack>
                  </Box>
                </TouchableOpacity>
              </React.Fragment>
            ))
          )}

          {/* Footer Loader saat hit API */}
          {isLoading && (
            <Center my={16}>
              <Spinner size="large" />
              <Text mt="$2" color={mode === "dark" ? "white" : "black"}>
                Memuat data...
              </Text>
            </Center>
          )}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Invoice;
