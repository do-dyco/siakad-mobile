import CustomBadge from "@/components/CustomBadge";
import DashedDivider from "@/components/dashedDivider";
import Header from "@/components/Header";
import NoData from "@/components/NoData";
import colors from "@/src/config/colors";
import { Ionicons } from "@expo/vector-icons";
import {
  Box,
  HStack,
  SafeAreaView,
  ScrollView,
  VStack,
  Text,
  Badge,
} from "@gluestack-ui/themed";
import React, { useState } from "react";
import { Dimensions, useColorScheme } from "react-native";

const Pelanggaran = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const [data, setData] = useState("1");

  const item = [
    {
      title: "Tidak Mengerjakan PR",
      status: "Ringan",
      date: "21 Okt 2024 10:37",
      punishment: "Membersihkan Kamar Mandi",
      status_punish: "Hukuman Belum diKerjakan",
    },
  ];

  return (
    <ScrollView>
      <SafeAreaView
        backgroundColor={mode === "dark" ? "black" : "white"}
        height={screenHeight}
      >
        <Header data="Pelanggaran" />
        <VStack mx={10} space="md">
          {!data ? (
            <NoData
              title="Belum ada data pelanggaran"
              desc="Jika anda sudah memiliki pelanggaran, pelanggaran tersebut akan muncul disini"
              icon={
                <Ionicons
                  name="warning-outline"
                  size={30}
                  color={mode === "dark" ? "white" : "black"}
                />
              }
            />
          ) : (
            item.map((data, index) => (
              <React.Fragment key={index}>
                <Box
                  borderWidth={1}
                  borderRadius={10}
                  borderColor={colors.border}
                  mt={20}
                  bgColor={mode === "dark" ? "#1a1a1a" : "white"}
                >
                  <VStack px={15} py={10} space="md">
                    <HStack justifyContent="space-between" alignItems="center">
                      <Text
                        color={mode === "dark" ? "white" : "black"}
                        fontFamily="Lato"
                        fontSize={16}
                        fontWeight="$bold"
                      >
                        {data.title}
                      </Text>

                      <CustomBadge variant="primary" label="Ringan"/>
                    </HStack>

                    <DashedDivider />

                    <VStack space="xs">
                      <Text fontFamily="Lato" size="sm" color="#94979C">
                        Tanggal Pelanggaran
                      </Text>
                      <Text
                        color={mode === "dark" ? "white" : "black"}
                        fontFamily="Lato"
                        size="sm"
                      >
                        {data.date}
                      </Text>

                      <Text fontFamily="Lato" size="sm" color="#94979C" mt={10}>
                        Hukuman
                      </Text>
                      <Text
                        color={mode === "dark" ? "white" : "black"}
                        fontFamily="Lato"
                        size="sm"
                      >
                        {data.punishment}
                      </Text>
                    </VStack>
                  </VStack>
                </Box>

                <Box
                  borderWidth={1}
                  borderTopWidth={0}
                  borderColor={colors.border}
                  borderBottomLeftRadius={10}
                  borderBottomRightRadius={10}
                  backgroundColor={colors.primary}
                  mt={-20}
                >
                  <Text
                    m={10}
                    color={"white"}
                    textAlign="center"
                    fontFamily="Lato"
                    fontSize={14}
                    fontWeight="$bold"
                  >
                    {data.status_punish}
                  </Text>
                </Box>
              </React.Fragment>
            ))
          )}
        </VStack>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Pelanggaran;
