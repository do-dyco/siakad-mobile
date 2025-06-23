import CustomBadge from "@/components/CustomBadge";
import DashedDivider from "@/components/dashedDivider";
import NoData from "@/components/NoData";
import colors from "@/src/config/colors";
import {
  AntDesign,
  Entypo,
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
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import React, { useState } from "react";
import { Dimensions, TouchableOpacity, useColorScheme } from "react-native";

const Hafalan = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [data, setData] = useState(true); // Updated to reflect non-empty data
  const invoice = [
    {
      name: "Al-Baqarah",
      value: "10",
      total: "286",
    },
    {
      name: "Al-Imran",
      value: "15",
      total: "200",
    },
    {
      name: "An-Nisa",
      value: "15",
      total: "176",
    },
  ];

  return (
    <SafeAreaView>
      <ScrollView
        backgroundColor={mode === "dark" ? "black" : "white"}
        height={screenHeight}
      >
        <Box backgroundColor={mode === "dark" ? "black" : "white"} mt={30}>
          {/* Header */}
          <TouchableOpacity onPress={() => router.back()}>
            <HStack m={5}>
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
                  Hafalan Al-Qur'an
                </Text>
              </Center>
            </HStack>
          </TouchableOpacity>

          <Divider mt={20} bgColor={colors.gray.light[200]} />
        </Box>

        {/* Invoice List */}
        <VStack mx={10}>
          {!data ? (
            <NoData
              title="Belum ada data Invoice"
              desc="Jika anda sudah memiliki Invoice, invoice tersebut akan muncul disini."
              icon=""
            />
          ) : (
            invoice.map((item, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity onPress={() => router.push("/detailHafalan")}>
                  <Box
                    borderWidth={1}
                    borderRadius={10}
                    borderColor={
                      mode === "dark" ? colors.border : colors.gray.light[200]
                    }
                    mb={20}
                    mt={20}
                  >
                    <HStack justifyContent="space-between" mt={10} m={10}>
                      <VStack space="md">
                        <Text
                          color={mode === "dark" ? "white" : "black"}
                          fontSize={14}
                          fontFamily="Lato"
                          fontWeight={"$semibold"}
                        >
                          {item.name}
                        </Text>
                      </VStack>
                      <Entypo
                        name="chevron-right"
                        size={20}
                        color={mode === "dark" ? "white" : "black"}
                      />
                    </HStack>
                    <DashedDivider />
                    <VStack mx={10} mt={10} mb={10}>
                      <Text
                        color={mode === "dark" ? "white" : "black"}
                        fontSize={14}
                        fontFamily="Lato"
                        fontWeight={"$semibold"}
                      >
                        Sudah setor{" "}
                        <Text
                          color={colors.primary}
                          fontSize={12}
                          fontFamily="Lato"
                          fontWeight={"$bold"}
                        >
                          {item.value}
                        </Text>{" "}
                        dari{" "}
                        <Text
                          color={colors.primary}
                          fontSize={12}
                          fontFamily="Lato"
                          fontWeight={"$bold"}
                        >
                          {item.total}
                        </Text>{" "}
                        Ayat
                      </Text>
                    </VStack>
                  </Box>
                </TouchableOpacity>
              </React.Fragment>
            ))
          )}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Hafalan;
