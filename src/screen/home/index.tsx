import React, { useEffect, useState } from "react";
import colors from "@/src/config/colors";
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Dimensions, useColorScheme } from "react-native";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import MenuHome from "@/components/MenuHome";
import HomeCard from "@/components/HomeCard";
import { useUserStore } from "@/src/store/userStore";
import apiService from "@/src/service/apiService";
import TagihanCard from "@/components/TagihanCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box, HStack, Image, ImageBackground, SafeAreaView, ScrollView, Text, VStack } from '@gluestack-ui/themed';


const Home = () => {
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth * 0.5;
  const insets = useSafeAreaInsets();
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const [saldoData, setSaldoData] = useState(0);
  const [dataTagihan, setDataTagihan] = useState({});

  console.log("Render Home with saldoData:", saldoData);
  

  const user = useUserStore((state) => state.user);

  const fetchSaldo = async () => {
    try {
      const response = await apiService.mySaldo();
      setSaldoData(response.data);
    } catch (error) {
      setSaldoData(0);
      console.error("Failed to fetch saldo:", error);

      const status = error?.response?.status;
      if (status === 401 || status === 403) {
        useUserStore.getState().clearAuth();
        router.replace("/login");
      }
    }
  };

  const fetchTagihan = async () => {
    try {
      const response = await apiService.myTagihan();

      const raw = response.data;

      const transformed = [
        { id: 1, label: "Tagihan Belum Lunas", saldo: raw.tagihan_belum_lunas },
        { id: 2, label: "Tagihan Lunas", saldo: raw.tagihan_lunas },
        { id: 3, label: "Total Tagihan", saldo: raw.tagihan_total },
      ];

      setDataTagihan(transformed);
    } catch (error) {
      setDataTagihan([]);
      console.error("Failed to fetch saldo:", error);
    }
  };

  useEffect(() => {
    fetchSaldo();
    fetchTagihan();
  }, []);

  return (
    <>
      <SafeAreaView height={screenHeight}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{ paddingBottom: insets.bottom + 48 }}
          showsVerticalScrollIndicator={false}
        >
          <VStack mt={40} mx={16} space="md" mb={24}>
            <Image
              style={{ width: 50, height: 50, margin: 16 }}
              source={require("@/assets/images/LOGO.png")}
              alt="logo"
              mt="5%"
            />

            <Text
              fontFamily="Lato"
              fontSize={14}
              color={mode === "dark" ? "white" : colors.gray.light[400]}
            >
              Good Morning,
            </Text>
            <Text
              fontSize={18}
              fontFamily="Lato-Bold"
              color={mode === "dark" ? "white" : "black"}
            >
              {user?.username || "User"}
            </Text>
          </VStack>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <HomeCard data={saldoData} />
            <TagihanCard data={dataTagihan} />
          </ScrollView>

          <MenuHome />

          <Box
            borderRadius={10}
            mt={20}
            mx={10}
            my={5}
            backgroundColor={mode === "dark" ? "black" : "white"}
          >
            <VStack space="md" m={20}>
              <HStack justifyContent="space-between">
                <Box
                  borderRadius={"$full"}
                  bgColor={colors.primary}
                  width={30}
                  height={30}
                  justifyContent="center"
                  alignItems="center"
                >
                  <MaterialCommunityIcons name="lock" size={20} color="white" />
                </Box>

                <MaterialCommunityIcons name="close" size={30} />
              </HStack>

              <HStack justifyContent="space-between" width={"auto"}>
                <VStack width={"70%"}>
                  <Text
                    fontFamily="Lato-Bold"
                    fontSize={20}
                    color={mode === "dark" ? "white" : "black"}
                  >
                    Ganti Kata Sandi Anda!
                  </Text>
                  <Text
                    fontSize={14}
                    fontFamily="Lato"
                    color={mode === "dark" ? "white" : "black"}
                    mt={2}
                  >
                    Untuk keamanan akun anda, kami sarankan untuk mengganti kata
                    sandi secara berkala, minimal 4 bulan sekali.
                  </Text>
                </VStack>
                <Box>
                  <Image
                    size="xl"
                    source={require("@/assets/images/lock.png")}
                    alt="artikel"
                    borderRadius={10}
                    mt={"-10%"}
                  />
                </Box>
              </HStack>
            </VStack>
          </Box>

          <HStack mt={20} mx={20} justifyContent="space-between">
            <Text
              fontFamily="Lato-Black"
              color={mode === "dark" ? "white" : "black"}
              fontSize={20}
            >
              Artikel Terbaru
            </Text>

            <TouchableOpacity onPress={() => router.push("/allArticle")}>
              <Text
                color={mode === "dark" ? "white" : "black"}
                fontSize={14}
                fontFamily="Lato"
                mt={4}
              >
                Lihat Semua
              </Text>
            </TouchableOpacity>
          </HStack>

          <HStack mb={50}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <Box
                width={cardWidth}
                borderRadius={10}
                bgColor="white"
                mt={20}
                mx={10}
                my={5}
                backgroundColor={mode === "dark" ? "black" : "white"}
              >
                <VStack space="md" width="100%">
                  <Image
                    source={require("@/assets/images/artikel1.jpg")}
                    alt="artikel"
                    borderRadius={10}
                    width={cardWidth}
                  />
                  <VStack space="md" m={10}>
                    <Text
                      fontFamily="Lato-Black"
                      fontSize={14}
                      color={mode === "dark" ? "white" : "black"}
                    >
                      Tesla Launching AI Robot
                    </Text>
                    <Text
                      fontSize={12}
                      color={mode === "dark" ? "white" : "black"}
                      fontFamily="Lato"
                    >
                      Untuk keamanan akun anda, kami sarankan untuk mengganti
                      kata sandi secara berkala, minimal 4 bulan sekali.
                    </Text>
                  </VStack>
                </VStack>
              </Box>

              <Box
                width={cardWidth}
                borderRadius={10}
                bgColor="white"
                mt={20}
                my={5}
                backgroundColor={mode === "dark" ? "black" : "white"}
              >
                <VStack space="md" width="100%">
                  <Image
                    source={require("@/assets/images/artikel1.jpg")}
                    alt="artikel"
                    borderRadius={10}
                    width={cardWidth}
                  />
                  <VStack space="md" m={10}>
                    <Text
                      fontWeight={"$bold"}
                      fontSize={14}
                      color={mode === "dark" ? "white" : "black"}
                    >
                      Tesla Launching AI Robot
                    </Text>
                    <Text
                      fontSize={12}
                      color={mode === "dark" ? "white" : "black"}
                    >
                      Untuk keamanan akun anda, kami sarankan untuk mengganti
                      kata sandi secara berkala, minimal 4 bulan sekali.
                    </Text>
                  </VStack>
                </VStack>
              </Box>
            </ScrollView>
          </HStack>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;
