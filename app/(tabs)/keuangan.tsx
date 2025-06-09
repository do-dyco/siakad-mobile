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
} from "@gluestack-ui/themed";
import colors from "@/src/config/colors";
import { useRouter } from "expo-router";
import {
  Dimensions,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import SaldoBox from "@/components/SaldoBox";
import { PieChart } from "react-native-gifted-charts";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import SkeletonList from "@/components/SkeletonList";
import { useState } from "react";
import CustomBadge from "@/components/CustomBadge";

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
  ];

  return (
    <SafeAreaView
      backgroundColor={mode === "dark" ? "black" : "white"}
      height={screenHeight}
    >
      <ScrollView>
        {/* Header dengan Background Melengkung */}
        <Box
          position="relative"
          width={screenWidth}
          height={screenHeight / 3 - 30}
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
            <SaldoBox />
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
            <InputField placeholder="Cari transaksi disini" />
          </Input>

          <TouchableOpacity>
            <Box
              backgroundColor="transparent"
              borderWidth={1}
              borderColor={mode === "dark" ? "#373A41" : "#E0E0E0"}
              borderRadius={100}
              p={2} // padding tambahan untuk kesan lebih lapang
            >
              <Ionicons
                name="filter"
                size={25}
                color={mode === "dark" ? "white" : "black"}
                style={{ margin: 0 }} // hapus margin untuk kontrol jarak secara lebih konsisten
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
          {/* <Link href="#">
            <LinkText color="white">Lihat detail</LinkText>
          </Link> */}
        </HStack>

        <VStack space="md" mb={20} mx={10}>
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

                {item.transactions.map((trx) => (
                  <TouchableOpacity
                    key={trx.id}
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
                              trx.description === "Pembayaran Tagihan"
                                ? "#F59E0B"
                                : "#15B392"
                            }
                            justifyContent="center"
                            alignItems="center"
                            height={30}
                            width={30}
                          >
                            <MaterialCommunityIcons
                              name="text-box-outline"
                              size={20}
                              color="white"
                            />
                          </Box>
                          <VStack space="sm">
                            <Text color={mode === "dark" ? "white" : "black"}>
                              {trx.description}
                            </Text>
                            <Text>{trx.time}</Text>
                          </VStack>
                        </HStack>
                        <VStack space="sm" alignItems="flex-end">
                          <Text color={mode === "dark" ? "white" : "black"}>
                            {trx.category === "Uang Masuk"
                              ? `+ Rp. ${trx.amount.toLocaleString()}`
                              : `- Rp. ${trx.amount.toLocaleString()}`}
                          </Text>
                          <CustomBadge
                            variant={
                              trx.category === "Uang Masuk"
                                ? "success"
                                : "danger"
                            }
                            label={trx.category}
                          />
                        </VStack>
                      </HStack>
                    </Box>
                  </TouchableOpacity>
                ))}
              </Box>
            ))
          )}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
