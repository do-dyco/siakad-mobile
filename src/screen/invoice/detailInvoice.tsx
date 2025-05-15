import CustomBadge from "@/components/CustomBadge";
import Header from "@/components/Header";
import colors from "@/src/config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  HStack,
  SafeAreaView,
  ScrollView,
  VStack,
  Text,
  Divider,
  Box,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionTitleText,
  AccordionIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  AccordionContent,
  AccordionContentText,
  Button,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import React from "react";
import { Dimensions, useColorScheme } from "react-native";

const DetailInvoice = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView
      flex={1}
      backgroundColor={mode === "dark" ? "black" : "white"}
      height={screenHeight}
    >
      <ScrollView>
        <Header data={"Detail Transaksi"} />
        <VStack space="md" mx={10}>
          <HStack justifyContent="space-between">
            <Text color={colors.gray.light[400]} fontSize={14} fontFamily="Lato" fontWeight={"$semibold"}>Jumlah Tagihan</Text>
            <Text color={colors.gray.light[400]} fontSize={14} fontFamily="Lato" fontWeight={"$semibold"}>Invoice ID</Text>
          </HStack>

          <HStack justifyContent="space-between">
            <Text
              fontSize={16}
              fontWeight={"$bold"}
              fontFamily="Lato"
              color={mode == "dark" ? "white" : "black"}
            >
              Rp. 450.000
            </Text>
            <Text
              fontWeight={"$bold"}
              fontFamily="Lato"
              color={mode == "dark" ? "white" : "black"}
            >
              INV/20241022
            </Text>
          </HStack>

          <HStack justifyContent="space-between">
            <VStack space="md">
              <HStack justifyContent="space-between" alignItems="center" width="100%">
                <Text color={mode == "dark" ? "white" : "black"} fontSize={14} fontFamily="Lato" fontWeight={"$semibold"}>
                  Bayar Sebelum
                </Text>

                <CustomBadge variant="danger" label="05:59:49 " />
              </HStack>
              <Text  color={mode == "dark" ? "white" : "black"} fontSize={12} fontFamily="Lato">21 Oct 2024 16:49</Text>
            </VStack>
          </HStack>
          <Divider bgColor={colors.border} />

          <Text color={mode == "dark" ? "white" : "black"} fontFamily="Lato" fontSize={14} mt={10} fontWeight={"$semibold"}>
            Tagihan
          </Text>

          <Accordion
            width="100%"
            size="md"
            bgColor={mode === "dark" ? colors.box : "white"}
            type="single"
            isCollapsible={true}
            isDisabled={false}
          >
            <AccordionItem
              value="a"
              backgroundColor={mode === "dark" ? "#22262F" : "white"}
            >
              <AccordionHeader>
                <AccordionTrigger>
                  {({ isExpanded }) => {
                    return (
                      <>
                        <HStack justifyContent="space-between" mx={2}>
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

                            <Text color={mode === "dark" ? "white" : "black"} fontFamily="Lato" fontSize={14}fontWeight={"$semibold"}>
                              Tagihan ID#TG00294581
                            </Text>
                          </HStack>
                        </HStack>
                        {isExpanded ? (
                          <AccordionIcon
                            as={ChevronUpIcon}
                            ml="$3"
                            color={mode === "dark" ? "white" : "black"}
                          />
                        ) : (
                          <AccordionIcon
                            as={ChevronDownIcon}
                            ml="$3"
                            color={mode === "dark" ? "white" : "black"}
                          />
                        )}
                      </>
                    );
                  }}
                </AccordionTrigger>
              </AccordionHeader>
              <AccordionContent>
                <Box
                  borderWidth={1}
                  borderRadius={8}
                   borderColor={mode === 'dark' ? colors.border : colors.gray.light[200]}
                  backgroundColor={mode === "dark" ? "black" : "white"}
                >
                  <VStack m={10} space="md">
                    <HStack justifyContent="space-between">
                      <Text color={mode === "dark" ? "white" : "black"} fontFamily="Lato" fontSize={14}>
                        Nama Tagihan
                      </Text>
                      <Text color={mode === "dark" ? "white" : "black"} fontFamily="Lato" fontSize={14} fontWeight={"$semibold"}>
                        Pembelian Buku
                      </Text>
                    </HStack>

                    <HStack justifyContent="space-between">
                      <Text color={mode === "dark" ? "white" : "black"} fontFamily="Lato" fontSize={14}>
                        Tanggal
                      </Text>
                      <Text color={mode === "dark" ? "white" : "black"} fontFamily="Lato" fontSize={14} fontWeight={"$semibold"}>
                        21 Oct 2024
                      </Text>
                    </HStack>

                    <HStack justifyContent="space-between">
                      <Text color={mode === "dark" ? "white" : "black"} fontFamily="Lato" fontSize={14}>
                        Waktu
                      </Text>
                      <Text color={mode === "dark" ? "white" : "black"} fontFamily="Lato" fontSize={14} fontWeight={"$semibold"}>
                        16:49
                      </Text>
                    </HStack>

                    <HStack justifyContent="space-between">
                      <Text color={mode === "dark" ? "white" : "black"} fontFamily="Lato" fontSize={14}>
                        Nominal Tertagih
                      </Text>
                      <Text color={mode === "dark" ? "white" : "black"} fontFamily="Lato" fontSize={14} fontWeight={"$semibold"}>
                        Rp. 100.000
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </VStack>
      </ScrollView>
      <Divider bgColor={colors.border} />
      <VStack mt={10} mx={10} mb={20}>
        <Button
          bgColor={colors.primary}
          borderRadius={10}
          mt={4}
          onPress={() => router.push("/bayarInvoice")}
        >
          <Text color="white" fontFamily="Lato" fontSize={16}>Bayar Invoice</Text>
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default DetailInvoice;
