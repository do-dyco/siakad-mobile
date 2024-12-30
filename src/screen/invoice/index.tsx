import NoData from "@/components/NoData";
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
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import React, { useState } from "react";
import { Dimensions, TouchableOpacity, useColorScheme } from "react-native";

const Invoice = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [data, setData] = useState(true); // Updated to reflect non-empty data
  const invoice = [
    {
      no_invoice: "INV/20241022",
      date: "22 Oct 2024",
      time: "16:49",
      total: "100.000",
    },
    {
      no_invoice: "INV/20241023",
      date: "23 Oct 2024",
      time: "14:30",
      total: "200.000",
    },
    {
      no_invoice: "INV/20241024",
      date: "24 Oct 2024",
      time: "10:00",
      total: "150.000",
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
                  Invoice
                </Text>
              </Center>
            </HStack>
          </TouchableOpacity>

          {/* Search and Filter */}
          <HStack mt={15} space="md" m={5}>
            <Input
              variant="rounded"
              width={"85%"}
              borderColor={"transparent"}
              backgroundColor={mode === "dark" ? "#13161B" : "white"}
            >
              <InputField placeholder="Cari transaksi disini" />
            </Input>

            <TouchableOpacity onPress={() => setShowActionsheet(true)}>
              <Box
                borderRadius={"$full"}
                backgroundColor={"transparent"}
                borderWidth={1}
                borderColor={colors.border}
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
                <TouchableOpacity onPress={() => router.push("/detailInvoice")}>
                  <Box
                    borderWidth={1}
                    borderTopLeftRadius={10}
                    borderTopRightRadius={10}
                    borderColor={colors.border}
                    backgroundColor={mode === "dark" ? colors.box : "white"}
                    mt={20}
                  >
                    <HStack justifyContent="space-between" mx={10} p={15}>
                      <HStack space="md">
                        <Box
                          borderWidth={1}
                          borderRadius={6}
                          borderColor={colors.border}
                          justifyContent="center"
                          alignContent="center"
                          backgroundColor={colors.boxWarning}
                          height={20}
                          width={20}
                        >
                          <MaterialCommunityIcons
                            name="text-box-outline"
                            size={16}
                            color={"white"}
                          />
                        </Box>

                        <Text color={mode === "dark" ? "white" : "black"}>
                          Invoice
                        </Text>
                      </HStack>
                      <Text color={mode === "dark" ? "white" : "black"}>
                        {item.no_invoice}
                      </Text>
                    </HStack>
                  </Box>
                  <Box
                    borderBottomLeftRadius={10}
                    borderBottomRightRadius={10}
                    borderWidth={1}
                    borderColor={colors.border}
                  >
                    <HStack justifyContent="space-between" mx={10} p={10}>
                      <VStack space="xs">
                        <Text color={mode === "dark" ? "white" : "black"}>
                          Bayar Sebelum
                        </Text>
                        <Text color={mode === "dark" ? "white" : "black"}>
                          {item.date}
                        </Text>
                      </VStack>
                    </HStack>

                    <HStack justifyContent="space-between" mx={10} p={10}>
                      <Text color={mode === "dark" ? "white" : "black"}>
                        Nominal Tertagih
                      </Text>
                      <Text color={mode === "dark" ? "white" : "black"}>
                        {item.total}
                      </Text>
                    </HStack>
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

export default Invoice;
