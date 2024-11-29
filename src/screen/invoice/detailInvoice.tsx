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
            <Text>Jumlah Tagihan</Text>
            <Text>Invoice ID</Text>
          </HStack>

          <HStack justifyContent="space-between">
            <Text
              fontSize={16}
              fontWeight={"$bold"}
              color={mode == "dark" ? "white" : "black"}
            >
              Rp. 450.000
            </Text>
            <Text
              fontWeight={"$bold"}
              color={mode == "dark" ? "white" : "black"}
            >
              INV/20241022
            </Text>
          </HStack>

          <HStack justifyContent="space-between">
            <VStack space="md">
              <Text color={mode == "dark" ? "white" : "black"}>
                Bayar Sebelum
              </Text>
              <Text>21 Oct 2024 16:49</Text>
            </VStack>
          </HStack>
          <Divider bgColor={colors.border} />

          <Text color={mode == "dark" ? "white" : "black"} mt={10}>
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

                            <Text color={mode === "dark" ? "white" : "black"}>
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
                  borderRadius={6}
                  borderColor={colors.border}
                  backgroundColor={mode === "dark" ? "black" : "white"}
                >
                  <VStack m={10} space="md">
                    <HStack justifyContent="space-between">
                      <Text color={mode === "dark" ? "white" : "black"}>
                        Nama Tagihan
                      </Text>
                      <Text color={mode === "dark" ? "white" : "black"}>
                        Pembelian Buku
                      </Text>
                    </HStack>

                    <HStack justifyContent="space-between">
                      <Text color={mode === "dark" ? "white" : "black"}>
                        Tanggal
                      </Text>
                      <Text color={mode === "dark" ? "white" : "black"}>
                        21 Oct 2024
                      </Text>
                    </HStack>

                    <HStack justifyContent="space-between">
                      <Text color={mode === "dark" ? "white" : "black"}>
                        Waktu
                      </Text>
                      <Text color={mode === "dark" ? "white" : "black"}>
                        16:49
                      </Text>
                    </HStack>

                    <HStack justifyContent="space-between">
                      <Text color={mode === "dark" ? "white" : "black"}>
                        Nominal Tertagih
                      </Text>
                      <Text color={mode === "dark" ? "white" : "black"}>
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
      <VStack mt="auto" mx={10} mb={20}>
        <Button
          bgColor={colors.primary}
          borderRadius={10}
          mt={4}
          onPress={() => router.push("/bayarInvoice")}
        >
          <Text color="white">Bayar Invoice</Text>
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default DetailInvoice;
