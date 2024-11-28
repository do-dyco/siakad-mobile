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
              <>
                <Box
                  borderWidth={1}
                  borderRadius={10}
                  borderColor={colors.border}
                  mt={20}
                >
                  <VStack mt={10} mx={10}>
                    <HStack justifyContent="space-between" mx={5}>
                      <Text color={mode === "dark" ? "white" : "black"}>
                        {data.title}
                      </Text>

                      <Badge
                        size="md"
                        variant="solid"
                        borderRadius={12}
                        bgColor="#22262F"
                        width={"30%"}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Text color="white" size="md" textAlign="center">
                          {data.status}
                        </Text>
                      </Badge>
                    </HStack>
                    <DashedDivider />
                    <Text>Tanggal Pelanggaran</Text>
                    <Text color={mode === "dark" ? "white" : "black"}>
                      {data.date}
                    </Text>

                    <Text>Hukuman</Text>
                    <Text color={mode === "dark" ? "white" : "black"}>
                      {data.punishment}
                    </Text>
                  </VStack>
                </Box>

                <Box
                  borderWidth={1}
                  borderBottomRightRadius={10}
                  borderBottomLeftRadius={10}
                  borderColor={colors.border}
                  borderTopColor="transparent"
                  mt={-14}
                  backgroundColor={colors.primary}
                >
                  <Text
                    m={10}
                    color={mode === "dark" ? "white" : "black"}
                    textAlign="center"
                  >
                    {data.status_punish}
                  </Text>
                </Box>
              </>
            ))
          )}
        </VStack>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Pelanggaran;
