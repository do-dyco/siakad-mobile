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
  Link,
  LinkText,
  Center,
  Badge,
  BadgeText,
} from "@gluestack-ui/themed";
import colors from "@/src/config/colors";
import { useRouter } from "expo-router";
import { Dimensions, TouchableOpacity, useColorScheme } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import SaldoBox from "@/components/SaldoBox";
import { PieChart } from "react-native-gifted-charts";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import SkeletonList from "@/components/SkeletonList";
import { useState } from "react";

export default function Keuangan() {
  const router = useRouter();
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  const [loading, setLoading] = useState("");
  const [dataTransaksi, setDataTransaksi] = useState("1");
  const data = [
    { value: 45, color: "#10B981" },
    { value: 20, color: "#6172F3" },
    { value: 35, color: "#EF4444" },
  ];

  const dataTransaksiDetail = [
    {
      date: "Minggu, 10 Dec 2024",
      transactions: [
        {
          id: 1,
          category: "Uang Keluar",
          amount: 10000,
          description: "Pembayaran Tagihan",
          time: "10:30 AM",
        },
        {
          id: 2,
          category: "Uang Masuk",
          amount: 50000,
          description: "Top Up",
          time: "02:00 PM",
        },
      ],
    },
    {
      date: "Sabtu, 09 Dec 2024",
      transactions: [
        {
          id: 3,
          category: "Uang Keluar",
          amount: 20000,
          description: "Ibta Mart",
          time: "09:15 AM",
        },
        {
          id: 4,
          category: "Uang Keluar",
          amount: 20000,
          description: "Ibta Mart",
          time: "15:15 AM",
        },
      ],
    },
  ];

  return (
    <SafeAreaView
      backgroundColor={mode === "dark" ? "black" : "white"}
      height={screenHeight}
    >
      <ScrollView>
        <Box position="relative" width={screenWidth}>
          <Image
            width={screenWidth}
            height={screenHeight / 3 - 30}
            alt="image"
            source={{
              uri: "../../assets/images/Akademik & Keuangan/BackgroundKeuangan_Dark.png",
            }}
          />
          <SaldoBox />
        </Box>

        <VStack space="md" mt={20} mx={10}>
          <Text color={mode === "dark" ? "white" : "black"}>
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
                  <Text color={mode === "dark" ? "white" : "black"}>
                    Rp 10.000.500
                  </Text>
                  <Text>Uang Masuk</Text>
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
                  <Text color={mode === "dark" ? "white" : "black"}>
                    Rp 500.000
                  </Text>
                  <Text>Tarik Tunai</Text>
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
                  <Text color={mode === "dark" ? "white" : "black"}>
                    Rp 7.600.000
                  </Text>
                  <Text>Uang Keluar</Text>
                </VStack>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
        <Divider bgColor={"transparent"} mt={10} h={10} />
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
        <HStack justifyContent="space-between" m={5} mt={10}>
          <Text color={mode === "dark" ? "white" : "black"}>
            Riwayat Transaksi
          </Text>
          <Link href="#">
            <LinkText color="white">Lihat detail</LinkText>
          </Link>
        </HStack>
        <VStack space="md" mb={200} mx={10}>
          {loading ? <SkeletonList /> : null}
          {!dataTransaksi && !loading ? (
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
            dataTransaksiDetail.map((item, index) => (
              <Box mt={20} key={index}>
                <Text size="xs" color={"#94979C"}>
                  {item.date}
                </Text>

                <TouchableOpacity
                  onPress={() => router.push("/detailTransaksi")}
                >
                  <Box
                    borderRadius={10}
                    borderWidth={1}
                    borderColor="#373A41"
                    mt={10}
                  >
                    <HStack justifyContent="space-between" m={10}>
                      <HStack space="md">
                        <Box borderRadius={10} backgroundColor="#22262F">
                          <MaterialCommunityIcons
                            name="text-box-outline"
                            size={30}
                            color="white"
                            style={{ margin: 8 }}
                          />
                        </Box>
                        <VStack space="sm">
                          <Text color={mode === "dark" ? "white" : "black"}>
                            Pembayaran Tagihan
                          </Text>
                          <Text>20 Oct 2024 | 13.40</Text>
                        </VStack>
                      </HStack>
                      <VStack space="sm">
                        <Text color={mode === "dark" ? "white" : "black"}>
                          {" "}
                          - Rp. 10.000
                        </Text>
                        <Badge
                          size="md"
                          variant="solid"
                          borderRadius={12}
                          backgroundColor="#450A0A"
                        >
                          <Text color="#FCA5A5">Dana Keluar</Text>
                        </Badge>
                      </VStack>
                    </HStack>
                  </Box>
                </TouchableOpacity>
              </Box>
            ))
          )}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
