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

const Tagihan = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [data, setData] = useState<ItemType[]>([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");

  const params = useMemo(
    () => ({
      search,
      startDate,
      endDate,
      status,
    }),
    [search, startDate, endDate, status]
  );

  const fetchData = async () => {
    try {
      const response = await apiService.myListTagihan(params);
      setData(response?.data?.tagihan_users ?? []);
    } catch (error) {
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  const dataOngoing = useMemo(
    () => (data ?? []).filter((item) => item.status === "UNPAID"),
    [data]
  );
  const dataProses = useMemo(
    () => (data ?? []).filter((item) => item.status === "PAID"),
    [data]
  );

  const FirstRoute = () => (
    <Berlangsung data={dataOngoing} onReload={fetchData} />
  );
  const SecondRoute = () => <Proses data={dataProses} onReload={fetchData} />;

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
              onSubmitEditing={fetchData} // trigger manual cari
              returnKeyType="search"
            />
          </Input>
          <TouchableOpacity
            onPress={() => {
              // TODO: buka modal filter, lalu panggil fetchData() setelah apply
              fetchData();
            }}
          >
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
        {data.length === 0 ? (
          <NoData
            title="Belum ada tagihan"
            desc="Jika anda memiliki tagihan, tagihan anda akan muncul disini"
          />
        ) : (
          <TabView
            navigationState={{ index, routes }}
            renderScene={SceneMap({ first: FirstRoute, second: SecondRoute })}
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
