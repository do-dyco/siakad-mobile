import Berlangsung from "@/components/Berlangsung";
import NoData from "@/components/NoData";
import Proses from "@/components/Proses";
import colors from "@/src/config/colors";
import apiService from "@/src/service/apiService";
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
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

type ItemType = {
  id: string;
  no_tagihan: string;
  no_invoice: string;
  tagihan_name: string;
  total: string;
  expire_at: string;
  nominal: number;
  status?: "UNPAID" | "PAID" | string;
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

  const [isLoading, setIsLoading] = useState(true);

  // Pagination state
  const [ongoingPage, setOngoingPage] = useState(1);
  const [prosesPage, setProsesPage] = useState(1);
  const [ongoingHasMore, setOngoingHasMore] = useState(true);
  const [prosesHasMore, setProsesHasMore] = useState(true);
  const [isLoadingMoreOngoing, setIsLoadingMoreOngoing] = useState(false);
  const [isLoadingMoreProses, setIsLoadingMoreProses] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Data state
  const [ongoingData, setOngoingData] = useState<ItemType[]>([]);
  const [prosesData, setProsesData] = useState<ItemType[]>([]);

  // Scroll position
  const [scrollPositions, setScrollPositions] = useState({
    ongoing: 0,
    proses: 0,
  });

  const params = useMemo(
    () => ({
      search,
      startDate,
      endDate,
      limit: LIMIT,
    }),
    [search, startDate, endDate]
  );

  // 🔧 reusable fetch function
  const fetchData = async (
    status: "UNPAID" | "PAID",
    pageNumber: number,
    isLoadMore: boolean
  ) => {
    try {
      if (!isLoadMore) setIsLoading(true); // mulai loading saat fetch awal

      if (status === "UNPAID" && isLoadMore) setIsLoadingMoreOngoing(true);
      if (status === "PAID" && isLoadMore) setIsLoadingMoreProses(true);

      const fetchParams = {
        ...params,
        status,
        page: pageNumber,
      };

      const response = await apiService.myListTagihan(fetchParams);
      const newData: ItemType[] = response?.data?.tagihan_users ?? [];
      const totalRecords = response?.data?.records_total ?? 0;

      if (status === "UNPAID") {
        if (isLoadMore) {
          const filteredData = newData.filter(
            (newItem) => !ongoingData.some((item) => item.id === newItem.id)
          );
          if (filteredData.length > 0) {
            setOngoingData((prev) => [...prev, ...filteredData]);
          }
        } else {
          setOngoingData(newData);
        }
        const currentTotal = isLoadMore
          ? ongoingData.length + newData.length
          : newData.length;
        setOngoingHasMore(currentTotal < totalRecords);
      }

      if (status === "PAID") {
        if (isLoadMore) {
          const filteredData = newData.filter(
            (newItem) => !prosesData.some((item) => item.id === newItem.id)
          );
          if (filteredData.length > 0) {
            setProsesData((prev) => [...prev, ...filteredData]);
          }
        } else {
          setProsesData(newData);
        }
        const currentTotal = isLoadMore
          ? prosesData.length + newData.length
          : newData.length;
        setProsesHasMore(currentTotal < totalRecords);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (status === "UNPAID" && !isLoadMore) {
        setOngoingData([]);
        setOngoingHasMore(false);
      }
      if (status === "PAID" && !isLoadMore) {
        setProsesData([]);
        setProsesHasMore(false);
      }
    } finally {
      if (status === "UNPAID" && isLoadMore) setIsLoadingMoreOngoing(false);
      if (status === "PAID" && isLoadMore) setIsLoadingMoreProses(false);

      if (!isLoadMore) setIsLoading(false); // selesai loading fetch awal
    }
  };

  // Load more
  const loadMoreOngoing = async () => {
    if (!ongoingHasMore || isLoadingMoreOngoing) return;
    const nextPage = LIMIT + 10;
    setOngoingPage(nextPage);
    await fetchData("UNPAID", nextPage, true);
  };

  const loadMoreProses = async () => {
    if (!prosesHasMore || isLoadingMoreProses) return;
    const nextPage = LIMIT + 10;
    setProsesPage(nextPage);
    await fetchData("PAID", nextPage, true);
  };

  // Refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    setOngoingPage(1);
    setProsesPage(1);
    setOngoingHasMore(true);
    setProsesHasMore(true);

    try {
      await Promise.all([
        fetchData("UNPAID", 1, false),
        fetchData("PAID", 1, false),
      ]);
    } catch (error) {
      console.error("Error refreshing:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Initial load & when params change
  useEffect(() => {
    setOngoingPage(1);
    setProsesPage(1);
    setOngoingHasMore(true);
    setProsesHasMore(true);

    const loadAll = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchData("UNPAID", 1, false),
        fetchData("PAID", 1, false),
      ]);
      setIsLoading(false);
    };

    loadAll();
  }, [params]);

  // Scroll position update
  const updateScrollPosition = (tab: "ongoing" | "proses", offset: number) => {
    setScrollPositions((prev) => ({
      ...prev,
      [tab]: offset,
    }));
  };

  const FirstRoute = () => (
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

  const SecondRoute = () => (
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

        <Divider mt={20} bgColor="#3a3a3b" />
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
