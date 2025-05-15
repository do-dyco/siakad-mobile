import CustomBadge from "@/components/CustomBadge";
import DashedDivider from "@/components/dashedDivider";
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
              backgroundColor={mode === "dark" ? colors.gray.dark[800] : colors.gray.light[200]}
            >
              <InputField placeholder="Cari transaksi disini" />
            </Input>

            <TouchableOpacity onPress={() => setShowActionsheet(true)}>
              <Box
                borderRadius={"$full"}
                backgroundColor={mode === "light" ? colors.gray.light[200] : colors.gray.dark[800]}
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
            <TouchableOpacity onPress={() => router.push("/detailInvoice")}>
              <Box
                borderWidth={1}
                borderRadius={10}
                borderColor={mode === 'dark' ? colors.border : colors.gray.light[200]}
                mb={20}
                mt={20}
              >
                <Box
                  borderTopRightRadius={10}
                  borderTopLeftRadius={10}
                  bgColor={mode === 'light' ? colors.gray.light[200] : colors.box}
                >
                  <HStack justifyContent="space-between" m={10}>
                    <HStack space="md">
                      
                      <Box
                        borderRadius={8}
                        borderWidth={1}
                        borderColor="transparent"
                        bgColor={colors.boxWarning}
                        height={25}
                        width={25}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <MaterialCommunityIcons
                          name="text-box-outline"
                          size={20}
                          color={"white"}
                        />
                      </Box>
                      <Text color={mode === "dark" ? "white" : "black"} fontSize={14} fontFamily="Lato" fontWeight={"$semibold"} mt={4}>
                        Invoice
                      </Text>
                    </HStack>
                    <Text color={mode === "dark" ? "white" : "black"}  fontSize={14} fontFamily="Lato" fontWeight={"$semibold"}>
                      {item.no_invoice}
                    </Text>
                  </HStack>
                </Box>

                <HStack justifyContent="space-between" mt={10} m={10}>
                  <VStack space="md">
                    <Text color={mode === "dark" ? "white" : "black"}  fontSize={14} fontFamily="Lato" fontWeight={"$semibold"}>
                      Bayar Sebelum
                    </Text>
                    <Text fontSize={14} fontFamily="Lato" fontWeight={"$semibold"}>{item.no_invoice} 16:49</Text>
                  </VStack>
                  <CustomBadge variant="danger" label="05:59:49 "/>
                </HStack>
                <DashedDivider />
                <VStack mx={10} mt={10} mb={10}>

                  <HStack justifyContent="space-between" mt={10}>
                    <Text color={mode === "dark" ? "white" : "black"} fontSize={14} fontFamily="Lato" fontWeight={"$semibold"}>
                      Nominal Tertagih
                    </Text>
                    <Text color={mode === "dark" ? "white" : "black"} fontSize={14} fontFamily="Lato" fontWeight={"$semibold"}>
                      Rp.{item.total}
                    </Text>
                  </HStack>
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

export default Invoice;
