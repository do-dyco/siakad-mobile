import CustomBadge from "@/components/CustomBadge";
import DashedDivider from "@/components/dashedDivider";
import NoData from "@/components/NoData";
import SearchFilter from "@/components/SearchFilter";
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
  Spinner,
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
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tahun, setTahun] = useState("");
  
  // Loading states dipisah biar jelas
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // State baru untuk pagination yang lebih baik
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const pageSize = 10;
  
  // State untuk filter yang aktif
  const [activePeriodFilter, setActivePeriodFilter] = useState<string | null>(null);
  const [activeStatusFilters, setActiveStatusFilters] = useState<string[]>([]);
  
  const reachedEndRef = useRef(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const baseParams = {
    search: search,
    start: 1,
    length: currentPage * pageSize,
    startDate: startDate,
    endDate: endDate,
    tahun: tahun,
    status: activeStatusFilters.length > 0 ? activeStatusFilters : undefined,
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

    if (isCloseToBottom && !isLoadingMore && !reachedEndRef.current && hasMoreData) {
      reachedEndRef.current = true;
      loadMore();
    }
    if (!isCloseToBottom) {
      reachedEndRef.current = false;
    }
  };

  const handleRefresh = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setCurrentPage(1);
    
    try {
      const newParams = { 
        ...baseParams, 
        length: pageSize,
        search: search,
        startDate: startDate,
        endDate: endDate,
        tahun: tahun,
        status: activeStatusFilters.length > 0 ? activeStatusFilters : undefined,
      };
      
      const response = await apiService.myInvoice(newParams);
      const newData = response.data?.invoice_tagihans || [];
      
      setData(newData);
      setHasMoreData(newData.length >= pageSize);
      
    } catch (error) {
      console.error("Refresh error:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const loadMore = async () => {
    if (!hasMoreData) return;
    
    setIsLoadingMore(true);
    const nextPage = currentPage + 1;
    
    try {
      const newParams = { 
        ...baseParams, 
        start: (nextPage - 1) * pageSize + 1,
        length: pageSize,
        search: search,
        startDate: startDate,
        endDate: endDate,
        tahun: tahun,
        status: activeStatusFilters.length > 0 ? activeStatusFilters : undefined,
      };
      
      const response = await apiService.myInvoice(newParams);
      const newData = response.data?.invoice_tagihans || [];
      
      if (newData.length > 0) {
        // Append data baru ke data existing, jangan replace
        setData(prevData => [...prevData, ...newData]);
        setCurrentPage(nextPage);
        setHasMoreData(newData.length >= pageSize);
      } else {
        setHasMoreData(false);
      }
      
    } catch (error) {
      console.error("Load more error:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const fetchData = async () => {
    setIsInitialLoading(true);
    setCurrentPage(1);
    
    try {
      const newParams = { 
        ...baseParams, 
        length: pageSize,
        search: search,
        startDate: startDate,
        endDate: endDate,
        tahun: tahun,
        status: activeStatusFilters.length > 0 ? activeStatusFilters : undefined,
      };
      
      const response = await apiService.myInvoice(newParams);
      const newData = response.data?.invoice_tagihans || [];
      
      setData(newData);
      setHasMoreData(newData.length >= pageSize);
      
    } catch (error) {
      console.error(error);
    } finally {
      setIsInitialLoading(false);
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

  // Handler untuk search
  const handleSearchChange = (text: string) => {
    setSearch(text);
    setCurrentPage(1); // Reset pagination saat search
  };

  // Handler untuk filter
  const handleFilterPress = () => {
    setCurrentPage(1); // Reset pagination saat filter
    handleRefresh();
  };

  const toggleStatusFilter = (status: string) => {
    setActiveStatusFilters((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
    setCurrentPage(1);
  };

  // Reset semua filter
  const clearAllFilters = () => {
    setStartDate("");
    setEndDate("");
    setTahun("");
    setActivePeriodFilter(null);
    setActiveStatusFilters([]);
    setCurrentPage(1);
    handleRefresh();
  };

  // Handler untuk menghapus filter individual
  const handleRemoveFilter = (filterLabel: string) => {
    // Cek jika filter adalah period filter
    const periodFilters = ["Minggu Ini", "Bulan Ini", "Tahun Ini", "3 Bulan Terakhir"];
    if (periodFilters.includes(filterLabel)) {
      setActivePeriodFilter(null);
      setStartDate("");
      setEndDate("");
      setTahun("");
    } else {
      // Status filter
      setActiveStatusFilters(prev => prev.filter(f => f !== filterLabel));
    }
    setCurrentPage(1);
    handleRefresh();
  };

  // Filter options untuk ActionSheet
  const filterOptions: any[] = [
    {
      label: "Minggu Ini",
      value: "this_week",
      onPress: () => {
        console.log("Filter: Minggu Ini");
        const now = new Date();
        const dayOfWeek = now.getDay();

        const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;

        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() + diffToMonday);
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);
        
        setStartDate(startOfWeek.toISOString().split('T')[0]);
        setEndDate(endOfWeek.toISOString().split('T')[0]);
        setTahun("");
        setActivePeriodFilter("Minggu Ini");
        setCurrentPage(1);
      }
    },
    {
      label: "Bulan Ini",
      value: "this_month",
      onPress: () => {
        console.log("Filter: Bulan Ini");
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        
        setStartDate(startOfMonth.toISOString().split('T')[0]);
        setEndDate(endOfMonth.toISOString().split('T')[0]);
        setTahun("");
        setActivePeriodFilter("Bulan Ini");
        setCurrentPage(1);
      }
    },
    {
      label: "Tahun Ini",
      value: "this_year",
      onPress: () => {
        console.log("Filter: Tahun Ini");
        const currentYear = new Date().getFullYear().toString();
        setTahun(currentYear);
        setStartDate("");
        setEndDate("");
        setActivePeriodFilter("Tahun Ini");
        setCurrentPage(1);
      }
    },
    {
      label: "3 Bulan Terakhir",
      value: "last_3_months",
      onPress: () => {
        console.log("Filter: 3 Bulan Terakhir");
        const now = new Date();
        const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        
        setStartDate(threeMonthsAgo.toISOString().split('T')[0]);
        setEndDate(now.toISOString().split('T')[0]);
        setTahun("");
        setActivePeriodFilter("3 Bulan Terakhir");
        setCurrentPage(1);
      }
    },
    { label: "Semua", value: "all", onPress: () => clearAllFilters() },
    { label: "Paid", value: "PAID", onPress: () => toggleStatusFilter("PAID") },
    { label: "Pending", value: "PENDING", onPress: () => toggleStatusFilter("PENDING") 
    },
  ];

  // Status filter options (untuk filter kedua)
  const statusFilterOptions: any[] = [
    { 
      label: "Paid", 
      value: "PAID", 
      onPress: () => toggleStatusFilter("Paid") 
    },
    { 
      label: "Pending", 
      value: "PENDING", 
      onPress: () => toggleStatusFilter("Pending") 
    },
  ];

  // useEffect yang diperbaiki - hanya fetch ulang saat filter berubah
  useEffect(() => {
    // Debounce untuk search
    const timeoutId = setTimeout(() => {
      fetchData();
    }, search ? 500 : 0); // Delay 500ms untuk search, langsung untuk filter lain

    return () => clearTimeout(timeoutId);
  }, [search, startDate, endDate, tahun, activeStatusFilters]); // Include activeStatusFilters

  return (
    <SafeAreaView>
      <ScrollView
        ref={scrollViewRef}
        backgroundColor={mode === "dark" ? "black" : "white"}
        height={screenHeight}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 48 }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
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
          <Box mt={15} m={5}>
            <SearchFilter
              searchValue={search}
              onSearchChange={handleSearchChange}
              onFilterPress={handleFilterPress}
              onSecondFilterPress={() => console.log("Second filter pressed")}
              onSearchSubmit={handleRefresh}
              placeholder="Cari transaksi disini"
              searchWidth="85%"
              showFilter={true}
              showSecondFilter={true}
              filterIcon="filter"
              secondFilterIcon="options"
              debounceDelay={3000}
              enableActionSheet={true}
              enableSecondActionSheet={true}
              filterOptions={filterOptions}
              secondFilterOptions={statusFilterOptions}
              actionSheetTitle="Filter Periode"
              secondActionSheetTitle="Filter Status"
              selectedFilters={activePeriodFilter ? [activePeriodFilter] : []}
              selectedSecondFilters={activeStatusFilters}
              onClearAllFilters={clearAllFilters}
              onRemoveFilter={handleRemoveFilter}
            />
          </Box>
          <Divider mt={20} bgColor={colors.gray.light[200]} />
        </Box>

        <VStack mx={10}>
          {/* Kondisi 1: Loading awal */}
          {isInitialLoading && data.length === 0 && (
            <Center my={16}>
              <Spinner size="large" />
              <Text mt="$2" color={mode === "dark" ? "white" : "black"}>
                Memuat data...
              </Text>
            </Center>
          )}

          {/* Kondisi 2: Tidak ada data */}
          {!isInitialLoading && data.length === 0 && (
            <NoData
              title="Belum ada data Invoice"
              desc="Jika anda sudah memiliki Invoice, invoice tersebut akan muncul disini."
              icon=""
            />
          )}

          {/* Kondisi 3: Ada data */}
          {!isInitialLoading &&
            data.length > 0 &&
            data.map((item: any, index: number) => (
              <React.Fragment key={`${item.no_invoice}-${index}`}>
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
                    {/* Header invoice */}
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

                    {/* Content invoice */}
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

                    <VStack mt={10} m={10} space="md">
                      <Text
                        color={mode === "dark" ? "white" : "black"}
                        fontSize={14}
                        fontFamily="Lato"
                        fontWeight={"$semibold"}
                      >
                        Tagihan
                      </Text>
                      <Box
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          gap: 8,
                        }}
                      >
                        {item.tagihan_users.slice(0, 2).map((tagihan, idx) => (
                          <CustomBadge
                            key={idx}
                            variant="primary"
                            label={tagihan?.master_tagihan?.nama}
                          />
                        ))}

                        {item.tagihan_users.length > 2 && (
                          <CustomBadge
                            key="more"
                            variant="primary"
                            label={`+${item.tagihan_users.length - 2} tagihan lainnya`}
                          />
                        )}
                      </Box>
                    </VStack>

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
            ))}

          {/* Spinner load more */}
          {isLoadingMore && (
            <Center my={16}>
              <Spinner size="large" />
              <Text mt="$2" color={mode === "dark" ? "white" : "black"}>
                Memuat lebih banyak...
              </Text>
            </Center>
          )}

          {/* Pesan jika tidak ada data lagi */}
          {!hasMoreData && data.length > 0 && (
            <Center my={16}>
              <Text color={mode === "dark" ? "white" : "black"} opacity={0.6}>
                Semua data telah ditampilkan
              </Text>
            </Center>
          )}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Invoice;