import Header from "@/components/Header";
import colors from "@/src/config/colors";
import apiService from "@/src/service/apiService";
import { useTagihanStore } from "@/src/store/tagihanStore";
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
  AccordionIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  AccordionContent,
  Button,
} from "@gluestack-ui/themed";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, useColorScheme } from "react-native";

const DetailInvoice = () => {
  const mode = useColorScheme();
  const screenHeight = Dimensions.get("window").height;
  const { selectedTagihan } = useTagihanStore();

  const totalNominal = selectedTagihan.reduce(
    (total, item) => total + item.nominal,
    0
  );

  const [invoiceData, setInvoiceData] = useState({}); // Simpan data invoice dari API

  const createInvoice = async () => {
    try {
      const response = await apiService.createInvoiceNumber({
        tagihanUserIds: selectedTagihan.map((item) => item.id), // kirim array ID
      });
      console.log("Response from createInvoice:", response);
      setInvoiceData(response.data.invoice_tagihan); // simpan data invoice
    } catch (error) {
      console.error("Failed to create invoice:", error);
    }
  };

  const handleNext = () => {
    if (!invoiceData?.no_invoice) {
      console.warn("Invoice belum siap");
      return;
    }

    router.push({
      pathname: "/metodeBayar",
      params: { invoice: invoiceData.no_invoice }, // kirim nomor invoice
    });
  };

  useEffect(() => {
    createInvoice();
  }, []);

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
              Rp. {new Intl.NumberFormat("id-ID").format(totalNominal)}
            </Text>
            <Text
              fontWeight={"$bold"}
              color={mode == "dark" ? "white" : "black"}
            >
              {invoiceData?.no_invoice || "Loading..."}
            </Text>
          </HStack>

          <Divider
            bgColor={mode === "dark" ? colors.border : colors.gray.light[200]}
          />

          <Text color={mode == "dark" ? "white" : "black"} mt={10}>
            Tagihan
          </Text>

          <Accordion
            width="100%"
            size="md"
            bgColor={mode === "dark" ? colors.box : "white"}
            type="multiple"
            isCollapsible={true}
          >
            {selectedTagihan.map((item) => {
              const [tanggal, waktu] = item.expire_at.split(" ");
              return (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  backgroundColor={mode === "dark" ? "#22262F" : "white"}
                >
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => (
                        <>
                          <HStack justifyContent="space-between" mx={2}>
                            <HStack space="md">
                              <Box
                                borderWidth={1}
                                borderRadius={6}
                                borderColor={
                                  mode === "dark"
                                    ? colors.border
                                    : colors.gray.light[200]
                                }
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
                                Tagihan {item.no_tagihan}
                              </Text>
                            </HStack>
                          </HStack>
                          <AccordionIcon
                            as={isExpanded ? ChevronUpIcon : ChevronDownIcon}
                            ml="$3"
                            color={mode === "dark" ? "white" : "black"}
                          />
                        </>
                      )}
                    </AccordionTrigger>
                  </AccordionHeader>

                  <AccordionContent>
                    <Box
                      borderWidth={1}
                      borderRadius={6}
                      borderColor={
                        mode === "dark" ? colors.border : colors.gray.light[200]
                      }
                      backgroundColor={mode === "dark" ? "black" : "white"}
                    >
                      <VStack m={10} space="md">
                        <HStack justifyContent="space-between">
                          <Text color={mode === "dark" ? "white" : "black"}>
                            Nama Tagihan
                          </Text>
                          <Text color={mode === "dark" ? "white" : "black"}>
                            {item.master_tagihan?.nama ?? "-"}
                          </Text>
                        </HStack>

                        <HStack justifyContent="space-between">
                          <Text color={mode === "dark" ? "white" : "black"}>
                            Tanggal
                          </Text>
                          <Text color={mode === "dark" ? "white" : "black"}>
                            {tanggal}
                          </Text>
                        </HStack>

                        <HStack justifyContent="space-between">
                          <Text color={mode === "dark" ? "white" : "black"}>
                            Waktu
                          </Text>
                          <Text color={mode === "dark" ? "white" : "black"}>
                            {waktu}
                          </Text>
                        </HStack>

                        <HStack justifyContent="space-between">
                          <Text color={mode === "dark" ? "white" : "black"}>
                            Nominal Tertagih
                          </Text>
                          <Text color={mode === "dark" ? "white" : "black"}>
                            Rp{" "}
                            {new Intl.NumberFormat("id-ID").format(
                              item.nominal
                            )}
                          </Text>
                        </HStack>
                      </VStack>
                    </Box>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </VStack>
      </ScrollView>
      <Divider
        bgColor={mode === "dark" ? colors.border : colors.gray.light[200]}
      />
      <VStack mt={10} mx={10} mb={20}>
        <Button
          bgColor={colors.primary}
          borderRadius={10}
          mt={4}
          onPress={handleNext}
          isDisabled={!invoiceData?.no_invoice} // Disable tombol kalau invoice belum ada
        >
          <Text color="white">Selanjutnya</Text>
        </Button>
      </VStack>
    </SafeAreaView>
  );
};

export default DetailInvoice;
