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
import React, { useEffect, useMemo, useState } from "react";
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
  status?: "UNPAID" | "IN_PROGRESS" | "PAID" | string;
  master_tagihan?: { nama?: string };
};

const LIMIT = 50; // ambil banyak sekaligus biar tidak bolak-balik

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
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Data
  const [ongoingData, setOngoingData] = useState<ItemType[]>([]);
  const [prosesData, setProsesData] = useState<ItemType[]>([]);

  // Scroll positions
  const [scrollPositions, setScrollPositions] = useState({
    ongoing: 0,
    proses: 0,
  });

  const params = useMemo(
    () => ({
      search,
      startDate,
      endDate,
      length: LIMIT,
      tahun,
      start: 1,
      userId: Number(user?.id),
    }),
    [search, startDate, endDate, tahun, user?.id]
  );

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const fetchParams = {
        search,
        start: 1,
        length: LIMIT,
        userId: user?.id,
        orderBy: [
          { column: 0, asc: false },
          { column: 0, asc: false },
        ],
        startDate,
        endDate,
        tahun,
      };

      console.log("Requesting:", fetchParams);

      const response = await apiService.myListTagihan(fetchParams);

      const allData: ItemType[] = (response?.data?.tagihan_users ?? []).map(
        (item: any) => ({
          ...item,
          status: item.status?.toUpperCase(),
        })
      );

      console.log("API response status list:", allData.map((d) => d.status));

      // pisahkan manual
      const unpaid = allData.filter((d) => d.status === "UNPAID");
      const inProgress = allData.filter((d) => d.status === "IN_PROGRESS");

      setOngoingData(unpaid);
      setProsesData(inProgress);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    try {
      await fetchData();
    } finally {
      setIsRefreshing(false);
    }
  };

  // Initial load & saat filter berubah
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // Scroll position
  const updateScrollPosition = (tab: "ongoing" | "proses", offset: number) => {
    setScrollPositions((prev) => ({ ...prev, [tab]: offset }));
  };

  const routes = useMemo(
    () => [
      { key: "first", title: "Sedang Berlangsung" }, // UNPAID
      { key: "second", title: "Dalam Proses" }, // IN_PROGRESS
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
        <TouchableOpacity onPress={() => router.push("/(tabs)")}>
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
                      hasMore={false}
                      isLoadingMore={false}
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
                      hasMore={false}
                      isLoadingMore={false}
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
