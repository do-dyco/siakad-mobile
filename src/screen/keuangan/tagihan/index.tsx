import Berlangsung from "@/components/Berlangsung";
import NoData from "@/components/NoData";
import Proses from "@/components/Proses";
import colors from "@/src/config/colors";
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
  Text,
  VStack,
  ScrollView,
  View,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  TouchableOpacity,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

const Tagihan = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [data, setData] = useState("1");
  const dataOngoing = [
    {
      id: "1",
      no_tagihan: "TG00294581",
      no_invoice: "INV/20241022",
      tagihan_name: "Pembelian Buku",
      total: "100.000",
    },
    {
      id: "2",
      no_tagihan: "TG00294581",
      no_invoice: "INV/20241122",
      tagihan_name: "Pembelian Buku",
      total: "300.000",
    },
    {
      id: "3",
      no_tagihan: "TG00294581",
      no_invoice: "INV/20241222",
      tagihan_name: "Pembelian Buku",
      total: "200.000",
    },
  ];

  const FirstRoute = () => <Berlangsung data={dataOngoing} />;
  const SecondRoute = () => <Proses data={dataOngoing} />;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const routes = [
    { key: "first", title: "Sedang Berlangsung" },
    { key: "second", title: "Dalam Proses" },
  ];

  return (
    <SafeAreaView
      backgroundColor={mode === "dark" ? "black" : "white"}
      height={screenHeight}
    >
      <ScrollView>
        <Box backgroundColor={mode === "dark" ? "black" : "white"} mt={30}>
          {/* Back Button and Title */}
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

          {/* Search and Filter */}
          <HStack mt={15} space="md" m={5} alignItems="center">
            <Input
              variant="rounded"
              width="85%"
              borderColor="transparent"
              backgroundColor={mode === "dark" ? "#13161B" : "white"}
            >
              <InputField placeholder="Cari transaksi disini" />
            </Input>
            <TouchableOpacity>
              <Box
                backgroundColor="transparent"
                borderWidth={1}
                borderColor={colors.border}
                borderRadius={100}
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
        <VStack m={5}>
          {data.length === 0 ? (
            <NoData
              title="Belum ada tagihan"
              desc="Jika anda memiliki tagihan, tagihan anda akan muncul disini"
            />
          ) : (
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
              style={{
                backgroundColor: "transparent",
              }}
              renderTabBar={(props) => (
                <TabBar
                  {...props}
                  style={{
                    backgroundColor: "trasnparent",
                  }}
                  indicatorStyle={{
                    backgroundColor: mode === "dark" ? "#fff" : "#000",
                  }}
                  // labelStyle={{
                  //   color: mode === "dark" ? "#fff" : "#000",
                  // }}
                />
              )}
            />
          )}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Tagihan;
