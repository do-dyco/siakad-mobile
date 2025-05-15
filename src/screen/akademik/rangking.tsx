import Header from "@/components/Header";
import NoData from "@/components/NoData";
import colors from "@/src/config/colors";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  Box,
  Image,
  SafeAreaView,
  ScrollView,
  VStack,
  Text,
  Divider,
  HStack,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import React, { useState } from "react";
import { Dimensions, TouchableOpacity, useColorScheme } from "react-native";

const Rangking = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const [data, setData] = useState("1");
  const rankImages: { [key: string]: any } = {
    "1": require("@/assets/images/rank/Rank 1.png"),
    "2": require("@/assets/images/rank/Rank 2.png"),
    "3": require("@/assets/images/rank/Rank 3.png"),
  };
  const item_sma = [
    {
      kelas: "12",
      kelas_detail: "IPA - 1",
      peringkat: "2",
      total_siswa: "30",
    },
    {
      kelas: "12",
      kelas_detail: "IPA - 2",
      peringkat: "4",
      total_siswa: "30",
    },
    {
      kelas: "10",
      kelas_detail: "",
      peringkat: "1",
      total_siswa: "30",
    },
  ];

  const item_smp = [
    {
      kelas: "9",
      kelas_detail: "",
      peringkat: "3",
      total_siswa: "30",
    },
    {
      kelas: "8",
      kelas_detail: "",
      peringkat: "4",
      total_siswa: "30",
    },
    {
      kelas: "7",
      kelas_detail: "",
      peringkat: "1",
      total_siswa: "30",
    },
  ];

  return (
    <>
      <Box position="relative" width="100%" height="30%">
        <Image
          width="100%"
          height="100%"
          source={require("@/assets/images/rangking.jpg")}
          alt="rangking-background"
        />
        <Box position="absolute" top={10} left={0} right={0} px={4} mt={30}>
          <HStack justifyContent="space-between" alignItems="center">
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons
                name="chevron-left"
                color={mode === "dark" ? "white" : "black"}
                size={30}
              />
            </TouchableOpacity>
            <Text color="white" fontSize={18} fontWeight="$bold" fontFamily="Lato">
              Rangking
            </Text>
            <Box width={30} />
          </HStack>
        </Box>
      </Box>

      <ScrollView>
        <SafeAreaView
          backgroundColor={mode === "dark" ? "black" : "white"}
          minHeight={screenHeight}
        >
          <Box
            borderTopRightRadius={40}
            borderTopLeftRadius={40}
            borderWidth={1}
            borderColor="transparent"
            overflow="hidden"
          >
            <VStack space="md" m={10}>
              <Text color={mode === "dark" ? "$white" : "$black"} fontWeight="$bold" fontFamily="Lato" fontSize={18}>
                List Rangking
              </Text>
            </VStack>
            <Divider bgColor={colors.border} mt={10} />
            <VStack space="md" m={10}>
              {!data ? (
                <NoData
                  title="Belum ada data peringkat"
                  desc="Jika anda sudah memiliki peringkat, peringkat tersebut akan muncul disini"
                  icon={
                    <MaterialIcons
                      name="keyboard-double-arrow-up"
                      size={30}
                      color={mode === "dark" ? "white" : "black"}
                    />
                  }
                />
              ) : (
                <>
                  <Text fontFamily="Lato">Sekolah Menengah Atas</Text>
                  {item_sma.map((data, index) => (
                    <Box
                      key={index}
                      borderWidth={1}
                      borderRadius={10}
                      borderColor="transparent"
                      backgroundColor={mode === "dark" ? colors.box : "white"}
                      m={4}
                    >
                      <HStack justifyContent="space-between" m={4} alignItems="center">
                        <HStack space="md" alignItems="center">
                          {Number(data.peringkat) <= 3 ? (
                            <Image
                              width={30}
                              height={50}
                              source={rankImages[data.peringkat]}
                              alt="rank"
                            />
                          ) : (
                            <Text size="2xl" fontFamily="Lato">#{data.peringkat}</Text>
                          )}
                          <VStack space="xs">
                            <Text color={mode === "dark" ? "white" : "black"}  fontFamily="Lato" fontSize={16}>Kelas {data.kelas}</Text>
                            <Text  fontFamily="Lato" fontSize={12}>{data.kelas_detail}</Text>
                          </VStack>
                        </HStack>
                        <Text textAlign="right" fontFamily="Lato" fontSize={10}>
                          Peringkat <Text color={mode === "dark" ? "white" : "black"}  fontFamily="Lato" fontSize={10}>{data.peringkat}</Text> dari <Text color={mode === "dark" ? "white" : "black"}  fontFamily="Lato" fontSize={10}>{data.total_siswa}</Text> Siswa
                        </Text>
                      </HStack>
                    </Box>
                  ))}

                  <Text>Sekolah Menengah Pertama</Text>
                  {item_smp.map((data, index) => (
                    <Box
                      key={index}
                      borderWidth={1}
                      borderRadius={10}
                      borderColor="transparent"
                      backgroundColor={mode === "dark" ? colors.box : "white"}
                      m={4}
                    >
                      <HStack justifyContent="space-between" m={4} alignItems="center">
                        <HStack space="md" alignItems="center">
                          {Number(data.peringkat) <= 3 ? (
                            <Image
                              width={30}
                              height={50}
                              source={rankImages[data.peringkat]}
                              alt="rank"
                            />
                          ) : (
                            <Text size="2xl">#{data.peringkat}</Text>
                          )}
                          <VStack space="xs">
                            <Text color={mode === "dark" ? "white" : "black"} fontFamily="Lato" fontSize={16}>Kelas {data.kelas}</Text>
                            <Text>{data.kelas_detail}</Text>
                          </VStack>
                        </HStack>
                        <Text textAlign="right"  fontFamily="Lato" fontSize={10}>
                          Peringkat <Text color={mode === "dark" ? "white" : "black"}  fontFamily="Lato" fontSize={10}>{data.peringkat}</Text> dari <Text color={mode === "dark" ? "white" : "black"}  fontFamily="Lato" fontSize={10}>{data.total_siswa}</Text> Siswa
                        </Text>
                      </HStack>
                    </Box>
                  ))}

                  <Text>Sekolah Dasar</Text>
                </>
              )}
            </VStack>
          </Box>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default Rangking;