import Header from "@/components/Header";
import colors from "@/src/config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  HStack,
  SafeAreaView,
  ScrollView,
  VStack,
  Text,
  Box,
  Divider,
  Badge,
} from "@gluestack-ui/themed";
import { router, useNavigation } from "expo-router";
import React, { useState } from "react";
import { Dimensions, TouchableOpacity, useColorScheme } from "react-native";

const DetailMapel = () => {
  const navigation = useNavigation();
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const [select, setSelect] = useState("");
  const data_jadwal = [
    {
      day: "Sabtu",
      date: "26 0ct",
      status: "hadir",
    },
    {
      day: "Jumat",
      date: "25 0ct",
      status: "tidak hadir",
    },
    {
      day: "Kamis",
      date: "24 0ct",
      status: "hadir",
    },
    {
      day: "Sabtu",
      date: "19 0ct",
      status: "hadir",
    },
  ];

  const data_menu = [
    {
      label: "Semua Nilai",
    },
    {
      label: "PR",
    },
    {
      label: "Tugas",
    },
    {
      label: "UTS",
    },
    {
      label: "UAS",
    },
  ];

  const data_box = [
    {
      label: "UAS",
      desc: "Ujian Akhir Semester",
      date: "1 Des 2024",
    },
    {
      label: "Tugas",
      desc: "Tugas Menggambar Hutan",
      date: "25 Okt 2024",
    },
    {
      label: "PR",
      desc: "PR pelajaran Matematika Hitungan Aljabar",
      date: "21 Okt 2024",
    },
  ];

  return (
    <SafeAreaView
      backgroundColor={mode === "dark" ? "black" : "white"}
      height={screenHeight}
    >
      <ScrollView>
        <Header data={"Matematika"} />
        <VStack space="md" m={10} mt={10}>
          <HStack justifyContent="space-between">
            <Text color={mode === "dark" ? "white" : "black"}>
              Jadwal Masuk
            </Text>
            <TouchableOpacity onPress={() => router.push("/detailJadwalMasuk")}>
              <Text color={mode === "dark" ? "white" : "black"}>
                Lihat Semua
              </Text>
            </TouchableOpacity>
          </HStack>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {data_jadwal.map((item, index) => (
              <Box
                key={index}
                borderWidth={1}
                borderRadius={10}
                borderColor={colors.border}
                mr={10}
              >
                <VStack space="md" m={10}>
                  <Text color={mode === "dark" ? "white" : "black"}>
                    {item.day}, {item.date}
                  </Text>
                  <Divider bgColor={colors.border} />
                  <Badge
                    size="md"
                    variant="solid"
                    borderRadius={12}
                    backgroundColor={
                      item.status === "hadir" ? "#022C22" : "#450A0A"
                    }
                    alignContent="center"
                    justifyContent="center"
                  >
                    <Text
                      color={
                        item.status === "hadir" ? colors.primary : colors.danger
                      }
                    >
                      {item.status}
                    </Text>
                  </Badge>
                </VStack>
              </Box>
            ))}
          </ScrollView>

          <Text color={mode === "dark" ? "white" : "black"}>
            Nilai Pelajaran dan Ujian
          </Text>
          <Text fontSize={"$md"}>Kelas 12 IPA 1</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data_menu.map((item, index) => (
              <Badge
                key={index}
                size="md"
                variant="solid"
                borderRadius={20}
                backgroundColor={"#373A41"}
                alignContent="center"
                justifyContent="center"
                mr={10}
                p={5}
                px={10}
              >
                <Text color={mode === "dark" ? "white" : "black"}>
                  {item.label}
                </Text>
              </Badge>
            ))}
          </ScrollView>
          {data_box.map((item, index) => (
            <Box
              key={index}
              borderWidth={1}
              borderRadius={20}
              borderColor={colors.border}
              backgroundColor={mode === "dark" ? "#22262F" : "white"}
              mr={10}
              p={10}
            >
              <HStack justifyContent="space-between">
                <Text color={mode === "dark" ? "white" : "black"}>
                  {item.label}
                </Text>
                <HStack space="md">
                  <MaterialCommunityIcons
                    name="calendar"
                    size={20}
                    color={mode === "dark" ? "white" : "black"}
                  />
                  <Text color={mode === "dark" ? "white" : "black"}>
                    {item.date}
                  </Text>
                </HStack>
              </HStack>

              <Text mt={30}>Deskripsi</Text>
              <Text color={mode === "dark" ? "white" : "black"}>
                {item.desc}
              </Text>
              <Box
                borderWidth={1}
                borderRadius={10}
                borderColor={colors.border}
                backgroundColor={mode === "dark" ? "#1f1f1f" : "white"}
                height={"20%"}
                mt={20}
                mb={20}
              >
                <HStack justifyContent="space-between" mx={10}>
                  <Text color={mode === "dark" ? "white" : "black"}>
                    Lihat bukti
                  </Text>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={20}
                    style={{ marginTop: 2 }}
                    color={mode === "dark" ? "white" : "black"}
                  />
                </HStack>
              </Box>
            </Box>
          ))}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailMapel;
