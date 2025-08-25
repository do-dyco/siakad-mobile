import Berlangsung from "@/components/Berlangsung";
import NoData from "@/components/NoData";
import Proses from "@/components/Proses";
import colors from "@/src/config/colors";
import apiService from "@/src/service/apiService";
import { useUserStore } from "@/src/store/userStore";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  Box,
  Center,
  Divider,
  HStack,
  Input,
  InputField,
  SafeAreaView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import { TabBar, TabView } from "react-native-tab-view";

type ItemType = {
  id: string;
  no_tagihan: string;
  no_invoice: string;
  tagihan_name: string;
  total: string;
  expire_at: string;
  nominal: number;
  status?: "IN_PROGRESS" | "PAID" | string;
  master_tagihan?: { nama?: string };
};

const LIMIT = 10;

const Tagihan = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tahun, setTahun] = useState("");
  const user = useUserStore((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);

  // Pagination
  const [ongoingPage, setOngoingPage] = useState(1);
  const [prosesPage, setProsesPage] = useState(1);
  const [ongoingHasMore, setOngoingHasMore] = useState(true);
  const [prosesHasMore, setProsesHasMore] = useState(true);
  const [isLoadingMoreOngoing, setIsLoadingMoreOngoing] = useState(false);
  const [isLoadingMoreProses, setIsLoadingMoreProses] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Data
  const [ongoingData, setOngoingData] = useState<ItemType[]>([]);
  const [prosesData, setProsesData] = useState<ItemType[]>([]);

  // Scroll positions
  const [scrollPositions, setScrollPositions] = useState({
    ongoing: 0,
    proses: 0,
  });

  // Lock fetch per tab biar tidak dobel
  const fetchingRef = useRef<{ IN_PROGRESS: boolean; PAID: boolean }>({
    IN_PROGRESS: false,
    PAID: false,
  });

  const params = useMemo(
    () => ({
      search,
      startDate,
      endDate,
      limit: LIMIT,
      tahun,
      start: 1,
      userId: Number(user?.id),
    }),
    [search, startDate, endDate, tahun, user?.id]
  );

  const mergeUnique = (prev: ItemType[], incoming: ItemType[]) => {
    const map = new Map<string, ItemType>();
    prev.forEach((it) => map.set(it.id, it));
    incoming.forEach((it) => {
      if (!map.has(it.id)) map.set(it.id, it);
    });
    return Array.from(map.values());
  };

  const fetchData = async (
    status: "IN_PROGRESS" | "PAID",
    pageNumber: number,
    isLoadMore: boolean
  ) => {
    if (fetchingRef.current[status]) return;
    fetchingRef.current[status] = true;

    try {
      if (!isLoadMore) setIsLoading(true);
      if (status === "IN_PROGRESS" && isLoadMore) setIsLoadingMoreOngoing(true);
      if (status === "PAID" && isLoadMore) setIsLoadingMoreProses(true);

      // ✅ Sesuai Postman
      const fetchParams = {
        search,
        start: pageNumber, // ini integer (page index)
        length: LIMIT, // jumlah record per page
        userId: user?.id,
        orderBy: [
          { column: -48898829, asc: true },
          { column: -88908730, asc: false },
        ],
        status: status ? status : "",
        startDate,
        endDate,
        tahun,
      };

      const response = await apiService.myListTagihan(fetchParams);
      const newData: ItemType[] = response?.data?.tagihan_users ?? [];
      const totalRecords = response?.data?.records_total ?? 0;

      if (status === "IN_PROGRESS") {
        if (isLoadMore) {
          setOngoingData((prev) => {
            const merged = [...prev, ...newData];
            setOngoingHasMore(merged.length < totalRecords);
            return merged;
          });
        } else {
          setOngoingData(newData);
          setOngoingHasMore(newData.length < totalRecords);
        }
      } else {
        if (isLoadMore) {
          setProsesData((prev) => {
            const merged = [...prev, ...newData];
            // kalau API sudah nggak kirim data baru → habis
            if (newData.length === 0) {
              setProsesHasMore(false);
            } else {
              setProsesHasMore(merged.length < totalRecords);
            }
            return merged;
          });
        } else {
          setProsesData(newData);
          setProsesHasMore(newData.length < totalRecords);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      if (status === "IN_PROGRESS" && isLoadMore)
        setIsLoadingMoreOngoing(false);
      if (status === "PAID" && isLoadMore) setIsLoadingMoreProses(false);
      if (!isLoadMore) setIsLoading(false);
      fetchingRef.current[status] = false;
    }
  };

  // Load more — naikkan page 1 per kali
  const loadMoreOngoing = async () => {
    if (!ongoingHasMore || isLoadingMoreOngoing) return;
    const nextPage = ongoingPage + 1; // start naik 1
    setOngoingPage(nextPage);
    await fetchData("IN_PROGRESS", nextPage, true);
  };

  const loadMoreProses = async () => {
    if (!prosesHasMore || isLoadingMoreProses) return;
    const nextPage = prosesPage + 1;
    setProsesPage(nextPage);
    await fetchData("PAID", nextPage, true);
  };

  // Refresh
  const handleRefresh = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setOngoingPage(1);
    setProsesPage(1);
    setOngoingHasMore(true);
    setProsesHasMore(true);
    try {
      await Promise.all([
        fetchData("IN_PROGRESS", 1, false),
        fetchData("PAID", 1, false),
      ]);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Initial load & saat filter berubah
  useEffect(() => {
    // reset
    setOngoingPage(1);
    setProsesPage(1);
    setOngoingHasMore(true);
    setProsesHasMore(true);

    const loadAll = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchData("IN_PROGRESS", 1, false),
        fetchData("PAID", 1, false),
      ]);
      setIsLoading(false);
    };
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // Scroll position
  const updateScrollPosition = (tab: "ongoing" | "proses", offset: number) => {
    setScrollPositions((prev) => ({ ...prev, [tab]: offset }));
  };

  const routes = useMemo(
    () => [
      { key: "first", title: "Sedang Berlangsung" },
      { key: "second", title: "Dalam Proses" },
    ],
    []
  );

  return (
    <SafeAreaView
      backgroundColor={mode === "dark" ? "black" : "white"}
      height={screenHeight}
    >
      {/* Header */}
      <Box backgroundColor={mode === "dark" ? "black" : "white"} mt={30}>
        <TouchableOpacity onPress={() => router.back()}>
          <HStack m={5} alignItems="center">
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
                Tagihan
              </Text>
            </Center>
          </HStack>
        </TouchableOpacity>

        {/* Search & Filter */}
        <HStack mt={15} space="md" m={5} alignItems="center">
          <Input
            variant="rounded"
            width="85%"
            borderColor="transparent"
            backgroundColor={
              mode === "dark" ? colors.gray.dark[800] : colors.gray.light[200]
            }
          >
            <InputField
              placeholder="Cari transaksi disini"
              value={search}
              onChangeText={setSearch}
              onSubmitEditing={handleRefresh}
              returnKeyType="search"
            />
          </Input>
          <TouchableOpacity onPress={handleRefresh}>
            <Box
              borderRadius="$full"
              backgroundColor={
                mode === "light"
                  ? colors.gray.light[200]
                  : colors.gray.dark[800]
              }
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

        <Divider
          mt={20}
          bgColor={mode === "dark" ? "#3a3a3b" : colors.gray.light[200]}
        />
      </Box>

      {/* Content */}
      <VStack flex={1} m={5}>
        {isLoading ? (
          <Center flex={1}>
            <ActivityIndicator
              size="large"
              color={mode === "dark" ? "white" : "black"}
            />
            <Text mt={10} color={mode === "dark" ? "white" : "black"}>
              Memuat data...
            </Text>
          </Center>
        ) : ongoingData.length === 0 &&
          prosesData.length === 0 &&
          !isRefreshing ? (
          <NoData
            title="Belum ada tagihan"
            desc="Jika anda memiliki tagihan, tagihan anda akan muncul disini"
          />
        ) : (
          <TabView
            navigationState={{ index, routes }}
            renderScene={({ route }) => {
              switch (route.key) {
                case "first":
                  return (
                    <Berlangsung
                      data={ongoingData}
                      onReload={handleRefresh}
                      onLoadMore={loadMoreOngoing}
                      hasMore={ongoingHasMore}
                      isLoadingMore={isLoadingMoreOngoing}
                      isRefreshing={isRefreshing}
                      initialScrollOffset={scrollPositions.ongoing}
                      onScrollPositionChange={(offset) =>
                        updateScrollPosition("ongoing", offset)
                      }
                    />
                  );
                case "second":
                  return (
                    <Proses
                      data={prosesData}
                      onReload={handleRefresh}
                      onLoadMore={loadMoreProses}
                      hasMore={prosesHasMore}
                      isLoadingMore={isLoadingMoreProses}
                      isRefreshing={isRefreshing}
                      initialScrollOffset={scrollPositions.proses}
                      onScrollPositionChange={(offset) =>
                        updateScrollPosition("proses", offset)
                      }
                    />
                  );
                default:
                  return null;
              }
            }}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            style={{ backgroundColor: "transparent" }}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                style={{ backgroundColor: "transparent" }}
                indicatorStyle={{
                  backgroundColor: mode === "dark" ? "white" : "black",
                }}
                activeColor={mode === "dark" ? "white" : "black"}
                inactiveColor={
                  mode === "dark"
                    ? "rgba(255, 255, 255, 0.6)"
                    : "rgba(0, 0, 0, 0.6)"
                }
                labelStyle={{
                  color: mode === "dark" ? "white" : "black",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              />
            )}
          />
        )}
      </VStack>
    </SafeAreaView>
  );
};

export default Tagihan;
